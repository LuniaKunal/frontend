import os
import emails
from datetime import datetime, timedelta
from typing import List, Dict
from dotenv import load_dotenv
from crud import invoice as invoice_crud
from models.invoice import InvoiceStatus

load_dotenv()

class EmailConfig:
    SMTP_HOST = os.getenv("SMTP_HOST")
    SMTP_PORT = int(os.getenv("SMTP_PORT", 587))
    SMTP_USER = os.getenv("SMTP_USER")
    SMTP_PASSWORD = os.getenv("SMTP_PASSWORD")
    EMAIL_FROM = os.getenv("EMAIL_FROM")

async def send_payment_reminder(recipient_email: str, invoice_data: Dict) -> bool:
    """Send payment reminder email for an overdue invoice."""
    try:
        # Create email message
        message = emails.Message(
            subject=f'Payment Reminder - Invoice #{invoice_data["invoice_number"]}',
            html=f"""
            <h2>Payment Reminder</h2>
            <p>Dear valued customer,</p>
            <p>This is a reminder that payment for invoice #{invoice_data["invoice_number"]} 
            is overdue. The invoice was due on {invoice_data["due_date"]}.</p>
            <p>Invoice Details:</p>
            <ul>
                <li>Amount: ${invoice_data["total_amount"]:.2f}</li>
                <li>Due Date: {invoice_data["due_date"]}</li>
                <li>Days Overdue: {(datetime.now() - invoice_data["due_date"]).days}</li>
            </ul>
            <p>Please process the payment at your earliest convenience.</p>
            <p>If you have already made the payment, please disregard this reminder.</p>
            """,
            mail_from=EmailConfig.EMAIL_FROM
        )

        # Send email
        response = message.send(
            to=recipient_email,
            smtp={
                "host": EmailConfig.SMTP_HOST,
                "port": EmailConfig.SMTP_PORT,
                "user": EmailConfig.SMTP_USER,
                "password": EmailConfig.SMTP_PASSWORD,
                "tls": True,
            }
        )

        return response.status_code == 250
    except Exception as e:
        print(f"Error sending payment reminder: {str(e)}")
        return False

async def process_payment_reminders(db) -> Dict[str, int]:
    """
    Process payment reminders for overdue invoices.
    Returns statistics about processed reminders.
    """
    stats = {
        "total_overdue": 0,
        "reminders_sent": 0,
        "errors": 0
    }
    
    try:
        # Get overdue invoices
        overdue_invoices = await invoice_crud.get_overdue_invoices(db)
        stats["total_overdue"] = len(overdue_invoices)
        
        for invoice in overdue_invoices:
            try:
                # Get buyer email from buyer details
                # Note: This assumes buyer email is stored in the invoice or can be retrieved
                buyer_email = invoice["buyer_details"]["email"]  # Adjust according to your data structure
                
                # Send reminder
                success = await send_payment_reminder(buyer_email, invoice)
                
                if success:
                    stats["reminders_sent"] += 1
                else:
                    stats["errors"] += 1
                    
            except Exception as e:
                print(f"Error processing reminder for invoice {invoice['id']}: {str(e)}")
                stats["errors"] += 1
                
        return stats
        
    except Exception as e:
        print(f"Error in payment reminder processing: {str(e)}")
        return stats

# Celery task for scheduled reminders
from celery import Celery
from app.database import get_database

celery_app = Celery('tasks', broker=os.getenv("REDIS_URL"))

@celery_app.task
def schedule_payment_reminders():
    """Celery task to schedule payment reminders."""
    try:
        # Get database connection
        db = get_database().client
        
        # Process reminders
        stats = process_payment_reminders(db)
        
        print(f"Payment reminder processing completed: {stats}")
        return stats
        
    except Exception as e:
        print(f"Error in scheduled payment reminders: {str(e)}")
        return {"error": str(e)} 
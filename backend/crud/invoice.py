from typing import List, Optional
from datetime import datetime
from supabase import Client
from models.invoice import Invoice, InvoiceStatus
from schemas.invoice import InvoiceCreate, InvoiceUpdate

async def create_invoice(db: Client, invoice: InvoiceCreate) -> dict:
    """Create a new invoice."""
    try:
        result = db.table('invoices').insert({
            'invoice_number': invoice.invoice_number,
            'buyer_id': invoice.buyer_id,
            'supplier_id': invoice.supplier_id,
            'amount': invoice.amount,
            'tax_amount': invoice.tax_amount,
            'total_amount': invoice.total_amount,
            'status': InvoiceStatus.DRAFT.value,
            'due_date': invoice.due_date.isoformat(),
            'notes': invoice.notes
        }).execute()
        
        return result.data[0] if result.data else None
    except Exception as e:
        raise Exception(f"Error creating invoice: {str(e)}")

async def get_invoice(db: Client, invoice_id: int) -> Optional[dict]:
    """Get an invoice by ID."""
    try:
        result = db.table('invoices').select("*").eq('id', invoice_id).execute()
        return result.data[0] if result.data else None
    except Exception as e:
        raise Exception(f"Error fetching invoice: {str(e)}")

async def get_invoices(
    db: Client,
    skip: int = 0,
    limit: int = 100,
    status: Optional[InvoiceStatus] = None,
    buyer_id: Optional[int] = None,
    supplier_id: Optional[int] = None
) -> List[dict]:
    """Get all invoices with optional filters."""
    try:
        query = db.table('invoices').select("*")
        
        if status:
            query = query.eq('status', status.value)
        if buyer_id:
            query = query.eq('buyer_id', buyer_id)
        if supplier_id:
            query = query.eq('supplier_id', supplier_id)
            
        result = query.range(skip, skip + limit - 1).execute()
        return result.data
    except Exception as e:
        raise Exception(f"Error fetching invoices: {str(e)}")

async def update_invoice(db: Client, invoice_id: int, invoice: InvoiceUpdate) -> Optional[dict]:
    """Update an invoice."""
    try:
        update_data = invoice.model_dump(exclude_unset=True)
        if 'status' in update_data:
            update_data['status'] = update_data['status'].value
        if 'due_date' in update_data:
            update_data['due_date'] = update_data['due_date'].isoformat()
            
        result = db.table('invoices').update(update_data).eq('id', invoice_id).execute()
        return result.data[0] if result.data else None
    except Exception as e:
        raise Exception(f"Error updating invoice: {str(e)}")

async def delete_invoice(db: Client, invoice_id: int) -> bool:
    """Delete an invoice."""
    try:
        result = db.table('invoices').delete().eq('id', invoice_id).execute()
        return bool(result.data)
    except Exception as e:
        raise Exception(f"Error deleting invoice: {str(e)}")

async def get_overdue_invoices(db: Client) -> List[dict]:
    """Get all overdue invoices."""
    try:
        current_date = datetime.utcnow().date().isoformat()
        result = db.table('invoices')\
            .select("*")\
            .lt('due_date', current_date)\
            .not_eq('status', InvoiceStatus.PAID.value)\
            .execute()
        return result.data
    except Exception as e:
        raise Exception(f"Error fetching overdue invoices: {str(e)}") 
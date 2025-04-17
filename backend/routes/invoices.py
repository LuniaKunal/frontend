from fastapi import APIRouter, Depends, HTTPException, Query, UploadFile, File
from typing import List, Optional
import os
import time
from datetime import datetime
from database.supabase import Database
from schemas.invoice import InvoiceCreate, InvoiceUpdate, InvoiceResponse
from models.invoice import InvoiceStatus
from services.gemini import process_pdf_invoice

router = APIRouter()

async def get_db():
    """Dependency to get database instance."""
    return Database()

@router.post("/", response_model=InvoiceResponse)
async def create_invoice(
    invoice: InvoiceCreate,
    db: Database = Depends(get_db)
):
    """Create a new invoice."""
    try:
        invoice_dict = invoice.model_dump()
        invoice_dict['status'] = InvoiceStatus.DRAFT.value
        invoice_dict['due_date'] = invoice_dict['due_date'].isoformat()
        return await db.insert_invoice(invoice_dict)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/{invoice_id}", response_model=InvoiceResponse)
async def get_invoice(
    invoice_id: int,
    db: Database = Depends(get_db)
):
    """Get an invoice by ID."""
    invoice = await db.get_invoice(invoice_id)
    if not invoice:
        raise HTTPException(status_code=404, detail="Invoice not found")
    return invoice

@router.get("/", response_model=List[InvoiceResponse])
async def list_invoices(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=100),
    status: Optional[InvoiceStatus] = None,
    buyer_id: Optional[int] = None,
    supplier_id: Optional[int] = None,
    db: Database = Depends(get_db)
):
    """List invoices with optional filters."""
    try:
        filters = {
            'status': status.value if status else None,
            'buyer_id': buyer_id,
            'supplier_id': supplier_id
        }
        return await db.get_invoices_by_filter(filters, skip, limit)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.patch("/{invoice_id}", response_model=InvoiceResponse)
async def update_invoice(
    invoice_id: int,
    invoice: InvoiceUpdate,
    db: Database = Depends(get_db)
):
    """Update an invoice."""
    existing_invoice = await db.get_invoice(invoice_id)
    if not existing_invoice:
        raise HTTPException(status_code=404, detail="Invoice not found")
    
    try:
        update_data = invoice.model_dump(exclude_unset=True)
        if 'status' in update_data:
            update_data['status'] = update_data['status'].value
        if 'due_date' in update_data:
            update_data['due_date'] = update_data['due_date'].isoformat()
        
        return await db.update_invoice(invoice_id, update_data)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.delete("/{invoice_id}")
async def delete_invoice(
    invoice_id: int,
    db: Database = Depends(get_db)
):
    """Delete an invoice."""
    existing_invoice = await db.get_invoice(invoice_id)
    if not existing_invoice:
        raise HTTPException(status_code=404, detail="Invoice not found")
    
    try:
        success = await db.delete_invoice(invoice_id)
        if success:
            return {"message": "Invoice deleted successfully"}
        raise HTTPException(status_code=400, detail="Failed to delete invoice")
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/overdue/list", response_model=List[InvoiceResponse])
async def list_overdue_invoices(
    db: Database = Depends(get_db)
):
    """Get all overdue invoices."""
    try:
        return await db.get_overdue_invoices()
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/upload-pdf", response_model=dict)
async def upload_and_process_invoice(
    pdf_file: UploadFile = File(...),
    db: Database = Depends(get_db)
):
    """Upload and process a PDF invoice using Gemini AI."""
    try:
        if not pdf_file.filename.endswith('.pdf'):
            raise HTTPException(status_code=400, detail="File must be a PDF")

        # Save the uploaded PDF temporarily
        temp_pdf_path = f"temp_{int(time.time())}.pdf"
        output_folder = f"pdf_images_{int(time.time())}"
        
        try:
            # Save uploaded file
            content = await pdf_file.read()
            with open(temp_pdf_path, "wb") as f:
                f.write(content)

            # Process the PDF
            df, output_file = await process_pdf_invoice(temp_pdf_path, output_folder)
            
            # Convert results to list of dictionaries
            results = df.to_dict(orient='records')
            
            # Create invoices in the database
            created_invoices = []
            for result in results:
                # Map the extracted data to our invoice schema
                invoice_data = {
                    'invoice_number': result['invoice_number'],
                    'buyer_id': 1,  # You'll need to implement buyer lookup/creation
                    'supplier_id': 1,  # You'll need to implement supplier lookup/creation
                    'amount': float(result['total_amount']) - float(result['tax_amount']),
                    'tax_amount': float(result['tax_amount']),
                    'total_amount': float(result['total_amount']),
                    'status': InvoiceStatus.DRAFT.value,
                    'due_date': datetime.strptime(result['issue_date'], "%Y-%m-%d").isoformat(),
                    'notes': f"Processed from PDF: {pdf_file.filename}, Page: {result.get('page_number', 1)}"
                }
                
                invoice = await db.insert_invoice(invoice_data)
                created_invoices.append(invoice)

            return {
                "success": True,
                "message": f"Successfully processed {len(created_invoices)} invoices",
                "invoices": created_invoices,
                "output_file": output_file
            }

        finally:
            # Cleanup temporary files
            if os.path.exists(temp_pdf_path):
                os.remove(temp_pdf_path)
            if os.path.exists(output_folder):
                for file in os.listdir(output_folder):
                    os.remove(os.path.join(output_folder, file))
                os.rmdir(output_folder)

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) 
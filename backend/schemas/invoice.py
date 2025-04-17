from pydantic import BaseModel, Field, validator
from datetime import datetime
from typing import Optional
from models.invoice import InvoiceStatus

class InvoiceBase(BaseModel):
    invoice_number: str = Field(..., description="Unique invoice number")
    buyer_id: int = Field(..., description="ID of the buyer")
    supplier_id: int = Field(..., description="ID of the supplier")
    amount: float = Field(..., ge=0, description="Invoice amount before tax")
    tax_amount: float = Field(0.0, ge=0, description="Tax amount")
    total_amount: float = Field(..., ge=0, description="Total invoice amount including tax")
    due_date: datetime = Field(..., description="Due date for the invoice")
    notes: Optional[str] = Field(None, description="Additional notes")

    @validator('total_amount')
    def validate_total_amount(cls, v, values):
        amount = values.get('amount', 0)
        tax_amount = values.get('tax_amount', 0)
        if v != amount + tax_amount:
            raise ValueError("Total amount must equal amount plus tax amount")
        return v

class InvoiceCreate(InvoiceBase):
    pass

class InvoiceUpdate(BaseModel):
    status: Optional[InvoiceStatus] = None
    due_date: Optional[datetime] = None
    notes: Optional[str] = None

class InvoiceInDB(InvoiceBase):
    id: int
    status: InvoiceStatus
    issue_date: datetime
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class InvoiceResponse(InvoiceInDB):
    pass 
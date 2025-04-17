from pydantic import BaseModel, Field, validator
from datetime import datetime
from typing import Optional
from models.payment import PaymentMethod, PaymentStatus

class PaymentBase(BaseModel):
    invoice_id: int = Field(..., description="ID of the invoice being paid")
    amount: float = Field(..., ge=0, description="Payment amount")
    payment_method: PaymentMethod = Field(..., description="Method of payment")
    transaction_id: Optional[str] = Field(None, description="External transaction ID")
    notes: Optional[str] = Field(None, description="Additional notes")

class PaymentCreate(PaymentBase):
    pass

class PaymentUpdate(BaseModel):
    status: Optional[PaymentStatus] = None
    transaction_id: Optional[str] = None
    notes: Optional[str] = None

class PaymentInDB(PaymentBase):
    id: int
    status: PaymentStatus
    payment_date: datetime
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class PaymentResponse(PaymentInDB):
    pass 
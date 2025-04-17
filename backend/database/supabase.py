from supabase import create_client, Client
from dotenv import load_dotenv
import os
import logging
from typing import Optional, Dict, List

# Load environment variables
load_dotenv()

logger = logging.getLogger(__name__)

class SupabaseClient:
    _instance = None
    _client: Optional[Client] = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(SupabaseClient, cls).__new__(cls)
        return cls._instance

    def __init__(self):
        if not self._client:
            self._initialize_client()

    def _initialize_client(self):
        """Initialize Supabase client with environment variables."""
        try:
            supabase_url = os.getenv("SUPABASE_URL")
            supabase_key = os.getenv("SUPABASE_KEY")

            if not supabase_url or not supabase_key:
                raise ValueError("Supabase URL and key must be provided in environment variables")

            self._client = create_client(supabase_url, supabase_key)  # No options
            logger.info("Supabase client initialized successfully")
        except Exception as e:
            logger.error(f"Failed to initialize Supabase client: {str(e)}")
            raise

    @property
    def client(self) -> Client:
        """Get the Supabase client instance."""
        if not self._client:
            self._initialize_client()
        return self._client

class Database:
    def __init__(self):
        self.client = SupabaseClient().client

    async def insert_invoice(self, invoice_data: Dict) -> Dict:
        """Insert a single invoice into the database."""
        try:
            result = self.client.table('invoices').insert(invoice_data).execute()
            return result.data[0] if result.data else None
        except Exception as e:
            logger.error(f"Error inserting invoice: {str(e)}")
            raise

    async def insert_multiple_invoices(self, invoices: List[Dict]) -> List[Dict]:
        """Insert multiple invoices into the database."""
        try:
            result = self.client.table('invoices').insert(invoices).execute()
            return result.data
        except Exception as e:
            logger.error(f"Error inserting multiple invoices: {str(e)}")
            raise

    async def get_invoice(self, invoice_id: int) -> Optional[Dict]:
        """Get an invoice by ID."""
        try:
            result = self.client.table('invoices').select("*").eq('id', invoice_id).execute()
            return result.data[0] if result.data else None
        except Exception as e:
            logger.error(f"Error fetching invoice: {str(e)}")
            raise

    async def update_invoice(self, invoice_id: int, update_data: Dict) -> Optional[Dict]:
        """Update an invoice."""
        try:
            result = self.client.table('invoices').update(update_data).eq('id', invoice_id).execute()
            return result.data[0] if result.data else None
        except Exception as e:
            logger.error(f"Error updating invoice: {str(e)}")
            raise

    async def delete_invoice(self, invoice_id: int) -> bool:
        """Delete an invoice."""
        try:
            result = self.client.table('invoices').delete().eq('id', invoice_id).execute()
            return bool(result.data)
        except Exception as e:
            logger.error(f"Error deleting invoice: {str(e)}")
            raise

    async def get_invoices_by_filter(self, filters: Dict = None, skip: int = 0, limit: int = 100) -> List[Dict]:
        """Get invoices with optional filters."""
        try:
            query = self.client.table('invoices').select("*")
            
            if filters:
                for key, value in filters.items():
                    if value is not None:
                        query = query.eq(key, value)
            
            result = query.range(skip, skip + limit - 1).execute()
            return result.data
        except Exception as e:
            logger.error(f"Error fetching invoices: {str(e)}")
            raise

    async def get_overdue_invoices(self) -> List[Dict]:
        """Get all overdue invoices."""
        try:
            from datetime import datetime
            current_date = datetime.utcnow().date().isoformat()
            
            result = self.client.table('invoices')\
                .select("*")\
                .lt('due_date', current_date)\
                .not_eq('status', 'paid')\
                .execute()
                
            return result.data
        except Exception as e:
            logger.error(f"Error fetching overdue invoices: {str(e)}")
            raise

    # Add methods for other tables (payments, suppliers, buyers, etc.)
    async def insert_payment(self, payment_data: Dict) -> Dict:
        """Insert a payment record."""
        try:
            result = self.client.table('payments').insert(payment_data).execute()
            return result.data[0] if result.data else None
        except Exception as e:
            logger.error(f"Error inserting payment: {str(e)}")
            raise

    async def get_payments_by_invoice(self, invoice_id: int) -> List[Dict]:
        """Get all payments for an invoice."""
        try:
            result = self.client.table('payments')\
                .select("*")\
                .eq('invoice_id', invoice_id)\
                .execute()
            return result.data
        except Exception as e:
            logger.error(f"Error fetching payments: {str(e)}")
            raise 
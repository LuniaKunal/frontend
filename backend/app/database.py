from supabase import create_client, Client
from dotenv import load_dotenv
import os
import logging
from typing import Optional
from functools import lru_cache

# Load environment variables
load_dotenv()

logger = logging.getLogger(__name__)

class DatabaseManager:
    _instance: Optional['DatabaseManager'] = None
    _client: Optional[Client] = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(DatabaseManager, cls).__new__(cls)
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

            self._client = create_client(supabase_url, supabase_key)
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

@lru_cache()
def get_database() -> DatabaseManager:
    """Get a cached instance of DatabaseManager."""
    return DatabaseManager()

# Dependency for FastAPI routes
async def get_db():
    """Dependency to get database client for FastAPI routes."""
    db = get_database()
    try:
        yield db.client
    except Exception as e:
        logger.error(f"Database error: {str(e)}")
        raise 
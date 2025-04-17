from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
import logging
from datetime import datetime
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(
    filename=f'app_{datetime.now().strftime("%Y%m%d_%H%M%S")}.log',
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(
    title=os.getenv("APP_NAME", "Invoice Management System"),
    description="Backend API for Invoice Management System with Gemini AI Integration",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Import routers
from routes import invoices #, payments, ledger, outstanding, commission, alerts

# Include routers with prefixes
app.include_router(invoices.router, prefix="/api/v1/invoices", tags=["invoices"])
# app.include_router(payments.router, prefix="/api/v1/payments", tags=["payments"])
# app.include_router(ledger.router, prefix="/api/v1/ledger", tags=["ledger"])
# app.include_router(outstanding.router, prefix="/api/v1/outstanding", tags=["outstanding"])
# app.include_router(commission.router, prefix="/api/v1/commission", tags=["commission"])
# app.include_router(alerts.router, prefix="/api/v1/alerts", tags=["alerts"])

@app.get("/")
async def root():
    """Root endpoint returning API information."""
    return {
        "message": "Welcome to Invoice Management System API",
        "version": "1.0.0",
        "docs_url": "/docs",
        "features": [
            "Invoice Processing with Gemini AI",
            "Payment Management",
            "Ledger Reports",
            "Outstanding Reports",
            "Commission Reports",
            "Payment Reminder Alerts"
        ]
    }

@app.on_event("startup")
async def startup_event():
    """Startup event handler."""
    logger.info("Starting up the application...")
    # Verify database connection
    from database.supabase import Database
    try:
        db = Database()
        logger.info("Database connection verified")
    except Exception as e:
        logger.error(f"Database connection failed: {str(e)}")
        raise

@app.on_event("shutdown")
async def shutdown_event():
    """Shutdown event handler."""
    logger.info("Shutting down the application...")
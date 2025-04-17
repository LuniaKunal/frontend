import os
import google.generativeai as genai
import fitz  # PyMuPDF
import base64
import json
import time
import logging
from datetime import datetime
from typing import Dict, Optional, List, Tuple
import pandas as pd
from dotenv import load_dotenv

load_dotenv()

# Configure logging
logging.basicConfig(
    filename=f'bill_processing_{datetime.now().strftime("%Y%m%d_%H%M%S")}.log',
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)

# Configure Gemini API
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
if not GOOGLE_API_KEY:
    raise ValueError("Please set the GOOGLE_API_KEY environment variable.")
genai.configure(api_key=GOOGLE_API_KEY)
model = genai.GenerativeModel('gemini-2.0-flash-exp')

async def pdf_to_images(pdf_path: str, output_folder: str, zoom: int = 3) -> List[str]:
    """Convert PDF pages to images."""
    try:
        logging.info(f"Starting PDF to image conversion for file: {pdf_path}")
        os.makedirs(output_folder, exist_ok=True)
        
        image_paths = []
        pdf_document = fitz.open(pdf_path)
        
        for page_num in range(len(pdf_document)):
            page = pdf_document.load_page(page_num)
            mat = fitz.Matrix(zoom, zoom)
            pix = page.get_pixmap(matrix=mat)
            
            output_path = os.path.join(output_folder, f"page_{page_num + 1}.jpg")
            pix.save(output_path, "jpeg")
            image_paths.append(output_path)
            logging.info(f"Processed and saved page {page_num + 1}")
            
        pdf_document.close()
        return image_paths
        
    except Exception as e:
        logging.error(f"Error in pdf_to_images: {str(e)}")
        raise

async def extract_invoice_data(image_path: str) -> Optional[Dict]:
    """Extract invoice data from an image using Gemini API."""
    try:
        logging.info(f"Processing image: {image_path}")
        
        with open(image_path, 'rb') as image_file:
            image_content = image_file.read()
        
        prompt = """From the following context: fill the given template fields.
            Template : What is the ["Date",
                "Seller",
                "Seller Gst No.",
                "Client",
                "Invoice Number / Bill No.",
                "Transport",
                "LR. No.",
                "Clinet Gst No.",
                "City Name / Area of the Client",
                "Items or Desciption of Goods Details",
                "Quantity"
                "Rate of Goods",
                "Less / Discount Amount"
                "Total Gst Amount",
                "Total Amount"]?
            Add all the goods that are present in the table with comma seperator. All add the rate of goods with comma seperator.
            The output should be in json foramt.
            Provide only the field name and its answer, if the answer is not present in the context answer "NAN" for that field."""
        
        response = model.generate_content([
            {
                'mime_type': 'image/jpeg',
                'data': base64.b64encode(image_content).decode('utf-8')
            },
            prompt
        ])
        
        # Clean and parse response
        cleaned_response = response.text.replace("```json", "").replace("```", "").strip()
        result = json.loads(cleaned_response)
        
        # Map the extracted fields to our invoice schema
        mapped_data = {
            "invoice_number": result.get("Invoice Number / Bill No.", ""),
            "issue_date": result.get("Date", datetime.now().strftime("%d/%m/%Y")),
            "supplier_details": {
                "name": result.get("Seller", ""),
                "gst_no": result.get("Seller Gst No.", "")
            },
            "buyer_details": {
                "name": result.get("Client", ""),
                "gst_no": result.get("Clinet Gst No.", ""),
                "city": result.get("City Name / Area of the Client", "")
            },
            "items": result.get("Items or Desciption of Goods Details", "").split(","),
            "quantities": result.get("Quantity", "").split(","),
            "rates": result.get("Rate of Goods", "").split(","),
            "discount": result.get("Less / Discount Amount", 0),
            "tax_amount": result.get("Total Gst Amount", 0),
            "total_amount": result.get("Total Amount", 0)
        }
        
        return mapped_data
        
    except Exception as e:
        logging.error(f"Error extracting invoice data: {str(e)}")
        return None

async def process_pdf_invoice(pdf_path: str, output_folder: str) -> Tuple[pd.DataFrame, str]:
    """Process a PDF invoice and extract data from all pages."""
    try:
        # Convert PDF to images
        image_paths = await pdf_to_images(pdf_path, output_folder)
        
        # Extract data from each image
        all_results = []
        for idx, image_path in enumerate(image_paths, 1):
            result = await extract_invoice_data(image_path)
            if result:
                result['page_number'] = idx
                all_results.append(result)
            time.sleep(2)  # Rate limiting
            
        # Create DataFrame
        df = pd.DataFrame(all_results)
        
        # Save results
        output_file = f"invoice_details_{datetime.now().strftime('%Y%m%d_%H%M%S')}.csv"
        df.to_csv(output_file, index=False)
        
        return df, output_file
        
    except Exception as e:
        logging.error(f"Error processing PDF invoice: {str(e)}")
        raise

async def validate_extracted_data(data: Dict) -> bool:
    """
    Validate the extracted invoice data.
    Returns True if data is valid, False otherwise.
    """
    required_fields = [
        "invoice_number",
        "issue_date",
        "due_date",
        "total_amount"
    ]
    
    try:
        # Check required fields
        for field in required_fields:
            if not data.get(field):
                print(f"Missing required field: {field}")
                return False
        
        # Validate amounts
        if data["total_amount"] <= 0:
            print("Invalid total amount")
            return False
            
        if data["tax_amount"] < 0:
            print("Invalid tax amount")
            return False
            
        # Validate dates
        if data["due_date"] < data["issue_date"]:
            print("Due date cannot be earlier than issue date")
            return False
            
        return True
        
    except Exception as e:
        print(f"Error validating data: {str(e)}")
        return False 
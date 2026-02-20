"from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Placeholder email - Admin can update this
ADMIN_EMAIL = \"hello@gadgethavenabuja.com\"

# Create the main app
app = FastAPI(title=\"Gadget Haven API\", version=\"1.0.0\")

# Create a router with the /api prefix
api_router = APIRouter(prefix=\"/api\")

# ============== MODELS ==============

class ContactForm(BaseModel):
    model_config = ConfigDict(extra=\"ignore\")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: str
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ContactFormCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    message: str

class SellRequest(BaseModel):
    model_config = ConfigDict(extra=\"ignore\")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    device_type: str
    model: str
    storage: str
    condition: str
    battery_health: Optional[str] = None
    name: str
    email: EmailStr
    phone: str
    additional_info: Optional[str] = None
    status: str = \"pending\"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class SellRequestCreate(BaseModel):
    device_type: str
    model: str
    storage: str
    condition: str
    battery_health: Optional[str] = None
    name: str
    email: EmailStr
    phone: str
    additional_info: Optional[str] = None

class SwapRequest(BaseModel):
    model_config = ConfigDict(extra=\"ignore\")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    current_device_type: str
    current_model: str
    current_condition: str
    desired_device: str
    name: str
    email: EmailStr
    phone: str
    additional_info: Optional[str] = None
    status: str = \"pending\"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class SwapRequestCreate(BaseModel):
    current_device_type: str
    current_model: str
    current_condition: str
    desired_device: str
    name: str
    email: EmailStr
    phone: str
    additional_info: Optional[str] = None

class RepairBooking(BaseModel):
    model_config = ConfigDict(extra=\"ignore\")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    device_type: str
    device_model: str
    issue: str
    issue_description: Optional[str] = None
    preferred_date: str
    name: str
    phone: str
    email: Optional[EmailStr] = None
    status: str = \"pending\"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class RepairBookingCreate(BaseModel):
    device_type: str
    device_model: str
    issue: str
    issue_description: Optional[str] = None
    preferred_date: str
    name: str
    phone: str
    email: Optional[EmailStr] = None

class PriceQuoteRequest(BaseModel):
    model_config = ConfigDict(extra=\"ignore\")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    product_name: str
    product_category: str
    name: str
    phone: str
    email: Optional[EmailStr] = None
    message: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class PriceQuoteRequestCreate(BaseModel):
    product_name: str
    product_category: str
    name: str
    phone: str
    email: Optional[EmailStr] = None
    message: Optional[str] = None

# Products (static data for now)
PRODUCTS = [
    # iPhones
    {\"id\": \"1\", \"name\": \"iPhone 15 Pro Max\", \"category\": \"iPhones\", \"storage\": \"256GB\", \"condition\": \"Brand New\", \"price\": \"₦1,450,000\", \"image\": \"https://images.unsplash.com/photo-1695822958645-b2b058159215?w=400&h=400&fit=crop\"},
    {\"id\": \"2\", \"name\": \"iPhone 15 Pro\", \"category\": \"iPhones\", \"storage\": \"128GB\", \"condition\": \"Brand New\", \"price\": \"₦1,200,000\", \"image\": \"https://images.unsplash.com/photo-1678652197831-2d180705cd2c?w=400&h=400&fit=crop\"},
    {\"id\": \"3\", \"name\": \"iPhone 14 Pro Max\", \"category\": \"iPhones\", \"storage\": \"256GB\", \"condition\": \"UK Used\", \"price\": \"₦850,000\", \"image\": \"https://images.unsplash.com/photo-1663499482523-1c0c1bae4ce1?w=400&h=400&fit=crop\"},
    {\"id\": \"4\", \"name\": \"iPhone 13 Pro\", \"category\": \"iPhones\", \"storage\": \"128GB\", \"condition\": \"UK Used\", \"price\": \"₦550,000\", \"image\": \"https://images.unsplash.com/photo-1632633173522-47456de71b76?w=400&h=400&fit=crop\"},
    # Samsung
    {\"id\": \"5\", \"name\": \"Samsung Galaxy S24 Ultra\", \"category\": \"Samsung\", \"storage\": \"256GB\", \"condition\": \"Brand New\", \"price\": \"₦1,300,000\", \"image\": \"https://images.unsplash.com/photo-1706573616951-3bb6fa4e0359?w=400&h=400&fit=crop\"},
    {\"id\": \"6\", \"name\": \"Samsung Galaxy S23+\", \"category\": \"Samsung\", \"storage\": \"256GB\", \"condition\": \"UK Used\", \"price\": \"₦650,000\", \"image\": \"https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=400&h=400&fit=crop\"},
    {\"id\": \"7\", \"name\": \"Samsung Galaxy Z Fold 5\", \"category\": \"Samsung\", \"storage\": \"512GB\", \"condition\": \"Brand New\", \"price\": \"₦1,500,000\", \"image\": \"https://images.unsplash.com/photo-1664478546384-d57ffe74a78c?w=400&h=400&fit=crop\"},
    {\"id\": \"8\", \"name\": \"Samsung Galaxy A54\", \"category\": \"Samsung\", \"storage\": \"128GB\", \"condition\": \"Brand New\", \"price\": \"₦350,000\", \"image\": \"https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop\"},
    # UK Used
    {\"id\": \"9\", \"name\": \"iPhone 12 Pro Max\", \"category\": \"UK Used\", \"storage\": \"256GB\", \"condition\": \"UK Used - Excellent\", \"price\": \"₦420,000\", \"image\": \"https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=400&h=400&fit=crop\"},
    {\"id\": \"10\", \"name\": \"iPhone 11 Pro\", \"category\": \"UK Used\", \"storage\": \"64GB\", \"condition\": \"UK Used - Good\", \"price\": \"₦280,000\", \"image\": \"https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=400&h=400&fit=crop\"},
    {\"id\": \"11\", \"name\": \"Samsung Galaxy S22 Ultra\", \"category\": \"UK Used\", \"storage\": \"128GB\", \"condition\": \"UK Used - Excellent\", \"price\": \"₦480,000\", \"image\": \"https://images.unsplash.com/photo-1644501635467-e969e0c2bea3?w=400&h=400&fit=crop\"},
    {\"id\": \"12\", \"name\": \"Google Pixel 7 Pro\", \"category\": \"UK Used\", \"storage\": \"128GB\", \"condition\": \"UK Used - Good\", \"price\": \"₦350,000\", \"image\": \"https://images.unsplash.com/photo-1667574093328-b08e0a94d7b7?w=400&h=400&fit=crop\"},
    # Accessories
    {\"id\": \"13\", \"name\": \"AirPods Pro (2nd Gen)\", \"category\": \"Accessories\", \"storage\": \"\", \"condition\": \"Brand New\", \"price\": \"₦180,000\", \"image\": \"https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400&h=400&fit=crop\"},
    {\"id\": \"14\", \"name\": \"Apple Watch Series 9\", \"category\": \"Accessories\", \"storage\": \"45mm\", \"condition\": \"Brand New\", \"price\": \"₦450,000\", \"image\": \"https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&h=400&fit=crop\"},
    {\"id\": \"15\", \"name\": \"Samsung Galaxy Buds Pro\", \"category\": \"Accessories\", \"storage\": \"\", \"condition\": \"Brand New\", \"price\": \"₦95,000\", \"image\": \"https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop\"},
    {\"id\": \"16\", \"name\": \"MagSafe Charger\", \"category\": \"Accessories\", \"storage\": \"\", \"condition\": \"Brand New\", \"price\": \"₦45,000\", \"image\": \"https://images.unsplash.com/photo-1628815113969-0487917f4a14?w=400&h=400&fit=crop\"},
    # Laptops
    {\"id\": \"17\", \"name\": \"MacBook Air M2\", \"category\": \"Laptops\", \"storage\": \"256GB\", \"condition\": \"Brand New\", \"price\": \"₦1,100,000\", \"image\": \"https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop\"},
    {\"id\": \"18\", \"name\": \"MacBook Pro 14\\" M3\", \"category\": \"Laptops\", \"storage\": \"512GB\", \"condition\": \"Brand New\", \"price\": \"₦2,100,000\", \"image\": \"https://images.pexels.com/photos/5083412/pexels-photo-5083412.jpeg?w=400&h=400&fit=crop\"},
    {\"id\": \"19\", \"name\": \"Dell XPS 15\", \"category\": \"Laptops\", \"storage\": \"512GB SSD\", \"condition\": \"UK Used\", \"price\": \"₦650,000\", \"image\": \"https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&h=400&fit=crop\"},
    {\"id\": \"20\", \"name\": \"HP Spectre x360\", \"category\": \"Laptops\", \"storage\": \"256GB SSD\", \"condition\": \"UK Used\", \"price\": \"₦480,000\", \"image\": \"https://images.unsplash.com/photo-1544731612-de7f96afe55f?w=400&h=400&fit=crop\"},
]

REPAIR_SERVICES = [
    {\"id\": \"1\", \"name\": \"Screen Replacement\", \"description\": \"Cracked or damaged screen? We'll fix it good as new.\", \"price_from\": \"₦25,000\", \"icon\": \"screen\"},
    {\"id\": \"2\", \"name\": \"Battery Replacement\", \"description\": \"Phone dying too fast? Get a fresh battery installed.\", \"price_from\": \"₦15,000\", \"icon\": \"battery\"},
    {\"id\": \"3\", \"name\": \"Charging Port Repair\", \"description\": \"Not charging properly? We'll fix or replace the port.\", \"price_from\": \"₦10,000\", \"icon\": \"charging\"},
    {\"id\": \"4\", \"name\": \"Water Damage Repair\", \"description\": \"Dropped in water? Bring it in ASAP for recovery.\", \"price_from\": \"₦20,000\", \"icon\": \"water\"},
    {\"id\": \"5\", \"name\": \"Software Issues\", \"description\": \"Stuck on logo, freezing, or slow? We'll sort it out.\", \"price_from\": \"₦5,000\", \"icon\": \"software\"},
    {\"id\": \"6\", \"name\": \"Back Glass Replacement\", \"description\": \"Cracked back? We'll replace it with quality glass.\", \"price_from\": \"₦20,000\", \"icon\": \"glass\"},
]

TESTIMONIALS = [
    {\"id\": \"1\", \"name\": \"Chidi Okonkwo\", \"text\": \"Sold my old iPhone here and got a fair price. No wahala, quick payment. Will definitely recommend!\", \"rating\": 5, \"device\": \"Sold iPhone 12\"},
    {\"id\": \"2\", \"name\": \"Amina Bello\", \"text\": \"The swap deal was amazing! Upgraded from my Samsung S21 to S24 at a great rate. Professional service.\", \"rating\": 5, \"device\": \"Swapped Samsung\"},
    {\"id\": \"3\", \"name\": \"Emeka Nwosu\", \"text\": \"Fixed my cracked screen in less than 2 hours. Price was fair and the work is clean. Top notch!\", \"rating\": 5, \"device\": \"Screen Repair\"},
    {\"id\": \"4\", \"name\": \"Fatima Abubakar\", \"text\": \"Bought a UK used iPhone 14 Pro. Battery health was exactly as described. Honest business.\", \"rating\": 5, \"device\": \"Bought iPhone 14 Pro\"},
    {\"id\": \"5\", \"name\": \"Oluwaseun Adeyemi\", \"text\": \"Best gadget shop in Banex! They always have what I need and prices are competitive.\", \"rating\": 5, \"device\": \"Regular Customer\"},
    {\"id\": \"6\", \"name\": \"Grace Eze\", \"text\": \"My laptop was having issues, they diagnosed and fixed it same day. Very impressed!\", \"rating\": 5, \"device\": \"Laptop Repair\"},
]

# ============== ROUTES ==============

@api_router.get(\"/\")
async def root():
    return {\"message\": \"Welcome to Gadget Haven API\", \"version\": \"1.0.0\"}

@api_router.get(\"/health\")
async def health_check():
    return {\"status\": \"healthy\", \"timestamp\": datetime.now(timezone.utc).isoformat()}

# Products
@api_router.get(\"/products\")
async def get_products(category: Optional[str] = None):
    if category and category != \"All\":
        return [p for p in PRODUCTS if p[\"category\"] == category]
    return PRODUCTS

@api_router.get(\"/products/{product_id}\")
async def get_product(product_id: str):
    product = next((p for p in PRODUCTS if p[\"id\"] == product_id), None)
    if not product:
        raise HTTPException(status_code=404, detail=\"Product not found\")
    return product

@api_router.get(\"/categories\")
async def get_categories():
    return [\"All\", \"iPhones\", \"Samsung\", \"UK Used\", \"Accessories\", \"Laptops\"]

# Repair Services
@api_router.get(\"/repair-services\")
async def get_repair_services():
    return REPAIR_SERVICES

# Testimonials
@api_router.get(\"/testimonials\")
async def get_testimonials():
    return TESTIMONIALS

# Contact Form
@api_router.post(\"/contact\", response_model=ContactForm)
async def submit_contact_form(input: ContactFormCreate):
    contact_dict = input.model_dump()
    contact_obj = ContactForm(**contact_dict)
    
    doc = contact_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    await db.contact_forms.insert_one(doc)
    
    logger.info(f\"Contact form submitted: {contact_obj.email} - Would send to: {ADMIN_EMAIL}\")
    
    return contact_obj

# Sell/Trade-In Request
@api_router.post(\"/sell-request\", response_model=SellRequest)
async def submit_sell_request(input: SellRequestCreate):
    sell_dict = input.model_dump()
    sell_obj = SellRequest(**sell_dict)
    
    doc = sell_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    await db.sell_requests.insert_one(doc)
    
    logger.info(f\"Sell request submitted: {sell_obj.model} from {sell_obj.email}\")
    
    return sell_obj

@api_router.get(\"/sell-requests\", response_model=List[SellRequest])
async def get_sell_requests():
    requests = await db.sell_requests.find({}, {\"_id\": 0}).to_list(1000)
    for req in requests:
        if isinstance(req.get('created_at'), str):
            req['created_at'] = datetime.fromisoformat(req['created_at'])
    return requests

# Swap Request
@api_router.post(\"/swap-request\", response_model=SwapRequest)
async def submit_swap_request(input: SwapRequestCreate):
    swap_dict = input.model_dump()
    swap_obj = SwapRequest(**swap_dict)
    
    doc = swap_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    await db.swap_requests.insert_one(doc)
    
    logger.info(f\"Swap request submitted: {swap_obj.current_model} for {swap_obj.desired_device}\")
    
    return swap_obj

@api_router.get(\"/swap-requests\", response_model=List[SwapRequest])
async def get_swap_requests():
    requests = await db.swap_requests.find({}, {\"_id\": 0}).to_list(1000)
    for req in requests:
        if isinstance(req.get('created_at'), str):
            req['created_at'] = datetime.fromisoformat(req['created_at'])
    return requests

# Repair Booking
@api_router.post(\"/repair-booking\", response_model=RepairBooking)
async def submit_repair_booking(input: RepairBookingCreate):
    repair_dict = input.model_dump()
    repair_obj = RepairBooking(**repair_dict)
    
    doc = repair_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    await db.repair_bookings.insert_one(doc)
    
    logger.info(f\"Repair booking submitted: {repair_obj.device_model} - {repair_obj.issue}\")
    
    return repair_obj

@api_router.get(\"/repair-bookings\", response_model=List[RepairBooking])
async def get_repair_bookings():
    bookings = await db.repair_bookings.find({}, {\"_id\": 0}).to_list(1000)
    for booking in bookings:
        if isinstance(booking.get('created_at'), str):
            booking['created_at'] = datetime.fromisoformat(booking['created_at'])
    return bookings

# Price Quote Request
@api_router.post(\"/price-quote\", response_model=PriceQuoteRequest)
async def submit_price_quote(input: PriceQuoteRequestCreate):
    quote_dict = input.model_dump()
    quote_obj = PriceQuoteRequest(**quote_dict)
    
    doc = quote_obj.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    await db.price_quotes.insert_one(doc)
    
    logger.info(f\"Price quote requested for: {quote_obj.product_name}\")
    
    return quote_obj

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=[\"*\"],
    allow_headers=[\"*\"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event(\"shutdown\")
async def shutdown_db_client():
    client.close()
"
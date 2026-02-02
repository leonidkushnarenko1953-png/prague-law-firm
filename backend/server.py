from fastapi import FastAPI, APIRouter, HTTPException
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

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# ============ MODELS ============

class ConsultationBase(BaseModel):
    name: str
    email: EmailStr
    phone: str
    service: str
    preferred_date: str
    preferred_time: str
    message: Optional[str] = None
    language: str = "cs"

class ConsultationCreate(ConsultationBase):
    pass

class Consultation(ConsultationBase):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    status: str = "pending"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ContactMessageBase(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    subject: str
    message: str
    language: str = "cs"

class ContactMessageCreate(ContactMessageBase):
    pass

class ContactMessage(ContactMessageBase):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    is_read: bool = False
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class BlogPostBase(BaseModel):
    title_cs: str
    title_ru: str
    title_en: str
    excerpt_cs: str
    excerpt_ru: str
    excerpt_en: str
    content_cs: str
    content_ru: str
    content_en: str
    author: str
    category: str
    image_url: Optional[str] = None
    tags: List[str] = []

class BlogPostCreate(BlogPostBase):
    pass

class BlogPost(BlogPostBase):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    published: bool = True
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

# ============ ROUTES ============

@api_router.get("/")
async def root():
    return {"message": "Kushnarenko & Partners API"}

# Consultations
@api_router.post("/consultations", response_model=Consultation)
async def create_consultation(input: ConsultationCreate):
    consultation = Consultation(**input.model_dump())
    doc = consultation.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.consultations.insert_one(doc)
    return consultation

@api_router.get("/consultations", response_model=List[Consultation])
async def get_consultations():
    consultations = await db.consultations.find({}, {"_id": 0}).to_list(1000)
    for c in consultations:
        if isinstance(c['created_at'], str):
            c['created_at'] = datetime.fromisoformat(c['created_at'])
    return consultations

@api_router.get("/consultations/{consultation_id}", response_model=Consultation)
async def get_consultation(consultation_id: str):
    consultation = await db.consultations.find_one({"id": consultation_id}, {"_id": 0})
    if not consultation:
        raise HTTPException(status_code=404, detail="Consultation not found")
    if isinstance(consultation['created_at'], str):
        consultation['created_at'] = datetime.fromisoformat(consultation['created_at'])
    return consultation

@api_router.patch("/consultations/{consultation_id}/status")
async def update_consultation_status(consultation_id: str, status: str):
    result = await db.consultations.update_one(
        {"id": consultation_id},
        {"$set": {"status": status}}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Consultation not found")
    return {"message": "Status updated"}

# Contact Messages
@api_router.post("/contacts", response_model=ContactMessage)
async def create_contact_message(input: ContactMessageCreate):
    message = ContactMessage(**input.model_dump())
    doc = message.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.contact_messages.insert_one(doc)
    return message

@api_router.get("/contacts", response_model=List[ContactMessage])
async def get_contact_messages():
    messages = await db.contact_messages.find({}, {"_id": 0}).to_list(1000)
    for m in messages:
        if isinstance(m['created_at'], str):
            m['created_at'] = datetime.fromisoformat(m['created_at'])
    return messages

# Blog Posts
@api_router.get("/blog", response_model=List[BlogPost])
async def get_blog_posts():
    posts = await db.blog_posts.find({"published": True}, {"_id": 0}).to_list(100)
    for p in posts:
        if isinstance(p['created_at'], str):
            p['created_at'] = datetime.fromisoformat(p['created_at'])
    return posts

@api_router.get("/blog/{post_id}", response_model=BlogPost)
async def get_blog_post(post_id: str):
    post = await db.blog_posts.find_one({"id": post_id, "published": True}, {"_id": 0})
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    if isinstance(post['created_at'], str):
        post['created_at'] = datetime.fromisoformat(post['created_at'])
    return post

@api_router.post("/blog", response_model=BlogPost)
async def create_blog_post(input: BlogPostCreate):
    post = BlogPost(**input.model_dump())
    doc = post.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.blog_posts.insert_one(doc)
    return post

# Available time slots
@api_router.get("/available-slots")
async def get_available_slots(date: str):
    # Get booked slots for the date
    booked = await db.consultations.find(
        {"preferred_date": date, "status": {"$ne": "cancelled"}},
        {"_id": 0, "preferred_time": 1}
    ).to_list(100)
    booked_times = [b['preferred_time'] for b in booked]
    
    # All possible time slots
    all_slots = [
        "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
        "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"
    ]
    
    available = [slot for slot in all_slots if slot not in booked_times]
    return {"date": date, "available_slots": available}

# Seed blog posts
@api_router.post("/seed-blog")
async def seed_blog_posts():
    existing = await db.blog_posts.count_documents({})
    if existing > 0:
        return {"message": "Blog already seeded"}
    
    sample_posts = [
        {
            "title_cs": "Změny v imigrační legislativě 2024",
            "title_ru": "Изменения в иммиграционном законодательстве 2024",
            "title_en": "Immigration Law Changes 2024",
            "excerpt_cs": "Přehled nejdůležitějších změn v české imigrační legislativě pro rok 2024.",
            "excerpt_ru": "Обзор важнейших изменений в чешском иммиграционном законодательстве на 2024 год.",
            "excerpt_en": "Overview of the most important changes in Czech immigration legislation for 2024.",
            "content_cs": "Podrobný rozbor nových pravidel pro získání pracovního povolení a trvalého pobytu v České republice...",
            "content_ru": "Подробный разбор новых правил получения разрешения на работу и постоянного проживания в Чешской Республике...",
            "content_en": "Detailed analysis of new rules for obtaining work permits and permanent residence in the Czech Republic...",
            "author": "Mgr. Anna Kushnorenko",
            "category": "immigration",
            "image_url": "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800",
            "tags": ["immigration", "law", "2024"]
        },
        {
            "title_cs": "Založení společnosti v ČR: Kompletní průvodce",
            "title_ru": "Регистрация компании в ЧР: Полное руководство",
            "title_en": "Company Registration in Czech Republic: Complete Guide",
            "excerpt_cs": "Vše co potřebujete vědět o založení s.r.o. nebo a.s. v České republice.",
            "excerpt_ru": "Всё, что нужно знать о регистрации ООО или АО в Чешской Республике.",
            "excerpt_en": "Everything you need to know about registering an LLC or JSC in the Czech Republic.",
            "content_cs": "Krok za krokem vás provedeme procesem zakládání obchodní společnosti...",
            "content_ru": "Пошагово проведём вас через процесс регистрации коммерческой компании...",
            "content_en": "Step by step guide through the process of establishing a business company...",
            "author": "JUDr. Pavel Novák",
            "category": "corporate",
            "image_url": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800",
            "tags": ["corporate", "business", "registration"]
        },
        {
            "title_cs": "Ochrana práv spotřebitele v ČR",
            "title_ru": "Защита прав потребителей в ЧР",
            "title_en": "Consumer Rights Protection in Czech Republic",
            "excerpt_cs": "Jaká práva máte jako spotřebitel a jak je uplatnit.",
            "excerpt_ru": "Какие права у вас есть как у потребителя и как их реализовать.",
            "excerpt_en": "What rights you have as a consumer and how to exercise them.",
            "content_cs": "Podrobný přehled vašich práv při nákupu zboží a služeb...",
            "content_ru": "Подробный обзор ваших прав при покупке товаров и услуг...",
            "content_en": "Detailed overview of your rights when purchasing goods and services...",
            "author": "Mgr. Elena Sokolova",
            "category": "civil",
            "image_url": "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800",
            "tags": ["consumer", "rights", "civil"]
        }
    ]
    
    for post_data in sample_posts:
        post = BlogPost(**post_data)
        doc = post.model_dump()
        doc['created_at'] = doc['created_at'].isoformat()
        await db.blog_posts.insert_one(doc)
    
    return {"message": "Blog seeded with sample posts"}

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

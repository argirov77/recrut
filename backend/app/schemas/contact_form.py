from datetime import datetime
from pydantic import BaseModel, EmailStr
from typing import Optional


class ContactFormBase(BaseModel):
    full_name: str
    country: str
    email: EmailStr
    phone: str
    position: Optional[str] = None
    message: Optional[str] = None


class ContactFormCreate(ContactFormBase):
    pass


class ContactFormResponse(ContactFormBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

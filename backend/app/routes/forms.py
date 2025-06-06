from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.db.database import get_db
from app.db.models import ContactForm, User
from app.routes.auth import get_current_user
from app.schemas.contact_form import (
    ContactFormCreate,
    ContactFormResponse,
)

router = APIRouter(prefix="/forms", tags=["forms"])


async def admin_required(current_user: User = Depends(get_current_user)) -> User:
    if current_user.role != "admin" and not current_user.is_superuser:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin privileges required",
        )
    return current_user


@router.post("/", response_model=ContactFormResponse, status_code=status.HTTP_201_CREATED)
async def submit_form(form_in: ContactFormCreate, db: AsyncSession = Depends(get_db)):
    form = ContactForm(**form_in.dict())
    db.add(form)
    await db.commit()
    await db.refresh(form)
    return form


@router.get("/", response_model=list[ContactFormResponse], dependencies=[Depends(admin_required)])
async def list_forms(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(ContactForm))
    return result.scalars().all()

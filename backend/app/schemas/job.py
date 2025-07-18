from datetime import datetime
from typing import Optional
from pydantic import BaseModel


class JobTranslation(BaseModel):
    language: str
    location: str
    job_type: str
    title: str
    description: str
    requirements: str


class JobBase(BaseModel):
    title: str
    location: str
    job_type: str
    description: str
    requirements: str


class JobCreate(JobBase):
    translations: list[JobTranslation] = []


class JobUpdate(BaseModel):
    title: Optional[str] = None
    location: Optional[str] = None
    job_type: Optional[str] = None
    description: Optional[str] = None
    requirements: Optional[str] = None
    translations: Optional[list[JobTranslation]] = None


class JobResponse(JobBase):
    id: int
    created_at: datetime
    updated_at: datetime
    translations: list[JobTranslation] = []
    title_en: Optional[str] = None
    title_ru: Optional[str] = None
    title_bg: Optional[str] = None
    description_en: Optional[str] = None
    description_ru: Optional[str] = None
    description_bg: Optional[str] = None
    requirements_en: Optional[str] = None
    requirements_ru: Optional[str] = None
    requirements_bg: Optional[str] = None
    location_en: Optional[str] = None
    location_ru: Optional[str] = None
    location_bg: Optional[str] = None
    job_type_en: Optional[str] = None
    job_type_ru: Optional[str] = None
    job_type_bg: Optional[str] = None

    class Config:
        from_attributes = True

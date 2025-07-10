from datetime import datetime
from typing import Optional
from pydantic import BaseModel


class JobTranslation(BaseModel):
    language: str
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

    class Config:
        from_attributes = True

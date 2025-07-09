from datetime import datetime
from typing import Optional
from pydantic import BaseModel


class JobBase(BaseModel):
    title: str
    location: str
    job_type: str
    description: str
    requirements: str


class JobCreate(JobBase):
    pass


class JobUpdate(BaseModel):
    title: Optional[str] = None
    location: Optional[str] = None
    job_type: Optional[str] = None
    description: Optional[str] = None
    requirements: Optional[str] = None


class JobResponse(JobBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

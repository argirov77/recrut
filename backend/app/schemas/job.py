from datetime import datetime
from typing import Optional
from pydantic import BaseModel, field_validator

class JobBase(BaseModel):
    title: str
    description: str
    location: str
    salary_min: int
    salary_max: int
    is_active: bool = True

    @field_validator('salary_max')
    def check_salaries(cls, v, info):
        salary_min = info.data.get('salary_min') if info else None
        if salary_min is not None and v < salary_min:
            raise ValueError('salary_max must be >= salary_min')
        return v

class JobCreate(JobBase):
    pass

class JobUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    location: Optional[str] = None
    salary_min: Optional[int] = None
    salary_max: Optional[int] = None
    is_active: Optional[bool] = None

    @field_validator('salary_max')
    def validate_salaries(cls, v, info):
        salary_min = info.data.get('salary_min') if info else None
        if salary_min is not None and v is not None and v < salary_min:
            raise ValueError('salary_max must be >= salary_min')
        return v

class JobRead(JobBase):
    id: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

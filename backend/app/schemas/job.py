from typing import Optional
from pydantic import BaseModel, constr


class JobBase(BaseModel):
    title: constr(min_length=1)
    description: constr(min_length=1)


class JobCreate(JobBase):
    pass


class JobUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None


class JobRead(JobBase):
    id: str

    class Config:
        from_attributes = True

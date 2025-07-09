from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import Optional

from app.db.database import get_db
from app.db.models import Job, User
from app.routes.auth import get_current_user
from app.schemas.job import JobCreate, JobUpdate, JobRead

router = APIRouter(prefix="/admin/jobs", tags=["jobs"])


def admin_or_manager(current_user: User = Depends(get_current_user)) -> User:
    if current_user.role not in {"admin", "manager"} and not current_user.is_superuser:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin or manager privileges required",
        )
    return current_user


@router.get("/", response_model=list[JobRead], dependencies=[Depends(admin_or_manager)])
async def list_jobs(
    is_active: Optional[bool] = None,
    skip: int = 0,
    limit: int = 100,
    db: AsyncSession = Depends(get_db),
):
    query = select(Job).offset(skip).limit(limit)
    if is_active is not None:
        query = query.where(Job.is_active == is_active)
    result = await db.execute(query)
    return result.scalars().all()


@router.post("/", response_model=JobRead, dependencies=[Depends(admin_or_manager)])
async def create_job(job_in: JobCreate, db: AsyncSession = Depends(get_db)):
    job = Job(**job_in.dict())
    db.add(job)
    await db.commit()
    await db.refresh(job)
    return job


@router.get("/{job_id}", response_model=JobRead, dependencies=[Depends(admin_or_manager)])
async def get_job(job_id: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Job).where(Job.id == job_id))
    job = result.scalar_one_or_none()
    if not job:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job not found")
    return job


@router.put("/{job_id}", response_model=JobRead, dependencies=[Depends(admin_or_manager)])
async def update_job(job_id: str, job_in: JobUpdate, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Job).where(Job.id == job_id))
    job = result.scalar_one_or_none()
    if not job:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job not found")
    for field, value in job_in.dict(exclude_unset=True).items():
        setattr(job, field, value)
    await db.commit()
    await db.refresh(job)
    return job


@router.delete("/{job_id}", status_code=status.HTTP_204_NO_CONTENT, dependencies=[Depends(admin_or_manager)])
async def delete_job(job_id: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Job).where(Job.id == job_id))
    job = result.scalar_one_or_none()
    if not job:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job not found")
    await db.delete(job)
    await db.commit()
    return None

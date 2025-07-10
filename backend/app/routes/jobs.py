# app/routes/jobs.py

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.db.database import get_db
from app.db.models import Job, User
from app.routes.auth import get_current_user
from app.schemas.job import JobCreate, JobUpdate, JobResponse

router = APIRouter(
    prefix="/admin/jobs",
    tags=["admin", "jobs"],
)


async def admin_required(current_user: User = Depends(get_current_user)) -> User:
    if current_user.role != "admin" and not current_user.is_superuser:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin privileges required"
        )
    return current_user


@router.get("/", response_model=list[JobResponse])
async def list_jobs(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Job))
    return result.scalars().all()


@router.get("/{job_id}", response_model=JobResponse)
async def get_job(job_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Job).where(Job.id == job_id))
    job = result.scalar_one_or_none()
    if not job:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job not found")
    return job


@router.post(
    "/",
    response_model=JobResponse,
    dependencies=[Depends(admin_required)]
)
async def create_job(job_in: JobCreate, db: AsyncSession = Depends(get_db)):
    job = Job(**job_in.dict())
    db.add(job)
    await db.commit()
    await db.refresh(job)
    return job


@router.put(
    "/{job_id}",
    response_model=JobResponse,
    dependencies=[Depends(admin_required)]
)
async def update_job(job_id: int, job_in: JobUpdate, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Job).where(Job.id == job_id))
    job = result.scalar_one_or_none()
    if not job:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job not found")
    for field, value in job_in.dict(exclude_unset=True).items():
        setattr(job, field, value)
    await db.commit()
    await db.refresh(job)
    return job


@router.delete(
    "/{job_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    dependencies=[Depends(admin_required)]
)
async def delete_job(job_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Job).where(Job.id == job_id))
    job = result.scalar_one_or_none()
    if not job:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job not found")
    await db.delete(job)
    await db.commit()
    return None

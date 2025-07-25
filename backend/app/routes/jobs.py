# app/routes/jobs.py

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.db.database import get_db
from app.db.models import Job, JobTranslation, User
from sqlalchemy.orm import selectinload
from app.routes.auth import get_current_user
from app.schemas.job import JobCreate, JobUpdate, JobResponse

router = APIRouter(prefix="/jobs", tags=["jobs"])


async def admin_required(current_user: User = Depends(get_current_user)) -> User:
    if current_user.role != "admin" and not current_user.is_superuser:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Admin privileges required"
        )
    return current_user


@router.get("", response_model=list[JobResponse])
@router.get("/", response_model=list[JobResponse])
async def list_jobs(
    db: AsyncSession = Depends(get_db),
    lang: str | None = Query(None),
):
    result = await db.execute(select(Job).options(selectinload(Job.translations)))
    jobs = result.scalars().all()
    if lang:
        for job in jobs:
            translation = next(
                (tr for tr in job.translations if tr.language == lang),
                None,
            )
            if translation:
                setattr(job, f"title_{lang}", translation.title)
                setattr(job, f"description_{lang}", translation.description)
                setattr(job, f"requirements_{lang}", translation.requirements)
                setattr(job, f"location_{lang}", translation.location)
                setattr(job, f"job_type_{lang}", translation.job_type)
    return jobs


@router.get("/{job_id}", response_model=JobResponse)
async def get_job(job_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Job).where(Job.id == job_id).options(selectinload(Job.translations))
    )
    job = result.scalar_one_or_none()
    if not job:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job not found")
    return job


@router.post("", response_model=JobResponse, dependencies=[Depends(admin_required)])
@router.post("/", response_model=JobResponse, dependencies=[Depends(admin_required)])
async def create_job(job_in: JobCreate, db: AsyncSession = Depends(get_db)):
    translations_data = job_in.translations
    job_dict = job_in.dict(exclude={"translations"})
    job = Job(**job_dict)
    for tr in translations_data:
        job.translations.append(JobTranslation(**tr.dict()))
    db.add(job)
    await db.commit()
    await db.refresh(job)
    return job


@router.put("/{job_id}", response_model=JobResponse, dependencies=[Depends(admin_required)])
async def update_job(job_id: int, job_in: JobUpdate, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Job).where(Job.id == job_id).options(selectinload(Job.translations))
    )
    job = result.scalar_one_or_none()
    if not job:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job not found")
    update_data = job_in.dict(exclude_unset=True, exclude={"translations"})
    for field, value in update_data.items():
        setattr(job, field, value)
    if job_in.translations is not None:
        job.translations.clear()
        for tr in job_in.translations:
            job.translations.append(JobTranslation(**tr.dict()))
    await db.commit()
    await db.refresh(job)
    return job


@router.delete(
    "/{job_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    dependencies=[Depends(admin_required)],
)
async def delete_job(job_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Job).where(Job.id == job_id))
    job = result.scalar_one_or_none()
    if not job:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job not found")
    await db.delete(job)
    await db.commit()
    return None

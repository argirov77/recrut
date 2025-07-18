import os
import sys
import pytest
import httpx

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
from httpx import AsyncClient
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession

from app.main import app
from app.db.models import Base, User, Job
from app.db.database import get_db

DATABASE_URL = "sqlite+aiosqlite:///./test.db"

import pytest_asyncio

import pytest_asyncio


@pytest_asyncio.fixture
async def client():
    if os.path.exists("./test.db"):
        os.remove("./test.db")
    engine = create_async_engine(DATABASE_URL, connect_args={"check_same_thread": False})
    async_session = async_sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    async def override_get_db():
        async with async_session() as session:
            yield session

    app.dependency_overrides[get_db] = override_get_db

    async with async_session() as session:
        admin = User(email="admin@example.com", username="admin", role="admin")
        admin.set_password("password")
        session.add(admin)
        await session.commit()

    transport = httpx.ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://testserver") as ac:
        yield ac

    app.dependency_overrides.clear()
    await engine.dispose()
    if os.path.exists("./test.db"):
        os.remove("./test.db")


@pytest.mark.asyncio
async def test_admin_job_crud(client: AsyncClient):
    # Login as admin
    res = await client.post(
        "/api/auth/login",
        json={"email": "admin@example.com", "password": "password"},
    )
    assert res.status_code == 200
    token = res.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    # Create job
    job_data = {
        "title": "Software Engineer",
        "location": "Remote",
        "job_type": "Full-time",
        "description": "Develop software",
        "requirements": "Python",
        "translations": [
            {
                "language": "fr",
                "location": "Remote",
                "job_type": "Full-time",
                "title": "Ing\u00e9nieur Logiciel",
                "description": "D\u00e9velopper",
                "requirements": "Python",
            }
        ],
    }
    res = await client.post("/api/jobs/", json=job_data, headers=headers)
    assert res.status_code == 200
    job_id = res.json()["id"]

    # Update job
    res = await client.put(
        f"/api/jobs/{job_id}",
        json={
            "title": "Senior Engineer",
            "translations": [
                {
                    "language": "fr",
                    "location": "Remote",
                    "job_type": "Full-time",
                    "title": "Ing\u00e9nieur Principal",
                    "description": "D\u00e9velopper",
                    "requirements": "Python",
                }
            ],
        },
        headers=headers,
    )
    assert res.status_code == 200
    assert res.json()["title"] == "Senior Engineer"

    # Delete job
    res = await client.delete(f"/api/jobs/{job_id}", headers=headers)
    assert res.status_code == 204

    # Ensure deletion
    res = await client.get(f"/api/jobs/{job_id}")
    assert res.status_code == 404


@pytest.mark.asyncio
async def test_delete_job_via_public_route(client: AsyncClient):
    res = await client.post(
        "/api/auth/login",
        json={"email": "admin@example.com", "password": "password"},
    )
    token = res.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    job_data = {
        "title": "QA Engineer",
        "location": "Remote",
        "job_type": "Full-time",
        "description": "Test software",
        "requirements": "QA",
        "translations": [],
    }
    res = await client.post("/api/jobs/", json=job_data, headers=headers)
    job_id = res.json()["id"]

    res = await client.delete(f"/api/jobs/{job_id}", headers=headers)
    assert res.status_code == 204

    res = await client.get(f"/api/jobs/{job_id}")
    assert res.status_code == 404


@pytest.mark.asyncio
async def test_list_jobs_with_language(client: AsyncClient):
    res = await client.post(
        "/api/auth/login",
        json={"email": "admin@example.com", "password": "password"},
    )
    token = res.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    job_data = {
        "title": "Backend Developer",
        "location": "Remote",
        "job_type": "Full-time",
        "description": "Write code",
        "requirements": "Python",
        "translations": [
            {
                "language": "ru",
                "location": "Удаленно",
                "job_type": "Полная занятость",
                "title": "Разработчик",
                "description": "Писать код",
                "requirements": "Python",
            }
        ],
    }
    res = await client.post("/api/jobs/", json=job_data, headers=headers)
    assert res.status_code == 200

    res = await client.get("/api/jobs", params={"lang": "ru"})
    assert res.status_code == 200
    jobs = res.json()
    assert jobs[0]["title_ru"] == "Разработчик"
    assert jobs[0]["description_ru"] == "Писать код"
    assert jobs[0]["location_ru"] == "Удаленно"
    assert jobs[0]["job_type_ru"] == "Полная занятость"

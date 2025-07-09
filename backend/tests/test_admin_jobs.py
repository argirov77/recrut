import os
import sys
import pytest
import httpx
from httpx import AsyncClient
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from app.main import app
from app.db.models import Base, User
from app.db.database import get_db

DATABASE_URL = "sqlite+aiosqlite:///./test.db"

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
        user = User(email="u@example.com", username="user")
        user.set_password("password")
        session.add(user)
        await session.commit()

    transport = httpx.ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://testserver") as ac:
        yield ac

    app.dependency_overrides.clear()
    await engine.dispose()
    if os.path.exists("./test.db"):
        os.remove("./test.db")


@pytest.mark.asyncio
async def test_job_crud_and_permissions(client: AsyncClient):
    res = await client.post(
        "/api/auth/login", json={"email": "admin@example.com", "password": "password"}
    )
    token = res.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    job_data = {
        "title": "Engineer",
        "description": "Write code",
    }
    res = await client.post("/api/admin/jobs/", json=job_data, headers=headers)
    assert res.status_code == 200
    job_id = res.json()["id"]

    res = await client.put(f"/api/admin/jobs/{job_id}", json={"title": "Lead"}, headers=headers)
    assert res.status_code == 200
    assert res.json()["title"] == "Lead"

    res = await client.delete(f"/api/admin/jobs/{job_id}", headers=headers)
    assert res.status_code == 204

    res = await client.get(f"/api/admin/jobs/{job_id}", headers=headers)
    assert res.status_code == 404

    # permissions
    res = await client.post(
        "/api/auth/login", json={"email": "u@example.com", "password": "password"}
    )
    token = res.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}
    res = await client.get("/api/admin/jobs/", headers=headers)
    assert res.status_code == 403


@pytest.mark.asyncio
async def test_validation(client: AsyncClient):
    res = await client.post(
        "/api/auth/login", json={"email": "admin@example.com", "password": "password"}
    )
    token = res.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}
    bad_job = {"title": "", "description": ""}
    res = await client.post("/api/admin/jobs/", json=bad_job, headers=headers)
    assert res.status_code == 422

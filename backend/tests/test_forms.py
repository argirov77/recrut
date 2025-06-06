import os
import sys
import pytest
import httpx

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
from httpx import AsyncClient
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession

from app.main import app
from app.db.models import Base, User, ContactForm
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
        await session.commit()

    transport = httpx.ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://testserver") as ac:
        yield ac

    app.dependency_overrides.clear()
    await engine.dispose()
    if os.path.exists("./test.db"):
        os.remove("./test.db")


@pytest.mark.asyncio
async def test_form_submission_and_admin_view(client: AsyncClient):
    form_data = {
        "full_name": "John Doe",
        "country": "USA",
        "email": "john@example.com",
        "phone": "1234567890",
        "position": "Developer",
        "message": "Hello",
    }

    res = await client.post("/api/forms/", json=form_data)
    assert res.status_code == 201
    form_id = res.json()["id"]

    res = await client.post(
        "/api/auth/login",
        json={"email": "admin@example.com", "password": "password"},
    )
    assert res.status_code == 200
    token = res.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    res = await client.get("/api/forms/", headers=headers)
    assert res.status_code == 200
    forms = res.json()
    assert len(forms) == 1
    assert forms[0]["id"] == form_id

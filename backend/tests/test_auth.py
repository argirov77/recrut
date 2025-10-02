import os
import sys
import httpx
import pytest
import pytest_asyncio
from httpx import AsyncClient
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from app.main import app
from app.db.models import Base, User
from app.db.database import get_db

DATABASE_URL = "sqlite+aiosqlite:///./test.db"


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
        admin = User(email="office@bulstaff.com", username="office", role="admin")
        admin.set_password("qwerty1234")
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
async def test_change_password_success(client: AsyncClient):
    login_response = await client.post(
        "/api/auth/login",
        json={"email": "office@bulstaff.com", "password": "qwerty1234"},
    )
    assert login_response.status_code == 200
    token = login_response.json()["access_token"]

    change_response = await client.post(
        "/api/auth/change-password",
        headers={"Authorization": f"Bearer {token}"},
        json={"current_password": "qwerty1234", "new_password": "newpass123"},
    )

    assert change_response.status_code == 200
    assert change_response.json()["message"] == "Password updated successfully"

    new_login = await client.post(
        "/api/auth/login",
        json={"email": "office@bulstaff.com", "password": "newpass123"},
    )
    assert new_login.status_code == 200

    old_login = await client.post(
        "/api/auth/login",
        json={"email": "office@bulstaff.com", "password": "qwerty1234"},
    )
    assert old_login.status_code == 401


@pytest.mark.asyncio
async def test_change_password_invalid_current_password(client: AsyncClient):
    login_response = await client.post(
        "/api/auth/login",
        json={"email": "office@bulstaff.com", "password": "qwerty1234"},
    )
    token = login_response.json()["access_token"]

    change_response = await client.post(
        "/api/auth/change-password",
        headers={"Authorization": f"Bearer {token}"},
        json={"current_password": "wrongpass", "new_password": "newpass123"},
    )

    assert change_response.status_code == 400
    assert change_response.json()["detail"] == "Current password is incorrect"

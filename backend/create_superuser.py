# backend/create_superuser.py

import os
import asyncio

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.database import get_database_url, create_engine_with_retry
from app.db.models import User
from sqlalchemy.orm import sessionmaker

async def main():
    # Берём переменные окружения
    username = os.getenv("ADMIN_USERNAME")
    email    = os.getenv("ADMIN_EMAIL")
    password = os.getenv("ADMIN_PASSWORD")

    # Создаём Асинхронный движок и сессию
    engine = create_engine_with_retry(get_database_url())
    AsyncSessionLocal = sessionmaker(
        engine, class_=AsyncSession, expire_on_commit=False
    )

    async with AsyncSessionLocal() as session:
        # Проверяем, есть ли уже пользователь с таким username
        result = await session.execute(
            select(User).where(User.username == username)
        )
        existing = result.scalar_one_or_none()

        if existing:
            print(f"⚠️  Superuser '{username}' already exists, skipping.")
        else:
            # Создаём нового и помечаем is_superuser=True
            user = User(
                username=username,
                email=email,
                role="admin",
                is_superuser=True,
                is_active=True,
                email_verified=True,
            )
            user.set_password(password)

            session.add(user)
            await session.commit()
            print(f"✅  Superuser '{username}' created.")

if __name__ == "__main__":
    asyncio.run(main())

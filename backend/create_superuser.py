#!/usr/bin/env python
import os
import sys
import argparse

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from passlib.context import CryptContext

# Импортируете Base и модель User из вашего приложения
from app.db.database import Base
from app.db.models import User

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def get_sync_database_url() -> str:
    """
    Собираем синхронный URL к базе из переменных окружения.
    """
    user = os.getenv("DB_USER", "postgres")
    pwd  = os.getenv("DB_PASSWORD", "postgres")
    host = os.getenv("DB_HOST", "postgres")
    port = os.getenv("DB_PORT", "5432")
    name = os.getenv("DB_NAME", "fastapi_db")
    return f"postgresql://{user}:{pwd}@{host}:{port}/{name}"


def main():
    parser = argparse.ArgumentParser(
        description="Создать суперпользователя в БД"
    )
    parser.add_argument(
        "--username", required=True, help="Имя пользователя (username)"
    )
    parser.add_argument(
        "--email", required=True, help="Email суперпользователя"
    )
    parser.add_argument(
        "--password", required=True, help="Пароль суперпользователя"
    )
    args = parser.parse_args()

    db_url = get_sync_database_url()
    engine = create_engine(db_url, echo=False)

    # Если таблицы ещё нет — создаём её
    Base.metadata.create_all(bind=engine)

    SessionLocal = sessionmaker(bind=engine)
    session = SessionLocal()

    try:
        exists = session.query(User).filter(User.email == args.email).first()
        if exists:
            print(f"Суперпользователь с email={args.email} уже есть (id={exists.id})")
            return

        # Создаём нового пользователя
        user = User(
            username=args.username,
            email=args.email,
            role="admin",
            is_superuser=True,
            is_active=True,
            email_verified=True,
        )
        # Хешируем пароль
        user.hashed_password = pwd_context.hash(args.password)

        session.add(user)
        session.commit()
        print(f"Суперпользователь {args.email} создан (id={user.id})")

    except Exception:
        session.rollback()
        raise
    finally:
        session.close()


if __name__ == "__main__":
    main()

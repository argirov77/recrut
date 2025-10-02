from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.pool import AsyncAdaptedQueuePool
from app.utils.logger import setup_logger
from app.config import get_settings
from urllib.parse import quote_plus
from typing import Optional
from sqlalchemy import select

settings = get_settings()
logger = setup_logger(__name__)


def get_database_url() -> str:
    """
    Constructs the database URL based on configuration.
    Returns PostgreSQL URL if credentials are provided, otherwise falls back to SQLite.
    """
    if settings.DB_NAME:
        # PostgreSQL connection
        password = quote_plus(settings.DB_PASSWORD) if settings.DB_PASSWORD else ""
        return f"postgresql+asyncpg://{settings.DB_USER}:{password}@{settings.DB_HOST}:{settings.DB_PORT}/{settings.DB_NAME}"

    # SQLite connection (fallback)
    return "sqlite+aiosqlite:///./app.db"


def create_engine_with_retry(database_url: str):
    """
    Creates an async engine with retry logic and appropriate configuration
    based on the database type.
    """
    connect_args = {}
    pooling_args = {
        "pool_pre_ping": True,
        "pool_recycle": 3600,
        "echo": False,
    }

    if database_url.startswith("sqlite"):
        connect_args["check_same_thread"] = False
    else:
        pooling_args.update(
            {
                "poolclass": AsyncAdaptedQueuePool,
                "pool_size": 20,
                "max_overflow": 10,
                "pool_timeout": 30,
            }
        )

    return create_async_engine(database_url, connect_args=connect_args, **pooling_args)


# Create the engine
engine = create_engine_with_retry(get_database_url())

# Create async session maker
AsyncSessionLocal = async_sessionmaker(
    engine, class_=AsyncSession, expire_on_commit=False, autocommit=False, autoflush=False
)


class Base(DeclarativeBase):
    pass


async def get_db() -> AsyncSession:
    """
    Dependency that provides a database session.
    Ensures proper handling of connections and error cases.
    """
    session = AsyncSessionLocal()
    logger.debug("Creating new database session")
    try:
        yield session
    except Exception as e:
        logger.error(f"Database session error: {str(e)}")
        await session.rollback()
        raise
    finally:
        logger.debug("Closing database session")
        await session.close()


async def _create_default_admin() -> None:
    """Create a default admin user if no users exist."""
    from .models import User

    async with AsyncSessionLocal() as session:
        result = await session.execute(select(User).limit(1))
        if result.scalar_one_or_none():
            return
        admin = User(
            email="office@bulstaff.com",
            username="office",
            role="admin",
            is_superuser=True,
        )
        admin.set_password("qwerty1234")
        session.add(admin)
        await session.commit()


async def init_db() -> None:
    """
    Initialize database tables and perform any startup database operations.
    Includes retry logic for initial connection.
    """
    logger.info("Initializing database")
    try:
        async with engine.begin() as conn:
            await conn.run_sync(Base.metadata.create_all)
        await _create_default_admin()
        logger.info("Database initialized successfully")
    except Exception as e:
        logger.error(f"Error initializing database: {str(e)}")
        raise

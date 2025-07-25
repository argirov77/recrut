from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from .database import Base
from passlib.context import CryptContext
import secrets


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, nullable=False)
    username = Column(String, unique=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(String, default="user")  # Roles: "user", "admin", "moderator"
    is_superuser = Column(Boolean, default=False)
    is_active = Column(Boolean, default=True)
    email_verified = Column(Boolean, default=False)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())
    reset_token = Column(String, unique=True, nullable=True)

    def verify_password(self, password: str) -> bool:
        """Check if a plain password matches the hashed password."""
        return pwd_context.verify(password, self.hashed_password)

    def set_password(self, password: str):
        """Hash and store a password."""
        self.hashed_password = pwd_context.hash(password)

    def generate_reset_token(self):
        """Generate a secure reset token."""
        self.reset_token = secrets.token_urlsafe(32)

    def clear_reset_token(self):
        """Clear password reset token after use."""
        self.reset_token = None


class Job(Base):
    __tablename__ = "jobs"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    location = Column(String, nullable=False)
    job_type = Column(String, nullable=False)
    description = Column(String, nullable=False)
    requirements = Column(String, nullable=False)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())

    translations = relationship(
        "JobTranslation",
        back_populates="job",
        cascade="all, delete-orphan",
        lazy="selectin",
    )


class JobTranslation(Base):
    __tablename__ = "job_translations"

    job_id = Column(Integer, ForeignKey("jobs.id", ondelete="CASCADE"), primary_key=True)
    language = Column(String, primary_key=True)
    location = Column(String, nullable=False)
    job_type = Column(String, nullable=False)
    title = Column(String, nullable=False)
    description = Column(String, nullable=False)
    requirements = Column(String, nullable=False)

    job = relationship("Job", back_populates="translations")


class ContactForm(Base):
    __tablename__ = "contact_forms"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String, nullable=False)
    country = Column(String, nullable=False)
    email = Column(String, nullable=False)
    phone = Column(String, nullable=False)
    position = Column(String, nullable=True)
    message = Column(String, nullable=True)
    created_at = Column(DateTime, default=func.now())

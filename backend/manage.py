import typer
import subprocess
import os
from sqlalchemy import create_engine
from app.config import get_settings
from app.db import engine, Base

app = typer.Typer()
settings = get_settings()


@app.command()
def run():
    """Run the FastAPI application."""
    typer.echo("Starting FastAPI app...")
    subprocess.run(["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"])


@app.command()
def makemigrations(message: str = "Auto migration"):
    """Generate a new Alembic migration."""
    typer.echo(f"Generating migration: {message}")
    subprocess.run(["alembic", "revision", "--autogenerate", "-m", message])


@app.command()
def migrate():
    """Apply all pending Alembic migrations."""
    typer.echo("Applying migrations...")
    subprocess.run(["alembic", "upgrade", "head"])


@app.command()
def downgrade(revision: str = "-1"):
    """Rollback the last Alembic migration (default: one step)."""
    typer.echo(f"Rolling back to {revision}...")
    subprocess.run(["alembic", "downgrade", revision])


@app.command()
def db_status():
    """Show current database migration status."""
    typer.echo("Checking Alembic migration status...")
    subprocess.run(["alembic", "current"])


@app.command()
def format():
    """Format Python code with black."""
    typer.echo("Formatting Python code with black...")
    subprocess.run(["black", "."])


@app.command()
def reset_db():
    """Drop and recreate all database tables using Alembic"""
    typer.echo("Resetting database using Alembic...")
    subprocess.run(["alembic", "downgrade", "base"])
    subprocess.run(["alembic", "upgrade", "head"])
    typer.echo("Database reset successfully.")


@app.command()
def create_superuser(
    username: str = typer.Option(
        None, "--username", envvar="ADMIN_USERNAME", help="Имя суперпользователя"
    ),
    email: str = typer.Option(
        None, "--email",    envvar="ADMIN_EMAIL",    help="Email суперпользователя"
    ),
    password: str = typer.Option(
        None, "--password", envvar="ADMIN_PASSWORD", help="Пароль суперпользователя"
    ),
):
    """
    Создать суперпользователя (role='admin', is_superuser=True).
    По умолчанию берёт переменные ADM_IN_… из окружения.
    """
    # создаём таблицы, если ещё нет
    Base.metadata.create_all(bind=engine)

    username = username or "admin"
    email = email or "admin@example.com"
    password = password or "changeme"

    db = SessionLocal()
    exists = db.query(User).filter_by(username=username).first()
    if exists:
        typer.secho(f"Superuser '{username}' уже существует, пропускаем.", fg=typer.colors.YELLOW)
    else:
        u = User(
            username=username,
            email=email,
            role="admin",
            is_superuser=True,
            is_active=True,
            email_verified=True,
        )
        u.hashed_password = pwd_context.hash(password)
        db.add(u)
        db.commit()
        typer.secho(f"Superuser '{username}' создан.", fg=typer.colors.GREEN)
    db.close()

if __name__ == "__main__":
    app()

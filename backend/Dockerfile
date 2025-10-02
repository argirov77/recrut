# backend/Dockerfile (Alpine-версия)
FROM python:3.13-alpine AS base

ARG ADMIN_USERNAME=office
ARG ADMIN_EMAIL=office@bulstaff.com

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    ENVIRONMENT=development \
    ADMIN_USERNAME=${ADMIN_USERNAME} \
    ADMIN_EMAIL=${ADMIN_EMAIL} \
    # приводим пароль к реальной переменной среды
    ADMIN_PASSWORD=${ADMIN_PASSWORD}

WORKDIR /app

RUN apk update && \
    apk upgrade && \
    apk add --no-cache \
      build-base \
      libpq \
      libpq-dev \
      curl \
      postgresql-client \
      musl-dev \
      openssl-dev \
    && rm -rf /var/cache/apk/*

COPY requirements.txt .
RUN pip install --upgrade pip setuptools wheel && \
    pip install --no-cache-dir -r requirements.txt

COPY create_superuser.py .
COPY . .

RUN mkdir -p /app/logs/dev /app/logs/prod

EXPOSE 8000

HEALTHCHECK --interval=30s --timeout=30s --start-period=10s --retries=3 \
    CMD curl -f http://127.0.0.1:8000/api/health || exit 1

# Исправленный ENTRYPOINT: убрали лишний "create-superuser"
ENTRYPOINT ["sh", "-c", "\
    python create_superuser.py \
      --username \"$ADMIN_USERNAME\" \
      --email    \"$ADMIN_EMAIL\" \
      --password \"$ADMIN_PASSWORD\" || true && \
    python manage.py run \
"]

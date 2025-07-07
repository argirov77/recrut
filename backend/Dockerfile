# backend/Dockerfile (алпайн-версия)
FROM python:3.13-alpine AS base

# build-time args
ARG ADMIN_USERNAME=admin
ARG ADMIN_EMAIL=admin@example.com

# runtime env
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    ENVIRONMENT=development \
    ADMIN_USERNAME=${ADMIN_USERNAME} \
    ADMIN_EMAIL=${ADMIN_EMAIL}

WORKDIR /app

# 1) обновляем систему и ставим dev-зависимости
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

# 2) обновляем pip и ставим Python-зависимости
COPY requirements.txt .
RUN pip install --upgrade pip setuptools wheel && \
    pip install --no-cache-dir -r requirements.txt

# 3) копируем код
COPY create_superuser.py .
COPY . .

RUN mkdir -p /app/logs/dev /app/logs/prod

EXPOSE 8000

# 4) healthcheck
HEALTHCHECK --interval=30s --timeout=30s --start-period=10s --retries=3 \
    CMD curl -f http://127.0.0.1:8000/api/health || exit 1

# 5) ENTRYPOINT: сперва создаём superuser, потом запускаем приложение
ENTRYPOINT ["sh", "-c", "\
    python create_superuser.py create-superuser \
      --username \"$ADMIN_USERNAME\" \
      --email \"$ADMIN_EMAIL\" \
      --password \"$ADMIN_PASSWORD\" || true && \
    python manage.py run \
"]

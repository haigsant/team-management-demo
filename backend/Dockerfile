FROM python:3.11-slim

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    DEBUG=1 \
    SQLITE_PATH=/app/data/db.sqlite3

RUN apt-get update && \
    apt-get install -y --no-install-recommends gcc && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Install Poetry
RUN pip install --no-cache-dir poetry==1.7.1

# Copy only the dependency files first
COPY pyproject.toml poetry.lock* ./

# Install dependencies only (no --no-root flag)
RUN poetry config virtualenvs.create false && \
    poetry install --no-interaction --only main

# Copy project files
COPY . .

# Create directory for SQLite database and apply migrations
RUN mkdir -p /app/data

# Expose port
EXPOSE 8000

# Run migrations and start server
CMD python manage.py makemigrations api && python manage.py migrate && python manage.py runserver 0.0.0.0:8000

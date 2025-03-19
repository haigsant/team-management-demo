# Team Management Backend

Django REST API for the Team Management application. This backend provides CRUD operations for managing team members.

## Quick Start (Docker Recommended)

From project root:
```bash
make build-start
```

## Local Development with Poetry

1. **Install dependencies**:
   ```bash
   cd backend
   poetry install --no-root
   ```

2. **Setup database and environment**:
   ```bash
   mkdir -p data
   cp .env.example .env
   ```

3. **Run migrations and start server**:
   ```bash
   poetry run python manage.py makemigrations api
   poetry run python manage.py migrate
   poetry run python manage.py runserver
   ```

## API Endpoints

- `GET /api/team-members/`: List all team members
- `POST /api/team-members/`: Create a new team member
- `GET /api/team-members/{id}/`: Retrieve a team member
- `PUT /api/team-members/{id}/`: Update a team member
- `DELETE /api/team-members/{id}/`: Delete a team member

## Common Commands

```bash
# Create superuser
poetry run python manage.py createsuperuser

# Run tests
poetry run python manage.py test api.tests

# Reset database (if needed)
rm -f data/db.sqlite3
rm -rf api/migrations/0*.py
poetry run python manage.py makemigrations api
poetry run python manage.py migrate
```

## Troubleshooting

- **Database errors**: Make sure SQLITE_PATH in .env is an absolute path
- **Django not found**: Always prefix commands with `poetry run` 
- **Package errors**: Use `poetry install --no-root` for installation

# Team Management Backend

Django REST API for the Team Management application. This backend provides CRUD operations for managing team members through a RESTful API built with Django and Django REST Framework.

## Technology Stack

- **Python 3.11+**: Core programming language
- **Django 5.1+**: Web framework
- **Django REST Framework**: API toolkit for building RESTful APIs
- **SQLite**: Database (configured by default for simplicity)
- **Poetry**: Dependency management
- **Docker**: Containerization

## Local Development Setup

### Prerequisites

- Python 3.11 or higher
- Poetry (dependency management)
- Docker and Docker Compose (optional, for containerized development)

### Setting Up Your Development Environment

#### Option 1: Using Poetry (Recommended for local development)

1. **Clone the repository and navigate to the backend directory**:
   ```bash
   git clone <repository-url>
   cd team-management-demo/backend
   ```

2. **Install dependencies using Poetry**:
   ```bash
   poetry install
   ```

3. **Activate the virtual environment**:
   ```bash
   poetry shell
   ```

4. **Create database migrations**:
   ```bash
   python manage.py makemigrations api
   ```

5. **Apply migrations to create the database schema**:
   ```bash
   python manage.py migrate
   ```

6. **Create a superuser (optional, for admin access)**:
   ```bash
   python manage.py createsuperuser
   ```

7. **Start the development server**:
   ```bash
   python manage.py runserver
   ```
   The API will be available at http://localhost:8000/api/

#### Option 2: Using Docker

1. **Navigate to the project root** (where the docker-compose.yml file is located):
   ```bash
   cd team-management-demo
   ```

2. **Start the backend service using Docker Compose**:
   ```bash
   docker-compose up backend
   ```
   The API will be available at http://localhost:8000/api/

3. **To run commands inside the Docker container**:
   ```bash
   docker-compose exec backend python manage.py <command>
   ```
   For example, to create a superuser:
   ```bash
   docker-compose exec backend python manage.py createsuperuser
   ```

## API Endpoints

The API provides the following endpoints:

- `GET /api/team-members/`: List all team members
- `POST /api/team-members/`: Create a new team member
- `GET /api/team-members/{id}/`: Retrieve a specific team member
- `PUT /api/team-members/{id}/`: Update a specific team member
- `DELETE /api/team-members/{id}/`: Delete a specific team member

### Request/Response Format Example

#### Create a Team Member
Request:
```json
POST /api/team-members/
{
    "first_name": "John",
    "last_name": "Doe",
    "phone": "123-456-7890",
    "email": "john.doe@example.com",
    "role": "regular"
}
```

Response:
```json
{
    "id": 1,
    "first_name": "John",
    "last_name": "Doe",
    "phone": "123-456-7890",
    "email": "john.doe@example.com",
    "role": "regular"
}
```

## Database Management

- **Create migrations** when you've modified models:
  ```bash
  python manage.py makemigrations api
  ```

- **Apply migrations** to update the database schema:
  ```bash
  python manage.py migrate
  ```

- **Reset migrations** if needed (development only):
  ```bash
  # Remove the database
  rm -f data/db.sqlite3
  # Remove migration files
  rm -rf api/migrations/0*.py
  # Create fresh migrations
  python manage.py makemigrations api
  # Apply migrations
  python manage.py migrate
  ```

## Testing

Run the tests using Django's test framework:

```bash
python manage.py test api.tests
```

Or when using Docker:

```bash
docker-compose exec backend python manage.py test api.tests
```

## Troubleshooting

- **"No such table" error**: This usually means migrations haven't been created or applied. Make sure to run both `makemigrations` and `migrate` commands.
  
- **Port conflict errors**: If port 8000 is already in use, you can specify a different port:
  ```bash
  python manage.py runserver 8001
  ```

- **Database connection issues**: Check that your database file exists and has proper permissions.

## Important Developer Notes

- Always run `makemigrations` when you've modified models
- Apply those changes with `migrate`
- The Django admin interface is available at `/admin/` (you'll need to create a superuser)
- When running with Docker, migrations are automatically applied during startup

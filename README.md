# Team Management Demo

## About
A working demo application that allows you to manage team members through a user-friendly interface. The application consists of a Django REST backend API and a modern frontend application. This demo showcases best practices for full-stack development with a focus on clean architecture and user experience.

### App Functionality

The Team Management Demo provides the following functionality:

- **View Team Members**: Browse the complete list of team members
- **Add New Team Members**: Create new team members with their contact information and role
- **Edit Team Members**: Update existing team members' information
- **Delete Team Members**: Remove team members who are no longer relevant
- **Role Management**: Assign either "Regular" or "Admin" roles to team members

## Quick Start (Recommended)

### Using Docker

1. **Clone the repository**:
   ```bash
   git clone git@github.com:haigsant/team-management-demo.git
   cd team-management-demo
   ```

2. **Build and start the backend service**:
   ```bash
   make build-start
   ```

3. **Start the frontend in a separate terminal**:
   ```bash
   make frontend
   ```

   Alternatively, start both with a single command:
   ```bash
   make start-full-stack
   ```

4. **Access the application**:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000/api
   - Django Admin: http://localhost:8000/admin

## Local Development Setup

### Backend (Django)

1. **Navigate to backend and install dependencies**:
   ```bash
   cd backend
   poetry install --no-root
   ```

2. **Create data directory and configure environment**:
   ```bash
   mkdir -p data
   cp .env.example .env
   ```
   
   **Important**: Edit the `.env` file and update `SQLITE_PATH` with the absolute path to your database:
   ```
   SQLITE_PATH=/your/absolute/path/to/team-management-demo/backend/data/db.sqlite3
   ```

3. **Run migrations and start server**:
   ```bash
   poetry run python manage.py makemigrations api
   poetry run python manage.py migrate
   poetry run python manage.py runserver
   ```

### Frontend (React)

1. **Navigate to frontend directory and install dependencies**:
   ```bash
   cd frontend
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm start
   ```

## Available Make Commands

- `make help`: Show all available commands with descriptions
- `make build`: Build the backend service
- `make start`: Start the backend service (detached mode)
- `make stop`: Stop the backend service
- `make restart`: Restart the backend service
- `make logs`: View logs from the backend service
- `make frontend`: Run the frontend locally
- `make start-full-stack`: Start both backend and frontend services
- `make migrate`: Create and apply database migrations
- `make create-superuser`: Create a Django superuser

## Developer Notes

- Docker is the recommended method for running the application
- When developing locally with Poetry, always use `poetry run` to run Django commands
- For local development, you must set an absolute path for SQLite in the .env file

### Sample Backend Testing

To run tests for the backend API:

```bash
# When running locally with Poetry
cd backend
# Run directly with Poetry (no activation needed)
poetry run python manage.py test api.tests

# When using Docker (requires backend to be running)
make test-running
```

Example test output:
```
Found 4 test(s).
Creating test database for alias 'default'...
System check identified no issues (0 silenced).
....
----------------------------------------------------------------------
Ran 4 tests in 0.234s

OK
Destroying test database for alias 'default'...
```

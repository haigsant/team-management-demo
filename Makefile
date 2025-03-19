# Team Member Management Application Makefile
# A convenient interface for common development operations

# Colors for better readability
BLUE=\033[0;34m
GREEN=\033[0;32m
YELLOW=\033[0;33m
RED=\033[0;31m
NC=\033[0m # No Color

# Project variables
BACKEND_SERVICE=backend
FRONTEND_SERVICE=frontend

# Default target executed when no arguments are given to make
default: help

# Define phony targets (targets that don't represent files)
.PHONY: help start stop restart build logs clean test-backend migrate shell django-shell create-superuser frontend \
        build-start test-running-backend start-full-stack

# Show help
help:
	@echo "${BLUE}Team Member Management Application${NC}"
	@echo "${YELLOW}Available commands:${NC}"
	@echo ""
	@echo "${GREEN}Running the application:${NC}"
	@echo "  ${YELLOW}make start${NC}              - Start backend service (detached mode)"
	@echo "  ${YELLOW}make stop${NC}               - Stop backend service"
	@echo "  ${YELLOW}make restart${NC}            - Restart backend service"
	@echo "  ${YELLOW}make build${NC}              - Rebuild backend service"
	@echo "  ${YELLOW}make logs${NC}               - View logs from backend service"
	@echo "  ${YELLOW}make clean${NC}              - Remove all containers, volumes, and images"
	@echo "  ${YELLOW}make start-full-stack${NC}   - Start both backend and frontend"
	@echo ""
	@echo "${GREEN}Frontend development:${NC}"
	@echo "  ${YELLOW}make frontend${NC}           - Run frontend locally in development mode"
	@echo ""
	@echo "${GREEN}Testing:${NC}"
	@echo "  ${YELLOW}make test-backend${NC}       - Run backend tests (without requiring backend to be running)"
	@echo "  ${YELLOW}make test-running-backend${NC}  - Run backend tests on an already running backend"
	@echo ""
	@echo "${GREEN}Database operations:${NC}"
	@echo "  ${YELLOW}make migrate${NC}            - Run database migrations"
	@echo "  ${YELLOW}make create-superuser${NC}   - Create a Django superuser"
	@echo ""
	@echo "${GREEN}Development tools:${NC}"
	@echo "  ${YELLOW}make shell${NC}              - Open a shell in the backend container"
	@echo "  ${YELLOW}make django-shell${NC}       - Open a Django shell"
	@echo ""
	@echo "${GREEN}Advanced commands:${NC}"
	@echo "  ${YELLOW}make build-start${NC}        - Build and start both backend and frontend"
	@echo ""

test-backend:
	@echo "${BLUE}Running backend tests (without requiring running backend)...${NC}"
	docker-compose run --rm $(BACKEND_SERVICE) python manage.py test api.tests
	@echo "${GREEN}Backend tests completed!${NC}"

# Docker operations
build:
	@echo "${BLUE}Rebuilding backend service...${NC}"
	docker-compose build
	@echo "${GREEN}Backend service rebuilt!${NC}"

start:
	@echo "${BLUE}Starting backend service...${NC}"
	docker-compose up -d
	@echo "${GREEN}Backend service started! Backend API: http://localhost:8000/api${NC}"

build-start: build start

stop:
	@echo "${BLUE}Stopping backend service...${NC}"
	docker-compose down
	@echo "${GREEN}Backend service stopped!${NC}"

restart: stop start

logs:
	docker-compose logs -f

clean:
	@echo "${RED}Warning: This will remove all containers, volumes, and images related to the project.${NC}"
	@echo "${RED}Are you sure you want to continue? [y/N]${NC}"
	@read -p "" response; \
	if [ "$$response" = "y" ] || [ "$$response" = "Y" ]; then \
		echo "${BLUE}Cleaning up...${NC}"; \
		docker-compose down -v --rmi all; \
		echo "${GREEN}Cleanup complete!${NC}"; \
	else \
		echo "${YELLOW}Cleanup cancelled.${NC}"; \
	fi

# Frontend development
frontend:
	@echo "${BLUE}Running frontend locally in development mode...${NC}"
	cd $(FRONTEND_SERVICE) && npm install && npm start
	@echo "${GREEN}Frontend stopped!${NC}"

# Full stack development
build-start: build-start frontend

start-full-stack: start frontend

# Testing with running backend
test-running-backend:
	@echo "${BLUE}Running backend tests on an already running backend...${NC}"
	docker-compose exec $(BACKEND_SERVICE) python manage.py test api.tests
	@echo "${GREEN}Backend tests completed!${NC}"

# Database operations
migrate:
	@echo "${BLUE}Running database migrations...${NC}"
	docker-compose run --rm $(BACKEND_SERVICE) python manage.py makemigrations api
	@echo "${YELLOW}Migration files created. Applying migrations...${NC}"
	docker-compose run --rm $(BACKEND_SERVICE) python manage.py migrate
	@echo "${GREEN}Migrations completed!${NC}"

create-superuser:
	@echo "${BLUE}Creating Django superuser...${NC}"
	docker-compose run --rm $(BACKEND_SERVICE) python manage.py createsuperuser
	@echo "${GREEN}Superuser created!${NC}"

# Development tools
shell:
	@echo "${BLUE}Opening shell in backend container...${NC}"
	docker-compose exec $(BACKEND_SERVICE) /bin/bash || docker-compose exec $(BACKEND_SERVICE) /bin/sh

django-shell:
	@echo "${BLUE}Opening Django shell...${NC}"
	docker-compose run --rm $(BACKEND_SERVICE) python manage.py shell

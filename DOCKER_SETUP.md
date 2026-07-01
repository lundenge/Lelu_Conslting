# Lelu-Consulting Docker Setup

## Overview

This Docker configuration allows you to run the entire Lelu-Consulting application (frontend, backend, and admin dashboard) in containers.

## Prerequisites

- Docker Desktop (or Docker Engine + Docker Compose)
- Windows: [Docker Desktop for Windows](https://www.docker.com/products/docker-desktop)
- Mac: [Docker Desktop for Mac](https://www.docker.com/products/docker-desktop)
- Linux: [Docker Engine](https://docs.docker.com/engine/install/) + [Docker Compose](https://docs.docker.com/compose/install/)

## Quick Start

### 1. Build and Run All Services

```bash
docker-compose up --build
```

This will:
- Build the backend Docker image
- Build the frontend Docker image
- Start both services on the defined ports
- Create a shared network between containers

### 2. Access the Application

- **Frontend (Main Website):** http://localhost:3000
- **Admin Login:** http://localhost:3000/admin/login
- **API Health Check:** http://localhost:5000/api/health

### 3. Login Credentials

- Email: `admin@lelu-consulting.com`
- Password: `admin123456`

## Docker Services

### Backend Service

**Image:** `lelu-backend:latest`
**Port:** 5000
**Container Name:** `lelu-backend`

Features:
- Node.js 20 Alpine (lightweight)
- Express API server
- Local file-based data storage (no MongoDB required)
- Session-based authentication
- Hot-reload with volumes for development

### Frontend Service

**Image:** `lelu-frontend:latest`
**Port:** 3000
**Container Name:** `lelu-frontend`

Features:
- Node.js 20 Alpine
- Next.js 14
- React 18 + TypeScript
- Tailwind CSS
- Hot-reload with volumes for development

## Docker Commands

### Start Services in Background

```bash
docker-compose up -d
```

### View Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
```

### Stop Services

```bash
docker-compose down
```

### Stop and Remove Volumes

```bash
docker-compose down -v
```

### Rebuild Images (after code changes)

```bash
docker-compose up --build
```

### Rebuild Specific Service

```bash
docker-compose up --build backend
docker-compose up --build frontend
```

### Run Commands in Container

```bash
# Backend container
docker exec -it lelu-backend sh

# Frontend container
docker exec -it lelu-frontend sh

# Run Node command in backend
docker exec lelu-backend node initializeAdmin.js
```

## Environment Variables

### Backend (.env)

Located in `backend/.env`:

```
PORT=5000
NODE_ENV=development
SESSION_SECRET=dev-secret-key-change-in-production
ADMIN_EMAIL=admin@lelu-consulting.com
ADMIN_PASSWORD=admin123456
```

### Frontend

No additional environment variables needed for local development.

## Network

Services communicate via the `lelu-network` bridge network:

```
Frontend (localhost:3000) <---> Backend (localhost:5000)
```

Inside containers, they communicate via service names:
- Backend URL from frontend: `http://backend:5000`

## Development Workflow

1. **Make code changes** - Files are synced via volumes
2. **Changes auto-reload** - Dev servers watch for changes
3. **View logs** - `docker-compose logs -f`
4. **Restart service** - `docker-compose restart [service]`
5. **Rebuild** - `docker-compose up --build` if dependencies change

## Production Deployment

For production, update `docker-compose.yml`:

```yaml
environment:
  - NODE_ENV=production
  - SESSION_SECRET=your-strong-production-secret
  - ADMIN_PASSWORD=your-strong-admin-password

# Remove volumes in services
# Remove command overrides
# Use specific image versions (not :latest)
```

Then build and push to registry:

```bash
docker build -t your-registry/lelu-backend:1.0.0 ./backend
docker build -t your-registry/lelu-frontend:1.0.0 ./website
docker push your-registry/lelu-backend:1.0.0
docker push your-registry/lelu-frontend:1.0.0
```

## Troubleshooting

### Port Already in Use

If ports 3000 or 5000 are already in use:

```bash
# Change ports in docker-compose.yml
# Backend: "3001:5000"
# Frontend: "3001:3000"
```

### Container Exits Immediately

```bash
# Check logs
docker-compose logs backend
docker-compose logs frontend

# Rebuild
docker-compose up --build
```

### Data Loss

Data is stored in `backend/data.json`. To persist across restarts:

```bash
# Data is already persisted locally
# Use named volumes for production:
volumes:
  backend_data:
```

### Cannot Connect Backend from Frontend

Check that frontend is using correct backend URL. Inside containers, use:

```
http://backend:5000/api/...
```

But from browser, use:

```
http://localhost:5000/api/...
```

## Docker Hub (Optional)

Tag and push images:

```bash
docker tag lelu-backend:latest your-username/lelu-backend:latest
docker push your-username/lelu-backend:latest

docker tag lelu-frontend:latest your-username/lelu-frontend:latest
docker push your-username/lelu-frontend:latest
```

## Kubernetes Deployment (Future)

For Kubernetes, use the Docker images with kube manifests:

```bash
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/frontend-deployment.yaml
```

## Performance Notes

- Alpine Linux images keep container size small (~150MB each)
- Multi-stage build for frontend reduces final image size
- Volumes allow development without rebuilding
- Network isolation with bridge network

## Health Checks

Add health checks to docker-compose.yml:

```yaml
healthcheck:
  test: ["CMD", "curl", "-f", "http://localhost:5000/api/health"]
  interval: 30s
  timeout: 10s
  retries: 3
  start_period: 40s
```

## Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Node.js Docker Images](https://hub.docker.com/_/node)
- [Next.js Docker Guide](https://nextjs.org/docs/deployment/docker)

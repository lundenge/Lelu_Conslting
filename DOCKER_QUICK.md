# Docker Quick Reference

## Start Everything

```bash
# Unix/Mac/Linux
./docker-start.sh

# Windows
docker-start.bat

# Manual
docker-compose up -d
```

## Access

- Frontend: http://localhost:3000
- Admin: http://localhost:3000/admin/login
- API: http://localhost:5000/api/health

## Admin Login

- Email: admin@lelu-consulting.com
- Password: admin123456

## Common Commands

```bash
# View logs
docker-compose logs -f

# Logs for specific service
docker-compose logs -f backend
docker-compose logs -f frontend

# Stop all services
docker-compose down

# Rebuild after code changes
docker-compose up --build

# Run shell in container
docker exec -it lelu-backend sh
docker exec -it lelu-frontend sh
```

## Environment Files

- Backend: `backend/.env`
- Frontend: No env file needed for dev

## Data Storage

- Stored in `backend/data.json`
- Persists across container restarts
- Delete to reset to defaults

## Troubleshooting

**Port 3000/5000 already in use?**
- Edit `docker-compose.yml` to use different ports
- Or: `lsof -i :3000` (Mac/Linux) to find what's using it

**Container not starting?**
- Check logs: `docker-compose logs backend`
- Rebuild: `docker-compose up --build`

**Need to reset data?**
- Delete `backend/data.json`
- Restart: `docker-compose restart backend`

## Production Notes

- Change SESSION_SECRET in environment
- Change ADMIN_PASSWORD
- Use specific image versions (not :latest)
- Configure persistent volumes for data
- Use Docker registry (DockerHub, etc.)
- Consider using Kubernetes for scaling

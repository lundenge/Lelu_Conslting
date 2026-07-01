@echo off
REM Lelu-Consulting Docker Quick Start Script for Windows

echo.
echo 🐳 Lelu-Consulting Docker Setup
echo ================================

REM Check if Docker is installed
docker --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker is not installed. Please install Docker Desktop first.
    pause
    exit /b 1
)

echo ✅ Docker found
echo.

REM Build and start containers
echo 📦 Building and starting services...
docker-compose up --build -d

REM Wait for services to be ready
echo.
echo ⏳ Waiting for services to start...
timeout /t 5

REM Display access information
echo.
echo ✨ Services are running!
echo.
echo Access the application:
echo   - Website:      http://localhost:3000
echo   - Admin Login:  http://localhost:3000/admin/login
echo   - API Health:   http://localhost:5000/api/health
echo.
echo Admin Credentials:
echo   - Email:    admin@lelu-consulting.com
echo   - Password: admin123456
echo.
echo Useful commands:
echo   - View logs:        docker-compose logs -f
echo   - Stop services:    docker-compose down
echo   - Restart services: docker-compose restart
echo.
echo For more information, see DOCKER_SETUP.md
echo.
pause

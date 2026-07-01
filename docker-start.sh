#!/bin/bash

# Lelu-Consulting Docker Quick Start Script

set -e

echo "🐳 Lelu-Consulting Docker Setup"
echo "================================"

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

echo "✅ Docker and Docker Compose found"

# Build and start containers
echo ""
echo "📦 Building and starting services..."
docker-compose up --build -d

# Wait for services to be ready
echo ""
echo "⏳ Waiting for services to start..."
sleep 5

# Check backend health
echo ""
echo "🔍 Checking backend health..."
if curl -f http://localhost:5000/api/health > /dev/null 2>&1; then
    echo "✅ Backend is running on http://localhost:5000"
else
    echo "⚠️  Backend may still be starting..."
fi

# Display access information
echo ""
echo "✨ Services are running!"
echo ""
echo "Access the application:"
echo "  - Website:      http://localhost:3000"
echo "  - Admin Login:  http://localhost:3000/admin/login"
echo "  - API Health:   http://localhost:5000/api/health"
echo ""
echo "Admin Credentials:"
echo "  - Email:    admin@lelu-consulting.com"
echo "  - Password: admin123456"
echo ""
echo "Useful commands:"
echo "  - View logs:        docker-compose logs -f"
echo "  - Stop services:    docker-compose down"
echo "  - Restart services: docker-compose restart"
echo ""
echo "For more information, see DOCKER_SETUP.md"

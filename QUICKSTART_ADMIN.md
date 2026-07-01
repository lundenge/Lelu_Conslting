# Quick Start Guide

## 1. Install Backend Dependencies

```bash
cd backend
npm install
```

## 2. Setup Environment

Copy `.env.example` to `.env` and add your MongoDB connection string:

```bash
cp .env.example .env
```

Edit `.env`:

```
MONGODB_URI=your_mongodb_connection_string_here
PORT=5000
NODE_ENV=development
SESSION_SECRET=any-random-secret-key
```

## 3. Initialize Admin Account

Run this once to create the default admin user:

```bash
node initializeAdmin.js
```

Output:
```
Admin user created successfully
Email: admin@lelu-consulting.com
Password: admin123456
```

## 4. Start Backend Server

```bash
npm run dev
```

Server will run on: `http://localhost:5000`

## 5. In Another Terminal, Start Frontend

```bash
cd website
npm run dev
```

Frontend will run on: `http://localhost:3000`

## 6. Access Admin Dashboard

Open your browser and go to:

```
http://localhost:3000/admin/login
```

Login with:
- Email: `admin@lelu-consulting.com`
- Password: `admin123456`

## Admin Dashboard Features

✅ **Customers** - View and manage customer leads
✅ **Messages** - Respond to contact form submissions
✅ **Testimonials** - Approve/reject/add customer testimonials
✅ **Dashboard** - View key metrics

## MongoDB Setup (if using Atlas)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free account
3. Create cluster
4. Create database user
5. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/lelu-consulting?retryWrites=true&w=majority`
6. Paste into `.env` file

## Testing Backend

```bash
curl http://localhost:5000/api/health
```

Should return: `{"status":"ok"}`

## API Documentation

See `ADMIN_SETUP.md` for full API documentation.

## Important Notes

⚠️ **Change default admin password immediately in production**

The default password `admin123456` is for development only. Always:
1. Change password after first login
2. Use strong passwords in production
3. Enable 2FA if available
4. Use environment variables for all secrets

Enjoy! 🚀

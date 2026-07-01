# Admin Dashboard Setup Guide

## Overview

This guide covers setting up the admin backend and dashboard for Lelu-Consulting. The system allows admins to:

- Manage customers
- Respond to contact requests
- Approve/reject testimonials
- Track business metrics

## Requirements

- Node.js 16+ and npm
- MongoDB (Atlas cloud or local)
- Backend running on port 5000
- Frontend (Next.js) running on port 3000

## Installation

### 1. Backend Setup

```bash
cd backend
npm install
```

### 2. Environment Configuration

Create `.env` file from `.env.example`:

```bash
cp .env.example .env
```

Edit `.env` with your MongoDB connection string:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/lelu-consulting?retryWrites=true&w=majority
PORT=5000
NODE_ENV=development
SESSION_SECRET=your-super-secret-key-change-in-production
ADMIN_EMAIL=admin@lelu-consulting.com
ADMIN_PASSWORD=change-me-strong-password
```

### 3. Initialize Admin User

```bash
node initializeAdmin.js
```

This creates the first admin account:
- **Email:** admin@lelu-consulting.com
- **Password:** admin123456

### 4. Start Backend Server

```bash
npm run dev
```

The server will run on `http://localhost:5000`

## Frontend Admin Pages

The following pages are available in the Next.js app:

- **Login:** `/admin/login` - Admin authentication
- **Dashboard:** `/admin/dashboard` - Overview and statistics
- **Customers:** `/admin/customers` - Manage customer database
- **Messages:** `/admin/messages` - View and respond to contact requests
- **Testimonials:** `/admin/testimonials` - Approve/reject/add testimonials

## API Endpoints

All endpoints require authentication except `/api/contact-requests` (POST).

### Authentication

- `POST /api/auth/login` - Admin login
- `POST /api/auth/logout` - Admin logout
- `GET /api/auth/me` - Get current session

### Customers

- `GET /api/customers` - List all customers
- `GET /api/customers/:id` - Get customer details
- `POST /api/customers` - Create customer
- `PUT /api/customers/:id` - Update customer
- `DELETE /api/customers/:id` - Delete customer

### Testimonials

- `GET /api/testimonials` - List testimonials (filter by status)
- `POST /api/testimonials` - Create testimonial
- `PUT /api/testimonials/:id` - Update testimonial
- `PUT /api/testimonials/:id/approve` - Approve testimonial
- `PUT /api/testimonials/:id/reject` - Reject testimonial
- `DELETE /api/testimonials/:id` - Delete testimonial

### Contact Requests

- `GET /api/contact-requests` - List requests (auth required)
- `GET /api/contact-requests/:id` - Get request details (auth required)
- `POST /api/contact-requests` - Submit contact form (public)
- `PUT /api/contact-requests/:id/respond` - Respond to request (auth required)
- `PUT /api/contact-requests/:id/mark-viewed` - Mark as viewed (auth required)
- `PUT /api/contact-requests/:id/archive` - Archive request (auth required)

## Database Schema

### Admin

```javascript
{
  email: String (unique),
  password: String (hashed),
  name: String,
  role: String (admin | moderator),
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Customer

```javascript
{
  name: String,
  email: String,
  phone: String,
  company: String,
  industry: String,
  projectType: String,
  notes: String,
  status: String (new | contacted | in-progress | completed | archived),
  sourceChannel: String (contact-form | email | referral | website | other),
  createdAt: Date,
  updatedAt: Date
}
```

### Testimonial

```javascript
{
  name: String,
  role: String,
  company: String,
  quote: String,
  image: String (URL),
  rating: Number (1-5),
  status: String (pending | approved | rejected),
  approvedBy: ObjectId (ref: Admin),
  createdAt: Date,
  updatedAt: Date
}
```

### ContactRequest

```javascript
{
  name: String,
  email: String,
  phone: String,
  subject: String,
  message: String,
  status: String (new | viewed | responded | archived),
  response: String,
  respondedBy: ObjectId (ref: Admin),
  respondedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## Testing the Admin Panel

1. Start the backend: `npm run dev` (in backend folder)
2. Login at `http://localhost:3000/admin/login`
3. Use credentials:
   - Email: `admin@lelu-consulting.com`
   - Password: `admin123456`

## Security Notes

- Always change the default admin password in production
- Use strong SESSION_SECRET in production
- Use HTTPS in production
- Enable MongoDB IP whitelist for production
- Implement rate limiting on login endpoint
- Add email verification for admin accounts
- Audit log all admin actions in production

## Troubleshooting

### "Connection refused" error

Make sure MongoDB is running and connection string is correct.

### "Authentication required" on dashboard

Backend may not be running. Check:

```bash
curl http://localhost:5000/api/health
```

Should return: `{ "status": "ok" }`

### CORS errors

Check that:
- Backend allows `http://localhost:3000` origin
- Requests include `credentials: 'include'`
- Session cookies are being sent

## Next Steps

- Customize admin dashboard styling
- Add email notifications
- Add export/import functionality
- Implement admin activity logging
- Add customer communication templates

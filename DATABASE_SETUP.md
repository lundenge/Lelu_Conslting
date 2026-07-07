# Database Setup Guide - Lelu Consulting

## Overview
The application uses MongoDB for storing contact requests and testimonials. All data is now dynamic and stored in the database.

## Database Setup Options

### Option 1: MongoDB Atlas (Cloud - Recommended for Development)
**Easiest setup, no local installation required:**

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for a free account
3. Create a new cluster (M0 free tier)
4. Create a database user with credentials
5. Get your connection string
6. Update `.env` file in the `backend/` folder:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster-name.mongodb.net/lelu-consulting?retryWrites=true&w=majority
   ```
7. Restart the backend server

### Option 2: Local MongoDB
**Requires local installation:**

1. **Install MongoDB Community Edition:**
   - Windows: Download from [mongodb.com](https://www.mongodb.com/try/download/community)
   - Or use: `choco install mongodb-community` (if you have Chocolatey)

2. **Start MongoDB Service:**
   ```powershell
   # On Windows
   mongod
   ```

3. **Verify connection:**
   The `.env` file already has the default local connection string:
   ```
   MONGODB_URI=mongodb://localhost:27017/lelu-consulting
   ```

4. **Restart the backend server**

## Database Schema

### ContactRequest Collection
```json
{
  "_id": "ObjectId",
  "name": "string",
  "email": "string",
  "phone": "string (optional)",
  "subject": "string",
  "message": "string",
  "status": "new | viewed | responded | archived",
  "response": "string (optional)",
  "respondedBy": "ObjectId (Admin reference)",
  "respondedAt": "Date",
  "createdAt": "Date (auto)",
  "updatedAt": "Date (auto)"
}
```

### Testimonial Collection
```json
{
  "_id": "ObjectId",
  "name": "string",
  "role": "string",
  "company": "string",
  "quote": "string",
  "image": "string (URL)",
  "rating": "number (1-5)",
  "status": "pending | approved | rejected",
  "approvedBy": "ObjectId (Admin reference)",
  "createdAt": "Date (auto)",
  "updatedAt": "Date (auto)"
}
```

## API Endpoints

### Contact Requests
- `POST /api/contact-requests` - Submit contact form (public)
- `GET /api/contact-requests` - List all requests (admin only)
- `GET /api/contact-requests/:id` - Get single request (admin only)
- `PUT /api/contact-requests/:id/respond` - Respond to request (admin only)
- `PUT /api/contact-requests/:id/mark-viewed` - Mark as viewed (admin only)
- `PUT /api/contact-requests/:id/archive` - Archive request (admin only)

### Testimonials
- `GET /api/testimonials/public/approved` - Get approved testimonials (public)
- `GET /api/testimonials` - List all testimonials (admin only)
- `POST /api/testimonials` - Create testimonial (admin only)
- `PUT /api/testimonials/:id/approve` - Approve testimonial (admin only)
- `PUT /api/testimonials/:id/reject` - Reject testimonial (admin only)
- `PUT /api/testimonials/:id` - Update testimonial (admin only)
- `DELETE /api/testimonials/:id` - Delete testimonial (admin only)

## Frontend Integration

### Contact Form
The contact form at `/contact` now submits data to:
```
POST http://localhost:5000/api/contact-requests
```

Users can fill out the form and their submission will be saved to the database.

### Testimonials Page
The testimonials page at `/testimonials` now fetches approved testimonials from:
```
GET http://localhost:5000/api/testimonials/public/approved
```

If no testimonials are in the database, it falls back to default testimonials.

## Admin Dashboard
- Visit `http://localhost:3000/admin/login`
- Email: `admin@lelu-consulting.com`
- Password: `admin123456`
- In the dashboard, you can:
  - View contact requests
  - Respond to messages
  - Approve/reject testimonials
  - Manage all submissions

## Testing

### Test Contact Form
1. Go to `http://localhost:3000/contact`
2. Fill out the form
3. Click "Send Message"
4. Check admin dashboard at `http://localhost:3000/admin/messages`

### Test Testimonials
1. Go to admin dashboard at `http://localhost:3000/admin/login`
2. Navigate to testimonials section
3. Create a new testimonial
4. Approve it
5. View it on `http://localhost:3000/testimonials`

## Troubleshooting

**Error: "Cannot find module 'mongoose'"**
- Run: `npm install` in the backend folder

**Error: "MongoDB connection error"**
- Ensure MongoDB is running (Atlas or local)
- Check `.env` file has correct MONGODB_URI
- Restart the backend server

**Contact form submissions aren't appearing in database**
- Check that the backend is running on port 5000
- Verify MongoDB connection is established
- Check browser console for API errors

**Testimonials not showing**
- Make sure at least one testimonial is approved in the admin dashboard
- Check that the backend can connect to MongoDB

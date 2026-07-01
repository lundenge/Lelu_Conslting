const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const DATA_FILE = path.join(__dirname, 'data.json');

function initializeAdmin() {
  try {
    let store = { admins: [], customers: [], testimonials: [], contactRequests: [] };

    if (fs.existsSync(DATA_FILE)) {
      store = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    }

    const existingAdmin = store.admins.find((admin) => admin.email === 'admin@lelu-consulting.com');
    if (existingAdmin) {
      console.log('Admin user already exists');
      return;
    }

    const hashedPassword = bcrypt.hashSync(process.env.ADMIN_PASSWORD || 'admin123456', 10);
    store.admins.push({
      id: 'admin-1',
      email: process.env.ADMIN_EMAIL || 'admin@lelu-consulting.com',
      password: hashedPassword,
      name: 'Admin User',
      role: 'admin',
      isActive: true,
    });

    fs.writeFileSync(DATA_FILE, JSON.stringify(store, null, 2));
    console.log('Admin user created successfully');
    console.log('Email: admin@lelu-consulting.com');
    console.log('Password: admin123456');
    console.log('⚠️  IMPORTANT: Change this password in production!');
  } catch (error) {
    console.error('Error initializing admin:', error);
    process.exit(1);
  }
}

initializeAdmin();

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { getAdminByEmail, getAdminById } = require('../storage');

// Login
router.post('/login', (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' });
    }

    const admin = getAdminByEmail(email);
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isValidPassword = bcrypt.compareSync(password, admin.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    req.session.adminId = admin.id;
    req.session.adminEmail = admin.email;

    res.json({
      message: 'Login successful',
      admin: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Logout
router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.json({ message: 'Logout successful' });
  });
});

// Get current admin session
router.get('/me', (req, res) => {
  if (!req.session.adminId) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  const admin = getAdminById(req.session.adminId);
  if (!admin) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  res.json({
    id: admin.id,
    email: admin.email,
    name: admin.name,
  });
});

module.exports = router;

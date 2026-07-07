const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const ContactRequest = require('../models/ContactRequest');

// Get all contact requests (admin only)
router.get('/', authenticate, async (req, res) => {
  try {
    const { status } = req.query;
    const query = status ? { status } : {};
    const requests = await ContactRequest.find(query).sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single request (admin only)
router.get('/:id', authenticate, async (req, res) => {
  try {
    const request = await ContactRequest.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }
    res.json(request);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create contact request (public)
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, company, service, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email, and message are required' });
    }

    const contactRequest = new ContactRequest({
      name,
      email,
      phone,
      subject: service || 'Contact Form Submission',
      message,
      status: 'new',
    });

    await contactRequest.save();
    res.status(201).json({ message: 'Contact request submitted successfully', data: contactRequest });
  } catch (error) {
    res.status(400).json({ message: 'Validation error', error: error.message });
  }
});

// Respond to contact request (admin only)
router.put('/:id/respond', authenticate, async (req, res) => {
  try {
    const { response } = req.body;
    if (!response) {
      return res.status(400).json({ message: 'Response message required' });
    }

    const contactRequest = await ContactRequest.findByIdAndUpdate(
      req.params.id,
      {
        status: 'responded',
        response,
        respondedBy: req.session.adminId,
        respondedAt: new Date(),
      },
      { new: true }
    );

    if (!contactRequest) {
      return res.status(404).json({ message: 'Request not found' });
    }
    res.json(contactRequest);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Mark as viewed (admin only)
router.put('/:id/mark-viewed', authenticate, async (req, res) => {
  try {
    const contactRequest = await ContactRequest.findByIdAndUpdate(
      req.params.id,
      { status: 'viewed' },
      { new: true }
    );
    if (!contactRequest) {
      return res.status(404).json({ message: 'Request not found' });
    }
    res.json(contactRequest);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Archive request (admin only)
router.put('/:id/archive', authenticate, async (req, res) => {
  try {
    const contactRequest = await ContactRequest.findByIdAndUpdate(
      req.params.id,
      { status: 'archived' },
      { new: true }
    );
    if (!contactRequest) {
      return res.status(404).json({ message: 'Request not found' });
    }
    res.json(contactRequest);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;


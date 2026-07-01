const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const {
  listContactRequests,
  getContactRequestById,
  createContactRequest,
  updateContactRequest,
} = require('../storage');

// Get all contact requests
router.get('/', authenticate, (req, res) => {
  try {
    const { status } = req.query;
    const requests = listContactRequests(status);
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single request
router.get('/:id', authenticate, (req, res) => {
  try {
    const request = getContactRequestById(req.params.id);
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }
    res.json(request);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create contact request (public)
router.post('/', (req, res) => {
  try {
    const request = createContactRequest(req.body);
    res.status(201).json(request);
  } catch (error) {
    res.status(400).json({ message: 'Validation error', error: error.message });
  }
});

// Respond to contact request
router.put('/:id/respond', authenticate, (req, res) => {
  try {
    const { response } = req.body;
    if (!response) {
      return res.status(400).json({ message: 'Response message required' });
    }

    const request = updateContactRequest(req.params.id, {
      status: 'responded',
      response,
      respondedBy: req.session.adminId,
      respondedAt: new Date().toISOString(),
    });

    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }
    res.json(request);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Mark as viewed
router.put('/:id/mark-viewed', authenticate, (req, res) => {
  try {
    const request = updateContactRequest(req.params.id, { status: 'viewed' });
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }
    res.json(request);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Archive request
router.put('/:id/archive', authenticate, (req, res) => {
  try {
    const request = updateContactRequest(req.params.id, { status: 'archived' });
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }
    res.json(request);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;

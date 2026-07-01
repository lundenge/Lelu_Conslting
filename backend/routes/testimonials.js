const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const {
  listTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} = require('../storage');

// Get all testimonials (with status filter)
router.get('/', authenticate, (req, res) => {
  try {
    const { status } = req.query;
    const testimonials = listTestimonials(status);
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create testimonial
router.post('/', authenticate, (req, res) => {
  try {
    const testimonial = createTestimonial(req.body);
    res.status(201).json(testimonial);
  } catch (error) {
    res.status(400).json({ message: 'Validation error', error: error.message });
  }
});

// Approve testimonial
router.put('/:id/approve', authenticate, (req, res) => {
  try {
    const testimonial = updateTestimonial(req.params.id, {
      status: 'approved',
      approvedBy: req.session.adminId,
    });
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }
    res.json(testimonial);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Reject testimonial
router.put('/:id/reject', authenticate, (req, res) => {
  try {
    const testimonial = updateTestimonial(req.params.id, { status: 'rejected' });
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }
    res.json(testimonial);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update testimonial
router.put('/:id', authenticate, (req, res) => {
  try {
    const testimonial = updateTestimonial(req.params.id, req.body);
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }
    res.json(testimonial);
  } catch (error) {
    res.status(400).json({ message: 'Validation error', error: error.message });
  }
});

// Delete testimonial
router.delete('/:id', authenticate, (req, res) => {
  try {
    const testimonial = deleteTestimonial(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }
    res.json({ message: 'Testimonial deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;

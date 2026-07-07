const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const Testimonial = require('../models/Testimonial');

// Get approved testimonials (public - for frontend)
router.get('/public/approved', async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ status: 'approved' }).sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all testimonials (admin only)
router.get('/', authenticate, async (req, res) => {
  try {
    const { status } = req.query;
    const query = status ? { status } : {};
    const testimonials = await Testimonial.find(query).sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single testimonial (admin only)
router.get('/:id', authenticate, async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }
    res.json(testimonial);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create testimonial (admin only)
router.post('/', authenticate, async (req, res) => {
  try {
    const { name, role, company, quote, image, rating } = req.body;

    if (!name || !role || !company || !quote || !image) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const testimonial = new Testimonial({
      name,
      role,
      company,
      quote,
      image,
      rating: rating || 5,
      status: 'pending',
    });

    await testimonial.save();
    res.status(201).json({ message: 'Testimonial created successfully', data: testimonial });
  } catch (error) {
    res.status(400).json({ message: 'Validation error', error: error.message });
  }
});

// Approve testimonial (admin only)
router.put('/:id/approve', authenticate, async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      {
        status: 'approved',
        approvedBy: req.session.adminId,
      },
      { new: true }
    );
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }
    res.json(testimonial);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Reject testimonial (admin only)
router.put('/:id/reject', authenticate, async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      { status: 'rejected' },
      { new: true }
    );
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }
    res.json(testimonial);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update testimonial (admin only)
router.put('/:id', authenticate, async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }
    res.json(testimonial);
  } catch (error) {
    res.status(400).json({ message: 'Validation error', error: error.message });
  }
});

// Delete testimonial (admin only)
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }
    res.json({ message: 'Testimonial deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;


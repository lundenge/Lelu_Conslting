const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    phone: String,
    company: String,
    industry: String,
    projectType: String,
    notes: String,
    status: {
      type: String,
      enum: ['new', 'contacted', 'in-progress', 'completed', 'archived'],
      default: 'new',
    },
    sourceChannel: {
      type: String,
      enum: ['contact-form', 'email', 'referral', 'website', 'other'],
      default: 'contact-form',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Customer', customerSchema);

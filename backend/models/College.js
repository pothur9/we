const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true,
    index: true
  },
  state: {
    type: String,
    required: true,
    default: 'Karnataka'
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
    default: 4.0
  },
  image: {
    type: String,
    default: 'https://images.unsplash.com/photo-1562774053-701939374585?w=400'
  },
  courses: [{
    type: String
  }],
  fees: {
    type: String,
    default: 'Contact for fees'
  },
  description: {
    type: String,
    default: ''
  },
  website: {
    type: String,
    default: ''
  },
  phone: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    default: ''
  },
  established: {
    type: Number
  },
  accreditation: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for search
collegeSchema.index({ name: 'text', city: 'text' });

module.exports = mongoose.model('College', collegeSchema);

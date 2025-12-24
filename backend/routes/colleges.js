const express = require('express');
const router = express.Router();
const College = require('../models/College');

// GET all colleges with filters
router.get('/', async (req, res) => {
  try {
    const { city, category, q, page = 1, limit = 50 } = req.query;
    
    let query = {};
    
    // Filter by city
    if (city) {
      query.city = { $regex: new RegExp(city, 'i') };
    }
    
    // Filter by course/category
    if (category) {
      query.courses = { $in: [category] };
    }
    
    // Search by name
    if (q) {
      query.name = { $regex: new RegExp(q, 'i') };
    }
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const colleges = await College.find(query)
      .sort({ rating: -1, name: 1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    const total = await College.countDocuments(query);
    
    res.json({
      success: true,
      data: colleges,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Error fetching colleges:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET single college by ID
router.get('/:id', async (req, res) => {
  try {
    const college = await College.findById(req.params.id);
    
    if (!college) {
      return res.status(404).json({ success: false, message: 'College not found' });
    }
    
    res.json({ success: true, data: college });
  } catch (error) {
    console.error('Error fetching college:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET unique cities
router.get('/meta/cities', async (req, res) => {
  try {
    const cities = await College.distinct('city');
    res.json({ success: true, data: cities.sort() });
  } catch (error) {
    console.error('Error fetching cities:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET college count
router.get('/meta/count', async (req, res) => {
  try {
    const count = await College.countDocuments();
    res.json({ success: true, count });
  } catch (error) {
    console.error('Error getting count:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;

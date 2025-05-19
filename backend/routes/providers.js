const express = require('express');
const router = express.Router();
const Provider = require('../models/Provider');
const auth = require('../middleware/auth');

// Get all providers
router.get('/', async (req, res) => {
  try {
    const providers = await Provider.find().populate('userId', '-password').populate('reviews.userId', '-password');
    res.json(providers);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Create a new provider
router.post('/', auth, async (req, res) => {
  try {
    const { services, location, experience, userId, priceRange } = req.body;
    
    // Validate input
    if (!services || !location || !experience || !userId) {
      return res.status(400).json({ message: 'Required fields are missing' });
    }

    const provider = new Provider({
      userId,
      services,
      location,
      experience,
      priceRange: priceRange || { min: 0, max: 0 }
    });

    await provider.save();
    res.status(201).json(provider);
  } catch (err) {
    res.status(500).json({ message: 'Error creating provider', error: err.message });
  }
});

// Get provider by ID
router.get('/:id', async (req, res) => {
  try {
    const provider = await Provider.findById(req.params.id)
      .populate('userId', '-password')
      .populate('reviews.userId', '-password');
    if (!provider) {
      return res.status(404).json({ message: 'Provider not found' });
    }
    res.json(provider);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get providers by service type
function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

router.get('/service/:serviceType', async (req, res) => {
  try {
    const escapedServiceType = escapeRegex(req.params.serviceType);
    const providers = await Provider.find({
      services: { $in: [new RegExp(escapedServiceType, 'i')] }
    }).populate('userId', '-password').populate('reviews.userId', '-password');

    console.log(providers);
    res.json(providers);


  } catch (err) {
    console.error('Error fetching providers by service type:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Add review to provider
router.post('/:id/reviews', auth, async (req, res) => {
  try {
    const provider = await Provider.findById(req.params.id);
    if (!provider) {
      return res.status(404).json({ message: 'Provider not found' });
    }

    const { userId, rating, comment } = req.body;

    if (!userId || rating === undefined) {
      return res.status(400).json({ message: 'Required fields are missing' });
    }

    provider.reviews.push({ userId, rating, comment });
    const avgRating = provider.reviews.reduce((sum, review) => sum + review.rating, 0) / provider.reviews.length;
    provider.rating = avgRating;

    await provider.save();
    res.json(provider);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Report a provider (fraud alert)
router.post('/:id/report', auth, async (req, res) => {
  try {
    const provider = await Provider.findById(req.params.id);
    if (!provider) {
      return res.status(404).json({ message: 'Provider not found' });
    }

    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    if (!provider.reportedBy.includes(userId)) {
      provider.reportedBy.push(userId);
    }

    await provider.save();
    res.json({ message: 'Provider reported', reportedBy: provider.reportedBy });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Update provider
router.put('/:id', auth, async (req, res) => {
  try {
    const provider = await Provider.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!provider) {
      return res.status(404).json({ message: 'Provider not found' });
    }
    res.json(provider);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;

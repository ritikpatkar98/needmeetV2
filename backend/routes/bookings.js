const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Provider = require('../models/Provider'); // Required for ratings
const auth = require('../middleware/auth');

// ✅ Create a new booking
router.post('/', async (req, res) => {
  try {
    const { userId, providerId, serviceType, date, location, shareLocation } = req.body;

    // Ensure user is authenticated
    if (!userId || !providerId) {
      return res.status(400).json({ message: 'User and Provider IDs are required' });
    }

    const booking = new Booking({
      userId,
      providerId,
      serviceType,
      date,
      location: location || null,               // Optional
      shareLocation: shareLocation || false     // Optional
    });

    await booking.save();
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: 'Error creating booking', error: err.message });
  }
});

// Get user's bookings
router.get('/user/:userId', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.params.userId })
      .populate('providerId')
      .sort({ date: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching bookings', error: err.message });
  }
});

// Get provider's bookings
router.get('/provider/:providerId', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ providerId: req.params.providerId })
      .populate('userId', '-password')
      .sort({ date: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching bookings', error: err.message });
  }
});

// Update booking status (e.g., "completed" or "cancelled")
router.patch('/:id', auth, async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: 'Error updating booking', error: err.message });
  }
});

// Delete booking (cancel booking)
router.delete('/:id', auth, async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json({ message: 'Booking cancelled successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error cancelling booking', error: err.message });
  }
});

// ⭐ POST route to submit ratings (Store ratings in DB)
router.post('/ratings', auth, async (req, res) => {
  try {
    const { providerId, rating, userId } = req.body;

    const provider = await Provider.findById(providerId);
    if (!provider) {
      return res.status(404).json({ message: 'Provider not found' });
    }

    provider.reviews.push({ userId, rating });
    provider.rating = provider.reviews.reduce((acc, rev) => acc + rev.rating, 0) / provider.reviews.length;

    await provider.save();

    res.json({ message: 'Rating saved successfully!' });
  } catch (err) {
    res.status(500).json({ message: 'Error saving rating', error: err.message });
  }
});

// Get all bookings with optional status filter (Active, Completed, Cancelled)
router.get('/', auth, async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};

    const bookings = await Booking.find(filter)
      .populate('providerId')
      .populate('userId', '-password')
      .sort({ date: -1 });

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching bookings', error: err.message });
  }
});

module.exports = router;

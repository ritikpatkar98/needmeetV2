const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Provider = require('../models/Provider'); // Required for ratings
const auth = require('../middleware/auth');

// ✅ Create a new booking
const mongoose = require('mongoose');

router.post('/', auth, async (req, res) => {
  try {
    const { userId, providerId, serviceType, date, location, shareLocation } = req.body;

    if (!userId || !providerId || !serviceType || !date) {
      return res.status(400).json({ message: 'userId, providerId, serviceType, and date are required' });
    }

    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(providerId)) {
      return res.status(400).json({ message: 'Invalid userId or providerId' });
    }

    // Ensure the user making the request is the same as userId in body
    if (req.userId !== userId) {
      return res.status(403).json({ message: 'Forbidden: You can only create bookings for yourself' });
    }

    // Optional: Check if provider exists
    const providerExists = await require('../models/Provider').exists({ _id: providerId });
    if (!providerExists) {
      return res.status(404).json({ message: 'Provider not found' });
    }

    const booking = new Booking({
      userId,
      providerId,
      serviceType,
      date,
      location: location || null,
      shareLocation: shareLocation || false
    });

    await booking.save();
    console.log(`Booking created by user ${userId} for provider ${providerId}`);
    res.status(200).json(booking);
  } catch (err) {
    console.error('Error creating booking:', err);
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

const allowedStatuses = ['pending', 'completed', 'cancelled'];

router.patch('/booking/status/:id', auth, async (req, res) => {
  try {
    const bookingId = req.params.id;
    const { status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
      return res.status(400).json({ message: 'Invalid booking ID' });
    }

    if (!status || !allowedStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid or missing status' });
    }

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Authorization check: user must be owner or provider or admin (assuming req.userId and req.userRole)
    if (booking.userId.toString() !== req.userId && booking.providerId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Forbidden: You are not authorized to update this booking' });
    }

    booking.status = status;
    await booking.save();

    console.log(`Booking ${bookingId} status updated to ${status} by user ${req.userId}`);

    res.json(booking);
  } catch (err) {
    console.error('Error updating booking:', err);
    res.status(500).json({ message: 'Error updating booking', error: err.message });
  }
});

// Delete booking (cancel booking)


router.delete('/booking/delete/:id', auth, async (req, res) => {
  try {
    const bookingId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
      return res.status(400).json({ message: 'Invalid booking ID' });
    }

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (booking.userId.toString() !== req.userId && booking.providerId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Forbidden: You are not authorized to cancel this booking' });
    }

    await booking.deleteOne();

    console.log(`Booking ${bookingId} cancelled by user ${req.userId}`);

    res.json({ message: 'Booking cancelled successfully', booking });
  } catch (err) {
    console.error('Error cancelling booking:', err);
    res.status(500).json({ message: 'Error cancelling booking', error: err.message });
  }
});

// ⭐ POST route to submit ratings (Store ratings in DB)
router.post('/ratings', auth, async (req, res) => {
  try {
    const { providerId, rating, userId } = req.body;

    if (!providerId || !userId || rating === undefined) {
      return res.status(400).json({ message: 'providerId, userId, and rating are required' });
    }

    if (typeof rating !== 'number' || rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be a number between 1 and 5' });
    }

    const provider = await Provider.findById(providerId);
    if (!provider) {
      return res.status(404).json({ message: 'Provider not found' });
    }

    const existingReviewIndex = provider.reviews.findIndex(r => r.userId.toString() === userId);
    if (existingReviewIndex !== -1) {

      provider.reviews[existingReviewIndex].rating = rating;
    } else {
      provider.reviews.push({ userId, rating });
    }

    provider.rating = provider.reviews.reduce((acc, rev) => acc + rev.rating, 0) / provider.reviews.length;

    await provider.save();

    console.log(`User ${userId} rated provider ${providerId} with ${rating}`);

    res.json({ message: 'Rating saved successfully!', rating: provider.rating, totalReviews: provider.reviews.length });
  } catch (err) {
    console.error('Error saving rating:', err);
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

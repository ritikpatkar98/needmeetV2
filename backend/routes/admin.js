const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Provider = require('../models/Provider');
const User = require('../models/User');

// Admin dashboard stats
router.get('/dashboard', async (req, res) => {
  try {
    const totalBookings = await Booking.countDocuments();
    const totalProviders = await Provider.countDocuments();
    const totalUsers = await User.countDocuments();

    res.status(200).json({
      totalBookings,
      totalProviders,
      totalUsers
    });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching admin dashboard stats', error: err.message });
  }
});

module.exports = router;

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const User = require('../models/User');
const Provider = require('../models/Provider');

// Create data directory if it doesn't exist
const dataDir = path.join(__dirname, '../data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}

// Define dataFile path ONCE
const dataFile = path.join(dataDir, 'users.json');

// Ensure users.json exists with valid JSON array
if (!fs.existsSync(dataFile)) {
    fs.writeFileSync(dataFile, '[]', 'utf8');
}

// GET route to test the API
router.get('/', (req, res) => {
  res.json({ message: 'Auth API is working' });
});

// Register
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, role, services, location, phone } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password before saving
    const user = new User({
      name,
      email,
      password, // Store hashed password
      role,
      services: services || [],
      location: location || '',
      phone: phone || '',
    });

    await user.save();

    // If the user is a provider, create a provider document
    if (role === 'provider') {
      const provider = new Provider({
        userId: user._id,
        services: [],
        location: '',
        experience: 0,
        priceRange: { min: 0, max: 0 }
      });
      await provider.save();
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

    res.status(201).json({ 
      user: { ...user.toJSON(), password: undefined }, 
      token 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('Login attempt:', { email, password });
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // Compare entered password with hashed password
    
    const isMatch = await bcrypt.compare(password, user.password);
    // console.log('User found:', isMatch);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid Passowrd' });
    }

    // Generate JWT token on successful login
    const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

    res.json({
      user: { ...user.toJSON(), password: undefined },
      token
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET all users (for frontend login & debugging)
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({}, '-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

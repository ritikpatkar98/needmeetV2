const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/User');
const Provider = require('../models/Provider');
const auth = require('../middleware/auth');
const { asyncHandler } = require('../middleware/errorHandlers');

router.post('/signup', asyncHandler(async (req, res) => {
  const {
    name,
    email,
    password,
    role,
    services,
    location,
    phone,
    priceRange,
    experience,
    address,
  } = req.body;

  console.log(name,
    email,
    password,
    role,
    services,
    location,
    phone,
    priceRange,
    experience,
    address);

  // Basic validation
  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: 'Please provide name, email, password, and role' });
  }

  const existingUser = await User.findOne({ email });
  const existingProvider = await Provider.findOne({ email });
  if (existingUser || existingProvider) {
    return res.status(400).json({ message: 'Email already exists' });
  }

  // Hash password before saving
  const hashedPassword = await bcrypt.hash(password, 10);
  let user = null;
  let provider = null;
  if (role.toLowerCase() === 'user') {
    user = new User({
      name,
      email,
      password: hashedPassword,
      role,
      services: services || [],
      location: location || '',
      phone: phone || '',
    });

    await user.save();
  }

  // If the user is a provider, create a provider document with required fields
  if (role.toLowerCase() === 'provider') {
    // Convert experience string to number (e.g., '1-3 years' => 2)
    let expNumber = 0;
    if (experience && typeof experience === 'string') {
      const match = experience.match(/(\d+)/);
      expNumber = match ? parseInt(match[1], 10) : 0;
    }

    // Convert priceRange string to min and max numbers (e.g., '₹100-₹300/hour')
    let priceMin = 0;
    let priceMax = 0;
    if (priceRange && typeof priceRange === 'string') {
      const priceMatch = priceRange.match(/₹(\d+)-₹(\d+)/);
      if (priceMatch) {
        priceMin = parseInt(priceMatch[1], 10);
        priceMax = parseInt(priceMatch[2], 10);
      }
    }

    provider = new Provider({
      name,
      email,
      password: hashedPassword,
      role: 'provider',
      services: services && services.length ? services : [],
      location: location || '',
      phone: phone || '',
      address: address || '',
      experience: expNumber,
      priceRange: {
        min: priceMin,
        max: priceMax,
      },
    });

    await provider.save();
  }

  // Generate a JWT token
  const token = jwt.sign(
    { userId: (role.toLowerCase() === 'provider') ? provider._id : user._id },
    process.env.JWT_SECRET || 'your_jwt_secret',
    { expiresIn: '1h' }
  );

  // Set token in httpOnly cookie
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 3600000, // 1 hour
  });

  res.status(201).json({
    user: (role.toLowerCase() === 'provider') ? { ...provider.toJSON(), password: undefined } : { ...user.toJSON(), password: undefined },
    // token // token no longer sent in response body
  });
}));

router.post('/login', asyncHandler(async (req, res) => {
  console.log('Login request body:', req.body);
  const { email, password } = req.body;
  console.log('Login attempt with email:', email);
  console.log('Login attempt with password:', password);
  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide email and password' });
  }

  const user = await User.findOne({ email });
  const provider = await Provider.findOne({ email });
  if (!user && !provider) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  let isMatch = false;
  if (provider) {
    isMatch = await bcrypt.compare(password, provider.password);
  } else if (user) {
    isMatch = await bcrypt.compare(password, user.password);
  }

  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid password' });
  }

  // Generate JWT token on successful login
  if (user) {
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: '1d' }
    );
    // Set token in httpOnly cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 86400000, // 1 day
    });
    res.json({
      user: { ...user.toJSON(), password: undefined },
      // token // token no longer sent in response body
    });
  } else {
    const token = jwt.sign(
      { userId: provider._id },
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: '1d' }
    );
    // Set token in httpOnly cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 86400000, // 1 day
    });

    res.json({
      user: { ...provider.toJSON(), password: undefined },
      // token // token no longer sent in response body
    });
  }
}));

router.post('/logout', asyncHandler(async (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });
  res.json({ message: 'Logged out successfully' });
}));

router.get('/all/users', asyncHandler(async (req, res) => {
  const users = await User.find({}, '-password');
  res.json(users);
}));

router.get('/all/provider', asyncHandler(async (req, res) => {
  const users = await Provider.find({}, '-password');
  res.json(users);
}));

router.get('/me', auth, asyncHandler(async (req, res) => {
  const token = req.cookies.token;
  console.log('Token from cookie:', token);
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
  // Try to find user in both User and Provider collections
  let user = await User.findById(decoded.userId).select('-password');
  if (!user) {
    user = await Provider.findById(decoded.userId).select('-password');
  }
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json(user);
}));

module.exports = router;

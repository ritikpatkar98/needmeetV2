const jwt = require('jsonwebtoken');

// Authentication middleware
const auth = (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log('Auth Token from Cookie:', token);

    if (!token) {
      return res.status(401).json({ message: 'Authentication failed. Token missing.' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
    req.userId = decoded.userId;
    next();
  } catch (err) {
    // If the token is missing, invalid, or expired
    res.status(401).json({ message: 'Authentication failed. Please log in again.' });
  }
};

module.exports = auth;




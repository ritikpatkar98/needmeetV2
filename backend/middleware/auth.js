const jwt = require('jsonwebtoken');

// Authentication middleware
const auth = (req, res, next) => {
  try {
    // Extract the token from the Authorization header
    const token = req.headers;
    // console.log("dklfbnldf",token)

    // Verify the token using the secret key stored in environment variables
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Add user ID from the decoded token to the request object
    req.userId = decoded.userId;

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    // If the token is missing, invalid, or expired
    res.status(401).json({ message: 'Authentication failed. Please log in again.' });
  }
};

module.exports = auth;

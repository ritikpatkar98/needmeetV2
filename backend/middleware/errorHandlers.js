/**
 * Async handler to wrap async route handlers and catch errors.
 * Usage: router.get('/', asyncHandler(async (req, res, next) => { ... }));
 */
const asyncHandler = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

/**
 * Centralized error handling middleware.
 * Should be used as the last middleware in the app.
 */
const errorHandler = (err, req, res, next) => {
  console.error(err);

  // Handle known validation or client errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({ message: err.message });
  }

  if (err.status && err.message) {
    return res.status(err.status).json({ message: err.message });
  }

  // Default to 500 server error
  res.status(500).json({ message: 'Server error' });
};

module.exports = {
  asyncHandler,
  errorHandler,
};

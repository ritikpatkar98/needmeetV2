const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');


// Function to simulate sending alerts (can be extended to notify admins or authorities)
function sendSOSAlert(sosDetails) {
  console.log('Sending SOS alert:', sosDetails);
  // Add logic to send an email or SMS to notify admins or authorities
}

router.post('/', auth, (req, res) => {
  const { userId, location, message } = req.body;

  // Basic validation
  if (!userId || !location || !message) {
    return res.status(400).json({ message: 'User ID, location, and message are required' });
  }

  // Send SOS alert
  const sosDetails = { userId, location, message, timestamp: new Date() };
  sendSOSAlert(sosDetails);

  res.status(200).json({ message: 'SOS alert sent successfully' });
});

module.exports = router;

const mongoose = require('mongoose');

const providerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'provider'],
    default: 'provider'
  },

  services: [{
    type: String,
    required: true
  }],
  location: {
    type: String,
    required: true
  },
  experience: {
    type: Number,
    required: true
  },
  priceRange: {
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 0
    }
  },
  rating: {
    type: Number,
    default: 0
  },
  reviews: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: Number,
    comment: String,
    date: {
      type: Date,
      default: Date.now
    }
  }],
  availability: [{
    day: String,
    hours: String
  }],
  isVerified: {
    type: Boolean,
    default: false
  },
  reportedBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  profilePicture: {
    type: String,
    default: 'default.jpg'  // Optionally, a default image or URL for the provider
  },
  phone: {
    type: String,
    required: true
  },
  emailVerified: {
    type: Boolean,
    default: false
  },
  address: {
    type: String,
    required: true
  },
  serviceDetails: [{
    serviceName: String,
    description: String,
    individualPricing: {
      type: Number,
      default: 0
    }
  }],
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

// Pre-save hook to update the lastUpdated timestamp
providerSchema.pre('save', function (next) {
  this.lastUpdated = Date.now();
  next();
});

module.exports = mongoose.model('Provider', providerSchema);

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');  // For hashing the password

const userSchema = new mongoose.Schema({
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
  phone: {
    type: String,
    default: ''
  },
  role:{
    type: String,
    enum: ['user', 'provider'],
    default: 'user'
  },
  address: {
    type: String,
    default: ''
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  emailVerified: {
    type: Boolean,
    default: false
  },
  profilePicture: {
    type: String,
    default: 'default.jpg'  // Optionally, a default profile picture
  },
  experience : {
    type: String,
    default: ''
  },
  priceRange : {
    type: Number,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Hash the password before saving the user document
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    // Hash the password with 10 rounds
    this.password = await bcrypt.hash(this.password, 10);
  }
  this.updatedAt = Date.now();  // Update `updatedAt` whenever the document is modified
  next();
});

// Compare password method to validate login attempts
// userSchema.methods.comparePassword = async function (candidatePassword) {
//   return await bcrypt.compare(candidatePassword, this.password);
// };

module.exports = mongoose.model('User', userSchema);

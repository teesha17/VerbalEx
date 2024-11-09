const mongoose = require('mongoose');

const aadhaarSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  full_name: {
    type: String,
  },
  dob: {
    type: String, 
  },
  gender: {
    type: String,
  },
  aadhaar_number: {
    type: String,
    unique: true,
  }
});

module.exports = mongoose.model('frontaadhaar', aadhaarSchema);

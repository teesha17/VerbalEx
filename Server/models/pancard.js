const mongoose = require('mongoose');

const panCardSchema = new mongoose.Schema({
  panNumber: {
    type: String,
  },
  fullName: {
    type: String,
  },
  parentsName: {
    type: String,
  },
  dateOfBirth: {
    type: String,
  }
});

module.exports = mongoose.model('pancard', panCardSchema);

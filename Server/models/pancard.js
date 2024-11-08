const mongoose = require('mongoose');

const panCardSchema = new mongoose.Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'users',
  },
  panNumber: {
    type: String,
    unique:true
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

const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  reg_number: {
    type: String,
    unique: true
  },
  chasis_number: {
    type: String,
    unique: true
  },
  name: {
    type: String,
  },
  swd: {
    type: String,
  },
  address: {
    type: String,
  },
  fuel_type: {
    type: String,
  },
  vehicle_class: {
    type: String,
  },
  model: {
    type: String,
  },
  manufacturer: {
    type: String,
  },
  registration_date: {
    type: Date,
  },
  expiry_date: {
    type: Date,
  },
  tax_up_to: {
    type: Date,
  }
});

module.exports = mongoose.model('Vehicle', vehicleSchema);

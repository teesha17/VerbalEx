const mongoose = require('mongoose');

const vehicleRegistrationSchema = new mongoose.Schema({
  reg_number: {
    type: String,
    required: true,
    unique: true
  },
  chasis_number: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  swd: {
    type: String,
    required: true,
    enum: ['Son', 'Wife', 'Daughter']
  },
  address: {
    type: String,
    required: true
  },
  fuel_type: {
    type: String,
    required: true,
    enum: ['Petrol', 'Diesel', 'Electric', 'Hybrid', 'Other']
  },
  vehicle_class: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  manufacturer: {
    type: String,
    required: true
  },
  registration_date: {
    type: Date,
    required: true
  },
  expiry_date: {
    type: Date,
    required: true
  },
  tax_up_to: {
    type: Date,
    required: true
  }
}, {
  timestamps: true
});

const VehicleRegistration = mongoose.model('VehicleRegistration', vehicleRegistrationSchema);

module.exports = VehicleRegistration;

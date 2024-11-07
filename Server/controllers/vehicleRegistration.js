const VehicleRegistration = require('../models/vehicleRegistration');

const submitVehicleRegistration = async (req, res) => {
  try {
    const {
      reg_number,
      chasis_number,
      name,
      swd,
      address,
      fuel_type,
      vehicle_class,
      model,
      manufacturer,
      registration_date,
      expiry_date,
      tax_up_to
    } = req.body;

    const newRegistration = new VehicleRegistration({
      reg_number,
      chasis_number,
      name,
      swd,
      address,
      fuel_type,
      vehicle_class,
      model,
      manufacturer,
      registration_date,
      expiry_date,
      tax_up_to
    });

    await newRegistration.save();

    res.status(201).json({
      message: 'Vehicle registration submitted successfully',
      data: newRegistration
    });
  } catch (error) {
    console.error('Error submitting vehicle registration:', error);
    res.status(500).json({
      message: 'Failed to submit vehicle registration',
      error: error.message
    });
  }
};

module.exports = { submitVehicleRegistration };

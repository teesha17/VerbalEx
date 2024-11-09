const express = require('express');
const router = express.Router();
const Vehicle = require('../models/vehicle'); 
const PanCard = require('../models/pancard')
const verifyUserToken = require("../middleware/userToken")

router.post('/vehicles', async (req, res) => {
  try {
    const newVehicle = new Vehicle({
      reg_number: req.body.reg_number,
      chasis_number: req.body.chasis_number,
      name: req.body.name,
      swd: req.body.swd,
      address: req.body.address,
      fuel_type: req.body.fuel_type,
      vehicle_class: req.body.vehicle_class,
      model: req.body.model,
      manufacturer: req.body.manufacturer,
      registration_date: req.body.registration_date,
      expiry_date: req.body.expiry_date,
      tax_up_to: req.body.tax_up_to
    });

    const savedVehicle = await newVehicle.save();
    res.status(201).json(savedVehicle);
  } catch (error) {
    console.error('Error saving vehicle:', error);
    res.status(500).json({ error: 'Failed to save vehicle details.' });
  }
});

router.post('/addpan', verifyUserToken, async (req, res) => {
  try {
    const user = req.userId; // `userId` should be available here
    console.log(user); // Check if userId is being logged
    const { panNumber, fullName, parentsName, dateOfBirth } = req.body;

    // Create and save the PAN card
    const newPanCard = new PanCard({
      user,
      panNumber,
      fullName,
      parentsName,
      dateOfBirth,
    });

    await newPanCard.save();
    res.status(201).json({ message: 'PAN card added successfully', panCard: newPanCard });
  } catch (error) {
    console.error(error);
    // Handle duplicate PAN number error
    if (error.code === 11000) {
      return res.status(400).json({ message: 'PAN number already exists' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});



module.exports = router;

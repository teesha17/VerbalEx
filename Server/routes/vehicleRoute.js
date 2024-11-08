const express = require('express');
const router = express.Router();
const Vehicle = require('../models/vehicle'); 
const PanCard = require('../models/pancard')

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

router.post("/addpan", async (req, res) => {
  try {
    const panData = new PanCard({
      fullName: req.body.fullName,
      parentsName: req.body.parentsName,
      dateOfBirth: req.body.dateOfBirth,  
      panNumber: req.body.panNumber
    });

    console.log(panData);

    await panData.save();
    res.status(201).json({ message: "PAN card saved successfully" });
  } catch (error) {
    console.error("Error saving PAN card:", error);  
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
});


module.exports = router;

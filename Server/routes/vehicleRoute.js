const express = require('express');
const router = express.Router();
const Vehicle = require('../models/vehicle'); 
const PanCard = require('../models/pancard')
const frontAadhaar = require('../models/FrontAdhar')
const Passport = require('../models/Passport')
const verifyUserToken = require("../middleware/userToken");


router.post('/vehicles', verifyUserToken, async (req, res) => {
  try { 
    const user = req.userId;
    const reg_number = req.body.reg_number;
    const existing = await Vehicle.findOne({reg_number})
    if(existing){
      return res.status(400).json({ message: "vehicle already exists" });
    }
    const newVehicle = new Vehicle({
      user: user,
      reg_number: reg_number,
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
    const user = req.userId;
    console.log(user); 
    const existing = await PanCard.findOne({user});
    if(existing){
      return res.status(400).json({ message: "pancard already exists" });
    }
    const { panNumber, fullName, parentsName, dateOfBirth } = req.body;
    const existingPan = await PanCard.findOne({panNumber});
    if(existingPan){
      return res.status(400).json({ message: "pan number already exists" });
    }
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
    if (error.code === 11000) {
      return res.status(400).json({ message: 'PAN number already exists' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});


router.post('/frontaadhaar',verifyUserToken, async (req, res) => {
  try {
    const user = req.userId;
    console.log(user);
    const { full_name, dob, gender, aadhaar_number } = req.body;
    const existing = await frontAadhaar.findOne({user});
    if(existing){
      return res.status(400).json({ message: "Aadhaar already exists" });
    }
    const existingAadhaar = await frontAadhaar.findOne({ aadhaar_number });
    if (existingAadhaar) {
      return res.status(400).json({ message: "Aadhaar number already exists" });
    }
    const newAadhaar = new frontAadhaar({
      user,
      full_name,
      dob,
      gender,
      aadhaar_number,
    });
    await newAadhaar.save();
    res.status(201).json({ message: 'Aadhaar created successfully', data: newAadhaar });
  } catch (error) {
    console.error("Error creating Aadhaar: ", error);
    res.status(500).json({ message: 'Server error', error });
  }
});

router.get('/getaadhaar',verifyUserToken, async (req, res) => {
  try {
    const user = req.userId;
    const customHeader = req.headers['access-token'];
    if (!customHeader) {
      res.status(500).send('Headers not provided!');
    }
    if (customHeader === process.env.accessToken) {
      const adhaar = await frontAadhaar.find({user});
      res.status(200).json(adhaar);
    } else {
      res.status(500).send('Invalid Header value!');
    }
  } catch (error) {
    console.log('Error fetching adhaar:', error);
    res.status(500).send('Server error');
  }
})
router.get('/getpassport',verifyUserToken, async (req, res) => {
  try {
    const user = req.userId;
    const customHeader = req.headers['access-token'];
    if (!customHeader) {
      res.status(500).send('Headers not provided!');
    }
    if (customHeader === process.env.accessToken) {
      const passport = await Passport.find({user});
      res.status(200).json(passport);
    } else {
      res.status(500).send('Invalid Header value!');
    }
  } catch (error) {
    console.log('Error fetching passport:', error);
    res.status(500).send('Server error');
  }
})

router.get('/getpan',verifyUserToken, async (req, res) => {
  try {
    const user = req.userId;
    const customHeader = req.headers['access-token'];
    if (!customHeader) {
      res.status(500).send('Headers not provided!');
    }
    if (customHeader === process.env.accessToken) {
      const pancard = await PanCard.find({user});
      res.status(200).json(pancard);
    } else {
      res.status(500).send('Invalid Header value!');
    }
  } catch (error) {
    console.log('Error fetching pancard:', error);
    res.status(500).send('Server error');
  }
})

router.get('/getvehicle',verifyUserToken, async (req, res) => {
  try {
    const user = req.userId;
    const customHeader = req.headers['access-token'];
    if (!customHeader) {
      res.status(500).send('Headers not provided!');
    }
    if (customHeader === process.env.accessToken) {
      const vehicle = await Vehicle.find({user});
      res.status(200).json(vehicle);
    } else {
      res.status(500).send('Invalid Header value!');
    }
  } catch (error) {
    console.log('Error fetching vehicle:', error);
    res.status(500).send('Server error');
  }
})

router.post('/passport',verifyUserToken, async (req, res) => {
  try {
    const user = req.userId;
    console.log(user);
    const { name, surname, passportNumber, gender, placeOfBirth, dateOfBirth,placeOfIssue, dateOfIssue,expiryDate } = req.body;
    const existing = await Passport.findOne({user});
    if(existing){
      return res.status(400).json({ message: "Passport already exists" });
    }
    const existingPassport = await Passport.findOne({ passportNumber });
    if (existingPassport) {
      return res.status(400).json({ message: "Passport number already exists" });
    }
    const newPassport = new Passport({
      user, name, surname, passportNumber, gender, placeOfBirth, dateOfBirth, placeOfIssue, dateOfIssue, expiryDate
    });
    await newPassport.save();
    res.status(201).json({ message: 'Passport created successfully', data: newPassport });
  } catch (error) {
    console.error("Error creating Passport: ", error);
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;

const express = require("express");
const multer = require("multer");
const Upload = require('../controllers/uploadConroller');
const { submitVehicleRegistration } = require('../controllers/vehicleRegistration.js');
const { addAadhar, uploadFile } = require('../controllers/aadharController.js');

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/vehicleRegistrationExtract", upload.single("file"), Upload);
router.post('/vehicleRegistrationUpload', submitVehicleRegistration);
router.post("/uploadAadhar", upload.single("aadharCard"), uploadFile);
router.post('/aadharDetails',addAadhar);

module.exports = router;

const mongoose = require("mongoose");
const Aadhar = require("../models/aadhar.js");
const sharp = require("sharp");
const Tesseract = require("tesseract.js");
const path = require("path");
const extractAadhaarDetails = require("../utils/extractCardDetails.js");
const uploadDir = path.join(__dirname, "../uploads");

const uploadFile = async (req, res) => {
  const imagePath = path.join(uploadDir, req.file.filename);
  console.log("Image Path:", imagePath);

  try {
    const processedImageBuffer = await sharp(imagePath)
      .grayscale()
      .normalize()
      .toBuffer();
    // console.log("Processed Image Buffer:", processedImageBuffer);

    Tesseract.recognize(processedImageBuffer, "eng")
  .then(async ({ data: { text } }) => {
    console.log("Extracted Text:", text);
    if (!text.trim()) {
      return res.status(500).send({ success: false, message: "No text extracted from image" });
    }
    const details = await extractAadhaarDetails(text);
    console.log("Extracted Details:", details); 
    return res.status(201).send({ success: true, details, status_code: 201 });
  })
  .catch((error) => {
    console.error("OCR Failed:", error);
    return res.status(500).send({ success: false, message: "OCR Failed", error: error.message });
  });
  } catch (error) {

    return res.status(500).send({ success: false, message: "Image Processing Failed", error: error.message });
  }
};

const addAadhar = async (req, res) => {
  const { name, dob, gender, aadharNumber, vid } = req.body;

  const aadhar = new Aadhar({
    name,
    dob,
    gender,
    aadharNumber,
    vid,
  });

  try {
    const savedUser = await aadhar.save();
    console.log("User added successfully:", savedUser);
    res.status(201).send({ success: true, user: savedUser });
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).send({
      success: false,
      message: "Failed to add user to the database",
      error,
    });
  }
};

module.exports = { uploadFile, addAadhar };
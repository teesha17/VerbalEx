import React, { useState } from "react";
import Tesseract from "tesseract.js";
import "./FileUpload.css";  // Import the CSS file

const OCRApp = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [extractedDetails, setExtractedDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [saveStatus, setSaveStatus] = useState(null); // Track the save status

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setExtractedDetails({});
      setSaveStatus(null); // Reset save status when a new image is uploaded
    }
  };

  const extractText = () => {
    if (!selectedImage) return;

    setLoading(true);
    setProgress(0);

    Tesseract.recognize(
      selectedImage,
      "eng",
      {
        logger: (m) => {
          if (m.status === "recognizing text") {
            setProgress(m.progress * 100);
          }
        },
      }
    )
      .then(({ data: { text } }) => {
        const details = parseDetails(text);
        setExtractedDetails(details);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  };

  const parseDetails = (text) => {
    return {
      reg_number: text.match(/(?=.*\d)[A-Z0-9]{10}/)?.[0] || null,
      chasis_number: text.match(/[A-Z0-9]{17,18}/)?.[0] || null,
      name: text.match(/NAME\s*:?\s*([A-Z]+\s[A-Z]+)/)?.[1] || null,
      swd: text.match(/S\/W\/D\s*:?\s*([A-Z]+)\s/)?.[1] || null,
      address: text.match(/Address:?\s*((?:.|\n)*?\d{6})/i)?.[1] || null,
      fuel_type: text.match(/Fuel(?:\s+Type)?\s*[\s:\.]\s*([A-Z/]+)\s/i)?.[1] || null,
      vehicle_class: text.match(/(?:VHE.c.e\sClass|VHE\sCl)\s*[\s:]\s*([A-Z0-9/()-]+)\s([A-Z0-9/()-]+)/i)?.[0] || null,
      model: text.match(/Mode.\s*[\s:]\s*([A-Z0-9/+()-.]+(?:\s+[^\w\n]*[A-Z0-9/+()-.]+){0,3})\s/i)?.[1] || null,
      manufacturer: text.match(/MFR\s*:\s*([A-Z\s]+)/i)?.[1] || null,
      registration_date: text.match(/\b(\d{1,2}[/\-.](?:\d{2}|\d{4}|\w{3})[/\-.]\d{2,4})\b/g)?.[0] || null,
      expiry_date: text.match(/\b(\d{1,2}[/\-.](?:\d{2}|\d{4}|\w{3})[/\-.]\d{2,4})\b/g)?.[0] || null,
      tax_up_to: text.match(/Tax\sUp\s{0,1}to\s*:\s*([A-Z]+)\s/i)?.[1] || null
    };
  };

  const sendDetailsToBackend = async (details) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch("http://localhost:3000/api/vehicles", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'access-token': 'tcZALrHkfh0fSe5WQkCuTtHGJbvn4VI1',
          'userauthorize': token,
        },
        body: JSON.stringify(details),
      });

      if (response.ok) {
        setSaveStatus("Details saved successfully!");
      } else {
        setSaveStatus("Failed to save details. Please try again.");
      }
    } catch (error) {
      console.error("Error saving to backend:", error);
      setSaveStatus("An error occurred while saving the details.");
    }
  };

  return (
    <div className="ocr-container">
      <h1 className="ocr-header">Image to Text Extractor</h1>
      
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleImageUpload} 
        className="ocr-file-input" 
      />
      
      {selectedImage && (
        <div>
          <img
            src={selectedImage}
            alt="Selected"
            className="ocr-selected-image"
          />
          <button onClick={extractText} className="ocr-button">
            Extract Text
          </button>
        </div>
      )}

      {loading && (
        <div className="ocr-loading">
          <p>Extracting text... {progress.toFixed(2)}%</p>
          <progress value={progress} max="100" className="ocr-progress" />
        </div>
      )}

      {Object.keys(extractedDetails).length > 0 && (
        <div className="ocr-details">
          <h2>Extracted Details</h2>
          <ul>
            <li><strong>Registration Number:</strong> {extractedDetails.reg_number}</li>
            <li><strong>Chasis Number:</strong> {extractedDetails.chasis_number}</li>
            <li><strong>Full Name:</strong> {extractedDetails.name}</li>
            <li><strong>S/W/D of:</strong> {extractedDetails.swd}</li>
            <li><strong>Address:</strong> {extractedDetails.address}</li>
            <li><strong>Fuel Type:</strong> {extractedDetails.fuel_type}</li>
            <li><strong>Vehicle Class:</strong> {extractedDetails.vehicle_class}</li>
            <li><strong>Vehicle Model:</strong> {extractedDetails.model}</li>
            <li><strong>Manufacturer:</strong> {extractedDetails.manufacturer}</li>
            <li><strong>Registration Date:</strong> {extractedDetails.registration_date}</li>
            <li><strong>Expiry Date:</strong> {extractedDetails.expiry_date}</li>
            <li><strong>Tax Upto:</strong> {extractedDetails.tax_up_to}</li>
          </ul>
          <button
  onClick={() => sendDetailsToBackend(extractedDetails)} 
  className="ocr-button"
>send details to backend</button>
        </div>
      )}

      {saveStatus && (
        <p className={`ocr-save-status ${saveStatus.includes("success") ? "success" : "error"}`}>
          {saveStatus}
        </p>
      )}
    </div>
  );
};

export default OCRApp;

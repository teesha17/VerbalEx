import React, { useState } from "react";
import Tesseract from "tesseract.js";
import "./FileUpload.css";  

const OCRApp = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [extractedDetails, setExtractedDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [saveStatus, setSaveStatus] = useState(null); 

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setExtractedDetails({});
      setSaveStatus(null); 
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
      reg_number: text.match(/(?=.*\d)[A-Z0-9]{10}/)?.[0] || "",
      chasis_number: text.match(/[A-Z0-9]{17,18}/)?.[0] || "",
      name: text.match(/NAME\s*:?\s*([A-Z]+\s[A-Z]+)/)?.[1] || "",
      swd: text.match(/S\/W\/D\s*:?\s*([A-Z]+)\s/)?.[1] || "",
      address: text.match(/Address:?\s*((?:.|\n)*?\d{6})/i)?.[1] || "",
      fuel_type: text.match(/Fuel(?:\s+Type)?\s*[\s:\.]\s*([A-Z/]+)\s/i)?.[1] || "",
      vehicle_class: text.match(/(?:VHE.c.e\sClass|VHE\sCl)\s*[\s:]\s*([A-Z0-9/()-]+)\s([A-Z0-9/()-]+)/i)?.[0] || "",
      model: text.match(/Mode.\s*[\s:]\s*([A-Z0-9/+()-.]+(?:\s+[^\w\n]*[A-Z0-9/+()-.]+){0,3})\s/i)?.[1] || "",
      manufacturer: text.match(/MFR\s*:\s*([A-Z\s]+)/i)?.[1] || "",
      registration_date: text.match(/\b(\d{1,2}[/\-.](?:\d{2}|\d{4}|\w{3})[/\-.]\d{2,4})\b/g)?.[0] || "",
      expiry_date: text.match(/\b(\d{1,2}[/\-.](?:\d{2}|\d{4}|\w{3})[/\-.]\d{2,4})\b/g)?.[0] || "",
      tax_up_to: text.match(/Tax\sUp\s{0,1}to\s*:\s*([A-Z]+)\s/i)?.[1] || "",
    };
  };

  const sendDetailsToBackend = async (details) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/api/vehicles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "access-token": "tcZALrHkfh0fSe5WQkCuTtHGJbvn4VI1",
          "userauthorize": token,
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExtractedDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  return (
    <div className="ocr-container">
      <h1 className="ocr-header">Vehicle Registration Certificate</h1>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="ocr-file-input"
      />

      {selectedImage && (
        <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
          <img src={selectedImage} alt="Selected" className="ocr-selected-image" />
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
            <li>
              <strong>Registration Number:</strong>
              <input
                type="text"
                name="reg_number"
                value={extractedDetails.reg_number}
                onChange={handleInputChange}
              />
            </li>
            <li>
              <strong>Chasis Number:</strong>
              <input
                type="text"
                name="chasis_number"
                value={extractedDetails.chasis_number}
                onChange={handleInputChange}
              />
            </li>
            <li>
              <strong>Full Name:</strong>
              <input
                type="text"
                name="name"
                value={extractedDetails.name}
                onChange={handleInputChange}
              />
            </li>
            <li>
              <strong>S/W/D of:</strong>
              <input
                type="text"
                name="swd"
                value={extractedDetails.swd}
                onChange={handleInputChange}
              />
            </li>
            <li>
              <strong>Address:</strong>
              <input
                type="text"
                name="address"
                value={extractedDetails.address}
                onChange={handleInputChange}
              />
            </li>
            <li>
              <strong>Fuel Type:</strong>
              <input
                type="text"
                name="fuel_type"
                value={extractedDetails.fuel_type}
                onChange={handleInputChange}
              />
            </li>
            <li>
              <strong>Vehicle Class:</strong>
              <input
                type="text"
                name="vehicle_class"
                value={extractedDetails.vehicle_class}
                onChange={handleInputChange}
              />
            </li>
            <li>
              <strong>Vehicle Model:</strong>
              <input
                type="text"
                name="model"
                value={extractedDetails.model}
                onChange={handleInputChange}
              />
            </li>
            <li>
              <strong>Manufacturer:</strong>
              <input
                type="text"
                name="manufacturer"
                value={extractedDetails.manufacturer}
                onChange={handleInputChange}
              />
            </li>
            <li>
              <strong>Registration Date:</strong>
              <input
                type="text"
                name="registration_date"
                value={extractedDetails.registration_date}
                onChange={handleInputChange}
              />
            </li>
            <li>
              <strong>Expiry Date:</strong>
              <input
                type="text"
                name="expiry_date"
                value={extractedDetails.expiry_date}
                onChange={handleInputChange}
              />
            </li>
            <li>
              <strong>Tax Upto:</strong>
              <input
                type="text"
                name="tax_up_to"
                value={extractedDetails.tax_up_to}
                onChange={handleInputChange}
              />
            </li>
          </ul>

          <button onClick={() => sendDetailsToBackend(extractedDetails)} className="ocr-button">
            Send Details to Backend
          </button>
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

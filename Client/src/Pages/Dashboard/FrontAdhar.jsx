import React, { useState } from "react";
import Tesseract from "tesseract.js";
import axios from "axios";
import './AadhaarExtractor.css';


const AadhaarExtractor = () => {
  const [image, setImage] = useState(null);
  const [extractedData, setExtractedData] = useState({});
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleProcessImage = async () => {
    if (!image) {
      alert("Please upload an Aadhaar card image first.");
      return;
    }
    setLoading(true);

    try {
      const { data: { text } } = await Tesseract.recognize(image, "eng", {
        logger: (m) => console.log(m),
      });

      const fullName = extractFullName(text);
      const dob = extractDOB(text);
      const gender = extractGender(text);
      const aadhaarNumber = extractAadhaarNumber(text);

      setExtractedData({
        full_name: fullName,
        dob,
        gender,
        aadhaar_number: aadhaarNumber,
      });
    } catch (error) {
      console.error("Error extracting data:", error);
    } finally {
      setLoading(false);
    }
  };

  const extractFullName = (text) => {
    const match = text.match(/\b[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*\b/);
    return match ? match[0] : "";
  };

  const extractDOB = (text) => {
    const match = text.match(/\b\d{2}\/\d{2}\/\d{4}\b/);
    return match ? match[0] : "";
  };

  const extractGender = (text) => {
    if (/Female/i.test(text)) return "Female";
    if (/Male/i.test(text)) return "Male";
    return "Male";
  };

  const extractAadhaarNumber = (text) => {
    const match = text.match(/\b\d{4}\s?\d{4}\s?\d{4}\b/);
    return match ? match[0].replace(/\s+/g, "") : "";
  };

  const token = localStorage.getItem('token');

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/frontaadhaar",
        extractedData,
        {
          headers: {
            'Content-Type': 'application/json',
            'access-token': 'tcZALrHkfh0fSe5WQkCuTtHGJbvn4VI1',
            'userauthorize': token,
          },
        }
      );
      alert(response.data.message);
      window.location.href = "/";
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Failed to submit data");
    }
  };

  return (
    <div className="aadhaar-container">
      <h1 className="header">Aadhaar Card Details Extractor</h1>
      <input type="file" accept="image/*" onChange={handleImageUpload} className="file-input" />
      {image && <img src={image} alt="Uploaded Aadhaar" className="uploaded-image" />}
      <button onClick={handleProcessImage} disabled={loading} className="action-btn">

        {loading ? "Processing..." : "Extract Details"}
      </button>

      {extractedData.full_name && (
        <div className="details-container">
          <h3>Extracted Details:</h3>

          <p><strong>Full Name:</strong> {extractedData.full_name}</p>
          <p><strong>Date of Birth:</strong> {extractedData.dob}</p>
          <p><strong>Gender:</strong> {extractedData.gender}</p>
          <p><strong>Aadhaar Number:</strong> {extractedData.aadhaar_number}</p>
          <button onClick={handleSubmit} className="submit-btn">Submit to Backend</button>
        </div>
      )}
    </div>
  );
};

export default AadhaarExtractor;

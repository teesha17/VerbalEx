import React, { useState } from 'react';
import axios from 'axios';
import './Passport.css'; 

const Passport = () => {
  const [image, setImage] = useState(null);
  const [imageurl, setImageUrl] = useState(null);
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleImageUpload = (event) => {
    setImage(event.target.files[0]);
    setImageUrl(URL.createObjectURL(event.target.files[0]));
    setDetails(null);
  };
  const extractDetails = async () => {
    if (!image) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('image', image);
    try {
      const response = await axios.post("http://127.0.0.1:5000/extract-passport-details", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setDetails(response.data);
    } catch (error) {
      console.error("Error extracting details:", error);
    } finally {
      setLoading(false);
    }
  };
  const saveToDatabase = async () => {
    try {
      console.log(details);
      const token = localStorage.getItem('token');
      const response = await axios.post("http://localhost:3000/api/passport",
        {
          name: details.Name,
          surname: details.Surname,
          passportNumber: details['Passport Number'],
          gender: details.Gender,
          placeOfBirth: details['Place of Birth'],
          dateOfBirth: details['Date of Birth'],
          placeOfIssue: details['Place of Issue'],
          dateOfIssue: details['Date of Issue'],
          expiryDate: details['Expiry Date'],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'access-token': 'tcZALrHkfh0fSe5WQkCuTtHGJbvn4VI1',
            'userauthorize': token,
          },
        }
      );
      alert(response.data.message);
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Failed to submit data");
    }
  };
  return (
    <div className="passport-container">
      <h2 className="header">Passport OCR Extraction</h2>
      <input type="file" accept="image/*" onChange={handleImageUpload} className="file-input" />
      {image && (
        <div className="image-preview">
          <img src={imageurl} alt="Uploaded Passport" className="uploaded-image" />
          <button onClick={extractDetails} className="action-btn">Extract Details</button>
        </div>
      )}
      {loading && <p className="loading-text">Extracting details, please wait...</p>}
      {details && (
        <div className="details-container">
          <h3>Extracted Passport Details:</h3>
          <p><strong>Name:</strong> {details.Name}</p>
          <p><strong>Surname:</strong> {details.Surname}</p>
          <p><strong>Passport Number:</strong> {details['Passport Number']}</p>
          <p><strong>Gender:</strong> {details.Gender}</p>
          <p><strong>Place of Birth:</strong> {details['Place of Birth']}</p>
          <p><strong>Date of Birth:</strong> {details['Date of Birth']}</p>
          <p><strong>Place of Issue:</strong> {details['Place of Issue']}</p>
          <p><strong>Date of Issue:</strong> {details['Date of Issue']}</p>
          <p><strong>Expiry Date:</strong> {details['Expiry Date']}</p>
          <button onClick={saveToDatabase} className="submit-btn">Save to Database</button>
        </div>
      )}
    </div>
  );
};

export default Passport;


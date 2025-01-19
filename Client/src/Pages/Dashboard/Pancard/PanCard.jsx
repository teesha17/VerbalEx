import React, { useState } from 'react';
import Tesseract from 'tesseract.js';
import './PanCard.css';

const PanCard = () => {
  const [image, setImage] = useState(null);
  const [details, setDetails] = useState({
    fullName: '',
    parentsName: '',
    dateOfBirth: '',
    panNumber: ''
  });
  const [uploadStatus, setUploadStatus] = useState('');

  const handleImageUpload = (event) => {
    setImage(URL.createObjectURL(event.target.files[0]));
  };

  const extractDetails = (text) => {
    const nameRegex = /\n[A-Z\s]+\b/g;
    const dobRegex = /\b(\d{2}[/\-.]\d{2}[/\-.](?:\d{4}|\d{2}))\b/;
    const panRegex = /[A-Z]{5}[0-9]{4}[A-Z]/;

    const names = text.match(nameRegex) || [];
    const dobMatch = text.match(dobRegex);
    const panMatch = text.match(panRegex);

    setDetails({
      fullName: names[0].trim() || '',
      parentsName: names[1].trim() || '',
      dateOfBirth: dobMatch ? dobMatch[0] : '',
      panNumber: panMatch ? panMatch[0] : ''
    });
  };

  const handleExtractText = () => {
    if (!image) return;

    Tesseract.recognize(
      image,
      'eng',
      { logger: (m) => console.log(m) }
    ).then(({ data: { text } }) => {
      extractDetails(text);
    });
  };
  const token = localStorage.getItem('token');
  console.log(token)

  const uploadData = async () => {
    try {
      const response = await fetch('https://verbalex.onrender.com/api/addpan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'access-token': 'tcZALrHkfh0fSe5WQkCuTtHGJbvn4VI1',
          'userauthorize': token,
        },
        body: JSON.stringify(details)
      });
      console.log(response);
      console.log(details);
      if (response.ok) {
        setUploadStatus('PAN details uploaded successfully!');
      } else {
        setUploadStatus('Failed to upload PAN details.');
      }
    } catch (error) {
      console.error('Error uploading PAN details:', error);
      setUploadStatus('An error occurred while uploading.');
    }
  };

  return (
    <div className="pan-card-container">
      <h1 className="pan-card-header">PAN Card Data Extraction</h1>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="pan-card-upload-input"
      />

      {image && (
        <div className="pan-card-image-container">
          <img
            src={image}
            alt="PAN Card"
            className="pan-card-image"
          />
          <button
            onClick={handleExtractText}
            className="pan-card-button"
          >
            Extract PAN Details
          </button>
        </div>
      )}

      {details.fullName && (
        <div className="pan-card-details">
          <h3 className="pan-card-details-header">Extracted Details:</h3>
          <p><strong>Full Name:</strong> {details.fullName}</p>
          <p><strong>Parent's Name:</strong> {details.parentsName}</p>
          <p><strong>Date of Birth:</strong> {details.dateOfBirth}</p>
          <p><strong>PAN Number:</strong> {details.panNumber}</p>
          <button
            onClick={uploadData}
            className="pan-card-button"
          >
            Upload PAN Details
          </button>
          {uploadStatus && (
            <p className={`pan-card-status ${uploadStatus.includes('success') ? 'success' : 'error'}`}>
              {uploadStatus}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default PanCard;

import React, { useState } from 'react';
import Tesseract from 'tesseract.js';

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
      fullName: names[0] || '',
      parentsName: names[1] || '',
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

  const uploadData = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/addpan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(details)
      });

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
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>PAN Card Data Extraction</h1>

      <input type="file" accept="image/*" onChange={handleImageUpload} />

      {image && (
        <div style={{ marginTop: '20px' }}>
          <img src={image} alt="PAN Card" style={{ width: '300px', height: 'auto' }} />
          <button onClick={handleExtractText} style={{ marginTop: '20px' }}>
            Extract PAN Details
          </button>
        </div>
      )}

      {details.fullName && (
        <div style={{ marginTop: '20px', textAlign: 'left' }}>
          <h3>Extracted Details:</h3>
          <p><strong>Full Name:</strong> {details.fullName}</p>
          <p><strong>Parent's Name:</strong> {details.parentsName}</p>
          <p><strong>Date of Birth:</strong> {details.dateOfBirth}</p>
          <p><strong>PAN Number:</strong> {details.panNumber}</p>
          <button onClick={uploadData} style={{ marginTop: '20px' }}>
            Upload PAN Details
          </button>
          {uploadStatus && <p>{uploadStatus}</p>}
        </div>
      )}
    </div>
  );
};

export default PanCard;

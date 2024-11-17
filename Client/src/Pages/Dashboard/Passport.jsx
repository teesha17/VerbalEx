// import React, { useState } from 'react';
// import Tesseract from 'tesseract.js';

// const Passport = () => {
//   const [image, setImage] = useState(null);
//   const [details, setDetails] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleImageUpload = (event) => {
//     setImage(URL.createObjectURL(event.target.files[0]));
//     setDetails(null);
//   };

//   const preprocessText = (text) => {
//     const extract = {
//       name: (text.match(/Names[\s:]+([A-Za-z\s]+)/) || []) || "",
//       surname: (text.match(/Surname[\s:]*([A-Z]+)/i) || [])[1] || "",
//       passportNumber: (text.match(/[A-Z]\d{7}/) || [])[0] || "",
//       gender: (text.match(/Sex[\s:]*([MF])/i) || [])[1] || "",
//       pob: (text.match(/Place of Birth[\s:]*([A-Z\s,]+)/i) || [])[1] || "",
//       poi: (text.match(/Place of Issue[\s:]*([A-Z\s,]+)/i) || [])[1] || "",
//       dates: [...new Set(text.match(/\b(\d{2}\/\d{2}\/\d{4})\b/g) || [])],
//     };
//     const dob = extract.dates[0] || "";
//     const doi = extract.dates[1] || "";
//     const expiryDate = extract.dates[2] || "";
//     const normalizedGender =
//       extract.gender.toUpperCase() === "M"
//         ? "Male"
//         : extract.gender.toUpperCase() === "F"
//         ? "Female"
//         : extract.gender;

//     return {
//       Name: extract.name,
//       Surname: extract.surname,
//       "Passport Number": extract.passportNumber,
//       Gender: normalizedGender,
//       "Place of Birth": extract.pob,
//       "Date of Birth": dob,
//       "Place of Issue": extract.poi,
//       "Date of Issue": doi,
//       "Expiry Date": expiryDate,
//     };
//   };

//   const extractDetails = () => {
//     if (!image) return;
//     setLoading(true);

//     Tesseract.recognize(image, 'eng', { logger: (m) => console.log(m) })
//       .then(({ data: { text } }) => {
//         const passportDetails = preprocessText(text);
//         setDetails(passportDetails);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("OCR error:", error);
//         setLoading(false);
//       });
//   };

//   return (
//     <div style={{ padding: '20px', maxWidth: '500px', margin: 'auto', textAlign: 'center' }}>
//       <h2>Passport OCR Extraction</h2>
//       <input type="file" accept="image/*" onChange={handleImageUpload} />
//       {image && (
//         <div style={{ marginTop: '20px' }}>
//           <img src={image} alt="Passport" style={{ maxWidth: '100%', height: 'auto' }} />
//           <button onClick={extractDetails} style={{ marginTop: '10px' }}>Extract Details</button>
//         </div>
//       )}
//       {loading && <p>Extracting details, please wait...</p>}
//       {details && (
//         <div style={{ marginTop: '20px', textAlign: 'left' }}>
//           <h3>Extracted Passport Details:</h3>
//           <p><strong>Name:</strong> {details.Name}</p>
//           <p><strong>Surname:</strong> {details.Surname}</p>
//           <p><strong>Passport Number:</strong> {details['Passport Number']}</p>
//           <p><strong>Gender:</strong> {details.Gender}</p>
//           <p><strong>Place of Birth:</strong> {details['Place of Birth']}</p>
//           <p><strong>Date of Birth:</strong> {details['Date of Birth']}</p>
//           <p><strong>Place of Issue:</strong> {details['Place of Issue']}</p>
//           <p><strong>Date of Issue:</strong> {details['Date of Issue']}</p>
//           <p><strong>Expiry Date:</strong> {details['Expiry Date']}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Passport;





// import React, { useState } from 'react';
// import axios from 'axios';

// const Passport = () => {
//   const [image, setImage] = useState(null);
//   const [imageurl, setImageUrl] = useState(null);
//   const [details, setDetails] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleImageUpload = (event) => {
//     setImage(event.target.files[0]);
//     setImageUrl(URL.createObjectURL(event.target.files[0]))
//     setDetails(null);
//   };

//   const extractDetails = async () => {
//     if (!image) return;
//     setLoading(true);

//     const formData = new FormData();
//     formData.append('image', image);

//     try {
//       const response = await axios.post("http://127.0.0.1:5000/extract-passport-details", formData, {
//         headers: { "Content-Type": "multipart/form-data" }
//       });
//       setDetails(response.data);
//     } catch (error) {
//       console.error("Error extracting details:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ padding: '20px', maxWidth: '500px', margin: 'auto', textAlign: 'center' }}>
//       <h2>Passport OCR Extraction</h2>
//       <input type="file" accept="image/*" onChange={handleImageUpload} />
//       {image && ( 
//         <div style={{ marginTop: '20px' }}>
//           <img src={imageurl}/>
//           <button onClick={extractDetails}>Extract Details</button>
//         </div>
//       )}
//       {loading && <p>Extracting details, please wait...</p>}
//       {details && (
//         <div style={{ marginTop: '20px', textAlign: 'left' }}>
//           <h3>Extracted Passport Details:</h3>
//           <p><strong>Name:</strong> {details.Name}</p>
//           <p><strong>Surname:</strong> {details.Surname}</p>
//           <p><strong>Passport Number:</strong> {details['Passport Number']}</p>
//           <p><strong>Gender:</strong> {details.Gender}</p>
//           <p><strong>Place of Birth:</strong> {details['Place of Birth']}</p>
//           <p><strong>Date of Birth:</strong> {details['Date of Birth']}</p>
//           {/* Add more fields as required */}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Passport;


import React, { useState } from 'react';
import axios from 'axios';
import './Passport.css'; // Import the CSS file

const Passport = () => {
  const [image, setImage] = useState(null);
  const [imageurl, setImageUrl] = useState(null);
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle image upload
  const handleImageUpload = (event) => {
    setImage(event.target.files[0]);
    setImageUrl(URL.createObjectURL(event.target.files[0]));
    setDetails(null);
  };

  // Extract details from image using OCR API
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

  // Save extracted details to MongoDB
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


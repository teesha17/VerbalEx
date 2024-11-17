import React, { useState } from 'react';
import axios from 'axios';
import './Form.css'

const Form = () => {
  // State for form fields
  const [formData, setFormData] = useState({
    user: '',
    full_name: '',
    dob: '',
    gender: '',
    aadhaar_number: ''
  });

  // Function to handle API call and autofill form
  const handleFetchAadhaar = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/api/getaadhaar', {
        headers: {
            'Content-Type': 'application/json',
          'access-token': 'tcZALrHkfh0fSe5WQkCuTtHGJbvn4VI1',
          'userauthorize': token,
        },
      });

      // Check if response data is available
      if (response.status === 200 && response.data && response.data.length > 0) {
        const aadhaarData = response.data[0]; // Assume using first entry if multiple are returned

        // Autofill form fields with fetched data
        setFormData({
          user: aadhaarData.user || '',
          full_name: aadhaarData.full_name || '',
          dob: aadhaarData.dob || '',
          gender: aadhaarData.gender || '',
          aadhaar_number: aadhaarData.aadhaar_number || ''
        });
      } else {
        alert('No Aadhaar data found.');
      }
    } catch (error) {
      console.error('Error fetching Aadhaar data:', error);
      alert('Failed to fetch Aadhaar data.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Aadhaar Details Form</h2>
      <form className="form">
        <label className="form-label">
          User:
          <input
            type="text"
            name="user"
            value={formData.user}
            onChange={handleInputChange}
            className="form-input"
          />
        </label>
        <label className="form-label">
          Full Name:
          <input
            type="text"
            name="full_name"
            value={formData.full_name}
            onChange={handleInputChange}
            className="form-input"
          />
        </label>
        <label className="form-label">
          Date of Birth:
          <input
            type="string"
            name="dob"
            value={formData.dob}
            onChange={handleInputChange}
            className="form-input"
          />
        </label>
        <label className="form-label">
          Gender:
          <input
            type="text"
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            className="form-input"
          />
        </label>
        <label className="form-label">
          Aadhaar Number:
          <input
            type="text"
            name="aadhaar_number"
            value={formData.aadhaar_number}
            onChange={handleInputChange}
            className="form-input"
          />
        </label>
        <button
          type="button"
          onClick={handleFetchAadhaar}
          className="form-button"
        >
          Upload from Verbalex
        </button>
      </form>
    </div>
  );
};

export default Form;

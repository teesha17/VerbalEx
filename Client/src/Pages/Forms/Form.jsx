import React, { useState } from 'react';
import axios from 'axios';
import './Form.css';

const Form = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    dob: '',
    gender: '',
    aadhaar_number: '',
    passportNumber: '',
    placeOfBirth: '',
    dateOfBirth: '',
    placeOfIssue: '',
    dateOfIssue: '',
    expiryDate: '',
    panNumber: '',
    reg_number: '',
    chasis_number: '',
    swd: '',
    address: '',
    fuel_type: '',
    vehicle_class: '',
    model: '',
    manufacturer: '',
    registration_date: '',
    expiry_date: '',
    tax_up_to: '',
  });

  const token = localStorage.getItem('token');

  const handleFetchDetails = async () => {
    if (!token) {
      alert('User is not authenticated. Please log in.');
      return;
    }

    await handleFetchAadhaar();
    await handleFetchPassport();
    await handleFetchPancard();
    await handleFetchVehicle();
  };
  

  const handleFetchAadhaar = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/getaadhaar', {
        headers: {
          'Content-Type': 'application/json',
          'access-token': 'tcZALrHkfh0fSe5WQkCuTtHGJbvn4VI1',
          'userauthorize': token,
        },
      });

      if (response.status === 200 && response.data.length > 0) {
        const aadhaarData = response.data[0];
        setFormData((prevData) => ({
          ...prevData,
          full_name: aadhaarData.full_name || '',
          dob: aadhaarData.dob || '',
          gender: aadhaarData.gender || '',
          aadhaar_number: aadhaarData.aadhaar_number || '',
        }));
      } else {
        alert('No Aadhaar data found.');
      }
    } catch (error) {
      console.error('Error fetching Aadhaar data:', error);
      alert('Failed to fetch Aadhaar data.');
    }
  };

  const handleFetchPassport = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/getpassport', {
        headers: {
          'Content-Type': 'application/json',
          'access-token': 'tcZALrHkfh0fSe5WQkCuTtHGJbvn4VI1',
          'userauthorize': token,
        },
      });

      if (response.status === 200 && response.data.length > 0) {
        const passportData = response.data[0];
        setFormData((prevData) => ({
          ...prevData,
          passportNumber: passportData.passportNumber || '',
          placeOfBirth: passportData.placeOfBirth || '',
          dateOfBirth: passportData.dateOfBirth || '',
          placeOfIssue: passportData.placeOfIssue || '',
          dateOfIssue: passportData.dateOfIssue || '',
          expiryDate: passportData.expiryDate || '',
        }));
      } else {
        alert('No Passport data found.');
      }
    } catch (error) {
      console.error('Error fetching Passport data:', error);
      alert('Failed to fetch Passport data.');
    }
  };

  const handleFetchPancard = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/getpan', {
        headers: {
          'Content-Type': 'application/json',
          'access-token': 'tcZALrHkfh0fSe5WQkCuTtHGJbvn4VI1',
          'userauthorize': token,
        },
      });

      if (response.status === 200 && response.data.length > 0) {
        const pancardData = response.data[0];
        setFormData((prevData) => ({
          ...prevData,
          panNumber: pancardData.panNumber || '',
        }));
      } else {
        alert('No PAN data found.');
      }
    } catch (error) {
      console.error('Error fetching PAN data:', error);
      alert('Failed to fetch PAN data.');
    }
  };



  const handleFetchVehicle = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/getvehicle', {
        headers: {
          'Content-Type': 'application/json',
          'access-token': 'tcZALrHkfh0fSe5WQkCuTtHGJbvn4VI1',
          'userauthorize': token,
        },
      });

      if (response.status === 200 && response.data) {
        const vehicleData = response.data; 
        console.log(vehicleData)
        setFormData((prevData) => ({
          ...prevData,
          reg_number: vehicleData[0].reg_number || '',
          chasis_number: vehicleData[0].chasis_number || '',
          swd: vehicleData[0].swd || '',
          address: vehicleData[0].address || '',
          fuel_type: vehicleData[0].fuel_type || '',
          vehicle_class: vehicleData[0].vehicle_class || '',
          model: vehicleData[0].model || '',
          manufacturer: vehicleData[0].manufacturer || '',
          registration_date: vehicleData[0].registration_date || '',
          expiry_date: vehicleData[0].expiry_date || '',
          tax_up_to: vehicleData[0].tax_up_to || '',
        }));
      } else {
        alert('Failed to fetch vehicle data. Please try again.');
      }
    } catch (error) {
      console.error('Error fetching vehicle data:', error);
      alert('An error occurred while fetching vehicle data.');
    }
  };



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Example Government Form</h2>
      <button type="button" onClick={handleFetchDetails} className="form-button">
          Upload from Verbalex
        </button>
      <form className="form">
        {Object.keys(formData).map((key) => (
          <label key={key} className="form-label">
            {key.replace(/([A-Z])/g, ' $1').toUpperCase()}:
            <input
              type="text"
              name={key}
              value={formData[key]}
              onChange={handleInputChange}
              className="form-input"
            />
          </label>
        ))}
      </form>
    </div>
  );
};

export default Form;

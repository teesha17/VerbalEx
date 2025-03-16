import React, { useState } from "react";
import axios from "axios";

const BirthCertificate = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [extractedData, setExtractedData] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            alert("Please select a file first.");
            return;
        }
        
        const formData = new FormData();
        formData.append("file", selectedFile);
        setLoading(true);
        try {
            const response = await axios.post("http://127.0.0.1:5000/extract-birth-details", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setExtractedData(response.data);
        } catch (error) {
            console.error("Error extracting birth certificate details:", error);
            alert("Failed to extract details. Please try again.");
        }
        setLoading(false);
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md w-96 mx-auto">
            <h2 className="text-xl font-semibold mb-4">Extract Birth Certificate Details</h2>
            <input type="file" accept="image/*" onChange={handleFileChange} className="mb-2" />
            <button
                onClick={handleUpload}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                disabled={loading}
            >
                {loading ? "Extracting..." : "Upload & Extract"}
            </button>
            {extractedData && (
                <div className="mt-4 p-4 border rounded">
                    <h3 className="font-semibold">Extracted Details:</h3>
                    <p><strong>Name:</strong> {extractedData.name}</p>
                    <p><strong>Date of Birth:</strong> {extractedData.date_of_birth}</p>
                </div>
            )}
        </div>
    );
};

export default BirthCertificate;
import React, { useState } from 'react';
// import { uploadFile } from '../../services/api';

function HomePage() {
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      const response = await uploadFile(file);
      alert(response.success ? 'File uploaded successfully' : 'File upload failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button type="submit">Upload</button>
    </form>
  );
}

export default HomePage;

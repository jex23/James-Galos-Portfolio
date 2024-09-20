import React, { useState } from 'react';

const Upload: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file to upload');
      return;
    }

    // Here you would typically send the file to your server
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('/api/upload', { // Adjust the endpoint as needed
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('File uploaded successfully!');
        setSelectedFile(null); // Reset the file input
      } else {
        alert('File upload failed. Please try again.');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('An error occurred while uploading the file.');
    }
  };

  return (
    <div className="upload-container p-6">
      <h2 className="text-2xl font-bold mb-4">Upload File</h2>
      <input
        type="file"
        onChange={handleFileChange}
        className="mb-4"
      />
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Upload
      </button>
      {selectedFile && (
        <div className="mt-4">
          <p>Selected file: {selectedFile.name}</p>
        </div>
      )}
    </div>
  );
};

export default Upload;

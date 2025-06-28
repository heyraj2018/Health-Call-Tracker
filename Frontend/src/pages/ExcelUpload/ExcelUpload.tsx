import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';

const ExcelUpload: React.FC = () => {
  const [motorFile, setMotorFile] = useState<File | null>(null);
  const [externalFile, setExternalFile] = useState<File | null>(null);

  const handleMotorChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) setMotorFile(e.target.files[0]);
  };

  const handleExternalChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) setExternalFile(e.target.files[0]);
  };

  const uploadFile = async (file: File | null, endpoint: string) => {
    if (!file) return alert("Please select a file first.");

    const formData = new FormData();
    formData.append("excel", file);

    try {
      const res = await axios.post(`http://localhost:5000/${endpoint}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert(`Upload successful: ${res.data.message}`);
    } catch (error) {
      console.error(error);
      alert("Upload failed");
    }
  };

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold">Excel Uploads</h1>

      {/* Upload Section 1 */}
      <div className="border rounded-lg p-4 shadow-md">
        <h2 className="text-xl font-semibold mb-2">Customer DB – Motor/PA</h2>
        <input
          type="file"
          accept=".xlsx,.xls"
          onChange={handleMotorChange}
          className="mb-2"
        />
        <br />
        <button
          onClick={() => uploadFile(motorFile, 'upload-motor-pa')}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Upload Motor/PA File
        </button>
      </div>

      {/* Upload Section 2 */}
      <div className="border rounded-lg p-4 shadow-md">
        <h2 className="text-xl font-semibold mb-2">Customer DB – External</h2>
        <input
          type="file"
          accept=".xlsx,.xls"
          onChange={handleExternalChange}
          className="mb-2"
        />
        <br />
        <button
          onClick={() => uploadFile(externalFile, 'upload-external')}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Upload External File
        </button>
      </div>
    </div>
  );
};

export default ExcelUpload;

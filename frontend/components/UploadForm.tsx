"use client";
import { useState } from "react";
import axios from "axios";

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<string>("");

  const handleUpload = async () => {
    if (!file) {
      setStatus("Please select a PDF file.");
      return;
    }

    setStatus("Uploading...");
    const formData = new FormData();
    formData.append("pdf", file);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/upload_pdf`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      console.log("Upload response:", res.data);
      setStatus("✅ Upload successful!");
    } catch (error) {
      console.error("Upload failed:", error);
      setStatus("❌ Upload failed. Please try again.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
      <label className="block mb-2 font-medium text-gray-700">
        Upload a PDF Document
      </label>
      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="block w-full border border-gray-300 rounded px-3 py-2 mb-4"
      />
      <button
        onClick={handleUpload}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded"
      >
        Upload
      </button>
      {status && <p className="mt-3 text-sm text-gray-800">{status}</p>}
    </div>
  );
}

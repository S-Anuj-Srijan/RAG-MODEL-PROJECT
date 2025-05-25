"use client";
import { useState } from "react";
import axios from "axios";

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleUpload = async () => {
    if (!file) {
      setStatus("Please select a PDF file.");
      return;
    }

    setStatus("Uploading...");
    setLoading(true);

    const formData = new FormData();
    formData.append("pdf", file);

    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/upload_pdf`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setStatus(`✅ ${res.data.message}`);
    } catch (err: any) {
  if (err.response?.data?.detail) {
    setStatus(`❌ ${err.response.data.detail}`);
  } else {
    setStatus("❌ Upload failed. See console for details.");
  }
  console.error("❌ Upload error:", err);
}

  };

  return (
    <div className="min-h-[60vh] flex flex-col justify-center items-center gap-10 px-4">
  {/* Stylized Heading */}
  <h2 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 drop-shadow-md">
   Upload Your PDF
  </h2>

  {/* Glowing card with gradient ring */}
  <div className="relative">
    <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-purple-500 via-blue-500 to-indigo-600 animate-pulse blur-lg opacity-40" />
    <div className="relative w-full max-w-md bg-gray-900 bg-opacity-90 backdrop-blur-xl border border-blue-800 rounded-3xl shadow-2xl p-8 space-y-6">
      
      {/* File Upload Input */}
      <div className="w-full">
        <label htmlFor="file-upload" className="block text-sm font-medium text-blue-300 mb-2 tracking-wider">
          📎 Upload a PDF file:
        </label>

        <div className="relative group">
          <input
            id="file-upload"
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="peer absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="w-full px-4 py-3 bg-gray-800 text-white border border-blue-700 rounded-lg flex items-center justify-between group-hover:border-purple-400 transition duration-300">
            <span className="text-sm truncate opacity-90">
              {file ? file.name : "Choose a PDF file..."}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-blue-400 group-hover:text-white transition"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1M4 12l4-4m0 0l4 4m-4-4v12"
              />
            </svg>
          </div>
        </div>

        {file && (
          <p className="text-sm text-blue-200 mt-3 text-center truncate">
            📄 Selected: {file.name}
          </p>
        )}
      </div>

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        disabled={!file || loading}
        className={`w-full px-4 py-2 rounded font-semibold flex justify-center items-center gap-2 transition duration-300 shadow-lg ${
          !file || loading
            ? "bg-gray-700 cursor-not-allowed text-gray-300"
            : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-purple-600 hover:to-pink-600 text-white"
        }`}
      >
        {loading ? (
          <>
            <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            Uploading...
          </>
        ) : (
          "🚀 Upload"
        )}
      </button>

      {/* Status Message */}
      {status && (
        <p
          className={`text-sm text-center mt-2 ${
            status.startsWith("✅") ? "text-green-400" : "text-red-400"
          }`}
        >
          {status}
        </p>
      )}
    </div>
  </div>
</div>

  );
}

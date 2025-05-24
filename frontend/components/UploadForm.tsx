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
    <div className="min-h-[60vh] flex flex-col justify-center items-center gap-8 bg-blue-900">
      <h2 className="text-3xl font-bold text-center text-blue-300 opacity-100">
        📄 Upload Your PDF
      </h2>

      <div className="relative">
        <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-blue-400 to-purple-500 animate-spin-slow blur-lg" />
        <div className="relative w-full max-w-md bg-blue-800 bg-opacity-80 backdrop-blur-md border border-blue-700 rounded-3xl shadow-2xl p-8 space-y-6">
          <div className="w-full">
            <label htmlFor="file-upload" className="block text-sm font-medium text-blue-300 mb-2">
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
              <div className="w-full px-4 py-3 bg-blue-700 text-white border border-gray-600 rounded-lg flex items-center justify-between group-hover:border-blue-400 transition">
                <span className="text-sm truncate">
                  {file ? file.name : "Choose a PDF file..."}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-blue-300 group-hover:text-white transition"
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
              <p className="text-sm text-blue-200 mt-2 text-center truncate">
                📄 Selected: {file.name}
              </p>
            )}
          </div>

          <button
            onClick={handleUpload}
            disabled={!file || loading}
            className={`w-full px-4 py-2 rounded font-semibold flex justify-center items-center gap-2 transition duration-300 ${
              !file || loading
                ? "bg-gray-500 cursor-not-allowed text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {loading ? (
              <>
                <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Uploading...
              </>
            ) : (
              "Upload"
            )}
          </button>

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

"use client";
import { useState } from "react";
import axios from "axios";

const architectures = ["simple", "self_query", "reranker"];

export default function QueryForm({ setResults }: { setResults: Function }) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [queryId, setQueryId] = useState<string | null>(null);

  const handleToggle = (name: string) => {
    setSelected(prev =>
      prev.includes(name) ? prev.filter(a => a !== name) : [...prev, name]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!query || selected.length === 0) return;

  setLoading(true);

  // ✅ MOCK RESPONSE
  setTimeout(() => {
    const mockResponse = {
      queryId: "mock123",
      results: Object.fromEntries(
        selected.map((arch, i) => [
          arch,
          {
            answer: `Mock answer for ${arch}`,
            context: `Mock context for ${arch}`,
            timeTaken: 1000 + i * 100,
            pageNumber: 1 + i,
            score: 0.8 + i * 0.05,
          },
        ])
      ),
    };

    setResults(mockResponse.results);
    setQueryId(mockResponse.queryId);
    setLoading(false);
  }, 1000);
};


  return (
    <form
  onSubmit={handleSubmit}
  className="space-y-6 bg-blue-800 bg-opacity-80 backdrop-blur-md border border-blue-700 p-6 rounded-3xl shadow-xl text-white max-w-xl w-full"
>
  {/* Input Section */}
  <div>
    <label className="font-medium text-blue-300">Your question:</label>
    <input
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="e.g., What is RAG?"
      className="w-full mt-2 px-4 py-2 bg-blue-700 text-white border border-blue-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  </div>

  {/* Checkbox Section */}
  <div>
    <p className="font-medium text-blue-300">Choose RAG Architectures:</p>
    <div className="flex flex-wrap gap-4 mt-3">
      {architectures.map((arch) => (
        <label
          key={arch}
          className="flex items-center gap-2 text-sm capitalize"
        >
          <input
            type="checkbox"
            value={arch}
            checked={selected.includes(arch)}
            onChange={() => handleToggle(arch)}
            className="accent-blue-500"
          />
          <span>{arch.replace("_", " ")}</span>
        </label>
      ))}
    </div>
  </div>

  {/* Submit Button */}
  <button
    type="submit"
    disabled={loading}
    className={`w-full px-4 py-2 rounded font-semibold transition ${
      loading
        ? "bg-gray-500 cursor-not-allowed"
        : "bg-blue-600 hover:bg-blue-700"
    } text-white`}
  >
    {loading ? "Thinking..." : "Ask"}
  </button>

  {/* Result Link */}
  {queryId && (
    <a
      href={`/results/${queryId}`}
      className="text-blue-300 underline text-sm block text-center mt-2"
    >
      🔗 View/share this result
    </a>
  )}
</form>

  );
}

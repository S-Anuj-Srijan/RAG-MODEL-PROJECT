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
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/query`, {
        query,
        architectures: selected,
      });
      setResults(res.data.results);
      setQueryId(res.data.queryId);
    } catch (error) {
      alert("Query failed. Check console.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow">
      <div>
        <label className="font-medium">Your question:</label>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g., What is the summary of this document?"
          className="w-full border mt-1 px-3 py-2 rounded"
        />
      </div>
      <div>
        <p className="font-medium">Choose RAG Architectures:</p>
        <div className="flex gap-4 mt-2">
          {architectures.map((arch) => (
            <label key={arch} className="flex items-center space-x-2">
              <input
                type="checkbox"
                value={arch}
                checked={selected.includes(arch)}
                onChange={() => handleToggle(arch)}
              />
              <span className="capitalize">{arch.replace("_", " ")}</span>
            </label>
          ))}
        </div>
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Asking..." : "Ask"}
      </button>
      {queryId && (
        <a
          href={`/results/${queryId}`}
          className="text-blue-600 underline text-sm block mt-2"
        >
          🔗 View/share this result
        </a>
      )}
    </form>
  );
}

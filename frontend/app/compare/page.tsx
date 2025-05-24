"use client";
import QueryForm from "@/components/QueryForm";
import ResultCard from "@/components/ResultCard";
import { useState } from "react";

export default function ComparePage() {
  const [results, setResults] = useState<any>(null);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">🔍 Compare RAG Architectures</h1>
      <QueryForm setResults={setResults} />
      {results && (
        <div className="grid md:grid-cols-2 gap-4">
          {Object.entries(results).map(([arch, res]: [string, any]) => (
            <ResultCard key={arch} architecture={arch} result={res} />
          ))}
        </div>
      )}
    </div>
  );
}

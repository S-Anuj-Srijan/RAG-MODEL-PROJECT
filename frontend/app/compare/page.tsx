"use client";
import QueryForm from "@/components/QueryForm";
import ResultCard from "@/components/ResultCard";
import { useState } from "react";

export default function ComparePage() {
  const [results, setResults] = useState<any>(null);

  return (
    <div className="space-y-8 text-gray-900 dark:text-gray-100">
  <h1 className="text-3xl font-extrabold tracking-tight text-center text-blue-600 dark:text-blue-400 opacity-100">
    Compare RAG Architectures
  </h1>

  <div className="max-w-2xl mx-auto">
    <QueryForm setResults={setResults} />
  </div>

  {results && (
    <div className="grid md:grid-cols-2 gap-6 animate-fadeIn">
      {Object.entries(results).map(([arch, res]: [string, any]) => (
        <ResultCard key={arch} architecture={arch} result={res} />
      ))}
    </div>
  )}
</div>


  );
}

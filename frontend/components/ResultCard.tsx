import React from "react";

type ResultProps = {
  architecture: string;
  result: {
    answer: string;
    context: string;
    timeTaken: number;
    pageNumber: number;
    score: number;
  };
};

export default function ResultCard({ architecture, result }: ResultProps) {
  return (
    <div className="border border-gray-300 rounded-md p-4 bg-white shadow-sm">
      <h2 className="text-lg font-semibold text-blue-700 mb-2 capitalize">
        🧠 {architecture.replace("_", " ")} RAG
      </h2>
      <div className="mb-3">
        <p className="text-sm font-medium text-gray-800">🔍 Answer:</p>
        <p className="text-sm text-gray-700">{result.answer}</p>
      </div>
      <div className="mb-3">
        <p className="text-sm font-medium text-gray-800">📄 Context:</p>
        <p className="text-xs text-gray-600 whitespace-pre-wrap">{result.context}</p>
      </div>
      <div className="text-xs text-gray-500 mt-2">
        ⏱️ {result.timeTaken} ms | 📃 Page {result.pageNumber} | 🔢 Score: {result.score.toFixed(2)}
      </div>
    </div>
  );
}

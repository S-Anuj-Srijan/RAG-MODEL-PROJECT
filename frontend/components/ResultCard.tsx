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
  const badgeColor = {
    simple: "bg-blue-600",
    self_query: "bg-green-600",
    reranker: "bg-purple-600",
  }[architecture] || "bg-gray-600";

  return (
    <div className="border border-gray-300 rounded-xl p-5 bg-white shadow-md space-y-4">
      <span className={`${badgeColor} text-white text-xs px-3 py-1 rounded-full uppercase tracking-wider font-semibold inline-block`}>
        {architecture.replace("_", " ")} RAG
      </span>

      <div>
        <p className="text-sm font-medium text-gray-700 mb-1">🔍 Answer:</p>
        <p className="text-base text-gray-900">{result.answer}</p>
      </div>

      <div>
        <p className="text-sm font-medium text-gray-700 mb-1">📄 Context:</p>
        <p className="text-sm text-gray-600 whitespace-pre-wrap">{result.context}</p>
      </div>

      <div className="text-xs text-gray-500 flex justify-between pt-2 border-t">
        <span>⏱️ {result.timeTaken} ms</span>
        <span>📃 Page {result.pageNumber}</span>
        <span>🔢 Score: {result.score.toFixed(2)}</span>
      </div>
    </div>
  );
}

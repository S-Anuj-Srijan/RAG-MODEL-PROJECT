import ResultCard from "@/components/ResultCard";
import { notFound } from "next/navigation";



export default function ResultPage({ params }: { params: { queryId: string } }) {
  const results = {
    simple: {
      answer: "Previously saved mock answer.",
      context: "Saved context...",
      timeTaken: 987,
      pageNumber: 2,
      score: 0.92,
    },
    reranker: {
      answer: "Another saved answer from reranker.",
      context: "Reranker context...",
      timeTaken: 1132,
      pageNumber: 3,
      score: 0.89,
    },
  };

  return (
    <div className="flex flex-col items-center text-center space-y-6 px-4 py-10 sm:px-6 lg:px-8">
  <h1 className="text-2xl font-bold">📊 Saved RAG Comparison</h1>
  <p className="text-sm text-gray-600 break-all">Query ID: {params.queryId}</p>
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 justify-items-center w-full max-w-5xl">
    {Object.entries(results).map(([arch, res]: [string, any]) => (
      <ResultCard key={arch} architecture={arch} result={res} />
    ))}
  </div>
</div>

  );
}

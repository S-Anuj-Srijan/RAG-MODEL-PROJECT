import ResultCard from "@/components/ResultCard";
import { notFound } from "next/navigation";

export default async function ResultPage({ params }: { params: { queryId: string } }) {
  const { queryId } = params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/query_result/${queryId}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return notFound();
  }

  const data = await res.json();
  const results = data.results;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">📊 Saved RAG Comparison</h1>
      <p className="text-sm text-gray-600">Query ID: {queryId}</p>
      <div className="grid md:grid-cols-2 gap-4">
        {Object.entries(results).map(([arch, res]: [string, any]) => (
          <ResultCard key={arch} architecture={arch} result={res} />
        ))}
      </div>
    </div>
  );
}

import axios from "axios";

interface ResultType {
  answer: string;
  context: string;
  timeTaken: number;
  pageNumber: number;
  score: number;
}

interface ResultPageProps {
  params: { queryId: string };
}

export default async function ResultPage({ params }: ResultPageProps) {
  const { queryId } = params;

  let results: Record<string, ResultType> = {};

  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/query_result/${queryId}`
    );
    results = res.data;
  } catch (error) {
    console.error("❌ Failed to fetch query result:", error);
    return (
      <div className="text-center text-red-400">
        ❌ Failed to load result. Please check the query ID.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-blue-300 text-center">
        🧠 RAG Query Result for ID: <span className="text-white">{queryId}</span>
      </h2>

      <div className="space-y-6">
        {Object.entries(results).map(([arch, data]) => (
          <div
            key={arch}
            className="bg-gray-900 border border-blue-700 p-5 rounded-xl shadow-md"
          >
            <h3 className="text-lg font-bold text-blue-400 capitalize">
              ⚙️ {arch.replace("_", " ")} Architecture
            </h3>
            <p className="mt-3 text-green-400">
              <strong>Answer:</strong> {data.answer}
            </p>
            <pre className="mt-4 p-3 bg-gray-800 rounded text-sm whitespace-pre-wrap">
              {data.context}
            </pre>
            <p className="text-sm mt-2 text-gray-400">
              ⏱️ Time: {data.timeTaken} ms • 📄 Page: {data.pageNumber} • 💯 Score:{" "}
              {(data.score * 100).toFixed(1)}%
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

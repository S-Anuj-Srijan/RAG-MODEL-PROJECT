export default function HomePage() {
  return (
    <div className="text-center space-y-4">
      <h2 className="text-2xl font-semibold text-blue-300">Welcome to the RAG Playground</h2>
      <p className="text-sm text-gray-300">Choose a feature:</p>
      <div className="flex justify-center gap-4 mt-4">
        <a
          href="/upload"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
        >
          📄 Upload
        </a>
        <a
          href="/compare"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
        >
          🧠 Compare
        </a>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="text-center space-y-8 px-6">
      {/* Neon Welcome Heading */}
      <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-blue-400 to-purple-500 drop-shadow-md">
         Welcome to the RAG Playground
      </h2>

      {/* About Section */}
      <div className="space-y-6 text-gray-300 text-[0.95rem] leading-relaxed max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold text-center text-white drop-shadow-sm">
           About the RAG Project
        </h2>

        <p>
          <span className="text-blue-400 font-medium">RAG</span> stands for{" "}
          <span className="text-purple-400 font-semibold">Retrieval-Augmented Generation</span> — a cutting-edge technique combining large language models with real-time knowledge base retrieval. Rather than relying on static memory, RAG fetches relevant content to produce smarter, grounded, and more reliable results.
        </p>

        <p>
          Our vision is to bring this power to everyone — transforming how professionals, researchers, and developers interact with knowledge. With the RAG Playground, you can upload PDFs, compare architectures, and explore the potential of GenAI.
        </p>

        <p className="text-pink-400 font-semibold italic text-center flicker">
          We're not just building another AI — we're shaping the future of thinking. 🌐
        </p>
      </div>

      {/* Feature Call-to-Action */}
      <div className="space-y-3">
        <p className="text-sm text-gray-400 uppercase tracking-wide">Try a feature:</p>

        <div className="flex justify-center gap-6">
          <a
            href="/upload"
            className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md hover:shadow-blue-500/40 transition duration-300"
          >
            📄 Upload
          </a>
          <a
            href="/compare"
            className="px-6 py-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold shadow-md hover:shadow-purple-500/40 transition duration-300"
          >
            🧠 Compare
          </a>
        </div>
      </div>
    </div>
  );
}

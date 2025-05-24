import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100 font-sans min-h-screen flex flex-col">
        
        {/* Main container box */}
        <main className="flex-grow flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-3xl bg-gray-950 border border-gray-800 rounded-2xl shadow-2xl p-10 space-y-6 animate-fadeIn">
            
            {/* Header */}
            <div className="flex flex-col items-center justify-center space-y-3 text-center">
              <h1 className="text-3xl font-bold text-blue-400">🔍 RAG Playground</h1>
              <nav className="space-x-6">
                <a href="/upload" className="text-sm text-gray-300 hover:text-white hover:underline transition">Upload</a>
                <a href="/compare" className="text-sm text-gray-300 hover:text-white hover:underline transition">Compare</a>
              </nav>
            </div>

            {/* Content */}
            <div className="w-full bg-blue-800 bg-opacity-80 backdrop-blur-md border border-blue-700 rounded-3xl p-6 shadow-lg">
  {children}
</div>

          </div>
        </main>
      </body>
    </html>
  );
}

import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900 font-sans">
        <header className="bg-white shadow px-6 py-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold text-blue-700">🔍 RAG Playground</h1>
            <nav className="space-x-4">
              <a href="/upload" className="text-sm hover:underline">Upload</a>
              <a href="/compare" className="text-sm hover:underline">Compare</a>
            </nav>
          </div>
        </header>
        <main className="max-w-4xl mx-auto py-6 px-4">{children}</main>
      </body>
    </html>
  );
}

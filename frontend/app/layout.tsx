import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
   <html lang="en" className="h-full">
  <body className="relative font-sans min-h-screen text-gray-100 overflow-y-auto bg-black">
    {/* Background GIF Layer 1 */}
    <div
      className="fixed inset-0 z-0"
      style={{
        backgroundImage: 'url("/download.gif")',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'repeat',
      }}
    ></div>

    {/* Foreground GIF Layer 2 */}
    <div
      className="fixed inset-0 z-10 pointer-events-none"
      style={{
        backgroundImage: 'url("/Untitled.gif")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'repeat',
        opacity: 1,
      }}
    ></div>

    {/* Main content wrapper */}
    <main className="relative z-20 w-full flex justify-center px-4 py-12">
      <div className="w-full max-w-3xl border border-gray-800 rounded-2xl shadow-2xl p-10 space-y-10 bg-gray-900 bg-opacity-80">
        {/* Header */}
        <div className="flex flex-col items-center justify-center space-y-3 text-center">
          <h1 className="text-3xl font-bold text-center">
            <span className="text-gray-400 tracking-widest">RAG</span>{" "}
            <span className="neon-glitch text-cyan-300">Playground</span>
          </h1>

          <nav className="space-x-6">
            <a href="/" className="text-sm text-gray-300 hover:text-white hover:underline transition">Home</a>
            <a href="/upload" className="text-sm text-gray-300 hover:text-white hover:underline transition">Upload</a>
            <a href="/compare" className="text-sm text-gray-300 hover:text-white hover:underline transition">Compare</a>
          </nav>
        </div>

        

        {/* Children Content */}
        <div>{children}</div>
      </div>
    </main>
  </body>
</html>

  );
}

import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans bg-slate-950 text-slate-100">
        <header className="bg-slate-900 shadow-md">
          <nav className="mx-auto max-w-7xl px-4 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">Space Biology Knowledge Engine</h1>
            <Link
              href="/"
              className="text-sm text-indigo-400 hover:text-indigo-300 transition"
            >
              Home
            </Link>
          </nav>
        </header>
        <main className="pt-6">{children}</main>
      </body>
    </html>
  );
}

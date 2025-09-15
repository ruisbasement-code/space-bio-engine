"use client";
import Link from "next/link";
import { useState, useRef } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <html lang="en">
      <body className="font-sans bg-slate-950 text-slate-100">
        <audio ref={audioRef} src="/space_project_bgm.m4a" loop />
        <header className="bg-slate-900 shadow-md">
          <nav className="mx-auto max-w-7xl px-4 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">Space Biology Knowledge Engine</h1>
            <div>
              <Link
                href="/"
                className="text-sm text-indigo-400 hover:text-indigo-300 transition"
              >
                Home
              </Link>
              <button
                onClick={toggleMusic}
                className="ml-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded-full shadow-lg transition"
              >
                {isPlaying ? "Pause Music" : "Play Music"}
              </button>
            </div>
          </nav>
        </header>
        <main className="pt-6">{children}</main>
      </body>
    </html>
  );
}

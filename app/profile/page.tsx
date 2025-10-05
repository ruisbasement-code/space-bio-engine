"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const LEVELS = ["Kid", "Student", "Professional"] as const;
type Level = (typeof LEVELS)[number];

export default function ProfilePage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [level, setLevel] = useState<Level>("Student");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedName = localStorage.getItem("name") || "";
    const storedRole = (localStorage.getItem("role") ||
      localStorage.getItem("level") ||
      "Student") as Level;
    setName(storedName);
    if (LEVELS.includes(storedRole)) setLevel(storedRole);
  }, []);

  const saveAndContinue = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("name", name.trim());
      localStorage.setItem("role", level);
      localStorage.setItem("level", level);
    }
    router.push("/"); // Change if your main page is at a different route
  };

  return (
    <main className="min-h-screen w-full bg-[#0b0f18] text-slate-200 flex items-start justify-center">
      <div className="mt-10 w-full max-w-3xl rounded-3xl bg-white/5 backdrop-blur p-8 shadow-2xl ring-1 ring-white/10">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-6">Profile</h1>

        {/* NAME FIELD */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-slate-300 mb-3">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Type your name..."
            className="w-full rounded-2xl bg-white/10 text-slate-100 placeholder:text-slate-400 px-4 py-3 ring-1 ring-white/15 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
          />
        </div>

        {/* LEVEL FIELD */}
        <div className="mb-10">
          <label className="block text-sm font-medium text-slate-300 mb-3">Level</label>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value as Level)}
            className="w-full rounded-2xl bg-white text-black font-medium px-4 py-3 shadow-md ring-2 ring-indigo-300 focus:ring-indigo-500 focus:outline-none transition-all"
          >
            {LEVELS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        {/* BUTTONS */}
        <div className="flex gap-4">
          <button
            onClick={saveAndContinue}
            className="px-6 py-3 rounded-2xl bg-indigo-500 hover:bg-indigo-400 text-white font-semibold shadow-[0_0_20px_rgba(99,102,241,0.5)] transition-all"
          >
            Save & Continue
          </button>
          <button
            onClick={() => router.back()}
            className="px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/15 ring-1 ring-white/15 font-medium text-slate-100 transition-all"
          >
            Cancel
          </button>
        </div>
      </div>
    </main>
  );
}
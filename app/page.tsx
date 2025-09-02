"use client";

import { useMemo, useState } from "react";
import papers from "@/data/papers";
import type { Paper } from "@/types/paper";
import SearchBar from "@/components/SearchBar";
import ResultCard from "@/components/ResultCard";

function matches(p: Paper, query: string) {
  if (!query.trim()) return true;
  const q = query.toLowerCase();
  return (
    p.title.toLowerCase().includes(q) ||
    p.abstract.toLowerCase().includes(q) ||
    p.tags.some((t) => t.toLowerCase().includes(q)) ||
    String(p.year).includes(q)
  );
}

export default function HomePage() {
  const [query, setQuery] = useState("");

  const results = useMemo(
    () =>
      papers
        .filter((p) => matches(p, query))
        .sort((a, b) => (b.year - a.year) || a.title.localeCompare(b.title)),
    [query]
  );

  return (
    <div className="min-h-screen">
      <header className="px-6 pt-10 pb-6 text-center">
        <h1 className="text-4xl font-bold text-indigo-400">
          Space Biology Knowledge Engine
        </h1>
        <p className="mt-2 text-sm text-slate-300">
          Mock search over 10 NASA bioscience papers (local JSON).
        </p>
        <div className="mt-6">
          <SearchBar value={query} onChange={setQuery} />
        </div>
      </header>

      <section className="mx-auto grid max-w-4xl gap-4 px-6 pb-16">
        {results.length === 0 ? (
          <p className="text-slate-300 text-center">
            No results. Try “plants” or “microgravity”.
          </p>
        ) : (
          results.map((p) => <ResultCard key={p.id} paper={p} />)
        )}
      </section>
    </div>
  );
}

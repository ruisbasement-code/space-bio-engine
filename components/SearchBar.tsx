"use client";
import { useState } from "react";

type Props = {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
};

export default function SearchBar({ value, onChange, placeholder }: Props) {
  const [q, setQ] = useState(value);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <input
        value={q}
        onChange={(e) => {
          setQ(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={placeholder ?? "Search papers (title, abstract, tags)…"}
        className="w-full rounded-xl border border-gray-600 bg-gray-800 px-4 py-3 text-base text-gray-200 shadow-sm
                   focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  );
}

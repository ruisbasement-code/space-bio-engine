"use client";
import { useRouter } from "next/navigation";

export default function BackToLevelButton() {
  const router = useRouter();
  const level = (typeof window !== 'undefined'
    ? (localStorage.getItem('profile.level') || 'Student')
    : 'Student');
  return (
    <button
      onClick={() => router.push(`/template?level=${encodeURIComponent(level)}`)}
      className="rounded-2xl px-6 py-3 font-bold bg-slate-700 text-slate-100 hover:bg-slate-600 transition shadow"
      aria-label={`Back to ${level}`}
    >
      {`Back to ${level}`}
    </button>
  );
}
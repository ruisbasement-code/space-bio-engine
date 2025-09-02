import { Paper } from "@/types/paper";

export default function ResultCard({ paper }: { paper: Paper }) {
  return (
    <div className="rounded-2xl border border-gray-700 bg-gray-800 p-4 shadow-sm hover:shadow-md transition">
      <div className="flex items-baseline justify-between">
        <h3 className="text-lg font-semibold text-gray-100">{paper.title}</h3>
        <span className="text-sm text-gray-400">{paper.year}</span>
      </div>

      <p className="mt-2 text-sm text-gray-300 line-clamp-3">{paper.abstract}</p>

      <div className="mt-3 flex flex-wrap gap-2">
        {paper.tags.map((t) => (
          <span
            key={t}
            className="rounded-full border border-gray-600 bg-gray-700 px-2 py-1 text-xs text-gray-300"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

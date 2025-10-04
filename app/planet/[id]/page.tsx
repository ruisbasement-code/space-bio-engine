import { notFound } from 'next/navigation';
import { planets } from '../../../data/planets';
import BackToLevelButton from '../../../components/BackToLevelButton';
import Link from 'next/link';

interface Props { params: { id: string } }

export function generateStaticParams() {
  return planets.map(p => ({ id: p.id }));
}

export default function PlanetDetailPage({ params }: Props) {
  const planet = planets.find(p => p.id === params.id);
  if (!planet) return notFound();

  return (
    <main className="min-h-screen w-full bg-[#0f1623] text-slate-200 p-6 md:p-10">
      <section className="mx-auto max-w-7xl rounded-[28px] bg-slate-900/60 ring-1 ring-white/10 p-6 md:p-10">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-100">
          {planet.title}
        </h1>

        <p className="mt-6 text-xl md:text-2xl leading-relaxed text-slate-300">
          {planet.summary}
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-3xl bg-slate-800/60 ring-1 ring-white/10 min-h-[320px] flex items-center justify-center">
            <span className="text-slate-400">{planet.figure1 ?? 'Figure 1'}</span>
          </div>
          <div className="rounded-3xl bg-slate-800/60 ring-1 ring-white/10 min-h-[320px] flex items-center justify-center">
            <span className="text-slate-400">{planet.figure2 ?? 'Figure 2'}</span>
          </div>
        </div>

        <div className="mt-8 flex items-center gap-4">
          <BackToLevelButton />
          <Link href="/" className="rounded-2xl px-6 py-3 font-bold bg-sky-300 text-slate-900 hover:bg-sky-200 transition shadow">
            Finish Mission
          </Link>
        </div>
      </section>
    </main>
  );
}

export const dynamicParams = false;
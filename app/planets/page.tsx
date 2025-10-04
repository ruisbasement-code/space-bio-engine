"use client";
import React from 'react';
import PlanetCarousel from '../../components/PlanetCarousel';

export default function PlanetsPage() {
  return (
    <main className="h-screen w-full bg-[#0f1623] text-slate-100">
      <section className="h-full flex items-center justify-center overflow-hidden">
        <PlanetCarousel />
      </section>
    </main>
  );
}
'use client';

import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Planet } from '@/data/planets';

interface PlanetQuickViewProps {
  open: boolean;
  planet: Planet | null;
  onClose: () => void;
}

export default function PlanetQuickView({ open, planet, onClose }: PlanetQuickViewProps) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (open) {
      triggerRef.current = document.activeElement as HTMLElement;
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      setTimeout(() => closeButtonRef.current?.focus(), 100); // Delay focus slightly
    } else {
      document.body.style.overflow = '';
      triggerRef.current?.focus();
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);

  if (!open || !planet) {
    return null;
  }

  const handleLearnMore = () => {
    if (planet?.id === 'mars') {
      const raw =
        (localStorage.getItem("level") || localStorage.getItem("role") || "student").toLowerCase();
      const profile =
        raw === "kid" || raw === "student" || raw === "professional" ? raw : "student";

      const url = `/venus/kid?planet=mars&profile=${profile}`;

      onClose?.();
      // ✅ HARD REDIRECT (bypasses any client cache/Link issues)
      window.location.href = url;
    } else {
      router.push(`/planet/${planet.id}`);
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="planet-modal-title"
    >
      <div
        ref={dialogRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-[92vw] max-w-md rounded-2xl bg-slate-900/90 border border-slate-700 ring-1 ring-white/10 shadow-2xl p-6"
      >
        <button
          ref={closeButtonRef}
          onClick={onClose}
          className="absolute top-3 right-3 text-slate-400 hover:text-slate-100 text-xl leading-none cursor-pointer"
          aria-label="Close"
        >
          &times;
        </button>
        <Image
          src={planet.image}
          alt={planet.name}
          width={80}
          height={80}
          className="w-20 h-20 object-contain mx-auto drop-shadow"
        />
        <h2 id="planet-modal-title" className="mt-3 text-2xl font-bold text-slate-100 text-center">
          {planet.name}
        </h2>
        <p className="mt-2 text-slate-300 text-center">{planet.summary}</p>
        <div className="mt-6 flex justify-center gap-3">
          <button
            onClick={handleLearnMore}
            className="px-4 py-2 rounded-xl bg-sky-300 text-slate-900 font-semibold hover:bg-sky-200"
          >
            Learn More
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-700 text-slate-100 hover:bg-slate-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
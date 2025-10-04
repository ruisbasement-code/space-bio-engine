'use client';

import { useEffect } from 'react';

export default function BootstrapScript() {
  useEffect(() => {
    const params   = new URLSearchParams(location.search);
    const planetId = (params.get('planet')  || localStorage.getItem('selectedPlanet')  || 'venus').toLowerCase();
    const profile  = (params.get('profile') || localStorage.getItem('selectedProfile') || 'student').toLowerCase();
    const planetName = planetId.replace(/-/g,' ').replace(/\b\w/g, c => c.toUpperCase());

    // Remove any old step-through buttons if they still exist
    document.querySelector('#next-btn')?.remove();

    // Basic placeholders (no article content yet)
    const text = {
      kid: {
        title: `${planetName} — Kid Template`,
        summary: `Summary: [kid-level content for ${planetName}]`,
        question: `Question: [kid-level inquiry for ${planetName}]`
      },
      student: {
        title: `Atmospheric Composition and Surface Conditions of ${planetName}`,
        abstract: `[student-level abstract placeholder for ${planetName}]`,
        notes: `[what to focus on when reading]`
      },
      professional: {
        title: `${planetName}: [Professional Template Title]`,
        lead1: `[pro-level lead paragraph for ${planetName}]`,
        lead2: `[second lead paragraph for ${planetName}]`
      }
    }[profile] || {};

    // Helper
    const setText = (sel: string, v?: string) => { const el = document.querySelector(sel); if (el && v != null) el.textContent = v; };

    // Bind to whatever exists on the page
    setText('#page-title', text.title);
    setText('#summary-text', text.summary);
    setText('#question-text', text.question);
    setText('#abstract-text', text.abstract);
    setText('#notes-hint', text.notes);
    setText('#lead-left', text.lead1);
    setText('#lead-right', text.lead2);

// Buttons
const backBtn   = document.getElementById('back-btn');
const finishBtn = document.getElementById('finish-btn') as HTMLAnchorElement | null;

// Back → go to the planet carousel
const handleBack = (e: MouseEvent) => {
  e.preventDefault();
  // remember last selection (optional)
  localStorage.setItem('selectedPlanet', planetId);
  localStorage.setItem('selectedProfile', profile);
  localStorage.setItem('ui.lastPlanet', planetId);
  // go to carousel route
  window.location.href = '/planets';
};
backBtn?.addEventListener('click', handleBack);

// Finish → go to MAIN PAGE
if (finishBtn) {
  finishBtn.setAttribute('href', '/');
}

// Persist for other parts of the app
localStorage.setItem('selectedPlanet', planetId);
localStorage.setItem('selectedProfile', profile);

return () => {
  backBtn?.removeEventListener('click', handleBack);
};
  }, []);

  return null;
}
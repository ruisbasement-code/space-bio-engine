'use client';

import { useEffect } from 'react';

export default function ProfileScript() {
  useEffect(() => {
    // --------- CONFIG: set your main menu page here ----------
    const HOME_ROUTE = '/'; // <-- change if your main page is different

    // --------- Prevent form reloads ----------
    const profileForm = document.getElementById('profile-form');
    profileForm?.addEventListener('submit', (e) => e.preventDefault());

    // --------- Single, robust click handler (works across re-renders) ----------
    function onSaveAndContinue(e: MouseEvent) {
      e.preventDefault();
      e.stopPropagation();

      // Get values from DOM
      const nameInput = document.getElementById('name-input') as HTMLInputElement;
      const levelSelect = document.getElementById('role-select') as HTMLSelectElement;

      const name = nameInput?.value;
      const level = levelSelect?.value;

      // Save name
      const cleaned = (name || "").trim();
      localStorage.setItem("name", cleaned);

      // Save level (and legacy 'role'), normalized
      const normalized = (level || "student").toLowerCase();
      localStorage.setItem("level", normalized);
      localStorage.setItem("role", normalized);

      // Go back to main page
      window.location.href = HOME_ROUTE;
    }

    // ensure the button is a real button and wire it safely
    function wireProfileSave() {
      const btn = document.getElementById('profile-save');
      if (!btn) return;
      if (btn.tagName === 'BUTTON') (btn as HTMLButtonElement).type = 'button';           // stop native submit
      btn.removeEventListener('click', onSaveAndContinue as EventListener);
      btn.addEventListener('click', onSaveAndContinue as EventListener);
    }

    // initial wire + self-heal on DOM changes
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', wireProfileSave);
    } else {
      wireProfileSave();
    }
    
    const handlePageShow = () => wireProfileSave();
    window.addEventListener('pageshow', handlePageShow);
    
    const mo = new MutationObserver(wireProfileSave);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('pageshow', handlePageShow);
      mo.disconnect();
    };
  }, []);

  return null;
}
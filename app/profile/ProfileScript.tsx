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
      e.preventDefault(); e.stopPropagation();

      // persist selections
      const name  = (document.getElementById('name-input') as HTMLInputElement)?.value?.trim();
      const role  = ((document.getElementById('role-select') as HTMLSelectElement)?.value || 'student').toLowerCase();
      const age   = (document.getElementById('age-input') as HTMLInputElement)?.value?.trim();
      const ints  = (document.getElementById('interests-input') as HTMLInputElement)?.value?.trim();

      if (name) localStorage.setItem('userName', name);
      if (age)  localStorage.setItem('userAge', age);
      if (ints) localStorage.setItem('userInterests', ints);
      localStorage.setItem('selectedProfile', role);

      // navigate back to main menu
      const url = `${HOME_ROUTE}?profile=${encodeURIComponent(role)}`;
      window.location.href = url;
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
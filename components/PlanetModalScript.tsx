'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    currentPlanetId?: string | null;
  }
}

export default function PlanetModalScript() {
  useEffect(() => {
    // refs
    const dialog   = document.getElementById('planet-modal');
    const overlay  = document.getElementById('planet-modal-overlay');
    const titleEl  = document.getElementById('planet-modal-title');
    const descEl   = document.getElementById('planet-modal-desc');
    const closeBtn = document.getElementById('planet-modal-close');
    const cancelBtn= document.getElementById('planet-modal-cancel');
    const learnBtn = document.getElementById('planet-modal-learn');

    if (!dialog || !overlay || !titleEl || !descEl || !closeBtn || !cancelBtn || !learnBtn) {
      return;
    }

    let lastFocusedEl: HTMLElement | null = null;

    // show/hide
    function openPlanetModal(id: string, name: string, desc: string) {
      window.currentPlanetId = id?.toLowerCase();
      titleEl!.textContent = name || (id ? id[0].toUpperCase()+id.slice(1) : 'Planet');
      descEl!.textContent  = desc || '';
      dialog!.classList.remove('hidden');
      overlay!.classList.remove('hidden');
      requestAnimationFrame(()=>{
        dialog!.classList.add('show');
        overlay!.classList.add('show');
      });
      lastFocusedEl = document.activeElement as HTMLElement;
      (closeBtn as HTMLButtonElement)?.focus();
    }
    function closePlanetModal() {
      dialog!.classList.remove('show');
      overlay!.classList.remove('show');
      setTimeout(()=>{
        dialog!.classList.add('hidden');
        overlay!.classList.add('hidden');
        document.body.style.overflow='';
        lastFocusedEl?.focus();
      }, 200);
    }

    // stop bubbling & handlers
    dialog?.addEventListener('click',(e)=>e.stopPropagation());
    [closeBtn,cancelBtn].forEach(b=>b?.addEventListener('click',(e)=>{e.preventDefault();e.stopPropagation();closePlanetModal();}));
    overlay?.addEventListener('click',(e)=>{e.preventDefault();e.stopPropagation();closePlanetModal();});
    document.addEventListener('keydown',(e)=>{ if(e.key==='Escape') closePlanetModal(); });

    // if you already have delegated clicks, keep them; otherwise, quick hookup:
    document.addEventListener('click',(e)=>{
      if (!(e.target instanceof Element)) return;
      if (e.target.closest('.carousel-nav, .arrow, .swiper-button-next, .swiper-button-prev')) return;
      if (!dialog.classList.contains('hidden') && e.target.closest('#planet-modal')) return;
      const el = e.target.closest?.('[data-planet], [data-planet-id], a[href*="/planet/"]');
      if (!el) return;
      const id  = ((el as HTMLElement).dataset.planet || (el as HTMLElement).dataset.planetId || (el.getAttribute('href')||'').split('/').pop() || '').toLowerCase();
      if (!id) return;
      e.preventDefault(); e.stopPropagation();
      const name = (el as HTMLElement).dataset.name || id.charAt(0).toUpperCase()+id.slice(1);
      const desc = (el as HTMLElement).dataset.desc || '';
      openPlanetModal(id, name, desc);
    });

    // keep your Learn More routing as-is; if missing, wire quickly:
    learnBtn?.addEventListener('click',(e)=>{
      e.preventDefault(); e.stopPropagation();
      // replace with your router/level logic if needed
      const profile = (localStorage.getItem('selectedProfile') || 'student').toLowerCase();
      const routes = { kid:'/venus/kid', student:'/venus/student', professional:'/venus/pro' };
      const url = `${routes[profile as keyof typeof routes] || routes.student}?planet=${encodeURIComponent(window.currentPlanetId||'venus')}&profile=${encodeURIComponent(profile)}`;
      window.location.href = url;
    });
  }, []);

  return null;
}
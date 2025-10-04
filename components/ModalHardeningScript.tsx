'use client';

import { useEffect } from 'react';

export default function ModalHardeningScript() {
  useEffect(() => {
    if (document.getElementById('modal-fix-styles')) return;

    const style = document.createElement('style');
    style.id = 'modal-fix-styles';
    style.innerHTML = `
      /* Keep scene visible but clean under the modal */
      body.modal-open #ring { pointer-events: none; filter: blur(1.2px) brightness(.78); transition: filter .15s ease; }
      /* Hide the floating labels while the modal is open */
      body.modal-open #ring .label { visibility: hidden !important; }
      /* Make sure the modal stack is always on top */
      #planet-modal-overlay.overlay { z-index: 10000; }
      #planet-modal.dialog       { z-index: 10001; }
      /* Safety: never disable pointer-events on the modal/backdrop themselves */
      body.modal-open #planet-modal, 
      body.modal-open #planet-modal * , 
      body.modal-open #planet-modal-overlay { pointer-events: auto !important; }
    `;
    document.head.appendChild(style);

    const script = document.createElement('script');
    script.innerHTML = `
      (() => {
        const overlay = document.getElementById('planet-modal-overlay'); // class "overlay"
        const dialog  = document.getElementById('planet-modal');         // class "dialog"
        const closeBtn  = document.getElementById('planet-modal-close');
        const cancelBtn = document.getElementById('planet-modal-cancel');

        // Helper: is an element visible (your CSS toggles .show / .hidden)
        const isVisible = el => !!el && !el.classList.contains('hidden') && 
                                (el.classList.contains('show') || el.style.display !== 'none');

        function applyOpenState(isOpen) {
          document.body.classList.toggle('modal-open', isOpen);

          // IMPORTANT: your PlanetModalScript sets body.style.overflow='hidden'.
          // We do NOT want that (it causes the background to "fly up").
          // Always clear it so the page doesn't jump.
          if (isOpen) {
            document.body.style.overflow = '';  // undo inline overflow lock
          } else {
            document.body.style.overflow = '';
          }
        }

        function sync() {
          const open = isVisible(dialog) && isVisible(overlay);
          applyOpenState(open);
        }

        // Backdrop click should close immediately without needing a second click
        function closeNow(evt) {
          evt?.preventDefault?.();
          evt?.stopPropagation?.();

          // Trigger the real close buttons if they exist
          try {
            if (closeBtn) closeBtn.click();
            if (cancelBtn) cancelBtn.click();
          } catch {}

          // Fallback: hide via CSS classes (matches your globals.css)
          dialog?.classList.remove('show'); overlay?.classList.remove('show');
          dialog?.classList.add('hidden'); overlay?.classList.add('hidden');

          applyOpenState(false);
          // allow framework to settle
          setTimeout(sync, 0);
        }

        // Wire events
        overlay?.addEventListener('click', closeNow, { capture: true });
        closeBtn?.addEventListener('click', () => setTimeout(sync, 0), { capture: true });
        cancelBtn?.addEventListener('click', () => setTimeout(sync, 0), { capture: true });
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeNow(e); });

        // Observe your modal’s class changes (show/hidden)
        const mo = new MutationObserver(sync);
        if (dialog)   mo.observe(dialog,   { attributes: true, attributeFilter: ['class', 'style'] });
        if (overlay)  mo.observe(overlay,  { attributes: true, attributeFilter: ['class', 'style'] });

        // Initial pass
        sync();
      })();
    `;
    document.body.appendChild(script);

    return () => {
      document.getElementById('modal-fix-styles')?.remove();
      // The script itself doesn't have an ID, so we can't easily remove it.
      // However, the event listeners will be garbage collected when the component unmounts.
    };
  }, []);

  return null;
}
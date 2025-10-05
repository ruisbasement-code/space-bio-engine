"use client";

import { useEffect } from 'react';

export default function TileNormalizer() {
  useEffect(() => {
    if (!/^\/planets(\/|$)?/i.test(location.pathname)) return;

    const IMG: { [key: string]: string } = {
      Mercury: "/assets/planets/mercury.png",
      Venus: "/assets/planets/venus.png",
      Earth: "/assets/planets/earth.png",
      Mars: "/assets/planets/mars.png",
      Jupiter: "/assets/planets/jupiter.png",
      Saturn: "/assets/planets/saturn.png",
      Uranus: "/assets/planets/uranus.png",
      Neptune: "/assets/planets/neptune.png",
    };

    const style = document.createElement("style");
    style.id = 'planet-inline-icon-style';
    style.textContent = `
      .planet-inline-icon {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        object-fit: cover;
        vertical-align: middle;
        margin-right: 10px;
        background: radial-gradient(circle at 40% 35%, rgba(255,255,255,0.06), rgba(0,0,0,0) 70%);
        mix-blend-mode: lighten;
        box-shadow: 0 0 16px rgba(255,255,255,.14);
        transition: transform .35s ease, filter .35s ease;
        filter: brightness(1.08) contrast(1.15);
      }
      .planet-inline-icon:hover { transform: scale(1.18); filter: brightness(1.25) contrast(1.25); }
    `;
    if (!document.head.querySelector('#planet-inline-icon-style')) {
      document.head.appendChild(style);
    }

    const PLANET_NAMES = Object.keys(IMG);
    const norm = (s: string | null) => (s || "").replace(/\s+/g, " ").trim().toLowerCase();

    function findLabels() {
      const all = Array.from(document.querySelectorAll("div,span,p,li,h5,h6,small,em,strong"));
      const labels: { el: Element, name: string }[] = [];
      for (const el of all) {
        const t = norm(el.textContent);
        if (!t) continue;
        const name = PLANET_NAMES.find(n => norm(n) === t);
        if (!name) continue;

        const cs = getComputedStyle(el);
        const fontSize = parseFloat(cs.fontSize) || 0;
        if (fontSize >= 20 && (cs.fontWeight === "700" || parseInt(cs.fontWeight,10) >= 600)) {
          // continue;
        }
        labels.push({ el, name });
      }
      return labels;
    }

    function cleanNearbyIcons(container: Element) {
      const imgs = container.querySelectorAll("img");
      imgs.forEach(img => {
        const r = img.getBoundingClientRect();
        const tooSmall = (r.width && r.width <= 60) || img.naturalWidth === 0 || img.width <= 60;
        if (tooSmall) img.remove();
      });
    }

    function injectIconBeforeLabel(labelEl: Element, name: string) {
      const container = labelEl.parentElement || labelEl;
      cleanNearbyIcons(container);

      if (container.querySelector('img.planet-inline-icon')) return;

      const img = document.createElement("img");
      img.className = "planet-inline-icon";
      img.alt = name;
      img.src = IMG[name];
      img.onerror = () => { (img as HTMLElement).style.display = "none"; };

      container.insertBefore(img, labelEl);
    }

    function run() {
      const labels = findLabels();
      labels.forEach(({ el, name }) => injectIconBeforeLabel(el, name));
    }

    run();
    const mo = new MutationObserver(() => run());
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      mo.disconnect();
      const styleEl = document.getElementById('planet-inline-icon-style');
      if (styleEl) {
        styleEl.remove();
      }
    };
  }, []);

  return null;
}
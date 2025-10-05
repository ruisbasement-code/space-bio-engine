"use client";

import { useEffect } from 'react';
import '../styles/starfield.css';

export default function Starfield() {
  useEffect(() => {
    /* === STARFIELD BACKGROUND === */
    let canvas = document.getElementById('space-bg') as HTMLCanvasElement;
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.id = 'space-bg';
      document.body.prepend(canvas);
    }
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;
    const dpr = Math.max(1, window.devicePixelRatio || 1);
    let W = 0, H = 0;
    function resize() {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width  = Math.floor(W * dpr);
      canvas.height = Math.floor(H * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    window.addEventListener('resize', resize, { passive: true });
    resize();

    const STAR_COUNT = Math.min(3200, Math.floor(W * H / 1000));
    const COMET_SPAWN_SEC = 5;
    const rand = (a=0,b=1)=>a+Math.random()*(b-a);
    const pick = <T,>(a: T[]): T => a[Math.floor(Math.random() * a.length)];
    const starColors = ["#cdd9ff","#dbe4ff","#f6f7ff","#b9d0ff","#9cc0ff","#ffe5a8","#ffd3a6","#ffb3a3"];
    const planetHints = ["#6fa8ff","#a5c8ff","#c2a1ff"];
    const stars = Array.from({ length: STAR_COUNT }).map(() => ({
      x: rand(0, W), y: rand(0, H),
      r: rand(0.2, 1.4), baseA: rand(0.25, 1),
      tw: rand(0.3, 2.3), phase: rand(0, Math.PI * 2),
      color: Math.random()<0.995?pick(starColors):pick(planetHints),
      driftX: rand(-0.02,0.02), driftY: rand(-0.01,0.01)
    }));
    type Comet = { x: number; y: number; dx: number; dy: number; len: number };
    let comets: Comet[] = [], cometTimer = 0;
    function spawnComet(){
      const left=Math.random()<0.5;
      comets.push({x:left?-50:W+50,y:rand(0,H*0.7),dx:left?rand(2,3):-rand(2,3),dy:rand(0.4,0.8),len:rand(80,150)});
    }
    type Star = { x: number; y: number; r: number; baseA: number; tw: number; phase: number; color: string; driftX: number; driftY: number };
    function drawStar(s: Star, t: number) {
      const a=s.baseA*(0.7+0.3*Math.sin(t*s.tw+s.phase));
      ctx!.globalAlpha=a; ctx!.fillStyle=s.color;
      ctx!.beginPath(); ctx!.arc(s.x,s.y,s.r,0,Math.PI*2); ctx!.fill();
      ctx!.globalAlpha=1;
    }
    function drawComet(c: Comet) {
      const g=ctx!.createLinearGradient(c.x,c.y,c.x-c.dx*c.len,c.y-c.dy*c.len);
      g.addColorStop(0,"rgba(255,255,255,0.9)"); g.addColorStop(1,"rgba(255,255,255,0)");
      ctx!.strokeStyle=g; ctx!.lineWidth=1.3;
      ctx!.beginPath(); ctx!.moveTo(c.x,c.y); ctx!.lineTo(c.x-c.dx*c.len,c.y-c.dy*c.len); ctx!.stroke();
      ctx!.fillStyle="#fff"; ctx!.beginPath(); ctx!.arc(c.x,c.y,1.5,0,Math.PI*2); ctx!.fill();
    }
    let last=performance.now();
    let animationFrameId: number;
    function tick(now: number){
      const dt=Math.min(0.033,(now-last)/1000); last=now;
      ctx!.clearRect(0,0,W,H);
      const t=now*0.0015;
      for(const s of stars){
        drawStar(s,t);
        s.x+=s.driftX*dt*60; s.y+=s.driftY*dt*60;
        if(s.x<-5)s.x=W+5; if(s.x>W+5)s.x=-5;
        if(s.y<-5)s.y=H+5; if(s.y>H+5)s.y=-5;
      }
      cometTimer+=dt;
      if(cometTimer>COMET_SPAWN_SEC*rand(0.7,1.3)){ cometTimer=0; spawnComet(); }
      comets=comets.filter(c=>c.x>-200&&c.x<W+200&&c.y<H+200);
      for(const c of comets){ c.x+=c.dx; c.y+=c.dy; drawComet(c); }
      animationFrameId = requestAnimationFrame(tick);
    }
    animationFrameId = requestAnimationFrame(tick);

    /* === AUTO FADE + CENTER === */
    function adjustMain(){
      const el=document.querySelector('main, section.home-hero, section, #root, #app, .page, .container');
      if(el && !el.classList.contains('space-fade')){
        el.classList.add('space-fade','center-page');
      }
    }
    adjustMain();
    const mo=new MutationObserver(()=>adjustMain());
    mo.observe(document.body,{childList:true,subtree:true});

    /* === PLANET IMAGES === */
    const IMG_BASE='/assets/planets';
    const files: { [key: string]: string } = {sun:'sun.png',mercury:'mercury.png',venus:'venus.png',earth:'earth.png',moon:'moon.png',mars:'mars.png',jupiter:'jupiter.png',saturn:'saturn.png',uranus:'uranus.png',neptune:'neptune.png',pluto:'pluto.png'};
    const tones: { [key: string]: string } = {mercury:'#a7a7a7',venus:'#d2b48c',earth:'#5bb2ff',moon:'#bdbdbd',mars:'#e06b5a',jupiter:'#caa07a',saturn:'#d3c19c',uranus:'#8fd3e6',neptune:'#6fa8ff',pluto:'#b7b1ab',sun:'#ffd36b'};
    function ensureImg(tile: Element){
      let img=tile.querySelector('img[data-planet],img.planet-img') as HTMLImageElement;
      if(!img){img=document.createElement('img');img.className='planet-img';tile.prepend(img);}
      img.setAttribute('loading','lazy');
      return img;
    }
    function getPlanetKey(tile: Element){
      const attr=(tile.getAttribute('data-planet')||'').trim();
      if(attr) return attr.toLowerCase();
      const img=tile.querySelector('img[data-planet]');
      if(img && img.getAttribute('data-planet')) return img.getAttribute('data-planet')!.toLowerCase();
      const nameEl=tile.querySelector('.planet-name')||tile;
      const name=(nameEl.textContent||'').trim().toLowerCase();
      return name.replace(/[^a-z]/g,'');
    }
    function wireTile(tile: Element){
      const key=getPlanetKey(tile);
      if(!key||!(key in files))return;
      const img=ensureImg(tile);
      img.alt=key.charAt(0).toUpperCase()+key.slice(1);
      img.dataset.planet=key;
      const src=`${IMG_BASE}/${files[key]}`;
      img.src=src;
      img.onerror=()=>{
        img.style.display='none';
        let fb=tile.querySelector('.planet-fallback');
        if(!fb){
          fb=document.createElement('div');
          fb.className='planet-fallback';
          (fb as HTMLElement).style.setProperty('--tone',tones[key]||'#7aa2ff');
          tile.prepend(fb);
        }
      };
    }
    function wireAll(scope: Document | Element = document){
      const tiles=scope.querySelectorAll('.planet-tile,[data-planet],.planet-name');
      const unique=new Set<Element>();
      tiles.forEach(el=>{
        const t=el.classList?.contains('planet-name')?el.closest('.planet-tile')||el.parentElement:el;
        if(t) unique.add(t);
      });
      unique.forEach(wireTile);
    }
    wireAll();
    const mo2=new MutationObserver(muts=>{
      for(const m of muts){
        m.addedNodes?.forEach(n=>{ if(n.nodeType===1) wireAll(n as Element); });
      }
    });
    mo2.observe(document.body,{childList:true,subtree:true});

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
      mo.disconnect();
      mo2.disconnect();
    }
  }, []);

  return null;
}
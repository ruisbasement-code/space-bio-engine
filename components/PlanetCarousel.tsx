"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { planets } from '../data/planets';
import './PlanetCarousel.css';

export default function PlanetCarousel() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lastPlanet = localStorage.getItem('ui.lastPlanet');
    if (lastPlanet) {
      const index = planets.findIndex(p => p.id === lastPlanet);
      if (index !== -1) {
        setActiveIndex(index);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('ui.lastPlanet', planets[activeIndex].id);
  }, [activeIndex]);

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + planets.length) % planets.length);
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % planets.length);
  };

  const handlePlanetClick = (index: number) => {
    if (index === activeIndex) {
      // This will be handled by the new modal script
    } else {
      setActiveIndex(index);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowLeft') {
      handlePrev();
    } else if (event.key === 'ArrowRight') {
      handleNext();
    } else if (event.key === 'Enter') {
      // This will be handled by the new modal script
      // Or we could trigger a click on the active element
      const activePlanetElement = document.querySelector('.planet.is-active');
      if (activePlanetElement instanceof HTMLElement) {
        activePlanetElement.click();
      }
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX === 0) return;
    const touchEndX = e.touches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (diff > 50) {
      handleNext();
      setTouchStartX(0);
    } else if (diff < -50) {
      handlePrev();
      setTouchStartX(0);
    }
  };

  return (
    <div
      id="ring"
      ref={ringRef}
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      tabIndex={0}
    >
      {planets.map((planet, index) => {
        const theta = (index - activeIndex) * (2 * Math.PI / planets.length);
        const R = "clamp(220px, 34vw, 360px)";
        const x = `calc(${R} * ${Math.sin(theta)})`;
        const y = `calc(18px * ${Math.cos(theta)})`;
        const depth = 0.5 + 0.5 * Math.cos(theta);
        const s = 0.6 + 0.4 * depth;
        const opacity = 0.35 + 0.65 * depth;
        const zIndex = 1000 + Math.round(1000 * depth);
        const isActive = index === activeIndex;
        const isNeighbor = Math.abs(index - activeIndex) <= 1 || Math.abs(index - activeIndex) >= planets.length - 1;

        const style: React.CSSProperties = {
          '--x': x,
          '--y': y,
          '--s': s,
          opacity,
          zIndex,
          pointerEvents: isActive || isNeighbor ? 'auto' : 'none',
        } as React.CSSProperties;

        return (
          <div
            key={planet.id}
            className={`planet planet-inline-card ${isActive ? 'is-active' : ''}`}
            style={style}
            onClick={() => handlePlanetClick(index)}
            aria-label={`Select ${planet.name}`}
            data-planet={planet.id}
            data-name={planet.name}
            data-desc={planet.summary}
          >
            <Image
              className="planet-inline-img"
              src={planet.image || ''}
              alt={planet.name}
              width={160}
              height={160}
              priority={isActive}
            />
            <div className="planet-inline-name">{planet.name}</div>
          </div>
        );
      })}
    </div>
  );
}
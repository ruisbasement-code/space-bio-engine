"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import './page.css';

export default function Page() {
  const [greeting, setGreeting] = useState("Hello Commander.");
  const router = useRouter();

  useEffect(() => {
    const storedName = localStorage.getItem("profile.name");
    if (storedName) {
      setGreeting(`Hello ${storedName}.`);
    }
    localStorage.removeItem("ui.lastPlanet");
  }, []);

  return (
    <main>
      <section className="home-hero">
        <div className="header">
          <h1>{greeting}</h1>
          <p className="sub">What would you like to learn?</p>
        </div>

        <div className="topic-row">
          {/* Card 1: Clickable */}
          <div 
            id="card-planets" 
            className="topic-card clickable" 
            aria-label="Planets & Moons"
            onClick={() => router.push('/planets')}
          >
            <div className="topic-label">
              <div className="topic-title">PLANETS & MOONS</div>
              <div className="topic-underline"></div>
            </div>
          </div>

          {/* Card 2: Not wired yet (no “coming soon”, just a box) */}
          <div id="card-landscapes" className="topic-card disabled" aria-label="Landscapes">
            <div className="topic-label">
              <div className="topic-title">LANDSCAPES</div>
              <div className="topic-underline"></div>
            </div>
          </div>

          {/* Card 3: Not wired yet */}
          <div id="card-deepspace" className="topic-card disabled" aria-label="Deep Space">
            <div className="topic-label">
              <div className="topic-title">DEEP SPACE</div>
              <div className="topic-underline"></div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

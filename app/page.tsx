"use client";
import { useState, useEffect } from 'react';
import './page.css';

export default function Page() {
  const [greeting, setGreeting] = useState("Hello Commander.");
  useEffect(() => {
    const storedName = localStorage.getItem("profile.name");
    if (storedName) {
      setGreeting(`Hello ${storedName}.`);
    }
    localStorage.removeItem("ui.lastPlanet");
  }, []);

  return (
    <>
      <section id="topic-hero">
        <div className="hdr">
          <h1>{greeting}</h1>
          <p>What would you like to learn?</p>
        </div>
        <div className="grid">
          <a className="topic-card" id="card-planets" href="/planets">
            <div className="inner">
              <div className="title">PLANETS & MOONS</div>
              <div className="underline"></div>
            </div>
          </a>
          <a className="topic-card" id="card-landscapes" href="/landscapes">
            <div className="inner">
              <div className="title">LANDSCAPES</div>
              <div className="underline"></div>
            </div>
          </a>
          <a className="topic-card" id="card-deepspace" href="/deepspace">
            <div className="inner">
              <div className="title">DEEP SPACE</div>
              <div className="underline"></div>
            </div>
          </a>
        </div>
      </section>
    </>
  );
}

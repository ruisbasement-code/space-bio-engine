"use client";
import React, { useState, useEffect } from 'react';
import './page.css';

function Greeting() {
  const [name, setName] = useState<string>("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    setName(localStorage.getItem("name") || "");
  }, []);

  return (
    <h2 className="text-2xl md:text-3xl font-semibold">
      Hello{ name ? `, ${name}` : "" }
    </h2>
  );
}

export default function Page() {
  useEffect(() => {
    localStorage.removeItem("ui.lastPlanet");
  }, []);

  return (
    <>
      <section id="topic-hero">
        <div className="hdr">
          <Greeting />
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

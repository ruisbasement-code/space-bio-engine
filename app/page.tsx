"use client";
import { useState, useEffect } from 'react';
import './page.css';
import TTSButton from './_client/TTSButton';

export default function Page() {
  const [greeting, setGreeting] = useState("Hello Commander.");

  useEffect(() => {
    const storedName = localStorage.getItem("profile.name");
    if (storedName) {
      setGreeting(`Hello ${storedName}.`);
    }
    localStorage.removeItem("ui.lastPlanet");
  }, []);

  const textToRead = "Enable a new era of human space exploration! NASA has been performing biology experiments in space for decades, generating a tremendous amount of information that will need to be considered as humans prepare to revisit the Moon and explore Mars. Although this knowledge is publicly available, it can be difficult for potential users to find information that pertains to their specific interests. Your challenge is to build a dynamic dashboard that leverages artificial intelligence (AI), knowledge graphs, and/or other tools to summarize a set of NASA bioscience publications and enables users to explore the impacts and results of the experiments these publications describe. (Earth Science Division)";

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
      <section className="glass" style={{ marginTop: 24, padding: "24px" }}>
        <p style={{ lineHeight: 1.6 }}>
          {textToRead}
        </p>
        <TTSButton text={textToRead} />
      </section>
    </>
    
  );
}

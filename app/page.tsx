"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
  const [greeting, setGreeting] = useState("Hello Commander.");
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  useEffect(() => {
    const storedName = localStorage.getItem("profile.name");
    if (storedName) {
      setGreeting(`Hello ${storedName}.`);
    }
    // Remove localStorage key from the reverted feature
    localStorage.removeItem("ui.lastPlanet");
  }, []);

  const handleExplore = () => {
    if (searchTerm.trim().toLowerCase() === "planets") {
      router.push('/planets');
    } else {
      router.push('/missions');
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleExplore();
    }
  };

  return (
    <main className="main">
      <section className="glass hero">
        <div>
          <h1 className="h1">{greeting}</h1>
          <p>What would you like to learn?</p>
          <div style={{ marginTop: 16, display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <input
              aria-label="Search"
              placeholder="Search…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              style={{ padding: "12px 14px", minWidth: 260, borderRadius: 12, border: "1px solid rgba(255,255,255,.18)", background: "rgba(255,255,255,.06)", color: "var(--txt)" }}
            />
            <button onClick={handleExplore} className="btn">Explore</button>
          </div>
        </div>
      </section>
    </main>
  );
}

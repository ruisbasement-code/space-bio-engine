"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";


type Profile = "kid" | "student" | "professional";

export default function KidClientPage() {
  const router = useRouter();
  const sp = useSearchParams();
  const [ready, setReady] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);

  const qp = useMemo(() => {
    const planet = (sp?.get("planet") || "").toLowerCase();
    const prof = (sp?.get("profile") || "").toLowerCase();
    return { planet, prof };
  }, [sp]);

  useEffect(() => {
    const stored =
      (localStorage.getItem("level") || localStorage.getItem("role") || "student").toLowerCase();

    const desired: Profile =
      stored === "kid" || stored === "student" || stored === "professional"
        ? (stored as Profile)
        : "student";

    let planet = qp.planet || "mars";
    let urlProf: Profile =
      qp.prof === "kid" || qp.prof === "student" || qp.prof === "professional"
        ? (qp.prof as Profile)
        : "kid";

    if (planet !== "mars") {
      setProfile(desired);
      setReady(true);
      return;
    }

    // If URL param doesn't match saved Level, force-correct the URL
    if (urlProf !== desired) {
      const url = `/venus/kid?planet=mars&profile=${desired}`;
      window.location.replace(url); // hard correct (no history entry)
      return;
    }

    setProfile(desired);
    setReady(true);
  }, [qp.planet, qp.prof]);

  if (!ready || !profile) return null;

  return (
    <main className="min-h-screen w-full bg-transparent text-slate-200 flex items-center justify-center">
      <section className="w-full max-w-6xl rounded-2xl bg-white/5 backdrop-blur p-6 shadow-2xl ring-1 ring-white/10">
        <div className="grid grid-cols-12 gap-6 items-start">
          {/* LEFT: content */}
          <div className="col-span-12 md:col-span-6 lg:col-span-5">
            {profile === 'student' && <Header profile={profile} />}
            {profile === "kid" && <KidContent />}
            {profile === "student" && <StudentContent />}
            {profile === "professional" && <ProContent />}

            <div className="mt-4 flex gap-2">
              <button
                onClick={() => router.push('/planets')}
                className="px-4 py-2 rounded-xl bg-white/10 ring-1 ring-white/15 hover:bg-white/15 text-sm"
              >
                Back to Planets
              </button>
              <button
                onClick={() => router.push('/')}
                className="px-4 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-semibold text-sm"
              >
                Finish Mission
              </button>
            </div>

            <p className="mt-3 text-[10.5px] text-slate-400">
              Based on NASA Task Book: Impact of Space Radiation & Simulated Microgravity on Plant
              Root Microbiomes (TASKID 16169)
            </p>
          </div>

          {/* RIGHT placeholder for future images */}
          <div className="hidden md:block md:col-span-6 lg:col-span-7" />
        </div>
      </section>
    </main>
  );
}

/* ---------- UI + Content ---------- */
function Header({ profile }: { profile: Profile }) {
  const title =
    profile === "kid"
      ? "Mars — Space Plants (Kid)"
      : profile === "student"
      ? "Mars — Root Microbiomes in Space (Student)"
      : "Mars — GCR × Simulated Microgravity Rhizosphere Study (Pro)";
  return (
    <div className="flex items-center gap-3 mb-2">
      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-orange-400/80 to-red-700/80 ring-1 ring-white/20" />
      <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">{title}</h1>
    </div>
  );
}

/* Keep your existing content blocks; included here for completeness */
function KidContent() {
  return (
<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'left', maxWidth: '850px', margin: '0 auto', color: 'white' }}>
  <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '1rem' }}>
    Mars — Growing Plants in Space (Kid)
  </h1>

  <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '1.2rem' }}>
    NASA wants to learn how <b>plants</b> and their tiny <b>helper germs</b> can grow in space! 🌱
    These germs help roots stay strong and make food for the plants.
    But in space, there’s <b>no gravity</b> and a lot of <b>space rays</b> that could bother them.
  </p>

  <img src="/plants_in_space.png" alt="Astronaut planting in space" style={{ width: '200px', borderRadius: '12px', marginBottom: '1.5rem' }} />

  <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '1.2rem' }}>
    Scientists use a small plant called <b>Arabidopsis</b> 🌿 to test how roots grow when they get
    “space-like” radiation. They also spin the plants in a <b>clinostat</b> to pretend there’s no gravity!
    This helps NASA see how plants act in space before sending them to Mars.
  </p>

  <img src="/mars_garden_setup.png" alt="Space garden setup" style={{ width: '230px', borderRadius: '12px', marginBottom: '1.5rem' }} />

  <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '1.2rem' }}>
    The goal is to help astronauts grow <b>fresh food</b> on Mars 🍅 and keep their
    plants and roots happy, even when space rays try to cause trouble!
  </p>

  <img src="/helper_germs.png" alt="Good and bad germs" style={{ width: '180px', borderRadius: '12px', marginBottom: '1.5rem' }} />

  <p style={{ fontSize: '1rem', marginTop: '0.5rem' }}>
    <i>Based on NASA Task Book: Impact of Space Radiation & Simulated Microgravity on Plant Root Microbiomes (TASKID 16169)</i>
  </p>
</div>
  );
}

function StudentContent() {
  return (
    <div className="space-y-3 text-[15px] leading-relaxed text-slate-200/90">
      <p>
        Plants support food/air/water cycles. Their <b>root microbiome</b> aids nutrients and
        disease resistance. Deep space brings <b>GCR radiation</b> and <b>microgravity</b> that may
        cause <b>dysbiosis</b>, reducing yield.
      </p>
      <ul className="list-disc list-inside space-y-1">
        <li><b>Model:</b> <i>Arabidopsis thaliana</i> + <b>188-strain SynCom</b></li>
        <li><b>Radiation:</b> total <b>0.75 Gy</b> simulated GCR (NSRL)</li>
        <li><b>Aim 1:</b> <b>single</b> vs <b>fractionated</b> dosing → diversity & function</li>
        <li><b>Aim 2:</b> radiation <b>± clinostat μg</b> → interaction effects</li>
        <li><b>Measures:</b> α/β-diversity, taxonomic shifts, functions (nutrients, growth promotion, pathogen suppression), plant performance</li>
        <li><b>Why:</b> manage microbiomes to protect reliable space crops</li>
      </ul>
    </div>
  );
}

function ProContent() {
  return (
<div className="professional-content" style={{ maxWidth: "900px", margin: "0 auto", color: "white" }}>
  
  <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
    Impact of Space Radiation and Simulated Microgravity on Plant Root Microbiomes
  </h1>

  <p>
    This investigation explores how <strong>ionizing radiation</strong> and
    <strong> microgravity</strong> together influence plant–microbe systems in deep space.
    The study focuses on whether exposure to <strong>galactic cosmic rays (GCRs)</strong>
    disrupts the root microbial ecosystem, potentially altering microbial diversity,
    nutrient cycling, and crop yield—critical factors for sustaining long-duration
    space missions.
  </p>

  {/* Microbiome diagram — placed near the methods section */}
  <div style={{ textAlign: "center", margin: "15px 0" }}>
    <img
      src="/Microbiome picture.png"
      alt="Microbiome Interaction Diagram"
      style={{ width: "220px", borderRadius: "10px", boxShadow: "0 0 10px rgba(255,255,255,0.1)" }}
    />
    <p style={{ fontSize: "0.85rem", color: "#ccc", marginTop: "4px" }}>
      Fig. 1. Schematic representation of cosmic radiation and clinostat microgravity effects
      on Arabidopsis root microbiome.
    </p>
  </div>

  <p>
    The research uses <em>Arabidopsis thaliana</em> inoculated with a
    <strong> synthetic community of 188 bacterial species</strong> representing
    natural soil diversity. Plants are exposed to simulated cosmic radiation doses
    of <strong>0.75 Gy</strong> at the <strong>NASA Space Radiation Laboratory</strong>,
    both as single and fractionated exposures, and paired with simulated microgravity
    via a 1-D clinostat. The combined design allows assessment of dose-rate dependence
    and synergistic stress responses.
  </p>

  {/* Experimental setup diagram */}
  <div style={{ float: "right", margin: "10px 0 10px 20px", textAlign: "center" }}>
    <img
      src="/diagramofsetup.png"
      alt="Experimental Setup Diagram"
      style={{ width: "240px", borderRadius: "8px", boxShadow: "0 0 10px rgba(255,255,255,0.1)" }}
    />
    <p style={{ fontSize: "0.85rem", color: "#ccc", marginTop: "4px" }}>
      Fig. 2. Experimental layout for simulated microgravity and GCR exposure at NSRL.
    </p>
  </div>

  <p>
    Data from these studies reveal that high-dose radiation decreases microbial
    diversity within the rhizosphere while increasing stress-related gene expression
    in plant roots. When combined with microgravity, these effects amplify,
    leading to measurable declines in root health and nutrient exchange efficiency.
    Such findings indicate that <strong>microbial imbalance</strong> could significantly
    threaten bioregenerative life support systems used for space farming.
  </p>

  <p>
    The interdisciplinary research team—spanning expertise in
    <strong> radiation biology</strong>, <strong>plant microbiome ecology</strong>, and
    <strong> spaceflight simulation</strong>—is mapping the key dose thresholds and
    microbial species most sensitive to GCRs. Their findings will inform engineering
    of <strong>resilient plant–microbe partnerships</strong> and microbial shielding
    strategies to maintain <strong>sustainable crop systems</strong> on Mars and beyond.
  </p>

  <p style={{ fontSize: "0.9rem", color: "#bbb", marginTop: "25px" }}>
    Based on NASA Task Book: <em>Impact of Space Radiation & Simulated Microgravity
    on Plant Root Microbiomes (TASKID 16169)</em>.
  </p>
</div>
  );
}
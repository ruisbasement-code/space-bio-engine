"use client";
import React, { useEffect, useMemo, useState } from "react";

/** Inline renderer that does NOT change routes.
 *  It only renders when planet === "mars".
 */
export default function MarsRoleTemplateInline() {
  const params = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
  const planet = params.get("planet");
  if (!planet || planet.toLowerCase() !== "mars") return null;
  return <MarsRoleTemplate />;
}

/* ----------------- Role-aware page body ----------------- */
function MarsRoleTemplate() {
  const [role, setRole] = useState<"Kid" | "Student" | "Professional">("Student");

  useEffect(() => {
    const r = (typeof window !== "undefined" && localStorage.getItem("role")) || "";
    if (r === "Kid" || r === "Student" || r === "Professional") setRole(r);
  }, []);

  const content = useMemo(() => getContent(role), [role]);

  return (
    <section className="mt-10 w-full max-w-6xl mx-auto rounded-3xl bg-white/5 backdrop-blur p-8 shadow-2xl ring-1 ring-white/10 text-slate-200">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          Mars: <span className="opacity-90">{content.title}</span>
        </h1>
        <span className="text-xs px-2 py-1 rounded-full bg-white/10 ring-1 ring-white/15">Role: {role}</span>
      </div>

      {content.leads.map((p, i) => (
        <p key={i} className={
          "mt-5 leading-relaxed text-slate-200/90 " + (role==="Kid" ? "text-lg" : role==="Student" ? "text-[17px]" : "text-[15.5px]")
        }>
          {p}
        </p>
      ))}

      <div className="mt-8 grid gap-6 grid-cols-1 md:grid-cols-2">
        {content.figures.map((Fig, i) => (
          <figure key={i} className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-4">
            <div className="min-h-[12rem] md:min-h-[14rem] flex items-center justify-center">
              <Fig />
            </div>
            {content.captions?.[i] && (
              <figcaption className="mt-2 text-xs text-slate-300/80">{content.captions[i]}</figcaption>
            )}
          </figure>
        ))}
      </div>

      {content.details && (
        <div className="mt-8 rounded-2xl bg-white/5 ring-1 ring-white/10 p-5">
          <h2 className="text-lg md:text-xl font-semibold mb-3">{content.details.heading}</h2>
          <ul className="space-y-2 list-disc list-inside text-slate-200/90">
            {content.details.items.map((li, idx) => (<li key={idx}>{li}</li>))}
          </ul>
        </div>
      )}

      <div className="mt-8 flex gap-4">
        <button className="px-5 py-3 rounded-2xl bg-white/10 ring-1 ring-white/15 hover:bg-white/15 transition" onClick={()=>window.history.back()}>Back to Planets</button>
        <button className="px-6 py-3 rounded-2xl bg-indigo-500 text-white font-semibold hover:bg-indigo-400 transition shadow-lg" onClick={()=>alert("Mission complete!")}>Finish Mission</button>
      </div>

      <p className="mt-6 text-xs text-slate-400">
        Source: NASA Task Book – Determining the Impact of Space Radiation and Simulated Microgravity on Plant Root Microbial Community Composition and Function (TASKID 16169).
      </p>
    </section>
  );
}

/* ----------------- Content per role (hard-coded) ----------------- */
function getContent(role: "Kid" | "Student" | "Professional") {
  if (role === "Kid") {
    return {
      title: "Space Plants & Their Root Helpers",
      leads: [
        "Plants have tiny helpers around their roots called the microbiome. Space rays and super-low gravity might bother these helpers.",
      ],
      figures: [KidMarsPicture, KidSimpleBar],
      captions: ["Mars + space plant idea", "Good helpers before vs after rays (simple)"],
    };
  }
  if (role === "Student") {
    return {
      title: "Rhizosphere Health in Space",
      leads: [
        "For long missions, plants support food, air refresh, and water cycling. This study asks if simulated galactic-cosmic-ray radiation and microgravity disturb the root microbiome (dysbiosis), reducing yield.",
        "Model: Arabidopsis with a 188-strain synthetic community. Total dose 0.75 Gy as single exposure or fractionated across days; another arm adds simulated microgravity (clinostat).",
      ],
      figures: [StudentDiversityBars, StudentTimecourseLine, StudentStackedFunctions],
      captions: [
        "Shannon diversity: Single vs Fractionated (0.75 Gy total)",
        "Community change over time: radiation vs radiation + sim-µg",
        "Functional balance (nutrient aid / defense / other) schematic",
      ],
      details: {
        heading: "Why it matters",
        items: [
          "Dose-rate: does spreading the same dose change outcomes?",
          "Watch for pathogen bloom and loss of beneficial functions.",
          "Insights guide microbiome protection for Mars greenhouses.",
        ],
      },
    };
  }
  return {
    title: "GCR × Sim-µg Rhizosphere Dysbiosis",
    leads: [
      "Hypothesis: mission-relevant simulated GCR (0.75 Gy cumulative) plus simulated microgravity promotes rhizosphere dysbiosis, degrading nutrient mobilization, growth promotion, and pathogen suppression.",
      "Design: Arabidopsis + 188-member SynCom; NSRL exposures compare single-fraction vs fractionated dosing; a 1-D clinostat introduces µg analog. Endpoints include α/β-diversity, compositional shifts, and functional readouts under bioregenerative life support for ~0.75 Sv Mars missions.",
      "Risk: dysbiosis with opportunistic pathogen over-representation could constrain closed-loop yield; countermeasures include shielding, substrate engineering, and microbiome management.",
    ],
    figures: [ProMultiSeriesLine, ProOrdinationScatterAxes],
    captions: [
      "Dose-rate × environment: multi-series timecourse (schematic)",
      "β-diversity ordination with axes & centroids",
    ],
    details: {
      heading: "Study notes",
      items: [
        "Facility: NSRL high-energy beams; µg analog via clinostat.",
        "Arms: (i) 0.75 Gy single vs fractionated; (ii) radiation × sim-µg interaction.",
        "Outcomes inform reliability of plant-based life support on Mars missions.",
      ],
    },
  };
}

/* ----------------- Inline SVG visuals ----------------- */
// Kid
function KidMarsPicture(){return(<svg viewBox="0 0 280 160" className="w-full h-full"><title>Mars with a sprouting plant</title><defs><radialGradient id="g1" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#ffb199"/><stop offset="100%" stopColor="#d16363"/></radialGradient></defs><circle cx="70" cy="80" r="55" fill="url(#g1)"/><circle cx="50" cy="65" r="7" fill="#b74f4f"/><circle cx="92" cy="98" r="9" fill="#b74f4f"/><g transform="translate(180,95)"><rect x="-10" y="20" width="22" height="16" fill="#6b8e23" rx="3"/><path d="M0,20 C0,-5 22,-10 32,-22" stroke="#6b8e23" strokeWidth="4" fill="none"/><circle cx="32" cy="-22" r="7" fill="#8fbc8f"/></g></svg>);}
function KidSimpleBar(){return(<svg viewBox="0 0 320 170" className="w-full h-full"><title>Helpers before vs after rays</title><text x="10" y="18" fill="#cbd5e1" fontSize="14">Helpers before vs after rays</text><line x1="30" y1="140" x2="300" y2="140" stroke="#475569"/><rect x="60" y="60" width="70" height="80" rx="6" fill="#94a3b8"/><text x="78" y="158" fill="#94a3b8">Before</text><rect x="180" y="85" width="70" height="55" rx="6" fill="#64748b"/><text x="200" y="158" fill="#94a3b8">After</text></svg>);}

// Student
function StudentDiversityBars(){return(<svg viewBox="0 0 360 180" className="w-full h-full"><title>Shannon diversity: Single vs Fractionated</title><text x="10" y="18" fill="#cbd5e1" fontSize="13">Shannon diversity: Single vs Fractionated (0.75 Gy)</text><line x1="40" y1="150" x2="330" y2="150" stroke="#475569"/><rect x="80" y="70" width="50" height="80" fill="#94a3b8" rx="4"/><text x="78" y="165" fill="#94a3b8" fontSize="12">Single</text><rect x="190" y="50" width="50" height="100" fill="#64748b" rx="4"/><text x="178" y="165" fill="#94a3b8" fontSize="12">Fractionated</text></svg>);}
function StudentTimecourseLine(){return(<svg viewBox="0 0 360 180" className="w-full h-full"><title>Community change over time</title><text x="10" y="18" fill="#cbd5e1" fontSize="13">Community change over time</text><polyline points="40,140 90,120 140,106 190,95 240,88 290,82" fill="none" stroke="#94a3b8" strokeWidth="3"/><polyline points="40,140 90,130 140,125 190,120 240,115 290,110" fill="none" stroke="#64748b" strokeWidth="3"/><text x="210" y="35" fill="#94a3b8" fontSize="12">Radiation</text><text x="210" y="52" fill="#64748b" fontSize="12">Radiation + sim-µg</text></svg>);}
function StudentStackedFunctions(){return(<svg viewBox="0 0 360 180" className="w-full h-full"><title>Functional balance schematic</title><text x="10" y="18" fill="#cbd5e1" fontSize="13">Functional balance (arb. units)</text>{[70,200].map((x,i)=>(<g key={i}><rect x={x} y="60" width="40" height="30" fill="#94a3b8"/><rect x={x} y="90" width="40" height="25" fill="#7b90a8"/><rect x={x} y="115" width="40" height="25" fill="#64748b"/></g>))}<text x="58" y="165" fill="#94a3b8" fontSize="12">Radiation</text><text x="188" y="165" fill="#94a3b8" fontSize="12">Rad + µg</text></svg>);}

// Professional
function ProMultiSeriesLine(){return(<svg viewBox="0 0 380 200" className="w-full h-full"><title>Dose-rate × environment interaction</title><text x="10" y="18" fill="#cbd5e1" fontSize="12.5">Multi-series timecourse: Single vs Fractionated × (Radiation±µg)</text><line x1="40" y1="170" x2="340" y2="170" stroke="#475569"/><line x1="40" y1="170" x2="40" y2="40" stroke="#475569"/><polyline points="40,160 90,132 140,118 190,100 240,92 290,85" fill="none" stroke="#94a3b8" strokeWidth="2.5"/><polyline points="40,160 90,140 140,130 190,124 240,120 290,116" fill="none" stroke="#64748b" strokeWidth="2.5"/><polyline points="40,160 90,136 140,120 190,110 240,104 290,98" fill="none" stroke="#a3bffa" strokeWidth="2.5" strokeDasharray="5 4"/><polyline points="40,160 90,148 140,138 190,132 240,128 290,124" fill="none" stroke="#cbd5e1" strokeWidth="2.5" strokeDasharray="5 4"/>{[90,140,190,240,290].map((x,i)=>(<g key={i}><circle cx={x} cy={132 - i*8} r="3" fill="#94a3b8"/><rect x={x-3} y={140 - i*6} width="6" height="6" fill="#64748b"/></g>))}<text x="200" y="38" fill="#94a3b8" fontSize="11">Single + Rad</text><text x="200" y="52" fill="#64748b" fontSize="11">Single + Rad+µg</text><text x="200" y="66" fill="#a3bffa" fontSize="11">Frac + Rad</text><text x="200" y="80" fill="#cbd5e1" fontSize="11">Frac + Rad+µg</text></svg>);}
function ProOrdinationScatterAxes(){return(<svg viewBox="0 0 380 200" className="w-full h-full"><title>β-diversity ordination</title><line x1="40" y1="160" x2="340" y2="160" stroke="#475569"/><line x1="40" y1="160" x2="40" y2="40" stroke="#475569"/><text x="345" y="163" fill="#cbd5e1" fontSize="10">PC1</text><text x="28" y="44" fill="#cbd5e1" fontSize="10">PC2</text><ellipse cx="120" cy="110" rx="40" ry="22" fill="#94a3b8" opacity="0.25"/><ellipse cx="250" cy="90" rx="40" ry="22" fill="#64748b" opacity="0.25"/>{[[100,100],[115,115],[130,105],[140,118]].map(([x,y],i)=>(<circle key={i} cx={x} cy={y} r="4" fill="#94a3b8"/>))}{[[230,80],[245,95],[260,87],[270,100]].map(([x,y],i)=>(<circle key={i} cx={x} cy={y} r="4" fill="#64748b"/>))}<circle cx="120" cy="110" r="5" fill="#94a3b8"/><rect x="247" y="87" width="8" height="8" fill="#64748b"/><text x="85" y="180" fill="#94a3b8" fontSize="11">GCR only</text><text x="215" y="180" fill="#94a3b8" fontSize="11">GCR + sim-µg</text></svg>);}
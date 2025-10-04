import BootstrapScript from "./BootstrapScript";

export default function StudentPage(){
  return (
    <main className="main row">
      <article className="glass">
        <h2 id="page-title" className="h1">Atmospheric Composition and Surface Conditions of Venus</h2>
        <p><em>Vladimir A. Venerovsky — Department of Planetary Science</em></p>
        <h3>Abstract</h3>
        <p id="abstract-text">Carbon dioxide ~96% defines greenhouse dynamics and surface temperature; sulfuric clouds and low O₂ constrain habitability. We summarize pressure–temperature profiles and implications for biology in microgravity experiments.</p>
        <div className="figure">Graph 1 (diagram)</div>
        <div className="template-footer">
          <button id="back-btn" className="btn">Back to Planets</button>
          <a id="finish-btn" className="btn btn--primary" href="#">Finish Mission</a>
        </div>
      </article>
      <aside id="notes-hint" className="glass note">Notes panel</aside>
      <BootstrapScript />
    </main>
  );
}
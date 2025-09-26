import Go from "../../_client/Go";

export default function StudentPage(){
  return (
    <main className="main row">
      <article className="glass">
        <h2 className="h1">Atmospheric Composition and Surface Conditions of Venus</h2>
        <p><em>Vladimir A. Venerovsky — Department of Planetary Science</em></p>
        <h3>Abstract</h3>
        <p>Carbon dioxide ~96% defines greenhouse dynamics and surface temperature; sulfuric clouds and low O₂ constrain habitability. We summarize pressure–temperature profiles and implications for biology in microgravity experiments.</p>
        <div className="figure">Graph 1 (diagram)</div>
        <div className="stack" style={{marginTop:14}}>
          <Go to="/venus/kid">Back to Kid</Go>
          <Go to="/venus/pro">Next → Professionals</Go>
        </div>
      </article>
      <aside className="glass note">Notes panel</aside>
    </main>
  );
}
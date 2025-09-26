import Go from "../../_client/Go";

export default function ProPage(){
  return (
    <main className="main">
      <article className="glass">
        <h2 className="h1">Atmospheric Composition and Surface Conditions of Venus</h2>
        <div className="col2">
          <p>Dense, peer-style text block… include citation placeholders, radiative transfer notes, and instrument models.</p>
          <p>Additional paragraph… boundary layer, super-rotation, sulfuric aerosol microphysics, implications for in-situ bioproduction systems.</p>
        </div>
        <div className="stack" style={{marginTop:14}}>
          <div className="figure" style={{flex:1}}>Figure 1</div>
          <div className="figure" style={{flex:1}}>Figure 2</div>
        </div>
        <div className="stack" style={{marginTop:16}}>
          <Go to="/venus/student">Back to Student</Go>
          <Go to="/">Finish Mission</Go>
        </div>
      </article>
    </main>
  );
}
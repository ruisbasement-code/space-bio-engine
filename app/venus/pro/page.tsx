import BootstrapScript from "./BootstrapScript";
import MarsRoleTemplateInline from "./MarsRoleTemplateInline";

export default function ProPage(){
  return (
    <main className="main">
      <article className="glass">
        <h2 id="page-title" className="h1">Atmospheric Composition and Surface Conditions of Venus</h2>
        <div className="col2">
          <p id="lead-left">Dense, peer-style text block… include citation placeholders, radiative transfer notes, and instrument models.</p>
          <p id="lead-right">Additional paragraph… boundary layer, super-rotation, sulfuric aerosol microphysics, implications for in-situ bioproduction systems.</p>
        </div>
        <div className="stack" style={{marginTop:14}}>
          <div className="figure" style={{flex:1}}>Figure 1</div>
          <div className="figure" style={{flex:1}}>Figure 2</div>
        </div>
        <div className="template-footer">
          <button id="back-btn" className="btn">Back to Planets</button>
          <a id="finish-btn" className="btn btn--primary" href="#">Finish Mission</a>
        </div>
      </article>
      <MarsRoleTemplateInline />
      <BootstrapScript />
    </main>
  );
}
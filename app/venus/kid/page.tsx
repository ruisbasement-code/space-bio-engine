import BootstrapScript from "./BootstrapScript";

export default function KidPage(){
  return (
    <main className="main">
      <article className="glass">
        <h2 id="page-title" className="h1">Atmospheric Composition and Surface Conditions of Venus</h2>
        <p id="summary-text">Summary: Venus has almost no oxygen in its air. Its thick CO₂ atmosphere traps heat, making it much hotter than Earth.</p>
        <div className="figure" style={{borderRadius:"50%"}}>Planet Image</div>
        <div id="question-text" className="note" style={{margin:"14px 0"}}><strong>Question:</strong> If Venus has so little oxygen, what would animals need to survive there?</div>
        <div className="stack">
          <div className="figure" style={{flex:1}}>Graph 1</div>
          <div className="figure" style={{flex:1}}>Graph 2</div>
        </div>
        <div className="template-footer">
          <button id="back-btn" className="btn">Back to Planets</button>
          <a id="finish-btn" className="btn btn--primary" href="#">Finish Mission</a>
        </div>
      </article>
      <BootstrapScript />
    </main>
  );
}
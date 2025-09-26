import Go from "../../_client/Go";

export default function KidPage(){
  return (
    <main className="main">
      <article className="glass">
        <h2 className="h1">Atmospheric Composition and Surface Conditions of Venus</h2>
        <p>Summary: Venus has almost no oxygen in its air. Its thick CO₂ atmosphere traps heat, making it much hotter than Earth.</p>
        <div className="figure" style={{borderRadius:"50%"}}>Planet Image</div>
        <div className="note" style={{margin:"14px 0"}}><strong>Question:</strong> If Venus has so little oxygen, what would animals need to survive there?</div>
        <div className="stack">
          <div className="figure" style={{flex:1}}>Graph 1</div>
          <div className="figure" style={{flex:1}}>Graph 2</div>
        </div>
        <div className="stack" style={{marginTop:16}}>
          <Go to="/venus/layout">Back</Go>
          <Go to="/venus/student">Next → Student Research</Go>
        </div>
      </article>
    </main>
  );
}
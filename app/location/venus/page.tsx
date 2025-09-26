import Go from "../../_client/Go";

export default function VenusLanding(){
  return (
    <main className="main">
      <section className="glass hero">
        <div>
          <div style={{fontSize:12, opacity:.8, letterSpacing:6}}>NEXT</div>
          <h1 className="h1" style={{letterSpacing:6}}>VENUS</h1>
          <p>Thick atmosphere, crushing pressure, scorching temps. Proceed with caution.</p>
          <div className="stack" style={{justifyContent:"center", marginTop:16}}>
            <Go to="/venus/layout">NEXT</Go>
            <Go to="/venus/kid">LAND</Go>
          </div>
        </div>
      </section>
    </main>
  );
}
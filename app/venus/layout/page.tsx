import Go from "../../_client/Go";

export default function VenusLayout(){
  return (
    <main className="main row">
      <section className="glass">
        <h2 className="h1">VENUS — Overview</h2>
        <div className="figure">Planet Thumbnail</div>
        <ul>
          <li>Day length: 243 Earth days</li>
          <li>Atmosphere: CO₂, N₂; very little O₂</li>
          <li>Surface: ~465°C; high pressure</li>
        </ul>
        <Go to="/venus/kid">Continue</Go>
      </section>
      <aside className="glass note">Notes: swap in higher-res art later.</aside>
    </main>
  );
}
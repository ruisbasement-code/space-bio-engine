import Go from "../_client/Go";

export default function Missions(){
  return (
    <main className="main">
      <section className="glass">
        <h2 className="h1">Mission List</h2>
        <ul>
          <li>Explain how microbes can make medicines, plastics, and materials in space.</li>
          <li>Connect biology in space with sustainability and capability on Earth.</li>
          <li>Present the information in the most digestible way possible.</li>
        </ul>
        <div style={{marginTop:14}}><Go to="/location/venus">Start Mission</Go></div>
      </section>
    </main>
  );
}
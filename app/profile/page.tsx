import ProfileScript from "./ProfileScript";

export default function Profile(){
  return (
    <main className="main row">
      <section className="glass">
        <h2 className="h1">Profile Page</h2>
        <p>Select your role once and we’ll show the matching template everywhere.</p>
      </section>

      <section className="glass">
        <form id="profile-form" className="stack" style={{flexDirection:"column", alignItems:"stretch"}}>
          <label>Name
            <input id="name-input" name="username" placeholder="Boris"
              style={{padding:12, borderRadius:10, border:"1px solid rgba(255,255,255,.18)", background:"rgba(255,255,255,.06)", color:"var(--txt)"}}/>
          </label>

          <label>Age
            <input id="age-input" name="age" type="number" placeholder="14"
              style={{padding:12, borderRadius:10, border:"1px solid rgba(255,255,255,.18)", background:"rgba(255,255,255,.06)", color:"var(--txt)"}}/>
          </label>

          <label>Role
            <select id="role-select" name="role"
              style={{padding:12, borderRadius:10, background:"rgba(255,255,255,.06)", color:"var(--txt)"}}>
              <option>Kid</option>
              <option>Student</option>
              <option>Professional</option>
            </select>
          </label>

          <label>Interests
            <input id="interests-input" name="interests" placeholder="microgravity, plants"
              style={{padding:12, borderRadius:10, border:"1px solid rgba(255,255,255,.18)", background:"rgba(255,255,255,.06)", color:"var(--txt)"}}/>
          </label>

          <div className="stack" style={{marginTop:8}}>
            <button id="profile-save" className="btn">Save & Continue</button>
          </div>
        </form>
      </section>
      <ProfileScript />
    </main>
  );
}
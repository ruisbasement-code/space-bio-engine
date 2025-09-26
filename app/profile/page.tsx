"use client";
import Go from "../_client/Go";
import { useEduLevel, Level } from "../_client/useEduLevel";
import { useRouter } from "next/navigation";

export default function Profile(){
  const [level, setLevel] = useEduLevel();
  const router = useRouter();

  const onSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const usernameInput = e.currentTarget.elements.namedItem("username") as HTMLInputElement;
    if (usernameInput && usernameInput.value) {
      localStorage.setItem("profile.name", usernameInput.value);
    }
    router.push("/");
  };

  return (
    <main className="main row">
      <section className="glass">
        <h2 className="h1">Profile Page</h2>
        <p>Select your role once and we’ll show the matching template everywhere.</p>
      </section>

      <section className="glass">
        <form className="stack" style={{flexDirection:"column", alignItems:"stretch"}} onSubmit={onSave}>
          <label>Name
            <input id="username" name="username" placeholder="Boris"
              style={{padding:12, borderRadius:10, border:"1px solid rgba(255,255,255,.18)", background:"rgba(255,255,255,.06)", color:"var(--txt)"}}/>
          </label>

          <label>Age
            <input id="age" name="age" type="number" placeholder="14"
              style={{padding:12, borderRadius:10, border:"1px solid rgba(255,255,255,.18)", background:"rgba(255,255,255,.06)", color:"var(--txt)"}}/>
          </label>

          <label>Role
            <select id="role" name="role" value={level}
              onChange={(e)=>setLevel(e.target.value as Level)}
              style={{padding:12, borderRadius:10, background:"rgba(255,255,255,.06)", color:"var(--txt)"}}>
              <option>Kid</option>
              <option>Student</option>
              <option>Professional</option>
            </select>
          </label>

          <label>Interests
            <input id="interests" name="interests" placeholder="microgravity, plants"
              style={{padding:12, borderRadius:10, border:"1px solid rgba(255,255,255,.18)", background:"rgba(255,255,255,.06)", color:"var(--txt)"}}/>
          </label>

          <div className="stack" style={{marginTop:8}}>
            <button className="btn" type="submit">Save & Continue</button>
          </div>
        </form>
      </section>
    </main>
  );
}
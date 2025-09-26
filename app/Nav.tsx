import Link from "next/link";
import ClientBadge from "./_client/LevelBadge";

export default function Nav(){
  return (
    <nav className="main" style={{display:"flex",justifyContent:"space-between",alignItems:"center",paddingTop:18}}>
      <Link className="link" href="/">Space Biology Knowledge Engine</Link>
      <div className="stack">
        <Link className="link" href="/profile">Profile</Link>
        <Link className="link" href="/missions">Missions</Link>
        <Link className="link" href="/location/venus">Location</Link>
        <Link className="link" href="/template">Template</Link>
        <ClientBadge />
      </div>
    </nav>
  );
}
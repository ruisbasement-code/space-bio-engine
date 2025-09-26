"use client";
import { useEduLevel } from "./useEduLevel";

export default function LevelBadge(){
  const [level] = useEduLevel();
  return (
    <span style={{
      padding:"6px 10px",
      borderRadius:999,
      border:"1px solid rgba(255,255,255,.25)",
      background:"rgba(255,255,255,.08)",
      fontSize:12
    }}>
      Level: {level}
    </span>
  );
}
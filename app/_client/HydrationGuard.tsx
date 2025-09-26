"use client";
import { useEffect, useState } from "react";
export default function HydrationGuard({children}:{children:React.ReactNode}){
  const [ready,setReady]=useState(false);
  useEffect(()=>{setReady(true)},[]);
  return ready
    ? <>{children}</>
    : <div style={{minHeight:"100vh",display:"grid",placeItems:"center",background:"#0b1020",color:"#fff"}}>Starting…</div>;
}
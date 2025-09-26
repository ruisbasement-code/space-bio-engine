"use client";
import { useRouter } from "next/navigation";
export default function Go({ to, children, className="" }: { to: string; children: React.ReactNode; className?: string }) {
  const r = useRouter();
  return <button className={`btn ${className}`} onClick={()=>r.push(to)}>{children}</button>;
}
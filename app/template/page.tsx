"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useEduLevel, routeForLevel } from "../_client/useEduLevel";

export default function TemplateRouter() {
  const router = useRouter();
  const [level] = useEduLevel();

  useEffect(() => {
    router.replace(routeForLevel(level));
  }, [level, router]);

  return (
    <div style={{ padding: 20 }}>
      Loading template for <strong>{level}</strong>…
    </div>
  );
}
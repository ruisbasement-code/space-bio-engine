"use client";
import { useEffect, useState } from "react";

export type Level = "Kid" | "Student" | "Professional";
const KEY = "eduLevel";
const isLevel = (v: unknown): v is Level =>
  v === "Kid" || v === "Student" || v === "Professional";

function read(): Level {
  if (typeof window === "undefined") return "Kid";
  const params = new URLSearchParams(window.location.search);
  const levelFromQuery = params.get('level');
  if (isLevel(levelFromQuery)) {
    return levelFromQuery;
  }
  const v = localStorage.getItem(KEY);
  return isLevel(v) ? v : "Kid";
}

/**
 * useEduLevel
 * - Persists level in localStorage
 * - Notifies ALL components in the same tab via a CustomEvent ("eduLevel")
 * - Also listens to cross-tab `storage` events
 */
export function useEduLevel(): [Level, (v: Level) => void] {
  const [level, setLevel] = useState<Level>(read);

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY && isLevel(e.newValue)) setLevel(e.newValue);
    };
    const onCustom = (e: Event) => {
      const v = (e as CustomEvent).detail;
      if (isLevel(v)) setLevel(v);
    };
    window.addEventListener("storage", onStorage);
    window.addEventListener("eduLevel", onCustom as EventListener);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("eduLevel", onCustom as EventListener);
    };
  }, []);

  const save = (v: Level) => {
    setLevel(v); // immediate in this component
    try {
      localStorage.setItem(KEY, v);
    } catch {}
    // notify same-tab listeners (e.g., LevelBadge in the navbar)
    try {
      window.dispatchEvent(new CustomEvent("eduLevel", { detail: v }));
    } catch {}
  };

  return [level, save];
}

export function routeForLevel(level: Level): string {
  switch (level) {
    case "Kid": return "/venus/kid";
    case "Student": return "/venus/student";
    case "Professional": return "/venus/pro";
    default: return "/venus/kid";
  }
}
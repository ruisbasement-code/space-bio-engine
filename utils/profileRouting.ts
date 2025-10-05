// utils/profileRouting.ts
export function nextUrlForMarsFromProfile(): string {
  // Read whichever your Profile saved; default to kid
  const raw =
    typeof window !== "undefined"
      ? (localStorage.getItem("level") || localStorage.getItem("role") || "kid")
      : "kid";

  const role = raw.toLowerCase();
  const profile =
    role === "kid" || role === "student" || role === "professional"
      ? role
      : "kid";

  // Keep your current route shape exactly:
  // /venus/kid?planet=mars&profile=<kid|student|professional>
  return `/venus/kid?planet=mars&profile=${profile}`;
}
export const dynamic = "force-dynamic";
export const revalidate = 0;

import KidClientPage from "./KidClientPage";

export default function Page() {
  // Server component wrapper (allowed to export route segment options)
  return <KidClientPage />;
}
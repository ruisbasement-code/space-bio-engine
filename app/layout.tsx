import "./globals.css";
import "./MainLayout.css";
import ErrorBoundary from "./_client/ErrorBoundary";
import HydrationGuard from "./_client/HydrationGuard";
import MainLayout from "./MainLayout";

export const metadata = { title: "Space Biology Knowledge Engine" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ErrorBoundary>
          <HydrationGuard>
            <MainLayout>{children}</MainLayout>
          </HydrationGuard>
        </ErrorBoundary>
        <script dangerouslySetInnerHTML={{__html: `
          window.onerror=(m,s,l,c,e)=>{document.body.innerHTML='<pre style="white-space:pre-wrap;color:#fff;background:#0b1020;padding:20px">'+((e&&e.stack)||m)+'</pre>'};
          window.onunhandledrejection=(e)=>{document.body.innerHTML='<pre style="white-space:pre-wrap;color:#fff;background:#0b1020;padding:20px">'+((e&&e.reason&&e.reason.stack)||e.reason)+'</pre>'};
          if('serviceWorker' in navigator){navigator.serviceWorker.getRegistrations?.().then(rs=>rs.forEach(r=>r.unregister()));}
        `}} />
      </body>
    </html>
  );
}

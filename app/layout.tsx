import "./globals.css";
import "./MainLayout.css";
import ErrorBoundary from "./_client/ErrorBoundary";
import HydrationGuard from "./_client/HydrationGuard";
import CoachFab from "./_client/CoachFab";
import MainLayout from "./MainLayout";
import ModalHardeningScript from "../components/ModalHardeningScript";
import PlanetModalScript from "../components/PlanetModalScript";
import Starfield from "../components/Starfield";
export const metadata = { title: "Space Biology Knowledge Engine" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Starfield />
        <ErrorBoundary>
          <HydrationGuard>
            <MainLayout>{children}</MainLayout>
          </HydrationGuard>
        </ErrorBoundary>
        <PlanetModalScript />
        <ModalHardeningScript />
        <script dangerouslySetInnerHTML={{__html: `
           window.onerror=(m,s,l,c,e)=>{document.body.innerHTML='<pre style="white-space:pre-wrap;color:#fff;background:#0b1020;padding:20px">'+((e&&e.stack)||m)+'</pre>'};
          window.onunhandledrejection=(e)=>{document.body.innerHTML='<pre style="white-space:pre-wrap;color:#fff;background:#0b1020;padding:20px">'+((e&&e.reason&&e.reason.stack)||e.reason)+'</pre>'};
          if('serviceWorker' in navigator){navigator.serviceWorker.getRegistrations?.().then(rs=>rs.forEach(r=>r.unregister()));}
        `}} />

        {/* Overlay */}
        <div id="planet-modal-overlay" className="overlay hidden"></div>

        {/* Dialog */}
        <div id="planet-modal" className="dialog hidden" role="dialog" aria-modal="true"
             aria-labelledby="planet-modal-title" aria-describedby="planet-modal-desc">
          <div className="dialog__header">
            <h2 id="planet-modal-title">Planet</h2>
            <button id="planet-modal-close" className="icon-btn" type="button" aria-label="Close">×</button>
          </div>
          <div className="dialog__body">
            <p id="planet-modal-desc">[preview text]</p>
          </div>
          <div className="dialog__footer">
            <button id="planet-modal-learn" className="btn btn--primary" type="button">Learn More</button>
            <button id="planet-modal-cancel" className="btn" type="button">Close</button>
          </div>
        </div>
       <CoachFab />
      </body>
    </html>
  );
}

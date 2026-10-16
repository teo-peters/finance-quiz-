"use client";

declare global { interface Window { googlefc?: { callbackQueue?: Array<() => void>; showRevocationMessage?: () => void }; } }

export function LegalFooter() {
  return <footer className="legal-footer">
    <span>© 2026 Finance Quiz</span>
    <nav aria-label="Rechtliche Informationen">
      <a href="/impressum/">Impressum</a>
      <a href="/datenschutz/">Datenschutz</a>
      <a href="/kontakt/">Kontakt</a>
      <a href="/datenschutz/#cookie-einstellungen" onClick={(event) => {
        const googlefc = typeof window !== "undefined" ? window.googlefc : undefined;
        if (googlefc?.showRevocationMessage && googlefc.callbackQueue) {
          event.preventDefault();
          googlefc.callbackQueue.push(googlefc.showRevocationMessage);
        }
      }}>Datenschutz- und Cookie-Einstellungen</a>
    </nav>
  </footer>;
}

import type { Metadata } from "next";
import { LegalFooter } from "../legal-footer";

export const metadata: Metadata = { title: "Impressum | Finance Quiz", description: "Anbieterkennzeichnung für finquiz.online." };

export default function Impressum() {
  return <main className="legal-shell" lang="de">
    <a className="legal-back" href="/">← Finance Quiz</a>
    <article className="legal-card">
      <p className="section-kicker">FINANCE QUIZ · RECHTLICHES</p>
      <h1>Impressum</h1>
      <h2>Angaben gemäß § 5 DDG</h2>
      <address>Teo Peters<br />Oberbilker Allee 265<br />40227 Düsseldorf<br />Deutschland</address>
      <h2>Kontakt</h2>
      <p>E-Mail: <a href="mailto:teo.peters@gmail.com">teo.peters@gmail.com</a><br />Telefon: <a href="tel:+4915202472153">+49 1520 2472153</a></p>
      <h2>Umsatzsteuer</h2>
      <p>Eine Umsatzsteuer-Identifikationsnummer ist nicht angegeben.</p>
      <h2>Verantwortlich für den Inhalt</h2>
      <p>Teo Peters, Anschrift wie oben.</p>
      <h2>Hinweis zum Betreiberstatus</h2>
      <p>Die Website wird von einer Privatperson betrieben. Eine Werbemonetarisierung durch Google AdSense ist geplant, derzeit jedoch nicht eingebunden. Mit Beginn einer dauerhaften Werbemonetarisierung ist § 5 DDG voraussichtlich einschlägig, auch wenn der Betreiber eine natürliche Person ist; die konkrete Einordnung und mögliche weitere Anbieterpflichten sind im Einzelfall zu prüfen. Falls eine Umsatzsteuer-Identifikationsnummer erteilt wird oder weitere gesetzlich erforderliche Angaben hinzukommen, wird diese Seite ergänzt.</p>
      <p>Die Pflicht zur Benennung einer verantwortlichen Person nach § 18 Abs. 2 MStV besteht nur, soweit journalistisch-redaktionell gestaltete Angebote vorliegen. Ob einzelne Inhalte dieser Website darunter fallen, ist im konkreten Betrieb zu prüfen.</p>
      <p className="legal-note">Bitte prüfen Sie vor Veröffentlichung insbesondere, ob die angegebene Anschrift die ladungsfähige Anschrift ist und ob durch Werbung, weitere Angebote oder eine spätere unternehmerische Tätigkeit zusätzliche Angaben nötig werden. Dieses Impressum ist ein sorgfältiger Entwurf, keine Rechtsberatung.</p>
    </article>
    <LegalFooter />
  </main>;
}

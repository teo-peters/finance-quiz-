import type { Metadata } from "next";
import { LegalFooter } from "../legal-footer";

export const metadata: Metadata = { title: "Datenschutzerklärung | Finance Quiz", description: "Informationen zur Verarbeitung personenbezogener Daten bei finquiz.online." };

export default function Datenschutz() {
  return <main className="legal-shell" lang="de">
    <a className="legal-back" href="/">← Finance Quiz</a>
    <article className="legal-card">
      <p className="section-kicker">FINANCE QUIZ · DATENSCHUTZ</p>
      <h1>Datenschutzerklärung</h1>
      <p>Stand: 16. Oktober 2026</p>
      <h2>1. Verantwortlicher</h2>
      <p>Teo Peters, Oberbilker Allee 265, 40227 Düsseldorf, Deutschland. Kontakt: <a href="mailto:teo.peters@gmail.com">teo.peters@gmail.com</a>, Telefon <a href="tel:+4915202472153">+49 1520 2472153</a>.</p>
      <h2>2. Hosting und Zugriffsdaten</h2>
      <p>Die Website ist für die Bereitstellung über Cloudflare Pages als statischer Export eingerichtet. Beim Aufruf werden technisch erforderliche Verbindungsdaten verarbeitet, etwa IP-Adresse, Zeitpunkt, angeforderte Ressource, übertragene Datenmenge sowie Browser- und Geräteinformationen. Cloudflare kann diese Daten zur Auslieferung, Stabilität und Abwehr von Angriffen verarbeiten. Die konkrete Speicherdauer, eingesetzte Protokollierung, Region und etwaige Drittlandübermittlungen hängen von der Cloudflare-Konfiguration und den geltenden Vertragsbedingungen ab und müssen vom Betreiber im Cloudflare-Konto bestätigt werden. Rechtsgrundlage ist, soweit einschlägig, Art. 6 Abs. 1 lit. f DSGVO (sicherer und funktionsfähiger Betrieb).</p>
      <h2>3. Schriftarten</h2>
      <p>Die Gestaltung lädt DM Sans und Manrope über Google Fonts von Google-Servern. Dabei erhält Google beim Laden mindestens die IP-Adresse und technische Browserdaten. Rechtsgrundlage ist derzeit Art. 6 Abs. 1 lit. f DSGVO (einheitliche und lesbare Darstellung); eine lokale Bereitstellung der Schriftdateien würde die Übermittlung vermeiden und sollte vor dem öffentlichen Start erwogen werden. Mögliche Drittlandübermittlungen und Googles konkrete Aufbewahrung hängen vom Abruf und den aktuellen Google-Bedingungen ab.</p>
      <h2>4. Quiz und lokale Speicherung</h2>
      <p>Die Quizfunktion verarbeitet Antworten und Punktestand nur im Arbeitsspeicher des Browsers. Die gewählte Sprache wird im Browser unter dem Schlüssel <code>finance-quiz-language</code> in <code>localStorage</code> gespeichert und bei späteren Besuchen wieder gelesen. Diese Speicherung dient der vom Nutzer gewünschten Spracheinstellung. Es werden derzeit keine Analyse- oder Tracking-Dienste eingebunden.</p>
      <h2>5. Kontaktanfragen</h2>
      <p>Bei Nutzung des Kontaktformulars werden Name, E-Mail-Adresse, Betreff und Nachricht zur Bearbeitung der Anfrage verarbeitet. Die Angaben werden an den Betreiber und – erst nach Konfiguration des Versanddienstes – an den eingesetzten E-Mail-Anbieter übermittelt. Das Formular wird für den Spam-Schutz Cloudflare Turnstile laden; dabei werden Verbindungs- und Prüfdaten an Cloudflare übertragen. Ohne konfigurierte Turnstile- und E-Mail-Zugangsdaten ist kein Versand möglich.</p>
      <p>Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, soweit die Anfrage auf einen Vertrag oder vorvertragliche Maßnahmen gerichtet ist, sonst Art. 6 Abs. 1 lit. f DSGVO (Beantwortung eingehender Anfragen). Bitte keine besonderen Kategorien personenbezogener Daten übermitteln. Anfragen sollten gelöscht werden, sobald sie abschließend beantwortet sind; als interne Orientierung spätestens nach sechs Monaten, sofern keine gesetzlichen Aufbewahrungspflichten oder erforderliche Rechtsverteidigung entgegenstehen. Versand- und Spam-Schutz-Anbieter können eigene kurze Betriebsprotokolle führen; deren konkrete Fristen sind vor Aktivierung zu prüfen.</p>
      <h2>6. Google AdSense und Einwilligung</h2>
      <p>Google AdSense ist derzeit nicht in die Website eingebunden. Vor einer Aktivierung müssen die Datenschutzhinweise um konkrete Google- und Werbepartnerangaben, Zwecke, Rechtsgrundlagen, Speicherfristen und Drittlandübermittlungen anhand der tatsächlich gewählten Einstellungen ergänzt werden. Werbe- und Tracking-Skripte werden in diesem Projekt derzeit nicht geladen.</p>
      <p>Für Nutzer im EWR, im Vereinigten Königreich und in der Schweiz verlangt Google bei personalisierter Werbung eine von Google zertifizierte CMP, die das IAB Transparency and Consent Framework (TCF) integriert. Vorgesehen ist Googles eigene CMP über den Bereich „Privacy &amp; messaging“ in AdSense. Sie kann erst nach Anlage und Konfiguration des AdSense-Kontos, der Website und einer europäischen Einwilligungsnachricht aktiviert werden. Diese noch nicht eingerichtete Lösung erhebt aktuell keine Einwilligung und lädt keine Werbung.</p>
      <h2 id="cookie-einstellungen">7. Cookies und Cookie-Einstellungen</h2>
      <p>Im geprüften Projektcode wird kein eigener Cookie gesetzt. Die Sprachwahl nutzt <code>localStorage</code>. Bei späterer CMP- oder Werbeintegration können zusätzliche Speicherungen und Drittanbieterzugriffe hinzukommen; diese Erklärung und die tatsächliche Einwilligungskonfiguration müssen davor aktualisiert und geprüft werden. Die Schaltfläche „Datenschutz- und Cookie-Einstellungen“ öffnet nach Einrichtung der Google CMP über deren vorgesehene Schnittstelle erneut die Einwilligungsnachricht. Bis dahin verweist sie auf diesen Abschnitt.</p>
      <h2>8. Ihre Rechte</h2>
      <p>Sie haben im gesetzlichen Umfang Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit und Widerspruch. Eine erteilte Einwilligung können Sie mit Wirkung für die Zukunft widerrufen. Außerdem können Sie sich bei einer Datenschutzaufsichtsbehörde beschweren. Für Datenschutzanfragen erreichen Sie den Verantwortlichen unter <a href="mailto:teo.peters@gmail.com">teo.peters@gmail.com</a>.</p>
      <h2>9. Noch zu bestätigende Angaben</h2>
      <p>Vor Veröffentlichung sind Cloudflare-Konto- und Datenschutzkonfiguration einschließlich Auftragsverarbeitungsvertrag, Protokolldaten und Speicherfristen zu prüfen. Nach Einrichtung von Turnstile, E-Mail-Versand und AdSense müssen die jeweiligen Anbieter, Datenflüsse, Drittlandgarantien, Löschfristen und CMP-Widerrufsmöglichkeiten anhand der konkreten Konten ergänzt werden.</p>
      <p className="legal-note">Dieser Text bildet den bei der Codeprüfung erkennbaren Stand ab und ist ein Entwurf. Er ersetzt keine rechtliche Prüfung der tatsächlich genutzten Cloudflare- und Anbieterkonten.</p>
    </article>
    <LegalFooter />
  </main>;
}

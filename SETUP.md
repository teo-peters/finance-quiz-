# Einrichtung vor Veröffentlichung

Die Website bleibt ein Next.js Static Export (`out/`). `/impressum`, `/datenschutz` und `/kontakt` werden als statische Seiten erstellt. Der Kontaktendpunkt ist eine Cloudflare Pages Function unter `/api/contact`; der Pages Build muss das Repository als Quellverzeichnis und `out` als Build-Ausgabe verwenden. `public/_routes.json` begrenzt Function-Aufrufe ausdrücklich auf `/api/contact`, damit die statischen Seiten und Dateien nicht unnötig die Function-Quote verbrauchen. Wenn aktuell ein reiner Direct Upload läuft, muss auf Git Integration oder Wrangler Deployment mit Functions gewechselt werden. Es wurde nichts bereitgestellt.

## Kontaktformular aktivieren

1. In Cloudflare Turnstile ein Widget für `finquiz.online` (und optional Preview/localhost) erstellen. Die Sitekey ist öffentlich; den Secret Key niemals in Git oder im Frontend ablegen.
2. In Cloudflare Pages unter **Settings → Functions → Variables and Secrets** die Secrets `TURNSTILE_SECRET_KEY` und `RESEND_API_KEY` hinterlegen. Variablen `CONTACT_TO` (`teo.peters@gmail.com`) sowie `CONTACT_FROM` als verifizierte Absenderadresse setzen. Secrets sind nur serverseitig in der Function verfügbar.
3. Für den Frontend-Build `NEXT_PUBLIC_TURNSTILE_SITEKEY` mit der öffentlichen Sitekey setzen und neu bauen. Anschließend Turnstile-Siteverify und echte E-Mail-Zustellung auf der veröffentlichten Preview testen.
4. Bei Resend Konto anlegen, Domain/Absender verifizieren und API-Key erzeugen. Kostenloser Tarif laut aktueller Preisseite: $0, 3.000 E-Mails/Monat, maximal 100 täglich; die dort genannte Aufbewahrungsdauer für Daten beträgt 30 Tage. Tarif und Datenverarbeitung vor Aktivierung erneut prüfen.
5. Kontaktanfragen lokal nur so lange wie zur Bearbeitung nötig aufbewahren; als Arbeitsregel nach Abschluss löschen, Zielwert sechs Monate. Gesetzliche Pflichten und konkrete Löschmöglichkeiten bei Mailanbieter/Cloudflare prüfen.

Cloudflare Turnstile verlangt ausdrücklich eine Prüfung des Tokens am Server. Der Function-Endpunkt macht ohne alle vier Mail-/Spam-Schutz-Konfigurationswerte keinen Versand. Er validiert Eingaben serverseitig, prüft Origin und Inhaltsgröße, verwirft ungültige Turnstile-Tokens und verwendet ein Honeypot-Feld. Cloudflare Pages Functions-Anfragen zählen zur Workers Free Quote; laut aktueller Cloudflare-Dokumentation umfasst diese 100.000 Requests pro Tag. Statische Asset-Anfragen bleiben kostenlos/unbegrenzt, sofern sie nicht über Functions geroutet werden.

## AdSense und CMP aktivieren

1. AdSense-Konto erstellen, `finquiz.online` hinzufügen und Google-Siteprüfung/Genehmigung abschließen. Google entscheidet, ob die Website für Monetarisierung zugelassen wird.
2. Im AdSense-Bereich **Privacy & messaging** eine europäische Regulierungsnachricht für die Website veröffentlichen. Googles CMP ist für diese Nachrichten Google-zertifiziert, integriert TCF und unterstützt aktuell TCF v2.3. Für personalisierte Werbung im EWR, UK und in der Schweiz verlangt Google die zertifizierte TCF-CMP. Google stellt die Lösung im AdSense-Konto bereit; die Google-Dokumentation weist dafür keinen separaten CMP-Preis aus.
3. In der Nachricht eine echte Ablehnungsoption („Do not consent“) anbieten, Optionen verständlich gestalten, Sprachen Deutsch und Englisch prüfen und die Optimierungseinstellungen bewusst prüfen. Googles Standard-CMP ist kein Nachweis vollständiger Rechtskonformität; Anbieterauswahl, Zwecke und Rechtsgrundlagen müssen zum tatsächlichen Einsatz passen.
4. AdSense-Code erst nach Genehmigung und CMP-Einrichtung einbinden. Bei Auto Ads die von Google bereitgestellte Publisher-ID in `app/layout.tsx` ergänzen; keine ID in diesem Repository ist bekannt. Die Cookie-Einstellungs-Verknüpfung im Footer ruft dann `googlefc.showRevocationMessage` auf. Testen, dass sie die Google-Auswahl erneut öffnet und Widerruf ermöglicht.
5. `public/ads.txt` erst anlegen, sobald die echte Publisher-ID aus AdSense vorliegt. Der Google-Eintrag lautet strukturell `google.com, pub-<16-stellige-id>, DIRECT, f08c47fec0942fa0`; Platzhalterdatei wird absichtlich nicht ausgeliefert.
6. Datenschutzerklärung vor Skriptaktivierung anhand der tatsächlich ausgewählten Anzeigenpartner, Verarbeitung, Speicherdauern und Google-Informationen aktualisieren. Keine AdSense-, Analytics- oder Werbeskripte vor wirksamer Consent-Konfiguration laden.

## Vor Veröffentlichung zu prüfen

- Ist die angegebene Anschrift die ladungsfähige Anschrift? Ist eine Umsatzsteuer-ID erteilt worden? Entsteht aus Werbung/Tätigkeit eine Unternehmereigenschaft oder weitere Anbieterpflicht?
- Sind die Quizinhalte journalistisch-redaktionell gestaltet, sodass eine Verantwortlichenangabe nach § 18 Abs. 2 MStV erforderlich ist?
- Cloudflare-Auftragsverarbeitungsvertrag, Logs, Speicherfristen, Verarbeitungsorte und Übermittlungsmechanismen im konkreten Konto prüfen.
- Anbieterinformationen/AV-Verträge und Übermittlungsbedingungen von Turnstile sowie Resend prüfen. Resend verarbeitet den Inhalt der Kontakt-E-Mails; Absenderdomain muss verifiziert werden.
- Nach Aktivierung tatsächlichen Netzwerkverkehr, Cookies/Local Storage, CMP-Ablehnung und Widerruf testen; danach Datenschutzhinweise aktualisieren.
- Prüfen, dass der GitHub Pages Build tatsächlich Functions deployt und für alle statischen Routen nicht unnötig eine Function aufruft.

## GitHub-Veröffentlichung (manuell)

1. Zugangsdaten ausschließlich in den Cloudflare Pages Einstellungen hinterlegen; keine Secrets committen.
2. Änderungen lokal prüfen und in einen Git-Branch committen und pushen. Ist das Pages-Projekt mit diesem GitHub-Repository verbunden, erstellt Cloudflare eine Preview.
3. Preview-Seiten, Formularversand, Consent-Ablehnung/Widerruf und mobile Darstellung prüfen.
4. Erst danach den Branch in den für Cloudflare konfigurierten Produktionsbranch mergen. Das startet den Deployment-Build; in dieser Aufgabe wurde kein Deployment ausgeführt.

## Offizielle Quellen (abgerufen 16.10.2026)

- DDG § 5: https://www.gesetze-im-internet.de/ddg/__5.html
- MStV § 18: https://www.gesetze-bayern.de/Content/Document/MStV-18
- TDDDG § 25 (Endgerätezugriff): https://www.gesetze-im-internet.de/ttdsg/__25.html
- DSGVO (u. a. Art. 5, 6 und 13): https://eur-lex.europa.eu/eli/reg/2016/679/oj
- Google zertifizierte CMP / TCF-Anforderung: https://support.google.com/adsense/answer/13554020
- Google europäische Nachricht konfigurieren: https://support.google.com/adsense/answer/10960768
- Google Consent-Widerruf: https://support.google.com/adsense/answer/10959060
- Google Publisher-ID: https://support.google.com/adsense/answer/105516
- Google ads.txt: https://support.google.com/adsense/answer/9785052
- Cloudflare Pages Functions: https://developers.cloudflare.com/pages/functions/get-started/
- Cloudflare Pages Functions-Preise: https://developers.cloudflare.com/pages/functions/pricing/
- Cloudflare Turnstile: https://developers.cloudflare.com/turnstile/get-started/
- Cloudflare Turnstile Free Plan: https://developers.cloudflare.com/turnstile/plans/
- Resend Preise: https://resend.com/pricing

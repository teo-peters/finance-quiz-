import type { Metadata } from "next";
import { ContactForm } from "./contact-form";
import { LegalFooter } from "../legal-footer";

export const metadata: Metadata = { title: "Kontakt | Finance Quiz", description: "Nimm per E-Mail oder Kontaktformular Kontakt mit Finance Quiz auf." };

export default function Kontakt() {
  return <main className="legal-shell" lang="de">
    <a className="legal-back" href="/">← Finance Quiz</a>
    <article className="legal-card contact-card">
      <p className="section-kicker">FINANCE QUIZ · KONTAKT</p>
      <h1>Kontakt</h1>
      <p>Du kannst mich direkt per E-Mail oder telefonisch erreichen.</p>
      <p><a href="mailto:teo.peters@gmail.com">teo.peters@gmail.com</a><br /><a href="tel:+4915202472153">+49 1520 2472153</a></p>
      <h2>Schreib mir eine Nachricht</h2>
      <ContactForm />
    </article>
    <LegalFooter />
  </main>;
}

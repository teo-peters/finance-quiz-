"use client";

import { FormEvent, useEffect, useState } from "react";

declare global { interface Window { turnstile?: { render: (container: HTMLElement, options: Record<string, unknown>) => string; reset: (widgetId?: string) => void }; } }

const sitekey = process.env.NEXT_PUBLIC_TURNSTILE_SITEKEY;

export function ContactForm() {
  const [token, setToken] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!sitekey) return;
    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.defer = true;
    script.onload = () => {
      const container = document.getElementById("turnstile-widget");
      if (container && window.turnstile) {
        try {
          window.turnstile.render(container, { sitekey, theme: "dark", callback: (value: string) => setToken(value), "expired-callback": () => setToken(""), "error-callback": () => { setToken(""); setStatus("error"); setMessage("Der Spam-Schutz ist fehlgeschlagen. Bitte lade die Seite neu oder schreibe direkt eine E-Mail."); } });
        } catch {
          setStatus("error"); setMessage("Der Spam-Schutz konnte nicht gestartet werden. Bitte lade die Seite neu oder schreibe direkt eine E-Mail.");
        }
      }
    };
    script.onerror = () => { setStatus("error"); setMessage("Der Spam-Schutz konnte nicht geladen werden. Bitte prüfe deine Verbindung oder schreibe direkt eine E-Mail."); };
    document.head.appendChild(script);
    return () => { script.remove(); };
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending"); setMessage("");
    const form = event.currentTarget;
    const data = new FormData(form);
    data.set("turnstileToken", token);
    try {
      const response = await fetch("/api/contact", { method: "POST", body: data, headers: { Accept: "application/json" } });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Die Nachricht konnte nicht gesendet werden.");
      setStatus("success"); setMessage("Vielen Dank. Deine Nachricht wurde übermittelt."); form.reset(); setToken(""); window.turnstile?.reset();
    } catch (error) {
      setStatus("error"); setMessage(error instanceof Error ? error.message : "Das hat nicht geklappt. Bitte versuche es später erneut oder schreibe eine E-Mail.");
      window.turnstile?.reset(); setToken("");
    }
  }

  return <form className="contact-form" onSubmit={submit}>
    <label>Name<input name="name" autoComplete="name" maxLength={100} required /></label>
    <label>E-Mail-Adresse<input name="email" type="email" autoComplete="email" maxLength={254} required /></label>
    <label>Betreff<input name="subject" maxLength={160} required /></label>
    <label>Nachricht<textarea name="message" rows={7} maxLength={5000} required /></label>
    <label className="honeypot" aria-hidden="true">Bitte leer lassen<input name="website" tabIndex={-1} autoComplete="off" /></label>
    {sitekey ? <div id="turnstile-widget" className="turnstile-widget" /> : <p className="form-setup-note">Das Formular wird nach der Einrichtung der Versand- und Spam-Schutz-Zugangsdaten freigeschaltet. Bitte nutze bis dahin den E-Mail-Link.</p>}
    <p className="form-privacy">Mit dem Absenden werden die Angaben zur Beantwortung deiner Anfrage verarbeitet. <a href="/datenschutz/">Datenschutzerklärung</a>.</p>
    <button className="primary-button" disabled={!sitekey || !token || status === "sending"}>{status === "sending" ? "Wird gesendet …" : "Nachricht senden"}<span aria-hidden="true">→</span></button>
    {message && <p className={`form-message form-message-${status}`} role={status === "error" ? "alert" : "status"}>{message}</p>}
  </form>;
}

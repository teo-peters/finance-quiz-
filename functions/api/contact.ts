interface Env {
  TURNSTILE_SECRET_KEY?: string;
  RESEND_API_KEY?: string;
  CONTACT_FROM?: string;
  CONTACT_TO?: string;
}

const json = (body: Record<string, string>, status = 200) => new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" } });

export async function onRequestPost({ request, env }: { request: Request; env: Env }) {
  const origin = request.headers.get("Origin");
  if (!origin || new URL(origin).origin !== new URL(request.url).origin) return json({ error: "Ungültige Anfrage." }, 403);
  if (!env.TURNSTILE_SECRET_KEY || !env.RESEND_API_KEY || !env.CONTACT_FROM || !env.CONTACT_TO) return json({ error: "Der Versand ist noch nicht eingerichtet. Bitte nutze den E-Mail-Link." }, 503);
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > 16_384 || !request.headers.get("content-type")?.toLowerCase().startsWith("multipart/form-data")) return json({ error: "Ungültiges Anfrageformat." }, 400);
  let form: FormData;
  try { form = await request.formData(); } catch { return json({ error: "Die Formulardaten konnten nicht gelesen werden." }, 400); }
  const name = String(form.get("name") ?? "").trim();
  const email = String(form.get("email") ?? "").trim();
  const subject = String(form.get("subject") ?? "").trim();
  const message = String(form.get("message") ?? "").trim();
  const token = String(form.get("turnstileToken") ?? "");
  if (String(form.get("website") ?? "").trim()) return json({ ok: "true" });
  if (name.length < 1 || name.length > 100 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254 || subject.length < 1 || subject.length > 160 || /[\r\n\0]/.test(subject) || message.length < 1 || message.length > 5000 || token.length < 1 || token.length > 2048) return json({ error: "Bitte prüfe die Eingaben und versuche es erneut." }, 400);
  let verification: { success?: boolean; hostname?: string } | null = null;
  try {
    const verify = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", headers: { "content-type": "application/x-www-form-urlencoded" }, body: new URLSearchParams({ secret: env.TURNSTILE_SECRET_KEY, response: token }) });
    verification = verify.ok ? await verify.json() as { success?: boolean; hostname?: string } : null;
  } catch { return json({ error: "Die Spam-Prüfung ist gerade nicht erreichbar. Bitte versuche es später erneut." }, 502); }
  if (!verification?.success || verification.hostname !== new URL(request.url).hostname) return json({ error: "Die Spam-Prüfung war nicht erfolgreich. Bitte lade sie neu und versuche es erneut." }, 400);

  let sent: Response;
  try {
    sent = await fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "content-type": "application/json" }, body: JSON.stringify({ from: env.CONTACT_FROM, to: [env.CONTACT_TO], reply_to: email, subject: `Kontaktformular: ${subject}`, text: `Name: ${name}\nE-Mail: ${email}\n\n${message}` }) });
  } catch { return json({ error: "Der E-Mail-Dienst ist gerade nicht erreichbar. Bitte versuche es später erneut." }, 502); }
  if (!sent.ok) return json({ error: "Der E-Mail-Versand ist fehlgeschlagen. Bitte versuche es später erneut oder schreibe direkt eine E-Mail." }, 502);
  return json({ ok: "true" });
}

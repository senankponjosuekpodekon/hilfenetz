import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const FROM = process.env.EMAIL_FROM ?? "HilfeNetz <onboarding@resend.dev>";

function adminEmail(): string | null {
  return process.env.ADMIN_NOTIFY_EMAIL ?? process.env.ADMIN_EMAIL ?? null;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function html(lines: [string, string][]): string {
  const rows = lines
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 12px 6px 0;color:#64748b;vertical-align:top;white-space:nowrap">${escapeHtml(label)}</td><td style="padding:6px 0;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`
    )
    .join("");
  return `<table style="font-family:sans-serif;font-size:14px;color:#0f172a">${rows}</table>`;
}

async function send(to: string, subject: string, lines: [string, string][]): Promise<void> {
  if (!resend || !to) {
    if (!resend) console.warn(`[email] RESEND_API_KEY absent — e-mail non envoyé : ${subject}`);
    return;
  }
  try {
    const text = lines.map(([l, v]) => `${l} : ${v}`).join("\n");
    const { error } = await resend.emails.send({
      from: FROM,
      to,
      subject,
      text,
      html: html(lines),
    });
    if (error) console.error(`[email] Échec envoi « ${subject} » :`, error);
  } catch (e) {
    console.error(`[email] Erreur envoi « ${subject} » :`, e);
  }
}

export const notifyAdmin = (subject: string, lines: [string, string][]) =>
  send(adminEmail() ?? "", subject, lines);

export const notifyUser = (to: string, subject: string, lines: [string, string][]) =>
  send(to, subject, lines);

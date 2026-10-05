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

async function send(to: string, subject: string, lines: [string, string][], replyTo?: string): Promise<void> {
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
      replyTo,
      text,
      html: html(lines),
    });
    if (error) console.error(`[email] Échec envoi « ${subject} » :`, error);
  } catch (e) {
    console.error(`[email] Erreur envoi « ${subject} » :`, e);
  }
}

export const notifyAdmin = (subject: string, lines: [string, string][], replyTo?: string) =>
  send(adminEmail() ?? "", subject, lines, replyTo);

const CONFIRMATION: Record<string, { subject: string; refLabel: string; body: string; important: string }> = {
  fr: {
    subject: "Votre demande a bien été reçue — HilfeNetz",
    refLabel: "Référence",
    body: "Merci d'avoir présenté votre projet à HilfeNetz. Votre demande va être examinée conformément aux règles de la plateforme.",
    important: "La soumission d'une demande ne garantit pas l'obtention d'un don.",
  },
  de: {
    subject: "Ihre Anfrage wurde empfangen — HilfeNetz",
    refLabel: "Referenznummer",
    body: "Vielen Dank, dass Sie Ihr Projekt bei HilfeNetz vorgestellt haben. Ihre Anfrage wird gemäß den Regeln der Plattform geprüft.",
    important: "Das Einreichen einer Anfrage garantiert nicht den Erhalt einer Spende.",
  },
  it: {
    subject: "La tua richiesta è stata ricevuta — HilfeNetz",
    refLabel: "Numero di riferimento",
    body: "Grazie per aver presentato il tuo progetto a HilfeNetz. La tua richiesta sarà esaminata conformemente alle regole della piattaforma.",
    important: "L'invio di una richiesta non garantisce l'ottenimento di una donazione.",
  },
  es: {
    subject: "Tu solicitud ha sido recibida — HilfeNetz",
    refLabel: "Número de referencia",
    body: "Gracias por presentar tu proyecto a HilfeNetz. Tu solicitud será examinada conforme a las reglas de la plataforma.",
    important: "Enviar una solicitud no garantiza la obtención de una donación.",
  },
  pt: {
    subject: "O seu pedido foi recebido — HilfeNetz",
    refLabel: "Número de referência",
    body: "Obrigado por apresentar o seu projeto ao HilfeNetz. O seu pedido será analisado em conformidade com as regras da plataforma.",
    important: "A submissão de um pedido não garante a obtenção de uma doação.",
  },
};

export const notifyUserConfirmation = (to: string, locale: string, reference: string) => {
  const m = CONFIRMATION[locale] ?? CONFIRMATION.de;
  return send(to, m.subject, [
    [m.refLabel, reference],
    ["", m.body],
    ["Important", m.important],
  ]);
};

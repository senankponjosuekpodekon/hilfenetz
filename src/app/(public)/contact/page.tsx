import type { Metadata } from "next";
import { Mail, MessageSquare } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ContactForm } from "@/components/forms/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Une question concernant HilfeNetz ? Nous sommes à votre disposition.",
};

export default function ContactPage() {
  return (
    <div className="py-14 md:py-20">
      <Container className="grid gap-12 lg:grid-cols-[380px_1fr]">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight text-navy md:text-5xl">Contact</h1>
          <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
            Une question concernant HilfeNetz ? Nous sommes à votre disposition.
          </p>
          <ul className="mt-8 space-y-4">
            <li className="flex items-center gap-3 rounded-2xl border border-border bg-surface px-5 py-4">
              <Mail className="size-5 text-trust" aria-hidden />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted">E-mail</p>
                <p className="text-sm font-medium text-ink">contact@hilfenetz.example</p>
              </div>
            </li>
            <li className="flex items-center gap-3 rounded-2xl border border-border bg-surface px-5 py-4">
              <MessageSquare className="size-5 text-trust" aria-hidden />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted">Téléphone / WhatsApp</p>
                <p className="text-sm font-medium text-ink">À communiquer prochainement</p>
              </div>
            </li>
          </ul>
        </div>
        <div className="rounded-3xl border border-border bg-surface p-6 md:p-10">
          <ContactForm />
        </div>
      </Container>
    </div>
  );
}

import Link from "next/link";
import { Logo } from "./logo";

const columns = [
  {
    title: "Plateforme",
    links: [
      { href: "/comment-ca-marche", label: "Comment ça marche" },
      { href: "/offres", label: "Offres de dons" },
      { href: "/demande", label: "Présenter une demande" },
    ],
  },
  {
    title: "Informations",
    links: [
      { href: "/a-propos", label: "À propos" },
      { href: "/faq", label: "FAQ" },
      { href: "/contact", label: "Contact" },
      { href: "/signaler", label: "Signaler une annonce" },
    ],
  },
  {
    title: "Légal",
    links: [
      { href: "/conditions", label: "Conditions de participation" },
      { href: "/confidentialite", label: "Protection des données" },
      { href: "/mentions-legales", label: "Mentions légales" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto w-full max-w-6xl px-5 py-14 md:px-6">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              Plateforme de mise en relation entre donateurs et personnes ayant besoin de soutien.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-navy">{col.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-muted transition-colors hover:text-navy">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t border-border pt-6">
          <p className="text-sm text-muted">© 2026 HilfeNetz</p>
          <p className="mt-2 max-w-xl text-xs leading-relaxed text-muted">
            HilfeNetz est une plateforme de mise en relation. La décision d&apos;attribution d&apos;un
            don appartient exclusivement au donateur.
          </p>
        </div>
      </div>
    </footer>
  );
}

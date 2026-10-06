"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Gift, Inbox, Flag, Mail, CircleHelp, Settings } from "lucide-react";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/offres", label: "Offres", icon: Gift },
  { href: "/admin/demandes", label: "Demandes", icon: Inbox },
  { href: "/admin/signalements", label: "Signalements", icon: Flag },
  { href: "/admin/messages", label: "Messages", icon: Mail },
  { href: "/admin/faq", label: "FAQ", icon: CircleHelp },
  { href: "/admin/parametres", label: "Paramètres", icon: Settings },
];

export function AdminNav({ mobile = false }: { mobile?: boolean }) {
  const pathname = usePathname();
  return (
    <>
      {NAV.map(({ href, label, icon: Icon }) => {
        const active = href === "/admin" ? pathname === href : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={
              mobile
                ? `flex shrink-0 items-center gap-2 rounded-[10px] px-3 py-2 text-sm font-medium transition-colors ${
                    active ? "bg-trust/10 text-trust" : "text-muted hover:text-navy"
                  }`
                : `flex items-center gap-3 rounded-[10px] px-3 py-2.5 text-sm font-medium transition-colors ${
                    active ? "bg-trust/10 text-trust" : "text-muted hover:bg-background hover:text-navy"
                  }`
            }
          >
            <Icon className="size-4" aria-hidden />
            {label}
          </Link>
        );
      })}
    </>
  );
}

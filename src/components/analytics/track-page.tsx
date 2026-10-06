"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function TrackPage({ locale }: { locale: string }) {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Se déclenche uniquement si l'utilisateur a accepté les cookies.
    // Les données sont stockées dans votre propre base de données.
    const consent = window.localStorage.getItem("hn_cookie_consent");
    if (consent !== "granted") return;

    // Éviter les envois multiples sur la même page
    const key = `hn_pv_${pathname}`;
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, "1");

    fetch("/api/track", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        path: pathname,
        locale,
        referrer: document.referrer || null,
      }),
      keepalive: true,
    }).catch(() => {});
  }, [pathname, locale]);

  return null;
}

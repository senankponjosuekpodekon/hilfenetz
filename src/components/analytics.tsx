"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

const CONSENT_KEY = "hn_cookie_consent";
const GTAG_ID = "AW-18382054204";

function getConsent(): "granted" | "denied" | null {
  if (typeof window === "undefined") return null;
  const v = localStorage.getItem(CONSENT_KEY);
  if (v === "granted" || v === "denied") return v;
  return null;
}

export function GoogleAdsTag() {
  const [consent, setConsent] = useState<"granted" | "denied" | null>(null);

  useEffect(() => {
    setConsent(getConsent());
    function onChange() {
      setConsent(getConsent());
    }
    window.addEventListener("cookieConsentChanged", onChange);
    return () => window.removeEventListener("cookieConsentChanged", onChange);
  }, []);

  if (consent !== "granted") return null;

  return (
    <>
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GTAG_ID}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GTAG_ID}');
        `}
      </Script>
    </>
  );
}

export function CookieBanner({
  labels,
}: {
  labels: {
    title: string;
    description: string;
    accept: string;
    reject: string;
  };
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (getConsent() === null) setVisible(true);
  }, []);

  function setConsent(value: "granted" | "denied") {
    localStorage.setItem(CONSENT_KEY, value);
    setVisible(false);
    window.dispatchEvent(new CustomEvent("cookieConsentChanged"));
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-surface p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] md:p-5"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 md:flex-row md:justify-between">
        <div className="text-sm md:pr-6">
          <p className="font-semibold text-ink">{labels.title}</p>
          <p className="mt-1 text-muted">{labels.description}</p>
        </div>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => setConsent("denied")}
            className="rounded-xl px-4 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-background"
          >
            {labels.reject}
          </button>
          <button
            type="button"
            onClick={() => setConsent("granted")}
            className="rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-accent-dark"
          >
            {labels.accept}
          </button>
        </div>
      </div>
    </div>
  );
}

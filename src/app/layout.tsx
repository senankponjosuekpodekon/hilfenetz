import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.hilfenetz.com"),
  title: {
    default: "HilfeNetz — Plateforme de mise en relation entre donateurs et demandeurs",
    template: "%s — HilfeNetz",
  },
  description:
    "HilfeNetz facilite la mise en relation entre donateurs et personnes présentant un projet, une initiative ou une situation nécessitant un soutien.",
  openGraph: {
    type: "website",
    siteName: "HilfeNetz",
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630, alt: "HilfeNetz" }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  verification: {
    google: "4Vj4S7sfss3kQoI-sarEIYMlkJHxdBuEhutZfhepkCE",
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  return (
    <html lang={locale} className={`${poppins.variable} ${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-background font-sans text-ink">
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}

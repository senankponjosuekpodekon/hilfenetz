import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "HilfeNetz — Plateforme de mise en relation entre donateurs et demandeurs",
    template: "%s — HilfeNetz",
  },
  description:
    "HilfeNetz facilite la mise en relation entre donateurs et personnes présentant un projet, une initiative ou une situation nécessitant un soutien.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-background font-sans text-ink">{children}</body>
    </html>
  );
}

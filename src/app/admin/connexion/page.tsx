import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { Logo } from "@/components/layout/logo";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Administration",
  robots: { index: false },
};

export default async function LoginPage() {
  const session = await getSession();
  if (session) redirect("/admin");

  return (
    <div className="flex min-h-screen items-center justify-center bg-navy-dark px-5">
      <div className="w-full max-w-sm rounded-3xl border border-border bg-surface p-8">
        <div className="flex justify-center">
          <Logo />
        </div>
        <h1 className="mt-6 text-center text-xl font-semibold text-navy">Administration</h1>
        <p className="mt-1 text-center text-sm text-muted">Connectez-vous pour continuer.</p>
        <LoginForm />
      </div>
    </div>
  );
}

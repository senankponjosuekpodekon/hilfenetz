import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";import { LogOut } from "lucide-react";
import { getSession } from "@/lib/auth";
import { Logo } from "@/components/layout/logo";
import { AdminNav } from "@/components/admin/admin-nav";
import { logout } from "@/features/admin/actions";

export const metadata: Metadata = {
  title: "Administration",
  robots: { index: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) redirect("/admin/connexion");

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="hidden w-60 shrink-0 flex-col border-r border-border bg-surface lg:flex">
        <div className="flex h-16 items-center border-b border-border px-5">
          <Logo />
        </div>
        <nav className="flex-1 space-y-1 p-4" aria-label="Navigation admin">
          <AdminNav />
        </nav>
        <div className="border-t border-border p-4">
          <p className="mb-3 truncate px-3 text-xs text-muted">{session.email}</p>
          <form action={logout}>
            <button
              type="submit"
              className="flex w-full items-center gap-3 rounded-[10px] px-3 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-background hover:text-danger"
            >
              <LogOut className="size-4" aria-hidden />
              Déconnexion
            </button>
          </form>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Topbar mobile */}
        <div className="flex h-14 items-center gap-2 overflow-x-auto border-b border-border bg-surface px-4 lg:hidden">
          <AdminNav mobile />
          <form action={logout} className="ml-auto shrink-0">
            <button type="submit" className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-danger">
              <LogOut className="size-4" aria-hidden />
            </button>
          </form>
        </div>
        <main className="flex-1 p-5 md:p-8">{children}</main>
      </div>
    </div>
  );
}

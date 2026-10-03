import { getSiteSettings } from "@/lib/content";
import { SettingsForm } from "@/components/admin/settings-form";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-semibold text-navy">Paramètres</h1>
      <p className="mt-2 text-sm text-muted">
        Informations affichées publiquement sur la page Contact.
      </p>
      <div className="mt-6 rounded-2xl border border-border bg-surface p-6">
        <SettingsForm contactEmail={settings.contactEmail} contactPhone={settings.contactPhone} />
      </div>
    </div>
  );
}

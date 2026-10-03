"use client";

import { useState, useTransition } from "react";
import type { RequestStatus } from "@prisma/client";
import { setRequestStatus } from "@/features/admin/actions";
import { REQUEST_STATUS_LABELS } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/field";

export function RequestStatusForm({
  id,
  status,
  internalNote,
}: {
  id: string;
  status: RequestStatus;
  internalNote: string | null;
}) {
  const [value, setValue] = useState(status);
  const [note, setNote] = useState(internalNote ?? "");
  const [saved, setSaved] = useState(false);
  const [pending, startTransition] = useTransition();

  function save() {
    startTransition(async () => {
      await setRequestStatus(id, value, note);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    });
  }

  return (
    <div className="space-y-4 rounded-2xl border border-border bg-surface p-5">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink">Statut</label>
        <Select value={value} onChange={(e) => setValue(e.target.value as RequestStatus)}>
          {Object.entries(REQUEST_STATUS_LABELS).map(([v, l]) => (
            <option key={v} value={v}>{l}</option>
          ))}
        </Select>
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink">Note interne</label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={3}
          className="w-full rounded-[10px] border border-border bg-surface px-4 py-3 text-sm focus:border-trust focus:outline-2 focus:outline-trust/20"
        />
      </div>
      <div className="flex items-center gap-3">
        <Button type="button" size="sm" onClick={save} disabled={pending}>
          {pending ? "Enregistrement…" : "Enregistrer"}
        </Button>
        {saved ? <span className="text-sm text-positive">Enregistré.</span> : null}
      </div>
    </div>
  );
}

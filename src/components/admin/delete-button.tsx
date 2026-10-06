"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";

export function DeleteButton({
  id,
  action,
  confirmLabel = "Supprimer définitivement ?",
}: {
  id: string;
  action: (id: string) => Promise<void>;
  confirmLabel?: string;
}) {
  const [pending, startTransition] = useTransition();
  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (window.confirm(confirmLabel)) startTransition(() => action(id));
      }}
      className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-muted transition-colors hover:bg-danger/10 hover:text-danger disabled:opacity-50"
      aria-label="Supprimer"
    >
      <Trash2 className="size-3.5" aria-hidden />
    </button>
  );
}

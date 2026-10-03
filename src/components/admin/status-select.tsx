"use client";

import { useTransition } from "react";

export function StatusSelect({
  id,
  value,
  options,
  action,
}: {
  id: string;
  value: string;
  options: Record<string, string>;
  action: (id: string, status: never) => Promise<void>;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <select
      value={value}
      disabled={pending}
      onChange={(e) => startTransition(() => action(id, e.target.value as never))}
      className="rounded-lg border border-border bg-surface px-2.5 py-1.5 text-xs font-medium text-ink disabled:opacity-50"
      aria-label="Changer le statut"
    >
      {Object.entries(options).map(([v, label]) => (
        <option key={v} value={v}>
          {label}
        </option>
      ))}
    </select>
  );
}

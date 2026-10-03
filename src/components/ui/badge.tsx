import type { ReactNode } from "react";

type Tone = "neutral" | "trust" | "positive" | "warning" | "danger" | "navy";

const tones: Record<Tone, string> = {
  neutral: "bg-surface text-muted border-border",
  trust: "bg-trust-soft text-trust border-trust/20",
  positive: "bg-positive-soft text-positive border-positive/20",
  warning: "bg-warning-soft text-warning border-warning/30",
  danger: "bg-danger/10 text-danger border-danger/20",
  navy: "bg-navy text-white border-navy",
};

export function Badge({ tone = "neutral", children, className = "" }: { tone?: Tone; children: ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${tones[tone]} ${className}`}>
      {children}
    </span>
  );
}

const statusTones: Record<string, Tone> = {
  DRAFT: "neutral",
  PENDING_REVIEW: "warning",
  PUBLISHED: "positive",
  SUSPENDED: "warning",
  CLOSED: "neutral",
  ARCHIVED: "neutral",
  RECEIVED: "trust",
  UNDER_REVIEW: "warning",
  VALIDATED: "positive",
  PRESENTED: "trust",
  MATCHED: "positive",
  REJECTED: "danger",
  NEW: "trust",
  PROCESSED: "positive",
  RESOLVED: "positive",
};

export function StatusBadge({ status, label }: { status: string; label: string }) {
  return <Badge tone={statusTones[status] ?? "neutral"}>{label}</Badge>;
}

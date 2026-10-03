import type { ReactNode } from "react";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-5 md:px-6 ${className}`}>{children}</div>;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow ? (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-trust">{eyebrow}</p>
      ) : null}
      <h2 className="text-3xl font-semibold tracking-tight text-navy md:text-4xl">{title}</h2>
      {description ? <p className="mt-4 text-base leading-relaxed text-muted">{description}</p> : null}
    </div>
  );
}

export function Alert({ tone = "info", children }: { tone?: "info" | "warning" | "success" | "danger"; children: ReactNode }) {
  const tones = {
    info: "border-trust/30 bg-trust-soft text-navy",
    warning: "border-warning/40 bg-warning-soft text-ink",
    success: "border-positive/30 bg-positive-soft text-ink",
    danger: "border-danger/30 bg-danger/10 text-ink",
  };
  return <div className={`rounded-2xl border p-5 text-sm leading-relaxed ${tones[tone]}`}>{children}</div>;
}

import { CircleAlert } from "lucide-react";
import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

const inputBase =
  "w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-ink placeholder:text-muted/60 transition-all duration-200 hover:border-muted/50 focus:border-violet focus:outline-4 focus:outline-violet/15 disabled:bg-background";

export function Field({
  label,
  required,
  error,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-ink">
        {label} {required ? <span className="text-danger">*</span> : null}
      </label>
      {children}
      {error ? (
        <p role="alert" className="flex items-center gap-1.5 text-sm text-danger">
          <CircleAlert className="size-4 shrink-0" aria-hidden />
          {error}
        </p>
      ) : hint ? (
        <p className="text-sm text-muted">{hint}</p>
      ) : null}
    </div>
  );
}

export function Input({ error, className = "", ...props }: InputHTMLAttributes<HTMLInputElement> & { error?: boolean }) {
  return <input className={`${inputBase} ${error ? "border-danger" : ""} ${className}`} {...props} />;
}

export function Textarea({ error, className = "", ...props }: TextareaHTMLAttributes<HTMLTextAreaElement> & { error?: boolean }) {
  return <textarea className={`${inputBase} min-h-32 ${error ? "border-danger" : ""} ${className}`} {...props} />;
}

export function Select({ error, className = "", children, ...props }: SelectHTMLAttributes<HTMLSelectElement> & { error?: boolean }) {
  return (
    <select className={`${inputBase} ${error ? "border-danger" : ""} ${className}`} {...props}>
      {children}
    </select>
  );
}

export function Checkbox({ label, name, error }: { label: string; name: string; error?: boolean }) {
  return (
    <label className="flex cursor-pointer items-start gap-3 text-sm text-ink">
      <input
        type="checkbox"
        name={name}
        value="on"
        className={`mt-0.5 size-4 shrink-0 rounded border-border accent-violet ${error ? "outline-1 outline-danger" : ""}`}
      />
      <span>{label}</span>
    </label>
  );
}

// Champ honeypot anti-spam : invisible pour les humains.
export function Honeypot() {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] -top-[9999px] h-0 w-0 overflow-hidden">
      <label>
        Site web
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}

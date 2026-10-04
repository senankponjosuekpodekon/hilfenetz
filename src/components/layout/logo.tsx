import { Link } from "@/i18n/navigation";

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label="HilfeNetz">
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
        <circle cx="5" cy="7" r="3" className={dark ? "fill-white" : "fill-trust"} />
        <circle cx="21" cy="7" r="3" className={dark ? "fill-white" : "fill-trust"} />
        <circle cx="13" cy="20" r="3" className={dark ? "fill-white" : "fill-navy"} />
        <path d="M7.4 8.6 11 17.5M18.6 8.6 15 17.5M8 7h10" stroke={dark ? "#fff" : "#64748b"} strokeWidth="1.4" strokeLinecap="round" />
      </svg>
      <span className={`text-lg font-semibold tracking-tight ${dark ? "text-white" : "text-navy"}`}>HilfeNetz</span>
    </Link>
  );
}

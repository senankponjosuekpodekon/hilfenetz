import Image from "next/image";
import Link from "next/link";

export function Logo({ dark = false, href = "/" }: { dark?: boolean; href?: string }) {
  const img = (
    <Image
      src="/images/logo.png"
      alt="HilfeNetz"
      width={1726}
      height={403}
      className="h-7 w-auto"
      priority
    />
  );
  return (
    <Link href={href} className="flex items-center" aria-label="HilfeNetz">
      {dark ? (
        <span className="rounded-xl bg-white px-3 py-1.5">{img}</span>
      ) : (
        img
      )}
    </Link>
  );
}

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger" | "light";
type Size = "md" | "lg" | "sm";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-[10px] font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-trust disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary: "bg-trust text-white hover:bg-trust-dark",
  secondary: "border border-border bg-surface text-ink hover:border-trust hover:text-trust",
  ghost: "text-muted hover:text-ink",
  danger: "bg-danger text-white hover:bg-danger/90",
  light: "bg-white text-navy hover:bg-white/90",
};

const sizes: Record<Size, string> = {
  sm: "h-11 px-4 text-sm md:h-9",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md") {
  return `${base} ${variants[variant]} ${sizes[size]}`;
}

type ButtonProps = {
  variant?: Variant;
  size?: Size;
  href?: string;
  arrow?: boolean;
  children: ReactNode;
} & Omit<ComponentProps<"button">, "children">;

export function Button({ variant = "primary", size = "md", href, arrow, children, className = "", ...props }: ButtonProps) {
  const cls = `${buttonClasses(variant, size)} ${className}`;
  const content = (
    <>
      {children}
      {arrow ? (
        <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
      ) : null}
    </>
  );
  if (href) {
    return (
      <Link href={href} className={cls}>
        {content}
      </Link>
    );
  }
  return (
    <button className={cls} {...props}>
      {content}
    </button>
  );
}

"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export function FaqAccordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-border rounded-2xl border border-border bg-surface">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left md:px-6"
            >
              <span className="text-sm font-medium text-ink md:text-base">{item.q}</span>
              <ChevronDown
                className={`size-5 shrink-0 text-muted transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                aria-hidden
              />
            </button>
            {isOpen ? <p className="px-5 pb-5 text-sm leading-relaxed text-muted md:px-6">{item.a}</p> : null}
          </div>
        );
      })}
    </div>
  );
}

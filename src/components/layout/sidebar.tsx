"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { StudioWordmark, Wordmark } from "@/components/brand/wordmark";
import { cn } from "@/lib/utils/format-utils";
import { navItems } from "./nav-items";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed bottom-0 left-0 top-0 z-40 hidden w-64 flex-col border-r border-brand-border bg-brand-panel md:flex">
      <div className="px-5 pb-6 pt-5">
        <Link href="/" className="text-xl leading-tight">
          <Wordmark />
        </Link>
      </div>

      <p className="label px-5 pb-2">explore</p>
      <nav className="flex-1 space-y-0.5 px-3">
        {navItems.map((item) => {
          const active = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-[15px] transition-colors duration-200",
                active
                  ? "bg-white font-medium text-brand-text"
                  : "text-brand-muted hover:bg-white hover:text-brand-text",
              )}
            >
              <span
                className={cn(
                  "seed transition-transform duration-[240ms]",
                  active ? "scale-100" : "scale-0",
                )}
                style={{ transitionTimingFunction: "var(--ease-bloom)" }}
              />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-brand-border px-5 py-4 text-sm">
        <a href="https://shiftbloom.studio" target="_blank" rel="noopener noreferrer">
          <StudioWordmark />
        </a>
      </div>
    </aside>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/format-utils";
import { navItems } from "./nav-items";

const mobileNavItems = navItems.filter((item) => item.href !== "/memories");

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-brand-border bg-brand-bg md:hidden">
      <div className="flex h-16 items-center justify-around">
        {mobileNavItems.map((item) => {
          const active = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex flex-col items-center gap-1.5 px-2 py-1.5 text-xs transition-colors",
                active ? "font-medium text-brand-text" : "text-brand-muted",
              )}
            >
              <span className={cn("seed", active ? "opacity-100" : "opacity-0")} />
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

import type { ReactNode } from "react";
import { cn } from "@/lib/utils/format-utils";

type BadgeVariant = "default" | "primary" | "accent" | "gold" | "muted";

interface BadgeProps {
  variant?: BadgeVariant;
  className?: string;
  children: ReactNode;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-brand-panel text-brand-text",
  primary: "bg-brand-secondary text-brand-root",
  accent: "bg-brand-secondary text-brand-root",
  gold: "bg-brand-panel text-brand-text",
  muted: "bg-brand-panel text-brand-muted",
};

export function Badge({ variant = "default", className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 font-mono text-[11px] tracking-[0.08em]",
        variantStyles[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}

import type { ReactNode } from "react";
import { cn } from "@/lib/utils/format-utils";

interface GradientTextProps {
  children: ReactNode;
  className?: string;
}

/** Brandbook v2 has no gradient type. Kept as a plain ink span for existing call sites. */
export function GradientText({ children, className }: GradientTextProps) {
  return <span className={cn("text-brand-text", className)}>{children}</span>;
}

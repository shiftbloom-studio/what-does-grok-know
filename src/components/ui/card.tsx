import type { ReactNode } from "react";
import { cn } from "@/lib/utils/format-utils";

interface CardProps {
  className?: string;
  children: ReactNode;
}

export function Card({ className, children }: CardProps) {
  return (
    <div
      className={cn(
        "glass-deep rounded-xl p-4 transition-all duration-300 hover:border-brand-petal relative overflow-hidden group/card",
        className,
      )}
    >
      {children}
    </div>
  );
}

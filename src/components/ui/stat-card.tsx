import type { ReactNode } from "react";
import { cn } from "@/lib/utils/format-utils";

interface StatCardProps {
  icon?: ReactNode;
  value: string | number;
  label: string;
  trend?: { value: number; positive: boolean };
  className?: string;
}

export function StatCard({ icon, value, label, trend, className }: StatCardProps) {
  return (
    <div
      className={cn(
        "glass-deep rounded-2xl p-4 transition-colors duration-200 hover:border-brand-petal relative overflow-hidden group/stat",
        className,
      )}
    >
      <div className="flex items-start justify-between">
        {icon && (
          <div className="w-9 h-9 rounded-full bg-brand-secondary flex items-center justify-center text-brand-root">
            {icon}
          </div>
        )}
        {trend && (
          <span
            className={cn(
              "text-xs font-medium px-2 py-0.5 rounded-full",
              trend.positive
                ? "bg-brand-panel text-brand-text"
                : "bg-brand-secondary text-brand-root",
            )}
          >
            {trend.positive ? "+" : ""}
            {trend.value}%
          </span>
        )}
      </div>
      <div className="mt-3">
        <p className="font-mono text-xl font-medium text-brand-text">{value}</p>
        <p className="text-sm text-brand-muted mt-0.5">{label}</p>
      </div>
    </div>
  );
}

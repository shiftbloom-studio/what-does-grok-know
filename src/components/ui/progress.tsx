import { cn } from "@/lib/utils/format-utils";

interface ProgressProps {
  value: number;
  className?: string;
}

export function Progress({ value, className }: ProgressProps) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div className={cn("w-full h-2 bg-brand-secondary rounded-full overflow-hidden", className)}>
      <div
        className="h-full rounded-full bg-brand-primary transition-[width] duration-500 ease-out"
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}

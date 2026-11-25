import { cn } from "@/lib/utils/format-utils";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return <div className={cn("bg-brand-border rounded animate-pulse", className)} />;
}

import { cn } from "@/lib/utils/format-utils";

/** Product wordmark: lowercase display type, the question mark is the red seed. */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("font-display font-semibold tracking-tight text-brand-text", className)}>
      what does grok know<span className="text-brand-root">?</span>
    </span>
  );
}

/** shiftbloom studio wordmark: "shiftbloom" semibold, "studio" regular at 60% ink, red seed period. */
export function StudioWordmark({ className }: { className?: string }) {
  return (
    <span className={cn("font-display", className)}>
      <span className="font-semibold text-brand-text">shiftbloom</span>{" "}
      <span className="font-normal text-brand-text/60">studio</span>
      <span className="text-brand-root">.</span>
    </span>
  );
}

import { Bloom } from "@/components/shared/bloom";
import { cn } from "@/lib/utils/format-utils";

/** Product wordmark: lowercase display type, the question mark is the red seed. */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span
      className={cn("font-display font-semibold tracking-[-0.02em] text-brand-text", className)}
    >
      what does grok know<span className="text-brand-primary">?</span>
    </span>
  );
}

/** shiftbloom studio wordmark: "shiftbloom" semibold, "studio" regular at 60% ink, red seed period. */
export function StudioWordmark({ className }: { className?: string }) {
  return (
    <span className={cn("font-display tracking-[-0.02em]", className)}>
      <span className="font-semibold text-brand-text">shiftbloom</span>{" "}
      <span className="font-normal text-brand-text/60">studio</span>
      <span className="text-brand-primary">.</span>
    </span>
  );
}

/** Header lockup as on shiftbloom.studio: 30px gradient bloom, 12px gap, wordmark at 1.25rem / 1.4rem. */
export function Lockup({ studio = false, className }: { studio?: boolean; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-3 text-xl leading-none sm:text-[1.4rem]",
        className,
      )}
    >
      <Bloom size={30} className="shrink-0" />
      {studio ? <StudioWordmark /> : <Wordmark />}
    </span>
  );
}

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

/** Small solid bloom for sizes under 32px, per the brandbook. */
export function BloomSolid({ size = 20, className }: { size?: number; className?: string }) {
  const petals = Array.from({ length: 8 }, (_, i) => i * 45);
  return (
    <svg
      width={size}
      height={size}
      viewBox="-16 -16 32 32"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {petals.map((deg) => (
        <ellipse
          key={deg}
          cx="0"
          cy="-8"
          rx="4.2"
          ry="7.5"
          fill="#FF2E52"
          transform={`rotate(${deg})`}
        />
      ))}
      <circle r="3.2" fill="#FFFFFF" />
    </svg>
  );
}

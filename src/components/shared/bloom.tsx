// The shiftbloom bloom, exactly as shiftbloom.studio draws it (brand book v2, "The Mark").
// Four interleaved petal rings plus seed; gradient from 32px up, solid Bloom Red below.
const RINGS = [
  { r: 100, petals: 10, w: 32, l: 90, root: "#D8163F", tip: "#FF2E52", offset: 0 },
  { r: 74, petals: 10, w: 25.16, l: 66.6, root: "#FF2E52", tip: "#FF7E9E", offset: 18 },
  { r: 50, petals: 8, w: 19, l: 45, root: "#FF7E9E", tip: "#FFC2D3", offset: 40.5 },
  { r: 27, petals: 6, w: 12.96, l: 24.3, root: "#FFB4CA", tip: "#FFDCE7", offset: 70.5 },
];
const n = (v: number) => Number(v.toFixed(2));
const petal = (w: number, l: number) =>
  `M 0,0 C ${w},0 ${w},${-n(0.55 * l)} 0,${-l} C ${-w},${-n(0.55 * l)} ${-w},0 0,0 Z`;

export function Bloom({
  size = 30,
  solid = false,
  className,
}: {
  size?: number;
  solid?: boolean;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {!solid && (
        <defs>
          {RINGS.map((g) => (
            <linearGradient
              key={g.r}
              id={`sb-bloom-ring-${g.r}`}
              gradientUnits="userSpaceOnUse"
              x1={0}
              y1={0}
              x2={0}
              y2={-g.l}
            >
              <stop offset="0%" stopColor={g.root} />
              <stop offset="100%" stopColor={g.tip} />
            </linearGradient>
          ))}
        </defs>
      )}
      {RINGS.map((g) =>
        Array.from({ length: g.petals }, (_, p) => {
          const angle = n(g.offset + (360 / g.petals) * p);
          return (
            <path
              key={`${g.r}-${angle}`}
              d={petal(g.w, g.l)}
              fill={solid ? "#FF2E52" : `url(#sb-bloom-ring-${g.r})`}
              transform={`translate(100 100) rotate(${angle}) translate(0 ${-n(g.r - g.l)})`}
            />
          );
        }),
      )}
      <circle cx={100} cy={100} r={7} fill="#FF2E52" />
    </svg>
  );
}

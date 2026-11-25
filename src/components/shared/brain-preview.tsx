/**
 * Static picture of what the app produces: conversations as points, grouped into topic clusters.
 * Deterministic (seeded) so server and client render the same SVG.
 */
const CLUSTERS = [
  { x: 120, y: 120, color: "#ff2e52", n: 16, r: 54 },
  { x: 300, y: 95, color: "#4fb3a9", n: 11, r: 44 },
  { x: 250, y: 250, color: "#ff8fab", n: 14, r: 50 },
  { x: 90, y: 290, color: "#e8b04a", n: 8, r: 38 },
  { x: 380, y: 230, color: "#7fa7d9", n: 9, r: 40 },
];

function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const rand = rng(42);
const nodes = CLUSTERS.flatMap((c, ci) =>
  Array.from({ length: c.n }, () => {
    const a = rand() * Math.PI * 2;
    const d = Math.sqrt(rand()) * c.r;
    return {
      ci,
      x: Math.round(c.x + Math.cos(a) * d),
      y: Math.round(c.y + Math.sin(a) * d),
      size: 2.5 + rand() * 4.5,
      color: c.color,
    };
  }),
);
const edges = nodes.flatMap((n, i) =>
  nodes
    .slice(i + 1)
    .filter((m) => m.ci === n.ci && Math.hypot(m.x - n.x, m.y - n.y) < 34)
    .map((m) => [n, m] as const),
);
const bridges: Array<[number, number]> = [
  [3, 20],
  [17, 30],
  [30, 55],
  [5, 40],
];

export function BrainPreview({ className }: { className?: string }) {
  return (
    <figure className={className}>
      <svg
        viewBox="0 0 460 380"
        className="h-auto w-full rounded-2xl bg-brand-deep"
        role="img"
        aria-label="Example of the brain view: about sixty points in five colored topic clusters"
      >
        {edges.map(([a, b], i) => (
          <line
            key={`e${i}`}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke="#ffffff"
            strokeOpacity="0.12"
          />
        ))}
        {bridges.map(([a, b]) =>
          nodes[a] && nodes[b] ? (
            <line
              key={`b${a}-${b}`}
              x1={nodes[a].x}
              y1={nodes[a].y}
              x2={nodes[b].x}
              y2={nodes[b].y}
              stroke="#ffffff"
              strokeOpacity="0.22"
              strokeDasharray="2 4"
            />
          ) : null,
        )}
        {nodes.map((n, i) => (
          <circle key={`n${i}`} cx={n.x} cy={n.y} r={n.size} fill={n.color} />
        ))}
      </svg>
      <figcaption className="label mt-3">illustration: 58 chats in 5 topics</figcaption>
    </figure>
  );
}

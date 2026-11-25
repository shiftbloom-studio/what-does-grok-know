import type { ReactNode } from "react";

/** Shared typography for the help pages: one label, one display headline, readable body copy. */
export function InfoPage({
  label,
  title,
  intro,
  children,
}: {
  label: string;
  title: string;
  intro?: ReactNode;
  children: ReactNode;
}) {
  return (
    <article className="animate-unfurl space-y-10">
      <header className="space-y-3">
        <p className="label">{label}</p>
        <h1 className="text-4xl font-semibold leading-tight text-brand-text sm:text-5xl">
          {title}
        </h1>
        {intro && <p className="max-w-2xl text-lg text-brand-muted">{intro}</p>}
      </header>
      <div className="space-y-10 text-[16px] leading-relaxed text-brand-text">{children}</div>
    </article>
  );
}

export function InfoSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="text-2xl font-medium text-brand-text">{title}</h2>
      <div className="space-y-3 text-brand-text/85">{children}</div>
    </section>
  );
}

export function SeedList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-baseline gap-3">
          <span className="seed translate-y-[-1px]" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function Code({ children }: { children: ReactNode }) {
  return (
    <code className="rounded bg-brand-panel px-1.5 py-0.5 font-mono text-[0.85em] text-brand-text">
      {children}
    </code>
  );
}

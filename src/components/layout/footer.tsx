import Link from "next/link";
import { StudioWordmark } from "@/components/brand/wordmark";
import { siteConfig } from "@/config/site";

const appLinks = [
  { href: "/how-to", label: "Get your export" },
  { href: "/faq", label: "FAQ" },
  { href: "/privacy-info", label: "Check it yourself" },
];

// Served by the Cloudflare Worker from deploy config, so they are plain links, not Next routes.
const legalLinks = [
  { href: "/privacy", label: "Privacy" },
  { href: "/datenschutz", label: "Datenschutz" },
  { href: "/imprint", label: "Imprint" },
  { href: "/impressum", label: "Impressum" },
];

export function Footer() {
  return (
    <footer className="mt-auto w-full border-t border-brand-border">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-5 py-8 text-sm md:flex-row md:items-start md:justify-between">
        <div className="space-y-2">
          <a href={siteConfig.creatorUrl} target="_blank" rel="noopener noreferrer">
            <StudioWordmark className="text-base" />
          </a>
          <p className="max-w-xs text-brand-muted">
            Your export is read by this browser tab. No server ever sees it.
          </p>
        </div>
        <nav aria-label="Help" className="flex flex-col gap-1.5">
          <span className="label pb-1">help</span>
          {appLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-brand-muted hover:text-brand-text"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <nav aria-label="Legal" className="flex flex-col gap-1.5">
          <span className="label pb-1">legal</span>
          {legalLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-brand-muted hover:text-brand-text">
              {link.label}
            </a>
          ))}
          <a href={siteConfig.github} className="text-brand-muted hover:text-brand-text">
            Source code (AGPL-3.0)
          </a>
        </nav>
      </div>
    </footer>
  );
}

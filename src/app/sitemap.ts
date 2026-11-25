import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export const dynamic = "force-static";

// Dashboard views are empty without a loaded export, so only public pages are listed.
const pages: Array<[string, number]> = [
  ["", 1],
  ["/how-to", 0.7],
  ["/faq", 0.6],
  ["/privacy-info", 0.5],
  // Rendered by the Worker (worker/legal.ts), not by Next.js.
  ["/privacy", 0.3],
  ["/datenschutz", 0.3],
  ["/imprint", 0.3],
  ["/impressum", 0.3],
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map(([path, priority]) => ({
    url: `${siteConfig.url}${path}`,
    changeFrequency: "monthly",
    priority,
  }));
}

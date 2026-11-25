import { LEGAL_PATHS, legalPage, parseLegal } from "./legal";

export interface Env {
  ASSETS: Fetcher;
  /** Operator details for the imprint and privacy policy, as JSON (see README). Legal pages 404 when unset. */
  LEGAL?: string;
}

const YEAR = "public, max-age=31536000, immutable";
const FONT_FAMILIES = ["clash-display@400,500,600", "general-sans@400,500,600"];

// connect-src 'self' is what backs the privacy promise: the page cannot send data anywhere else.
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

function withSecurityHeaders(res: Response): Response {
  const out = new Response(res.body, res);
  const h = out.headers;
  h.set("Content-Security-Policy", CSP);
  h.set("X-Content-Type-Options", "nosniff");
  h.set("Referrer-Policy", "strict-origin-when-cross-origin");
  h.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(), interest-cohort=()");
  h.set("Cross-Origin-Opener-Policy", "same-origin");
  return out;
}

/** Fontshare CSS, rewritten so every font file is served from our own origin. One family per request. */
async function brandCss(): Promise<Response> {
  const parts = await Promise.all(
    FONT_FAMILIES.map(async (f) => {
      try {
        const res = await fetch(`https://api.fontshare.com/v2/css?f[]=${f}&display=swap`, {
          cf: { cacheTtl: 86400, cacheEverything: true },
        });
        return res.ok ? res.text() : "";
      } catch {
        return ""; // the page falls back to system fonts
      }
    }),
  );
  const css = parts.join("\n").replace(/(?:https?:)?\/\/cdn\.fontshare\.com\//g, "/fonts/fs/");
  return new Response(css || "/* fonts unavailable */", {
    headers: {
      "Content-Type": "text/css; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}

async function fontFile(path: string): Promise<Response> {
  const res = await fetch(`https://cdn.fontshare.com/${path}`, {
    cf: { cacheTtl: 31536000, cacheEverything: true },
  }).catch(() => null);
  if (!res?.ok) return new Response("Not found", { status: 404 });
  const type = path.endsWith(".woff2")
    ? "font/woff2"
    : path.endsWith(".woff")
      ? "font/woff"
      : "font/ttf";
  return new Response(res.body, { headers: { "Content-Type": type, "Cache-Control": YEAR } });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const method = request.method;
    if (method !== "GET" && method !== "HEAD") {
      return new Response("Method not allowed", { status: 405, headers: { Allow: "GET, HEAD" } });
    }

    if (url.pathname === "/fonts/brand.css") return withSecurityHeaders(await brandCss());
    const font = url.pathname.match(/^\/fonts\/fs\/([A-Za-z0-9/_.-]+\.(?:woff2|woff|ttf))$/);
    if (font && !font[1].includes("..")) return withSecurityHeaders(await fontFile(font[1]));

    const kind = LEGAL_PATHS[url.pathname];
    if (kind) {
      const legal = parseLegal(env.LEGAL);
      if (!legal)
        return withSecurityHeaders(
          await env.ASSETS.fetch(new Request(new URL("/404", url), request)),
        );
      return withSecurityHeaders(
        new Response(method === "HEAD" ? null : legalPage(kind, legal, url.origin), {
          headers: {
            "Content-Type": "text/html; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        }),
      );
    }

    return withSecurityHeaders(await env.ASSETS.fetch(request));
  },
} satisfies ExportedHandler<Env>;

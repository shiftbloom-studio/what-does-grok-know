import type { NextConfig } from "next";

// Fully static build (out/) served by Cloudflare Workers static assets; see worker/index.ts.
const nextConfig: NextConfig = {
  output: "export",
  reactStrictMode: true,
  images: { unoptimized: true },
};

export default nextConfig;

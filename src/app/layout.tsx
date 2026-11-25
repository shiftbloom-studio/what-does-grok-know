import type { Metadata, Viewport } from "next";
import "@fontsource/jetbrains-mono/latin-400.css";
import "@fontsource/jetbrains-mono/latin-500.css";
import "./globals.css";
import { siteConfig } from "@/config/site";

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.creator, url: siteConfig.creatorUrl }],
  creator: siteConfig.creator,
  metadataBase: new URL(siteConfig.url),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "what does grok know? A 3D map of Grok conversations",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        {/* Clash Display and General Sans, proxied by the Worker so the browser never talks to Fontshare. */}
        <link rel="stylesheet" href="/fonts/brand.css" />
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://shiftbloom.studio/#org",
                  name: siteConfig.creator,
                  url: siteConfig.creatorUrl,
                  sameAs: ["https://github.com/shiftbloom-studio"],
                },
                {
                  "@type": "WebApplication",
                  "@id": `${siteConfig.url}/#app`,
                  name: siteConfig.name,
                  description: siteConfig.description,
                  url: siteConfig.url,
                  applicationCategory: "UtilityApplication",
                  operatingSystem: "Any",
                  browserRequirements: "Requires WebGL, Web Workers and IndexedDB",
                  isAccessibleForFree: true,
                  license: "https://www.gnu.org/licenses/agpl-3.0.html",
                  sameAs: [siteConfig.github],
                  offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
                  publisher: { "@id": "https://shiftbloom.studio/#org" },
                  author: { "@id": "https://shiftbloom.studio/#org" },
                },
              ],
            }),
          }}
        />
      </head>
      <body
        className="min-h-screen bg-brand-bg text-brand-text antialiased"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}

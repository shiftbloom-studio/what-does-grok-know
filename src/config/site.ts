export const siteConfig = {
  name: "what does grok know?",
  description:
    "Load your Grok chat export and walk through it as a 3D map of topics, moods and the facts you shared. Parsing and analysis run in your browser; nothing is uploaded.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://what-does-grok-know.shiftbloom.studio",
  ogImage: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://what-does-grok-know.shiftbloom.studio"}/og.png`,
  creator: "shiftbloom studio",
  creatorUrl: "https://shiftbloom.studio",
  github: "https://github.com/shiftbloom-studio/what-does-grok-know",
  keywords: [
    "grok",
    "xai",
    "grok export",
    "chat history",
    "conversation explorer",
    "3d visualization",
    "sentiment analysis",
    "topic clustering",
    "privacy",
    "client-side",
  ],
} as const;

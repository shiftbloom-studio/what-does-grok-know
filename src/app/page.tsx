"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Lockup, Wordmark } from "@/components/brand/wordmark";
import { Footer } from "@/components/layout/footer";
import { BrainPreview } from "@/components/shared/brain-preview";
import { Button } from "@/components/ui/button";
import { ImportSummary } from "@/components/upload/import-summary";
import { UploadProgress } from "@/components/upload/upload-progress";
import { UploadZone } from "@/components/upload/upload-zone";
import { loadDemoData } from "@/lib/demo/load-demo";
import { hasData } from "@/lib/storage/db-queries";
import { db } from "@/lib/storage/db-schema";

type PagePhase = "idle" | "parsing" | "storing" | "done";

interface ParseStats {
  totalConversations: number;
  totalMessages: number;
  totalHuman: number;
  totalAssistant: number;
  dateRange?: { start: string; end: string };
  modelsFound?: string[];
}

export default function LandingPage() {
  const router = useRouter();
  const workerRef = useRef<Worker | null>(null);

  const [phase, setPhase] = useState<PagePhase>("idle");
  const [progressPhase, setProgressPhase] = useState("parsing");
  const [progressPercent, setProgressPercent] = useState(0);
  const [stats, setStats] = useState<ParseStats | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    hasData()
      .then((exists) => {
        if (exists) router.replace("/brain");
      })
      .catch((err) => console.error("Failed to check for stored data:", err));
  }, [router]);

  const handleFileLoaded = useCallback((text: string) => {
    setPhase("parsing");
    setError(null);

    const worker = new Worker(new URL("../lib/workers/parse-worker.ts", import.meta.url));
    workerRef.current = worker;

    worker.onmessage = async (e) => {
      const msg = e.data;

      if (msg.type === "progress") {
        setProgressPhase(msg.phase);
        setProgressPercent(msg.percent);
      }

      if (msg.type === "complete") {
        setPhase("storing");
        setProgressPhase("storing");
        setProgressPercent(95);

        try {
          await db.conversations.bulkPut(msg.conversations);
          await db.messages.bulkPut(msg.messages);

          const conversations = msg.conversations;
          const dates = conversations
            .map((c: { createdAt: string | Date }) => new Date(c.createdAt).getTime())
            .filter((t: number) => !Number.isNaN(t));

          const models = new Set<string>();
          for (const c of conversations) {
            for (const m of c.models) models.add(m);
          }

          setStats({
            totalConversations: msg.stats.totalConversations,
            totalMessages: msg.stats.totalMessages,
            totalHuman: msg.stats.totalHuman,
            totalAssistant: msg.stats.totalAssistant,
            dateRange:
              dates.length > 0
                ? {
                    start: new Date(Math.min(...dates)).toLocaleDateString(),
                    end: new Date(Math.max(...dates)).toLocaleDateString(),
                  }
                : undefined,
            modelsFound: models.size > 0 ? (Array.from(models) as string[]) : undefined,
          });

          setProgressPercent(100);
          setPhase("done");
        } catch (err) {
          setError(`Could not save the export in this browser: ${(err as Error).message}`);
          setPhase("idle");
        }

        worker.terminate();
      }

      if (msg.type === "error") {
        setError(msg.message);
        setPhase("idle");
        worker.terminate();
      }
    };

    worker.postMessage({ type: "parse", data: text });
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-5">
        <a href="https://shiftbloom.studio" aria-label="shiftbloom studio">
          <Lockup studio />
        </a>
        <Link href="/how-to" className="text-sm text-brand-muted hover:text-brand-text">
          How to get your export
        </Link>
      </header>

      <main className="mx-auto grid w-full max-w-6xl flex-1 items-center gap-12 px-5 pb-16 pt-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
        <div className="animate-unfurl space-y-8">
          <div className="space-y-5">
            <h1 className="text-5xl leading-[1.02] sm:text-6xl">
              <Wordmark />
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-brand-text/85">
              Load the export from your xAI account and each conversation becomes a point in 3D
              space, next to the chats it has the most in common with. Click a point to reread that
              chat. The timeline next door shows which nights you wrote the most.
            </p>
          </div>

          {phase === "idle" && (
            <div className="space-y-4">
              <UploadZone onFileLoaded={handleFileLoaded} />
              {error && <p className="text-sm font-medium text-brand-root">{error}</p>}
              <p className="text-sm text-brand-muted">
                The file is read by this tab and stored on this device.{" "}
                <Link href="/privacy-info" className="link-seed">
                  How to check that
                </Link>
                <span className="px-2 text-brand-border">/</span>
                <button
                  type="button"
                  onClick={async () => {
                    await loadDemoData();
                    router.push("/brain");
                  }}
                  className="link-seed cursor-pointer"
                >
                  Open the demo account
                </button>
              </p>
            </div>
          )}

          {(phase === "parsing" || phase === "storing") && (
            <UploadProgress phase={progressPhase} percent={progressPercent} />
          )}

          {phase === "done" && stats && (
            <div className="space-y-6">
              <ImportSummary stats={stats} />
              <Button size="lg" onClick={() => router.push("/brain")}>
                Open the brain view
              </Button>
            </div>
          )}

          <dl className="grid max-w-xl grid-cols-2 gap-x-6 gap-y-4 border-t border-brand-border pt-6 sm:grid-cols-4">
            {[
              ["0", "uploads"],
              ["200 MB", "max export size"],
              ["6", "ways to look at it"],
              ["AGPL-3.0", "open source"],
            ].map(([value, label]) => (
              <div key={label}>
                <dt className="font-mono text-lg text-brand-text">{value}</dt>
                <dd className="label mt-1">{label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <BrainPreview className="animate-unfurl hidden lg:block" />
      </main>
      <Footer />
    </div>
  );
}

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Lockup } from "@/components/brand/wordmark";
import { Button } from "@/components/ui/button";
import { clearDatabase } from "@/lib/storage/db-queries";

export function Header() {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);

  async function handleDelete() {
    if (!confirming) {
      setConfirming(true);
      return;
    }
    await clearDatabase();
    router.push("/");
  }

  return (
    <header className="sticky top-0 z-30 border-b border-brand-border bg-white">
      <div className="flex h-14 items-center justify-between gap-3 px-4">
        <Link href="/" className="md:hidden" aria-label="what does grok know, start page">
          <Lockup />
        </Link>

        <div className="hidden md:block" />

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            onBlur={() => setConfirming(false)}
            aria-live="polite"
          >
            {confirming ? "Click again to delete" : "Delete data"}
          </Button>
          <Link href="/">
            <Button variant="secondary" size="sm">
              Load another export
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { clearDatabase, isDemoData } from "@/lib/storage/db-queries";

export function DemoBanner() {
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    isDemoData()
      .then(setVisible)
      .catch(() => setVisible(false));
  }, []);

  const handleImport = useCallback(async () => {
    await clearDatabase();
    router.push("/");
  }, [router]);

  if (!visible) return null;

  return (
    <div className="bg-brand-secondary px-4 py-2 text-center text-sm">
      <span className="text-brand-text">This is a made-up demo account, not yours. </span>
      <button type="button" onClick={handleImport} className="link-seed font-medium cursor-pointer">
        Load your own export
      </button>
    </div>
  );
}

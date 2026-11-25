"use client";

import { Suspense } from "react";
import { ConversationDetail } from "./viewer";

// A query parameter instead of a dynamic segment keeps the site fully static (ids only exist in IndexedDB).
export default function ConversationPage() {
  return (
    <Suspense fallback={null}>
      <ConversationDetail />
    </Suspense>
  );
}

import type { Metadata } from "next";
import { DashboardShell } from "@/components/layout/dashboard-shell";

// These views are empty until someone loads an export, so keep them out of search results.
export const metadata: Metadata = {
  robots: { index: false, follow: true },
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <DashboardShell>{children}</DashboardShell>;
}

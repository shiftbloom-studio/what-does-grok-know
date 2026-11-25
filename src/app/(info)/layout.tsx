import Link from "next/link";
import { Wordmark } from "@/components/brand/wordmark";
import { Footer } from "@/components/layout/footer";

export default function InfoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <header className="border-b border-brand-border bg-white">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-4">
          <Link href="/" className="text-lg">
            <Wordmark />
          </Link>
          <Link href="/" className="text-sm text-brand-muted hover:text-brand-text">
            Back to the app
          </Link>
        </div>
      </header>
      <main className="mx-auto w-full max-w-3xl flex-1 px-5 py-12">{children}</main>
      <Footer />
    </div>
  );
}

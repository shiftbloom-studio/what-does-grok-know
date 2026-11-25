import Link from "next/link";
import { Wordmark } from "@/components/brand/wordmark";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-5 text-center">
      <p className="label">404</p>
      <h1 className="text-4xl font-semibold sm:text-5xl">Nothing grew here.</h1>
      <p className="max-w-sm text-brand-muted">
        This page does not exist. If you followed a link to a conversation, it may belong to an
        export that is no longer loaded.
      </p>
      <Link
        href="/"
        className="rounded-full bg-brand-primary px-6 py-3 font-medium text-white transition-colors hover:bg-brand-root"
      >
        Back to <Wordmark className="text-white [&>span]:text-white" />
      </Link>
    </div>
  );
}

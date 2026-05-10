import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  description: "This page has either moved or never existed.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="flex min-h-[100svh] flex-col items-center justify-center bg-white px-6 text-center">
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink/55">
        404 — Lost in transit
      </p>
      <h1
        className="mt-8 font-medium leading-[0.95] tracking-tightest"
        style={{ fontSize: "clamp(2rem, 8vw, 5rem)", color: "#0645AD" }}
      >
        This page is <span className="italic text-ink/55">elsewhere.</span>
      </h1>
      <p className="mt-6 max-w-md text-[14px] leading-relaxed text-ink/65">
        The page you’re looking for has either moved or never existed in this universe.
      </p>
      <Link
        href="/"
        className="mt-10 font-mono text-[11px] uppercase tracking-[0.22em] text-accent underline underline-offset-4 hover:text-accent-hover focus-visible:outline-none focus-visible:underline"
      >
        ← Return to index
      </Link>
    </section>
  );
}

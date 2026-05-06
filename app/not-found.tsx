import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[100svh] flex-col items-center justify-center px-6 text-center">
      <span className="label">/ 404 — Lost in transit</span>
      <h1 className="mt-8 font-display text-mega-2 leading-[0.9] tracking-tightest">
        This page is <span className="italic text-bone/55">elsewhere.</span>
      </h1>
      <p className="mt-6 max-w-md text-bone/65">
        The page you’re looking for has either moved or never existed in this universe.
      </p>
      <Link
        href="/"
        className="mt-10 font-mono text-micro uppercase tracking-[0.22em] underline-anim"
      >
        ← Return to index
      </Link>
    </section>
  );
}

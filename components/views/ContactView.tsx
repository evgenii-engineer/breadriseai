"use client";

import { motion } from "framer-motion";
import { site } from "@/lib/site";

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1], delay },
});

export function ContactView() {
  return (
    <div className="absolute inset-0 grid place-items-center px-6">
      <div className="flex max-w-3xl flex-col items-center gap-10 text-center">
        <motion.span
          className="font-mono text-micro uppercase tracking-[0.22em] text-ink/55"
          {...fade(0)}
        >
          / Contact
        </motion.span>

        <motion.h2
          className="font-display leading-[0.92] tracking-tightest text-balance"
          style={{ fontSize: "clamp(2.25rem, 6vw, 5.5rem)" }}
          {...fade(0.05)}
        >
          Let’s build <span className="italic text-ink/55">something</span> that lasts.
        </motion.h2>

        <motion.p
          className="max-w-md text-lede text-ink/65"
          {...fade(0.18)}
        >
          Reach out on Instagram with a brief, a hunch, or a vague feeling.
          We’ll bring a process, a point of view, and far too many references.
        </motion.p>

        <motion.a
          {...fade(0.3)}
          href={site.contact.href}
          target="_blank"
          rel="noreferrer"
          data-cursor="view"
          data-cursor-label="Open"
          className="group inline-flex items-center gap-3 rounded-full border border-ink/20 px-6 py-3 font-mono text-micro uppercase tracking-[0.22em] text-ink transition-colors duration-300 hover:border-ink/85 md:px-8 md:py-3.5"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            aria-hidden
          >
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
          </svg>
          <span>{site.contact.handle}</span>
          <span className="text-ink/45 transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </motion.a>

        <motion.span
          className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-ink/45 md:text-micro"
          {...fade(0.45)}
        >
          {site.location}
        </motion.span>
      </div>
    </div>
  );
}

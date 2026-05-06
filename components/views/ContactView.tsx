"use client";

import { motion } from "framer-motion";
import { site } from "@/lib/site";

type Pill = { label: string; href: string };

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1], delay },
});

export function ContactView() {
  const pills: Pill[] = [
    { label: site.email, href: `mailto:${site.email}` },
    ...site.social.map((s) => ({ label: s.label, href: s.href })),
    { label: site.location, href: "#" },
  ];

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
          Bring a brief, a hunch, a vague feeling. We’ll bring a process,
          a point of view, and far too many references.
        </motion.p>

        <motion.ul
          className="flex flex-wrap items-center justify-center gap-2 pt-4"
          {...fade(0.28)}
        >
          {pills.map((p, i) => (
            <motion.li
              key={p.label}
              {...fade(0.32 + i * 0.04)}
            >
              <a
                href={p.href}
                target={p.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                data-cursor="hover"
                className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-ink/75 transition-colors duration-300 hover:border-ink/85 hover:text-ink md:px-5 md:py-2.5 md:text-micro"
              >
                {p.label}
              </a>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </div>
  );
}

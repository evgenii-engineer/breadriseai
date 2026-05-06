"use client";

import { motion } from "framer-motion";
import { site } from "@/lib/site";

const FACTS = [
  { k: "Founded", v: "2022" },
  { k: "Based", v: "Paris · Lisbon" },
  { k: "Languages", v: "EN · FR · PT" },
  { k: "Scope", v: "Identity · Web · Film" },
  { k: "Recognition", v: "Awwwards SOTD ×6" },
  { k: "Press", v: "It’s Nice That · Site Inspire" },
];

const fade = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
};

export function StudioView() {
  return (
    <div className="absolute inset-0 grid place-items-center px-6">
      <div className="grid w-full max-w-6xl grid-cols-12 items-end gap-y-12 md:gap-x-10">
        <div className="col-span-12 md:col-span-7">
          <motion.span
            className="font-mono text-micro uppercase tracking-[0.22em] text-ink/55"
            {...fade}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            / Studio
          </motion.span>
          <motion.h2
            className="mt-6 font-display leading-[0.92] tracking-tightest text-balance"
            style={{ fontSize: "clamp(2.5rem, 7vw, 7rem)" }}
            {...fade}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
          >
            We build slow <span className="italic text-ink/55">on purpose.</span>
          </motion.h2>

          <motion.p
            className="mt-10 max-w-xl text-lede text-ink/75"
            {...fade}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
          >
            {site.name} is a small, partner-led studio working at the seam of
            design, direction and code. We collaborate with founders, art
            directors and cultural institutions on identities, films and
            digital experiences that feel inevitable.
          </motion.p>

          <motion.p
            className="mt-6 max-w-xl text-lede text-ink/55"
            {...fade}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.28 }}
          >
            Two principals. A trusted circle of writers, photographers, sound
            designers and engineers. Two or three projects in flight at any
            one time, never more.
          </motion.p>
        </div>

        <dl className="col-span-12 md:col-span-5 md:pl-12">
          {FACTS.map((f, i) => (
            <motion.div
              key={f.k}
              className="flex items-baseline justify-between gap-6 border-b border-ink/10 py-3"
              {...fade}
              transition={{
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.18 + i * 0.06,
              }}
            >
              <dt className="font-mono text-micro uppercase tracking-[0.18em] text-ink/45">
                {f.k}
              </dt>
              <dd className="text-ink">{f.v}</dd>
            </motion.div>
          ))}
        </dl>
      </div>
    </div>
  );
}

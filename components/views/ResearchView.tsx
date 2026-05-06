"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { projects } from "@/lib/projects";

// Two passes through the project list so the wall feels denser, with
// per-cell rotation/offset for an editorial, hand-pinned mood.
const REFS = [...projects, ...projects].map((p, i) => ({
  ...p,
  k: `${p.id}-${i}`,
  // pseudo-random but deterministic per index
  rot: ((i * 37) % 9) - 4,           // -4..4 deg
  offX: ((i * 23) % 18) - 9,          // -9..9 px
  offY: ((i * 17) % 14) - 7,
}));

export function ResearchView() {
  return (
    <div className="absolute inset-0 overflow-y-auto overflow-x-hidden pt-32 pb-24 md:pt-36 md:pb-32">
      <div className="container-edge mb-10 flex items-end justify-between gap-6">
        <div>
          <span className="font-mono text-micro uppercase tracking-[0.22em] text-ink/55">
            / Research
          </span>
          <h2 className="mt-3 max-w-2xl font-display leading-[0.92] tracking-tightest"
              style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}>
            A wall of references —
            <span className="italic text-ink/55"> the studio’s thinking, in pictures.</span>
          </h2>
        </div>
        <span className="hidden font-mono text-micro uppercase tracking-[0.22em] text-ink/45 md:inline">
          {REFS.length} entries
        </span>
      </div>

      <div className="container-edge grid grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 lg:gap-x-4 lg:gap-y-10">
        {REFS.map((r, i) => (
          <motion.figure
            key={r.k}
            initial={{ opacity: 0, y: 18, rotate: r.rot - 2 }}
            animate={{ opacity: 1, y: 0, rotate: r.rot }}
            transition={{
              duration: 0.9,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.04 * (i % 12),
            }}
            style={{ transform: `translate(${r.offX}px, ${r.offY}px) rotate(${r.rot}deg)` }}
            className="relative aspect-[4/5] overflow-hidden bg-paper-300 shadow-[0_18px_28px_-22px_rgba(20,16,10,0.45)] ring-1 ring-ink/5"
            data-cursor="view"
          >
            <Image
              src={r.cover}
              alt={r.title}
              fill
              unoptimized
              sizes="(min-width:1024px) 16vw, (min-width:640px) 30vw, 45vw"
              className="object-cover"
            />
          </motion.figure>
        ))}
      </div>

      <div className="container-edge mt-16 max-w-2xl text-ink/65">
        <p className="text-lede text-balance">
          Research isn’t the rehearsal — it’s the work. Every brief begins with
          a saturated wall of references: paintings, film stills, broken
          surfaces, archival photography, and the things we cannot yet name.
        </p>
      </div>
    </div>
  );
}

"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { allReferencePlates } from "@/lib/projects";
import { useView } from "@/lib/view-context";
import { useBreakpoint } from "@/lib/use-breakpoint";

const ACCENT = "#0645AD";

/** Tiny deterministic pseudo-random for stable per-plate placement. */
function rand(seed: number, salt: number) {
  const x = (seed * 9301 + salt * 49297 + 233280) % 233280;
  return x / 233280;
}

function fileNameFor(url: string) {
  const slash = url.lastIndexOf("/");
  return slash >= 0 ? url.slice(slash + 1) : url;
}

export function ReferencesView() {
  const { openProject } = useView();
  const bp = useBreakpoint();
  const isSmall = bp === "sm";

  const { cols, placed } = useMemo(() => {
    // Lay out the icons on a regular grid, but assign each plate to
    // a *random* cell from a deliberately oversized pool of cells.
    // Some cells stay empty — gives the Finder/desktop look where a
    // few icons have been dragged off, leaving holes.
    const cols = isSmall ? 4 : 9;
    const total = allReferencePlates.length;
    const fillRatio = 0.6; // ~60% cells filled, 40% empty
    const cellCount = Math.ceil(total / fillRatio);
    const rows = Math.ceil(cellCount / cols);

    // Deterministic Fisher–Yates shuffle of cell indices.
    const indices = Array.from({ length: cols * rows }, (_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const r = rand(i + 1, 17);
      const j = Math.floor(r * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }

    // Assign the first N shuffled cells to plates, in order.
    const placed = allReferencePlates.map((p, i) => {
      const cellIdx = indices[i];
      const col = cellIdx % cols;
      const row = Math.floor(cellIdx / cols);
      return { ...p, col, row };
    });

    return { cols, placed };
  }, [isSmall]);

  return (
    <div className="absolute inset-0 overflow-y-auto overflow-x-hidden bg-white pt-24 pb-16 md:pt-28 md:pb-20">
      <div className="container-edge mb-6">
        <span
          className="block leading-none"
          style={{ fontSize: 14, color: ACCENT }}
        >
          visual storage
        </span>
      </div>

      <div
        className="mx-auto px-4 md:px-8"
        style={{ maxWidth: "min(1700px, 100%)" }}
      >
        <div
          className="grid items-start"
          style={{
            gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
            columnGap: 12,
            rowGap: 24,
          }}
        >
          {placed.map((p, i) => {
            const fn = fileNameFor(p.src);
            return (
              <motion.button
                key={p.key}
                type="button"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.55,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.025 * (i % 16),
                }}
                onClick={() => openProject(p.projectId)}
                aria-label={`Open ${p.projectTitle}`}
                style={{
                  gridColumnStart: p.col + 1,
                  gridRowStart: p.row + 1,
                }}
                className="group flex flex-col items-center gap-1.5 rounded-md p-1.5 text-center transition-colors duration-200 hover:bg-ink/[0.05] focus:bg-ink/[0.08] focus:outline-none"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-paper-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.src}
                    alt={p.projectTitle}
                    loading={i < 12 ? "eager" : "lazy"}
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </div>
                <span
                  className="block w-full break-all text-[10px] leading-[1.2] text-ink/80 group-hover:text-ink"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {fn}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

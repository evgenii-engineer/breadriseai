"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { allReferencePlates } from "@/lib/projects";
import { useView } from "@/lib/view-context";
import { useBreakpoint } from "@/lib/use-breakpoint";

/** Tiny deterministic pseudo-random for stable per-image placement. */
function rand(seed: number, salt: number) {
  const x = (seed * 9301 + salt * 49297 + 233280) % 233280;
  return x / 233280;
}

export function ReferencesView() {
  const { openProject } = useView();
  const bp = useBreakpoint();
  const isSmall = bp === "sm";

  const wall = useMemo(() => {
    // Tiny finder-thumbnail-style plates scattered across the wall.
    // Sizes are in pixels (not vw) so they stay genuinely small on
    // any viewport, with mild per-photo variance for chaos.
    const cols = isSmall ? 3 : 7;
    const colWidth = 100 / cols;
    const rowHpx = isSmall ? 130 : 150;     // vertical rhythm in px
    const baseWpx = isSmall ? 78 : 96;       // smallest photo width
    const widthVarPx = isSmall ? 22 : 28;    // up to +N px

    return allReferencePlates.map((p, i) => {
      const r1 = rand(i + 1, 17);
      const r2 = rand(i + 1, 31);
      const r3 = rand(i + 1, 53);

      const col = i % cols;
      const rowInCol = Math.floor(i / cols);

      const colCentre = colWidth * col + colWidth / 2;
      const jitterX = (r1 - 0.5) * colWidth * 0.55;

      const colHeadStart = col * (isSmall ? 28 : 22);
      const baseTopPx = colHeadStart + rowInCol * rowHpx;
      const jitterYpx = (r2 - 0.5) * (isSmall ? 28 : 36);

      return {
        ...p,
        leftPct: colCentre + jitterX,
        topPx: baseTopPx + jitterYpx,
        widthPx: Math.round(baseWpx + r3 * widthVarPx),
      };
    });
  }, [isSmall]);

  const boardHeightPx = useMemo(() => {
    if (wall.length === 0) return 800;
    const maxTop = Math.max(...wall.map((p) => p.topPx));
    return maxTop + (isSmall ? 220 : 240);
  }, [wall, isSmall]);

  return (
    <div className="absolute inset-0 overflow-y-auto overflow-x-hidden bg-white pt-24 pb-16 md:pt-28 md:pb-20">
      <div className="container-edge mb-6">
        <span
          className="block leading-none"
          style={{ fontSize: 14, color: "#0645AD" }}
        >
          visual storage
        </span>
      </div>

      <div
        className="relative mx-auto w-full"
        style={{ height: `${boardHeightPx}px`, maxWidth: "min(1700px, 100%)" }}
      >
        {wall.map((p, i) => (
          <motion.button
            key={p.key}
            type="button"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.03 * (i % 14),
            }}
            onClick={() => openProject(p.projectId)}
            aria-label={`Open ${p.projectTitle}`}
            className="absolute block transition-transform duration-500 ease-out hover:-translate-y-0.5"
            style={{
              left: `${p.leftPct}%`,
              top: `${p.topPx}px`,
              width: `${p.widthPx}px`,
              transform: "translate(-50%, 0)",
            }}
          >
            <div className="relative aspect-[3/4] overflow-hidden bg-paper-200 ring-1 ring-ink/5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.src}
                alt={p.projectTitle}
                loading={i < 8 ? "eager" : "lazy"}
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

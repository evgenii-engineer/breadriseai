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
    // Tight, chaotic packing — small photos at random positions,
    // never rotated. Loose 4/2 column rhythm keeps it from collapsing
    // into a single dense pile.
    const cols = isSmall ? 2 : 4;
    const colWidth = 100 / cols;
    const rowH = isSmall ? 38 : 26;
    const baseW = isSmall ? 30 : 13;
    const widthVar = isSmall ? 6 : 5;

    return allReferencePlates.map((p, i) => {
      const r1 = rand(i + 1, 17);
      const r2 = rand(i + 1, 31);
      const r3 = rand(i + 1, 53);

      const col = i % cols;
      const rowInCol = Math.floor(i / cols);

      const colCentre = colWidth * col + colWidth / 2;
      const jitterX = (r1 - 0.5) * colWidth * 0.7;

      const colHeadStart = col * (isSmall ? 8 : 10);
      const baseTop = colHeadStart + rowInCol * rowH;
      const jitterY = (r2 - 0.5) * (isSmall ? 14 : 12);

      return {
        ...p,
        leftPct: colCentre + jitterX,
        topVh: baseTop + jitterY,
        widthVw: baseW + r3 * widthVar,
      };
    });
  }, [isSmall]);

  const boardHeightVh = useMemo(() => {
    if (wall.length === 0) return 100;
    const maxTop = Math.max(...wall.map((p) => p.topVh));
    return maxTop + (isSmall ? 50 : 40);
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
        style={{ height: `${boardHeightVh}vh`, maxWidth: "min(1700px, 100%)" }}
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
              top: `${p.topVh}vh`,
              width: `${p.widthVw}vw`,
              maxWidth: 240,
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

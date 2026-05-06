"use client";

import { useEffect, useMemo } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { projects, type Project } from "@/lib/projects";
import { useView } from "@/lib/view-context";
import { useBreakpoint } from "@/lib/use-breakpoint";

/**
 * Project detail panel.
 * Lays the project's photos out as a chaotic moodboard — scattered
 * across loose columns with per-photo rotation, jitter, and size
 * variance. Vertical scroll is the only navigation; click the close
 * button or hit ESC to exit.
 */
export function ProjectDetail() {
  const { selectedProject, closeProject } = useView();
  const project: Project | undefined = projects.find(
    (p) => p.id === selectedProject,
  );

  return (
    <AnimatePresence>
      {project && (
        <DetailPanel
          key={project.id}
          project={project}
          onClose={closeProject}
        />
      )}
    </AnimatePresence>
  );
}

type Placed = {
  src: string;
  alt: string;
  leftPct: number;
  topVh: number;
  widthVw: number;
  rotation: number;
};

/** Tiny deterministic pseudo-random — same input → same output. */
function rand(seed: number, salt: number) {
  const x = (seed * 9301 + salt * 49297 + 233280) % 233280;
  return x / 233280;
}

function placePhotos(
  project: Project,
  cols: number,
  isSmall: boolean,
): Placed[] {
  // Per-column width on which we centre photos.
  const colWidth = 100 / cols;
  // Per-photo width as a percentage of viewport width.
  const baseW = isSmall ? 56 : 24;
  const widthVar = isSmall ? 6 : 6;
  // How far apart consecutive photos in the same column sit, vertically.
  const rowH = isSmall ? 60 : 50;

  return project.gallery.map((src, i) => {
    const r1 = rand(i + 1, 17);
    const r2 = rand(i + 1, 31);
    const r3 = rand(i + 1, 53);
    const r4 = rand(i + 1, 71);

    const col = i % cols;
    const rowInCol = Math.floor(i / cols);

    const colCentre = colWidth * col + colWidth / 2;
    const jitterX = (r1 - 0.5) * colWidth * 0.42;

    const colHeadStart = col * 14;
    const baseTop = colHeadStart + rowInCol * rowH;
    const jitterY = (r2 - 0.5) * 14;

    return {
      src,
      alt: `${project.title} — ${i + 1}`,
      leftPct: colCentre + jitterX,
      topVh: baseTop + jitterY,
      widthVw: baseW + r3 * widthVar,
      rotation: (r4 - 0.5) * 14, // ±7°
    };
  });
}

function DetailPanel({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const bp = useBreakpoint();
  const cols = bp === "sm" ? 2 : 3;

  const placed = useMemo(
    () => placePhotos(project, cols, bp === "sm"),
    [project, cols, bp],
  );

  // The board needs to be tall enough to hold the lowest photo.
  const boardHeightVh = useMemo(() => {
    if (placed.length === 0) return 100;
    const maxTop = Math.max(...placed.map((p) => p.topVh));
    return maxTop + (bp === "sm" ? 80 : 70); // breathing room for the photo + padding
  }, [placed, bp]);

  // Lock the page scroll while open. Inner panel scrolls.
  useEffect(() => {
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, []);

  // ESC closes.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[90] bg-paper text-ink"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      role="dialog"
      aria-modal="true"
    >
      {/* top bar */}
      <div className="container-edge fixed inset-x-0 top-0 z-20 flex items-start justify-between gap-3 bg-gradient-to-b from-paper via-paper/85 to-transparent pt-4 pb-8 md:gap-6 md:pt-6 md:pb-10">
        <div className="min-w-0">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/55 md:text-micro">
            {project.index} · {project.year} · {project.gallery.length} photos
          </span>
          <motion.h2
            className="mt-1.5 truncate leading-[0.95] tracking-tightest md:mt-2"
            style={{ fontSize: "clamp(1.4rem, 4.2vw, 3.75rem)" }}
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            {project.title}
          </motion.h2>
          <span className="mt-1.5 inline-block truncate font-mono text-[9px] uppercase tracking-[0.2em] text-ink/50 md:mt-2 md:text-micro">
            {project.discipline.join(" · ")}
          </span>
        </div>
        <button
          type="button"
          onClick={onClose}
          data-cursor="hover"
          aria-label="Close project"
          className="shrink-0 rounded-full border border-ink/25 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-ink transition-colors duration-300 hover:border-ink/85 md:px-4 md:py-2 md:text-micro"
        >
          <span className="md:hidden">✕</span>
          <span className="hidden md:inline">Close ✕</span>
        </button>
      </div>

      {/* scattered moodboard */}
      <div className="absolute inset-0 overflow-y-auto overflow-x-hidden pt-28 pb-16 md:pt-36 md:pb-20">
        <div
          className="relative mx-auto w-full"
          style={{ height: `${boardHeightVh}vh`, maxWidth: "min(1600px, 100%)" }}
        >
          {placed.map((p, i) => (
            <motion.figure
              key={p.src}
              initial={{ opacity: 0, y: 24, rotate: p.rotation - 4, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, rotate: p.rotation, scale: 1 }}
              transition={{
                duration: 0.95,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.08 * (i % 9),
              }}
              className="absolute"
              style={{
                left: `${p.leftPct}%`,
                top: `${p.topVh}vh`,
                width: `${p.widthVw}vw`,
                maxWidth: "420px",
                transform: `translate(-50%, 0) rotate(${p.rotation}deg)`,
                transformOrigin: "center top",
              }}
              data-cursor="hover"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-paper-300 shadow-[0_30px_50px_-30px_rgba(20,16,10,0.55)] ring-1 ring-ink/5 transition-transform duration-500 ease-out hover:-translate-y-1">
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  unoptimized
                  sizes="(max-width:768px) 56vw, 28vw"
                  className="object-cover"
                  priority={i < 3}
                />
              </div>
            </motion.figure>
          ))}
        </div>
      </div>

      {/* footer hint */}
      <div className="container-edge pointer-events-none absolute inset-x-0 bottom-3 z-20 flex items-end justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-ink/55 md:bottom-7 md:text-micro">
        <span>{project.gallery.length} photos · scroll</span>
        <span className="hidden md:inline">ESC to close</span>
      </div>
    </motion.div>
  );
}

"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { projects, type Project } from "@/lib/projects";
import { useView } from "@/lib/view-context";

/**
 * Vertical "vinyl crate" gallery.
 *
 * The active image fills the centre, upright. A few upcoming images
 * peek over the top, leaning back into Z. Advancing flips the active
 * card forward and out, the next one comes upright. Wheel, arrow
 * keys and touch swipe all step through.
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

function DetailPanel({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const [active, setActive] = useState(0);
  const total = project.gallery.length;
  const lastInputRef = useRef(0);

  // Lock body scroll while panel is open.
  useEffect(() => {
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, []);

  const advance = useCallback(
    (dir: 1 | -1) => {
      const now = performance.now();
      // Debounce so a single wheel swipe doesn't fly through the gallery.
      if (now - lastInputRef.current < 320) return;
      lastInputRef.current = now;
      setActive((a) => Math.max(0, Math.min(total - 1, a + dir)));
    },
    [total],
  );

  // Wheel + keyboard.
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (Math.abs(e.deltaY) < 6) return;
      advance(e.deltaY > 0 ? 1 : -1);
    };
    const onKey = (e: KeyboardEvent) => {
      if (["ArrowDown", "PageDown", " "].includes(e.key)) advance(1);
      if (["ArrowUp", "PageUp"].includes(e.key)) advance(-1);
      if (e.key === "Home") setActive(0);
      if (e.key === "End") setActive(total - 1);
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
    };
  }, [advance, total]);

  // Touch swipe.
  useEffect(() => {
    let startY: number | null = null;
    const onStart = (e: TouchEvent) => {
      startY = e.touches[0]?.clientY ?? null;
    };
    const onEnd = (e: TouchEvent) => {
      if (startY == null) return;
      const endY = e.changedTouches[0]?.clientY;
      if (endY == null) return;
      const dy = endY - startY;
      if (Math.abs(dy) > 40) advance(dy < 0 ? 1 : -1);
      startY = null;
    };
    window.addEventListener("touchstart", onStart, { passive: true });
    window.addEventListener("touchend", onEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onStart);
      window.removeEventListener("touchend", onEnd);
    };
  }, [advance]);

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
            {project.index} · {project.year}
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

      {/* vinyl crate */}
      <div
        className="absolute inset-0"
        style={{ perspective: "2200px", perspectiveOrigin: "50% 55%" }}
      >
        <div className="absolute inset-0">
          {project.gallery.map((src, i) => (
            <CrateCard
              key={src}
              src={src}
              alt={`${project.title} — ${i + 1}`}
              offset={i - active}
              total={total}
            />
          ))}
        </div>
      </div>

      {/* counter + cues */}
      <div className="container-edge pointer-events-none absolute inset-x-0 bottom-3 z-20 flex items-end justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-ink/55 md:bottom-7 md:gap-6 md:text-micro">
        <div className="flex items-baseline gap-2 md:gap-3">
          <span className="text-ink tabular-nums">
            {String(active + 1).padStart(2, "0")}
          </span>
          <span className="text-ink/30">/</span>
          <span className="tabular-nums">{String(total).padStart(2, "0")}</span>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <span>Scroll · ↑ ↓ · swipe</span>
          <span className="text-ink/30">/</span>
          <span>ESC to close</span>
        </div>

        <div className="pointer-events-auto flex items-center gap-1">
          <button
            type="button"
            onClick={() => setActive((a) => Math.max(0, a - 1))}
            data-cursor="hover"
            aria-label="Previous"
            disabled={active === 0}
            className="rounded-full border border-ink/20 px-2.5 py-1 transition-colors duration-300 hover:border-ink/85 disabled:opacity-30 disabled:hover:border-ink/20 md:px-3 md:py-1.5"
          >
            ↑
          </button>
          <button
            type="button"
            onClick={() =>
              setActive((a) => Math.min(total - 1, a + 1))
            }
            data-cursor="hover"
            aria-label="Next"
            disabled={active === total - 1}
            className="rounded-full border border-ink/20 px-2.5 py-1 transition-colors duration-300 hover:border-ink/85 disabled:opacity-30 disabled:hover:border-ink/20 md:px-3 md:py-1.5"
          >
            ↓
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/**
 * Compute transform / opacity for a single card based on its offset
 * from the active index.
 */
function crateStyle(offset: number): React.CSSProperties {
  if (offset === 0) {
    return {
      transform:
        "translate3d(0, 0, 0) rotateX(0deg) scale(1)",
      opacity: 1,
      zIndex: 60,
    };
  }
  if (offset > 0) {
    // Upcoming records lean back behind the active one.
    const o = Math.min(offset, 4);
    const ty = -22 - o * 14;          // rise to peek over the top
    const tz = -90 - o * 110;          // recede
    const rx = -6 - o * 4;             // tilt back
    const scale = 1 - o * 0.025;
    return {
      transform: `translate3d(0, ${ty}px, ${tz}px) rotateX(${rx}deg) scale(${scale})`,
      opacity: offset > 4 ? 0 : Math.max(0, 0.95 - o * 0.22),
      zIndex: 50 - o,
    };
  }
  // Past records flip forward toward the camera and fall out of view.
  const o = -offset;
  return {
    transform: `translate3d(0, ${-o * 80}vh, 0) rotateX(${30 + o * 8}deg)`,
    opacity: 0,
    zIndex: 30,
  };
}

function CrateCard({
  src,
  alt,
  offset,
  total,
}: {
  src: string;
  alt: string;
  offset: number;
  total: number;
}) {
  const isActive = offset === 0;
  // Don't bother rendering very far away cards.
  if (offset < -1 || offset > 5) {
    return null;
  }
  void total;
  return (
    <div
      className="absolute inset-0 flex items-center justify-center px-4 pt-28 pb-16 md:px-6 md:pt-36 md:pb-24"
      style={{
        ...crateStyle(offset),
        transition:
          "transform 720ms cubic-bezier(0.16, 1, 0.3, 1), opacity 520ms ease-out",
        transformStyle: "preserve-3d",
        willChange: "transform, opacity",
      }}
    >
      <div className="relative aspect-[3/4] h-full max-h-[78vh] w-auto max-w-[88vw] overflow-hidden bg-paper-300 shadow-[0_38px_60px_-30px_rgba(20,16,10,0.55)] ring-1 ring-ink/5">
        <Image
          src={src}
          alt={alt}
          fill
          unoptimized
          sizes="(max-width:768px) 88vw, 78vh"
          className="object-cover"
          priority={isActive}
        />
      </div>
    </div>
  );
}

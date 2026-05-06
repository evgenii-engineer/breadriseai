"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { projects, type Project } from "@/lib/projects";
import { useView } from "@/lib/view-context";

/**
 * Project detail panel.
 * Pinterest-style masonry of every photo in the project. No rotation,
 * no swipe gestures — just a tight vertical column flow that lets
 * each photo keep its natural aspect ratio.
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
  // Lock outer scroll while open; the panel scrolls internally.
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

      {/* masonry */}
      <div className="absolute inset-0 overflow-y-auto overflow-x-hidden pt-28 pb-16 md:pt-36 md:pb-20">
        <div
          className="mx-auto px-4 md:px-8"
          style={{ maxWidth: "min(1500px, 100%)" }}
        >
          <div className="columns-2 gap-2 sm:columns-3 md:gap-3 lg:columns-4 lg:gap-4">
            {project.gallery.map((src, i) => (
              <motion.figure
                key={src}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.04 * (i % 10),
                }}
                className="mb-2 break-inside-avoid md:mb-3 lg:mb-4"
              >
                {/*
                  Native <img> here — the masonry needs each photo's
                  natural aspect to drive its rendered height, and
                  Next/Image with `fill` would blow that up.
                */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={`${project.title} — ${i + 1}`}
                  loading={i < 4 ? "eager" : "lazy"}
                  decoding="async"
                  data-cursor="hover"
                  className="block w-full bg-paper-300 ring-1 ring-ink/5 transition-transform duration-500 ease-out hover:-translate-y-0.5"
                />
              </motion.figure>
            ))}
          </div>
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

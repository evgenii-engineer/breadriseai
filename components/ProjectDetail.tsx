"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { projects, type Project } from "@/lib/projects";
import { useView } from "@/lib/view-context";

const ACCENT = "#0645AD";

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
      className="fixed inset-0 z-[90] bg-white text-ink"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      role="dialog"
      aria-modal="true"
    >
      {/* sticky close button only — the rest of the header scrolls
          with the page so the layout matches the brief mockup */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close project"
        className="fixed right-6 top-5 z-30 rounded-full border border-ink/25 bg-white px-3 py-1.5 text-[11px] uppercase tracking-[0.22em] text-ink transition-colors duration-300 hover:border-ink/85 md:right-10 md:top-6 md:px-4 md:py-2 md:text-[12px]"
      >
        <span className="md:hidden">✕</span>
        <span className="hidden md:inline">Close ✕</span>
      </button>

      <div className="absolute inset-0 overflow-y-auto overflow-x-hidden">
        <div
          className="mx-auto px-6 pb-20 pt-16 md:px-10 md:pb-28 md:pt-20"
          style={{ maxWidth: "min(1600px, 100%)" }}
        >
          {/* page header */}
          <div className="flex items-baseline gap-3 text-[11px] uppercase tracking-[0.22em] text-ink/55 md:text-[12px]">
            <span>{project.index}</span>
            <span className="text-ink/30">·</span>
            <span>{project.year}</span>
            {project.gallery.length > 0 && (
              <>
                <span className="text-ink/30">·</span>
                <span>{project.gallery.length} photos</span>
              </>
            )}
          </div>

          <motion.h2
            className="mt-2 leading-[0.95] tracking-tightest"
            style={{
              fontSize: "clamp(2rem, 6vw, 5rem)",
              color: ACCENT,
            }}
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            {project.title}
          </motion.h2>

          {/* services + description */}
          {(project.services?.length || project.description) && (
            <div className="mt-10 grid grid-cols-1 gap-y-8 md:mt-14 md:grid-cols-12 md:gap-x-10">
              {project.services?.length ? (
                <div className="md:col-span-4">
                  <span
                    className="block text-[13px] leading-tight"
                    style={{ color: ACCENT }}
                  >
                    Services
                  </span>
                  <ul className="mt-3 space-y-1 text-[14px] leading-snug text-ink/85 md:text-[15px]">
                    {project.services.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {project.description ? (
                <div className="md:col-span-8">
                  <span
                    className="block text-[13px] leading-tight"
                    style={{ color: ACCENT }}
                  >
                    Description
                  </span>
                  <div className="mt-3 max-w-2xl space-y-4 text-[14px] leading-relaxed text-ink/85 md:text-[15px]">
                    {project.description.split("\n\n").map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          )}

          {/* visual signatures + designed for */}
          {(project.visualSignatures?.length || project.designedFor?.length) && (
            <div className="mt-10 grid grid-cols-1 gap-y-8 md:mt-14 md:grid-cols-12 md:gap-x-10">
              {project.visualSignatures?.length ? (
                <div className="md:col-span-6">
                  <span
                    className="block text-[13px] leading-tight"
                    style={{ color: ACCENT }}
                  >
                    Visual signatures
                  </span>
                  <ul className="mt-3 space-y-1 text-[14px] leading-snug text-ink/85 md:text-[15px]">
                    {project.visualSignatures.map((s) => (
                      <li key={s}>— {s}</li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {project.designedFor?.length ? (
                <div className="md:col-span-6">
                  <span
                    className="block text-[13px] leading-tight"
                    style={{ color: ACCENT }}
                  >
                    Designed for
                  </span>
                  <ul className="mt-3 space-y-1 text-[14px] leading-snug text-ink/85 md:text-[15px]">
                    {project.designedFor.map((s) => (
                      <li key={s}>— {s}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          )}

          {/* photo masonry */}
          {project.gallery.length > 0 && (
            <div className="mt-14 md:mt-20">
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
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={src}
                      alt={`${project.title} — ${i + 1}`}
                      loading={i < 4 ? "eager" : "lazy"}
                      decoding="async"
                      className="block w-full bg-paper-200 ring-1 ring-ink/5"
                    />
                  </motion.figure>
                ))}
              </div>
            </div>
          )}

          {/* footer hint */}
          <div className="mt-12 flex items-center justify-between text-[11px] uppercase tracking-[0.22em] text-ink/55 md:text-[12px]">
            <span>
              {project.gallery.length > 0
                ? `${project.gallery.length} photos`
                : "Visuals coming soon"}
            </span>
            <span className="hidden md:inline">ESC to close</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

"use client";

import { useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { projects, type Project } from "@/lib/projects";
import { useView } from "@/lib/view-context";

export function ProjectDetail() {
  const { selectedProject, closeProject } = useView();
  const project: Project | undefined = projects.find(
    (p) => p.id === selectedProject,
  );

  // Lock body scroll while open.
  useEffect(() => {
    if (!selectedProject) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, [selectedProject]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="detail"
          className="fixed inset-0 z-[90] bg-paper text-ink"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          role="dialog"
          aria-modal="true"
        >
          {/* top bar */}
          <div className="container-edge fixed inset-x-0 top-0 z-10 flex items-start justify-between gap-6 bg-gradient-to-b from-paper via-paper/85 to-transparent pt-5 pb-10 md:pt-6">
            <div>
              <span className="font-mono text-micro uppercase tracking-[0.22em] text-ink/55">
                {project.index} · {project.year}
              </span>
              <motion.h2
                className="mt-2 leading-[0.92] tracking-tightest"
                style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)" }}
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              >
                {project.title}
              </motion.h2>
              <span className="mt-3 inline-block font-mono text-[10px] uppercase tracking-[0.22em] text-ink/50 md:text-micro">
                {project.discipline.join(" · ")}
              </span>
            </div>
            <button
              type="button"
              onClick={closeProject}
              data-cursor="hover"
              aria-label="Close project"
              className="rounded-full border border-ink/25 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-ink transition-colors duration-300 hover:border-ink/85 md:text-micro"
            >
              Close ✕
            </button>
          </div>

          {/* horizontal gallery */}
          <div className="absolute inset-0 flex items-center overflow-x-auto overflow-y-hidden px-6 pt-32 pb-16 md:pt-36 md:pb-20">
            <div className="flex h-full items-center gap-4 md:gap-6">
              {project.gallery.map((src, i) => (
                <motion.figure
                  key={src}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.7,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.06 * i,
                  }}
                  className="relative h-full max-h-[78vh] aspect-[3/4] flex-shrink-0 overflow-hidden bg-paper-300 ring-1 ring-ink/5"
                >
                  <Image
                    src={src}
                    alt={`${project.title} — ${i + 1}`}
                    fill
                    unoptimized
                    sizes="60vh"
                    className="object-cover"
                    priority={i < 3}
                  />
                </motion.figure>
              ))}
            </div>
          </div>

          {/* footer hint */}
          <div className="container-edge pointer-events-none absolute inset-x-0 bottom-5 flex items-end justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-ink/45 md:bottom-7 md:text-micro">
            <span>Scroll horizontally — {project.gallery.length} images</span>
            <span>ESC to close</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

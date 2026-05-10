"use client";

import { useEffect, useState } from "react";
import { projects, type Project } from "@/lib/projects";
import { useView } from "@/lib/view-context";
import { Img } from "@/components/Img";

const ACCENT = "#0645AD";
const ENTER_MS = 400;
const EXIT_MS = 280;

export function ProjectDetail() {
  const { selectedProject, closeProject } = useView();
  const [mounted, setMounted] = useState<Project | null>(null);
  const [open, setOpen] = useState(false);

  // Lifecycle: mount → next frame → set open=true (fade in).
  // closeProject() → set open=false → wait EXIT_MS → unmount.
  useEffect(() => {
    const project = projects.find((p) => p.id === selectedProject) ?? null;
    if (project) {
      setMounted(project);
      // Toggle in a microtask so the initial render uses opacity 0.
      const id = requestAnimationFrame(() => setOpen(true));
      return () => cancelAnimationFrame(id);
    }
    if (mounted) {
      setOpen(false);
      const id = setTimeout(() => setMounted(null), EXIT_MS);
      return () => clearTimeout(id);
    }
  }, [selectedProject, mounted]);

  if (!mounted) return null;
  return <DetailPanel project={mounted} open={open} onClose={closeProject} />;
}

function DetailPanel({
  project,
  open,
  onClose,
}: {
  project: Project;
  open: boolean;
  onClose: () => void;
}) {
  // Lock outer scroll while open.
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
    <div
      className="fixed inset-0 z-[90] bg-white text-ink"
      style={{
        opacity: open ? 1 : 0,
        transition: `opacity ${open ? ENTER_MS : EXIT_MS}ms cubic-bezier(0.16, 1, 0.3, 1)`,
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-title"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close project"
        className="fixed right-6 top-5 z-30 rounded-full border border-ink/25 bg-white px-3 py-1.5 text-[11px] uppercase tracking-[0.22em] text-ink transition-colors duration-300 hover:border-ink/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 md:right-10 md:top-6 md:px-4 md:py-2 md:text-[12px]"
      >
        <span className="md:hidden" aria-hidden>✕</span>
        <span className="hidden md:inline">Close ✕</span>
      </button>

      <div className="absolute inset-0 overflow-y-auto overflow-x-hidden">
        <div
          className="mx-auto px-6 pb-20 pt-16 md:px-10 md:pb-28 md:pt-20"
          style={{ maxWidth: "min(1600px, 100%)" }}
        >
          <div className="flex items-baseline gap-3 text-[11px] uppercase tracking-[0.22em] text-ink/55 md:text-[12px]">
            <span>{project.index}</span>
            <span className="text-ink/30" aria-hidden>·</span>
            <span>{project.year}</span>
            {project.gallery.length > 0 && (
              <>
                <span className="text-ink/30" aria-hidden>·</span>
                <span>{project.gallery.length} photos</span>
              </>
            )}
          </div>

          <h1
            id="project-title"
            className="mt-2 leading-[0.95] tracking-tightest animate-detail-title"
            style={{ fontSize: "clamp(2rem, 6vw, 5rem)", color: ACCENT }}
          >
            {project.title}
          </h1>

          {(project.services?.length || project.description) && (
            <div className="mt-10 grid grid-cols-1 gap-y-8 md:mt-14 md:grid-cols-12 md:gap-x-10">
              {project.services?.length ? (
                <div className="md:col-span-4">
                  <h2 className="block text-[13px] font-normal leading-tight" style={{ color: ACCENT }}>
                    Services
                  </h2>
                  <ul className="mt-3 space-y-1 text-[14px] leading-snug text-ink/85 md:text-[15px]">
                    {project.services.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {project.description ? (
                <div className="md:col-span-8">
                  <h2 className="block text-[13px] font-normal leading-tight" style={{ color: ACCENT }}>
                    Description
                  </h2>
                  <div className="mt-3 max-w-2xl space-y-4 text-[14px] leading-relaxed text-ink/85 md:text-[15px]">
                    {project.description.split("\n\n").map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          )}

          {(project.visualSignatures?.length || project.designedFor?.length) && (
            <div className="mt-10 grid grid-cols-1 gap-y-8 md:mt-14 md:grid-cols-12 md:gap-x-10">
              {project.visualSignatures?.length ? (
                <div className="md:col-span-6">
                  <h2 className="block text-[13px] font-normal leading-tight" style={{ color: ACCENT }}>
                    Visual signatures
                  </h2>
                  <ul className="mt-3 space-y-1 text-[14px] leading-snug text-ink/85 md:text-[15px]">
                    {project.visualSignatures.map((s) => (
                      <li key={s}>— {s}</li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {project.designedFor?.length ? (
                <div className="md:col-span-6">
                  <h2 className="block text-[13px] font-normal leading-tight" style={{ color: ACCENT }}>
                    Designed for
                  </h2>
                  <ul className="mt-3 space-y-1 text-[14px] leading-snug text-ink/85 md:text-[15px]">
                    {project.designedFor.map((s) => (
                      <li key={s}>— {s}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          )}

          {project.gallery.length > 0 && (
            <div className="mt-14 md:mt-20">
              <div className="columns-2 gap-2 sm:columns-3 md:gap-3 lg:columns-4 lg:gap-4">
                {project.gallery.map((image, i) => (
                  <figure
                    key={image.src}
                    className="mb-2 break-inside-avoid animate-rise-in md:mb-3 lg:mb-4"
                    style={{ animationDelay: `${40 * (i % 10)}ms` }}
                  >
                    <Img
                      image={image}
                      alt={`${project.title} — frame ${i + 1}`}
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                      priority={i === 0}
                      loading={i < 4 ? "eager" : "lazy"}
                      className="w-full bg-paper-200 ring-1 ring-ink/5"
                    />
                  </figure>
                ))}
              </div>
            </div>
          )}

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
    </div>
  );
}

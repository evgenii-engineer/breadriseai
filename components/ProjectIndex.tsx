"use client";

import { projects } from "@/lib/projects";
import { useView } from "@/lib/view-context";

/**
 * Flat editorial index — shown when the OVERVIEW / INDEX toggle
 * switches the hero away from the 3D stack. Clicking a row opens the
 * project's detail panel.
 */
export function ProjectIndex() {
  const { openProject } = useView();

  return (
    <div className="absolute inset-0 grid place-items-center px-6">
      <div className="w-full max-w-5xl">
        <div className="mb-6 grid grid-cols-12 border-b border-ink/15 pb-3 font-mono text-micro uppercase tracking-[0.18em] text-ink/45">
          <span className="col-span-1">№</span>
          <span className="col-span-6">Title</span>
          <span className="col-span-3">Discipline</span>
          <span className="col-span-1 text-right">Year</span>
          <span className="col-span-1" aria-hidden />
        </div>
        <ul className="divide-y divide-ink/10">
          {projects.map((p) => (
            <li key={p.id}>
              <button
                type="button"
                onClick={() => openProject(p.id)}
                data-cursor="view"
                data-cursor-label="Open"
                aria-label={`Open ${p.title}`}
                className="group grid w-full grid-cols-12 items-baseline gap-3 py-4 text-left transition-colors duration-300 hover:bg-ink/[0.04]"
              >
                <span className="col-span-1 font-mono text-micro tracking-[0.18em] text-ink/45">
                  {p.index}
                </span>
                <span className="col-span-6 text-2xl font-medium leading-tight tracking-tight md:text-3xl">
                  {p.title}
                </span>
                <span className="col-span-3 hidden font-mono text-[10px] uppercase tracking-[0.16em] text-ink/55 md:inline">
                  {p.discipline.join(" · ")}
                </span>
                <span className="col-span-1 text-right font-mono text-micro text-ink/55">
                  {p.year}
                </span>
                <span className="col-span-1 text-right font-mono text-micro text-ink/35 transition-all duration-300 group-hover:translate-x-1 group-hover:text-ink">
                  →
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

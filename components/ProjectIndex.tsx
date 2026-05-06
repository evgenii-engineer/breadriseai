"use client";

import { projects } from "@/lib/projects";

/**
 * Flat editorial index — shown when the OVERVIEW / INDEX toggle
 * switches the hero away from the 3D stack.
 */
export function ProjectIndex() {
  return (
    <div className="absolute inset-0 grid place-items-center px-6">
      <div className="w-full max-w-5xl">
        <div className="mb-6 grid grid-cols-12 border-b border-ink/15 pb-3 font-mono text-micro uppercase tracking-[0.18em] text-ink/45">
          <span className="col-span-1">№</span>
          <span className="col-span-3">Client</span>
          <span className="col-span-5">Title</span>
          <span className="col-span-2">Discipline</span>
          <span className="col-span-1 text-right">Year</span>
        </div>
        <ul className="divide-y divide-ink/10">
          {projects.map((p) => (
            <li key={p.id}>
              <a
                href={`#${p.id}`}
                data-cursor="hover"
                className="grid grid-cols-12 items-baseline gap-3 py-3 transition-colors duration-300 hover:bg-ink/5"
              >
                <span className="col-span-1 font-mono text-micro tracking-[0.18em] text-ink/45">
                  {p.index}
                </span>
                <span className="col-span-3 font-mono text-xs uppercase tracking-[0.16em] text-ink/85">
                  {p.client}
                </span>
                <span className="col-span-5 font-display text-xl leading-tight tracking-tight md:text-2xl">
                  {p.title}
                </span>
                <span className="col-span-2 hidden font-mono text-[10px] uppercase tracking-[0.16em] text-ink/55 md:inline">
                  {p.discipline.join(" · ")}
                </span>
                <span className="col-span-1 text-right font-mono text-micro text-ink/55">
                  {p.year}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

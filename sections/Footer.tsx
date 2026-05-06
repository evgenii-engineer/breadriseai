"use client";

import { site } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-ink/10 bg-paper">
      <div className="container-edge grid grid-cols-12 gap-y-8 py-10 font-mono text-micro uppercase tracking-[0.18em] text-ink/55">
        <div className="col-span-6 md:col-span-3">
          <span className="block text-ink/35">© {year}</span>
          <span className="mt-1 block text-ink">{site.name}</span>
        </div>
        <div className="col-span-6 md:col-span-3">
          <span className="block text-ink/35">Studios</span>
          <span className="mt-1 block text-ink">{site.location}</span>
        </div>
        <div className="col-span-6 md:col-span-3">
          <span className="block text-ink/35">Follow</span>
          <div className="mt-1 flex flex-wrap gap-x-4">
            {site.social.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="underline-anim text-ink"
                data-cursor="hover"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
        <div className="col-span-6 md:col-span-3 md:text-right">
          <span className="block text-ink/35">Colophon</span>
          <span className="mt-1 block text-ink">
            Times Display · Inter · JetBrains Mono
          </span>
        </div>
      </div>
    </footer>
  );
}

"use client";

import { Marquee } from "@/components/Marquee";
import { site } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-ink-950">
      <Marquee className="border-t border-bone/10 py-10">
        <span className="font-display text-[18vw] leading-none tracking-tightest text-bone/95 whitespace-nowrap">
          Elsewhere<span className="text-accent">.</span>
          <span className="px-12 text-bone/30">/</span>
          <span className="italic text-bone/55">somewhere — else.</span>
          <span className="px-12 text-bone/30">/</span>
        </span>
      </Marquee>

      <div className="container-edge grid grid-cols-12 gap-y-8 border-t border-bone/10 py-10 font-mono text-micro uppercase tracking-[0.18em] text-bone/55">
        <div className="col-span-6 md:col-span-3">
          <span className="block text-bone/35">© {year}</span>
          <span className="mt-1 block text-bone">{site.name}</span>
        </div>
        <div className="col-span-6 md:col-span-3">
          <span className="block text-bone/35">Studios</span>
          <span className="mt-1 block text-bone">{site.location}</span>
        </div>
        <div className="col-span-6 md:col-span-3">
          <span className="block text-bone/35">Follow</span>
          <div className="mt-1 flex flex-wrap gap-x-4">
            {site.social.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="underline-anim text-bone"
                data-cursor="hover"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
        <div className="col-span-6 md:col-span-3 md:text-right">
          <span className="block text-bone/35">Colophon</span>
          <span className="mt-1 block text-bone">
            Times Display · Inter · JetBrains Mono
          </span>
        </div>
      </div>
    </footer>
  );
}

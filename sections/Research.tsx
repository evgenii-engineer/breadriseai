"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, registerGsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/utils";

const LINES = [
  "We make rooms,",
  "not pages.",
  "Light first.",
  "Type that breathes.",
  "Motion with intent.",
  "Silence as design.",
  "Slowness is a feature.",
  "Beauty is a brief.",
];

export function Research() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!root.current) return;
    registerGsap();
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const lines = root.current!.querySelectorAll<HTMLElement>("[data-line]");
      gsap.set(lines, { color: "rgba(14,13,11,0.18)" });
      lines.forEach((line) => {
        gsap.to(line, {
          color: "rgba(14,13,11,1)",
          ease: "none",
          scrollTrigger: {
            trigger: line,
            start: "top 78%",
            end: "top 38%",
            scrub: true,
          },
        });
      });
      ScrollTrigger.refresh();
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="research"
      className="relative border-t border-ink/10 py-28 md:py-44"
    >
      <div className="container-edge mb-12 flex items-center justify-between font-mono text-micro uppercase tracking-[0.22em] text-ink/55">
        <span>/ Research — a working belief</span>
        <span className="hidden md:inline">Eight lines</span>
      </div>

      <ol className="container-edge font-display leading-[0.95] tracking-tightest text-ink/15"
          style={{ fontSize: "clamp(2.5rem, 8vw, 9rem)" }}>
        {LINES.map((l, i) => (
          <li key={i} data-line className="flex items-baseline gap-6 md:gap-10">
            <span className="font-mono text-micro text-ink/30">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className={i % 2 === 1 ? "italic" : ""}>{l}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

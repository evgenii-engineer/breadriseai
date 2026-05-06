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

export function Manifesto() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!root.current) return;
    registerGsap();
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const lines = root.current!.querySelectorAll<HTMLElement>("[data-line]");
      gsap.set(lines, { autoAlpha: 0.18 });
      lines.forEach((line) => {
        gsap.to(line, {
          autoAlpha: 1,
          color: "#ece7df",
          ease: "none",
          scrollTrigger: {
            trigger: line,
            start: "top 75%",
            end: "top 35%",
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
      id="manifesto"
      className="relative overflow-hidden border-b border-bone/10 py-32 md:py-48"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[80vmin] w-[80vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,#ff5b1f1f,transparent_60%)] blur-3xl" />
      </div>

      <div className="container-edge mb-16 flex items-center justify-between">
        <span className="label">/ Index 04 — Manifesto</span>
        <span className="label hidden md:block">A working belief, in eight lines.</span>
      </div>

      <ol className="container-edge font-display text-mega-2 leading-[0.95] tracking-tightest text-bone/30">
        {LINES.map((l, i) => (
          <li
            key={i}
            data-line
            className="flex items-baseline gap-6 md:gap-10"
          >
            <span className="font-mono text-micro text-bone/30">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className={i % 2 === 1 ? "italic" : ""}>{l}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

"use client";

import { useRef } from "react";
import { useStaggerChildren } from "@/lib/animations";
import { Marquee } from "@/components/Marquee";

const DISCIPLINES = [
  "Brand Identity",
  "Art Direction",
  "Interaction Design",
  "Editorial",
  "Film & Motion",
  "Sound Design",
  "Spatial / 3D",
  "Creative Code",
];

const STATS = [
  { k: "Studios", v: "Paris · Lisbon" },
  { k: "Founded", v: "MMXXII" },
  { k: "Awards", v: "Awwwards · FWA · TDC" },
  { k: "Clients", v: "Editorial · Fashion · Cultural" },
];

export function Index() {
  const ref = useRef<HTMLUListElement>(null);
  useStaggerChildren(ref, { y: 24, stagger: 0.05 });

  return (
    <section id="index" className="relative border-y border-bone/10">
      <Marquee className="border-b border-bone/10 py-6 text-bone/85">
        {Array.from({ length: 12 }).map((_, i) => (
          <span
            key={i}
            className="font-display text-3xl md:text-5xl tracking-tight whitespace-nowrap"
          >
            <span className="italic text-bone/55">elsewhere</span>
            <span className="px-6 text-bone/30">·</span>
            independent studio
            <span className="px-6 text-bone/30">·</span>
            <span className="italic text-bone/55">est. 2022</span>
            <span className="px-6 text-bone/30">·</span>
          </span>
        ))}
      </Marquee>

      <div className="container-edge grid grid-cols-12 gap-y-12 py-20 md:py-28">
        <div className="col-span-12 md:col-span-4">
          <span className="label">/ Index 01 — Disciplines</span>
        </div>
        <ul
          ref={ref}
          className="col-span-12 grid grid-cols-2 gap-x-6 gap-y-6 font-display text-2xl tracking-tight md:col-span-8 md:grid-cols-2 md:text-4xl"
        >
          {DISCIPLINES.map((d, i) => (
            <li
              key={d}
              className="flex items-baseline gap-3 border-b border-bone/10 pb-4"
            >
              <span className="font-mono text-micro text-bone/40">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{d}</span>
            </li>
          ))}
        </ul>

        <div className="col-span-12 mt-12 grid grid-cols-2 gap-y-6 border-t border-bone/10 pt-12 md:grid-cols-4 md:mt-16">
          {STATS.map((s) => (
            <div key={s.k}>
              <span className="label">{s.k}</span>
              <span className="mt-2 block font-display text-2xl">{s.v}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

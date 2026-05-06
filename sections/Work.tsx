"use client";

import { useEffect, useRef } from "react";
import { projects } from "@/lib/projects";
import { Media } from "@/components/Media";
import { gsap, ScrollTrigger, registerGsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/utils";

export function Work() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!root.current) return;
    registerGsap();
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const items = root.current!.querySelectorAll<HTMLElement>("[data-project]");
      items.forEach((item, i) => {
        const isEven = i % 2 === 0;
        gsap.from(item, {
          autoAlpha: 0,
          y: 80,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            once: true,
          },
        });
        gsap.from(item.querySelector("[data-project-meta]"), {
          autoAlpha: 0,
          x: isEven ? -40 : 40,
          duration: 1.0,
          ease: "expo.out",
          delay: 0.2,
          scrollTrigger: { trigger: item, start: "top 85%", once: true },
        });
      });
      ScrollTrigger.refresh();
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="work"
      className="relative border-b border-bone/10 py-24 md:py-36"
    >
      <div className="container-edge mb-16 md:mb-24 flex items-end justify-between">
        <div>
          <span className="label">/ Index 02 — Selected Work</span>
          <h2 className="mt-6 font-display text-huge leading-[0.95] tracking-tightest">
            Six rooms, <span className="italic text-bone/55">six worlds.</span>
          </h2>
        </div>
        <a
          href="#contact"
          data-cursor="hover"
          className="hidden md:inline-flex font-mono text-micro uppercase tracking-[0.22em] text-bone/70 underline-anim"
        >
          Full archive on request →
        </a>
      </div>

      <div className="container-edge grid gap-y-28 md:gap-y-44">
        {projects.map((p, i) => {
          const isEven = i % 2 === 0;
          return (
            <article
              key={p.id}
              data-project
              className={[
                "grid grid-cols-12 items-end gap-y-6 md:gap-y-0 md:gap-x-8",
                isEven ? "" : "md:[direction:rtl]",
              ].join(" ")}
            >
              <a
                href="#"
                data-cursor="view"
                data-cursor-label="View"
                className="col-span-12 md:col-span-7 [direction:ltr]"
              >
                <Media
                  src={p.cover}
                  alt={`${p.client} — ${p.title}`}
                  className="aspect-[4/5] md:aspect-[5/6] w-full rounded-sm"
                  parallax={50}
                />
              </a>
              <div
                data-project-meta
                className={[
                  "col-span-12 md:col-span-5 [direction:ltr] flex flex-col gap-6",
                  isEven ? "md:pl-6" : "md:pr-6",
                ].join(" ")}
              >
                <div className="flex items-center justify-between font-mono text-micro uppercase tracking-[0.18em] text-bone/55">
                  <span>{p.index}</span>
                  <span>{p.year}</span>
                </div>
                <div>
                  <span className="label block">{p.client}</span>
                  <h3 className="mt-3 font-display text-3xl md:text-5xl leading-[0.95] tracking-tightest">
                    {p.title}
                  </h3>
                </div>
                <ul className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-micro uppercase tracking-[0.18em] text-bone/65">
                  {p.discipline.map((d) => (
                    <li key={d}>— {d}</li>
                  ))}
                </ul>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

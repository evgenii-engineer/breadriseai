"use client";

import { useRef } from "react";
import { RevealText } from "@/components/RevealText";
import { Media } from "@/components/Media";
import { useStaggerChildren } from "@/lib/animations";

export function Studio() {
  const facts = useRef<HTMLDListElement>(null);
  useStaggerChildren(facts, { y: 18, stagger: 0.06 });

  return (
    <section
      id="studio"
      className="relative border-b border-bone/10 py-24 md:py-36"
    >
      <div className="container-edge grid grid-cols-12 gap-y-12 md:gap-x-8">
        <div className="col-span-12 md:col-span-5">
          <span className="label">/ Index 03 — Studio</span>
          <RevealText
            as="h2"
            className="mt-8 block font-display text-huge leading-[0.95] tracking-tightest text-balance"
          >
            We build slow on purpose.
          </RevealText>
        </div>

        <div className="col-span-12 md:col-span-7 md:pl-12">
          <RevealText
            as="p"
            className="block max-w-xl text-lede text-bone/75"
            stagger={0.02}
          >
            Elsewhere is a small, partner-led studio working at the seam of design,
            direction and code. We collaborate with founders, art directors and
            cultural institutions on identities, films and digital experiences
            that feel inevitable.
          </RevealText>

          <RevealText
            as="p"
            className="mt-8 block max-w-xl text-lede text-bone/55"
            stagger={0.02}
          >
            Two principals. A trusted circle of writers, photographers, sound
            designers and engineers. Two or three projects in flight at any one
            time, never more.
          </RevealText>
        </div>

        <Media
          src="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&q=80"
          alt="Studio mood"
          className="col-span-12 mt-8 aspect-[16/8] md:col-span-7 md:mt-16"
          parallax={40}
        />

        <dl
          ref={facts}
          className="col-span-12 mt-8 grid grid-cols-2 gap-y-6 md:col-span-5 md:mt-16 md:grid-cols-1 md:pl-12"
        >
          {[
            { k: "Founded", v: "2022" },
            { k: "Based", v: "Paris · Lisbon" },
            { k: "Languages", v: "EN · FR · PT" },
            { k: "Scope", v: "Identity, Web, Film" },
            { k: "Recognition", v: "Awwwards SOTD ×6" },
            { k: "Press", v: "It's Nice That, Site Inspire" },
          ].map((f) => (
            <div
              key={f.k}
              className="flex items-baseline justify-between gap-6 border-b border-bone/10 py-3"
            >
              <dt className="font-mono text-micro uppercase tracking-[0.18em] text-bone/45">
                {f.k}
              </dt>
              <dd className="text-bone/90">{f.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { site } from "@/lib/site";
import { MagneticButton } from "@/components/MagneticButton";
import { useRevealText, useStaggerChildren } from "@/lib/animations";

export function Contact() {
  const headingRef = useRef<HTMLElement | null>(null);
  const linksRef = useRef<HTMLUListElement>(null);
  useRevealText(headingRef as React.RefObject<HTMLElement | null>);
  useStaggerChildren(linksRef, { y: 18, stagger: 0.08 });

  return (
    <section
      id="contact"
      className="relative border-t border-ink/10 py-28 md:py-44"
    >
      <div className="container-edge grid grid-cols-12 items-end gap-y-14">
        <div className="col-span-12 md:col-span-7">
          <span className="label">/ Contact</span>
          <h2
            ref={headingRef as React.RefObject<HTMLHeadingElement>}
            className="invisible mt-6 block font-display text-mega-2 leading-[0.9] tracking-tightest"
          >
            Let’s build <span className="italic text-ink/55">something</span> that lasts.
          </h2>
          <p className="mt-10 max-w-md text-lede text-ink/65">
            Bring a brief, a hunch, a vague feeling. We’ll bring a process,
            a point of view, and far too many references.
          </p>
        </div>

        <ul
          ref={linksRef}
          className="col-span-12 flex flex-col gap-3 md:col-span-5 md:items-end"
        >
          <li>
            <MagneticButton href={`mailto:${site.email}`} className="text-ink">
              <span className="h-[1px] w-12 bg-ink/55 transition-all duration-700 group-hover:w-20" />
              <span className="font-display text-2xl md:text-4xl normal-case tracking-tight">
                {site.email}
              </span>
            </MagneticButton>
          </li>
          <li className="text-ink/65">
            <MagneticButton href="#" className="text-ink/65">
              <span className="h-[1px] w-12 bg-ink/30 transition-all duration-700 group-hover:w-20" />
              <span className="font-display text-2xl md:text-4xl normal-case tracking-tight italic">
                Book a 30-min intro
              </span>
            </MagneticButton>
          </li>
          <li className="mt-6 grid grid-cols-2 gap-x-8 gap-y-2 font-mono text-micro uppercase tracking-[0.18em] text-ink/55 md:text-right">
            {site.social.map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="underline-anim"
                data-cursor="hover"
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 400, damping: 28 }}
              >
                — {s.label}
              </motion.a>
            ))}
          </li>
        </ul>
      </div>
    </section>
  );
}

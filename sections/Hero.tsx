"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap, ScrollTrigger, registerGsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/utils";
import { site } from "@/lib/site";

const FADE_IN_DELAY = 1.2; // wait for the loading screen to clear

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const orb1 = useRef<HTMLDivElement>(null);
  const orb2 = useRef<HTMLDivElement>(null);
  const titleA = useRef<HTMLSpanElement>(null);
  const titleB = useRef<HTMLSpanElement>(null);
  const titleC = useRef<HTMLSpanElement>(null);

  // Parallax + slow drift on the background orbs.
  useEffect(() => {
    if (!root.current) return;
    registerGsap();
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.to(orb1.current, {
        x: 60,
        y: 80,
        duration: 14,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      gsap.to(orb2.current, {
        x: -90,
        y: -60,
        duration: 18,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      // On scroll, lift the title and fade the gradient.
      gsap.to([titleA.current, titleB.current, titleC.current], {
        yPercent: -22,
        ease: "none",
        scrollTrigger: {
          trigger: root.current!,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.to(".hero-fade", {
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: root.current!,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      ScrollTrigger.refresh();
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      id="top"
      className="relative isolate flex min-h-[100svh] flex-col justify-between overflow-hidden pt-32 md:pt-40"
    >
      {/* gradient field */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink to-ink-950" />
        <div
          ref={orb1}
          className="absolute -left-20 top-10 h-[60vmin] w-[60vmin] rounded-full bg-[radial-gradient(circle_at_30%_30%,#ff5b1f33,transparent_60%)] blur-3xl"
        />
        <div
          ref={orb2}
          className="absolute -right-32 bottom-0 h-[70vmin] w-[70vmin] rounded-full bg-[radial-gradient(circle_at_70%_60%,#3a6b8a3d,transparent_60%)] blur-3xl"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_70%,#050505_100%)]" />
      </div>

      <div className="container-edge flex items-start justify-between hero-fade">
        <motion.span
          className="label"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: FADE_IN_DELAY }}
        >
          / Index № 0001
        </motion.span>
        <motion.span
          className="label hidden md:block"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: FADE_IN_DELAY + 0.05 }}
        >
          {site.availability}
        </motion.span>
      </div>

      <div className="container-edge pb-12 md:pb-20">
        <h1 className="font-display text-mega-1 leading-[0.86] tracking-tightest text-bone select-none">
          <span className="block overflow-hidden">
            <motion.span
              ref={titleA}
              className="block"
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: FADE_IN_DELAY }}
            >
              Cinematic
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              ref={titleB}
              className="block italic text-bone/60"
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: FADE_IN_DELAY + 0.1 }}
            >
              moments
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              ref={titleC}
              className="block"
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: FADE_IN_DELAY + 0.2 }}
            >
              for the&nbsp;<span className="text-accent">internet.</span>
            </motion.span>
          </span>
        </h1>

        <div className="mt-12 grid grid-cols-12 items-end gap-6 hero-fade">
          <motion.p
            className="col-span-12 max-w-md text-lede text-bone/70 md:col-span-5"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: FADE_IN_DELAY + 0.4 }}
          >
            {site.name} is an independent design and direction practice
            crafting immersive websites, identities and films for the
            quietly ambitious.
          </motion.p>
          <motion.div
            className="col-span-12 flex items-end justify-between gap-8 md:col-span-7"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: FADE_IN_DELAY + 0.5 }}
          >
            <div className="hidden md:block">
              <span className="label">Currently</span>
              <p className="mt-3 max-w-xs text-bone/85">
                Six selected projects, shipping through Q3.
                Studio booking opens for late autumn 2026.
              </p>
            </div>
            <a
              href="#work"
              data-cursor="view"
              data-cursor-label="Index"
              className="group inline-flex flex-col items-end gap-3 font-mono text-micro uppercase tracking-[0.22em] text-bone/80"
            >
              <span className="flex items-center gap-2">
                <span className="h-[1px] w-10 bg-bone/60 transition-all duration-700 group-hover:w-16" />
                Scroll
              </span>
              <svg width="14" height="22" viewBox="0 0 14 22" fill="none" aria-hidden>
                <path d="M7 1v20M1 15l6 6 6-6" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

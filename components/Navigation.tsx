"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Navigation() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("#projects");

  // Lock scroll while overlay is open.
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  // Close on Escape.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Highlight whichever section is currently in view.
  useEffect(() => {
    const ids = site.navigation.map((n) => n.href.slice(1));
    const targets = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    if (!targets.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { threshold: [0.25, 0.5, 0.75] },
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[70]">
        <div className="container-edge flex items-start justify-between gap-6 pt-5 md:pt-6">
          {/* left: brand + section tabs */}
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2 font-mono text-[10px] uppercase tracking-[0.22em] md:text-micro">
            <a
              href="#projects"
              data-cursor="hover"
              className="flex items-baseline gap-2 text-ink"
            >
              <span className="text-ink">{site.brandMark}</span>
              <sup className="text-ink/45">®</sup>
            </a>
            <nav className="hidden md:block">
              <ul className="flex items-baseline gap-x-3">
                {site.navigation.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      data-cursor="hover"
                      className={cn(
                        "px-1 transition-colors duration-300",
                        active === item.href
                          ? "text-ink"
                          : "text-ink/35 hover:text-ink/65",
                      )}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* right: status + mobile burger */}
          <div className="flex items-baseline gap-4 font-mono text-[10px] uppercase tracking-[0.22em] text-ink/55 md:text-micro">
            <span className="hidden md:inline">{site.availability}</span>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              data-cursor="hover"
              className="md:hidden text-ink"
            >
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="menu"
            className="fixed inset-0 z-[75] bg-paper text-ink"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.9, ease: [0.87, 0, 0.13, 1] }}
            role="dialog"
            aria-modal="true"
          >
            <div className="container-edge flex h-full flex-col justify-between pt-24 pb-10">
              <ul className="flex flex-col gap-2">
                {site.navigation.map((item, i) => (
                  <li key={item.href} className="overflow-hidden">
                    <motion.a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline gap-6 font-display text-mega-2 leading-[0.92] tracking-tightest"
                      initial={{ y: "110%" }}
                      animate={{ y: "0%" }}
                      exit={{ y: "110%" }}
                      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.18 + i * 0.06 }}
                    >
                      <span className="font-mono text-micro text-ink/35">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>{item.label}</span>
                    </motion.a>
                  </li>
                ))}
              </ul>
              <div className="grid grid-cols-2 gap-y-6 md:grid-cols-4 font-mono text-micro uppercase tracking-[0.18em] text-ink/55">
                <div>
                  <span className="block text-ink/35">Reach</span>
                  <a href={`mailto:${site.email}`} className="mt-1 block text-ink underline-anim">
                    {site.email}
                  </a>
                </div>
                <div>
                  <span className="block text-ink/35">Where</span>
                  <span className="mt-1 block text-ink">{site.location}</span>
                </div>
                <div>
                  <span className="block text-ink/35">Status</span>
                  <span className="mt-1 block text-ink">{site.availability}</span>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 md:justify-end">
                  {site.social.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="underline-anim"
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const update = () => {
      const fmt = new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Europe/Paris",
        hour12: false,
      });
      setTime(`${fmt.format(new Date())} CET`);
    };
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);

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

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[70] transition-[background-color,backdrop-filter,border-color] duration-500 ease-out-expo",
          scrolled
            ? "bg-ink/40 backdrop-blur-md border-b border-bone/5"
            : "bg-transparent border-b border-transparent",
        )}
      >
        <div className="container-edge flex items-center justify-between py-5 md:py-6">
          <a
            href="#top"
            data-cursor="hover"
            className="group flex items-center gap-3 font-mono text-micro uppercase tracking-[0.22em]"
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent transition-transform duration-700 group-hover:scale-125" />
            <span>{site.shortName}<span className="text-bone/40">®</span></span>
          </a>

          <nav className="hidden md:block">
            <ul className="flex items-center gap-8 font-mono text-micro uppercase tracking-[0.18em] text-bone/70">
              {site.navigation.map((item, i) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="underline-anim transition-colors hover:text-bone"
                    data-cursor="hover"
                  >
                    <span className="text-bone/35 mr-1.5">{String(i + 1).padStart(2, "0")}</span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden md:flex items-center gap-6 font-mono text-micro uppercase tracking-[0.18em] text-bone/60">
            <span aria-live="polite">{time}</span>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            data-cursor="hover"
            className="md:hidden font-mono text-micro uppercase tracking-[0.22em]"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="menu"
            className="fixed inset-0 z-[75] bg-ink text-bone"
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
                      <span className="font-mono text-micro text-bone/35">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>{item.label}</span>
                    </motion.a>
                  </li>
                ))}
              </ul>
              <div className="grid grid-cols-2 gap-y-6 md:grid-cols-4 font-mono text-micro uppercase tracking-[0.18em] text-bone/55">
                <div>
                  <span className="block text-bone/35">Reach</span>
                  <a href={`mailto:${site.email}`} className="mt-1 block text-bone underline-anim">
                    {site.email}
                  </a>
                </div>
                <div>
                  <span className="block text-bone/35">Where</span>
                  <span className="mt-1 block text-bone">{site.location}</span>
                </div>
                <div>
                  <span className="block text-bone/35">Status</span>
                  <span className="mt-1 block text-bone">{site.availability}</span>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 md:justify-end">
                  {site.social.map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="underline-anim">
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

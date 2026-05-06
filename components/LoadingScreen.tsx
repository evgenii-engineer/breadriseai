"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/lib/site";
import { usePreload } from "@/lib/preload-context";

export function LoadingScreen() {
  const { progress, ready } = usePreload();
  const [hidden, setHidden] = useState(false);
  const [displayed, setDisplayed] = useState(0);

  // Lock scroll while the gate is up.
  useEffect(() => {
    if (hidden) {
      document.body.style.overflow = "";
    } else {
      document.body.style.overflow = "hidden";
    }
    return () => { document.body.style.overflow = ""; };
  }, [hidden]);

  // Smooth-fill the progress so the bar never jumps backwards or jitters.
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      setDisplayed((d) => {
        const target = ready ? 1 : Math.min(progress, 0.99);
        const next = d + (target - d) * 0.12;
        return Math.abs(target - next) < 0.001 ? target : next;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [progress, ready]);

  // Hide once the bar reaches 100 visually.
  useEffect(() => {
    if (ready && displayed >= 0.999) {
      const t = setTimeout(() => setHidden(true), 280);
      return () => clearTimeout(t);
    }
  }, [ready, displayed]);

  const pct = Math.round(displayed * 100);

  return (
    <AnimatePresence>
      {!hidden && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[100] flex flex-col items-stretch justify-between bg-paper text-ink"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 1.0, ease: [0.87, 0, 0.13, 1] }}
        >
          <div className="container-edge flex items-start justify-between pt-6 md:pt-7">
            <span className="label">{site.shortName}</span>
            <span className="label">/ Loading</span>
          </div>

          <div className="container-edge flex items-end justify-between gap-6 pb-12">
            <div
              className="font-display leading-none tracking-tightest"
              style={{ fontSize: "clamp(3rem, 10vw, 12rem)" }}
            >
              <span className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
                >
                  Bread
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span
                  className="block italic text-ink/55"
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
                >
                  rise
                </motion.span>
              </span>
            </div>
            <div className="text-right font-mono text-micro tabular-nums text-ink/65">
              <div>{String(pct).padStart(3, "0")} / 100</div>
              <div className="mt-1 text-ink/35">Preloading assets</div>
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 h-px bg-ink/15">
            <div
              className="h-full bg-ink"
              style={{
                width: `${pct}%`,
                transition: "width 80ms linear",
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

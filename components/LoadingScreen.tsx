"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/lib/site";

const TICKS = 56;

export function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    let frame = 0;
    let raf = 0;
    const tick = () => {
      frame += 1;
      const next = Math.min(100, Math.round((1 - Math.pow(1 - frame / TICKS, 2.4)) * 100));
      setProgress(next);
      if (next >= 100) {
        setTimeout(() => setDone(true), 280);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (done) document.body.style.overflow = "";
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[100] flex flex-col items-stretch justify-between bg-paper text-ink"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 1.0, ease: [0.87, 0, 0.13, 1] }}
        >
          <div className="container-edge flex items-start justify-between pt-6 md:pt-7">
            <span className="label">{site.shortName}</span>
            <span className="label">/ Index 2026</span>
          </div>
          <div className="container-edge flex items-end justify-between pb-10">
            <div className="font-display leading-none tracking-tightest"
                 style={{ fontSize: "clamp(3rem, 10vw, 12rem)" }}>
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
            <div className="font-mono text-micro tabular-nums text-ink/65">
              {String(progress).padStart(3, "0")} / 100
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-px bg-ink/15">
            <motion.div
              className="h-full bg-ink"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "linear" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

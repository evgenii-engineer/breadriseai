"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePreload } from "@/lib/preload-context";

const ACCENT = "#0645AD";

export function LoadingScreen() {
  const { progress, ready } = usePreload();
  const [hidden, setHidden] = useState(false);
  const [displayed, setDisplayed] = useState(0);

  // Lock outer scroll while the gate is up.
  useEffect(() => {
    if (hidden) {
      document.body.style.overflow = "";
    } else {
      document.body.style.overflow = "hidden";
    }
    return () => { document.body.style.overflow = ""; };
  }, [hidden]);

  // Smooth-fill the progress so the bar never jitters or jumps backwards.
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
          className="fixed inset-0 z-[100] flex items-center justify-center bg-white"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex flex-col items-center gap-3">
            <span
              style={{ fontSize: 14, color: ACCENT, lineHeight: 1 }}
              className="font-normal tracking-normal"
            >
              bread rise
            </span>
            <div
              className="relative h-[2px] w-[160px] overflow-hidden rounded-full"
              style={{ backgroundColor: "rgba(6, 69, 173, 0.15)" }}
              aria-hidden
            >
              <div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{
                  backgroundColor: ACCENT,
                  width: `${pct}%`,
                  transition: "width 80ms linear",
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

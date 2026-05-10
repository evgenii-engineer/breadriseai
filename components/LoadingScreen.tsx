"use client";

import { useEffect, useState } from "react";
import { usePreload } from "@/lib/preload-context";

const ACCENT = "#0645AD";

/**
 * First-paint loading screen. Reads progress from PreloadContext and
 * smooth-fills the bar with rAF damping so jitter from staggered
 * `onload` callbacks doesn't show up. Once `ready` flips and the bar
 * reaches 100, we fade out and unmount.
 */
export function LoadingScreen() {
  const { progress, ready } = usePreload();
  const [hidden, setHidden] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = hidden ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [hidden]);

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

  useEffect(() => {
    if (ready && displayed >= 0.999 && !exiting) {
      setExiting(true);
      const t = setTimeout(() => setHidden(true), 700);
      return () => clearTimeout(t);
    }
  }, [ready, displayed, exiting]);

  if (hidden) return null;

  const pct = Math.round(displayed * 100);

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={`Loading ${pct}%`}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-white"
      style={{
        opacity: exiting ? 0 : 1,
        transition: "opacity 700ms cubic-bezier(0.16, 1, 0.3, 1)",
      }}
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
    </div>
  );
}

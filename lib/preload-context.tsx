"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { plates } from "@/lib/projects";

type Ctx = {
  /** 0..1 — fraction of asset bytes/items finished. */
  progress: number;
  /** True once every required asset has resolved (success or error). */
  ready: boolean;
};

const PreloadCtx = createContext<Ctx>({ progress: 0, ready: false });

/**
 * Eager image preloader. We collect every image URL referenced by the
 * project list and resolve only when each one finishes (success or
 * error — we never want to deadlock the loader on a 404).
 *
 * The loader itself reads from this context and reveals the rest of
 * the app only when `ready` flips true, so the first-paint experience
 * stays cinematic even on slow networks.
 */
export function PreloadProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);

  // Collect once.
  const urls = useMemo(() => {
    const seen = new Set<string>();
    for (const p of plates) {
      if (p.src) seen.add(p.src);
    }
    return [...seen];
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!urls.length) {
      setProgress(1);
      setReady(true);
      return;
    }

    let done = 0;
    let cancelled = false;
    const total = urls.length;
    // Floor so we never display more than 99% before ready flips.
    const tick = () => {
      done += 1;
      if (cancelled) return;
      setProgress(done / total);
      if (done >= total) {
        // Tiny grace so the bar reaches 100 before the loader exits.
        setTimeout(() => !cancelled && setReady(true), 250);
      }
    };

    const start = performance.now();
    const MAX_MS = 12_000; // hard cap so a single hung asset can't hold the gate

    urls.forEach((src) => {
      const img = new window.Image();
      img.onload = tick;
      img.onerror = tick;
      img.src = src;
    });

    const watchdog = setInterval(() => {
      if (performance.now() - start > MAX_MS) {
        if (!cancelled) {
          setProgress(1);
          setReady(true);
        }
        clearInterval(watchdog);
      }
    }, 200);

    return () => {
      cancelled = true;
      clearInterval(watchdog);
    };
  }, [urls]);

  const value = useMemo(() => ({ progress, ready }), [progress, ready]);
  return <PreloadCtx.Provider value={value}>{children}</PreloadCtx.Provider>;
}

export function usePreload() {
  return useContext(PreloadCtx);
}

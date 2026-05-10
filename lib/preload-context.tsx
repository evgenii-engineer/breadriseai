"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { stackPlates } from "@/lib/projects";

type Ctx = {
  /** 0..1 — fraction of asset bytes/items finished. */
  progress: number;
  /** True once every required asset has resolved (success or error). */
  ready: boolean;
};

const PreloadCtx = createContext<Ctx>({ progress: 0, ready: false });

/**
 * Eager preloader for the *visible* hero only — the 12 stack plates at
 * their 800w variant. Everything else (References thumbs, gallery
 * images inside the project detail panel) lazy-loads on demand, which
 * keeps the loader gate fast even on slow mobile internet.
 *
 * The watchdog caps the gate at 6s so a single hung asset can't trap
 * the user behind a blank screen.
 */
export function PreloadProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);

  const urls = useMemo(() => {
    const seen = new Set<string>();
    for (const p of stackPlates) seen.add(p.image.src);
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
    const tick = () => {
      done += 1;
      if (cancelled) return;
      setProgress(done / total);
      if (done >= total) {
        setTimeout(() => !cancelled && setReady(true), 150);
      }
    };

    const start = performance.now();
    const MAX_MS = 6_000;

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

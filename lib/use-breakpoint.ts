"use client";

import { useEffect, useState } from "react";

/**
 * Track a CSS-style breakpoint (sm < 768 < md < 1024 < lg).
 * Returns "sm" | "md" | "lg" — kept in sync with window resize.
 */
export type Breakpoint = "sm" | "md" | "lg";

export function useBreakpoint(): Breakpoint {
  const [bp, setBp] = useState<Breakpoint>("lg");

  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      if (w < 768) return "sm";
      if (w < 1024) return "md";
      return "lg";
    };
    const update = () => setBp(compute());
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return bp;
}

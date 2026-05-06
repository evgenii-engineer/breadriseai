"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  reverse?: boolean;
};

/**
 * CSS-only infinite marquee. Children are rendered twice so the
 * `-50%` translate produces a seamless loop.
 */
export function Marquee({ children, className, reverse = false }: Props) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div
        className="marquee-track"
        style={{ animationDirection: reverse ? "reverse" : "normal" }}
      >
        <div className="flex shrink-0 items-center gap-16 pr-16">{children}</div>
        <div aria-hidden className="flex shrink-0 items-center gap-16 pr-16">
          {children}
        </div>
      </div>
    </div>
  );
}

"use client";

import { type ReactNode, type AnchorHTMLAttributes } from "react";
import { useMagnetic } from "@/lib/animations";
import { cn } from "@/lib/utils";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  strength?: number;
};

export function MagneticButton({
  children,
  strength = 0.3,
  className,
  ...rest
}: Props) {
  const ref = useMagnetic<HTMLAnchorElement>(strength);
  return (
    <a
      ref={ref}
      className={cn(
        "magnetic group inline-flex items-center gap-3 font-mono text-micro uppercase tracking-[0.22em]",
        className,
      )}
      data-cursor="hover"
      {...rest}
    >
      {children}
    </a>
  );
}

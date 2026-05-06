"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { useRevealText } from "@/lib/animations";
import { cn } from "@/lib/utils";

type Props = {
  as?: ElementType;
  className?: string;
  delay?: number;
  stagger?: number;
  children: ReactNode;
};

export function RevealText({
  as: Tag = "span",
  className,
  delay,
  stagger,
  children,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  useRevealText(ref, { delay, stagger });
  return (
    <Tag
      ref={ref as React.RefObject<HTMLElement>}
      className={cn("invisible", className)}
    >
      {children}
    </Tag>
  );
}

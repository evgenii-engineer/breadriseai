"use client";

import Image from "next/image";
import { useRef } from "react";
import { useParallax } from "@/lib/animations";
import { cn } from "@/lib/utils";

type Props = {
  src: string;
  alt: string;
  className?: string;
  innerClassName?: string;
  sizes?: string;
  priority?: boolean;
  parallax?: number;
};

/**
 * Responsive media block with optional vertical parallax on the inner image.
 * `unoptimized` is forced because we run static export.
 */
export function Media({
  src,
  alt,
  className,
  innerClassName,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority,
  parallax = 0,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useParallax(parallax ? ref : { current: null }, parallax);

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div
        ref={ref}
        className={cn(
          "absolute inset-0 -inset-y-[10%] will-change-transform",
          innerClassName,
        )}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          unoptimized
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}

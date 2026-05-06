"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { projects } from "@/lib/projects";
import { prefersReducedMotion } from "@/lib/utils";

const STACK = projects.slice(0, 12);

/**
 * Per-card 3D placement. The stack is a flat plane of plates fanning out
 * diagonally from bottom-left to upper-right, then receding into Z.
 * Centered around (0,0) so the whole formation sits at the centre of
 * the wrapper. The wrapper applies a global rotation that tracks the
 * cursor with damping.
 */
function cardTransform(i: number, n: number) {
  const mid = (n - 1) / 2;
  const x = (i - mid) * 120;        // fan horizontally, centered
  const y = (mid - i) * 26;         // bottom-left → top-right
  const z = -i * 150;               // recede front-to-back
  return `translate3d(${x}px, ${y}px, ${z}px)`;
}

export function ProjectStack() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    const wrap = wrapperRef.current;
    const stack = stackRef.current;
    if (!wrap || !stack) return;

    if (prefersReducedMotion()) {
      stack.style.transform = "rotateX(-6deg) rotateY(-14deg)";
      return;
    }

    const REST_X = -6;
    const REST_Y = -14;
    const target = { x: REST_X, y: REST_Y };
    const current = { x: target.x, y: target.y };
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      const rect = wrap.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      target.x = REST_X + ny * -10;
      target.y = REST_Y + nx * 22;
    };

    const onLeave = () => {
      target.x = REST_X;
      target.y = REST_Y;
    };

    const tick = () => {
      current.x += (target.x - current.x) * 0.06;
      current.y += (target.y - current.y) * 0.06;
      stack.style.transform = `rotateX(${current.x}deg) rotateY(${current.y}deg)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="absolute inset-0 grid place-items-center"
      style={{ perspective: "2200px", perspectiveOrigin: "50% 50%" }}
    >
      <div
        ref={stackRef}
        className="relative h-[60vmin] w-[60vmin] preserve-3d transition-transform duration-[600ms] ease-out-expo will-change-transform"
        style={{ transform: "rotateX(-6deg) rotateY(-14deg)" }}
      >
        {STACK.map((p, i) => {
          const isFocus = hovered === i;
          const drift = isFocus ? "translateZ(80px)" : "";
          return (
            <a
              key={p.id}
              href={`#${p.id}`}
              data-cursor="view"
              data-cursor-label="View"
              onPointerEnter={() => setHovered(i)}
              onPointerLeave={() =>
                setHovered((h) => (h === i ? null : h))
              }
              className="group absolute left-1/2 top-1/2 block aspect-[4/3] w-[36vmin] -translate-x-1/2 -translate-y-1/2 transition-[filter,opacity] duration-500 ease-out-expo"
              style={{
                transform: `${cardTransform(i, STACK.length)} ${drift}`,
                transformStyle: "preserve-3d",
                zIndex: isFocus ? 100 : 10 + i,
                opacity: hovered !== null && !isFocus ? 0.55 : 1,
                filter: hovered !== null && !isFocus ? "saturate(0.6) brightness(0.95)" : "none",
              }}
            >
              <div
                className="relative h-full w-full overflow-hidden bg-paper-300 shadow-[0_22px_45px_-25px_rgba(20,16,10,0.45)] ring-1 ring-ink/5"
                style={{
                  transform: isFocus ? "scale(1.04)" : "scale(1)",
                  transition: "transform 600ms cubic-bezier(0.16,1,0.3,1)",
                }}
              >
                <Image
                  src={p.cover}
                  alt={`${p.client} — ${p.title}`}
                  fill
                  unoptimized
                  sizes="(min-width:1024px) 28vmin, 32vmin"
                  className="object-cover"
                  priority={i < 4}
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-paper/15"
                />
                <span className="pointer-events-none absolute left-3 top-3 font-mono text-[9px] uppercase tracking-[0.2em] text-paper/95 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  {p.index} · {p.client}
                </span>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}

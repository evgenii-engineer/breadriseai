"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A two-layer cursor: a 6px dot that tracks the mouse 1:1 and a hollow
 * 36px ring that follows with damping. Hovering an `[data-cursor]`
 * element scales the ring up and reveals an optional label.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const isFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!isFinePointer) return;
    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    const dot = dotRef.current!;
    const ring = ringRef.current!;
    const label = labelRef.current!;
    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring$ = { x: target.x, y: target.y };
    let scale = 1;
    let scaleTarget = 1;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      dot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
    };

    const onOver = (e: PointerEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor]");
      if (!el) {
        scaleTarget = 1;
        label.textContent = "";
        ring.dataset.variant = "default";
        return;
      }
      const variant = el.dataset.cursor || "hover";
      ring.dataset.variant = variant;
      scaleTarget = variant === "view" ? 3.6 : variant === "drag" ? 2.6 : 1.9;
      label.textContent = el.dataset.cursorLabel ?? "";
    };

    const tick = () => {
      ring$.x += (target.x - ring$.x) * 0.18;
      ring$.y += (target.y - ring$.y) * 0.18;
      scale += (scaleTarget - scale) * 0.18;
      ring.style.transform = `translate3d(${ring$.x}px, ${ring$.y}px, 0) translate(-50%, -50%) scale(${scale})`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerover", onOver);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[80]">
      <div
        ref={ringRef}
        data-variant="default"
        className="fixed left-0 top-0 h-9 w-9 rounded-full border border-bone/70 transition-[border-color,background-color] duration-300 ease-out-expo data-[variant=view]:border-bone data-[variant=view]:bg-bone/10 data-[variant=drag]:border-accent"
        style={{ transform: "translate3d(-100px,-100px,0)" }}
      >
        <div
          ref={labelRef}
          className="absolute inset-0 flex items-center justify-center font-mono text-[10px] uppercase tracking-[0.18em] text-bone/90"
        />
      </div>
      <div
        ref={dotRef}
        className="fixed left-0 top-0 h-1.5 w-1.5 rounded-full bg-bone mix-blend-difference"
        style={{ transform: "translate3d(-100px,-100px,0)" }}
      />
    </div>
  );
}

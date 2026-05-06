"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import { stackPlates } from "@/lib/projects";
import { prefersReducedMotion } from "@/lib/utils";
import { useView } from "@/lib/view-context";
import { useBreakpoint, type Breakpoint } from "@/lib/use-breakpoint";

const PLATES = stackPlates;

type Geom = {
  cardW: number;        // px
  cardH: number;        // px
  perspective: number;
};

function geometryFor(bp: Breakpoint): Geom {
  if (bp === "sm") return { cardW: 220, cardH: 280, perspective: 1400 };
  if (bp === "md") return { cardW: 320, cardH: 410, perspective: 1700 };
  return { cardW: 380, cardH: 490, perspective: 2000 };
}

/**
 * Cover-Flow style placement around the active card. All cards face
 * the centre — past records lean to the right, future records lean
 * to the left, both shrink and recede with distance.
 */
function plateStyle(offset: number, geom: Geom): React.CSSProperties {
  if (offset === 0) {
    return {
      transform: "translate3d(0px, 0px, 60px) rotateY(0deg) scale(1)",
      opacity: 1,
      zIndex: 100,
    };
  }
  const o = Math.abs(offset);
  // Drop very-far cards entirely — they never read on screen and hurt perf.
  if (o > 4) {
    return { opacity: 0, transform: "translateZ(-1500px)", zIndex: 0 };
  }
  const sign = Math.sign(offset);
  const tx = sign * geom.cardW * (0.42 + 0.18 * (o - 1));
  const tz = -160 * o;
  const ry = sign * -36;
  const scale = 1 - o * 0.06;
  const opacity = Math.max(0, 0.95 - o * 0.18);
  return {
    transform: `translate3d(${tx}px, 0px, ${tz}px) rotateY(${ry}deg) scale(${scale})`,
    opacity,
    zIndex: 100 - o,
  };
}

export function ProjectStack() {
  const [active, setActive] = useState(0);
  const lastInputRef = useRef(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const bp = useBreakpoint();
  const geom = useMemo(() => geometryFor(bp), [bp]);
  const { openProject, selectedProject } = useView();
  const total = PLATES.length;
  const detailOpen = selectedProject !== null;

  const advance = useCallback(
    (dir: 1 | -1) => {
      const now = performance.now();
      // Debounce wheel/swipe so a single gesture moves by one record.
      if (now - lastInputRef.current < 280) return;
      lastInputRef.current = now;
      setActive((a) => Math.max(0, Math.min(total - 1, a + dir)));
    },
    [total],
  );

  // Wheel + keyboard. Vertical and horizontal scroll both step.
  useEffect(() => {
    if (detailOpen) return;
    const onWheel = (e: WheelEvent) => {
      const delta =
        Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (Math.abs(delta) < 10) return;
      e.preventDefault();
      advance(delta > 0 ? 1 : -1);
    };
    const onKey = (e: KeyboardEvent) => {
      if (["ArrowRight", "ArrowDown", "PageDown", " "].includes(e.key)) {
        advance(1);
      } else if (
        ["ArrowLeft", "ArrowUp", "PageUp"].includes(e.key)
      ) {
        advance(-1);
      } else if (e.key === "Home") {
        setActive(0);
      } else if (e.key === "End") {
        setActive(total - 1);
      }
    };
    const node = wrapperRef.current;
    node?.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);
    return () => {
      node?.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
    };
  }, [advance, total, detailOpen]);

  // Touch swipe.
  useEffect(() => {
    if (detailOpen) return;
    let startX: number | null = null;
    const onStart = (e: TouchEvent) => {
      startX = e.touches[0]?.clientX ?? null;
    };
    const onEnd = (e: TouchEvent) => {
      if (startX == null) return;
      const endX = e.changedTouches[0]?.clientX;
      if (endX == null) return;
      const dx = endX - startX;
      if (Math.abs(dx) > 40) advance(dx < 0 ? 1 : -1);
      startX = null;
    };
    const node = wrapperRef.current;
    node?.addEventListener("touchstart", onStart, { passive: true });
    node?.addEventListener("touchend", onEnd, { passive: true });
    return () => {
      node?.removeEventListener("touchstart", onStart);
      node?.removeEventListener("touchend", onEnd);
    };
  }, [advance, detailOpen]);

  // Subtle resting tilt on the whole crate so it never reads flat.
  // Disabled in reduced-motion.
  const restTilt = prefersReducedMotion()
    ? "rotateX(0deg) rotateY(0deg)"
    : "rotateX(-3deg) rotateY(-1deg)";

  return (
    <div
      ref={wrapperRef}
      className="absolute inset-0 grid place-items-center select-none"
      style={{
        perspective: `${geom.perspective}px`,
        perspectiveOrigin: "50% 55%",
      }}
    >
      <div
        className="relative preserve-3d"
        style={{
          width: geom.cardW,
          height: geom.cardH,
          transform: restTilt,
        }}
      >
        {PLATES.map((p, i) => {
          const offset = i - active;
          const isActive = offset === 0;
          const isVisible = Math.abs(offset) <= 4;
          const onClick = () => {
            if (isActive) openProject(p.projectId);
            else setActive(i);
          };
          return (
            <button
              key={p.key}
              type="button"
              onClick={onClick}
              data-cursor={isActive ? "view" : "hover"}
              data-cursor-label={isActive ? "Open" : "Flip"}
              aria-label={
                isActive
                  ? `Open ${p.projectTitle}`
                  : `Flip to ${p.projectTitle}`
              }
              tabIndex={isActive ? 0 : -1}
              aria-hidden={!isVisible}
              className="group absolute inset-0 block"
              style={{
                ...plateStyle(offset, geom),
                transition:
                  "transform 720ms cubic-bezier(0.16, 1, 0.3, 1), opacity 520ms ease-out",
                transformStyle: "preserve-3d",
                willChange: "transform, opacity",
                pointerEvents: isVisible ? "auto" : "none",
              }}
            >
              <div className="relative h-full w-full overflow-hidden bg-paper-300 shadow-[0_30px_50px_-25px_rgba(20,16,10,0.55)] ring-1 ring-ink/5">
                <Image
                  src={p.src}
                  alt={p.projectTitle}
                  fill
                  unoptimized
                  sizes="(max-width:768px) 60vw, (max-width:1024px) 38vw, 30vw"
                  className="object-cover"
                  priority={Math.abs(offset) <= 1}
                />
                {isActive && (
                  <span className="pointer-events-none absolute left-3 top-3 font-mono text-[10px] uppercase tracking-[0.22em] text-paper/95 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    {p.projectIndex} · {p.projectTitle}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active title beneath the crate */}
      <div className="container-edge pointer-events-none absolute inset-x-0 bottom-24 z-20 flex justify-center md:bottom-28">
        <div
          key={active}
          className="text-center"
          style={{
            animation: "fade-in 0.7s cubic-bezier(0.16, 1, 0.3, 1) both",
          }}
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/55 md:text-micro">
            {PLATES[active].projectIndex} · {String(active + 1).padStart(2, "0")}{" / "}{String(total).padStart(2, "0")}
          </span>
          <h3
            className="mt-1 leading-[0.95] tracking-tightest"
            style={{ fontSize: "clamp(1.15rem, 2.2vw, 2rem)" }}
          >
            {PLATES[active].projectTitle}
          </h3>
        </div>
      </div>
    </div>
  );
}

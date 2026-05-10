"use client";

import { useMemo } from "react";
import { allReferencePlates } from "@/lib/projects";
import { useView } from "@/lib/view-context";
import { useBreakpoint } from "@/lib/use-breakpoint";

const ACCENT = "#0645AD";

/** Tiny deterministic pseudo-random for stable per-plate placement. */
function rand(seed: number, salt: number) {
  const x = (seed * 9301 + salt * 49297 + 233280) % 233280;
  return x / 233280;
}

export function ReferencesView() {
  const { openProject } = useView();
  const bp = useBreakpoint();
  const isSmall = bp === "sm";

  const cluster = useMemo(() => {
    // Phyllotaxis (sunflower seed) spiral: angle steps by the golden
    // angle ≈ 137.5°, radius grows as sqrt(i). Gives evenly distributed
    // points across the disk with no clumping at any radius.
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    const c = isSmall ? 38 : 78;
    const minR = isSmall ? 48 : 88;
    const widthMin = isSmall ? 56 : 78;
    const widthVar = isSmall ? 18 : 22;

    return allReferencePlates.map((p, i) => {
      const r1 = rand(i + 1, 17);
      const r2 = rand(i + 1, 31);

      const angle = i * goldenAngle + r1 * 0.25;
      const radius = minR + c * Math.sqrt(i);
      const tx = Math.cos(angle) * radius;
      const ty = Math.sin(angle) * radius;
      const widthPx = Math.round(widthMin + r2 * widthVar);

      return { ...p, tx, ty, widthPx };
    });
  }, [isSmall]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-white">
      <div className="container-edge absolute inset-x-0 top-24 z-20 md:top-28">
        <span
          className="block leading-none"
          style={{ fontSize: 14, color: ACCENT }}
        >
          visual storage
        </span>
      </div>

      <div className="absolute left-1/2 top-1/2 h-0 w-0">
        {cluster.map((p, i) => (
          <div
            key={p.key}
            className="absolute left-0 top-0"
            style={{
              width: p.widthPx,
              transform: `translate(${p.tx}px, ${p.ty}px) translate(-50%, -50%)`,
            }}
          >
            <button
              type="button"
              onClick={() => openProject(p.projectId)}
              aria-label={`Open ${p.projectTitle}`}
              className="group flex w-full flex-col items-center gap-1.5 rounded-md p-1.5 text-center transition-colors duration-200 hover:bg-ink/[0.05] focus-visible:bg-ink/[0.08] focus-visible:outline-none animate-rise-in"
              style={{ animationDelay: `${25 * (i % 16)}ms` }}
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-paper-200">
                <img
                  src={p.image.thumb}
                  alt={p.projectTitle}
                  width={p.image.width}
                  height={p.image.height}
                  loading={i < 12 ? "eager" : "lazy"}
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </div>
              <span
                className="block w-full break-all text-[10px] leading-[1.2] text-ink/80 group-hover:text-ink"
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {p.fileLabel}
              </span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

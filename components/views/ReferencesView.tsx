"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { allReferencePlates } from "@/lib/projects";
import { useView } from "@/lib/view-context";
import { useBreakpoint } from "@/lib/use-breakpoint";

const ACCENT = "#0645AD";

/** Tiny deterministic pseudo-random for stable per-plate placement. */
function rand(seed: number, salt: number) {
  const x = (seed * 9301 + salt * 49297 + 233280) % 233280;
  return x / 233280;
}

function fileNameFor(url: string) {
  const slash = url.lastIndexOf("/");
  return slash >= 0 ? url.slice(slash + 1) : url;
}

export function ReferencesView() {
  const { openProject } = useView();
  const bp = useBreakpoint();
  const isSmall = bp === "sm";

  const cluster = useMemo(() => {
    // Cluster all plates radially around the viewport centre, like
    // a desktop covered in shortcut icons. Polar coordinates keep
    // them circling the middle without falling into a grid.
    const minR = isSmall ? 80 : 110;
    const maxR = isSmall ? 220 : 480;
    const widthMin = isSmall ? 56 : 76;
    const widthVar = isSmall ? 22 : 30;

    return allReferencePlates.map((p, i) => {
      const r1 = rand(i + 1, 17);
      const r2 = rand(i + 1, 31);
      const r3 = rand(i + 1, 53);

      // Spread the angle so consecutive plates don't bunch on one side.
      const angle = (i * 0.618033988749 + r1) * Math.PI * 2;
      // Square-root mapping pushes density outward instead of all
      // hugging the centre.
      const radius = minR + Math.sqrt(r2) * (maxR - minR);
      const tx = Math.cos(angle) * radius;
      const ty = Math.sin(angle) * radius;
      const widthPx = Math.round(widthMin + r3 * widthVar);

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

      {/* radial cluster anchored to the centre of the viewport.
          Positioning lives on the outer wrapper, animation on the
          inner motion node — keep them separate so framer-motion
          can't overwrite our pixel transform when it animates the
          fade-in. */}
      <div className="absolute left-1/2 top-1/2 h-0 w-0">
        {cluster.map((p, i) => {
          const fn = fileNameFor(p.src);
          return (
            <div
              key={p.key}
              className="absolute left-0 top-0"
              style={{
                width: p.widthPx,
                transform: `translate(${p.tx}px, ${p.ty}px) translate(-50%, -50%)`,
              }}
            >
              <motion.button
                type="button"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.025 * (i % 16),
                }}
                onClick={() => openProject(p.projectId)}
                aria-label={`Open ${p.projectTitle}`}
                className="group flex w-full flex-col items-center gap-1.5 rounded-md p-1.5 text-center transition-colors duration-200 hover:bg-ink/[0.05] focus:bg-ink/[0.08] focus:outline-none"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-paper-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.src}
                    alt={p.projectTitle}
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
                  {fn}
                </span>
              </motion.button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

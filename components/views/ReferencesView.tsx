"use client";

import { motion } from "framer-motion";
import { allReferencePlates } from "@/lib/projects";
import { useView } from "@/lib/view-context";

const ACCENT = "#0645AD";

/** Pull the bare filename out of an asset URL so we can display it
 *  Finder-style under each thumbnail. */
function fileNameFor(url: string) {
  const slash = url.lastIndexOf("/");
  return slash >= 0 ? url.slice(slash + 1) : url;
}

export function ReferencesView() {
  const { openProject } = useView();

  return (
    <div className="absolute inset-0 overflow-y-auto overflow-x-hidden bg-white pt-24 pb-16 md:pt-28 md:pb-20">
      <div className="container-edge mb-6">
        <span
          className="block leading-none"
          style={{ fontSize: 14, color: ACCENT }}
        >
          visual storage
        </span>
      </div>

      <div
        className="mx-auto px-4 md:px-8"
        style={{ maxWidth: "min(1700px, 100%)" }}
      >
        <div
          className="grid items-start"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(96px, 1fr))",
            columnGap: "12px",
            rowGap: "22px",
          }}
        >
          {allReferencePlates.map((p, i) => {
            const fn = fileNameFor(p.src);
            return (
              <motion.button
                key={p.key}
                type="button"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.55,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.025 * (i % 16),
                }}
                onClick={() => openProject(p.projectId)}
                aria-label={`Open ${p.projectTitle}`}
                className="group flex flex-col items-center gap-1.5 rounded-md p-1.5 text-center transition-colors duration-200 hover:bg-ink/[0.05] focus:bg-ink/[0.08] focus:outline-none"
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
            );
          })}
        </div>
      </div>
    </div>
  );
}

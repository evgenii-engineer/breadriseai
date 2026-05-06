"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ProjectStack } from "@/components/ProjectStack";
import { ProjectIndex } from "@/components/ProjectIndex";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

type View = "overview" | "index";

export function Hero() {
  const [view, setView] = useState<View>("overview");

  return (
    <section
      id="projects"
      className="relative isolate h-[100svh] min-h-[640px] w-full overflow-hidden"
    >
      {/* the 3D canvas / index swap */}
      <AnimatePresence mode="wait">
        {view === "overview" ? (
          <motion.div
            key="overview"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <ProjectStack />
          </motion.div>
        ) : (
          <motion.div
            key="index"
            className="absolute inset-0"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <ProjectIndex />
          </motion.div>
        )}
      </AnimatePresence>

      {/* tagline lower-left */}
      <div className="container-edge pointer-events-none absolute inset-x-0 bottom-6 z-30 flex items-end justify-between gap-8 md:bottom-10">
        <motion.p
          className="max-w-xs font-mono text-[10px] uppercase tracking-[0.18em] text-ink/60 md:max-w-sm md:text-micro"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 1.4 }}
        >
          {site.description}
        </motion.p>

        {/* OVERVIEW / INDEX toggle, bottom-right */}
        <motion.div
          className="pointer-events-auto flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.22em] text-ink md:text-micro"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 1.5 }}
        >
          <ToggleBtn active={view === "overview"} onClick={() => setView("overview")}>
            Overview
          </ToggleBtn>
          <span className="text-ink/30">/</span>
          <ToggleBtn active={view === "index"} onClick={() => setView("index")}>
            Index
          </ToggleBtn>
        </motion.div>
      </div>
    </section>
  );
}

function ToggleBtn({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-cursor="hover"
      className={cn(
        "px-2 py-1 transition-colors duration-300",
        active ? "text-ink" : "text-ink/35 hover:text-ink/70",
      )}
    >
      {children}
    </button>
  );
}

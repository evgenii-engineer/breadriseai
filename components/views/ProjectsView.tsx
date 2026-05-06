"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ProjectStack } from "@/components/ProjectStack";
import { ProjectIndex } from "@/components/ProjectIndex";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { useView } from "@/lib/view-context";

export function ProjectsView() {
  const { mode, setMode } = useView();

  return (
    <div className="absolute inset-0">
      {/* canvas */}
      <AnimatePresence mode="wait">
        {mode === "overview" ? (
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

      {/* tagline + Overview/Index toggle, anchored bottom */}
      <div className="container-edge pointer-events-none absolute inset-x-0 bottom-6 z-30 flex items-end justify-between gap-8 md:bottom-10">
        <motion.p
          className="max-w-xs font-mono text-[10px] uppercase tracking-[0.18em] text-ink/60 md:max-w-sm md:text-micro"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
        >
          {site.description}
        </motion.p>

        <motion.div
          className="pointer-events-auto flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.22em] text-ink md:text-micro"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
        >
          <ToggleBtn active={mode === "overview"} onClick={() => setMode("overview")}>
            Overview
          </ToggleBtn>
          <span className="text-ink/30">/</span>
          <ToggleBtn active={mode === "index"} onClick={() => setMode("index")}>
            Index
          </ToggleBtn>
        </motion.div>
      </div>
    </div>
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

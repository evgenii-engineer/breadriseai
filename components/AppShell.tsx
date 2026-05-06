"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useView } from "@/lib/view-context";
import { ProjectsView } from "@/components/views/ProjectsView";
import { ResearchView } from "@/components/views/ResearchView";
import { StudioView } from "@/components/views/StudioView";
import { ContactView } from "@/components/views/ContactView";

const variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export function AppShell() {
  const { view } = useView();

  return (
    <div className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={view}
          className="absolute inset-0"
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          {view === "projects" && <ProjectsView />}
          {view === "research" && <ResearchView />}
          {view === "studio" && <StudioView />}
          {view === "contact" && <ContactView />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

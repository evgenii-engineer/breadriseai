"use client";

import { motion } from "framer-motion";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { useView, type View } from "@/lib/view-context";

const TABS: { id: View; label: string }[] = [
  { id: "projects", label: "Projects" },
  { id: "research", label: "Research" },
  { id: "studio", label: "Studio" },
  { id: "contact", label: "Contact" },
];

export function Navigation() {
  const { view, setView } = useView();

  return (
    <header className="fixed inset-x-0 top-0 z-[70]">
      <div className="container-edge flex items-start justify-between gap-4 pt-5 md:pt-6">
        <nav>
          <ul className="flex flex-wrap items-stretch gap-1.5 font-mono text-[10px] uppercase tracking-[0.22em] md:text-micro">
            {TABS.map((tab) => {
              const isActive = view === tab.id;
              const isBrandTab = tab.id === "projects";
              return (
                <li key={tab.id}>
                  <button
                    type="button"
                    onClick={() => setView(tab.id)}
                    data-cursor="hover"
                    className={cn(
                      "relative rounded-full border px-3 py-2 transition-colors duration-300 md:px-4",
                      isActive
                        ? "border-ink/85 text-ink"
                        : "border-ink/15 text-ink/45 hover:border-ink/35 hover:text-ink/75",
                    )}
                  >
                    {isBrandTab ? (
                      <span className="flex items-baseline gap-2">
                        <span>{site.brandMark}</span>
                        <sup className="text-ink/45">®</sup>
                        <span className="text-ink/45">·</span>
                        <span>{tab.label}</span>
                      </span>
                    ) : (
                      tab.label
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <motion.div
          className="hidden items-baseline gap-3 pt-2 font-mono text-micro uppercase tracking-[0.22em] text-ink/55 md:flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 1.4 }}
        >
          <span>{site.availability}</span>
        </motion.div>
      </div>
    </header>
  );
}

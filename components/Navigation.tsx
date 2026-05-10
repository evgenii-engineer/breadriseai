"use client";

import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { useView, type View } from "@/lib/view-context";

const ACCENT = "#0645AD";

const TABS: { id: View; label: string }[] = [
  { id: "projects", label: "Projects" },
  { id: "references", label: "References" },
  { id: "contact", label: "Contact" },
];

export function Navigation() {
  const { view, setView } = useView();

  return (
    <header className="fixed inset-x-0 top-0 z-[70]">
      <div className="container-edge flex items-start justify-between gap-4 pt-5 md:pt-6">
        <nav>
          <ul className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
            {TABS.map((tab) => {
              const isActive = view === tab.id;
              const isBrandTab = tab.id === "projects";
              return (
                <li key={tab.id}>
                  <button
                    type="button"
                    onClick={() => setView(tab.id)}
                    style={{ color: ACCENT, fontSize: 14 }}
                    className={cn(
                      "whitespace-nowrap leading-none transition-opacity duration-200 hover:underline focus:underline focus:outline-none",
                      isActive ? "underline underline-offset-4" : "opacity-80 hover:opacity-100",
                    )}
                  >
                    {isBrandTab ? (
                      <span>
                        {site.brandMark}
                        <span className="hidden sm:inline">
                          <span className="px-1.5 opacity-60">·</span>
                          {tab.label}
                        </span>
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
      </div>
    </header>
  );
}

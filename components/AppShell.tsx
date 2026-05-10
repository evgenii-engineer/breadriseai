"use client";

import { useEffect, useRef, useState } from "react";
import { useView } from "@/lib/view-context";
import { usePreload } from "@/lib/preload-context";
import { ProjectsView } from "@/components/views/ProjectsView";
import { ReferencesView } from "@/components/views/ReferencesView";
import { ContactView } from "@/components/views/ContactView";
import { ProjectDetail } from "@/components/ProjectDetail";

const FADE_MS = 320;

export function AppShell() {
  const { view } = useView();
  const { ready } = usePreload();

  // Cross-fade between views without framer-motion: render the
  // currently active view on the live layer; while a transition is in
  // flight we hold the previous view on a second layer that fades to 0
  // and then unmounts. This keeps the visible UI identical to the
  // previous AnimatePresence "wait" mode without the runtime cost.
  const [active, setActive] = useState(view);
  const [previous, setPrevious] = useState<typeof view | null>(null);
  const fadeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (view === active) return;
    setPrevious(active);
    setActive(view);
    if (fadeTimer.current) clearTimeout(fadeTimer.current);
    fadeTimer.current = setTimeout(() => setPrevious(null), FADE_MS);
    return () => {
      if (fadeTimer.current) clearTimeout(fadeTimer.current);
    };
  }, [view, active]);

  return (
    <div
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden transition-opacity duration-700 ease-out"
      style={{ opacity: ready ? 1 : 0, pointerEvents: ready ? "auto" : "none" }}
      aria-hidden={!ready}
    >
      {previous && (
        <div
          key={`prev-${previous}`}
          className="absolute inset-0 opacity-0 transition-opacity"
          style={{ transitionDuration: `${FADE_MS}ms` }}
          aria-hidden
        >
          <ViewSwitch view={previous} />
        </div>
      )}
      <div
        key={`live-${active}`}
        className="absolute inset-0 animate-view-in"
        style={{ animationDuration: `${FADE_MS}ms` }}
      >
        <ViewSwitch view={active} />
      </div>

      <ProjectDetail />
    </div>
  );
}

function ViewSwitch({ view }: { view: "projects" | "references" | "contact" }) {
  if (view === "projects") return <ProjectsView />;
  if (view === "references") return <ReferencesView />;
  return <ContactView />;
}

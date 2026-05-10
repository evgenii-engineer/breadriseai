"use client";

import { useEffect, useRef, useState } from "react";
import { ProjectStack } from "@/components/ProjectStack";
import { ProjectIndex } from "@/components/ProjectIndex";
import { cn } from "@/lib/utils";
import { useView } from "@/lib/view-context";

const ACCENT = "#0645AD";
const TAGLINE =
  "AI visuals, rare aesthetics, and visual identities engineered to make brands impossible to ignore";

const FADE_MS = 320;

export function ProjectsView() {
  const { mode, setMode } = useView();

  const [active, setActive] = useState(mode);
  const [previous, setPrevious] = useState<typeof mode | null>(null);
  const fadeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (mode === active) return;
    setPrevious(active);
    setActive(mode);
    if (fadeTimer.current) clearTimeout(fadeTimer.current);
    fadeTimer.current = setTimeout(() => setPrevious(null), FADE_MS);
    return () => {
      if (fadeTimer.current) clearTimeout(fadeTimer.current);
    };
  }, [mode, active]);

  return (
    <div className="absolute inset-0">
      {previous && (
        <div
          key={`prev-${previous}`}
          className="absolute inset-0 opacity-0 transition-opacity"
          style={{ transitionDuration: `${FADE_MS}ms` }}
          aria-hidden
        >
          {previous === "overview" ? <ProjectStack /> : <ProjectIndex />}
        </div>
      )}
      <div
        key={`live-${active}`}
        className="absolute inset-0 animate-view-in"
        style={{ animationDuration: `${FADE_MS}ms` }}
      >
        {active === "overview" ? <ProjectStack /> : <ProjectIndex />}
      </div>

      {/* tagline + Overview/Index toggle, anchored bottom */}
      <div className="container-edge pointer-events-none absolute inset-x-0 bottom-4 z-30 flex flex-col items-stretch gap-3 md:bottom-10 md:flex-row md:items-end md:justify-between md:gap-8">
        <p
          className="hidden max-w-md text-[12px] leading-snug animate-rise-in md:block md:text-[13px]"
          style={{ color: ACCENT, animationDelay: "400ms" }}
        >
          {TAGLINE}
        </p>

        <div
          className="pointer-events-auto flex items-center justify-end gap-3 leading-none animate-rise-in"
          style={{ fontSize: 14, animationDelay: "500ms" }}
        >
          <ToggleBtn active={mode === "overview"} onClick={() => setMode("overview")}>
            Overview
          </ToggleBtn>
          <span style={{ color: ACCENT, opacity: 0.5 }} aria-hidden>/</span>
          <ToggleBtn active={mode === "index"} onClick={() => setMode("index")}>
            Index
          </ToggleBtn>
        </div>
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
      aria-pressed={active}
      style={{ color: ACCENT }}
      className={cn(
        "leading-none transition-opacity duration-200 hover:underline focus-visible:outline-none focus-visible:underline",
        active
          ? "underline underline-offset-4"
          : "opacity-80 hover:opacity-100",
      )}
    >
      {children}
    </button>
  );
}

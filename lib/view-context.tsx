"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type View = "projects" | "references" | "contact";
export type Mode = "overview" | "index";

const VIEWS: View[] = ["projects", "references", "contact"];

type Ctx = {
  view: View;
  setView: (v: View) => void;
  mode: Mode;
  setMode: (m: Mode) => void;
  /** Currently open project (slug), null when no detail panel is showing. */
  selectedProject: string | null;
  openProject: (id: string) => void;
  closeProject: () => void;
};

const ViewCtx = createContext<Ctx | null>(null);

function isView(v: string): v is View {
  return (VIEWS as string[]).includes(v);
}

export function ViewProvider({ children }: { children: ReactNode }) {
  const [view, setViewState] = useState<View>("projects");
  const [mode, setMode] = useState<Mode>("overview");
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  // Hydrate active tab from URL hash.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash.replace(/^#/, "");
    if (hash === "research") return setViewState("references");
    if (hash && isView(hash)) setViewState(hash);
    const onHash = () => {
      const next = window.location.hash.replace(/^#/, "");
      if (next === "research") return setViewState("references");
      if (isView(next)) setViewState(next);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const setView = useCallback((v: View) => {
    setViewState(v);
    setSelectedProject(null);
    if (typeof window !== "undefined") {
      const url = `${window.location.pathname}#${v}`;
      window.history.replaceState(null, "", url);
    }
  }, []);

  const openProject = useCallback((id: string) => setSelectedProject(id), []);
  const closeProject = useCallback(() => setSelectedProject(null), []);

  // ESC closes the detail panel.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedProject(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const value = useMemo(
    () => ({
      view,
      setView,
      mode,
      setMode,
      selectedProject,
      openProject,
      closeProject,
    }),
    [view, setView, mode, setMode, selectedProject, openProject, closeProject],
  );

  return <ViewCtx.Provider value={value}>{children}</ViewCtx.Provider>;
}

export function useView() {
  const ctx = useContext(ViewCtx);
  if (!ctx) throw new Error("useView must be used inside <ViewProvider>");
  return ctx;
}

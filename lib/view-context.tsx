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

export type View = "projects" | "research" | "studio" | "contact";
export type Mode = "overview" | "index";

const VIEWS: View[] = ["projects", "research", "studio", "contact"];

type Ctx = {
  view: View;
  setView: (v: View) => void;
  mode: Mode;
  setMode: (m: Mode) => void;
};

const ViewCtx = createContext<Ctx | null>(null);

function isView(v: string): v is View {
  return (VIEWS as string[]).includes(v);
}

/**
 * Owns the active tab + Overview/Index mode for the entire app.
 * The active view also syncs with the URL hash so links and refreshes
 * land on the right page.
 */
export function ViewProvider({ children }: { children: ReactNode }) {
  const [view, setViewState] = useState<View>("projects");
  const [mode, setMode] = useState<Mode>("overview");

  // Hydrate from initial URL hash, e.g. #research.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash.replace(/^#/, "");
    if (hash && isView(hash)) setViewState(hash);
    const onHash = () => {
      const next = window.location.hash.replace(/^#/, "");
      if (isView(next)) setViewState(next);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const setView = useCallback((v: View) => {
    setViewState(v);
    if (typeof window !== "undefined") {
      // Use replaceState so the back button doesn't fill up with
      // every tab click, but the URL still reflects current view.
      const url = `${window.location.pathname}#${v}`;
      window.history.replaceState(null, "", url);
    }
  }, []);

  const value = useMemo(
    () => ({ view, setView, mode, setMode }),
    [view, setView, mode, setMode],
  );

  return <ViewCtx.Provider value={value}>{children}</ViewCtx.Provider>;
}

export function useView() {
  const ctx = useContext(ViewCtx);
  if (!ctx) throw new Error("useView must be used inside <ViewProvider>");
  return ctx;
}

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
};

const ViewCtx = createContext<Ctx | null>(null);

function isView(v: string): v is View {
  return (VIEWS as string[]).includes(v);
}

export function ViewProvider({ children }: { children: ReactNode }) {
  const [view, setViewState] = useState<View>("projects");
  const [mode, setMode] = useState<Mode>("overview");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash.replace(/^#/, "");
    // Backwards compat: "research" (old) maps to "references".
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
    if (typeof window !== "undefined") {
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

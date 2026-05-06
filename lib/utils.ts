import clsx, { type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/**
 * Resolve a public asset path with the configured GitHub Pages basePath.
 * Use this whenever you reference a file from `public/`, e.g.
 *   <img src={asset("/media/cover.jpg")} />.
 */
export function asset(path: string) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  if (!path.startsWith("/")) path = `/${path}`;
  return `${base}${path}`;
}

export function isClient() {
  return typeof window !== "undefined";
}

export function prefersReducedMotion() {
  if (!isClient()) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

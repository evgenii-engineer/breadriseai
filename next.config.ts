import type { NextConfig } from "next";

/**
 * Static export config for GitHub Pages.
 *
 * - `BASE_PATH` is the repository sub-path when deploying to
 *   `<user>.github.io/<repo>`. Leave empty for a custom domain (CNAME)
 *   or for `<user>.github.io` user pages.
 *   Set in CI via the `NEXT_PUBLIC_BASE_PATH` env variable.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  poweredByHeader: false,
  images: {
    unoptimized: true,
  },
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  compiler: {
    // Strip console.log in production builds. Keep error/warn so
    // genuine failures still surface in browser DevTools.
    removeConsole: { exclude: ["error", "warn"] },
  },
};

export default nextConfig;

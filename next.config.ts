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
  images: {
    unoptimized: true,
  },
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  experimental: {
    optimizePackageImports: ["framer-motion", "gsap"],
  },
};

export default nextConfig;

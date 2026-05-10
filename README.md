# Bread Rise — creative studio site

A cinematic, editorial portfolio built with **Next.js 15**, **TypeScript**
and **TailwindCSS**. All animations are CSS-driven so the runtime ships
without `framer-motion`, `gsap`, or a smooth-scroll library. Designed for
**static export** to **GitHub Pages**.

```
app/                Next.js app router (layout, page, globals, 404)
components/         App shell, views, project stack/detail, loader, Img, Analytics
  views/            Projects / References / Contact view modules
lib/                site copy, projects data, view + preload contexts, utils
public/             Static assets shipped as-is (favicons, og.jpg, media, sitemap…)
scripts/            optimize-images.sh — generates responsive WebP variants
.github/workflows/  GitHub Pages CI
```

## Run locally

```bash
nvm use            # node 20
npm install
npm run dev        # http://localhost:3000
```

## Build a static export

```bash
npm run build      # outputs ./out/
```

`out/` is a fully self-contained static site. The `postbuild` script drops a
`.nojekyll` file so GitHub Pages serves `_next/` assets correctly.

## Image pipeline

Photos under `public/media/<project>/` are emitted in three responsive
WebP variants (`-200`, `-800`, `-1280`) by `scripts/optimize-images.sh`.
The data layer in [`lib/projects.ts`](lib/projects.ts) returns an
`ImgSrc` for each photo with the right `srcset` so the browser picks
the smallest variant that fills its slot. Drop new photos in, run
`npm run optimize:images`, commit the resulting variants — the
originals are deleted to keep the deploy artifact small.

## Deploy to GitHub Pages

The repo ships with [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)
which builds on every push to `main` / `master` and publishes to Pages.

**One-time setup:**

1. Push this repo to GitHub.
2. **Settings → Pages** → Source: **GitHub Actions**.
3. **Settings → Pages** → Custom domain: `breadriseai.com`. Tick
   **Enforce HTTPS** once the cert is issued (5–60 min).
4. Push to `main` — the workflow runs automatically.

The workflow forwards GitHub's resolved `base_path` into
`NEXT_PUBLIC_BASE_PATH`, so:

| Deployment style                              | Base path        |
| --------------------------------------------- | ---------------- |
| `https://<user>.github.io/<repo>/`            | `/<repo>`        |
| `https://<user>.github.io/` (user pages)      | _(empty)_        |
| Custom domain via `CNAME`                     | _(empty)_        |

Asset URLs go through `lib/utils.ts → asset()` which prepends the base
path, so images you reference as `/media/foo.jpg` resolve correctly
under any sub-path.

### Custom domain

`public/CNAME` already contains `breadriseai.com` — it's copied verbatim
into `out/` on every build.

## Optional: Google Analytics 4

GA4 only loads when the build sees a measurement ID. Without it, no
third-party JS is requested.

1. Create a GA4 property + Web data stream at https://analytics.google.com.
2. Copy the measurement ID (`G-XXXXXXX`).
3. GitHub repo → **Settings → Secrets and variables → Actions → Variables**
   → New repository variable: name `NEXT_PUBLIC_GA_ID`, value
   `G-XXXXXXX`.
4. Re-run the deploy workflow (or push any commit). The next build
   embeds the gtag snippet via `next/script strategy="afterInteractive"`,
   so it never blocks LCP.

## Caching & security on GitHub Pages

GitHub Pages serves through Fastly with sensible defaults:

- HTTPS auto-issued for the custom domain (Let's Encrypt).
- gzip compression for text assets.
- Long-lived cache for hashed assets under `/_next/static/*`.
- HTML cached ~10 min.

What we **cannot** set without leaving GitHub Pages: `Strict-Transport-Security`,
`X-Frame-Options`, `Permissions-Policy`, `X-Content-Type-Options`,
custom `Cache-Control` per path. The site uses the `<meta>` form for
the headers that browsers honor that way (`referrer`, `theme-color`,
`color-scheme`, `format-detection`).

To get the HSTS posture browsers ship by default for `.github.io`,
submit the apex domain at https://hstspreload.org once you're sure
HTTPS is the only entry point.

## Editing content

Almost everything you'll want to change lives in two files:

- **[`lib/site.ts`](lib/site.ts)** — studio name, description, location,
  social links, theme colour.
- **[`lib/projects.ts`](lib/projects.ts)** — the project / case-study
  list rendered in **Projects** and **References**. Each project lists
  its photos as bare basenames (e.g. `IMG_3393`) — `img()` resolves the
  three responsive WebP variants automatically.

To edit the views directly:

- 3D project stack → [`components/ProjectStack.tsx`](components/ProjectStack.tsx)
- Editorial index → [`components/ProjectIndex.tsx`](components/ProjectIndex.tsx)
- References (phyllotaxis cluster) → [`components/views/ReferencesView.tsx`](components/views/ReferencesView.tsx)
- Contact view → [`components/views/ContactView.tsx`](components/views/ContactView.tsx)
- Project detail panel → [`components/ProjectDetail.tsx`](components/ProjectDetail.tsx)
- First-paint loader → [`components/LoadingScreen.tsx`](components/LoadingScreen.tsx)
- Top navigation → [`components/Navigation.tsx`](components/Navigation.tsx)

### Design tokens

Colours, typography and timing curves live in
[`tailwind.config.ts`](tailwind.config.ts). Global base styles, focus
ring, skip-link and the `view-in` / `rise-in` keyframes live in
[`app/globals.css`](app/globals.css).

### Animation

The site uses two CSS keyframes: `view-in` (cross-fade) and `rise-in`
(8 px lift + opacity). Both honor `prefers-reduced-motion: reduce` —
`globals.css` clamps every animation to 0.01ms when the user opts out.

## What this scaffold deliberately doesn't include

No backend, no database, no auth, no client-side data fetching.
Everything is pre-rendered at build time so it ships happily to any
static host. No web fonts — the site uses system stacks (Helvetica
Neue / Helvetica / Arial) so there's zero font cost on first paint.

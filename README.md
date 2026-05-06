# Elsewhere — creative studio site

A cinematic, editorial-leaning portfolio scaffold built with **Next.js 15**,
**TypeScript**, **TailwindCSS**, **GSAP**, **Framer Motion** and
**Lenis** smooth scroll. Designed for **static export** to **GitHub Pages**.

```
app/                Next.js app router
  layout.tsx        Root shell (chrome, smooth scroll, metadata)
  page.tsx          Home — composes the sections
  globals.css       Design tokens, base styles, utility layers
  not-found.tsx     404 page
sections/           Page-level sections (Hero, Work, …)
components/         Reusable UI (cursor, nav, marquee, …)
lib/                Animation helpers, GSAP wiring, content data
public/             Static assets shipped as-is (favicon, .nojekyll, media)
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

## Deploy to GitHub Pages

The repo ships with [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)
which builds on every push to `main` / `master` and publishes to Pages.

**One-time setup:**

1. Push this repo to GitHub.
2. In **Settings → Pages**, set **Source** to **GitHub Actions**.
3. Push to `main` — the workflow runs automatically.

The workflow forwards GitHub's resolved `base_path` into
`NEXT_PUBLIC_BASE_PATH`, so:

| Deployment style                              | Base path        |
| --------------------------------------------- | ---------------- |
| `https://<user>.github.io/<repo>/`            | `/<repo>`        |
| `https://<user>.github.io/` (user pages)      | _(empty)_        |
| Custom domain via `CNAME`                     | _(empty)_        |

Asset URLs go through `lib/utils.ts → asset()` which prepends the base path,
so images you reference as `/media/foo.jpg` will resolve correctly under
the sub-path.

### Custom domain

If you point a domain at the site, drop a `CNAME` file in `public/` containing
the hostname (e.g. `elsewhere.studio`). It will be copied verbatim to `out/`.

## Editing content

Almost everything you'll want to change lives in two files:

- **[`lib/site.ts`](lib/site.ts)** — studio name, email, location, navigation
  labels and social links.
- **[`lib/projects.ts`](lib/projects.ts)** — the project / case-study list
  rendered in the **Work** section. Each item takes a `cover` image URL
  (drop your own files in `public/media/` and reference as `/media/...`),
  a client, title, year, and discipline tags.

To rewrite section copy directly:

- Hero headline, lede, scroll cue → [`sections/Hero.tsx`](sections/Hero.tsx)
- Disciplines + studio stats → [`sections/Index.tsx`](sections/Index.tsx)
- About / Studio paragraphs → [`sections/Studio.tsx`](sections/Studio.tsx)
- Manifesto lines → `LINES` array in [`sections/Manifesto.tsx`](sections/Manifesto.tsx)
- Contact CTA → [`sections/Contact.tsx`](sections/Contact.tsx)
- Footer marquee + colophon → [`sections/Footer.tsx`](sections/Footer.tsx)

### Design tokens

Colors, typography scale and timing functions live in
[`tailwind.config.ts`](tailwind.config.ts) under `theme.extend`. Global
chrome (grain overlay, vignette, cursor base styles) is defined in
[`app/globals.css`](app/globals.css).

### Adding a new section

1. Drop a `sections/MySection.tsx` file (use `"use client"` if it needs
   hooks or animations).
2. Import and render it inside [`app/page.tsx`](app/page.tsx).
3. If you want it in the menu, add an entry to `site.navigation` in
   `lib/site.ts` with a matching `id` on the section.

### Animation utilities

- `useRevealText(ref)` — split words and reveal them on scroll.
- `useStaggerChildren(ref)` — fade + lift children in sequence.
- `useParallax(ref, amount)` — vertical parallax on scroll.
- `useMagnetic(strength)` — element drifts toward the cursor.

All four respect `prefers-reduced-motion` automatically.

## Accessibility & motion

- Custom cursor only attaches on fine-pointer devices; keyboard / touch
  users get the native cursor.
- Lenis smooth scroll, GSAP reveals, and orb drift all bail out under
  `prefers-reduced-motion: reduce`.
- All section anchors are linked from the navigation, so keyboard users
  can jump between them.

## What this scaffold deliberately doesn't include

No backend, no database, no auth, no server components doing data
fetching. Everything is pre-rendered at build time so it ships happily
to any static host (GitHub Pages, Cloudflare Pages, S3, etc.).

---

Built to feel slow on purpose.

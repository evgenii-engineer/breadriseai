import type { Metadata, Viewport } from "next";
import "./globals.css";
import { site } from "@/lib/site";
import { asset } from "@/lib/utils";
import { Analytics } from "@/components/Analytics";
import { LoadingScreen } from "@/components/LoadingScreen";
import { Navigation } from "@/components/Navigation";
import { ViewProvider } from "@/lib/view-context";
import { PreloadProvider } from "@/lib/preload-context";

const SITE_URL = `https://${site.domain}`;
const OG_IMAGE = asset("/og.jpg");

export const metadata: Metadata = {
  title: {
    default: `${site.name} — AI Production · Creative Direction`,
    template: `%s · ${site.name}`,
  },
  description: site.shortDescription,
  metadataBase: new URL(SITE_URL),
  applicationName: site.name,
  authors: [{ name: site.name, url: SITE_URL }],
  creator: site.name,
  publisher: site.name,
  generator: "Next.js",
  category: "Design",
  keywords: [
    "AI fashion",
    "AI editorial",
    "AI production",
    "creative direction",
    "art direction",
    "Lisbon studio",
    "visual identity",
    "fashion imagery",
  ],
  alternates: {
    canonical: "/",
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  // Browsers honor <meta name="referrer"> even when no Referrer-Policy
  // HTTP header is set by the host (e.g. GitHub Pages). Same with the
  // colour-scheme hint above. The other security headers (HSTS,
  // X-Content-Type-Options, X-Frame-Options, Permissions-Policy) only
  // work as response headers — see the README for how to harden the
  // GitHub Pages baseline (HSTS preload submission).
  referrer: "strict-origin-when-cross-origin",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: `${site.name} — AI Production · Creative Direction`,
    description: site.shortDescription,
    url: SITE_URL,
    siteName: site.name,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: `${site.name} — Cinematic moments, made with AI.`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — AI Production · Creative Direction`,
    description: site.shortDescription,
    images: [OG_IMAGE],
  },
  icons: {
    icon: [
      { url: asset("/favicon.svg"), type: "image/svg+xml" },
      { url: asset("/favicon-32.png"), sizes: "32x32", type: "image/png" },
      { url: asset("/favicon-16.png"), sizes: "16x16", type: "image/png" },
    ],
    apple: { url: asset("/apple-touch-icon.png"), sizes: "180x180", type: "image/png" },
  },
  manifest: asset("/site.webmanifest"),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: site.themeColor,
  width: "device-width",
  initialScale: 1,
  // Allow users to pinch-zoom — clamping zoom is an a11y antipattern.
  maximumScale: 5,
  colorScheme: "light",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: site.name,
      url: SITE_URL,
      logo: `${SITE_URL}${OG_IMAGE}`,
      description: site.description,
      sameAs: site.social.map((s) => s.href),
      address: {
        "@type": "PostalAddress",
        addressLocality: site.location,
        addressCountry: "PT",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: site.name,
      description: site.shortDescription,
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en",
    },
    {
      "@type": "CreativeWorkSeries",
      "@id": `${SITE_URL}/#projects`,
      name: `${site.name} — Selected Work`,
      url: `${SITE_URL}#projects`,
      creator: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-paper">
      <head>
        {/* Hint the connection to the canonical origin so the browser
            can warm DNS / TCP / TLS in parallel with HTML parsing.
            The LCP image preload is emitted automatically by React 19
            for the first stack plate (loading="eager", fetchpriority="high"). */}
        <link rel="dns-prefetch" href={SITE_URL} />
        <script
          type="application/ld+json"
          // Static JSON, served at build time — safe.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-paper text-ink antialiased">
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <PreloadProvider>
          <ViewProvider>
            <LoadingScreen />
            <Navigation />
            <main id="main" tabIndex={-1}>
              {children}
            </main>
          </ViewProvider>
        </PreloadProvider>
        <Analytics />
      </body>
    </html>
  );
}

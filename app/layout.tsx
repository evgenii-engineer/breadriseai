import type { Metadata, Viewport } from "next";
import "./globals.css";
import { site } from "@/lib/site";
import { SmoothScroll } from "@/components/SmoothScroll";
import { CustomCursor } from "@/components/CustomCursor";
import { LoadingScreen } from "@/components/LoadingScreen";
import { NoiseOverlay } from "@/components/NoiseOverlay";
import { Navigation } from "@/components/Navigation";
import { ScrollIndicator } from "@/components/ScrollIndicator";

export const metadata: Metadata = {
  title: {
    default: `${site.name} — Cinematic Digital Studio`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  metadataBase: new URL(`https://${site.domain}`),
  openGraph: {
    type: "website",
    title: site.name,
    description: site.description,
    url: `https://${site.domain}`,
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-ink">
      <body className="bg-ink text-bone antialiased grain vignette">
        <SmoothScroll>
          <LoadingScreen />
          <NoiseOverlay />
          <CustomCursor />
          <Navigation />
          <ScrollIndicator />
          <main id="main">{children}</main>
        </SmoothScroll>
      </body>
    </html>
  );
}

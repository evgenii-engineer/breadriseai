import type { Metadata, Viewport } from "next";
import "./globals.css";
import { site } from "@/lib/site";
import { CustomCursor } from "@/components/CustomCursor";
import { LoadingScreen } from "@/components/LoadingScreen";
import { Navigation } from "@/components/Navigation";
import { ViewProvider } from "@/lib/view-context";

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
  themeColor: "#f1ece4",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-paper">
      <body className="bg-paper text-ink antialiased grain">
        <ViewProvider>
          <LoadingScreen />
          <CustomCursor />
          <Navigation />
          <main id="main">{children}</main>
        </ViewProvider>
      </body>
    </html>
  );
}

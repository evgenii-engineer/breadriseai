import Script from "next/script";

/**
 * Google Analytics 4. Renders nothing — and does *not* request any
 * third-party JS — unless `NEXT_PUBLIC_GA_ID` is set at build time.
 *
 * Set it in CI (GitHub Actions secret, Cloudflare Pages env var,
 * `.env.local`, …). Format: `G-XXXXXXX`. Once present, the gtag.js
 * snippet loads with `strategy="afterInteractive"`, so it never
 * blocks LCP / FCP.
 */
export function Analytics() {
  const id = process.env.NEXT_PUBLIC_GA_ID;
  if (!id) return null;
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${id}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}

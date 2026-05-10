import Script from "next/script";

const GOATCOUNTER_URL = "https://breadriseai.goatcounter.com/count";

/**
 * Privacy-friendly analytics. GoatCounter loads on every build (no
 * cookies, no PII). Google Analytics 4 only loads when
 * `NEXT_PUBLIC_GA_ID` is set. Both load with
 * `strategy="afterInteractive"`, so they never block LCP / FCP.
 */
export function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  return (
    <>
      {gaId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}', { anonymize_ip: true });
            `}
          </Script>
        </>
      )}
      <Script
        src="https://gc.zgo.at/count.js"
        data-goatcounter={GOATCOUNTER_URL}
        strategy="afterInteractive"
      />
    </>
  );
}

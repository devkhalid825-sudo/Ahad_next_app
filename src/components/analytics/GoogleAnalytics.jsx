'use client';

import { usePathname } from 'next/navigation';
import Script from 'next/script';

const GA_MEASUREMENT_ID = 'G-4VLP3K6ZJS';

/**
 * Google Analytics 4 (GA4) Script Component
 * Safely excludes any route starting with `/admin` so internal dashboard visits
 * do not distort public analytics data.
 */
export default function GoogleAnalytics() {
  const pathname = usePathname();

  // Do not load GA4 on admin dashboard / login routes
  if (pathname && pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <>
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-config" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  );
}

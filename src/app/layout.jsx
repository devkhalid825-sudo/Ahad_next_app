import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { SITE_URL } from '@/utils/api';
import { SITE_SCHEMA } from '@/seo/schemas';
import SiteShell from '@/components/SiteShell';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#1A4FA0',
};

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Elipse Studio | 3D Visualization & AR/VR Studio',
    template: `%s | Elipse Studio`,
  },
  description:
    'Elipse Studio delivers premium 3D rendering, walkthrough animation, interactive web configurators, and AR/VR experiences for property developers and brands worldwide since 2014. Trusted by Burj Binghatti.',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'Elipse Studio',
    title: 'Elipse Studio | 3D Visualization & AR/VR Studio',
    description:
      'Elipse Studio delivers premium 3D rendering, walkthrough animation, interactive web configurators, and AR/VR experiences for property developers and brands worldwide since 2014. Trusted by Burj Binghatti.',
    images: [
      {
        url: `${SITE_URL}/assets/logo-og.webp`,
        width: 1200,
        height: 630,
        alt: 'Elipse Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@ElipseStudio',
    creator: '@ElipseStudio',
    title: 'Elipse Studio | 3D Visualization & AR/VR Studio',
    description:
      'Elipse Studio delivers premium 3D rendering, walkthrough animation, interactive web configurators, and AR/VR experiences for property developers and brands worldwide since 2014. Trusted by Burj Binghatti.',
    images: [`${SITE_URL}/assets/logo-og.webp`],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/Web_White_Icon.ico',
  },
};

const GTM_ID = 'GTM-P38LKZMN';

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <Script id="gtm-idle-delayed" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            (function () {
              let loaded = false;
              function loadGTM() {
                if (loaded) return;
                loaded = true;
                window.removeEventListener('scroll', loadGTM);
                window.removeEventListener('mousemove', loadGTM);
                window.removeEventListener('touchstart', loadGTM);
                window.removeEventListener('keydown', loadGTM);
                (function (w, d, s, l, i) {
                  w[l] = w[l] || []; w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
                  var f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : '';
                  j.async = true; j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
                  f.parentNode.insertBefore(j, f);
                })(window, document, 'script', 'dataLayer', '${GTM_ID}');
              }
              if ('requestIdleCallback' in window) {
                requestIdleCallback(loadGTM, { timeout: 8000 });
              } else {
                setTimeout(loadGTM, 4000);
              }
              window.addEventListener('scroll', loadGTM, { passive: true });
              window.addEventListener('mousemove', loadGTM, { passive: true });
              window.addEventListener('touchstart', loadGTM, { passive: true });
              window.addEventListener('keydown', loadGTM, { passive: true });
            })();
          `}
        </Script>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-BEL0YQZ0G0"
          strategy="afterInteractive"
        />
        <Script id="ga4-config" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-BEL0YQZ0G0');
          `}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(SITE_SCHEMA) }}
        />
      </head>
      <body className="font-sans antialiased bg-black text-white">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}

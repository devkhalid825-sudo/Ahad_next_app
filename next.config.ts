import type { NextConfig } from "next";
import path from "path";

// Resolve the compat shim absolute path once
const routerCompatPath = path.resolve(__dirname, "src/lib/router-compat.js");

const serviceRedirects = [
  ["/services/web-configurators", "/services/3d-product-configurators"],
  ["/services/web-configurator-development", "/services/3d-product-configurators"],
  ["/services/vr", "/services/vr-development"],
  ["/services/ar", "/services/ar-development"],
  ["/services/app-development", "/services/custom-software-development"],
  ["/services/animation", "/services/3d-animation"],
  ["/services/walkthrough-animation", "/services/3d-animation"],
  ["/services/3d-rendering-dubai", "/services/3d-product-visualization"],
  ["/services/interactive-configurators", "/services/3d-product-configurators"],
  ["/services/vr-ar-experiences", "/services/vr-development"],
  ["/services/architectural-visualization-uae", "/services/architectural-visualization"],
];

const redirects = [
  ["/case-study", "/case-studies"],
  ["/case-study-one", "/project/gabani-emerald"],
  ["/case-study-two", "/project/villa-luxury"],
  ["/case-study-three", "/project/volvo-configurator"],
  ["/case-study-peek-freans", "/project/peek-freans"],
  ["/project", "/portfolio"],
  ["/blogs", "/blog"],
  ["/blogs/", "/blog"],
  // Dead/renamed CMS blog slugs still receiving crawler hits — redirect to
  // the current post (or the blog hub) instead of serving a noindex 200.
  ["/blog/3d-configurators-increase-ecommerce-sales-qualified-leads", "/blog/how-3d-configurators-increase-ecommerce-sales-qualified-leads"],
  ["/blog/does-animation-pricing-usually-include-scriptwriting", "/blog"],
  ["/blog/How Browser-Based AR Turns Product Pages Into Try-Before-You-Buy Experiences", "/blog/how-browser-based-arturns-product-pages-into-try-before-you-buy-experiences"],
  ["/blog/How%20Browser-Based%20AR%20Turns%20Product%20Pages%20Into%20Try-Before-You-Buy%20Experiences", "/blog/how-browser-based-arturns-product-pages-into-try-before-you-buy-experiences"],
  // projects_sitemap.xml previously listed slugs that don't match the CMS
  // (typos in the real slugs / a since-renamed slug) — Google indexed the
  // wrong URLs and got a noindex 404 fallback. Point them at the real pages.
  // the-acadmey was the actual CMS slug (typo); it has now been corrected to
  // the-academy in the database, so old links/crawled URLs must redirect forward.
  ["/project/the-acadmey", "/project/the-academy"],
  ["/project/space-explorer-vr-experience", "/project/space-explorer-vr"],
  ["/project/seats-configurator", "/project/seat-configurator"],
  ["/project/towels-configurator", "/project/towel-configurator"],
  ["/services/web-configurator-developmented-leads", "/services/3d-product-configurators"],
];

const wildcardRedirects = [
  { source: "/blogs/:slug*", destination: "/blog/:slug*", permanent: true },
];

const oldWordPressRedirects = [
  ["/services/webdevelopment", "/services/website-development"],
  ["/services/webdevelopment/", "/services/website-development"],
  ["/services/character-animation", "/services/3d-animation"],
  ["/services/character-animation/", "/services/3d-animation"],
  ["/animation", "/services/3d-animation"],
  ["/animation/", "/services/3d-animation"],
  ["/portfolio/giordano-vfx", "/portfolio"],
  ["/portfolio/giordano-vfx/", "/portfolio"],
  ["/elipse-studio-viz-roi", "/blog/elipse-studio-viz-roi"],
  ["/elipse-studio-viz-roi/", "/blog/elipse-studio-viz-roi"],
  ["/rt-portfolios/boat-configurator", "/portfolio/boat-configurator"],
  ["/rt-portfolios/boat-configurator/", "/portfolio/boat-configurator"],
  ["/vr-development-guide-for-beginners", "/blog/vr-custom-development-2026"],
  ["/vr-development-guide-for-beginners/", "/blog/vr-custom-development-2026"],
  ["/rt-portfolios", "/portfolio"],
  ["/rt-portfolios/", "/portfolio"],
  ["/rt-portfolios/:slug*", "/portfolio/:slug*"],
];


const backendUrl = (process.env.NEXT_PUBLIC_BACKEND_URL || process.env.BACKEND_URL || "https://mediumseagreen-crocodile-699024.hostingersite.com").replace(/\/+$/, "");
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || process.env.FRONTEND_URL || "https://elipsestudio.com").replace(/\/+$/, "");

const securityHeaders = [
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Content-Security-Policy",
    value: "default-src 'self' https: data: blob: 'unsafe-inline' 'unsafe-eval'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://static.cloudflareinsights.com https://www.youtube.com https://s.ytimg.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' https: data: blob:; media-src 'self' https: blob: data:; frame-src 'self' https://www.youtube.com https://youtube.com https://www.youtube-nocookie.com https://calendly.com; connect-src 'self' https: wss:;",
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,

  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },

  async redirects() {
    return [
      ...wildcardRedirects,
      ...redirects.map(([source, destination]) => ({
        source,
        destination,
        permanent: true,
      })),
      ...serviceRedirects.flatMap(([source, destination]) => [
        { source, destination, permanent: true },
        { source: `${source}/`, destination, permanent: true },
      ]),
      ...oldWordPressRedirects.map(([source, destination]) => ({
        source,
        destination,
        permanent: true,
      })),
    ];
  },

  // Rewrites to proxy API & Upload requests directly to the backend host.
  // This eliminates CORS issues and preflight errors on client-side fetch.
  async rewrites() {
    const resolvedBackendUrl = (process.env.NEXT_PUBLIC_BACKEND_URL || process.env.BACKEND_URL || backendUrl).replace(/\/+$/, "");
    return [
      {
        source: `/api/:path*`,
        destination: `${resolvedBackendUrl}/api/:path*`,
      },
      {
        source: `/uploads/:path*`,
        destination: `${resolvedBackendUrl}/uploads/:path*`,
      },
    ];
  },

  // Allow images from the configured backend host & production domain
  images: {
    disableStaticImages: false,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "elipsestudio.com",
        pathname: "/**",
      },
      // Backend server where uploads are stored
      {
        protocol: "https",
        hostname: "mediumseagreen-crocodile-699024.hostingersite.com",
        pathname: "/uploads/**",
      },
    ],
  },

  // Turbopack alias (dev server)
  turbopack: {
    root: path.join(__dirname),
    resolveAlias: {
      "react-router-dom": "./src/lib/router-compat.js",
    },
  },

  // Webpack alias (production build)
  webpack(config) {
    config.resolve.alias["react-router-dom"] = routerCompatPath;
    return config;
  },
};

export default nextConfig;

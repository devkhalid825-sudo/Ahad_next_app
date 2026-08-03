import type { NextConfig } from "next";
import path from "path";

// Resolve the compat shim absolute path once
const routerCompatPath = path.resolve(__dirname, "src/lib/router-compat.js");

const serviceRedirects = [
  ["/services/web-configurators", "/services/3d-product-configurators"],
  ["/services/vr", "/services/vr-development"],
  ["/services/ar", "/services/ar-development"],
  ["/services/app-development", "/services/custom-software-development"],
  ["/services/animation", "/services/3d-animation"],
  ["/services/interactive-configurators", "/services/3d-product-configurators"],
  ["/services/vr-ar-experiences", "/services/vr-development"],
  ["/services/architectural-visualization-uae", "/services/architectural-visualization"],
];

const industryRedirects = [
  ["/industries/real-estate", "/services/architectural-visualization"],
  ["/industries/architecture", "/services/architectural-visualization"],
  ["/industries/interior-design", "/services/architectural-visualization"],
  ["/industries/manufacturing", "/services/3d-product-visualization"],
  ["/industries/ecommerce", "/services/3d-product-configurators"],
  ["/industries/automotive", "/services/3d-product-configurators"],
  ["/industries/furniture", "/services/3d-product-configurators"],
  ["/industries/healthcare", "/services/vr-development"],
  ["/industries/education-training", "/services/vr-development"],
  ["/industries/construction", "/services/architectural-visualization"],
  ["/industries/energy-utilities", "/services/enterprise-solutions"],
  ["/industries/hospitality", "/services/architectural-visualization"],
];

const redirects = [
  ["/case-study", "/case-studies"],
  ["/case-study-one", "/project/gabani-emerald"],
  ["/case-study-two", "/project/villa-luxury"],
  ["/case-study-three", "/project/volvo-configurator"],
  ["/case-study-peek-freans", "/project/peek-freans"],
  ["/project", "/portfolio"],
  ["/blogs", "/blog"],
];

const backendUrl = (process.env.NEXT_PUBLIC_BACKEND_URL || process.env.BACKEND_URL || "https://pink-toad-569074.hostingersite.com").replace(/\/+$/, "");

const nextConfig: NextConfig = {
  async redirects() {
    return [
      ...redirects.map(([source, destination]) => ({
        source,
        destination,
        permanent: true,
      })),
      ...serviceRedirects.map(([source, destination]) => ({
        source,
        destination,
        permanent: true,
      })),
      ...industryRedirects.map(([source, destination]) => ({
        source,
        destination,
        permanent: true,
      })),
    ];
  },

  // Rewrites to proxy API & Upload requests directly to the backend host.
  // This eliminates CORS issues and preflight errors on client-side fetch.
  async rewrites() {
    const backendUrl = (process.env.NEXT_PUBLIC_BACKEND_URL || process.env.BACKEND_URL || "https://elipsestudio.com").replace(/\/+$/, "");
    return [
      {
        source: `/api/:path*`,
        destination: `${backendUrl}/api/:path*`,
      },
      {
        source: `/uploads/:path*`,
        destination: `${backendUrl}/uploads/:path*`,
      },
      { source: "/robots.txt", destination: `${backendUrl}/robots.txt` },
      { source: "/sitemap.xml", destination: `${backendUrl}/sitemap.xml` },
      { source: "/:type(pages|projects|blogs|casestudies)_sitemap.xml", destination: `${backendUrl}/:type_sitemap.xml` },
    ];
  },

  // Allow images from the configured backend host & disable static image objects if needed
  images: {
    disableStaticImages: false,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pink-toad-569074.hostingersite.com",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "elipsestudio.com",
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

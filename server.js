require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const compression = require("compression");
const { createProxyMiddleware } = require("http-proxy-middleware");

const routeCache = new Map();

const NEXT_PORT = process.env.NEXT_PORT || "3005";

async function doesNextJsHandleRoute(reqPath) {
  const pathOnly = reqPath.split('?')[0];

  if (routeCache.has(pathOnly)) {
    return routeCache.get(pathOnly);
  }

  try {
    let res = await fetch(`http://127.0.0.1:${NEXT_PORT}${pathOnly}`, {
      method: "HEAD",
      redirect: "manual", 
    });

    let exists = res.status !== 404;

    // If 404 and path has uppercase letters, try lowercase path matching
    if (!exists && pathOnly !== pathOnly.toLowerCase()) {
      const lowerRes = await fetch(`http://127.0.0.1:${NEXT_PORT}${pathOnly.toLowerCase()}`, {
        method: "HEAD",
        redirect: "manual", 
      });
      exists = lowerRes.status !== 404;
    }

    if (routeCache.size > 10000) {
      routeCache.clear();
    }
    
    routeCache.set(pathOnly, exists);
    return exists;
  } catch (err) {
    console.error(`Error checking route ${pathOnly} in Next.js:`, err.message);
    return true;
  }
}

const server = express();

server.disable("x-powered-by");
server.set("trust proxy", 1);
server.use(morgan("combined"));
server.use(compression());

const nextTarget = `http://127.0.0.1:${NEXT_PORT}`;
const legacyTarget = (process.env.LEGACY_URL || "https://legacy.elipsestudio.com").replace(/\/$/, '');

const smartProxy = createProxyMiddleware({
  target: nextTarget,
  
  router: async function (req) {
    // Static Next.js assets always go to Next.js
    if (req.url.startsWith("/_next") || req.url === "/favicon.ico") {
      return nextTarget;
    }

    // API & upload routes MUST always go to Next.js (which proxies to backend).
    // Routing these to legacy causes CORS errors because the Origin header
    // becomes legacy.elipsestudio.com which is not in the backend CORS whitelist.
    if (
      req.url.startsWith("/api/") ||
      req.url.startsWith("/uploads/") ||
      req.url.startsWith("/sitemap") ||
      req.url.startsWith("/robots.txt")
    ) {
      return nextTarget;
    }

    const existsInNextJs = await doesNextJsHandleRoute(req.url);

    if (!existsInNextJs) {
      console.log(`[PROXY] Routing to LEGACY: ${req.url}`);
      return legacyTarget;
    }

    return nextTarget;
  },

  changeOrigin: true,

  cookieDomainRewrite: {
    "*": ""
  },

  onProxyReq: (proxyReq, req) => {
    // Ensure the Origin header always reflects the production domain,
    // not the legacy domain — prevents backend CORS rejections.
    const host = req.headers.host || "elipsestudio.com";
    const origin = `https://${host}`;
    proxyReq.setHeader("origin", origin);
    proxyReq.setHeader("referer", origin + req.url);
  },

  onProxyRes: (proxyRes, req, res) => {
    if (proxyRes.headers.location) {
      const currentHost = req.headers.host || "elipsestudio.com";
      // Cleanly rewrite legacy domain or invalid 'true' string in Location header to current domain
      proxyRes.headers.location = proxyRes.headers.location
        .replace(/https?:\/\/(legacy\.elipsestudio\.com|true)/gi, `https://${currentHost}`);
    }
  },

  onError: (err, req, res) => {
    console.error("[PROXY ERROR]", err.message);
    if (!res.headersSent) {
      res.status(502).send("Bad Gateway");
    }
  },
});

server.all("*", smartProxy);

const port = parseInt(process.env.PORT || "3000", 10);
server.listen(port, "127.0.0.1", (err) => {
  if (err) throw err;
  console.log(`> Express Proxy listening on http://127.0.0.1:${port}`);
  console.log(`> Intelligent Routing enabled.`);
});

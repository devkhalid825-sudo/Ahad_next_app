require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const compression = require("compression");
const { createProxyMiddleware } = require("http-proxy-middleware");

// In Node 18+, fetch is natively available.
// We use a small LRU cache to store whether a route exists in Next.js.
// This prevents us from doing a HEAD request for every single GET request to the same path.
const routeCache = new Map();

async function doesNextJsHandleRoute(reqPath) {
  // Strip query parameters for the check, as Next.js route matching is path-based
  const pathOnly = reqPath.split('?')[0];

  if (routeCache.has(pathOnly)) {
    return routeCache.get(pathOnly);
  }

  try {
    // Perform a lightweight HEAD request to Next.js on port 3001.
    // This allows us to check if the route exists *before* piping the original request.
    // If it's a 404, Next.js doesn't have it.
    // If it's a 405 (Method Not Allowed for POST endpoints) or 200/301/308, Next.js has it.
    const res = await fetch(`http://127.0.0.1:3001${pathOnly}`, {
      method: "HEAD",
      redirect: "manual", // Do not follow redirects (a redirect means Next.js handles it!)
    });

    const exists = res.status !== 404;

    // Prevent memory leaks by capping the cache size
    if (routeCache.size > 10000) {
      routeCache.clear();
    }
    
    routeCache.set(pathOnly, exists);
    return exists;
  } catch (err) {
    // If Next.js is down or unresponsive, assume it handles the route.
    // This allows the proxy to return a 502 Bad Gateway instead of accidentally 
    // leaking internal traffic to the legacy server.
    console.error(`Error checking route ${pathOnly} in Next.js:`, err.message);
    return true;
  }
}

const server = express();

server.disable("x-powered-by");
server.set("trust proxy", 1);
server.use(morgan("combined"));
server.use(compression());

const nextTarget = "http://127.0.0.1:3001";
const legacyTarget = (process.env.LEGACY_URL || "https://legacy.elipsestudio.com").replace(/\/$/, '');

// Create the intelligent proxy middleware
const smartProxy = createProxyMiddleware({
  // Default target is Next.js
  target: nextTarget,
  
  // Dynamically determine the target BEFORE the request stream is consumed
  router: async function (req) {
    // Always route Next.js internal paths directly to Next.js
    if (req.url.startsWith("/_next") || req.url === "/favicon.ico") {
      return nextTarget;
    }

    // Check if the route exists in Next.js
    const existsInNextJs = await doesNextJsHandleRoute(req.url);

    if (!existsInNextJs) {
      console.log(`[PROXY] Routing to LEGACY: ${req.url}`);
      return legacyTarget;
    }

    // Default to Next.js
    return nextTarget;
  },

  // Ensure Host header is rewritten so Hostinger virtual hosts work correctly
  changeOrigin: true,

  // Powerful native rewrites that fix Hostinger's absolute redirects:
  // Automatically rewrite the Location header host to match the incoming request
  hostRewrite: true,
  // Automatically rewrite the Location header protocol/host based on the incoming request
  autoRewrite: true,
  // Force HTTPS in Location headers
  protocolRewrite: "https",
  
  // Prevent cookies set by Legacy from being rejected by the browser due to domain mismatch
  cookieDomainRewrite: {
    "*": "" // Removes domain from cookies so they default to the current domain (elipsestudio.com)
  },

  onError: (err, req, res) => {
    console.error("[PROXY ERROR]", err.message);
    if (!res.headersSent) {
      res.status(502).send("Bad Gateway");
    }
  },
});

// Route all requests through the proxy
server.all("*", smartProxy);

const port = parseInt(process.env.PORT || "3000", 10);
server.listen(port, "127.0.0.1", (err) => {
  if (err) throw err;
  console.log(`> Express Proxy listening on http://127.0.0.1:${port}`);
  console.log(`> Intelligent Routing enabled.`);
});

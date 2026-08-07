require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const compression = require("compression");
const { createProxyMiddleware } = require("http-proxy-middleware");

const routeCache = new Map();

async function doesNextJsHandleRoute(reqPath) {
  const pathOnly = reqPath.split('?')[0];

  if (routeCache.has(pathOnly)) {
    return routeCache.get(pathOnly);
  }

  try {
    const res = await fetch(`http://127.0.0.1:3001${pathOnly}`, {
      method: "HEAD",
      redirect: "manual", 
    });

    const exists = res.status !== 404;

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

const nextTarget = "http://127.0.0.1:3001";
const legacyTarget = (process.env.LEGACY_URL || "https://legacy.elipsestudio.com").replace(/\/$/, '');

const smartProxy = createProxyMiddleware({
  target: nextTarget,
  
  router: async function (req) {
    if (req.url.startsWith("/_next") || req.url === "/favicon.ico") {
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

  hostRewrite: true,
  autoRewrite: true,
  protocolRewrite: "https",

  cookieDomainRewrite: {
    "*": ""
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

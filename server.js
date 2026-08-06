require('dotenv').config();
const express = require('express');
const next = require('next');
const morgan = require('morgan');
const compression = require('compression');

const dev = process.env.NODE_ENV !== 'production';
const hostname = '127.0.0.1';
const port = parseInt(process.env.PORT || '3000', 10);

// Initialize Next.js programmatically
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.disable("x-powered-by");

  // 1. Trust proxy if sitting behind Caddy/Nginx
  server.set('trust proxy', 1);

  // 2. Logging and Compression
  server.use(morgan('combined'));
  server.use(compression());

  // 3. Prevent Absolute Redirect Escapes
  // If Hostinger issues a 301 redirect to an absolute URL (e.g., adding a trailing slash),
  // this middleware intercepts it and rewrites the domain back to elipsestudio.com.
  server.use((req, res, nextMiddleware) => {
    const originalSetHeader = res.setHeader;
    const originalWriteHead = res.writeHead;
    const legacyUrl = (process.env.LEGACY_URL || '').replace(/\/$/, '');

    const rewriteLocation = (value) => {
    if (typeof value !== "string") return value;

    try {
      const legacy = new URL(process.env.LEGACY_URL);
      const incomingHost = req.headers.host;
      const protocol = req.headers["x-forwarded-proto"] || "https";

      // Absolute redirect from Hostinger
      if (value.startsWith(legacy.origin)) {
        const url = new URL(value);
        return `${protocol}://${incomingHost}${url.pathname}${url.search}${url.hash}`;
      }

      // Relative redirect (e.g. /Steering_Configurator/)
      if (value.startsWith("/")) {
        return `${protocol}://${incomingHost}${value}`;
      }

      return value;
    } catch (err) {
      return value;
    }
  };

    res.setHeader = function (name, value) {
      if (name.toLowerCase() === 'location') {
        value = rewriteLocation(value);
      }
      return originalSetHeader.call(this, name, value);
    };

    res.writeHead = function (statusCode, statusMessage, headers) {
      let checkHeaders = headers;
      if (typeof statusMessage === 'object') {
        checkHeaders = statusMessage;
      }
      
      if (checkHeaders) {
        const locKey = Object.keys(checkHeaders).find((k) => k.toLowerCase() === 'location');
        if (locKey) {
          checkHeaders[locKey] = rewriteLocation(checkHeaders[locKey]);
        }
      }
      return originalWriteHead.apply(this, arguments);
    };

    nextMiddleware();
  });

  // 4. Custom Express Routes (Optional)
  server.get('/proxy-health', (req, res) => {
    res.status(200).send('Proxy Server is Running');
  });

  // 5. Let Next.js handle everything else
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, hostname, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://${hostname}:${port}`);
    console.log(`> Proxying 404s to ${process.env.LEGACY_URL}`);
  });
}).catch((err) => {
  console.error('Error starting server:', err);
  process.exit(1);
});

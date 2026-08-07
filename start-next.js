const { spawn } = require("child_process");
const path = require("path");

// Resolve the absolute path to Next.js CLI binary cleanly on Windows
const nextBin = path.resolve(__dirname, "node_modules", "next", "dist", "bin", "next");

console.log(`[START-NEXT] Starting Next.js production server on 127.0.0.1:3001...`);

const child = spawn(process.execPath, [nextBin, "start", "-p", "3001", "-H", "127.0.0.1"], {
  cwd: __dirname,
  stdio: "inherit",
  env: {
    ...process.env,
    NODE_ENV: "production",
    PORT: "3001",
    HOSTNAME: "127.0.0.1"
  }
});

child.on("error", (err) => {
  console.error("[START-NEXT ERROR] Failed to spawn Next.js process:", err);
  process.exit(1);
});

child.on("exit", (code, signal) => {
  if (code !== 0) {
    console.error(`[START-NEXT] Next.js process exited with code ${code} signal ${signal}`);
  }
  process.exit(code || 0);
});

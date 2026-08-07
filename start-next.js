const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs");

console.log("[START-NEXT] Locating Next.js binary...");

let nextBin;

// Try resolving via require.resolve first
try {
  nextBin = require.resolve("next/dist/bin/next");
} catch (e) {
  // Fallback paths
  const candidates = [
    path.resolve(__dirname, "node_modules", "next", "dist", "bin", "next"),
    path.resolve(__dirname, "node_modules", "next", "dist", "bin", "next.js"),
    path.resolve(__dirname, "node_modules", ".bin", "next.cmd")
  ];
  nextBin = candidates.find((p) => fs.existsSync(p)) || candidates[0];
}

console.log(`[START-NEXT] Found Next.js binary at: ${nextBin}`);
console.log(`[START-NEXT] Launching Next.js production server on 127.0.0.1:3001...`);

const isCmd = nextBin.endsWith(".cmd") || nextBin.endsWith(".bat");
const command = isCmd ? nextBin : process.execPath;
const args = isCmd
  ? ["start", "-p", "3001", "-H", "127.0.0.1"]
  : [nextBin, "start", "-p", "3001", "-H", "127.0.0.1"];

const child = spawn(command, args, {
  cwd: __dirname,
  stdio: "inherit",
  shell: isCmd,
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

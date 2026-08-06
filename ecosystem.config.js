module.exports = {
  apps: [
    {
      name: "next-app",
      script: "npm",
      args: "run start",
      instances: "max",
      exec_mode: "cluster",
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
        PORT: 3001
      }
    },
    {
      name: "express-proxy",
      script: "server.js",
      instances: 1, // Usually 1 instance is enough for a proxy, but could be "max"
      exec_mode: "fork",
      autorestart: true,
      watch: false,
      max_memory_restart: "500M",
      env: {
        NODE_ENV: "production",
        PORT: 3000
      }
    }
  ]
};

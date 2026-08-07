module.exports = {
  apps: [
    {
      name: "elipsestudio",
      cwd: "C:\\elipsestudio",
      script: "start-next.js",
      exec_mode: "fork",
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
        PORT: "3005",
        HOSTNAME: "127.0.0.1"
      }
    },
    {
      name: "express-proxy",
      cwd: "C:\\elipsestudio",
      script: "server.js",
      exec_mode: "fork",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "500M",
      env: {
        NODE_ENV: "production",
        PORT: "3000"
      }
    }
  ]
};

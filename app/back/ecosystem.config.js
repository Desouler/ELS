module.exports = {
  apps: [
    {
      name: "relay",
      script: "./dist/index.js",
      watch: ["dist", "templates"],
      watch_delay: 5000,
      ignore_watch: ["node_modules", "cert", "log", "Migrations", "public", "src"],
      log_date_format: "YYYY-MM-DD HH:mm Z",
      env: {
        NODE_ENV: "development",
        SERVER_PORT: 29688,
        ALLOWED_ORIGINS: "*",
        FRONT_URL: "",
      },
      env_production: {},
    },
  ],

  deploy: {
    production: {},
  },
};

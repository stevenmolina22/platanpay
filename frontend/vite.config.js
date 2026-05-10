import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 5173,
    proxy: {
      "/chat": "http://127.0.0.1:3000",
      "/health": "http://127.0.0.1:3000",
      "/sessions": "http://127.0.0.1:3000",
    },
  },
});

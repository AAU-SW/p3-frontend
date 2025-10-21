import { resolve } from "node:path";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tanstackRouter({ autoCodeSplitting: true }),
    viteReact(),
    tailwindcss(),
  ],
  base: "/p3-frontend/",
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8080",
      },
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
});

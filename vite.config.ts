import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

// Base path for GitHub Pages project site (https://<user>.github.io/ipatlas/).
// Overridable via VITE_BASE for a different repo name or custom domain.
export default defineConfig(({ command }) => ({
  base:
    command === "build" ? (process.env.VITE_BASE ?? "/ipatlas/") : "/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    target: "es2022",
    sourcemap: true,
    cssCodeSplit: true,
  },
  server: {
    port: 5173,
    strictPort: false,
  },
}));

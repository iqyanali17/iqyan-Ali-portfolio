import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  root: "./client",
  server: {
    allowedHosts: true,
    host: "0.0.0.0",
    port: 5000,
  },
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    target: "es2020",
    cssCodeSplit: true,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react": ["react", "react-dom", "wouter"],
          "vendor-motion": ["framer-motion"],
          "vendor-icons": ["lucide-react", "react-icons"],
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client/src"),
    },
  },
});

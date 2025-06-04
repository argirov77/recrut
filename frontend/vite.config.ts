import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  },
  server: {
    host: true,        // слушаем 0.0.0.0, а не только localhost
    port: 5173,
    watch: {
      usePolling: true // для корректной работы в Docker
    }
  }
});

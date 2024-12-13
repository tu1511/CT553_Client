import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
  },
  resolve: {
    alias: {
      "@assets": path.resolve(__dirname, "src/assets"),
      "@components": path.resolve(__dirname, "src/components"),
      "@layouts": path.resolve(__dirname, "src/layouts"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@routers": path.resolve(__dirname, "src/routers"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@services": path.resolve(__dirname, "src/services"),
      "@config": path.resolve(__dirname, "src/config"),
    },
  },
});

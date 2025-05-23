// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/Animate-Agent/", // ⚠️ 一定要有這行，否則部署路徑會錯
  plugins: [react()],
});

// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/Animate-Agent/", // ✅ 這裡一定要設
  plugins: [react()],
});

// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/Animate-Agent/", // ← 請改成你的 GitHub Repo 名稱
  plugins: [react()],
});

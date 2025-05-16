import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// defineConfig 接收一個函式，帶入 mode
export default defineConfig(({ mode }) => {
  return {
    base: mode === "production" ? "/Animate-Agent/" : "/",
    plugins: [react()],
  };
});

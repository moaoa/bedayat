import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  base: "/",
    resolve: {
      alias: {
        "@": "/src",
      },
    },
  server: {
    port: 4000,
    open: true,
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
    // sourcemap: true,
  },
});

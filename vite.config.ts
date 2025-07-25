import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: path.resolve(__dirname, "/src")
      },
      {
        find: "@entities",
        replacement: path.resolve(__dirname, "./src/entities")
      },
      {
        find: "@components",
        replacement: path.resolve(__dirname, "./src/components")
      },
      {
        find: "@assets",
        replacement: path.resolve(__dirname, "./src/assets")
      },
      {
        find: "@routes",
        replacement: path.resolve(__dirname, "./src/routes")
      },
      {
        find: "@screens",
        replacement: path.resolve(__dirname, "./src/screens")
      },
      {
        find: "@store",
        replacement: path.resolve(__dirname, "./src/store")
      },
      {
        find: "@theme",
        replacement: path.resolve(__dirname, "./src/theme")
      },
      {
        find: "@utils",
        replacement: path.resolve(__dirname, "./src/utils")
      },
      {
        find: "@hooks",
        replacement: path.resolve(__dirname, "./src/hooks")
      },
      {
        find: "@constants",
        replacement: path.resolve(__dirname, "./src/constants")
      },
      {
        find: "@theme",
        replacement: path.resolve(__dirname, "./src/theme")
      }
    ]
  }
});

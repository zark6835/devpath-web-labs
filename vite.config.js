import { defineConfig } from "vite";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));

// Multi-page build: HTML pages are generated from EJS (scripts/build-html.js).
const pages = ["index", "courses", "course", "enroll"];

export default defineConfig({
  base: "./", // relative URLs -> works on GitHub Pages sub-path
  server: { port: 5173, open: true },
  preview: { port: 4173 },
  root: ".",
  build: {
    outDir: "dist",
    sourcemap: true,
    assetsInlineLimit: 0, // keep every image as a separate file (srcset)
    rollupOptions: {
      input: Object.fromEntries(pages.map((name) => [name, resolve(root, `${name}.html`)]))
    }
  }
});

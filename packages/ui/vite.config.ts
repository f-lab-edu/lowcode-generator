import path from "node:path";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ["babel-plugin-react-compiler"],
      },
    }),
    tsconfigPaths(),
    vanillaExtractPlugin(),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "ui",
      formats: ["es", "cjs"],
      fileName: (format: string) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom"],
    },
  },
});

import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import path from "path";

export default defineConfig({
  plugins: [solid()],
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "./src/components"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@logic": path.resolve(__dirname, "./src/logic"),
      "@domain": path.resolve(__dirname, "./src/domain"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@infra": path.resolve(__dirname, "./src/infra"),
      "@context": path.resolve(__dirname, "./src/context"),
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

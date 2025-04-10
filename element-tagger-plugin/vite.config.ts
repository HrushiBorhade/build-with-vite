import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { componentTagger } from "./element-tagger-plugin";
import path from "path";
import Inspect from "vite-plugin-inspect";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), componentTagger(), Inspect()],
  resolve: {
    alias: {
      "@/": path.resolve(__dirname, "./src"),
    },
  },
});

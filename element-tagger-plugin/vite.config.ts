import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { componentTagger } from "./element-tagger-pluign";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), componentTagger()],
  resolve: {
    alias: {
      "@/": path.resolve(__dirname, "./src"),
    },
  },
});

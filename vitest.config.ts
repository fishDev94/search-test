import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config";

const vitestConfig = defineConfig({
  test: {
    environment: 'jsdom',
  },
});

export default mergeConfig(viteConfig, vitestConfig);

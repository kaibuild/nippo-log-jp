import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://nippo-log-jp.pages.dev",
  trailingSlash: "never",
  build: {
    format: "file"
  }
});

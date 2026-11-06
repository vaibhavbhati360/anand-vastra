import type { NextConfig } from "next";

// GitHub Pages serves the site from /<repo>/, so the deploy build sets
// NEXT_PUBLIC_BASE_PATH=/anand-vastra. Locally and on a custom domain it stays "".
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // Static site: `npm run build` writes plain HTML/CSS/JS to out/.
  output: "export",
  basePath,
  // Runtime image optimisation needs a server. Instead, scripts/prepare-images.mjs
  // pre-generates WebP sizes and lib/image-loader.ts picks the right one per srcset width.
  images: { loader: "custom", loaderFile: "./lib/image-loader.ts" },
  // cacheComponents / partialPrefetching removed: they enable PPR, which can't run in export mode.
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;

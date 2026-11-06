// Custom next/image loader for the static export.
// scripts/prepare-images.mjs pre-generates WebP files:
//   /images/products/<name>-480|720|960.webp   (shop photos, source ~900px wide)
//   /images/looks/<name>-480|720|960|1440.webp (model photos)
// This maps each srcset width to the closest pre-made file, so phones download
// small images and big screens get sharp ones.

type LoaderArgs = { src: string; width: number; quality?: number };

// next/image does not add basePath to custom-loader URLs, so add it here
// (set to /anand-vastra for GitHub Pages, empty otherwise).
const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const product = /^\/images\/products\/([a-z0-9-]+)\.jpg$/;
const look = /^\/images\/looks\/([a-z0-9-]+)\.jpg$/;

export default function imageLoader({ src, width }: LoaderArgs): string {
  const p = product.exec(src);
  if (p) {
    const size = width <= 480 ? 480 : width <= 750 ? 720 : 960;
    return `${base}/images/products/${p[1]}-${size}.webp`;
  }
  const l = look.exec(src);
  if (l) {
    const size = width <= 480 ? 480 : width <= 750 ? 720 : width <= 1080 ? 960 : 1440;
    return `${base}/images/looks/${l[1]}-${size}.webp`;
  }
  if (src === "/images/logo.png") {
    return width <= 128 ? `${base}/images/logo-128.webp` : `${base}/images/logo-256.webp`;
  }
  return `${base}${src}`;
}

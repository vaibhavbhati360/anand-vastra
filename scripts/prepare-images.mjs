// Turn the owner's original photos into web-ready images.
// Originals in assets/source-photos/ are never modified.
// Run: npm run images
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const SRC = "assets/source-photos";
const OUT = "public/images/products";
const W = 960; // master size; cards are 3:4 portrait
const H = 1280;
const WEBP_WIDTHS = [480, 720, 960]; // must match lib/image-loader.ts

// crop: fractions of the source { left, top, width }; height follows from 3:4.
// Each box was checked by eye to exclude supplier tags, brand boxes, story
// overlays, hands, sleeves and feet. See docs/architecture.md §7.
// Not used: 1.jpg (logo, handled below), 2.jpg (jackets look like pasted
// catalogue images; owner to confirm), 3.jpg (another brand's model photos).
const jobs = [
  { src: "10.jpg", out: "bottle-green-zari", crop: { left: 0.08, top: 0.38, width: 0.86 } },
  { src: "14.jpg", out: "teal-ombre-silver", crop: { left: 0.12, top: 0.33, width: 0.78 } },
  { src: "17.jpg", out: "peach-sequin", crop: { left: 0.2, top: 0.34, width: 0.58 } },
  { src: "16.jpg", out: "powder-blue-floral", crop: { left: 0.24, top: 0.34, width: 0.6 } },
  { src: "8.jpg", out: "wine-silver-motif", crop: { left: 0.18, top: 0.3, width: 0.78 } },
  { src: "15.jpg", out: "taupe-floral-border", crop: { left: 0.24, top: 0.3, width: 0.7 } },
  { src: "5.jpg", out: "mustard-ombre", crop: { left: 0.14, top: 0.33, width: 0.78 } },
  { src: "18.jpg", out: "amber-paisley", crop: { left: 0.2, top: 0.33, width: 0.56 } },
  { src: "6.jpg", out: "sage-paisley-print", crop: { left: 0.12, top: 0.15, width: 0.8 } },
  { src: "9.jpg", out: "magenta-patola", crop: { left: 0.2, top: 0.15, width: 0.72 } },
  { src: "7.jpg", out: "sunset-tie-dye", crop: { left: 0.24, top: 0.12, width: 0.68 } },
  { src: "13.jpg", out: "sage-mirror", crop: { left: 0.28, top: 0.3, width: 0.62 } },
  { src: "4.jpg", out: "cotton-linen", crop: { left: 0.1, top: 0.07, width: 0.85 } },
  { src: "20.jpg", out: "patchwork-mirror", crop: { left: 0.14, top: 0.2, width: 0.82 } },
  { src: "21.jpg", out: "ivory-leaf-stripe", crop: { left: 0.24, top: 0.1, width: 0.6 } },
  { src: "22.jpg", out: "coral-leaf-stripe", crop: { left: 0.24, top: 0.1, width: 0.7 } },
  { src: "11.jpg", out: "mint-silver", crop: { left: 0.1, top: 0.3, width: 0.82 } },
  { src: "12.jpg", out: "mauve-chevron", crop: { left: 0.25, top: 0.3, width: 0.68 } },
  { src: "19.jpg", out: "pearl-grey-silver", crop: { left: 0.24, top: 0.3, width: 0.7 } },
];

// Model photos (Pexels, see assets/stock-photos/CREDITS.md). Illustrative only.
// Cropped to 3:4 with sharp's "attention" focus (keeps the person in frame).
const STOCK_SRC = "assets/stock-photos";
const LOOKS_OUT = "public/images/looks";
const LOOK_WIDTHS = [480, 720, 960, 1440]; // must match lib/image-loader.ts
const stockJobs = [
  // Hero is the LCP image: its busy carpet background compresses poorly, so it gets lower quality.
  { src: "pexels-sherwani-11748430.jpg", out: "hero-ivory-sherwani", position: "north", quality: 60 },
  { src: "pexels-suit-5724384.jpg", out: "suit-powder-jodhpuri", position: "attention" },
  { src: "pexels-suit-30324865.jpg", out: "suit-navy-three-piece", position: "attention" },
  { src: "pexels-suit-30324873.jpg", out: "suit-grey-classic", position: "attention" },
  { src: "pexels-suit-14564871.jpg", out: "suit-black-blazer", position: "attention" },
  { src: "pexels-kurta-13222257.jpg", out: "kurta-koti", position: "north" },
  { src: "pexels-kurta-8621669.jpg", out: "kurta-brown", position: "attention" },
  { src: "pexels-suit-5883958.jpg", out: "wedding-black-jodhpuri", position: "north" },
  { src: "pexels-suit-7897576.jpg", out: "wedding-blue-turban", position: "north" },
  { src: "pexels-shirt-7732146.jpg", out: "wedding-ivory-jodhpuri", position: "north" },
  { src: "pexels-shirt-17866100.jpg", out: "pantshirt-black", position: "north" },
  { src: "pexels-shirt-18178836.jpg", out: "pantshirt-white", position: "attention" },
  { src: "pexels-shirt-27046025.jpg", out: "pantshirt-polo", position: "north" },
];

const kb = (bytes) => `${Math.round(bytes / 1024)} KB`;

async function stockJob({ src, out, position, quality }) {
  const file = path.join(STOCK_SRC, src);
  const { width: sw, height: sh } = await sharp(file).metadata();
  // Largest 3:4 box that fits inside the source (never enlarge the crop itself).
  const boxW = sw / sh > 3 / 4 ? Math.round((sh * 3) / 4) : sw;
  const boxH = Math.round((boxW * 4) / 3);
  const master = await sharp(file)
    .resize(boxW, boxH, { fit: "cover", position: position === "attention" ? sharp.strategy.attention : position })
    .png()
    .toBuffer();
  await sharp(master).resize(960).jpeg({ quality: 82, mozjpeg: true }).toFile(path.join(LOOKS_OUT, `${out}.jpg`));
  const sizes = [];
  for (const w of LOOK_WIDTHS) {
    const info = await sharp(master)
      .resize(w)
      .webp({ quality: quality ?? (w >= 1440 ? 70 : 78) })
      .toFile(path.join(LOOKS_OUT, `${out}-${w}.webp`));
    sizes.push(`${w}w ${kb(info.size)}`);
  }
  console.log(`${src} -> looks/${out} (${boxW}x${boxH}) | ${sizes.join(", ")}`);
}

async function cropJob({ src, out, crop }) {
  const file = path.join(SRC, src);
  const { width: sw, height: sh } = await sharp(file).metadata();
  const width = Math.round(crop.width * sw);
  let height = Math.round((width * H) / W);
  const left = Math.round(crop.left * sw);
  let top = Math.round(crop.top * sh);
  if (top + height > sh) top = Math.max(0, sh - height);
  if (top + height > sh) height = sh - top;
  if (left + width > sw) throw new Error(`${src}: crop exceeds width`);

  const master = await sharp(file)
    .extract({ left, top, width, height })
    .resize(W, H, { fit: "cover" })
    // Gentle clean-up of phone photos: a touch brighter, richer colour, crisper thread work.
    .modulate({ brightness: 1.03, saturation: 1.06 })
    .sharpen({ sigma: 0.6 })
    .png() // lossless master so each output is compressed only once
    .toBuffer();

  // JPEG master (used for the share image and as a fallback source).
  const jpgPath = path.join(OUT, `${out}.jpg`);
  let jpg = await sharp(master).jpeg({ quality: 80, mozjpeg: true }).toFile(jpgPath);
  if (jpg.size > 250 * 1024) jpg = await sharp(master).jpeg({ quality: 70, mozjpeg: true }).toFile(jpgPath);

  const sizes = [];
  for (const w of WEBP_WIDTHS) {
    const dest = path.join(OUT, `${out}-${w}.webp`);
    const encode = (quality) => sharp(master).resize(w).webp({ quality }).toFile(dest);
    let info = await encode(78);
    if (info.size > 200 * 1024) info = await encode(68); // keep busy prints light
    sizes.push(`${w}w ${kb(info.size)}`);
  }
  console.log(`${src} -> ${out}  jpg ${kb(jpg.size)} | webp ${sizes.join(", ")}`);
}

async function logo() {
  // The logo circle sits centred in a 739x1600 phone screenshot.
  const file = path.join(SRC, "1.jpg");
  const meta = await sharp(file).metadata();
  const scale = meta.width / 739;
  const cx = 369 * scale;
  const cy = 711 * scale;
  const r = 240 * scale; // slightly inside the edge to drop the blurred rim
  const size = Math.round(r * 2);
  const square = await sharp(file)
    .extract({ left: Math.round(cx - r), top: Math.round(cy - r), width: size, height: size })
    .resize(512, 512)
    .toBuffer();
  const mask = Buffer.from(`<svg width="512" height="512"><circle cx="256" cy="256" r="256" fill="#fff"/></svg>`);
  const masked = await sharp(square).composite([{ input: mask, blend: "dest-in" }]).png().toBuffer();
  await sharp(masked).png({ compressionLevel: 9, palette: true }).toFile("public/images/logo.png");
  await sharp(masked).resize(128).webp({ quality: 85 }).toFile("public/images/logo-128.webp");
  await sharp(masked).resize(256).webp({ quality: 85 }).toFile("public/images/logo-256.webp");
  await sharp(masked).resize(96).png({ compressionLevel: 9, palette: true }).toFile("app/icon.png");
  await sharp(masked).resize(180).png({ compressionLevel: 9, palette: true }).toFile("app/apple-icon.png");
  console.log("logo -> logo.png, logo-128.webp, logo-256.webp, app/icon.png, app/apple-icon.png");
  return masked;
}

async function ogImage(logoPng) {
  // 1200x630 share image: ivory panel with logo + tagline, fabric photo on the right.
  const photo = await sharp(path.join(LOOKS_OUT, "hero-ivory-sherwani.jpg"))
    .resize(480, 630, { fit: "cover", position: "north" })
    .toBuffer();
  const logoSmall = await sharp(logoPng).resize(200).toBuffer();
  const text = Buffer.from(`
    <svg width="720" height="630" xmlns="http://www.w3.org/2000/svg">
      <rect width="720" height="630" fill="#FAF5EB"/>
      <rect x="24" y="24" width="672" height="582" fill="none" stroke="#B08B4F" stroke-width="1.5"/>
      <text x="360" y="380" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="54" fill="#241612">Where Quality</text>
      <text x="360" y="446" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="54" fill="#241612">Meets <tspan font-style="italic" fill="#5E1A2A">Style</tspan></text>
      <line x1="300" y1="486" x2="420" y2="486" stroke="#B08B4F" stroke-width="1.5"/>
      <text x="360" y="530" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="20" letter-spacing="6" fill="#6F5429">PREMIUM SUITING &amp; SHIRTING</text>
    </svg>`);
  await sharp({ create: { width: 1200, height: 630, channels: 3, background: "#FAF5EB" } })
    .composite([
      { input: text, left: 0, top: 0 },
      { input: logoSmall, left: 260, top: 90 },
      { input: photo, left: 720, top: 0 },
    ])
    .jpeg({ quality: 85, mozjpeg: true })
    .toFile("public/images/og.jpg");
  console.log("og -> public/images/og.jpg");
}

await mkdir(OUT, { recursive: true });
await mkdir(LOOKS_OUT, { recursive: true });
const only = process.argv[2]; // "looks" to regenerate just the model photos
for (const job of stockJobs) await stockJob(job);
if (only !== "looks") {
  const logoPng = await logo();
  for (const job of jobs) await cropJob(job);
  await ogImage(logoPng); // uses the hero look, so runs after stockJobs
}

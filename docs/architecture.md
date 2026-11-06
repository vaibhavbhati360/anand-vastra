# Architecture: Anand Vastra Bhandar Website

## 1. Stack

| Layer | Choice | Decided by |
|---|---|---|
| Framework | Next.js 16.4.5 (App Router), React 19.3, TypeScript | Owner (Next.js) |
| Styling | Tailwind CSS v4 (Turbopack CSS loader, no PostCSS config) | Claude |
| Fonts | `next/font/google`: Cormorant Garamond, Cinzel, Lato | Claude |
| Output | Static export (`output: "export"`) → `out/` | Claude |
| Images | Pre-generated WebP sizes + custom `next/image` loader | Claude |
| Hosting | Vercel free plan (Cloudflare Pages fallback) | Claude |
| Data | TypeScript files in `data/`, no database | Claude |
| Contact | `tel:` and `https://wa.me/` links, no backend | Claude |

Never build with `--webpack`: CSS goes through the Turbopack rule in `next.config.ts`.

## 2. Why static

No buying, no login, no forms that need a server. A static export loads fastest on phones, costs nothing to host, and can't break because a server is down.

## 3. Folder structure

```
anand_vastra/
├── app/
│   ├── layout.tsx          # fonts, metadata, Open Graph, JSON-LD (gated)
│   ├── page.tsx            # the one page: section order lives here
│   ├── globals.css         # Tailwind + @theme tokens + motifs
│   ├── icon.png            # favicon (generated from the logo)
│   └── apple-icon.png
├── components/
│   ├── Header.tsx, MobileMenu.tsx (client), nav.ts
│   ├── Hero.tsx            # split screen, model photo (preload)
│   ├── Collections.tsx     # Collections (4 tiles) + Pillars (I · II · III)
│   ├── SuitsSection.tsx    # editorial layout, model photos
│   ├── KurtasSection.tsx + KurtaGallery.tsx (client: View all + <dialog> viewer)
│   ├── WeddingSection.tsx  # maroon-950 band, model photos
│   ├── PantShirtSection.tsx
│   ├── LookFigure.tsx      # model photo + caption
│   ├── VisitShowroom.tsx
│   ├── Footer.tsx          # includes the Pexels credit
│   ├── WhatsAppFloat.tsx
│   ├── styles.ts           # shared button / label class strings
│   └── icons.tsx
├── data/
│   ├── site.ts             # name, copy, phone, WhatsApp, address, hours, flags
│   ├── products.ts         # the shop's 19 kurta photos
│   └── looks.ts            # model photos (Pexels, illustrative)
├── lib/
│   └── image-loader.ts     # maps srcset widths to pre-made WebP files
├── public/images/
│   ├── logo.png, logo-128.webp, logo-256.webp
│   ├── og.jpg              # 1200×630 share image
│   ├── products/           # shop photos: <name>.jpg + <name>-480/720/960.webp
│   └── looks/              # model photos: <name>.jpg + <name>-480/720/960/1440.webp
├── scripts/
│   └── prepare-images.mjs  # crops + resizes originals (npm run images)
├── assets/source-photos/   # owner's originals, never deployed or edited
├── assets/stock-photos/    # Pexels originals + CREDITS.md (licence and page URLs)
└── docs/
```

## 4. Config

`next.config.ts`:

```ts
output: "export",
images: { loader: "custom", loaderFile: "./lib/image-loader.ts" },
turbopack: { rules: { "*.css": { loaders: ["@tailwindcss/turbopack"], as: "*.css" } } },
```

- The scaffold's `cacheComponents` and `partialPrefetching` flags were **removed together**. `cacheComponents` turns on PPR, and the build fails with "PPR cannot be enabled in export mode". `partialPrefetching` can't be set without it.
- `npm start` runs `npx serve@latest out`, because `next start` doesn't work with a static export.
- Hero image uses `preload` (`priority` is deprecated in 16.4).

## 5. Data model

See `data/site.ts` and `data/products.ts`. Key points:
- `site.launchReady` (false) gates the JSON-LD. Flip it only when phone, address and hours are real.
- `site.url` (empty) is the live domain for share previews. Fallback order: `site.url` → `https://$VERCEL_PROJECT_PRODUCTION_URL` → `http://localhost:3000`.
- `site.mapsUrl` empty → the Directions button is hidden.
- `products` have `category`: `suits | kurtas | fabrics | wedding | sherwani | pant-shirt`. Sections filter by category. Each photo appears once on the page; the hero photo lives in `site.hero`.

## 6. Contact links

| Action | Link |
|---|---|
| Call | `tel:${site.phone}` |
| WhatsApp | `whatsappLink(message?)` → `https://wa.me/<digits>?text=<encoded>` |
| WhatsApp about a product | `productWhatsappLink(name)` → "I'm interested in: <name>. Is it available?" |
| Instagram | `site.instagram`, new tab, `rel="noopener noreferrer"` |
| Directions | `site.mapsUrl` (button hidden while empty) |

## 7. Images

Pipeline (`npm run images`):
1. Crop each original with a hand-checked box (fractions of the source) to 3:4.
2. Write a lossless master, then `<name>.jpg` (q80, ≤250 KB) and `<name>-480/720/960.webp` (q78; q68 if over 200 KB).
3. Cut the logo circle from `1.jpg` → `logo.png`, `logo-128/256.webp`, `app/icon.png`, `app/apple-icon.png`.
4. Compose `og.jpg` (logo, tagline, hero photo).

5. Model photos (`assets/stock-photos/`): largest 3:4 box, cropped with sharp's attention/north focus → `public/images/looks/<name>.jpg` + `-480/720/960/1440.webp`. The hero uses quality 60 (it's the LCP image and its busy background compresses poorly). Shop photos also get a gentle brightness/saturation/sharpen pass. `npm run images looks` regenerates only the model photos.

`lib/image-loader.ts` maps each srcset width:
- products: ≤480 → `-480`, ≤750 → `-720`, else `-960`
- looks: ≤480 → `-480`, ≤750 → `-720`, ≤1080 → `-960`, else `-1440`

Components keep using `/images/products/<name>.jpg` or `/images/looks/<name>.jpg` as `src`.

### Source photo map

| File | What it shows | Status |
|---|---|---|
| `1.jpg` | Logo on a blurred Instagram profile screen | Logo + favicons |
| `2.jpg` | Story: hunting koti + 2 hunting blazers over fabric rolls, text overlay | **Held back**: jackets look like pasted catalogue images, and the crop is low-res. Owner to confirm. |
| `3.jpg` | Story: "Wedding Collection" with model photos | **Not used**: likely another brand's photos |
| `4.jpg` | Story: cotton-linen rolls, "Cotton Linen Fabric" overlay | Fabrics → `cotton-linen` (overlay cropped out) |
| `5.jpg` | Mustard ombré, white embroidered border; hand bottom-left | Suits → `mustard-ombre` (hand cropped) |
| `6.jpg` | Sage paisley print with sequins | Kurtas → `sage-paisley-print` |
| `7.jpg` | Orange-teal tie-dye, Greek-key embroidery | Kurtas → `sunset-tie-dye` |
| `8.jpg` | Wine/plum with silver motifs | Suits → `wine-silver-motif` |
| `9.jpg` | Magenta patola print | Kurtas → `magenta-patola` |
| `10.jpg` | Bottle-green ombré, gold zari bird and lotus; **"Mafatlal" box top-left** | **Hero** → `bottle-green-zari` (box cropped out) |
| `11.jpg` | Mint with silver motifs | Fabrics → `mint-silver` |
| `12.jpg` | Mauve with silver chevrons | Fabrics → `mauve-chevron` |
| `13.jpg` | Sage green with mirror motifs | Kurtas → `sage-mirror` |
| `14.jpg` | Ivory-to-teal ombré, silver border; rainbow selvedge at the bottom | Suits → `teal-ombre-silver` (selvedge cropped) |
| `15.jpg` | Taupe, silver-gold floral border; **blue tag and sleeve on the left** | Wedding → `taupe-floral-border` (tag and sleeve cropped) |
| `16.jpg` | Powder blue, pastel floral border | Suits → `powder-blue-floral` |
| `17.jpg` | Peach-pink, gold sequin border | Suits → `peach-sequin` |
| `18.jpg` | Amber ombré, white paisley | Suits → `amber-paisley` |
| `19.jpg` | Pearl grey, silver border; **"Mitva Loyal" tag** | Fabrics → `pearl-grey-silver` (tag cropped) |
| `20.jpg` | Patchwork squares with mirror work | Fabrics feature tile → `patchwork-mirror` |
| `21.jpg` | Ivory leaf-stripe print | Fabrics → `ivory-leaf-stripe` |
| `22.jpg` | Coral leaf-stripe print; **supplier tag and shoes at the bottom** | Fabrics → `coral-leaf-stripe` (cropped) |

> **Photo map update (2026-11-06):** the owner says all their photos are kurtas, so every processed shop photo above now appears in the Kurtas gallery (`data/products.ts`), including the former hero (`10.jpg`) and wedding (`15.jpg`) photos. The hero and the Suits, Wedding and Pant-Shirt sections use model photos from `data/looks.ts`.

## 8. SEO and sharing

- `metadata` in `app/layout.tsx`: title, description, Open Graph and Twitter card with `/images/og.jpg`, `metadataBase` from §5.
- JSON-LD `ClothingStore` renders **only when `site.launchReady` is true**, so fake details never reach Google. `<` is escaped.
- `lang="en"`, `themeColor` maroon-800.

## 9. Verification (run before saying "done")

1. `npm run lint`: no errors.
2. `npm run build`: succeeds, writes `out/`.
3. `npm start`, then check at 390px and 1440px: no horizontal scroll, all images load.
4. Click-test: menu, fabric viewer (open, arrows, Esc, backdrop, focus return), all links.
5. Lighthouse (mobile): ≥ 90 in all four categories.

## 10. Deploy

1. Push to a **private** GitHub repo.
2. Import into Vercel (it detects Next.js; output is `out/`).
3. Add the custom domain, then set `NEXT_PUBLIC_SITE_URL`.

Fallback: `npm run build`, then upload `out/` to Cloudflare Pages.

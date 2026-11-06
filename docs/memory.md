# Memory

Long-lived context and decisions. Read this at the start of every work session. Add to it whenever a decision is made.

## The shop

- **Name:** Anand Vastra Bhandar
- **Sells:** suits and kurtas (top sellers), exclusive fabrics, wedding kotis / hunting koti / hunting blazer, sherwanis and pant-shirts (lower priority).
- **Instagram:** @anand.vastra.bhandar (their main channel today; most photos came from there).
- **Logo:** black circle, champagne-gold "AV" monogram, "ANAND / VASTRA BHANDAR" in Roman capitals.
- **Copy the owner gave:** "Where Quality Meets Style", "Premium Suiting & Shirting", "Exclusive Fabrics", "Visit Our Showroom".

## Decisions

| Date | Decision | Made by |
|---|---|---|
| 2026-11-06 | Showcase site only, **no online buying** | Owner |
| 2026-11-06 | Suits and kurtas come first; sherwanis are **not** the top seller | Owner |
| 2026-11-06 | Theme: **Ivory Heritage** (cream, maroon, gold, serif) | Owner (picked from 3 options) |
| 2026-11-06 | Framework: **Next.js** | Owner (overrode Claude's Astro suggestion) |
| 2026-11-06 | Use a placeholder phone number for now | Owner |
| 2026-11-06 | Tailwind CSS v4, static export, Vercel hosting | Claude |
| 2026-11-06 | English only for v1 | Claude (owner never answered the language question) |
| 2026-11-06 | Products stored in `data/products.ts`, no database | Claude |
| 2026-11-06 | Don't use `3.jpg` (likely another brand's model photos); crop supplier tags from others | Claude |
| 2026-11-06 | Fonts: Cormorant Garamond, Cinzel, Lato | Claude |
| 2026-11-06 | "Very very premium", at least 3 shades per colour; use Opus to recheck plans; use the UI/UX plugin | Owner |
| 2026-11-06 | Keep Ivory Heritage instead of the UI/UX plugin's "Liquid Glass" suggestion (it carries performance and contrast warnings) | Claude |
| 2026-11-06 | Removed `cacheComponents` + `partialPrefetching` (break static export) | Claude (found in build, confirmed by Opus review) |
| 2026-11-06 | Hold back `2.jpg` (jackets look like pasted catalogue images) | Claude (Opus review) |
| 2026-11-06 | No scrolling marquee (WCAG 2.2.2); WhatsApp button uses `#128C7E` for contrast | Claude (Opus review) |
| 2026-11-06 | Suits = editorial split, Kurtas = swipe row, Fabrics = feature gallery with viewer | Claude |
| 2026-11-06 | Images: pre-generated WebP + custom loader instead of `unoptimized` | Claude |
| 2026-11-06 | JSON-LD only when `site.launchReady` is true | Claude |
| 2026-11-06 | **All the shop's own photos are kurtas.** Suits and pant-shirt get model images. v1 "looks very cheap"; the client is unhappy | Owner |
| 2026-11-06 | Model photos from Pexels only (free licence, credited), never random web images; treated as illustrative | Claude |
| 2026-11-06 | v2 design: photo-led luxury layout (centred logo, split hero, collection tiles, editorial sections, one CTA per section) | Claude |
| 2026-11-06 | Suits read as **men's** suits (owner asked for model photos for suits) | Claude (to confirm) |
| 2026-11-06 | Visible sample address/hours instead of the word "PLACEHOLDER" on the page (still marked in code) | Claude |

## Unanswered questions

See [prd.md](prd.md) §10. The most important one:
- **Ladies' suits or men's suits?** The embroidered pieces with borders look like ladies' unstitched suit material, but "Premium Suiting & Shirting" sounds like menswear. The shop may sell both. Confirm before writing section copy.

## Environment notes

- Windows 11, PowerShell is the main shell. Node v24.11.1, npm 11.6.2.
- Project root: `D:\anand_vastra`. Not a git repo yet.
- Next 16.4.5 / React 19.3 / Tailwind 4. Static export; `npm start` serves `out/`.
- Original photos: `assets/source-photos/1.jpg` … `22.jpg`. Never modify these. Regenerate web images with `npm run images`.
- Headless Chrome on desktop has a ~500px minimum window width, so `--window-size=390` screenshots are wrong. Use DevTools-protocol mobile emulation (`Emulation.setDeviceMetricsOverride`) for phone screenshots.
- The owner wants short, action-first answers.

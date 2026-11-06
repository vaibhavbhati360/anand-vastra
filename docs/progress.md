# Progress

Update this after every task: newest entry at the top.

## Current status

- **Phase:** 4 done. Waiting on the owner (Task 0, 15b, 16).
- **Next task:** Task 0, owner answers. Then Task 3 (git, with permission).
- **Blocked:** final copy and launch need the owner's real details.
- **Tasks done:** 13 / 19 (1, 2, 4–15)

## Placeholders still in use

Search `PLACEHOLDER` to find them all.

| What | Placeholder | Where |
|---|---|---|
| Phone | `+91 00000 00000` | `data/site.ts` |
| WhatsApp | `910000000000` | `data/site.ts` |
| Address | sample "Main Market Road / Your City, State" | `data/site.ts` |
| Google Maps link | empty (Directions button hidden) | `data/site.ts` |
| Opening hours | sample "10:30 AM – 9:00 PM" / "11:00 AM – 7:00 PM" | `data/site.ts` |
| Model photos | 13 Pexels stock photos (illustrative) | `data/looks.ts`, `assets/stock-photos/` |
| Live domain | empty | `data/site.ts` (`url`) / `NEXT_PUBLIC_SITE_URL` |
| Product names | descriptive guesses | `data/products.ts`, `site.hero.label` |
| Hunting koti note | held back with the photo | `data/products.ts` comment |

## Log

### 2026-11-06: v2 redesign after owner feedback ("looks very cheap")

- **Owner direction:**
  - All of the shop's photos are kurtas.
  - Use model photos for Suits and Pant-Shirt.
  - Make it look premium.
- **Photos:**
  - All 19 shop photos are now in the Kurtas gallery (8 shown, "View all 19 designs", tap to enlarge).
  - 13 model photos from **Pexels** (free commercial licence) for the hero, Collections, Suits, Kurtas intro, Wedding & Sherwani and Pant-Shirt. They are logged in `assets/stock-photos/CREDITS.md` and credited in the footer.
  - Unsplash blocked automated access. Openverse's CC0 results were mostly museum photos, so they weren't used.
- **Redesign:**
  - centred-logo header
  - split-screen model hero
  - edge-to-edge collection tiles
  - editorial Suits layout
  - dark Wedding band
  - Pillars row
  - calmer Visit section
  - one call to action per section instead of a WhatsApp link under every card
- **Visible placeholders:** no longer show the word "PLACEHOLDER" on the page. They show sample values, which are still marked `PLACEHOLDER` in code.
- **Verification:**
  - Lint is clean and the build passes.
  - 390px and 1440px screenshots from a real-sized scrolling viewport were checked by eye.
  - No horizontal overflow after fixing caption labels on phones.
  - 24/24 click tests pass, including "View all".
  - Lighthouse mobile across two runs:
    - Performance 86–90 (down from 100; the full-bleed model hero is the LCP image at 3.7–4.2s on simulated slow 4G)
    - Accessibility 100, Best Practices 100, SEO 100

### 2026-11-06: Site built and verified

- Ran the **UI/UX Pro Max** design-system search. Kept the owner's Ivory Heritage theme over its "Liquid Glass" suggestion, which carries performance and contrast warnings. Used its luxury serif pairing guidance, contrast rules and "no cheap fast motion" rule.
- Ran an **Opus review** of the plans. It found 7 must-fix issues, all fixed:
  - `cacheComponents`/`partialPrefetching` break static export
  - `next start` doesn't work with export
  - default favicon left in place
  - `metadataBase` pointed at localhost
  - missed brand marks in photos (Mafatlal box, tags, sleeve, shoes; jackets in `2.jpg` look pasted)
  - placeholders that looked real
  - JSON-LD contradiction
- Applied its premium and speed suggestions too:
  - full colour scales
  - framed-swatch cards
  - Suits as an editorial split, Kurtas as a swipe row
  - maroon-950 footer
  - marquee dropped (WCAG 2.2.2)
  - darker WhatsApp green (contrast)
  - WebP sizes through a custom loader
- Built every section. Image pipeline is `npm run images`.
- **Verification:**
  - `npm run lint`: clean.
  - `npm run build`: passes, static `out/`.
  - 390px (true mobile emulation) and 1440px screenshots checked by eye: no horizontal scroll, all images load.
  - 22/22 automated click tests pass: menu, fabric viewer (open, arrows, Esc, backdrop, focus return, scroll lock), all links, alt text, one h1, 44px tap targets, no console errors.
  - Lighthouse mobile: Performance 100, Accessibility 100, Best Practices 100, SEO 100 (LCP 1.0s, CLS 0). Measured on a local server, so real hosting will be a little slower.
- Fixed along the way:
  - two crops still showed story text
  - the wedding frame wrapped its caption
  - a glow band on the wedding section
  - the ribbon wrapped on phones
  - a 34px-wide footer link

### 2026-11-06: Planning done

- Discussed the site with the owner. The owner chose Ivory Heritage and Next.js.
- Wrote all docs. Copied the 22 photos into `assets/source-photos/`.
- `create-next-app` was interrupted; finished in Task 1.

# Tasks

Do these in order. Each task has a clear "done when". Tick the box and update [progress.md](progress.md) after each one. Verification steps: [architecture.md](architecture.md) §9.

## Phase 0: Owner answers (blocks final copy, not the build)

- [ ] **0. Get answers to [prd.md](prd.md) §10**
  - Most important: are "suits" ladies' salwar suits, men's suits, or both?
  - Also: are the hunting koti/blazer photos (`2.jpg`) the shop's own garments? What does "Sweat And Sweat Velvet" mean (suede?)?
  - **Done when:** answers are recorded in [memory.md](memory.md) and the affected copy is updated.

## Phase 1: Setup ✅

- [x] **1. Finish the scaffold**: `npm install`, starter SVGs and the default favicon removed.
- [x] **2. Configure static export**: `output: "export"`; `cacheComponents` and `partialPrefetching` removed together (they enable PPR, which breaks export). `npm start` serves `out/`.
- [ ] **3. Initialise git**: ask the owner first. **Done when:** `git log` shows one commit.

## Phase 2: Foundations ✅

- [x] **4. Prepare images**: `scripts/prepare-images.mjs` (`npm run images`). Logo circle, favicons, 19 product photos (JPEG + 480/720/960 WebP), `og.jpg`. Tags, brand boxes, overlays, hands and feet cropped out and checked on a contact sheet. `2.jpg` and `3.jpg` held back.
- [x] **5. Theme and fonts**: full token scales in `globals.css` (ivory ×6, maroon ×11, gold ×9, ink ×5), Tailwind defaults off, Cormorant Garamond / Cinzel / Lato.
- [x] **6. Data files**: `data/site.ts`, `data/products.ts` (6 suits, 4 kurtas, 7 fabrics, 1 wedding). Every unconfirmed value is marked `PLACEHOLDER`.

## Phase 3: Sections ✅

- [x] **7. Header + mobile menu + floating WhatsApp button**
- [x] **8. Hero** (arch photo, `preload`)
- [x] **9. SectionHeading + ProductCard + ProductSection** (Suits = editorial split, Kurtas = swipe row)
- [x] **10. Exclusive Fabrics gallery + `<dialog>` viewer**
- [x] **11. Wedding Collection** (maroon-900 band)
- [x] **12. Sherwani & Pant-Shirt** (text panels until photos exist)
- [x] **13. Visit Our Showroom + Footer**

## Phase 4: Polish

- [x] **14. SEO**: metadata, Open Graph image, favicons; JSON-LD built but gated behind `site.launchReady`.
- [x] **15. Responsive and accessibility pass**: 390px and 1440px screenshots checked by eye; no horizontal scroll; 22/22 click tests pass; Lighthouse mobile 100 / 100 / 100 / 100.
- [ ] **15b. Owner review**: the owner looks at the site on their own phone. **Done when:** their changes are listed in [progress.md](progress.md) and made.

## Phase 5: Launch (needs the owner)

- [ ] **16. Replace placeholders**
  - Search the project for `PLACEHOLDER`. Get the real values from the owner ([prd.md](prd.md) §10).
  - Set `site.launchReady = true` once phone, address and hours are real.
  - **Done when:** the search returns nothing in `data/`, `app/` or `components/`.

- [ ] **17. Deploy**
  - Push to a **private** GitHub repo, import into Vercel, add the domain, set `NEXT_PUBLIC_SITE_URL`. Ask the owner before each step.
  - **Done when:** the live URL loads on a phone, and sharing it in WhatsApp shows the title, description and image.

## Later (when the owner sends photos)

- [ ] Clean photos of finished suits, kurtas, sherwanis, pant-shirts and the showroom → add crop jobs, run `npm run images`, add products. Switch the Sherwani & Pant-Shirt panels to `ProductSection`.
- [ ] Hindi version (owner to decide).

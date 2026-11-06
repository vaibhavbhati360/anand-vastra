# Rules: How to Build This Site

Rules for anyone (human or AI agent) working on this project. Read this before writing code.

## Scope

1. **No online buying.** No cart, checkout, payments, login, accounts, admin panel or database. If a task seems to need one, stop and ask.
2. **One page.** Everything lives on `app/page.tsx` with section anchors. Don't add routes without asking.
3. **Static only.** The site must build with `output: "export"`. No API routes, server actions or runtime server code.

## Content

4. **All shop details live in `data/site.ts`.** All products live in `data/products.ts`. Never hard-code a phone number, address or product inside a component.
5. **Placeholders are obvious.** Every unconfirmed value has the word `PLACEHOLDER` in the value itself or in a comment on the same line, and is listed in `docs/progress.md`, so one search finds them all before launch. Placeholder phone numbers use zeros (`+91 00000 00000`), never a dialable-looking number.
6. **Never use another brand's photos.** Check every shop photo for supplier tags, brand boxes (e.g. "Mafatlal", "Mitva Loyal"), pasted-in catalogue images, people, hands and feet, and crop them out or skip the photo. Do not use `3.jpg` (model photos) or `2.jpg` (jackets look like catalogue images) until the owner confirms. Crop boxes live in `scripts/prepare-images.mjs`.
6b. **Model photos come only from free-licence stock (Pexels).** Never take images from random websites. Record every one in `assets/stock-photos/CREDITS.md` with its page URL. They are illustrative: never label a stock photo as a specific shop product, and keep the "Model photography: Pexels" credit in the footer.
7. **No screenshot overlays.** Crop out Instagram "Add comment…" bars and text overlays, or don't use the photo.
8. **Page order is fixed:** Hero → Collections → Suits → Kurtas → Wedding & Sherwani → Pant-Shirt → Pillars → Visit. Suits and kurtas are the top sellers. **All of the owner's own photos are kurtas** (owner, 2026-11-06).

## Design

9. Follow [design.md](design.md). Use the colour tokens, not raw hex values in components.
10. **Mobile first.** Build and check at 375px width before desktop.
11. `gold-500` and lighter are never text on light backgrounds. Gold text on ivory uses `gold-700`/`gold-800`.
12. Every image has a meaningful `alt`. Every button and link has an accessible name.
13. Tap targets are at least 44×44px.

## Code

14. TypeScript strict. No `any`.
15. Server Components by default. Add `"use client"` only where needed (mobile menu, lightbox).
16. **Ask before adding a dependency.** Inline SVG icons, no icon library. No animation library.
17. Use `next/image` with `width`/`height` or `fill` + `sizes`. Never add photos by hand: run `npm run images` so the WebP sizes the loader expects exist (see [architecture.md](architecture.md) §7).
18. Keep components small and focused. Reuse `ProductSection` for every product category.
19. Run `npm run lint` and `npm run build` before marking a task done.

## Process

20. Work from [task.md](task.md), one task at a time, in order.
21. After each task, update [progress.md](progress.md): what was done, what's next, anything blocked.
22. Record any new decision (and who made it) in [memory.md](memory.md).
23. **Don't commit, push or deploy without asking the owner.**
24. Original photos in `assets/source-photos/` are never edited or deleted. Write processed copies to `public/images/`.
25. If something in these docs is wrong or blocks you, say so and ask. Don't silently work around it.

## Quality

26. **No mistakes allowed, no matter what.** Correctness comes before speed, every time. In practice:
    - **Never guess.** If a fact is unknown (phone, address, product name, how an API works), check it or ask. Don't make it up.
    - **Verify before saying "done".** Run `npm run lint` and `npm run build`, open the page at 375px and 1280px, and click every button and link you touched. A task with an unchecked step is not done.
    - **Re-read your own change** before finishing: spelling of the shop name, phone numbers, links, alt text, and the section order.
    - **Report honestly.** If something fails or was skipped, say so with the error. Never hide a problem to look finished.
    - **Fix the cause, not the symptom.** Don't silence errors, disable lint rules or use `// @ts-ignore` to make a check pass.
    - **When unsure, stop and ask** instead of pushing ahead.

# Design: Ivory Heritage Theme

The owner chose **Ivory Heritage**: cream background, deep maroon and gold accents, serif headings. It should feel traditional, warm and premium, like a well-kept showroom, not a discount store.

**Proportion rule:** about 85% ivory and ink, maroon only for bands, buttons and the footer, and gold for hairlines and small labels. Restraint is what makes it read as premium.

## 1. Colour tokens

Defined in `app/globals.css` under `@theme`. Tailwind's default palette is switched off (`--color-*: initial`), so only these exist. Ratios are against `ivory-100` unless noted; ✓ = passes WCAG AA 4.5:1 for body text.

| Scale | Shades | Use |
|---|---|---|
| **ivory** | 50 `#FDFBF6` · 100 `#FAF5EB` · 200 `#F3EADA` · 300 `#E8DAC1` · 400 `#D9C6A5` · 500 `#BFA983` | 50 cards and mats · 100 page · 200 alternate sections · 300–500 borders and decoration only |
| **maroon** | 50 `#FBF3F4` · 100 `#F5E3E6` · 200 `#E9C3C9` · 300 `#D4A0A8` · 400 `#A3475A` · 500 `#8A2C3F` · 600 `#742235` · 700 `#5E1A2A` · 800 `#4A1420` · 900 `#320C15` · 950 `#22070E` | 700 is the brand colour (11.7 ✓): buttons, accent words · 600 hover and focus ring (9.6 ✓) · 900 wedding band and showroom panel · 950 ribbon and footer (closest to the logo's black) |
| **gold** | 50 `#FCF8EF` · 100 `#F5EBD6` · 200 `#EBD9B4` · 300 `#DCC08D` · 400 `#C9A464` · 500 `#B08B4F` · 600 `#8F6E3A` · 700 `#6F5429` · 800 `#53401F` | 700 eyebrow labels on light backgrounds (6.5 ✓) · 500 hairlines and diamonds only (2.9 ✗) · 200–300 text and buttons on maroon (10+ ✓) |
| **ink** | 900 `#241612` · 700 `#4A3A30` · 600 `#5A483D` · 500 `#6E5A4E` · 400 `#8C7A6D` | 900 headings and body (16.1 ✓) · 500 secondary text (6.0 ✓) · 400 large text only (3.8) |
| **whatsapp** | `#128C7E` · dark `#075E54` | Floating button only. The bright brand green (`#25D366`) fails contrast with a white icon (1.98:1). |

Contrast rules:
- **gold-500 and lighter are never text on light backgrounds.** Gold text on ivory uses gold-700 or gold-800.
- On maroon-800/900/950: use ivory-100/200 or gold-200/300 for text.

## 2. Typography

| Role | Font | Notes |
|---|---|---|
| Display / headings | **Cormorant Garamond** (400–700, italic) | One italic accent word per heading at most, in maroon-700 |
| Labels / wordmark | **Cinzel** (400–600) | Uppercase, wide tracking (0.2–0.3em), like "VASTRA BHANDAR" in the logo |
| Body / UI | **Lato** (400, 700) | Clear at small sizes on phones |

Loaded with `next/font/google` (self-hosted at build time, no layout shift).

Scale:
- Hero title: `clamp(2.75rem, 7vw, 5.5rem)`, Cormorant 500
- Section heading: 40px → 56px
- Card title: 22px → 24px (Cormorant's small letters read too small below 22px)
- Body: 16px, line-height 1.65; intros 18px
- Labels: 11–12px Cinzel, uppercase, tracking 0.22–0.3em

## 3. Motifs

- **Gold divider** under section headings: hairline, small diamond, hairline (`——◆——`).
- **Numbered eyebrows**: "01 — Top sellers" above each heading, an editorial touch.
- **Jharokha arch**: hero and wedding photos have a rounded palace-window top, with an offset gold outline around the photo only.
- **Framed swatches**: product photos sit in an ivory-50 mat with a 1px ivory-300 border that turns gold on hover. This hides the bedsheet backgrounds in the owner's photos.
- **Paper grain**: a faint (5%) noise texture on ivory-200 sections.
- **Diamond lattice**: a very faint diagonal grid on maroon bands.
- 2px corner radius everywhere (tailored, not bubbly). Shadows are rare and soft.

## 4. Page layout (top to bottom)

> **v2 (2026-11-06), after owner feedback that v1 "looks cheap":** the page is now photo-led, like a luxury fashion house. The table below is the current layout; the v1 motifs in §3 (arch frames, numbered eyebrows, diamond dividers, lattice) were removed.

| Section | Background | Layout |
|---|---|---|
| Ribbon | maroon-950 | One line of tracked caps |
| Header | ivory-100/95 | **Centred logo + wordmark**, nav split left (Suits, Kurtas, Wedding) and right (Pant-Shirt, Visit Us), round call button. Phones: menu left, logo centre, call right. |
| Hero | ivory-100 | **Split screen**: big serif headline left, full-bleed model photo right (photo first on phones, 52svh) |
| Collections | ivory-100 | Heading, then **4 edge-to-edge model tiles** (Suits, Kurtas, Wedding & Sherwani, Pant-Shirt) with 1px gaps |
| Suits | ivory-200 | Editorial: tall feature photo left, headline + copy + "Enquire" link right, two supporting photos below |
| Kurtas | ivory-100 | Model photo + copy, then a **gallery of the shop's 19 kurta photos** in ivory mats (8 shown, "View all 19 designs"), tap to enlarge |
| Wedding & Sherwani | maroon-950 | Copy + offer list + gold button left; two staggered model photos right |
| Pant-Shirt | ivory-100 | Copy left, two model photos right |
| Pillars | ivory-100 | Three promises (I · II · III) with hairline dividers |
| Visit | ivory-200 + grain | Centred heading, three-column details with hairlines, Call + WhatsApp buttons |
| Footer | maroon-950 | Centred logo + wordmark + tagline, nav row, contact row, Pexels credit |

Premium rules for v2: one CTA per section (no repeated "Ask on WhatsApp" under every card), regular-weight Cormorant headlines with one italic accent word, uppercase tracked Lato for buttons and labels, generous vertical space (96–128px per section).

### v1 layout (superseded)

Mobile first. Max content width 1280px (`max-w-7xl`), side padding 20px on phones and 32px on desktop. Section rhythm: 80px vertical padding on phones, 112px on desktop.

| # | Section | Background | Layout |
|---|---|---|---|
| — | **Ribbon** | maroon-950 | "Exclusive Fabrics ◆ Premium Suiting & Shirting"; phones show the second half only, on one line |
| — | **Header** (sticky, blurred ivory) | ivory-100/80 | Logo + "Anand / Vastra Bhandar" wordmark · desktop nav · Call button (icon-only on phones) · hamburger on phones and tablets |
| — | **Hero** | ivory-200 + grain | Text left, arch photo right (stacked on phones). Buttons: Visit Our Showroom (solid) and WhatsApp Us (outline). Three promise lines below. |
| 01 | **Suits** | ivory-100 | **Editorial split**: heading, intro and a "full range in store" link on the left (sticky on desktop), 3-column grid of 6 framed cards on the right; 2 columns on phones |
| 02 | **Kurtas** | ivory-200 + grain | **Swipe row** on phones and tablets (snap scrolling, "Swipe to see more" hint); 4-column grid on desktop |
| 03 | **Exclusive Fabrics** | ivory-100 | **Gallery**: one large 2×2 feature tile, then a grid; a "Many more fabrics, all colours available" panel fills the last row. Tap any tile to open the viewer. |
| 04 | **Wedding Collection** | maroon-900 + lattice | Text and list left, arch photo right. The one dark band. |
| 05 | **Sherwani & Pant-Shirt** | ivory-200 + grain | Two text panels with an "AV" watermark (no photos yet) |
| 06 | **Visit Our Showroom** | ivory-100 | Details card (address, hours, phone, Instagram) beside a maroon-900 action panel (Call, WhatsApp, Directions when a maps link exists) |
| — | **Footer** | maroon-950 | Logo, tagline, nav, contact |
| — | **Floating WhatsApp** | whatsapp | Phones and tablets only, bottom-right, respects the iPhone safe area |

No scrolling marquee: motion lasting over 5 seconds needs a pause control (WCAG 2.2.2).

## 5. Interaction

- Buttons and links: at least 44×44px, visible focus ring (maroon-600 on light, gold-300 on dark).
- Hover (desktop): photos scale to 1.04 over 700ms with a soft ease; mats and frames turn gold; nav gets a gold underline.
- Sections fade up gently on scroll (CSS scroll-driven animation). Content is fully visible where that isn't supported.
- `prefers-reduced-motion`: no scroll reveal, no smooth scroll, no transitions.
- Fabric viewer: native `<dialog>`. Esc, a backdrop tap or the close button closes it; arrow keys and the ‹ › buttons move between fabrics; focus returns to the tapped photo; page scroll is locked while open.

## 6. Icons

Inline SVGs in `components/icons.tsx` (phone, WhatsApp, Instagram, map pin, clock, menu, close, arrow, diamond). No icon library.

## 7. Copy tone

Short, warm, confident. No exclamation marks, no "Best quality at lowest price!!" style. Never claim facts the owner hasn't given (years in business, awards, customer counts).

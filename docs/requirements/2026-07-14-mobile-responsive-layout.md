# Update: mobile-friendly, responsive landing page

Created: 2026-07-14

## Change

The landing page (`src/app/page.jsx`) used fixed, desktop-sized inline padding
(`8rem 6rem`, `10rem 6rem`, etc.) on every section. `globals.css` already
collapsed the two-column grids to a single column at 768px, but nothing
shrank the surrounding padding, so on phones the content sat inside huge
margins with very little usable width, and the nav's brand text could push
the "Join Waitlist" button off-screen.

Added responsive className hooks on the heavily-padded elements so
`globals.css` can override their inline padding/gap with `!important` at two
breakpoints:

- `nav-inner`, `nav-brand`, `nav-cta` — sticky nav; brand text now truncates
  with an ellipsis (`overflow: hidden`, `textOverflow: ellipsis`,
  `minWidth: 0` on the flex item) instead of wrapping/pushing the CTA off
  the visible area.
- `hero-left` — hero copy/form column.
- `section-pad` — applied to the five heavily-padded content sections
  (Experience, Host/Harshika, Menu, FAQ, Contact).
- `final-cta-pad`, `footer-pad` — final CTA section and footer.
- `experience-card` — the two experience step cards (padding only).
- `faq-answer` — FAQ answer paragraph (drops the desktop-only right padding
  that was reserved for the toggle icon).

`globals.css` gained two new `@media` blocks:

- `max-width: 768px` — shrinks nav/section/hero/footer padding, tightens
  grid gaps, removes the FAQ answer's right padding.
- `max-width: 480px` — further tightens nav and section padding, and shrinks
  the nav brand/CTA font size for small phones.

The existing `.hero-grid`, `.experience-grid`, `.dish-grid`, `.contact-grid`,
`.harshika-grid` single-column overrides at 768px were left in place.

Also added `data-testid` attributes to every form input on the page (hero
and final-CTA waitlist email/submit, contact name/email/message) per the
FrontEnd testid convention in `CLAUDE.md`. `WaitlistForm` takes a new
`testId` prop since it's rendered twice on the same page and each instance
needs unique testids.

## How to apply

Section-level padding changes go through the `section-pad` (or
`hero-left` / `final-cta-pad` / `footer-pad`) className + the `globals.css`
media queries, not by editing the inline `style` padding values directly —
the inline styles are the desktop values; the mobile values live in CSS so
they can use `!important` to win over inline styles without needing a
CSS-in-JS/media-query library.

## Verification

- `tests/app/page.responsive.test.js` (new) asserts the className hooks
  exist on the correct elements in `page.jsx`.
- `tests/app/globals.responsive.test.js` (new) asserts the 768px/480px
  media blocks exist and target the right selectors.
- `npx vitest run` — all suites pass.
- `npx eslint src/app/page.jsx` and `npx prettier --check` — clean.
- Manually verified with Playwright screenshots at 375px and 360px viewport
  widths (dev server, full page + per-viewport scroll captures): no
  horizontal overflow, nav brand truncates correctly, all sections/forms
  stack to a single readable column.

## Change history

### 2026-07-14 — bug fix: Harshika portrait overlapped the bio text on mobile

The "Meet Harshika" portrait card had a scroll-linked parallax
(`transform: translateY(scrollY * 0.05)`) driven by the page's global
`window.scrollY`, not the section's own scroll position. By the time this
section scrolled into view, `scrollY` was already large (it's several
sections down the page), so on the single-column mobile layout the card was
already shifted down over the "Meet Harshika" heading and bio on first
paint — CSS Grid doesn't reflow around `transform`, so the shifted card just
painted over the row below it.

Fix: removed the `transform`/`transition` pair from the portrait card
(`src/app/page.jsx`, host/harshika section) so it no longer moves.

Checked the only other scroll-parallax instance on the page — the hero
glass card (`transform: translateY(scrollY * 0.15)`). Left it as-is: the
hero `<section>` has `overflow: hidden` and the card is the last element in
its column, so the shift is clipped by the section boundary and has nothing
below it to paint over. It doesn't reproduce this bug.

Verification: Playwright screenshots at 375px width, scrolled to the
Harshika section and further, confirm the card no longer overlaps the
heading/bio at any scroll position. `tests/app/page.responsive.test.js` gained
an assertion that the portrait's inline style no longer references
`scrollY`. Full `npx vitest run` / `eslint` / `prettier --check` all pass.

### 2026-07-15 — bug fix: hero slideshow photos cropped on mobile

The hero glass card is a fixed `aspectRatio: "3/4"` box using
`objectFit: "cover"` for every `hero.images` slide. Several of the source
photos are much taller/narrower or more square than that 3:4 box (e.g.
`slide-image.jpg` is 3844×6000 ≈ 0.64, `slide-image-2.jpg` is 554×554 = 1.0),
so `cover` crops a meaningful chunk off the top/bottom or sides to fill the
box. That crop is proportionally identical on desktop and mobile (same
aspect-ratio box, same `object-fit`), but the smaller absolute size on
mobile — plus the card only using 75% of the screen width — made the crop
read as a much tighter, less "properly visible" close-up on phones.

Fix, mobile-only:

- Added `className="hero-visual-card"` to the glass card and
  `className="hero-visual-image"` to each hero `<Image>`
  (`src/app/page.jsx`).
- Added a `@media (max-width: 768px)` override in `globals.css`:
  `.hero-visual-image { object-fit: contain !important; }` so the full
  photo is always visible (letterboxed against the card's existing
  background/gradient when a photo's aspect ratio doesn't match, edge-to-edge
  when it does), plus `.hero-visual-card { width: 92% !important; }` so the
  card uses more of the screen instead of leaving large empty margins.

Desktop is untouched: the inline `objectFit: "cover"` / `width: "75%"`
styles are only overridden inside the 768px media block, and both
selectors are absent from the stylesheet outside of it.

Also identified (but did not change, pending user decision) that several
source photos in `public/images/` are unoptimized multi-megapixel camera
originals (1–2MB each, up to 3844×6000px) — `slide-image.jpg`,
`slide-image-1.jpg`, `slide-image-3.jpg`, `slide-image-4.jpg`,
`dhal-curry.jpg`, `kokiss-yellow.png`, `pol-sambol.png`. On slower mobile
connections these can be slow enough to load that a hero slide or dish photo
appears blank while scrolling past it. Resizing/recompressing these is a
follow-up, separate from this layout fix.

Verification: Playwright screenshots at 390px width across multiple hero
slides (portrait, near-square, and card-matching aspect ratios) confirm the
full photo now renders with no cropping, and a 1440px desktop screenshot
confirms the crop there is pixel-identical to before. `tests/app/hero-visual-image.test.js`
and `tests/app/globals.responsive.test.js` gained assertions for the new
className hooks and the mobile-only `object-fit: contain` / widened-card
override. Full `npx vitest run` / `eslint` pass.

#### Follow-up same day — the glass card's scroll parallax was shifting/clipping the image on mobile

The glass card also carries a scroll-linked parallax:
`transform: translateY(${scrollY * 0.15}px)`, driven by the page's global
`window.scrollY`. This was previously reviewed for the "portrait overlapped
bio text" bug above and judged safe because the hero `<section>` has
`overflow: hidden` and the card is the last element in its column. That
reasoning covered _overlapping content below_, but not the card shifting
downward far enough, while still inside its own section, to visually read as
the photo "sinking" — the user's own description of the symptom once the
cropping fix above was in place.

Fix: `.hero-visual-card { transform: none !important; }` inside the same
`@media (max-width: 768px)` block, forcing the card static on mobile.
Desktop keeps the parallax untouched — `transform` is only overridden inside
the mobile media block.

Verification: Playwright — scrolled a 390px-wide page to several scroll
offsets and read `getComputedStyle(.hero-visual-card).transform`; it stays
`none` at every offset. Re-checked a 1440px desktop page with real
mouse-wheel scrolling: `transform` changes from the identity matrix to
`matrix(1,0,0,1,0,45)` at `scrollY: 300`, confirming the parallax still
works there. `tests/app/globals.responsive.test.js` gained an assertion for
`.hero-visual-card { transform: none !important }` inside the 768px block.

#### Follow-up same day — reverted `object-fit: contain` back to `cover` on mobile

After seeing the `contain` fix in place, the letterboxing it introduces
(empty card background showing above/below or beside a photo whose aspect
ratio doesn't match the 3:4 box) was explicitly rejected — the ask was for
the image to fill the card edge-to-edge with no visible gap, even if that
means cropping.

Fix: `.hero-visual-image` mobile override changed from
`object-fit: contain !important` back to `object-fit: cover !important`
(functionally the same as the desktop default, made explicit for the mobile
block). The `width: 92% !important` and `transform: none !important` on
`.hero-visual-card` from the two fixes above are unaffected and still apply,
so the mobile card is wider than the original 75% and no longer moves on
scroll — only the letterboxing was reverted.

Verification: Playwright screenshot at 390px width on a near-square hero
slide confirms the photo now fills the card with no cream-colored gap on any
edge. `tests/app/globals.responsive.test.js` updated to assert
`object-fit: cover !important` (previously `contain`) inside the 768px
block. Full `npx vitest run` passes except the pre-existing, unrelated
`page.responsive.test.js` failure (see note below).

**Note:** `tests/app/page.responsive.test.js` currently fails
independently of every fix in this document — it expects 5
`className="section-pad"` sections but only 4 are present in `page.jsx`.
This is caused by an in-progress, uncommitted removal of the CONTACT section
that predates this session's changes, not by any edit described here.

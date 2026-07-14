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

# Menu dish photos

Created: 2026-07-15

## Change

Replaced the "What We Make" menu tiles' emoji placeholder + "Add image ↑"
badge with the real dish photos from `public/images/`.

- `config.js` — each `menu.dishes[]` entry gets an `image` field:
  - Kottu Roti → `/images/kottu-roti.png`
  - Pol Sambol → `/images/pol-sambol.png`
  - Dhal Curry → `/images/dhal-curry.jpg`
  - TunaPaha Spice Blend → `/images/thuna-paha.jpeg`
- `src/app/page.jsx` — the dish tile's image slot now renders a `next/image`
  `<Image fill>` sourced from `dish.image` (with a
  `data-testid="dish-image-{idx}"` hook) when the field is present, covering
  the tile at `objectFit: cover`. The emoji + "Add image ↑" badge is kept as
  a fallback path for any future dish entry added without a photo.

Three more dishes were added to `menu.dishes[]` with photos too (picked up
automatically by the existing `menu.dishes.map()` render loop, no `page.jsx`
change needed): Kokiss (`/images/kokiss-yellow.png`), String Hoppers
(`/images/string-hoppers.jpeg`), Pol Rotti (`/images/rotti.png`).

### Host portrait image (Cook section)

The "Meet Harshika" / Cook section's portrait block previously showed a
decorative circle + `ChefHat` icon plus the `host.portraitPlaceholder` caption
("Harshika portrait coming soon"). `host.image` (`/images/meet-harshika.jpeg`)
now renders there via `next/image` `<Image fill>`
(`data-testid="host-portrait-image"`), covering the existing
`overflow: hidden` frame at `objectFit: cover`. The decorative
circle/`ChefHat`/caption fallback is kept for when `host.image` is unset.

An initial version of this change wired `host.image` into the _hero_ glass
card instead — that was wrong (the hero panel is decorative/generic, not
specifically Harshika), so it was reverted: the hero card went back to
`ChefHat` + `hero.visualCaption` unconditionally, unrelated to `host.image`.

### Hero visual slideshow

The hero glass card (right panel, previously captioned "Hands preparing
hoppers over a clay stove. The real thing.") now gets its own
`hero.images` field — an **array** of paths, currently six
`/images/slide-image[-N].jpg` files — rendered as a smooth crossfading
slideshow rather than a single static photo. `hero.visualCaption` was
cleared to `""` since the photos now carry the section on their own; the
caption support stays additive (renders as an overlay when non-empty), it
just has nothing to show currently.

- `src/app/page.jsx` — new `heroImageIndex` state, advanced by a
  `setInterval` (4s) `useEffect` that's a no-op when `hero.images.length < 2`
  (guards the single-image and no-image cases — no interval churn, no
  division-by-zero-style modulo issues). All `hero.images` entries render
  simultaneously as stacked `next/image` `<Image fill>` elements
  (`data-testid="hero-visual-image-{i}"`, `priority` on index 0 only); each
  image's `opacity` is `1` when its index matches `heroImageIndex` else `0`,
  with `transition: "opacity 1.5s ease-in-out"` producing the crossfade. The
  glass card's existing `overflow: hidden` clips them to its rounded corners.
  Falls back to the `ChefHat` icon when `hero.images` is empty/unset.
- Verified the crossfade in a real browser (Playwright): with two images
  seeded, `hero-visual-image-0`/`-1` opacities move from `1`/`0` at t=0s to
  roughly `0.6`/`0.4` mid-transition at t≈4.5s, confirming the interval and
  CSS transition both fire correctly — not just that the JSX compiles.
- The glass card's `rgba(255,255,255,0.15)` translucent fill +
  `backdropFilter: blur(20px)` (originally there to give the empty/`ChefHat`
  placeholder state some texture) was bleeding a white/blurred tint through
  during crossfades and around the card edges once real photos were seeded.
  Both are now conditional on `hero.images.length > 0` — `undefined`
  (dropped) once photos are showing, kept only for the icon fallback state.
- The right panel's own `linear-gradient(160deg, ${brand.accentColor} ...)`
  amber fill (the "Right: amber visual panel" wrapper, one level up from the
  glass card) was also removed — with real photos in place, the amber wash
  around the card read as visual noise. The panel now shares the hero-left
  column's flat `background: "#FFF9F0"` instead of going transparent, so the
  two hero columns read as one continuous surface.

### Final CTA background

The Final CTA section ("Ready to cook together?") used
`radial-gradient(circle at 50% 50%, #D4A574 0%, #2D5016 100%)` — the `#2D5016`
deep curry-leaf green end stop read as too green against the rest of the
warm-amber page. Swapped it for a reddish terracotta, `#8B2E1A`, keeping the
same `#D4A574` warm-tan start stop and radial shape. Scoped to this one
section's background only — the many other `#2D5016` usages sitewide (nav
badge, buttons, decorative gradients elsewhere) were left as-is since only
this section was flagged.

## How to apply

- New dishes need an `image` path under `public/images/` referenced from
  `config.js`; the tile automatically switches from the emoji placeholder to
  the photo once that field is set.
- The Cook section's portrait follows `host.image` the same way — swap that
  config value to change Harshika's photo. Do not wire `host.image` into the
  hero visual panel; that section is intentionally generic/decorative and
  has its own `hero.images` field.
- The hero glass card slideshow follows `hero.images` — add/remove paths in
  that array to change which photos cycle (1 entry = static, no interval;
  2+ = crossfade every 4s). Its caption (`hero.visualCaption`) always renders
  on top when non-empty, so keep captions short enough to read as an overlay.

## Verification

- `npx eslint src/app/page.jsx config.js` — clean.
- `npx vitest run tests/app/menu-dish-images.test.js tests/app/host-portrait-image.test.js tests/app/hero-visual-image.test.js tests/app/final-cta-background.test.js`
  — passes: asserts every dish's `image` path, `host.image`, and every
  `hero.images` entry each resolve to a file under `public/images/`; that
  `page.jsx` renders them via `next/image` with the `dish-image-{idx}` /
  `host-portrait-image` / `hero-visual-image-{i}` testids and the crossfade
  opacity/transition/interval wiring; that the hero visual panel does not
  reference `host.image`; that the right hero panel matches the left
  column's flat background instead of the amber gradient; and that the Final
  CTA section no longer references `#2D5016`.
- Manual check with `npm run dev` + headless-browser screenshots: all menu
  tiles and the Cook section portrait show their photo; the hero glass card
  cycles through `hero.images` with a visible crossfade against a flat,
  matching two-column background; the Final CTA section reads as amber →
  reddish-terracotta with no green.

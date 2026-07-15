# Hero background blend

Created: 2026-07-15

## Change

Follow-up to the "Right panel amber wash removed" change in
[2026-07-15-menu-dish-photos.md](./2026-07-15-menu-dish-photos.md#hero-visual-slideshow).
That change gave the hero-left column and the right visual panel the same
flat `background: "#FFF9F0"` so the two columns would "read as one
continuous surface" — but the right panel still layers its own
`radial-gradient` mesh (amber/burnt-orange blobs) on top of that flat color,
so in practice the page still showed a plain cream block on the left butting
straight up against a warm-amber-tinted block on the right, with a hard
seam down the 50% grid line. Reported from a screenshot of the live hero
section: "blend the bg color to the hero section rather than showing it as
a separate colors."

- `src/app/page.jsx` — the flat per-column `background: "#FFF9F0"` was
  removed from both the `hero-left` div and the right visual panel div.
  The `<section className="hero-grid">` wrapper (which paints behind both
  columns as a single canvas regardless of the grid split) now carries
  `background: "linear-gradient(120deg, #FFF9F0 0% 42%, #FFF3DC 60%, #FFE9C2 78%, #FFDFA8 100%)"`,
  giving one continuous cream → amber gradient across the whole section.
  The right panel's decorative radial-gradient mesh opacity was lowered
  slightly (0.25/0.3 → 0.18/0.22) so it reads as texture on top of the
  gradient rather than reintroducing a visibly distinct patch.
- Verified with Playwright screenshots at desktop (1440×900) and mobile
  (390×844) viewports — no hard vertical seam at the column boundary on
  desktop; on mobile (`hero-grid` collapses to `1fr`, columns stack) the
  gradient still reads as a smooth wash per stacked row rather than a block
  color change.

## How to apply

- If the hero's amber/cream tones change again, update the single
  `linear-gradient` stop list on `hero-grid` rather than reintroducing a
  per-column flat `background` — a per-column flat color is what caused
  this bug the first time.

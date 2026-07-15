# Hero CTA subline — dynamic month/year

Created: 2026-07-15

## Change

The hero CTA subline ("First experiences in Lisbon • July 2026") hard-coded
a specific month and year in `config.js`, which would silently go stale as
time passes.

- `config.js` — `hero.ctaSubline` is now just the static text, "First
  experiences in Lisbon" (no date).
- `src/app/page.jsx` — added `getCurrentMonthYear()`, a small runtime helper
  alongside the existing `getCurrentYear()` (used in the footer copyright),
  returning `new Date().toLocaleDateString("en-US", { month: "long", year:
"numeric" })`. The subline now renders as
  `{hero.ctaSubline} • {getCurrentMonthYear()}`, so the month/year always
  reflects the current date at render time instead of a value baked into
  config.

## How to apply

- Do not hard-code a month/year into `config.js` string content going
  forward — compute it at render time the same way the footer copyright
  year does.

## Verification

- `npx eslint src/app/page.jsx config.js` — clean.
- `npx vitest run tests/app/hero-cta-subline.test.js` — passes: asserts
  `hero.ctaSubline` contains no month name or four-digit year, and that
  `page.jsx` derives the date via `getCurrentMonthYear()` at the usage site.

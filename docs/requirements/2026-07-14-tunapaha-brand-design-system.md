# TunaPaha Brand & Design Guide v1.0 — global design system + landing page rebrand

Created: 2026-07-14

## Change

Replaced the landing page's ad hoc amber/green palette (Lora/Outfit fonts,
per-node inline `style={{...}}` objects, a parallel unused set of shared
components) with a token-driven implementation of the pasted TunaPaha Brand &
Design Guide v1.0, applied as the app's global design system rather than a
one-off page reskin.

### Token layer

- `src/app/globals.css` — `:root` now holds the guide's tokens as CSS custom
  properties: colors (`--color-clay[-deep|-tint]`, `--color-azulejo[-deep|
-tint]`, `--color-turmeric`, `--color-curry-leaf`, `--color-coconut[-shade]`,
  `--color-charcoal[-60]`, `--color-hairline`), radius (`--r-sm/-md/-lg`),
  shadows (`--sh-1`, `--sh-2`). Removed the old decorative keyframes (`float`,
  `float-rotate`, `fade-in`, `slide-in-left`, `bounce-in`, `pulse-glow`,
  `gradient-shift`, `mesh-move`) and the `.hero-grid`/`.section-pad`/etc.
  `!important` media-query override layer — see "Responsiveness" below. Added
  one motion utility, `.hover-lift`, gated behind
  `@media (prefers-reduced-motion: no-preference)` per the guide's Motion
  section.
- `tailwind.config.js` — `theme.extend` wires `colors` / `fontFamily` /
  `borderRadius` / `boxShadow` to those CSS vars, so every component pulls
  from one source of truth via ordinary Tailwind utility classes
  (`bg-clay`, `text-charcoal-60`, `rounded-lg`, `shadow-1`, `font-display`,
  etc.). Tailwind's default spacing scale was left as-is — it already matches
  the guide's `4·8·12·16·24·32·48·64·96` scale.
- `src/app/layout.jsx` — swapped `Lora`/`Outfit` for `Fraunces` (display,
  500/600, italic), `Public_Sans` (body, 300–800), `IBM_Plex_Mono` (data/
  eyebrow, 400/500/600) via `next/font/google`.
- `vitest.config.js` — added a `resolve.alias` for `@` → `./src`, matching
  `jsconfig.json`. This was previously only understood by Next.js's own
  compiler; it's needed now that component tests import files (`EmailForm`,
  `page.jsx`) that use `@/...` imports internally.

### New/restyled shared components

- `src/components/Button.jsx` (new) — the guide's three pill-button variants
  (`primary`/`secondary`/`text`). Replaces six separate hand-rolled button
  styles that were previously duplicated across the nav CTA, both waitlist
  forms, the contact "Send Message" button, and the cookie-consent "Accept"
  button.
- `src/components/ExperienceCard.jsx` (new) — the guide's signature card
  (Section 4 names it but the pasted text was cut off before the spec).
  Implemented as one reusable card (Coconut surface, Hairline border,
  `shadow-1` → `shadow-2` + `hover-lift` on hover) with an `accent` token
  (`clay | azulejo | turmeric | curry`) applied only to small decorative
  areas — icon badge, accent bar, bullets, quote border — never as the
  card's fill. This matters because the guide marks Turmeric "highlight
  only... never a large fill"; a shared component covering both the
  Experience steps and the four dish tiles needed one rule that works for
  all four accent tokens, not just the ones with a defined tint color.
- `src/components/EmailForm.jsx` — restyled to tokens/fonts; dropped the
  runtime `accentColor` prop and its `darkenHex()` hex-math helper (no
  longer needed now that Clay/Clay Deep are static tokens); added the
  `testId` prop it was missing; added `buttonVariant` so the Final CTA
  section (Clay background) can render the submit button as `secondary`
  instead of `primary` (a Clay button on a Clay background has no contrast).
  It's now actually used by `page.jsx` — see "Duplication cleanup" below.
- `src/components/FaqAccordion.jsx` — restyled to tokens/fonts; dropped the
  arbitrary `accentColor` prop in favor of the Clay token directly. Also now
  actually used by `page.jsx`.
- `src/components/CookieConsent.jsx` — restyled to tokens/radius/shadow,
  submit button now renders via `Button`.

### Duplication cleanup

`page.jsx` previously defined its own inline `WaitlistForm` and `FaqItem`
components rather than using the already-existing (but completely unused)
`EmailForm`/`FaqAccordion` in `src/components/`. The rewrite removes that
duplication — `page.jsx` now imports and uses the real shared components.

### page.jsx section treatment

Two reads of the guide informed the section backgrounds, since the pasted
guide's Section 4 was truncated before the "Experience card" spec, and its
color table doesn't spell out full section-by-section usage:

- The color table lists Clove Charcoal's role as "body text, **hero,
  footer**" (not just body text) and Turmeric's as "eyebrows **on dark**",
  with a contrast pairing table entry for "Turmeric on Charcoal — dark
  eyebrows." Read together, this means the Hero and Footer sections get a
  dark Charcoal background with a Turmeric eyebrow badge, not just Charcoal
  body text on a light page.
- `ExperienceCard`'s accent-is-decorative-only rule (above) is the
  interpretation used everywhere the guide references an accent token
  without fully specifying the "signature component."

Resulting section backgrounds: Nav/Host/FAQ → Coconut; Experience/Menu →
Coconut Shade; Contact → Coconut Shade (kept light — the guide only assigns
Charcoal-as-background to hero/footer); Hero/Footer → Charcoal (dark); Final
CTA → Clay fill (the guide's "one primary color, always the booking action"
principle, given its boldest treatment right before the footer).

Dropped the old gradient-text headlines, floating-particle blobs, and
glass-morphism panels — the guide's Motion section only specifies a hover
lift, and the brand voice ("warm, hand-made, deliberately not
restaurant-like") works against those effects.

### Responsiveness

Replaced the old custom-class + `globals.css` `!important` media-query
override mechanism with Tailwind responsive prefixes directly in the JSX
(e.g. `grid-cols-1 md:grid-cols-2`, `px-6 md:px-12`). `page.jsx` no longer
needs `"use client"` — it had no other client-only behavior once the
scroll/mouse-tracking decorative animations were removed; `EmailForm`,
`FaqAccordion`, and `CookieConsent` remain client components and are
imported as usual from the server component.

### Content data

`config.js` (content-only file) — copy text is unchanged. Removed
`brand.accentColor`/`accentDark`/`accentMid` (no longer consumed — design
tokens now live in `tailwind.config.js`/`globals.css`, not per-brand content
config). `experience.steps[].gradient`/`.glowColor` and
`menu.dishes[].accent`/`.bg` (raw hex/gradient strings) were replaced with a
single `accent: "clay" | "azulejo" | "turmeric" | "curry"` field per item,
consumed by `ExperienceCard`'s static class lookup (Tailwind's JIT purge
requires literal class names, so accent → class mapping can't be built from
arbitrary config strings at runtime).

### Cleanup

Deleted `tunapaha-styleguide.jsx` (repo root) — an unrouted, dead component
still documenting the old amber/green palette. The pasted guide is now the
source of truth for the brand.

## How to apply

- Any new UI should pull colors/radius/shadows/fonts from the Tailwind
  tokens in `tailwind.config.js` (`bg-clay`, `text-azulejo`, `rounded-lg`,
  `shadow-1`, `font-display`, etc.), not new hex literals — that's the
  "global style guide across the app" this change establishes.
- Reach for `Button`, `ExperienceCard`, `EmailForm`, and `FaqAccordion`
  before writing a new one-off button/card/form/accordion; extend props
  rather than duplicating.
- New accent tokens for `ExperienceCard`/config `accent` fields must go
  through `ACCENT_CLASSES` in `ExperienceCard.jsx` (static map, not a
  dynamic Tailwind class string) and must be used only on small decorative
  areas, never as the full card fill.

## Verification

- `npx vitest run` — all suites (existing `tests/lib/*`, rewritten
  `tests/app/*`, new `tests/components/*`) pass.
- `npx eslint .` and `npx prettier --check .` — clean.
- Manual check with `npm run dev`: hero, experience cards, host section, dish
  grid, FAQ open/close, contact form, final CTA, footer, and cookie banner
  render with the Clay/Azulejo/Turmeric/Coconut/Charcoal palette and
  Fraunces/Public Sans/Plex Mono fonts; hover-lift works on cards/buttons;
  layout holds at mobile widths (375px).

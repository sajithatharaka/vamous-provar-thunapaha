# FAQ + final CTA dynamic month/year

Created: 2026-07-15

## Change

Follow-up to
[2026-07-15-hero-cta-subline-dynamic-date.md](./2026-07-15-hero-cta-subline-dynamic-date.md),
which established the rule "do not hard-code a month/year into `config.js`
string content." Two more copy strings still had a hard-coded month baked
in mid-sentence:

- `faq.items` → "When is the next experience?" answer: `"We're targeting
June 2025. ..."`
- `finalCta.subline`: `"Join the waitlist. Next experiences happen in June.
Limited seats."`

Unlike `hero.ctaSubline`, the date sits in the middle of these sentences
rather than at the end, so splitting the string into separate config fields
per usage wasn't a good fit. Used a token-substitution approach instead:

- `config.js` — the hard-coded dates were replaced with `{{monthYear}}` (FAQ
  answer) and `{{month}}` (final CTA subline) placeholder tokens.
- `src/app/page.jsx` — added `getCurrentMonth()` (month name only, alongside
  the existing `getCurrentMonthYear()`) and `withCurrentDate(text)`, which
  fills both tokens via `.replace()` (a no-op on any string without the
  token, so it's safe to call on every FAQ item unconditionally). Applied at
  the two render sites: `<FaqItem q={item.q} a={withCurrentDate(item.a)} />`
  and `{withCurrentDate(finalCta.subline)}`.
- Verified in a real browser (Playwright, dev server): opening the "When is
  the next experience?" FAQ item renders "We're targeting July 2026...",
  and the final CTA section renders "Next experiences happen in July." —
  both matching the current date instead of a stale "June 2025".

## How to apply

- Going forward, any new copy in `config.js` that needs a "current
  month"/"current month + year" reference should use the `{{month}}` /
  `{{monthYear}}` tokens and route through `withCurrentDate()` at the render
  site, rather than hard-coding a date or adding a new one-off helper.

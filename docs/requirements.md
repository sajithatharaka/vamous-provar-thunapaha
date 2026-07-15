# Requirements — Content Page

This is the index of requirement documents. Each entry links to a page-scoped or cross-cutting requirement doc under `docs/requirements/`.

| Doc                                                                                                       | Scope                                                                                              |
| --------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| [2026-07-12-dev-tooling-and-git-hooks.md](./requirements/2026-07-12-dev-tooling-and-git-hooks.md)         | Dev tooling (ESLint/Prettier/Vitest/Husky), coverage thresholds, `db:push` script, pre-commit hook |
| [2026-07-13-leads-insert-permission-fix.md](./requirements/2026-07-13-leads-insert-permission-fix.md)     | Bug fix: waitlist signup failed — `leads` table was missing a `GRANT` to `service_role`            |
| [2026-07-13-welcome-email-copy-update.md](./requirements/2026-07-13-welcome-email-copy-update.md)         | Waitlist welcome email body copy updated to Harshika's confirmation text                           |
| [2026-07-14-mobile-responsive-layout.md](./requirements/2026-07-14-mobile-responsive-layout.md)           | Landing page mobile responsiveness: responsive padding/nav overrides, input `data-testid`s         |
| [2026-07-15-menu-dish-photos.md](./requirements/2026-07-15-menu-dish-photos.md)                           | Menu tiles render real dish photos from `public/images/` instead of emoji placeholders             |
| [2026-07-15-hero-cta-subline-dynamic-date.md](./requirements/2026-07-15-hero-cta-subline-dynamic-date.md) | Hero CTA subline month/year is computed at runtime instead of hard-coded in `config.js`            |
| [2026-07-15-hero-background-blend.md](./requirements/2026-07-15-hero-background-blend.md)                 | Hero section background blended into one continuous gradient instead of two separate column colors |

# Dev tooling and git hooks

Created: 2026-07-12

## Problem

`package.json` defined scripts for `eslint`, `prettier`, `husky`, `vitest`, `playwright`, and `lint-staged`, but none of those packages were installed, and no config files existed for any of them. `.husky/pre-commit` (lint-staged → conditional Playwright e2e → `vitest run --coverage` with an 85%/75% threshold readout) and `.husky/post-commit` (auto-push) existed but weren't wired up — `git config core.hooksPath` wasn't pointed at `.husky`. The `db:push` script also passed `SUPABASE_ACCESS_TOKEN` as a `--token` CLI flag, leaking it into shell history and `ps` output.

## Changes

- **Node version pinned** via `.nvmrc` (`24.18.0`) and `package.json` `engines` (`^22.22.1 || >=24.0.0`) — required by `eslint@9`, `vitest@4`, and `lint-staged@17`, none of which run on Node 18/20 or Node 22 below `22.22.1`.
- **devDependencies added**: `eslint` + `eslint-config-next` + `eslint-config-prettier` + `typescript` (peer dep of `eslint-config-next`'s import resolver), `prettier`, `husky`, `lint-staged`, `vitest` + `@vitest/coverage-v8` + `jsdom` + `@testing-library/react` + `@testing-library/jest-dom`, `@playwright/test`, `supabase` (CLI, pinned instead of relying on whatever `npx` fetches at push time).
  - `eslint` is pinned to the `9.x` line, not `10.x` — `eslint-config-next@16.2.10`'s bundled `eslint-plugin-react`/`eslint-plugin-jsx-a11y` only declare peer support up to ESLint 9.
- **`db:push` fixed**: `supabase link --project-ref $SUPABASE_PROJECT_ID && supabase db push --linked` — no `--token` flag; the Supabase CLI reads `SUPABASE_ACCESS_TOKEN` from the environment automatically, and `supabase` being a local devDependency means `npx` is no longer needed.

### Update 2026-07-12: `db:push` was still broken after the first fix

The first fix (`supabase db push --project-ref $SUPABASE_PROJECT_ID`, no `--token`) was still wrong — running it against the installed CLI (`supabase@2.109.1`) failed with `Unrecognized flag: --project-ref in command supabase db push`. In this CLI version, `--project-ref` belongs to `supabase link`, not `db push`; `db push` only accepts `--linked`, `--local`, or `--db-url`. Fixed to a two-step `link` (reads `SUPABASE_ACCESS_TOKEN` from env, takes `--project-ref`) then `db push --linked`. `supabase link` may prompt for the database password interactively the first time — that's expected for this manual, local-only script (not run in CI).

- **`lint-staged` config** added to `package.json`: JS/JSX get `eslint --fix` + `prettier --write`; JSON/CSS/MD get `prettier --write`.
- **New config files**: `eslint.config.mjs` (flat config: `eslint-config-next/core-web-vitals` + `eslint-config-prettier`), `.prettierrc.json` + `.prettierignore`, `vitest.config.js`, `tests/setup.js` (imports `@testing-library/jest-dom/vitest`).
- **Husky wired up**: `npm run prepare` (runs on `postinstall` via the `prepare` script) sets `core.hooksPath` to `.husky/_`, which shims through to the existing `.husky/pre-commit` and `.husky/post-commit`. Neither hook's logic was changed.

## Coverage threshold scope (decision)

`.husky/pre-commit` prints fixed thresholds (statements/lines ≥85%, branches/functions ≥75%). Enforcing that against all of `src/` today would fail every commit, since only `src/lib/actions.js` has tests. `vitest.config.js` scopes `coverage.include` to `src/lib/actions.js` specifically, matching what's actually tested, so the thresholds are real rather than decorative. **Expand `coverage.include` as more of `src/lib` (and eventually components/pages) gain tests** — don't leave it pinned to one file indefinitely.

## Lint fixes required by the new config

Turning on `eslint-config-next/core-web-vitals` surfaced pre-existing issues, fixed as part of this change (no behavior change):

- Unescaped `"`/`'` in JSX text in `src/app/page.jsx` and `tunapaha-styleguide.jsx` → HTML entities (`&ldquo;`/`&rdquo;`/`&apos;`).
- `src/components/CookieConsent.jsx` called `setState` synchronously inside a `useEffect` with no deps, flagged by `react-hooks/set-state-in-effect`. Left as-is with a documented `eslint-disable-next-line`: `localStorage` isn't available during SSR/initial render, so this can't be moved to a lazy `useState` initializer.

## Flagged, not changed

`.husky/post-commit` runs `git push` automatically after every local commit. This wasn't touched — it predates this change and matches what was asked (tests/coverage before the code leaves the machine) — but it removes the ability to review a commit before it reaches the remote. Worth reconsidering if that's not intentional.

## Verification

- `npm run lint`, `npm run format:check`, `npm run test:coverage` all pass (see `tests/lib/actions.test.js`).
- `git config --get core.hooksPath` → `.husky/_` (shims to `.husky/pre-commit` / `.husky/post-commit`).
- Not verified via an actual `git commit`, since `.husky/post-commit` auto-pushes — the underlying commands were run directly instead.

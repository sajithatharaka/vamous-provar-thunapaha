# Update: waitlist welcome email copy

Created: 2026-07-13

## Change

Replaced the placeholder welcome email body in `sendWelcomeEmail` (`src/lib/email.js`) with Harshika's actual waitlist confirmation copy: confirms the registrant is on the waitlist, explains that date/time/menu are still being finalised and will be sent to everyone in the next few days, notes they'll get a direct link to secure their spot once confirmed, and invites replies for questions or dietary requirements.

Subject line and notification email (`sendWaitlistNotification`) are unchanged — only the recipient-facing welcome email body (`text` and `html`) was updated.

## How to apply

No config or env var changes needed. The copy is inline in `sendWelcomeEmail`; future copy edits should be made directly there (or extracted to `config.js` if the copy needs to vary per brand/deployment — not needed today since there's a single brand).

## Verification

- Added `tests/lib/email.test.js`, mocking `nodemailer` and asserting `sendWelcomeEmail` sends the new copy (waitlist confirmation line, finalising-details line, and signature) to the correct recipient.
- `npx vitest run tests/lib/email.test.js` passes.

# Decisions

- Next.js 16.2.6, React 19, TypeScript, and Tailwind CSS 4 are retained from the supplied project.
- `zod@4.4.3` validates contact submissions server-side.
- The supplied logo asset is stored locally as `/public/company-logo.png` and rendered with `next/image`.
- Contact rate limiting uses an in-memory map, as allowed by the PRD; it is best-effort across server instances.
- Contact submissions are validated but not stored or sent because no verified mail provider or recipient configuration was supplied.
- The CSP starts in report-only mode to avoid breaking Next.js hydration before nonce-based enforcement is configured.

# Contributing

Thanks for helping this grow. Small, focused pull requests are the easiest to review.

## Getting started

```sh
npm install
npm run dev            # Next.js dev server on http://localhost:3000
```

The legal pages and the font proxy live in the Cloudflare Worker (`worker/`). To run the production build with the Worker in front:

```sh
cp .dev.vars.example .dev.vars
npm run preview        # next build + wrangler dev on http://localhost:8787
```

## Before you open a PR

- `npm run lint`, `npm run type-check`, `npm test` and `npm run build` pass.
- New behaviour has a test in `tests/` where that's practical.
- The app stays fully client-side. No analytics, no external requests, no new network calls with user data. The CSP (`public/_headers`, `worker/index.ts`) only allows `connect-src 'self'`, and it should stay that way.
- The site is a static export, so no server-only Next.js features (API routes, dynamic route segments without static params, server actions).
- No account IDs, tokens, personal data or personal domains in code or config. Use placeholders.
- UI follows the shiftbloom brandbook v2 rules listed in the README.

## Commit messages

Short, imperative subjects ("Add weekday filter to timeline"), with a body when the *why* isn't obvious.

## Reporting bugs and ideas

Use the issue templates. Never attach your own export to an issue. For security problems, follow [SECURITY.md](SECURITY.md).

By contributing, you agree that your contributions are licensed under the GNU Affero General Public License v3.0 or later (AGPL-3.0-or-later).

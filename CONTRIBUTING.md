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

## Working on an issue

Issues labeled `good first issue` or `help wanted` are open to anyone. Before you write code:

1. Comment on the issue and say how you plan to approach it: the files you expect to touch, and anything you would do differently from what the issue suggests. A few sentences are enough.
2. Wait until a maintainer assigns the issue to you. That way two people don't build the same thing, and we can point out a dead end before you spend an evening on it.
3. Open the pull request and link the issue (`Closes #123`).

Typo fixes and other small, obvious changes can go straight to a pull request.

If an assigned issue sees no activity for 14 days, we'll check in and may hand it to someone else. You're welcome to pick it up again later.

## Using AI tools

You're welcome to use AI assistants, the same way you'd use an editor or a linter. We only ask that a person stands behind every contribution:

- You have read and understood every line you submit, and you ran the checks yourself.
- You answer review questions in your own words and can change the code when we ask.
- The pull request description explains what you decided and why. The diff already shows what changed.

Issues, comments and pull requests that an agent wrote and posted on its own, with nobody actually involved, will be closed. This isn't about the tool. We'd like to get to know the people who work on this project.

By contributing, you agree that your contributions are licensed under the GNU Affero General Public License v3.0 or later (AGPL-3.0-or-later).

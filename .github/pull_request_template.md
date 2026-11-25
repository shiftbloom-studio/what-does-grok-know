## What and why

<!-- One or two sentences. Link the issue if there is one. -->

## How to test

<!-- Steps or commands a reviewer can run. -->

## Checklist

- [ ] `npm run lint`, `npm run type-check`, `npm test` and `npm run build` pass
- [ ] Nothing sends user data off the device (the CSP only allows `connect-src 'self'`)
- [ ] No secrets, account IDs, personal data or personal domains in code or config

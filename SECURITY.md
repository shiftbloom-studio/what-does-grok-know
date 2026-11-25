# Security policy

## Reporting a vulnerability

Please **do not open a public issue** for security problems.

Use GitHub's private vulnerability reporting (Security tab, "Report a vulnerability") or email **safety@shiftbloom.studio** with "what does grok know security" in the subject. Include steps to reproduce and the impact you see.

We aim to acknowledge reports within 3 working days and to ship a fix or mitigation within 14 days for confirmed issues. We'll credit you in the release notes unless you'd rather stay anonymous.

## Supported versions

Only the latest `main` is supported. Self-hosters should redeploy after security fixes.

## Scope

The most important property of this app is that a loaded export never leaves the browser. Anything that breaks it is in scope: a request that carries export data off the device, a weakness in the Content Security Policy, XSS through crafted export files (titles, messages, code blocks), and SSRF or path traversal through the Worker's font proxy.

Out of scope: rate limiting and DDoS (these belong in your Cloudflare zone configuration), and attacks that need an already compromised browser or device.

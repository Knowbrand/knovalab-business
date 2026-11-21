# Aadat Se Gareeb — setup, deploy, test
(Setup notes only. Safe to delete before uploading to GitHub Pages.)

## Structure (upload the `aadatsegareeb/` folder as-is)
aadatsegareeb/index.html · about-us/index.html · panelregistration/index.html
assets/css/style.css · assets/js/main.js, registration.js
assets/images/logo.jpg (original, 1536px) · logo-960.jpg · logo-480.jpg · favicon.png
All paths are relative, so it works at https://business.knovalab.in/aadatsegareeb/.

## Logo
Already placed at assets/images/logo.jpg. The hero uses srcset, so phones load the 480/960px copies and large screens load the full-quality original.

## Form service (Formspree) — private inbox
1. Sign up at formspree.io, create a form named "Panel Applications", set the recipient to your private inbox **in the dashboard** (never in the site).
2. Copy the endpoint (https://formspree.io/f/abcd1234) and replace `YOUR_FORM_ID` in `panelregistration/index.html` (the `action` of #panel-form).
3. Create a second form "Data Requests" and replace `YOUR_REQUEST_FORM_ID` (the correction/deletion mini-form). Send it to an inbox you choose.
4. In each form's Settings: turn on reCAPTCHA (or the provider's spam filter) and add allowed-domain restriction if your plan offers it. The `_gotcha` honeypot is already in the HTML.
5. Subject line `[AADAT SE GAREEB] New Panel Application — Name` is set by the page via the `_subject` field; confirm it appears on your plan. Fields arrive labelled (Full Name, Age, Email, Instagram…, Submitted At in IST).
Why Formspree: private recipient, JSON/fetch support, honeypot + captcha, and a form on/off switch. **Check its current free-tier limit (historically ~50 submissions/month)**; if you expect more, upgrade or swap to a similar provider (Web3Forms etc.) — only the `action`/field handling in registration.js changes.

## Deadline
Page shows a closed state after 23:59:59 IST on 15 Dec 2026 (my assumption — confirm the hour). This is cosmetic. **To truly close: disable the form in the Formspree dashboard on 16 Dec.**

## Deploy
Copy this whole folder into the root of your GitHub Pages repo (so it serves at /aadatsegareeb/), commit, push, wait for Pages, purge Cloudflare cache if needed.

## Test checklist
- Nav links on all 3 pages; menu works at 320px; no sideways scroll
- Submit empty form: inline errors, focus jumps to first error; age 17 rejected; bad email rejected; story <40 or >600 rejected
- With placeholder endpoint: shows "not connected" error (never fake success)
- With real endpoint: success card appears only after provider accepts; email arrives with subject + all fields; button disabled during send; double-click sends once
- Honeypot: fill `_gotcha` via devtools → provider should discard
- Temporarily set clock/ASG_REG_CLOSED=true: form hides, closed notice shows
- View source / Network tab / search the repo for your inbox address: zero hits
- Keyboard-only run-through, visible focus, zoom 200%, prefers-reduced-motion

## Launch readiness
Works now: layout, nav, validation, closed-state logic, SEO tags, logo.
Needs your setup: Formspree endpoints, spam settings, closing the form on 16 Dec, deletion-request inbox.
Only verifiable after deploy: real email delivery/subject, Google Fonts loading, canonical/OG previews, Cloudflare caching.
Assumptions: closing hour (end of day IST); no fee mentioned; no social links, host names or stats invented.

# ROMAE PIZZERIA website

Static HTML/CSS/JS, no build step. Hosted at https://business.knovalab.in/romaepizzeria/

## Deploy
Upload the **contents of this folder** into the `romaepizzeria/` directory on the server so you get:
`/romaepizzeria/index.html`, `/about/index.html`, `/menu/index.html`, `/contact/index.html`, `/assets/...`.
All links and assets are relative, so it also works in any folder or when previewed locally
(`python3 -m http.server` then open `/`).

## Edit
- All business data (WhatsApp, phone, address, hours, social links, menu items, form endpoint): `assets/js/config.js`.
- Colours and spacing: CSS variables at the top of `assets/css/style.css`.
- Menu photos: put files in `assets/images/` and reference them as `image: "assets/images/name.jpg"`.
- Navbar logo loads from the pinimg URL you supplied, falling back to `assets/images/logo-dark.png`.
  Self-hosting the logo is recommended for reliability.

## Before launch (missing business info)
Address, opening hours, social links, real menu (names, descriptions, prices, categories),
pizza photographs, brand story, and opening hours.
Until supplied, the site shows "to be announced" / "menu being finalised" states instead of invented facts.

## Notes
Images in use are the brand mockups from the supplied guideline PDF; replace the hero with real pizza photography.
Contact form does not deliver messages until `formEndpoint` is set, and says so.

## Contact form
Submissions go to info@romae.in via FormSubmit (formsubmit.co). The first submission sends an activation email to info@romae.in; click the link in it once, then all messages are delivered.
WhatsApp: +91 84468 44925. Both are set in `assets/js/config.js`.

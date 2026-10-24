# ROMAE PIZZERIA website

Static HTML/CSS/JS, no build step. Hosted at https://business.knovalab.in/romaepizzeria/

## Deploy
Upload the **contents of this folder** into the `romaepizzeria/` directory on the server so you get:
`/romaepizzeria/index.html`, `about/index.html`, `menu/index.html`, `contact/index.html`, `assets/...`.
All links and assets are relative, so it also works locally (`python3 -m http.server`, open `/`).

## Edit
- All business data (WhatsApp, phone, address, hours, social links, form endpoint) and the full menu: `assets/js/config.js`.
- Menu items: `menu` is a list of categories, each with `items` (name, description, price, tags, featured, recommended, optional image).
  Put real dish photos in `assets/images/` and set `image: "assets/images/name.jpg"` on an item to override the category illustration.
- Colours and spacing: CSS variables at the top of `assets/css/style.css`.

## Contact form
Enquiries are delivered to romaepizzeria@gmail.com through FormSubmit (formsubmit.co). The address is not shown anywhere on the pages.
The first submission sends an activation email to that inbox; click the link in it once, then all messages are delivered.
WhatsApp: +91 84468 44925 (unchanged).

## Still missing from the client
Address, opening hours, Facebook link (Instagram @romae.pizzeria is set), and real dish photographs.
Until supplied, the site shows "to be announced" instead of invented facts.

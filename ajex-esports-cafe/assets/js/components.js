/* Shared components + central business config. Edit here; all 3 pages update. */
(() => {
'use strict';
const SRC = document.currentScript.src;
const ROOT = new URL('../../', SRC).href;            // site root, works on any static host / subfolder
const HERO_IMG = ROOT + 'assets/images/hero.svg';
const GE = window.GE = {
  ROOT, HERO_IMG,
  name: 'Ajex Esports Cafe', hi: 'एजेक्स स्पोर्ट्स कैफे',
  phone: '+91 97671 37933', tel: '+919767137933', wa: '919767137933',
  address: "Shop No. 112, TRIA, Vasantam City Center, Dhanori-Lohegaon Rd, Siddartha Nagar, Dhanori, Pune, Maharashtra 411015",
  closing: '11:00 PM',
  social: { instagram: '' /* add real URL to activate */, facebook: '', youtube: '' }
};
GE.q = encodeURIComponent('Ajex Esports Cafe ' + GE.address);
GE.maps = 'https://www.google.com/maps/search/?api=1&query=' + GE.q;
GE.dir = 'https://www.google.com/maps/dir/?api=1&destination=' + GE.q;
GE.embed = 'https://www.google.com/maps?q=' + GE.q + '&output=embed';
GE.waLink = t => 'https://wa.me/' + GE.wa + '?text=' + encodeURIComponent(t || "Hi Ajex Esports Cafe! I'd like to know about gaming session availability and pricing.");
document.documentElement.style.setProperty('--hero', `url("${HERO_IMG}")`);
const P = {
 grid:'<rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/>',
 pad:'<path d="M6 11h4M8 9v4"/><circle cx="15" cy="12" r=".8"/><circle cx="18" cy="10" r=".8"/><path d="M7 6h10a4 4 0 0 1 4 4v4a3 3 0 0 1-5.2 2L14 14h-4l-1.8 2A3 3 0 0 1 3 14v-4a4 4 0 0 1 4-4z"/>',
 lib:'<rect x="4" y="3" width="5" height="18" rx="1"/><rect x="11" y="3" width="5" height="18" rx="1"/><path d="m18 5 3 .8-3.5 15-3-.8z"/>',
 tag:'<path d="M3 12V4h8l10 10-8 8z"/><circle cx="7.5" cy="8.5" r="1"/>',
 star:'<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
 img:'<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="1.5"/><path d="m21 16-5-5-9 9"/>',
 user:'<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
 pin:'<path d="M12 21s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
 sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
 moon:'<path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z"/>',
 phone:'<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
 chat:'<path d="M4 20l1.2-4A8 8 0 1 1 8 18.8z"/><path d="M9 9c0 3 3 6 6 6l1-2-2-1-1 .8c-1-.4-2-1.400-2.400-2.400L11.400 9.500l-1-2z"/>',
 insta:'<rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17" cy="7" r=".6"/>',
 menu:'<path d="M4 7h16M4 12h16M4 17h16"/>', x:'<path d="M6 6l12 12M18 6 6 18"/>'
};
const ic = n => `<svg class="ic" viewBox="0 0 24 24" aria-hidden="true">${P[n]}</svg>`;
GE.ic = ic;
const H = ROOT + 'index.html';
const NAV = [['overview','Overview','grid',H+'#overview'],['stations','Gaming Stations','pad',H+'#stations'],['games','Game Library','lib',H+'#games'],['pricing','Pricing & Packages','tag',H+'#pricing'],['reviews','Reviews','star',H+'#reviews'],['gallery','Gallery','img',H+'#gallery'],['about','About Us','user',ROOT+'about/index.html'],['contact','Contact & Location','pin',ROOT+'contact/index.html']];
const soc = (k, label, i) => GE.social[k] ? `<a href="${GE.social[k]}" target="_blank" rel="noopener">${ic(i)}${label}</a>` : `<a class="off" href="#" aria-disabled="true" tabindex="-1">${ic(i)}${label} (add URL)</a>`;
GE.formHTML = p => `<form data-inquiry novalidate><div class="row"><label>Name<input name="name" required autocomplete="name"></label><label>Platform<select name="platform" required><option value="">Choose platform</option><option>PC Gaming</option><option>PS5</option><option>Racing Simulator</option><option>Not sure yet</option></select></label></div>
<div class="row"><label>Preferred game<input name="game" list="bk-games" placeholder="e.g. VALORANT"></label><label>Number of players<input name="players" type="number" min="1" max="20" inputmode="numeric" required></label></div>
<label>Preferred date and time<input name="when" type="datetime-local"></label><label>Message<textarea name="msg" placeholder="Anything else we should know?"></textarea></label>
<button class="btn" type="submit">${ic('chat')} Send inquiry on WhatsApp</button><p class="msg" role="status" aria-live="polite"></p><p class="note" style="margin:0">This opens WhatsApp with your details. Nothing is booked until Ajex Esports Cafe replies and confirms.</p></form>`.replace('required autocomplete="name"',`required autocomplete="name" id="${p}n"`);
const page = document.body.dataset.page || 'home';
const mount = (id, html) => { const e = document.getElementById(id); if (e) e.innerHTML = html; };
mount('sidebar', `<a class="logo" href="${H}"><i>${ic('pad')}</i><span><b>Ajex Esports Cafe</b><small>${GE.hi} · Dhanori, Pune<br>Listed closing ${GE.closing}</small></span></a>
<nav class="nav" aria-label="Main">${NAV.map(n => `<a href="${n[3]}" data-n="${n[0]}"${n[0]===page?' aria-current="page" class="on"':''}>${ic(n[2])}${n[1]}</a>`).join('')}</nav>
<div class="sf"><a href="${GE.waLink()}" target="_blank" rel="noopener">${ic('chat')}WhatsApp</a><a href="tel:${GE.tel}">${ic('phone')}${GE.phone}</a><a href="https://ajexesports.com" target="_blank" rel="noopener">${ic('grid')}Website</a><a href="${GE.dir}" target="_blank" rel="noopener">${ic('pin')}Directions</a></div>`);
mount('topbar', `<button class="iconbtn burger" id="burger" aria-label="Open menu" aria-expanded="false" aria-controls="sidebar">${ic('menu')}</button><a class="brand-m" href="${H}">Ajex Esports Cafe</a><span class="r"><button class="iconbtn" id="theme" aria-label="Switch to light theme">${ic('sun')}</button><button class="btn" data-book>Book now</button></span>`);
mount('footer', `<div class="fg"><div><h3>${GE.name}</h3><p class="mut">${GE.hi}<br>Game store · 5.0 on Google from 52 reviews</p></div><div class="fl"><a href="${H}#games">Game Library</a><a href="${H}#pricing">Pricing &amp; Packages</a><a href="${ROOT}about/index.html">About Us</a><a href="${ROOT}contact/index.html">Contact &amp; Location</a></div><address class="mut" style="font-style:normal"><a href="tel:${GE.tel}">${GE.phone}</a><br>${GE.address}<br>Listed closing ${GE.closing}<br><a href="${GE.dir}" target="_blank" rel="noopener">Get directions</a><br><a href="https://ajexesports.com" target="_blank" rel="noopener">ajexesports.com</a></address></div><p class="fine">© ${new Date().getFullYear()} ${GE.name}. Game availability may vary. Website demo by Knovalab.</p>`);
const bk = document.createElement('dialog'); bk.id = 'book'; bk.setAttribute('aria-labelledby', 'bk-t');
bk.innerHTML = `<div class="dh"><div><h2 id="bk-t">Book a session</h2><p class="mut">Send your details on WhatsApp. The team confirms availability.</p></div><button class="iconbtn" data-close aria-label="Close">${ic('x')}</button></div>${GE.formHTML('bk-')}<datalist id="bk-games"></datalist>`;
document.body.appendChild(bk);
const sc = document.createElement('div'); sc.className = 'scrim'; sc.id = 'scrim'; document.body.appendChild(sc);
const bg = document.createElement('div'); bg.className = 'bg'; bg.setAttribute('aria-hidden', 'true'); document.body.prepend(bg);
})();
/* page wiring for data-attributes (links, form, map) */
(() => {
const GE = window.GE, d = document;
const form = d.createElement('div'); form.innerHTML = GE.formHTML('ct-');
d.addEventListener('DOMContentLoaded', () => {});
d.querySelectorAll('[data-dir]').forEach(a => a.href = GE.dir);
d.querySelectorAll('[data-maps]').forEach(a => a.href = GE.maps);
d.querySelectorAll('[data-wa]').forEach(a => a.href = GE.waLink());
d.querySelectorAll('[data-wa-t]').forEach(a => a.href = GE.waLink("Hi Ajex Esports Cafe! I'd like to ask about " + a.dataset.waT + ' availability and pricing.'));
d.querySelectorAll('[data-tel]').forEach(a => a.href = 'tel:' + GE.tel);
d.querySelectorAll('[data-contact]').forEach(a => a.href = GE.ROOT + 'contact/index.html');
d.querySelectorAll('[data-map]').forEach(f => f.src = GE.embed);
const slot = d.getElementById('form-slot'); if (slot) slot.innerHTML = GE.formHTML('ct-');
})();

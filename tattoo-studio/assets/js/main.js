(() => {
'use strict';
const SRC = document.currentScript ? document.currentScript.src : location.href;
const ROOT = new URL('../../', SRC).href;

/* ---- Business details live here (taken from the studio's Google listing) ---- */
const CONFIG = {
  brand: 'Nanashree Tattoo Studio',
  brandHi: 'नानाश्री टैटू स्टूडियो',
  phone: '077449 08089',
  tel: '+917744908089',
  whatsappNumber: '917744908089',           // assumed same as the listed phone (07744908089 minus the leading 0, plus 91). Confirm it has WhatsApp.
  address: 'Kale Colony, 28, near D-Mart, Sasane Nagar, Hadapsar, Pune, Maharashtra 411028',
  hours: 'Closes 10:30 pm (as listed on Google Maps)',
  plusCode: 'FWVM+GG Pune, Maharashtra',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Nanashree+Tattoo+Studio+Kale+Colony+Sasane+Nagar+Hadapsar+Pune',
  rating: '4.9', reviewCount: '1,274',
  social: {},
  bookingUrl: '',
};
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const ease = t => t * t * (3 - 2 * t);
const $ = (s, r = document) => r.querySelector(s);
const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

function injectBackground() {
  if ($('.bg')) return;
  const lines = [[12,-8,22,-4],[30,5,30,-11],[52,-3,26,-7],[70,9,34,-15],[88,-6,28,-2]]
    .map(([t, r, d, dl]) => `<i class="ln" style="top:${t}%;--r:${r}deg;--d:${d}s;animation-delay:${dl}s"></i>`).join('');
  document.body.insertAdjacentHTML('afterbegin', `<div class="bg" aria-hidden="true"><i class="orb o1"></i><i class="orb o2"></i><i class="orb o3"></i>${lines}</div>`);
}
async function loadComponent(id, file, fallback) {
  const host = document.getElementById(id); if (!host) return;
  try { const r = await fetch(ROOT + 'assets/components/' + file); if (!r.ok) throw 0; host.innerHTML = await r.text(); }
  catch { host.innerHTML = fallback; }
}
function fixLinks(scope = document) {
  scope.querySelectorAll('[data-href]').forEach(a => a.href = ROOT + a.dataset.href);
  scope.querySelectorAll('[data-cta]').forEach(a => a.href = CONFIG.bookingUrl || ROOT + 'contact/');
  scope.querySelectorAll('[data-brand]').forEach(e => e.textContent = CONFIG.brand);
  scope.querySelectorAll('[data-cfg]').forEach(e => e.textContent = CONFIG[e.dataset.cfg]);
  scope.querySelectorAll('[data-map]').forEach(a => { a.href = CONFIG.mapsUrl; a.target = '_blank'; a.rel = 'noopener'; });
  scope.querySelectorAll('[data-tel]').forEach(a => a.href = 'tel:' + CONFIG.tel);
  scope.querySelectorAll('[data-wa]').forEach(a => a.href = 'https://wa.me/' + CONFIG.whatsappNumber);
  scope.querySelectorAll('[data-year]').forEach(e => e.textContent = new Date().getFullYear());
}
function initNav() {
  const nav = $('#nav'); if (!nav || nav.dataset.ready) return; nav.dataset.ready = 1;
  const btn = $('#burger'), set = o => { nav.classList.toggle('open', o); btn.setAttribute('aria-expanded', o); btn.setAttribute('aria-label', o ? 'Close menu' : 'Open menu'); };
  btn.addEventListener('click', () => set(!nav.classList.contains('open')));
  nav.addEventListener('click', e => { if (e.target.closest('a')) set(false); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') set(false); });
  const norm = u => u.split(/[?#]/)[0].replace(/index\.html$/, '');
  nav.querySelectorAll('.links a:not(.btn)').forEach(a => { if (norm(a.href) === norm(location.href)) a.setAttribute('aria-current', 'page'); });
  const on = () => nav.classList.toggle('scrolled', scrollY > 24);
  addEventListener('scroll', on, { passive: true }); on();
}

/* ---- Home, third section: the contact card grows into the footer as you reach the end ---- */
function initMorph() {
  const slot = $('#morph-slot'), card = $('.footer-card'); if (!slot || !card) return;
  slot.appendChild(card); card.classList.add('morph');
  if (reduced()) return card.style.setProperty('--p', 1);
  let t = false;
  const upd = () => { t = false;
    const rest = document.documentElement.scrollHeight - innerHeight - scrollY;
    card.style.setProperty('--p', ease(clamp(1 - rest / (innerHeight * .42))).toFixed(3)); };
  card.style.setProperty('--p', 0);
  addEventListener('scroll', () => { if (!t) { t = true; requestAnimationFrame(upd); } }, { passive: true });
  addEventListener('resize', upd); upd();
}

/* ---- Contact form: opens WhatsApp with a prepared message; nothing is sent automatically ---- */
function initForm() {
  const form = $('#enquiry'); if (!form) return;
  const note = $('#form-note');
  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const v = Object.fromEntries(new FormData(form));
    const msg = ['Hello, I would like to ask about a tattoo.', `Name: ${v.name}`, `Contact: ${v.contact} (prefers ${v.method})`, `Idea: ${v.idea}`,
      v.placement && `Placement: ${v.placement}`, v.size && `Approx. size: ${v.size}`, v.timeframe && `Timeframe: ${v.timeframe}`, v.ref && `Reference: ${v.ref}`].filter(Boolean).join('\n');
    window.open(`https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
    note.textContent = 'WhatsApp should open with your message ready. Nothing is sent until you press send there, and no appointment is confirmed until the studio replies.';
  });
}

(async () => {
  injectBackground();
  await Promise.all([
    loadComponent('site-navbar', 'navbar.html', `<header class="nav"><div class="nav-in"><a class="brand" href="${ROOT}">${CONFIG.brand}</a></div></header>`),
    loadComponent('site-footer', 'footer.html', `<footer class="footer-card glass"><div class="f-final"><a href="${ROOT}">${CONFIG.brand}</a></div></footer>`)
  ]);
  fixLinks(); initNav(); initMorph(); initForm();
})();
})();

(() => {
'use strict';
const SRC = document.currentScript ? document.currentScript.src : location.href;
const ROOT = new URL('../../', SRC).href;
const CONFIG = {
  brand: 'Nanashree Tattoo Studio',
  phone: '077449 08089', tel: '+917744908089',
  whatsappNumber: '917744908089', // assumed same as listed phone; confirm it has WhatsApp
  address: 'Kale Colony, 28, near D-Mart, Sasane Nagar, Hadapsar, Pune, Maharashtra 411028',
  hours: 'Closes 10:30 pm (as listed on Google Maps)',
  plusCode: 'FWVM+GG Pune, Maharashtra',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Nanashree+Tattoo+Studio+Kale+Colony+Sasane+Nagar+Hadapsar+Pune',
  social: { instagram: '#', facebook: '#', youtube: '#' }, // replace '#' with real profile URLs
  bookingUrl: ''
};
const $ = (s, r = document) => r.querySelector(s);
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
  scope.querySelectorAll('[data-social]').forEach(a => { const u = CONFIG.social[a.dataset.social] || '#'; a.href = u; if (u !== '#') { a.target = '_blank'; a.rel = 'noopener'; } });
  scope.querySelectorAll('[data-wa]').forEach(a => a.href = 'https://wa.me/' + CONFIG.whatsappNumber);
  scope.querySelectorAll('[data-year]').forEach(e => e.textContent = new Date().getFullYear());
}
function initNav() {
  const nav = $('#nav'); if (!nav) return;
  const btn = $('#burger'), set = o => { nav.classList.toggle('open', o); btn.setAttribute('aria-expanded', o); btn.setAttribute('aria-label', o ? 'Close menu' : 'Open menu'); };
  btn.addEventListener('click', () => set(!nav.classList.contains('open')));
  nav.addEventListener('click', e => { if (e.target.closest('a')) set(false); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') set(false); });
  const norm = u => u.split(/[?#]/)[0].replace(/index\.html$/, '');
  nav.querySelectorAll('.links a').forEach(a => { if (norm(a.href) === norm(location.href)) a.setAttribute('aria-current', 'page'); });
}
function initWhatsApp() {
  const a = document.createElement('a');
  a.className = 'wa'; a.target = '_blank'; a.rel = 'noopener'; a.setAttribute('aria-label', 'Chat on WhatsApp');
  a.href = 'https://wa.me/' + CONFIG.whatsappNumber + '?text=' + encodeURIComponent('Hello, I would like to ask about a tattoo.');
  a.innerHTML = '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 4a12 12 0 0 0-10.3 18.1L4 28l6.1-1.6A12 12 0 1 0 16 4z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M12 10c-.7 0-1.4.8-1.4 2 0 3.2 4.5 7.5 7.7 7.5 1.2 0 2-.8 2-1.5l-2.4-1.3-1 1c-1.5-.6-3-2.1-3.6-3.6l1-1z" fill="currentColor"/></svg><span>Chat on WhatsApp</span>';
  document.body.appendChild(a);
}
function initFilters() {
  const bar = $('.filters'); if (!bar) return;
  bar.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    bar.querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b));
    document.querySelectorAll('.work .tile').forEach(t => t.hidden = b.dataset.f !== 'all' && t.dataset.cat !== b.dataset.f);
  });
}
function initForm() {
  const form = $('#enquiry'); if (!form) return; const note = $('#form-note');
  form.addEventListener('submit', e => {
    e.preventDefault(); if (!form.reportValidity()) return;
    const v = Object.fromEntries(new FormData(form));
    const msg = ['Hello, I would like to ask about a tattoo.', `Name: ${v.name}`, `Contact: ${v.contact} (prefers ${v.method})`, `Idea: ${v.idea}`,
      v.placement && `Placement: ${v.placement}`, v.size && `Approx. size: ${v.size}`, v.timeframe && `Timeframe: ${v.timeframe}`, v.ref && `Reference: ${v.ref}`].filter(Boolean).join('\n');
    window.open(`https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
    note.textContent = 'WhatsApp should open with your message ready. Nothing is sent until you press send there, and no appointment is confirmed until the studio replies.';
  });
}
(async () => {
  await Promise.all([
    loadComponent('site-navbar', 'navbar.html', `<header class="nav glass"><div class="nav-in"><a class="brand" href="${ROOT}">${CONFIG.brand}</a></div></header>`),
    loadComponent('site-footer', 'footer.html', `<footer class="footer-card glass"><div class="f-final"><a href="${ROOT}">${CONFIG.brand}</a></div></footer>`)
  ]);
  fixLinks(); initNav(); initWhatsApp(); initFilters(); initForm();
})();
})();

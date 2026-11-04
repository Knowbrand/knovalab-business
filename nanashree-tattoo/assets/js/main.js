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
  social: {
    instagram: 'https://www.instagram.com/nanashreetattoo5049/',
    linkedin: 'https://www.linkedin.com/in/avinash-kondhalkar-956a763a4/',
    youtube: 'https://www.youtube.com/@Nanashreetattoo5049/'
  },
  bookingUrl: '',
  email: 'nanashree5050@gmail.com',
  emailSubject: 'Tattoo consultation enquiry'
};
// Unique video IDs. short:true = vertical 9:16, false = landscape 16:9. Flip a flag if a clip shows the wrong shape.
const VIDEOS = [
  { id: '5Dyf0w1xC_U', short: true }, { id: 'RNk-tcI0BMs', short: true }, { id: 'hQRlUkbD4gQ', short: true },
  { id: 'wW7DFpNzgyk', short: true }, { id: 'hbXhKOwfFn8', short: true }, { id: 'oOkXLA40eDc', short: true }
];
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
  scope.querySelectorAll('[data-mail]').forEach(a => { a.href = 'mailto:' + CONFIG.email + '?subject=' + encodeURIComponent(CONFIG.emailSubject); if (!a.textContent.trim()) a.textContent = CONFIG.email; });
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
function initEmailBtn() {
  const b = $('#email-send'), form = $('#enquiry'); if (!b || !form) return;
  b.addEventListener('click', () => {
    if (!form.reportValidity()) return;
    const v = Object.fromEntries(new FormData(form));
    const body = ['Hello, I would like to ask about a tattoo.', `Name: ${v.name}`, `Contact: ${v.contact} (prefers ${v.method})`, `Idea: ${v.idea}`,
      v.placement && `Placement: ${v.placement}`, v.size && `Approx. size: ${v.size}`, v.timeframe && `Timeframe: ${v.timeframe}`, v.ref && `Reference: ${v.ref}`].filter(Boolean).join('\n');
    location.href = 'mailto:' + CONFIG.email + '?subject=' + encodeURIComponent(CONFIG.emailSubject) + '&body=' + encodeURIComponent(body);
    $('#form-note').textContent = 'Your email app should open with the message ready. Nothing is sent until you press send there.';
  });
}
function initVideos() {
  const host = $('#work-videos'); if (!host) return;
  const make = (v, n) => {
    const card = document.createElement('div'); card.className = 'vcard' + (v.short ? '' : ' land');
    const b = document.createElement('button'); b.type = 'button'; b.className = 'vp'; b.setAttribute('aria-label', 'Play video ' + (n + 1) + ' (starts muted)');
    b.innerHTML = '<img loading="lazy" decoding="async" alt="" src="https://i.ytimg.com/vi/' + v.id + (v.short ? '/hqdefault.jpg' : '/mqdefault.jpg') + '"><span class="pb"></span>';
    b.addEventListener('click', () => {
      host.querySelectorAll('.vcard.on').forEach(o => { const i = +o.dataset.i; const fresh = make(VIDEOS[i], i); o.replaceWith(fresh); });
      const f = document.createElement('iframe');
      f.src = 'https://www.youtube.com/embed/' + v.id + '?autoplay=1&mute=1&playsinline=1&rel=0&modestbranding=1';
      f.title = 'Studio video ' + (n + 1); f.loading = 'lazy'; f.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen'; f.allowFullscreen = true;
      card.classList.add('on'); card.replaceChildren(f);
    });
    card.dataset.i = n; card.appendChild(b); return card;
  };
  VIDEOS.forEach((v, n) => host.appendChild(make(v, n)));
}
(async () => {
  await Promise.all([
    loadComponent('site-navbar', 'navbar.html', `<header class="nav glass"><div class="nav-in"><a class="brand" href="${ROOT}">${CONFIG.brand}</a></div></header>`),
    loadComponent('site-footer', 'footer.html', `<footer class="footer-card glass"><div class="f-final"><a href="${ROOT}">${CONFIG.brand}</a></div></footer>`)
  ]);
  fixLinks(); initNav(); initWhatsApp(); initFilters(); initForm(); initEmailBtn(); initVideos();
})();
})();

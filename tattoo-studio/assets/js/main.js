(() => {
'use strict';
const SRC = document.currentScript ? document.currentScript.src : location.href;
const ROOT = new URL('../../', SRC).href;

/* ---- Single place for business details. Everything in [brackets] is a placeholder. ---- */
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
  images: [                                 // supporting imagery (inspiration, not confirmed studio work)
    'https://i.pinimg.com/736x/65/c2/72/65c272b9847159c9c537eb050767548f.jpg',
    'https://i.pinimg.com/1200x/ee/68/a5/ee68a5f212c91fb2490d8e89b580cfd0.jpg',
    'https://i.pinimg.com/736x/35/11/63/3511634dda77f08f09d805bca18a0ab8.jpg',
    'https://i.pinimg.com/1200x/84/cb/18/84cb182fe6f0b3ae6a1eb4107d8bccb5.jpg',
    'https://i.pinimg.com/736x/94/50/5b/94505bdc6dcb82779b4c9e335e9322a9.jpg'
  ]
};
const isPlaceholderWA = /^0*$/.test(CONFIG.whatsappNumber);
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a, b, t) => a + (b - a) * t;
const ease = t => t * t * (3 - 2 * t);
const $ = (s, r = document) => r.querySelector(s);

/* ---- Content states shared by the pinned and the stacked layouts ---- */
const IMG = i => CONFIG.images[i];
const REVIEWS = [ // excerpts of Google reviews supplied by the studio's listing
 {n:'Mayank Sanghi',m:'Local Guide · 8 months ago',t:'Nana is a very precise and talented tattoo artist. Fine detailing, clean work, and extremely satisfying results.'},
 {n:'Ashwin Nair',m:'a year ago',t:'The artists were super friendly and the tattoo turned out to be excellent more than I expected. The prices are reasonable too.'},
 {n:'Sachin',m:'5 months ago',t:'After my tattoo faded a little within a week, I contacted them and they immediately asked me to revisit for a touch-up.'}
];
let flatMode = false;
const CHAPTERS = [
 { a:{h:'Tattoo art in Hadapsar.',p:'Nanashree Tattoo Studio is in Kale Colony, Sasane Nagar, near D-Mart. Clients describe friendly artists and careful work.'},
   b:{img:1,alt:'Black and white tattoo artwork, inspiration image'},
   c:{items:['4.9 on Google from 1,274 reviews','Kale Colony, near D-Mart, Hadapsar','Closes 10:30 pm']},
   d:{t:'Call 077449 08089.',cta:'Book a consultation'} },
 { a:{h:'What clients come for.',p:'Based on the studio’s Google listing and reviews.'},
   b:{img:2,alt:'Tattoo style inspiration in black and grey'},
   c:{items:['Name tattoos','Tattoo art','Fine detailing','Touch-ups after healing']},
   d:{t:'Tell the studio your idea.',cta:'Send an enquiry'} },
 { a:{h:'From idea to tattoo.',p:'A typical path from first message to finished piece. Confirm the details with the studio.'},
   b:{img:3,alt:'Tattoo design in progress, inspiration image'},
   c:{ol:1,items:['Share your idea','Agree the design','Choose placement and size','Tattoo session','Aftercare and touch-up if needed']},
   d:{t:'Ask the studio about aftercare.',cta:'Message the studio'} },
 { a:{h:'Art, in Black and Grey.',p:'Inspiration images. The studio’s own photos can replace them.'},
   b:{imgs:[1,4,0],alt:'Tattoo artwork inspiration'},
   c:{items:['Fine detailing','Clean work','Name tattoos']},
   d:{t:'Ask to see recent work.',cta:'Ask about the portfolio'} },
 { a:{h:'Stories Written in Ink.',p:'Selected Google reviews. Rated 4.9 from 1,274 reviews.'},
   b:{review:1},
   c:{items:['Friendly, supportive artists','Touch-up offered when a tattoo faded','Prices reviewers call reasonable']},
   d:{t:'Read all reviews on Google Maps.',cta:'Start a conversation'} },
 { a:{h:'Visit or call.',p:'Kale Colony, 28, near D-Mart, Sasane Nagar, Hadapsar, Pune 411028.'},
   b:{img:0,alt:'Tattoo artwork inspiration'},
   c:{items:[CONFIG.phone,CONFIG.hours,CONFIG.plusCode]},
   d:{t:'Your next chapter starts here.',cta:'Start your consultation'} }
];
const N = CHAPTERS.length;
const ph = (i, alt, c = '') => `<div class="ph ${c}"><img src="${IMG(i)}" alt="${alt}" loading="lazy" decoding="async"></div>`;
const bHTML = c => c.b.imgs ? `<div class="mosaic">${c.b.imgs.map((s, k) => ph(s, c.b.alt, 'm' + k)).join('')}</div>`
  : c.b.review ? `<div class="reviews">${REVIEWS.slice(0, flatMode ? 3 : 2).map(r => `<div class="rv"><p>“${r.t}”</p><small>${r.n} · ${r.m} · Google review</small></div>`).join('')}</div>`
  : ph(c.b.img, c.b.alt);
const cHTML = c => { const t = c.c.ol ? 'ol' : 'ul'; return `<${t} class="list">${c.c.items.map(x => `<li>${x}</li>`).join('')}</${t}>`; };
const dHTML = c => `<p class="dt">${c.d.t}</p><a class="btn" data-cta>${c.d.cta}</a>`;

/* ---- Shell: background, components, links ---- */
function injectBackground() {
  if ($('.bg')) return;
  document.body.insertAdjacentHTML('afterbegin', '<div class="bg" aria-hidden="true"></div><div class="bg-frost" aria-hidden="true"></div><div class="bg-shade" aria-hidden="true"></div><div class="bg-light" aria-hidden="true"></div>');
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
  scope.querySelectorAll('[data-year]').forEach(e => e.textContent = new Date().getFullYear());
  scope.querySelectorAll('[data-social]').forEach(a => a.href = CONFIG.social[a.dataset.social] || '#');
  scope.querySelectorAll('[data-wa]').forEach(a => { a.href = isPlaceholderWA ? '#' : 'https://wa.me/' + CONFIG.whatsappNumber; if (isPlaceholderWA) a.title = 'WhatsApp number not configured yet'; });
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
addEventListener('error', e => { const t = e.target; if (t && t.tagName === 'IMG') { t.style.visibility = 'hidden'; t.parentElement.classList.add('noimg'); } }, true);

/* ---- Homepage: pinned four-card choreography ---- */
const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const isPinned = () => !matchMedia('(max-width: 820px)').matches && !reduced() && innerHeight >= 520;
const KF = [ // [left, top, width, height] per chapter: each card travels and resizes between these
 [[5,18,34,40],[58,16,36,38],[6,16,36,36],[3,16,26,42],[6,16,34,40],[6,18,40,42]],       // A
 [[60,14,34,46],[6,14,32,50],[56,14,38,44],[31,12,38,58],[44,11,50,48],[52,14,42,46]],   // B
 [[5,62,34,30],[6,66,32,28],[6,56,36,38],[71,16,26,42],[6,62,34,30],[6,64,40,28]],       // C
 [[60,64,34,28],[58,60,36,30],[56,62,38,30],[31,74,38,20],[44,62,50,30],[52,64,42,28]]   // D
];
const FINAL = [2, 40, 96, 58];
const ENTER = [[-70, 0], [70, 0], [0, 70], [0, -70]]; // A left, B right, C below, D above

function initHome() {
  const stage = $('#story'); if (!stage) return;
  const pinned = isPinned();
  let t; addEventListener('resize', () => { clearTimeout(t); t = setTimeout(() => { if (isPinned() !== pinned) location.reload(); }, 250); });
  pinned ? buildPinned(stage) : buildFlat(stage);
}
function buildFlat(stage) {
  flatMode = true;
  stage.classList.add('flat');
  stage.innerHTML = CHAPTERS.map(c => `<section class="chap glass"><div class="chap-media${c.b.review ? ' rvm' : ''}">${bHTML(c)}</div><div class="chap-body"><h2>${c.a.h}</h2><p class="mut">${c.a.p}</p>${cHTML(c)}<a class="btn" data-cta>${c.d.cta}</a></div></section>`).join('');
  fixLinks(stage);
  const els = stage.querySelectorAll('.chap');
  if (reduced() || !('IntersectionObserver' in window)) return els.forEach(e => e.classList.add('in'));
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12 });
  els.forEach(e => io.observe(e));
}
function buildPinned(stage) {
  stage.classList.add('pin');
  const set = fn => CHAPTERS.map((c, i) => `<div class="panel" data-i="${i}">${fn(c)}</div>`).join('');
  const html = { a: set(c => `<h2>${c.a.h}</h2><p>${c.a.p}</p>`), b: set(bHTML), c: set(cHTML), d: set(dHTML) };
  const sticky = document.createElement('div'); sticky.className = 'sticky';
  sticky.innerHTML = ['a', 'b', 'c'].map(k => `<article class="card glass card-${k}">${html[k]}</article>`).join('');
  // Card D IS the shared footer element: it is moved here, morphs, and stays as the footer.
  let d = $('.footer-card'); if (!d) { d = document.createElement('footer'); d.className = 'footer-card glass'; d.innerHTML = '<div class="f-final"></div>'; }
  d.classList.add('card', 'card-d', 'in-stage'); d.insertAdjacentHTML('afterbegin', html.d);
  sticky.appendChild(d); stage.appendChild(sticky); fixLinks(sticky);
  const cards = [...sticky.querySelectorAll('.card')], fin = $('.f-final', d);
  const pan = cards.map(c => [...c.querySelectorAll(':scope > .panel')]);
  let range = 1, tick = false;
  const measure = () => { range = Math.max(1, stage.offsetHeight - innerHeight); frame(); };
  const frame = () => {
    tick = false;
    const raw = -stage.getBoundingClientRect().top / range, span = innerHeight / range;
    const q = clamp((raw - .84) / .14), qe = ease(q);               // footer morph progress
    const f = clamp((raw - .03) / .81) * N;                          // chapter position 0..N
    const u = clamp(f - .5, 0, N - 1), i0 = Math.min(Math.floor(u), N - 2), fr = u - i0;
    cards.forEach((card, ci) => {
      const e = 1 - Math.pow(1 - clamp((raw - (-span * .75 + ci * .012)) / (span * .7)), 3);
      const exit = ci < 3 ? qe : 0, op = e * (1 - clamp(exit * 1.6));
      card.style.opacity = op; card.style.visibility = op < .01 ? 'hidden' : 'visible';
      card.style.transform = `translate3d(${ENTER[ci][0] * (1 - e)}px,${ENTER[ci][1] * (1 - e) - exit * 40}px,0)`;
      const t = ease(clamp((fr - .18 - ci * .04) / .56));
      let r = KF[ci][i0].map((v, k) => lerp(v, KF[ci][i0 + 1][k], t));
      if (ci === 3) r = r.map((v, k) => lerp(v, FINAL[k], qe));
      card.style.left = r[0] + '%'; card.style.top = r[1] + '%'; card.style.width = r[2] + '%'; card.style.height = r[3] + '%';
      pan[ci].forEach((p, i) => {
        const mid = i + .5, edge = (i === 0 && f < mid) || (i === N - 1 && f > mid);
        let o = clamp((.5 - (edge ? 0 : Math.abs(f - mid))) / .14);
        if (ci === 3 && i === N - 1) o *= 1 - clamp(q * 2.2);
        p.style.opacity = o; p.style.visibility = o < .02 ? 'hidden' : 'visible';
        const dy = edge ? 0 : clamp(mid - f, -.5, .5) * 40;
        p.style.transform = `translate3d(0,${dy}px,0)`;
        p.style.filter = o < .98 ? `blur(${(1 - o) * 6}px)` : '';
      });
    });
    const fo = clamp((q - .55) * 2.2); fin.style.opacity = fo; fin.style.visibility = fo < .02 ? 'hidden' : 'visible';
  };
  addEventListener('scroll', () => { if (!tick) { tick = true; requestAnimationFrame(frame); } }, { passive: true });
  addEventListener('resize', measure); measure();
}

/* ---- Contact form: honest WhatsApp flow, no backend ---- */
function initForm() {
  const form = $('#enquiry'); if (!form) return;
  const note = $('#form-note');
  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const v = Object.fromEntries(new FormData(form));
    const msg = ['Hello, I would like to ask about a tattoo.', `Name: ${v.name}`, `Contact: ${v.contact} (prefers ${v.method})`, `Idea: ${v.idea}`,
      v.placement && `Placement: ${v.placement}`, v.size && `Approx. size: ${v.size}`, v.timeframe && `Timeframe: ${v.timeframe}`, v.ref && `Reference: ${v.ref}`].filter(Boolean).join('\n');
    if (isPlaceholderWA) { note.textContent = 'Demo mode: no WhatsApp number is configured yet, so nothing was opened or sent. This is the message that would be prepared:\n\n' + msg; return; }
    window.open(`https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
    note.textContent = 'WhatsApp should open with your message ready. Nothing is sent until you press send there, and no appointment is confirmed until the studio replies.';
  });
}

/* ---- Background drifts up and slowly zooms with scroll so the scene feels alive ---- */
function initBgMotion() {
  const bg = $('.bg'); if (!bg || reduced()) return; let t = false;
  const upd = () => { t = false; const max = Math.max(1, document.documentElement.scrollHeight - innerHeight), p = clamp(scrollY / max);
    bg.style.transform = `translate3d(0,${-Math.min(scrollY * .14, innerHeight * .6)}px,0) scale(${1 + p * .22})`; };
  addEventListener('scroll', () => { if (!t) { t = true; requestAnimationFrame(upd); } }, { passive: true }); upd();
}
/* ---- Boot ---- */
(async () => {
  injectBackground();
  await Promise.all([
    loadComponent('site-navbar', 'navbar.html', `<header class="nav"><div class="nav-in"><a class="brand" href="${ROOT}">${CONFIG.brand}</a></div></header>`),
    loadComponent('site-footer', 'footer.html', `<footer class="footer-card glass"><div class="f-final"><a href="${ROOT}">${CONFIG.brand}</a></div></footer>`)
  ]);
  fixLinks(); initNav(); initHome(); initForm(); initBgMotion();
})();
})();

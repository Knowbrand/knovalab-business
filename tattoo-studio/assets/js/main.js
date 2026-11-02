(() => {
'use strict';
const SRC = document.currentScript ? document.currentScript.src : location.href;
const ROOT = new URL('../../', SRC).href;

/* ---- Single place for business details. Everything in [brackets] is a placeholder. ---- */
const CONFIG = {
  brand: 'INK / FORM',
  phone: '[PHONE NUMBER]',
  whatsappNumber: '00000000000',            // placeholder: digits only, with country code
  address: '[STUDIO ADDRESS]',
  hours: '[OPENING HOURS]',
  social: { instagram: '#' },
  bookingUrl: '',                           // optional: CTAs go here instead of /contact/
  images: [                                 // supporting photography (swap order freely)
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
const CHAPTERS = [
 { a:{h:'Every Line Has a Story.',p:'A tattoo starts as a thought, a memory or a feeling. Here it becomes a design made around you.'},
   b:{img:1,alt:'Black and white tattoo artwork, portfolio inspiration'},
   c:{items:['Concepts shaped around your idea','Placement planned with you','A conversation before any session']},
   d:{t:'Bring an idea or a reference.',cta:'Book a consultation'} },
 { a:{h:'Find Your Style.',p:'Sample categories for this demo. The studio’s real specialties replace them.'},
   b:{img:2,alt:'Tattoo style inspiration in black and grey'},
   c:{items:['Fine line','Blackwork','Realism','Minimalist','Geometric','Custom designs']},
   d:{t:'Not sure which fits?',cta:'Ask in a consultation'} },
 { a:{h:'Designed Around You.',p:'From first message to finished piece, in five steps.'},
   b:{img:3,alt:'Tattoo design in progress, inspiration image'},
   c:{ol:1,items:['Consultation','Concept and design','Placement and refinement','Tattoo session','Aftercare guidance']},
   d:{t:'Aftercare advice comes from your artist.',cta:'Ask about the process'} },
 { a:{h:'Art, in Black and Grey.',p:'Portfolio inspiration, shown as visual reference rather than confirmed studio work.'},
   b:{imgs:[1,4,0],alt:'Tattoo artwork inspiration'},
   c:{items:['Fine detail','Bold contrast','Considered composition']},
   d:{t:'Studio portfolio coming soon.',cta:'Ask about the portfolio'} },
 { a:{h:'Stories Written in Ink.',p:'Real client reviews will appear here once the studio provides them.'},
   b:{review:1},
   c:{items:['Clear communication','Designs approved before inking','Unhurried, respectful sessions']},
   d:{t:'Review profile link goes here.',cta:'Start a conversation'} },
 { a:{h:'Let’s Create Something Personal.',p:'Bring an idea, a reference, or just a feeling. Start a conversation about your next tattoo.'},
   b:{img:0,alt:'Tattoo artwork inspiration'},
   c:{items:[CONFIG.phone,CONFIG.address,CONFIG.hours]},
   d:{t:'Your next chapter starts here.',cta:'Start your consultation'} }
];
const N = CHAPTERS.length;
const ph = (i, alt, c = '') => `<div class="ph ${c}"><img src="${IMG(i)}" alt="${alt}" loading="lazy" decoding="async"></div>`;
const bHTML = c => c.b.imgs ? `<div class="mosaic">${c.b.imgs.map((s, k) => ph(s, c.b.alt, 'm' + k)).join('')}</div>`
  : c.b.review ? `<div class="reviews"><div class="rv"><b aria-hidden="true">☆☆☆☆☆</b>Demo placeholder. A real client review goes here.</div><div class="rv"><b aria-hidden="true">☆☆☆☆☆</b>Demo placeholder. Link to the studio’s review profile.</div></div>`
  : ph(c.b.img, c.b.alt);
const cHTML = c => { const t = c.c.ol ? 'ol' : 'ul'; return `<${t} class="list">${c.c.items.map(x => `<li>${x}</li>`).join('')}</${t}>`; };
const dHTML = c => `<p class="dt">${c.d.t}</p><a class="btn" data-cta>${c.d.cta}</a>`;

/* ---- Shell: background, components, links ---- */
function injectBackground() {
  if ($('.bg')) return;
  document.body.insertAdjacentHTML('afterbegin', '<div class="bg" aria-hidden="true"></div><div class="bg-shade" aria-hidden="true"></div><div class="bg-light" aria-hidden="true"></div>');
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
const ENTER = [[-70, 0], [70, 0], [0, 70], [0, -70]]; // A left, B right, C below, D above

function initHome() {
  const stage = $('#story'); if (!stage) return;
  const pinned = isPinned();
  let t; addEventListener('resize', () => { clearTimeout(t); t = setTimeout(() => { if (isPinned() !== pinned) location.reload(); }, 250); });
  pinned ? buildPinned(stage) : buildFlat(stage);
}
function buildFlat(stage) {
  stage.classList.add('flat');
  stage.innerHTML = CHAPTERS.map(c => `<section class="chap glass"><div class="chap-media">${bHTML(c)}</div><div class="chap-body"><h2>${c.a.h}</h2><p class="mut">${c.a.p}</p>${cHTML(c)}<a class="btn" data-cta>${c.d.cta}</a></div></section>`).join('');
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
    cards.forEach((card, ci) => {
      const e = 1 - Math.pow(1 - clamp((raw - (-span * .75 + ci * .012)) / (span * .7)), 3);
      const exit = ci < 3 ? qe : 0, op = e * (1 - clamp(exit * 1.6));
      card.style.opacity = op; card.style.visibility = op < .01 ? 'hidden' : 'visible';
      card.style.transform = `translate3d(${ENTER[ci][0] * (1 - e)}px,${ENTER[ci][1] * (1 - e) - exit * 40}px,0)`;
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
    d.style.setProperty('--l', lerp(63, 2, qe) + '%'); d.style.setProperty('--t', lerp(65, 40, qe) + '%');
    d.style.setProperty('--w', lerp(33, 96, qe) + '%'); d.style.setProperty('--h', lerp(27, 58, qe) + '%');
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

/* ---- Boot ---- */
(async () => {
  injectBackground();
  await Promise.all([
    loadComponent('site-navbar', 'navbar.html', `<header class="nav"><div class="nav-in"><a class="brand" href="${ROOT}">${CONFIG.brand}</a></div></header>`),
    loadComponent('site-footer', 'footer.html', `<footer class="footer-card glass"><div class="f-final"><a href="${ROOT}">${CONFIG.brand}</a></div></footer>`)
  ]);
  fixLinks(); initNav(); initHome(); initForm();
})();
})();

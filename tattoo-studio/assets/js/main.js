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
  social: { instagram: '#', facebook: '#', youtube: '#' },   // replace '#' with the real profile URLs
  bookingUrl: '',
};
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a, b, t) => a + (b - a) * t;
const ease = t => t * t * (3 - 2 * t);
const $ = (s, r = document) => r.querySelector(s);
const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

let LINES = [];
function genLines() { // random bent polylines in a 0..1000 space
  const n = innerWidth < 700 ? 5 : 7;
  LINES = Array.from({ length: n }, () => {
    const segs = 2 + Math.floor(Math.random() * 3); let x = -60, y = 80 + Math.random() * 840; const pts = [[x, y]];
    for (let k = 0; k < segs; k++) { x += (1120 / segs) * (.7 + Math.random() * .6); y = clamp(y + (Math.random() - .5) * 520, -60, 1060); pts.push([Math.min(x, 1060), y]); }
    pts.push([1100, clamp(y + (Math.random() - .5) * 200, -60, 1060)]);
    return pts;
  });
}
function injectBackground() {
  if ($('.bg')) return; genLines();
  const lns = LINES.map(pts => {
    const d = 'M' + pts.map(p => p.join(' ')).join('L'), r = (a, b) => (a + Math.random() * (b - a)).toFixed(1);
    return `<div class="ln" style="--d:${r(9, 17)}s;--rd:${r(5, 10)}s;--dl:-${r(0, 8)}s"><svg viewBox="0 0 1000 1000" preserveAspectRatio="none"><path class="g" d="${d}"/><path class="c" d="${d}"/><path class="r" pathLength="1" d="${d}"/></svg></div>`;
  }).join('');
  document.body.insertAdjacentHTML('afterbegin', `<div class="bg" aria-hidden="true"><i class="orb o1"></i><i class="orb o2"></i><i class="orb o3"></i>${lns}</div>`);
}
/* intro runs on the landing page only: first visit of the session, or a reload */
function gate() {
  let seen = false; try { seen = !!sessionStorage.getItem('nl-seen'); sessionStorage.setItem('nl-seen', '1'); } catch {}
  const nav = performance.getEntriesByType && performance.getEntriesByType('navigation')[0];
  return !!$('#loader') && !reduced() && (!seen || (nav && nav.type === 'reload'));
}
/* loader: lines fly in, bundle into one beam, scramble out and settle onto the background lines */
function playLoader() {
  const el = $('#loader'); document.documentElement.classList.add('loading');
  return new Promise(done => {
    const cv = document.createElement('canvas'), ctx = cv.getContext('2d'); cv.style.cssText = 'display:block;width:100%;height:100%'; el.appendChild(cv);
    const dpr = Math.min(devicePixelRatio || 1, 2); let W, H;
    const fit = () => { W = cv.width = innerWidth * dpr; H = cv.height = innerHeight * dpr; }; fit(); addEventListener('resize', fit);
    const n = LINES.length, rnd = Math.random;
    const S = LINES.map(l => l.map(() => [rnd() * 1500 - 250, rnd() * 1500 - 250]));
    const C = LINES.map((l, i) => l.map((p, k) => [180 + k / (l.length - 1) * 640, 500 + (i - (n - 1) / 2) * 6]));
    const seed = LINES.map(l => l.map(() => rnd() * 6.28));
    const T0 = 1500, T1 = 1950, T2 = 3150; let t0 = null, done_ = false;
    const finish = () => { if (done_) return; done_ = true; el.classList.add('out'); $('.bg').classList.add('on'); document.documentElement.classList.remove('loading'); setTimeout(() => el.remove(), 900); done(); };
    setTimeout(finish, 6000);
    const step = ts => {
      if (t0 === null) t0 = ts; const t = ts - t0;
      ctx.clearRect(0, 0, W, H); ctx.lineJoin = ctx.lineCap = 'round';
      LINES.forEach((l, i) => {
        let A, B, e, amp, alpha, glow;
        if (t < T0) { A = S[i]; B = C[i]; e = ease(clamp((t - i * 40) / (T0 - 300))); amp = (1 - e) * 25; alpha = .25 + .6 * e; glow = e; }
        else if (t < T1) { A = B = C[i]; e = 1; amp = 0; alpha = 1; glow = 1; }
        else { A = C[i]; B = l; e = ease(clamp((t - T1 - i * 70) / (T2 - T1 - 300))); amp = Math.sin(e * Math.PI) * 80; alpha = 1 - .6 * e; glow = 1 - e; }
        ctx.beginPath();
        A.forEach((p, k) => {
          const x = lerp(p[0], B[k][0], e) + Math.sin(t / 90 + seed[i][k]) * amp, y = lerp(p[1], B[k][1], e) + Math.cos(t / 80 + seed[i][k]) * amp;
          k ? ctx.lineTo(x * W / 1000, y * H / 1000) : ctx.moveTo(x * W / 1000, y * H / 1000);
        });
        ctx.strokeStyle = `rgba(255,255,255,${alpha})`; ctx.lineWidth = 1.3 * dpr; ctx.shadowColor = '#fff'; ctx.shadowBlur = (6 + 16 * glow) * dpr; ctx.stroke();
      });
      if (t > T2 - 450) finish();
      if (el.isConnected) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });
}
/* "tattooed" button text: letters ink in one by one behind a buzzing needle */
function prepInk(btn) {
  if (!btn) return; const txt = btn.textContent.trim(); btn.setAttribute('aria-label', txt); btn.style.setProperty('--dur', txt.length * 75 + 500 + 'ms');
  btn.innerHTML = `<span aria-hidden="true">${[...txt].map((c, i) => `<span class="ch" style="--i:${i}">${c}</span>`).join('')}</span><i class="needle" aria-hidden="true"></i>`;
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
  scope.querySelectorAll('[data-social]').forEach(a => { const u = CONFIG.social[a.dataset.social] || '#'; a.href = u; if (u !== '#') { a.target = '_blank'; a.rel = 'noopener'; } });
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
  const intro = gate(), ink = $('.btn-ink');
  injectBackground();
  if (intro) prepInk(ink); else { const l = $('#loader'); if (l) l.remove(); $('.bg').classList.add('on'); }
  const introDone = intro ? playLoader() : Promise.resolve();
  await Promise.all([
    loadComponent('site-navbar', 'navbar.html', `<header class="nav glass"><div class="nav-in"><a class="brand" href="${ROOT}">${CONFIG.brand}</a></div></header>`),
    loadComponent('site-footer', 'footer.html', `<footer class="footer-card glass"><div class="f-final"><a href="${ROOT}">${CONFIG.brand}</a></div></footer>`)
  ]);
  fixLinks(); initNav(); initMorph(); initForm();
  await introDone;
  if (intro && ink) ink.classList.add('go');
})();
})();

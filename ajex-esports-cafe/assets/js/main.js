(() => {
'use strict';
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const GE = window.GE, root = document.documentElement;
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
/* theme */
const tb = $('#theme');
function setTheme(t, save) {
  root.dataset.theme = t; if (save) try { localStorage.setItem('ajex-theme', t); } catch {}
  tb.innerHTML = GE.ic(t === 'dark' ? 'sun' : 'moon'); tb.setAttribute('aria-label', t === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
}
setTheme(root.dataset.theme === 'light' ? 'light' : 'dark');
tb.addEventListener('click', () => setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark', true));
/* drawer */
const burger = $('#burger'), side = $('#sidebar');
const drawer = o => { document.body.classList.toggle('drawer', o); burger.setAttribute('aria-expanded', o); burger.setAttribute('aria-label', o ? 'Close menu' : 'Open menu'); };
burger.addEventListener('click', () => drawer(!document.body.classList.contains('drawer')));
$('#scrim').addEventListener('click', () => drawer(false));
side.addEventListener('click', e => { if (e.target.closest('a')) drawer(false); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') drawer(false); });
/* booking dialog */
const dlg = $('#book');
document.addEventListener('click', e => {
  if (e.target.closest('[data-book]')) { dlg.showModal(); }
  if (e.target.closest('[data-close]') || e.target === dlg) dlg.close();
});
/* inquiry forms -> WhatsApp */
$$('form[data-inquiry]').forEach(f => f.addEventListener('submit', e => {
  e.preventDefault(); const m = $('.msg', f); m.className = 'msg';
  if (!f.reportValidity()) { m.classList.add('err'); m.textContent = 'Please fill in your name, platform and number of players.'; return; }
  const v = Object.fromEntries(new FormData(f));
  const when = v.when ? new Date(v.when).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }) : '';
  const text = ["Hi Ajex Esports Cafe! I'd like to make a gaming session inquiry.", `Name: ${v.name}`, `Platform: ${v.platform}`, v.game && `Preferred game: ${v.game}`, `Players: ${v.players}`, when && `Preferred time: ${when}`, v.msg && `Message: ${v.msg}`, 'Please confirm availability and pricing.'].filter(Boolean).join('\n');
  window.open(GE.waLink(text), '_blank', 'noopener');
  m.textContent = 'WhatsApp should open with your message. Your session is confirmed only after the team replies.';
}));
/* reveal + counters + active nav */
const count = el => {
  const end = parseFloat(el.dataset.count), d = +el.dataset.dec || 0; if (reduce) return el.textContent = end.toFixed(d);
  const t0 = performance.now(); (function s(t) { const p = Math.min(1, (t - t0) / 1200); el.textContent = (end * (1 - Math.pow(1 - p, 3))).toFixed(d); if (p < 1) requestAnimationFrame(s); })(t0);
};
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); $$('[data-count]', e.target).forEach(count); io.unobserve(e.target); } }), { threshold: .12 });
$$('.rv').forEach((el, i) => { el.style.transitionDelay = Math.min(i % 4, 3) * 60 + 'ms'; io.observe(el); });
const links = $$('.nav a[data-n]'), secs = $$('main section[id]');
if (secs.length && root.dataset.page !== 'about' && document.body.dataset.page === 'home') {
  const so = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) links.forEach(a => { const on = a.dataset.n === e.target.id; a.classList.toggle('on', on); on ? a.setAttribute('aria-current', 'true') : a.removeAttribute('aria-current'); }); }), { rootMargin: '-40% 0px -55% 0px' });
  secs.forEach(s => so.observe(s));
}
})();

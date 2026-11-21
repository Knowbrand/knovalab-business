/* Aadat Se Gareeb — shared behaviour: mobile menu + registration deadline state.
   Deadline assumption: registration closes at the end of 15 Dec 2026, India time (23:59:59 IST).
   NOTE: this only changes what visitors SEE. Real enforcement = disable the form in the provider dashboard. */
(function () {
  var root = document.documentElement;
  root.classList.remove('no-js'); root.classList.add('js');

  var DEADLINE = new Date('2026-12-15T23:59:59+05:30');
  window.ASG_REG_CLOSED = Date.now() > DEADLINE.getTime();

  var btn = document.querySelector('.menu-btn');
  var list = document.getElementById('nav-list');
  if (btn && list) {
    btn.addEventListener('click', function () {
      var open = list.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.textContent = open ? 'Close' : 'Menu';
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && list.classList.contains('open')) { btn.click(); btn.focus(); }
    });
  }

  if (window.ASG_REG_CLOSED) {
    root.classList.add('is-closed');
    document.querySelectorAll('[data-open-text]').forEach(function (el) {
      el.textContent = el.getAttribute('data-closed-text') || 'Panel registration is closed.';
    });
  }
})();

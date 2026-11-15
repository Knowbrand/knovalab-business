(function () {
  var script = document.currentScript;
  var base = new URL('../../', script.src).href; // site root; works locally and on sub-path hosts

  function load(mountId, file) {
    var mount = document.getElementById(mountId);
    if (!mount) return Promise.resolve(false);
    return fetch(base + 'assets/components/' + file)
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.text(); })
      .then(function (html) { mount.innerHTML = html.split('{{base}}').join(base); return true; })
      .catch(function () {
        mount.innerHTML = '<nav class="wrap fallback" aria-label="' + (file === 'footer.html' ? 'Footer' : 'Main') + '"><a href="' + base + '">Home</a> <a href="' + base + 'about/">About Us</a> <a href="' + base + 'contact/">Contact</a></nav>';
        return false;
      });
  }

  function initNav() {
    var page = document.body.dataset.page;
    document.querySelectorAll('[data-nav]').forEach(function (a) {
      if (a.dataset.nav === page) a.setAttribute('aria-current', 'page');
    });
    var btn = document.querySelector('.nav-toggle'), menu = document.getElementById('nav-menu');
    if (!btn || !menu) return;
    function set(open) {
      btn.setAttribute('aria-expanded', open);
      btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      menu.classList.toggle('open', open);
    }
    btn.addEventListener('click', function () { set(btn.getAttribute('aria-expanded') !== 'true'); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('open')) { set(false); btn.focus(); }
    });
    menu.addEventListener('click', function (e) { if (e.target.tagName === 'A') set(false); });
    var nav = document.querySelector('.nav');
    function scrolled() { nav.classList.toggle('scrolled', window.scrollY > 10); }
    scrolled(); window.addEventListener('scroll', scrolled, { passive: true });
  }

  function initFooter() { var y = document.getElementById('yr'); if (y) y.textContent = new Date().getFullYear(); }

  function initForm() {
    var form = document.getElementById('enquiry');
    if (!form) return;
    var status = document.getElementById('form-status');
    function f(id) { return form.elements[id]; }
    function err(id, msg) {
      document.getElementById('e-' + id).textContent = msg || '';
      f(id).setAttribute('aria-invalid', msg ? 'true' : 'false');
      return !msg;
    }
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var phone = f('phone').value.replace(/[\s\-()]/g, '');
      var ok = [
        err('name', f('name').value.trim() ? '' : 'Enter your name.'),
        err('phone', /^\+?\d{10,13}$/.test(phone) ? '' : 'Enter a valid phone number.'),
        err('email', !f('email').value || f('email').validity.valid ? '' : 'Enter a valid email address.'),
        err('type', f('type').value ? '' : 'Choose an enquiry type.'),
        err('message', f('message').value.trim() ? '' : 'Write a short message.')
      ].every(Boolean);
      status.className = 'status';
      if (!ok) {
        status.textContent = 'Please fix the highlighted fields.'; status.classList.add('bad');
        form.querySelector('[aria-invalid="true"]').focus(); return;
      }
      var lines = ['Hello Veltrix, I would like to make an enquiry.', 'Name: ' + f('name').value.trim(), 'Phone: ' + f('phone').value.trim()];
      if (f('email').value) lines.push('Email: ' + f('email').value.trim());
      lines.push('Enquiry type: ' + f('type').value, 'Message: ' + f('message').value.trim());
      window.open('https://wa.me/919767155367?text=' + encodeURIComponent(lines.join('\n')), '_blank', 'noopener');
      status.textContent = 'WhatsApp should now be open with your message ready. Press send there to reach us.';
      status.classList.add('good');
    });
  }

  // Pinterest sizes, best first. If a larger file 404s, step down instead of hiding the image.
  var LADDER = ['originals', '1200x', '736x', '564x', '474x'];
  function lower(u) {
    var m = /^(https:\/\/i\.pinimg\.com\/)(originals|\d+x)(\/.+)$/.exec(u || '');
    if (!m) return null;
    var i = LADDER.indexOf(m[2]);
    return (i < 0 || i === LADDER.length - 1) ? null : m[1] + LADDER[i + 1] + m[3];
  }

  function initImages() {
    document.querySelectorAll('img').forEach(function (img) {
      function onFail() {
        var cur = img.currentSrc || img.getAttribute('src'), next = lower(cur);
        if (!next) { img.classList.add('img-failed'); return; }
        var pic = img.parentElement;
        if (pic && pic.tagName === 'PICTURE') {
          pic.querySelectorAll('source').forEach(function (s) { if (s.getAttribute('srcset') === cur) s.setAttribute('srcset', next); });
        }
        if (img.getAttribute('src') === cur) img.setAttribute('src', next);
      }
      img.addEventListener('error', onFail);
      if (img.complete && img.naturalWidth === 0 && img.getAttribute('src')) onFail();
    });
  }

  Promise.all([load('site-navbar', 'navbar.html'), load('site-footer', 'footer.html')]).then(function () {
    initNav(); initFooter(); initForm(); initImages();
  });
})();

// Pointer spotlight on cards
document.addEventListener('pointermove', function (e) {
  var c = e.target.closest && e.target.closest('.fx');
  if (!c) return;
  var r = c.getBoundingClientRect();
  c.style.setProperty('--mx', (e.clientX - r.left) + 'px');
  c.style.setProperty('--my', (e.clientY - r.top) + 'px');
}, { passive: true });

// Scroll progress line + reveal-on-scroll + rating count-up
(function () {
  var root = document.documentElement;
  function progress() {
    var h = root.scrollHeight - window.innerHeight;
    root.style.setProperty('--p', h > 0 ? Math.min(window.scrollY / h, 1).toFixed(3) : 0);
  }
  progress(); window.addEventListener('scroll', progress, { passive: true });

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
  root.classList.add('js');
  var targets = '.intro>*,.sec-title,.b,.why-head,.w,.trust-in>*,.cta-card,.page-head>*,.about-img,.card,.cta>*,.hairline,.marquee,.info,.form';
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      en.target.classList.add('in'); io.unobserve(en.target);
      var n = en.target.querySelector && en.target.querySelector('[data-count]');
      if (n) countUp(n);
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -6% 0px' });
  document.querySelectorAll(targets).forEach(function (el) {
    var i = el.parentElement ? Array.prototype.indexOf.call(el.parentElement.children, el) : 0;
    el.style.setProperty('--d', (i % 4) * 90 + 'ms');
    el.classList.add('rv'); io.observe(el);
  });
  function countUp(n) {
    var end = parseFloat(n.dataset.count), t0 = null;
    function step(t) {
      if (!t0) t0 = t;
      var k = Math.min((t - t0) / 1400, 1);
      n.textContent = (end * (1 - Math.pow(1 - k, 3))).toFixed(1);
      if (k < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
})();

// Floating WhatsApp button (shared across all pages)
(function () {
  var a = document.createElement('a');
  a.className = 'wa-fab';
  a.href = 'https://wa.me/919767155367';
  a.target = '_blank'; a.rel = 'noopener';
  a.setAttribute('aria-label', 'Chat with Veltrix on WhatsApp');
  a.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 21l1.65-4.9A9 9 0 1 1 8 19.4z"/><path d="M9.2 8.6c.3 2.2 2.6 4.5 4.8 5.2l1.2-1.3-1.9-1-.9.7c-.8-.4-1.5-1.1-1.9-1.9l.7-.9-1-1.9z"/></svg>';
  document.body.appendChild(a);
})();

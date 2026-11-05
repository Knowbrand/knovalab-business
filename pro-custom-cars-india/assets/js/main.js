(function () {
  var script = document.currentScript;
  var base = new URL('../../', script.src).href; // site root; explicit index.html so it also works from file://
  var page = document.body.dataset.page;
  var WA = 'https://wa.me/917011897858';
  var MAPS = 'https://www.google.com/maps/search/?api=1&query=Pro-Custom+Cars+India+A13D+Road+No+33+Block+B+Paschim+Puri+Punjabi+Bagh+Delhi+110026';
  var home = base + 'index.html', about = base + 'about/index.html', contact = base + 'contact/index.html';

  // ---- Shared navbar and footer (single source for every page)
  var nav = document.getElementById('site-navbar');
  if (nav) nav.innerHTML =
    '<header class="nav"><div class="wrap nav-in">' +
    '<a class="wordmark" href="' + home + '" aria-label="Pro-Custom Car’s India, home">Pro-Custom Car’s India</a>' +
    '<button class="nav-toggle" type="button" aria-expanded="false" aria-controls="nav-menu" aria-label="Open menu"><span></span><span></span></button>' +
    '<nav id="nav-menu" class="nav-menu" aria-label="Main">' +
    '<a href="' + home + '" data-nav="home">Home</a>' +
    '<a href="' + home + '#services" data-nav="services">Services</a>' +
    '<a href="' + about + '" data-nav="about">About</a>' +
    '<a href="' + contact + '" data-nav="contact">Contact</a>' +
    '<a class="pill" href="' + WA + '" target="_blank" rel="noopener">WhatsApp</a>' +
    '</nav></div></header>';

  var foot = document.getElementById('site-footer');
  if (foot) foot.innerHTML =
    '<footer class="foot"><div class="wrap foot-grid"><div>' +
    '<a class="wordmark" href="' + home + '">Pro-Custom Car’s India</a><p class="hi" lang="hi">प्रो-कस्टम कार्स इंडिया</p>' +
    '<p class="muted">Car accessories store in Punjabi Bagh, Delhi.</p></div>' +
    '<nav aria-label="Footer"><a href="' + home + '">Home</a><a href="' + home + '#services">Services</a><a href="' + about + '">About</a><a href="' + contact + '">Contact</a></nav>' +
    '<div><a href="tel:+917011897858">+91 70118 97858</a><a href="' + WA + '" target="_blank" rel="noopener">WhatsApp</a>' +
    '<address>A/13/D, Road No. 33, Block B, Paschim Puri, Punjabi Bagh, Delhi 110026, India</address>' +
    '<a href="' + MAPS + '" target="_blank" rel="noopener">Get directions</a></div></div>' +
    '<p class="wrap copy">&copy; ' + new Date().getFullYear() + ' Pro-Custom Car’s India</p></footer>';

  // ---- Nav behaviour
  var cur = document.querySelector('[data-nav="' + page + '"]');
  if (cur) cur.setAttribute('aria-current', 'page');
  var btn = document.querySelector('.nav-toggle'), menu = document.getElementById('nav-menu');
  if (btn && menu) {
    var setMenu = function (open) {
      btn.setAttribute('aria-expanded', open);
      btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      menu.classList.toggle('open', open);
    };
    btn.addEventListener('click', function () { setMenu(btn.getAttribute('aria-expanded') !== 'true'); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('open')) { setMenu(false); btn.focus(); }
    });
    menu.addEventListener('click', function (e) { if (e.target.tagName === 'A') setMenu(false); });
  }

  // ---- Enquiry form (contact page): prepares a WhatsApp message, nothing is sent from here
  var form = document.getElementById('enquiry');
  if (form) {
    var status = document.getElementById('form-status');
    var f = function (id) { return form.elements[id]; };
    var err = function (id, msg) {
      document.getElementById('e-' + id).textContent = msg || '';
      f(id).setAttribute('aria-invalid', msg ? 'true' : 'false');
      return !msg;
    };
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var phone = f('phone').value.replace(/[\s\-()]/g, '');
      var ok = [
        err('name', f('name').value.trim() ? '' : 'Enter your name.'),
        err('phone', /^\+?\d{10,13}$/.test(phone) ? '' : 'Enter a valid phone number.'),
        err('type', f('type').value ? '' : 'Choose a service.'),
        err('message', f('message').value.trim() ? '' : 'Write a short message.')
      ].every(Boolean);
      status.className = 'status';
      if (!ok) {
        status.textContent = 'Please fix the highlighted fields.'; status.classList.add('bad');
        form.querySelector('[aria-invalid="true"]').focus(); return;
      }
      var lines = ['Hello Pro-Custom Car’s India, I would like to make an enquiry.', 'Name: ' + f('name').value.trim(), 'Phone: ' + f('phone').value.trim(), 'Service: ' + f('type').value, 'Message: ' + f('message').value.trim()];
      window.open(WA + '?text=' + encodeURIComponent(lines.join('\n')), '_blank', 'noopener');
      status.textContent = 'WhatsApp should now be open with your message ready. Press send there to reach us.';
      status.classList.add('good');
    });
  }

  // ---- Image fallback: if a larger Pinterest size 404s, step down instead of hiding the image
  var LADDER = ['originals', '1200x', '736x', '564x', '474x'];
  function lower(u) {
    var m = /^(https:\/\/i\.pinimg\.com\/)(originals|\d+x)(\/.+)$/.exec(u || '');
    if (!m) return null;
    var i = LADDER.indexOf(m[2]);
    return (i < 0 || i === LADDER.length - 1) ? null : m[1] + LADDER[i + 1] + m[3];
  }
  document.querySelectorAll('img').forEach(function (img) {
    function onFail() {
      var cur = img.currentSrc || img.getAttribute('src'), next = lower(cur);
      if (next) img.setAttribute('src', next); else img.classList.add('img-failed');
    }
    img.addEventListener('error', onFail);
    if (img.complete && img.naturalWidth === 0 && img.getAttribute('src')) onFail();
  });

  // ---- Card spotlight
  document.addEventListener('pointermove', function (e) {
    var c = e.target.closest && e.target.closest('.fx');
    if (!c) return;
    var r = c.getBoundingClientRect();
    c.style.setProperty('--mx', (e.clientX - r.left) + 'px');
    c.style.setProperty('--my', (e.clientY - r.top) + 'px');
  }, { passive: true });

  // ---- Reveal on scroll
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
  document.documentElement.classList.add('js');
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
  }, { threshold: .15, rootMargin: '0px 0px -6% 0px' });
  document.querySelectorAll('.section h2,.section .eyebrow,.svc,.about-img,.about-in>div,.score,.trust-in>div:last-child,.theme,.cta-in>*,.page-head>*,.banner,.split>div,.rv-row,.rating-strip>*,.cta-lite>*,.gpanel').forEach(function (el) {
    var i = Array.prototype.indexOf.call(el.parentElement.children, el);
    el.style.setProperty('--d', (i % 3) * 90 + 'ms');
    el.classList.add('rv'); io.observe(el);
  });
})();

// Rating count-up (skipped for reduced motion)
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
  document.querySelectorAll('.big').forEach(function (el) {
    var n = el.firstChild, end = parseFloat(n.nodeValue);
    new IntersectionObserver(function (es, io) {
      if (!es[0].isIntersecting) return; io.disconnect();
      var t0 = null; (function step(t) { if (!t0) t0 = t; var k = Math.min((t - t0) / 1300, 1);
        n.nodeValue = (end * (1 - Math.pow(1 - k, 3))).toFixed(1); if (k < 1) requestAnimationFrame(step); })(performance.now());
    }, { threshold: .4 }).observe(el);
  });
})();

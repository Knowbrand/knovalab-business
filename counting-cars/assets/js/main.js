(function () {
  var script = document.currentScript;
  var base = new URL('../../', script.src).href; // site root; explicit index.html so it also works from file://
  var page = document.body.dataset.page;
  var WA = 'https://wa.me/918692055685';
  var MAPS = 'https://www.google.com/maps/search/?api=1&query=Counting+Cars+2.0+Shop+no+2+Soham+Gardens+Tikuji+Ni+Wadi+Rd+Manpada+Thane+West+400610';
  var home = base + 'index.html', about = base + 'about/index.html', contact = base + 'contact/index.html';

  // ---- Shared navbar and footer (single source for every page)
  var nav = document.getElementById('site-navbar');
  if (nav) nav.innerHTML =
    '<header class="nav"><div class="wrap nav-in">' +
    '<a class="wordmark" href="' + home + '" aria-label="Counting Cars 2.0, home">Counting Cars 2.0</a>' +
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
    '<a class="wordmark" href="' + home + '">Counting Cars 2.0</a><p class="hi" lang="hi">काउंटिंग कार्स 2.0</p>' +
    '<p class="muted">Auto accessories store in Manpada, Thane West.</p></div>' +
    '<nav aria-label="Footer"><a href="' + home + '">Home</a><a href="' + home + '#services">Services</a><a href="' + about + '">About</a><a href="' + contact + '">Contact</a></nav>' +
    '<div><a href="tel:+918692055685">+91 86920 55685</a><a href="' + WA + '" target="_blank" rel="noopener">WhatsApp</a>' +
    '<address>Shop no 2, Soham Gardens, Tikuji Ni Wadi Rd, below Karkhanis Hospital, Manpada, Thane West, Thane, Maharashtra 400610, India</address>' +
    '<a href="' + MAPS + '" target="_blank" rel="noopener">Get directions</a></div></div>' +
    '<p class="wrap copy">&copy; ' + new Date().getFullYear() + ' Counting Cars 2.0</p></footer>';

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
      var lines = ['Hello Counting Cars 2.0, I would like to make an enquiry.', 'Name: ' + f('name').value.trim(), 'Phone: ' + f('phone').value.trim(), 'Service: ' + f('type').value, 'Message: ' + f('message').value.trim()];
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

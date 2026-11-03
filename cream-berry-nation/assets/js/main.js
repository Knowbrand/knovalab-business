(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var header = document.getElementById('siteHeader');

  // Header: transparent on the hero, floating berry pill after scrolling
  function onScroll() { if (header) header.classList.toggle('scrolled', window.scrollY > 40); }
  onScroll(); window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile menu
  var btn = document.querySelector('.nav-toggle'), nav = document.getElementById('primary-nav');
  if (btn && nav) {
    var setMenu = function (open) {
      btn.setAttribute('aria-expanded', open); btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      nav.classList.toggle('open', open); header.classList.toggle('menu-open', open);
    };
    btn.addEventListener('click', function () { setMenu(btn.getAttribute('aria-expanded') !== 'true'); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && nav.classList.contains('open')) { setMenu(false); btn.focus(); } });
    nav.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
  }

  // Back to top
  document.addEventListener('click', function (e) {
    if (e.target.closest('.to-top')) window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  });

  // Reveal on scroll
  if (!reduce && 'IntersectionObserver' in window) {
    document.documentElement.classList.add('js');
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: .12, rootMargin: '0px 0px -5% 0px' });
    document.querySelectorAll('.rv').forEach(function (el) {
      var i = Array.prototype.indexOf.call(el.parentElement.children, el);
      el.style.setProperty('--dl', (i % 4) * 90 + 'ms'); io.observe(el);
    });
  }

  // Hero fruit: gentle pointer parallax (desktop pointers only)
  var hero = document.querySelector('.hero');
  if (hero && !reduce && window.matchMedia('(hover:hover)').matches) {
    hero.addEventListener('pointermove', function (e) {
      var r = hero.getBoundingClientRect();
      hero.style.setProperty('--mx', ((e.clientX - r.left) / r.width - .5).toFixed(3));
      hero.style.setProperty('--my', ((e.clientY - r.top) / r.height - .5).toFixed(3));
    }, { passive: true });
  }

  // Scroll parallax on spotlight images
  var layers = Array.prototype.slice.call(document.querySelectorAll('[data-scroll]'));
  if (layers.length && !reduce) {
    var ticking = false;
    var move = function () {
      layers.forEach(function (el) {
        var r = el.getBoundingClientRect(), k = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight;
        el.style.transform = 'translateY(' + (k * parseFloat(el.dataset.scroll)).toFixed(1) + 'px)';
      }); ticking = false;
    };
    window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(move); } }, { passive: true }); move();
  }

  // Lightbox (keyboard, click and swipe)
  var tiles = Array.prototype.slice.call(document.querySelectorAll('.gtile'));
  if (tiles.length && typeof HTMLDialogElement === 'function') {
    var dlg = document.createElement('dialog'); dlg.id = 'lightbox'; dlg.setAttribute('aria-label', 'Image viewer');
    dlg.innerHTML = '<div class="lb"><img alt=""><p class="lb-cap"></p><div class="lb-bar"><button type="button" data-a="prev" aria-label="Previous image">&larr;</button><button type="button" data-a="close" aria-label="Close viewer">Close</button><button type="button" data-a="next" aria-label="Next image">&rarr;</button></div></div>';
    document.body.appendChild(dlg);
    var img = dlg.querySelector('img'), cap = dlg.querySelector('.lb-cap'), idx = 0, opener = null, x0 = null;
    var show = function (i) { idx = (i + tiles.length) % tiles.length; img.src = tiles[idx].dataset.full; img.alt = tiles[idx].dataset.caption; cap.textContent = tiles[idx].dataset.caption; };
    tiles.forEach(function (t, i) { t.addEventListener('click', function () { opener = t; show(i); dlg.showModal(); }); });
    dlg.addEventListener('click', function (e) {
      var a = e.target.dataset && e.target.dataset.a;
      if (a === 'next') show(idx + 1); else if (a === 'prev') show(idx - 1); else if (a === 'close' || e.target === dlg) dlg.close();
    });
    dlg.addEventListener('keydown', function (e) { if (e.key === 'ArrowRight') show(idx + 1); if (e.key === 'ArrowLeft') show(idx - 1); });
    dlg.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    dlg.addEventListener('touchend', function (e) { if (x0 === null) return; var dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 50) show(idx + (dx < 0 ? 1 : -1)); x0 = null; });
    dlg.addEventListener('close', function () { if (opener) opener.focus(); });
  }
})();

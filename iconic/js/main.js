(() => {
  const toggle = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('#mobile-nav');

  const closeMenu = () => {
    if (!toggle || !mobileNav) return;
    mobileNav.classList.remove('is-open');
    toggle.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation');
    document.body.classList.remove('menu-open');
  };

  if (toggle && mobileNav) {
    toggle.addEventListener('click', () => {
      const open = !mobileNav.classList.contains('is-open');
      mobileNav.classList.toggle('is-open', open);
      toggle.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
      document.body.classList.toggle('menu-open', open);
    });
    mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') closeMenu();
    });
    document.addEventListener('click', event => {
      if (!mobileNav.classList.contains('is-open')) return;
      if (!mobileNav.contains(event.target) && !toggle.contains(event.target)) closeMenu();
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 900) closeMenu();
    });
  }

  document.querySelectorAll('[data-scroll-contact]').forEach(link => {
    link.addEventListener('click', event => {
      const target = document.querySelector('#commission-form');
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({behavior:'smooth', block:'start'});
      closeMenu();
      window.setTimeout(() => {
        const field = document.querySelector('#full-name');
        if (field) field.focus({preventScroll:true});
      }, 450);
    });
  });

  const filters = document.querySelectorAll('.work-filter');
  const cards = document.querySelectorAll('.work-card[data-category]');
  filters.forEach(filter => {
    filter.addEventListener('click', () => {
      const selected = filter.dataset.filter;
      filters.forEach(item => {
        const active = item === filter;
        item.classList.toggle('active', active);
        item.setAttribute('aria-pressed', String(active));
      });
      cards.forEach(card => {
        const categories = card.dataset.category.split(' ');
        card.classList.toggle('hidden', selected !== 'all' && !categories.includes(selected));
      });
    });
  });
})();
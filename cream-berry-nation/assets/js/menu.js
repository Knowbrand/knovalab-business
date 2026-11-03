(function () {
  var root = document.getElementById('menu-root');
  if (!root) return;
  var base = (window.CBN && window.CBN.base) || '';
  var CATS = [['all', 'All'], ['cream', 'Fruit with Cream'], ['fruit', 'Fruit Ice Creams'], ['seasonal', 'Seasonal Specials']];
  var ITEMS = [
    { c: 'cream', n: 'Fresh Mango with Cream', i: 'fresh-mango-cream', t: '#FFE7B0', d: 'Bright mango flavour paired with smooth, creamy indulgence.' },
    { c: 'cream', n: 'Fresh Mulberry with Cream', i: 'fresh-mulberry-cream', t: '#F3BFCC', d: 'A rich berry experience with the distinctive taste of fresh mulberries.' },
    { c: 'cream', n: 'Fresh Strawberry with Cream', i: 'fresh-strawberry-cream', t: '#FBCDD5', d: 'Sweet, fruity strawberry goodness with a creamy finish.' },
    { c: 'fruit', n: 'Guava', i: 'guava-cream', t: '#F9D3D8', d: 'Mellow guava flavour, smooth and fruity.' },
    { c: 'fruit', n: 'Chilli Guava', i: 'guava-cream', t: '#F9D3D8', d: 'Guava with a chilli twist for a little extra kick.' },
    { c: 'fruit', n: 'Musk Melon', i: 'musk-melon', t: '#FFE3C4', d: 'Light, refreshing melon flavour with a cool, smooth finish.' },
    { c: 'fruit', n: 'Lychee', i: 'lychee', t: '#F6E2E6', d: 'Delicate, floral lychee flavour with a creamy touch.' },
    { c: 'seasonal', n: 'Other seasonal fruit ice creams', i: 'fruit-mango', t: '#FFE7B0', d: 'Placeholder: seasonal flavours change through the year. Call to ask what is available today.' }
  ];
  var tabs = document.createElement('div'); tabs.className = 'tabs'; tabs.setAttribute('role', 'tablist'); tabs.setAttribute('aria-label', 'Menu categories');
  var grid = document.createElement('div'); grid.className = 'mgrid'; grid.id = 'menu-panel'; grid.setAttribute('role', 'tabpanel');
  CATS.forEach(function (c, idx) {
    var b = document.createElement('button');
    b.type = 'button'; b.className = 'tab'; b.textContent = c[1]; b.dataset.cat = c[0];
    b.setAttribute('role', 'tab'); b.setAttribute('aria-selected', idx === 0); b.setAttribute('aria-controls', 'menu-panel'); b.tabIndex = idx === 0 ? 0 : -1;
    tabs.appendChild(b);
  });
  function esc(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;'); }
  function render(cat) {
    grid.innerHTML = ITEMS.filter(function (it) { return cat === 'all' || it.c === cat; }).map(function (it, k) {
      return '<article class="mitem" style="animation-delay:' + k * 50 + 'ms"><img src="' + base + 'assets/images/' + it.i + '.svg" alt="" loading="lazy" style="background:' + it.t + '"><div><h3>' + esc(it.n) + '</h3><p>' + esc(it.d) + '</p></div></article>';
    }).join('');
  }
  function select(btn) {
    tabs.querySelectorAll('.tab').forEach(function (b) { var on = b === btn; b.setAttribute('aria-selected', on); b.tabIndex = on ? 0 : -1; });
    render(btn.dataset.cat);
  }
  tabs.addEventListener('click', function (e) { var b = e.target.closest('.tab'); if (b) select(b); });
  tabs.addEventListener('keydown', function (e) {
    var all = Array.prototype.slice.call(tabs.querySelectorAll('.tab')), i = all.indexOf(document.activeElement);
    if (i < 0 || (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft')) return;
    e.preventDefault();
    var n = all[(i + (e.key === 'ArrowRight' ? 1 : all.length - 1)) % all.length]; n.focus(); select(n);
  });
  root.appendChild(tabs); root.appendChild(grid); render('all');
})();

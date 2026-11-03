(function () {
  var script = document.currentScript;
  var base = new URL('../../', script.src).href; // site root; works locally and in a GitHub Pages sub-path
  var page = document.body.dataset.page;
  var L = { home: base + 'index.html', about: base + 'about/index.html', menu: base + 'menu/index.html', contact: base + 'contact/index.html' };
  var TEL = 'tel:+919637219146';
  var MAPS = 'https://www.google.com/maps/search/?api=1&query=Cream+Berry+Nation+Shop+No.+3+Shree+Hans+Garden+Dhanori-Lohegaon+Road+Madhav+Nagar+Dhanori+Pune+Maharashtra+411015';
  var DRIPS = 'M0,34 Q75,57 150,40 Q225,60 300,46 Q375,63 450,25 Q525,59 600,53 Q675,51 750,39 Q825,20 900,27 Q975,33 1050,31 Q1125,25 1200,54 Q1275,44 1350,48 L1440,90 L1404,90 C1392,90 1388,96 1388,106 L1388,158 A18,18 0 0 1 1352,158 L1352,106 C1352,96 1348,90 1336,90 L1279,90 C1267,90 1263,96 1263,106 L1263,133 A13,13 0 0 1 1237,133 L1237,106 C1237,96 1233,90 1221,90 L1189,90 C1177,90 1173,96 1173,106 L1173,167 A23,23 0 0 1 1127,167 L1127,106 C1127,96 1123,90 1111,90 L1061,90 C1049,90 1045,96 1045,106 L1045,151 A15,15 0 0 1 1015,151 L1015,106 C1015,96 1011,90 999,90 L965,90 C953,90 949,96 949,106 L949,193 A19,19 0 0 1 911,193 L911,106 C911,96 907,90 895,90 L848,90 C836,90 832,96 832,106 L832,124 A12,12 0 0 1 808,124 L808,106 C808,96 804,90 792,90 L738,90 C726,90 722,96 722,106 L722,218 A22,22 0 0 1 678,218 L678,106 C678,96 674,90 662,90 L643,90 C631,90 627,96 627,106 L627,169 A17,17 0 0 1 593,169 L593,106 C593,96 589,90 577,90 L529,90 C517,90 513,96 513,106 L513,137 A13,13 0 0 1 487,137 L487,106 C487,96 483,90 471,90 L420,90 C408,90 404,96 404,106 L404,178 A24,24 0 0 1 356,178 L356,106 C356,96 352,90 340,90 L297,90 C285,90 281,96 281,106 L281,129 A11,11 0 0 1 259,129 L259,106 C259,96 255,90 243,90 L206,90 C194,90 190,96 190,106 L190,210 A20,20 0 0 1 150,210 L150,106 C150,96 146,90 134,90 L90,90 C78,90 74,96 74,106 L74,146 A14,14 0 0 1 46,146 L46,106 C46,96 42,90 30,90 L0,90 Z', WAVE = 'M0,120 L0,54 C84,25 103,35 188,37 C247,8 261,52 321,57 C399,65 416,34 495,43 C549,43 561,21 615,35 C699,10 718,47 803,58 C874,53 889,17 961,24 C1051,18 1072,39 1163,41 C1226,15 1240,15 1303,17 C1364,12 1378,39 1440,51 L1440,120 Z';
  window.CBN = { base: base };

  function cur(k) { return page === k ? ' aria-current="page"' : ''; }
  var header = document.getElementById('site-header');
  if (header) header.innerHTML =
    '<header class="site-header" id="siteHeader"><div class="hd-in">' +
    '<a class="logo" href="' + L.home + '" aria-label="Cream Berry Nation, home"><img src="' + base + 'assets/images/logo.svg" alt="" width="38" height="38"><span>Cream Berry Nation</span></a>' +
    '<button class="nav-toggle" type="button" aria-expanded="false" aria-controls="primary-nav" aria-label="Open menu"><span></span><span></span></button>' +
    '<nav id="primary-nav" class="primary-nav" aria-label="Main">' +
    '<a href="' + L.home + '"' + cur('home') + '>Home</a>' +
    '<a href="' + L.about + '"' + cur('about') + '>Our Story</a>' +
    '<a href="' + L.menu + '"' + cur('menu') + '>Menu</a>' +
    '<a href="' + L.home + '#gallery">Gallery</a>' +
    '<a href="' + L.home + '#reviews">Reviews</a>' +
    '<a href="' + L.contact + '"' + cur('contact') + '>Find Us</a>' +
    '<a class="hd-cta" href="' + TEL + '">Call Now</a></nav></div></header>';

  var footer = document.getElementById('site-footer');
  if (footer) footer.innerHTML =
    '<footer class="site-footer"><svg class="f-wave" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true"><path d="' + WAVE + '"/></svg>' +
    '<div class="f-body"><img class="f-fruit ff1" src="' + base + 'assets/images/fruit-strawberry.svg" alt="" loading="lazy"><img class="f-fruit ff2" src="' + base + 'assets/images/fruit-mulberry.svg" alt="" loading="lazy">' +
    '<div class="f-grid"><div><a class="logo dark" href="' + L.home + '"><img src="' + base + 'assets/images/logo.svg" alt="" width="42" height="42"><span>Cream Berry Nation</span></a>' +
    '<p>Fresh fruit ice creams and desserts in Dhanori, Pune. Little moments of happiness, one scoop at a time.</p>' +
    '<p class="soc">Instagram and Facebook links to be added.</p></div>' +
    '<nav aria-label="Footer"><h4>Explore</h4><a href="' + L.home + '">Home</a><a href="' + L.about + '">Our Story</a><a href="' + L.menu + '">Menu</a><a href="' + L.home + '#gallery">Gallery</a><a href="' + L.home + '#reviews">Reviews</a><a href="' + L.contact + '">Find Us</a></nav>' +
    '<div><h4>Visit &amp; call</h4><address>Shop No. 3, Shree Hans Garden, Dhanori-Lohegaon Road, Madhav Nagar, Dhanori, Pune, Maharashtra 411015</address>' +
    '<a href="' + TEL + '">+91 96372 19146</a><a href="' + MAPS + '" target="_blank" rel="noopener">Get directions</a></div></div>' +
    '<div class="f-bar"><p>&copy; ' + new Date().getFullYear() + ' Cream Berry Nation. A knovalab demo.</p><button type="button" class="to-top" aria-label="Back to top">Back to top <span aria-hidden="true">&uarr;</span></button></div></div></footer>';

  document.querySelectorAll('[data-drips]').forEach(function (el) {
    el.innerHTML = '<svg viewBox="0 0 1440 240" preserveAspectRatio="xMidYMin slice" aria-hidden="true" focusable="false"><path d="' + DRIPS + '"/></svg>';
  });
})();

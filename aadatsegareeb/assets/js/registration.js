/* Aadat Se Gareeb — registration form logic.
   The inbox/alias lives only in the form action in panelregistration/index.html. The form POSTs to a hosted form service (FormSubmit);
   the destination address lives only in that service's private dashboard. */
(function () {
  var PLACEHOLDER = 'YOUR_FORM_ID';
  var STORY_MIN = 40, STORY_MAX = 600;

  function istNow() {
    return new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' }) + ' IST';
  }
  function setErr(field, msg) {
    var el = document.getElementById(field.id + '-err');
    if (el) el.textContent = msg || '';
    if (msg) { field.setAttribute('aria-invalid', 'true'); } else { field.removeAttribute('aria-invalid'); }
  }
  function banner(form, kind, msg) {
    var b = form.querySelector('.form-banner');
    b.className = 'banner form-banner ' + kind; b.textContent = msg; b.hidden = false;
  }
  function configured(form) {
    var ep = form.getAttribute('action') || '';
    return /^https:\/\/formsubmit\.co\/ajax\/.+/.test(ep);
  }

  /* ---------- panel application ---------- */
  var form = document.getElementById('panel-form');
  var closedNow = !!window.ASG_REG_CLOSED;
  if (form && closedNow) {
    form.hidden = true;
    var cn = document.getElementById('closed-notice'); if (cn) cn.hidden = false;
  }
  if (form && !closedNow) {
    var story = document.getElementById('story'), count = document.getElementById('story-count');
    var submitting = false, done = false;

    function updateCount() { count.textContent = story.value.length + ' / ' + STORY_MAX; }
    story.addEventListener('input', updateCount); updateCount();

    function validate() {
      var bad = [], f;
      f = form.elements['Full Name'];
      if (!f.value.trim()) { setErr(f, 'Enter your full name.'); bad.push(f); } else setErr(f, '');
      f = form.elements['Age'];
      var age = Number(f.value);
      if (!f.value) { setErr(f, 'Enter your age.'); bad.push(f); }
      else if (!Number.isInteger(age) || age < 18) { setErr(f, 'You must be 18 or older to apply.'); bad.push(f); }
      else if (age > 99) { setErr(f, 'Enter a valid age.'); bad.push(f); } else setErr(f, '');
      f = form.elements['email'];
      if (!f.value.trim()) { setErr(f, 'Enter your email address.'); bad.push(f); }
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.value.trim())) { setErr(f, 'Enter a valid email, like name@example.com.'); bad.push(f); } else setErr(f, '');
      f = form.elements['WhatsApp Number'];
      if (f.value.trim()) {
        var digits = f.value.replace(/\D/g, '');
        if (!/^[+\d\s()-]+$/.test(f.value) || digits.length < 7 || digits.length > 15) { setErr(f, 'Enter a valid number, or leave this blank.'); bad.push(f); } else setErr(f, '');
      } else setErr(f, '');
      f = form.elements['Preferred Language'];
      if (!f.value) { setErr(f, 'Choose a language.'); bad.push(f); } else setErr(f, '');
      f = form.elements['Story Category'];
      if (!f.value) { setErr(f, 'Choose a category.'); bad.push(f); } else setErr(f, '');
      var cam = form.querySelector('input[name="Comfortable On Camera"]:checked');
      var camErr = document.getElementById('camera-err');
      if (!cam) { camErr.textContent = 'Pick one option.'; bad.push(form.querySelector('input[name="Comfortable On Camera"]')); } else camErr.textContent = '';
      var len = story.value.trim().length;
      if (len < STORY_MIN) { setErr(story, 'Add a little more: at least ' + STORY_MIN + ' characters (' + len + ' so far).'); bad.push(story); }
      else if (len > STORY_MAX) { setErr(story, 'Keep it under ' + STORY_MAX + ' characters. This is the trailer, not the movie.'); bad.push(story); } else setErr(story, '');
      ['age-confirm', 'contact-consent'].forEach(function (id) {
        var cb = document.getElementById(id), e = document.getElementById(id + '-err');
        if (!cb.checked) { e.textContent = id === 'age-confirm' ? 'Please confirm you are 18 or older.' : 'Please tick this so we can contact you if selected.'; bad.push(cb); } else e.textContent = '';
      });
      return bad;
    }
    form.addEventListener('input', function (e) { if (e.target.hasAttribute && e.target.getAttribute('aria-invalid')) setErr(e.target, ''); });

    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      if (submitting || done) return;
      form.querySelector('.form-banner').hidden = true;
      var bad = validate();
      if (bad.length) { bad[0].focus(); banner(form, 'error', 'Please fix the ' + bad.length + ' highlighted field' + (bad.length > 1 ? 's' : '') + ' and try again.'); return; }
      if (!configured(form)) { banner(form, 'error', 'This form is not connected to an email service yet, so nothing was sent. (Site owner: set the form endpoint — see README.)'); return; }

      var btn = document.getElementById('submit-btn'), label = btn.querySelector('.lbl-text');
      submitting = true; btn.disabled = true; btn.classList.add('is-loading'); label.textContent = 'Sending…'; form.setAttribute('aria-busy', 'true');

      var data = new FormData(form);
      data.set('_subject', '[AADAT SE GAREEB] New Panel Application — ' + form.elements['Full Name'].value.trim());
      data.set('Submitted At', istNow());
      var ctrl = new AbortController(), t = setTimeout(function () { ctrl.abort(); }, 20000);

      fetch(form.getAttribute('action'), { method: 'POST', body: data, headers: { Accept: 'application/json' }, signal: ctrl.signal })
        .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { return { ok: r.ok, body: j }; }); })
        .then(function (res) {
          if (!res.ok || String(res.body.success) === 'false') throw new Error('rejected');
          done = true; form.hidden = true;
          var s = document.getElementById('success'); s.hidden = false; s.focus();
          s.scrollIntoView({ behavior: 'smooth', block: 'start' });
        })
        .catch(function () {
          banner(form, 'error', 'Something went wrong and your application was not sent. Check your connection and press submit again. Your answers are still here.');
        })
        .finally(function () {
          clearTimeout(t); form.removeAttribute('aria-busy');
          if (!done) { submitting = false; btn.disabled = false; btn.classList.remove('is-loading'); label.textContent = 'Submit my story'; }
        });
    });
  }

  /* ---------- data request (correction / deletion) ---------- */
  var req = document.getElementById('request-form');
  if (req) {
    var busy = false;
    req.addEventListener('submit', function (ev) {
      ev.preventDefault(); if (busy) return;
      var em = document.getElementById('req-email'), msg = document.getElementById('req-text');
      var ok = true;
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(em.value.trim())) { setErr(em, 'Enter the email you applied with.'); ok = false; } else setErr(em, '');
      if (msg.value.trim().length < 10) { setErr(msg, 'Tell us what to correct or delete (a sentence is enough).'); ok = false; } else setErr(msg, '');
      if (!ok) return;
      if (!configured(req)) { banner(req, 'error', 'This request form is not connected yet, so nothing was sent. (Site owner: see README.)'); return; }
      busy = true; var b = req.querySelector('button'); b.disabled = true; b.textContent = 'Sending…';
      var d = new FormData(req); d.set('_subject', '[AADAT SE GAREEB] Data correction/deletion request'); d.set('Submitted At', istNow());
      fetch(req.getAttribute('action'), { method: 'POST', body: d, headers: { Accept: 'application/json' } })
        .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { if (!r.ok || String(j.success) === 'false') throw 0; req.reset(); banner(req, 'success', 'Request received. We will use the email you gave to follow up.'); }); })
        .catch(function () { banner(req, 'error', 'The request was not sent. Please try again.'); })
        .finally(function () { busy = false; b.disabled = false; b.textContent = 'Send request'; });
    });
  }
})();

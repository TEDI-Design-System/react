/* Preview theme switch for the TEDI previews.
   One choice for every preview: Auto (follows the page/app), Light ("default") or Dark.
   The choice is kept in localStorage and picked up live by every other open preview.
   It sets <html data-theme> (tokens.css, bundle.css) and TEDI's own tedi-theme--* class
   and "tedi-theme" key, so ThemeProvider renders the same theme. */
(function () {
  var KEY = 'tedi-preview-theme';
  var d = document.documentElement;
  var me = document.currentScript;
  var showBar = !(me && me.getAttribute('data-toolbar') === 'off');
  var host = d.getAttribute('data-theme') || 'default';
  var busy = false;

  function stored() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function want() { var s = stored(); return s === 'dark' || s === 'default' ? s : (host === 'dark' ? 'dark' : 'default'); }

  function apply() {
    var t = want();
    busy = true;
    if (d.getAttribute('data-theme') !== t) d.setAttribute('data-theme', t);
    for (var i = d.classList.length - 1; i >= 0; i--) {
      var c = d.classList.item(i);
      if (c && c.indexOf('tedi-theme--') === 0 && c !== 'tedi-theme--' + t) d.classList.remove(c);
    }
    d.classList.add('tedi-theme--' + t);
    busy = false;
    try { localStorage.setItem('tedi-theme', t); } catch (e) {}
    document.cookie = 'tedi-theme=' + t + '; path=/; max-age=31536000; SameSite=Lax';
    paint();
  }

  // The page may hand a new theme to the frame later; ThemeProvider may re-add its class.
  new MutationObserver(function () {
    if (busy) return;
    var cur = d.getAttribute('data-theme');
    if (!stored() && cur && cur !== want()) host = cur;
    var t = want();
    if (d.getAttribute('data-theme') !== t || !d.classList.contains('tedi-theme--' + t) ||
        d.className.split(/\s+/).some(function (c) { return c.indexOf('tedi-theme--') === 0 && c !== 'tedi-theme--' + t; })) apply();
  }).observe(d, { attributes: true, attributeFilter: ['data-theme', 'class'] });

  window.addEventListener('storage', function (e) { if (e.key === KEY || e.key === null) apply(); });

  var bar = null;
  function paint() {
    if (!bar) return;
    var s = stored() || 'auto';
    var b = bar.querySelectorAll('button');
    for (var i = 0; i < b.length; i++) b[i].setAttribute('aria-pressed', String(b[i].getAttribute('data-v') === s));
  }
  function set(v) {
    try { if (v === 'auto') localStorage.removeItem(KEY); else localStorage.setItem(KEY, v); } catch (e) {}
    apply();
  }
  function build() {
    if (!showBar || bar) return;
    var st = document.createElement('style');
    st.textContent =
      '.tps{position:fixed;top:6px;right:6px;z-index:2147483647;display:flex;gap:2px;padding:2px;' +
      'border:1px solid var(--general-border-primary);border-radius:var(--tedi-radius-08);' +
      'background:var(--general-surface-primary);font:500 12px/1 system-ui,sans-serif}' +
      '.tps button{all:unset;cursor:pointer;padding:5px 10px;border-radius:var(--tedi-radius-08);color:var(--general-text-secondary)}' +
      '.tps button:hover{background:var(--general-surface-hover)}' +
      '.tps button[aria-pressed="true"]{background:var(--general-surface-brand-primary);color:var(--general-text-white)}' +
      '.tps button:focus-visible{outline:2px solid var(--general-border-brand);outline-offset:1px}' +
      '@media print{.tps{display:none}}';
    document.head.appendChild(st);
    bar = document.createElement('div');
    bar.className = 'tps';
    bar.setAttribute('role', 'group');
    bar.setAttribute('aria-label', 'Preview theme');
    [['auto', 'Auto'], ['default', 'Light'], ['dark', 'Dark']].forEach(function (o) {
      var b = document.createElement('button');
      b.type = 'button'; b.setAttribute('data-v', o[0]); b.textContent = o[1];
      b.title = o[0] === 'auto' ? 'Follow the app' : o[1] + ' theme in every preview';
      b.addEventListener('click', function () { set(o[0]); });
      bar.appendChild(b);
    });
    document.body.appendChild(bar);
    paint();
  }

  apply();
  if (document.body) build(); else document.addEventListener('DOMContentLoaded', build);
})();

/* iCertified – utilities, storage, icons */
(function () {
  const IC = (window.IC = window.IC || {});

  IC.esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  IC.$ = (sel, root) => (root || document).querySelector(sel);
  IC.$$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  // ---- storage (falls back to memory when localStorage is blocked) ----
  const mem = {};
  IC.store = {
    get(k, d) { try { const v = localStorage.getItem('icert.' + k); return v === null ? (k in mem ? mem[k] : d) : JSON.parse(v); } catch (e) { return k in mem ? mem[k] : d; } },
    set(k, v) { mem[k] = v; try { localStorage.setItem('icert.' + k, JSON.stringify(v)); } catch (e) { /* ignore */ } },
    del(k) { delete mem[k]; try { localStorage.removeItem('icert.' + k); } catch (e) { /* ignore */ } }
  };

  // ---- random ----
  IC.hashStr = s => { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; };
  IC.rng = seed => () => { seed |= 0; seed = (seed + 0x6D2B79F5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  IC.shuffle = (arr, rnd) => { rnd = rnd || Math.random; const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

  // ---- formatting ----
  IC.fmtTime = sec => { sec = Math.max(0, Math.round(sec)); const h = Math.floor(sec / 3600), m = Math.floor((sec % 3600) / 60), s = sec % 60; const p = n => String(n).padStart(2, '0'); return h ? `${h}:${p(m)}:${p(s)}` : `${p(m)}:${p(s)}`; };
  IC.fmtDur = sec => { const m = Math.round(sec / 60); return m < 1 ? `${Math.round(sec)}s` : `${m} min`; };
  IC.fmtDate = t => new Date(t).toLocaleString(undefined, { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  IC.letter = i => 'ABCDE'[i];
  IC.initials = n => (n || '?').trim().split(/\s+/).slice(0, 2).map(w => w[0]).join('').toUpperCase() || '?';
  IC.colorFor = pct => pct >= 80 ? '#16a34a' : pct >= 65 ? '#14b8a6' : pct >= 45 ? '#f59e0b' : '#ef4444';

  // ---- icons (feather-style) ----
  const P = {
    home: '<path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
    play: '<circle cx="12" cy="12" r="9"/><path d="m10 8.5 6 3.5-6 3.5z"/>',
    layers: '<path d="m12 3 9 5-9 5-9-5z"/><path d="m3 13 9 5 9-5"/>',
    award: '<circle cx="12" cy="9" r="6"/><path d="m8.5 14.5-1.5 7 5-3 5 3-1.5-7"/>',
    book: '<path d="M4 4.5A1.5 1.5 0 0 1 5.5 3H20v16H5.5A1.5 1.5 0 0 0 4 20.5z"/><path d="M4 20.5A1.5 1.5 0 0 0 5.5 22H20v-3"/>',
    chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    flag: '<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',
    check: '<path d="m5 12.5 4.5 4.5L19 7"/>',
    x: '<path d="M6 6l12 12M18 6 6 18"/>',
    chev: '<path d="m9 6 6 6-6 6"/>',
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    moon: '<path d="M21 13A9 9 0 1 1 11 3a7 7 0 0 0 10 10z"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    refresh: '<path d="M20 11a8 8 0 0 0-14.5-3.5L4 9M4 4v5h5M4 13a8 8 0 0 0 14.5 3.5L20 15M20 20v-5h-5"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
    bulb: '<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.8.8 1 1.5 1 2.5h6c0-1 .2-1.7 1-2.5A6 6 0 0 0 12 3z"/>',
    list: '<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
    grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
    cal: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
    arrowL: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
    arrowR: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    trash: '<path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/>',
    zap: '<path d="m13 2-9 12h7l-1 8 9-12h-7z"/>',
    shield: '<path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"/><path d="m9 12 2 2 4-4"/>',
    cards: '<rect x="3" y="6" width="14" height="14" rx="2"/><path d="M7 3h12a2 2 0 0 1 2 2v12"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5h.01"/>'
  };
  IC.icon = (name, size) => `<svg width="${size || 20}" height="${size || 20}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[name] || ''}</svg>`;

  // ---- toast & modal ----
  IC.toast = (msg, kind) => {
    const host = IC.$('#toastHost'); const el = document.createElement('div');
    el.className = `toast align-items-center text-bg-${kind || 'dark'} border-0`; el.setAttribute('role', 'status');
    el.innerHTML = `<div class="d-flex"><div class="toast-body">${IC.esc(msg)}</div><button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button></div>`;
    host.appendChild(el); const t = new bootstrap.Toast(el, { delay: 3500 }); t.show(); el.addEventListener('hidden.bs.toast', () => el.remove());
  };
  IC.modal = (html, opts) => {
    opts = opts || {};
    const host = IC.$('#modalHost'); const wrap = document.createElement('div');
    wrap.className = 'modal'; wrap.tabIndex = -1; // no Bootstrap fade: avoids half-open states on fast clicks; see .modal-dialog animation in app.css
    if (opts.static) { wrap.setAttribute('data-bs-backdrop', 'static'); wrap.setAttribute('data-bs-keyboard', 'false'); }
    wrap.innerHTML = `<div class="modal-dialog ${opts.size ? 'modal-' + opts.size : ''} modal-dialog-centered modal-dialog-scrollable"><div class="modal-content">${html}</div></div>`;
    host.appendChild(wrap); const m = new bootstrap.Modal(wrap);
    wrap.addEventListener('hidden.bs.modal', () => { m.dispose(); wrap.remove(); });
    m.show();
    // hide() is ignored by Bootstrap while the fade-in is running, so defer it until the dialog has finished showing
    return { el: wrap, hide: () => safeHide(wrap, m) };
  };
  function safeHide(wrap, m) {
    if (!m._isTransitioning) return m.hide();
    wrap.addEventListener('shown.bs.modal', () => m.hide(), { once: true });
  }
  IC.closeModals = () => {
    IC.$$('#modalHost .modal').forEach(el => { const i = bootstrap.Modal.getInstance(el); if (!i) { el.remove(); return; } if (el.classList.contains('show')) safeHide(el, i); });
  };
})();

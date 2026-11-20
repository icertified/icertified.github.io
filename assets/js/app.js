/* iCertified – bootstrap, router, two-level navigation (platform level + certification level) */
(function () {
  const IC = window.IC; const { esc, icon } = IC;

  // Platform level: shown before a certification is opened. Certification level: generated per certification.
  const PLATFORM_NAV = [
    { h: '#/home', k: 'home', i: 'home', t: 'Home' },
    { h: '#/certs', k: 'certs', i: 'grid', t: 'Certifications' },
    { h: '#/learning', k: 'learning', i: 'chart', t: 'My Learning' }
  ];
  const CERT_NAV = [
    { h: '#/overview', k: 'overview', i: 'home', t: 'Overview' },
    { h: '#/syllabus', k: 'syllabus', i: 'list', t: 'Syllabus' },
    { h: '#/study', k: 'study', i: 'book', t: 'Study Material' },
    { h: '#/study/flash', k: 'flash', i: 'cards', t: 'Flashcards' },
    { h: '#/chapters', k: 'chapters', i: 'layers', t: 'Chapter Tests' },
    { h: '#/whole', k: 'whole', i: 'award', t: 'Mock Exams' },
    { h: '#/start', k: 'start', i: 'play', t: 'Exam Prep' },
    { h: '#/results', k: 'results', i: 'target', t: 'Progress' }
  ];
  const PLATFORM_PAGES = ['home', 'certs', 'learning'];
  const CERT_PAGES = ['overview', 'syllabus', 'study', 'chapters', 'whole', 'start', 'exam', 'results', 'result'];
  const state = { certId: null, cert: null, section: 'home', scope: 'platform' };
  let routeToken = 0;

  IC.cert = () => state.cert;
  IC.loadAll = () => Promise.all(IC.registry().map(r => IC.loadCert(r.id).catch(() => null)));

  // ---------- resume learning (all data stays in this browser) ----------
  IC.noteLast = (certId, h, label) => { IC.store.set('last.' + certId, { h, label, t: Date.now() }); };
  IC.resume = certId => {
    const reg = IC.regEntry(certId); if (!reg) return null;
    const a = IC.activeAttempt(certId);
    if (a) return { certId, h: '#/exam', label: 'Resume ' + a.title, sub: `${Object.keys(a.answers).length}/${a.questions.length} answered`, exam: true, t: a.started || 0 };
    const l = IC.store.get('last.' + certId, null);
    if (l && l.h) return { certId, h: l.h, label: l.label, sub: 'Where you left off', t: l.t || 0 };
    return null;
  };
  IC.hasProgress = certId => {
    const s = IC.store.get('study.' + certId, {}), f = IC.store.get('flash.' + certId, {});
    return !!(Object.keys(s).length || Object.keys(f).length || IC.attempts(certId).length || IC.resume(certId));
  };
  IC.lastResume = () => {
    let best = null;
    IC.registry().forEach(r => { const x = IC.resume(r.id); if (x && (!best || x.t > best.t)) best = x; });
    return best;
  };
  IC.selectCert = (id, to) => {
    if (!IC.regEntry(id)) return;
    IC.store.set('cert', id);
    if (state.certId !== id) { state.cert = null; state.certId = null; }
    const target = to || '#/overview';
    if (location.hash === target) IC.route(); else location.hash = target;
  };
  IC.go = h => { if (location.hash === h) IC.route(); else location.hash = h; };

  const applyAccent = accent => {
    document.body.classList.toggle('has-cert', !!accent);
    if (accent) document.body.style.setProperty('--ic-cert', accent); else document.body.style.removeProperty('--ic-cert');
  };

  const resumeCard = x => { const reg = IC.regEntry(x.certId); return `<a class="ic-resume" href="#" data-cert="${esc(x.certId)}" data-to="${esc(x.h)}"><span class="ico">${icon('play', 20)}</span><span class="tx"><small>Continue where you left off</small><b>${esc(reg.short)} – ${esc(x.label)}</b></span>${icon('arrowR', 18)}</a>`; };

  IC.resumeCard = resumeCard;

  IC.renderChrome = () => {
    const name = IC.name(); const c = state.cert; const scope = state.scope; const active = c ? IC.activeAttempt(c.id) : null;
    const nav = (list) => `<nav class="ic-nav">${list.map(n => `<a href="${n.h}" class="${state.section === n.k ? 'active' : ''}">${icon(n.i, 20)}<span>${n.t}</span>${n.k === 'start' && active ? '<span class="pill">resume</span>' : ''}</a>`).join('')}</nav>`;
    let mid = '';
    if (scope === 'cert' && c) {
      mid = `<div class="ic-navlabel">Current certification</div>
        <button class="ic-switch" data-act="switch" aria-label="Switch certification"><span class="chnum sm">${esc(c.reg.badge || c.short.slice(0, 2))}</span><span class="tx"><b>${esc(c.short)}</b><small>${esc(c.org)} · tap to switch</small></span><span class="sw">${icon('refresh', 16)}</span></button>
        <div class="ic-navlabel">Learn</div>${nav(CERT_NAV)}
        <div class="ic-nav mt-2"><a href="#/certs" class="ic-alt">${icon('arrowL', 18)}<span>All certifications</span></a></div>`;
    } else {
      const lr = IC.lastResume();
      mid = `<div class="ic-navlabel">Explore</div>${nav(PLATFORM_NAV)}${lr ? `<div class="px-1 mt-3">${resumeCard(lr)}</div>` : ''}`;
    }
    IC.$('#sidebar').innerHTML = `<a class="ic-brand" href="#/home"><span class="ic-logo">${icon('check', 24).replace('stroke-width="1.9"', 'stroke-width="2.8"').replace('currentColor', '#fff')}</span><span><b>iCertified</b><small>Certification prep platform</small><em class="ic-by">by Iftikhar Haider</em></span></a>${mid}
      <div class="ic-user mt-auto"><div class="ic-avatar">${esc(IC.initials(name))}</div><div><div class="nm">${esc(name || 'Guest')}</div><button data-act="name">${name ? 'Change name' : 'Add your name'}</button></div></div>`;
    const dark = document.documentElement.getAttribute('data-bs-theme') === 'dark';
    const all = PLATFORM_NAV.concat(CERT_NAV); const cur = all.find(n => n.k === state.section);
    const title = scope === 'cert' && c ? `<span class="text-muted fw-normal">${esc(c.short)} &nbsp;/&nbsp;</span> ${esc(cur ? cur.t : 'Exam')}` : esc(cur ? cur.t : 'iCertified');
    IC.$('#topbar').innerHTML = `<button class="ic-iconbtn ic-menu-btn" data-act="menu" aria-label="Open menu">${icon('menu', 20)}</button><a class="ic-topbrand" href="#/home" aria-label="iCertified home"><span class="ic-logo sm">${icon('check', 16).replace('stroke-width="1.9"', 'stroke-width="2.8"')}</span><b>iCertified</b></a><div class="crumb">${title}</div><div class="ms-auto d-flex gap-2 align-items-center">${scope === 'cert' && c ? `<button class="chip d-none d-sm-inline-flex border-0" data-act="switch" title="Switch certification">${esc(c.org)} ${esc(c.short)} ${icon('refresh', 13)}</button>` : ''}<button class="ic-iconbtn" data-act="theme" aria-label="Toggle dark mode">${icon(dark ? 'sun' : 'moon', 18)}</button></div>`;
  };

  function parse() {
    const raw = (location.hash || '#/home').replace(/^#\/?/, ''); const p = raw.split('?')[0].split('/').filter(Boolean);
    return { page: p[0] || 'home', arg: p[1], arg2: p[2], parts: p };
  }
  function sectionOf(r) {
    if (r.page === 'study') return r.arg === 'flash' ? 'flash' : 'study';
    return { exam: 'start', result: 'results' }[r.page] || r.page;
  }
  function trackLast(c, r) {
    const ch = n => { const x = c.chapters.find(y => y.n === +n); return x ? 'Chapter ' + x.n + ' – ' + x.title : 'Chapter ' + n; };
    if (r.page === 'study') {
      if (/^\d+$/.test(r.arg || '')) IC.noteLast(c.id, '#/study/' + r.arg, ch(r.arg) + ' (study notes)');
      else if (r.arg === 'flash') IC.noteLast(c.id, '#/study/flash' + (r.arg2 ? '/' + r.arg2 : ''), 'Flashcards');
      else if (r.arg === 'terms') IC.noteLast(c.id, '#/study/terms', 'Key terms');
      else if (r.arg === 'guide') IC.noteLast(c.id, '#/study/guide', 'Exam guide');
      else IC.noteLast(c.id, '#/study', 'Study material');
    } else if (r.page === 'chapters' && /^\d+$/.test(r.arg || '')) IC.noteLast(c.id, '#/chapters/' + r.arg, ch(r.arg) + ' (tests)');
    else if (r.page === 'whole') IC.noteLast(c.id, '#/whole', 'Mock exams');
    else if (r.page === 'syllabus') IC.noteLast(c.id, '#/syllabus', 'Syllabus');
  }

  IC.route = async () => {
    const tok = ++routeToken; const r = parse();
    // deep link: #/c/<certId>/<page…>
    if (r.page === 'c' && IC.regEntry(r.arg)) {
      IC.store.set('cert', r.arg); if (state.certId !== r.arg) { state.cert = null; state.certId = null; }
      location.replace('#/' + (r.parts.slice(2).join('/') || 'overview')); return;
    }
    if (!PLATFORM_PAGES.includes(r.page) && !CERT_PAGES.includes(r.page)) r.page = 'home';
    const scope = CERT_PAGES.includes(r.page) ? 'cert' : 'platform';
    state.scope = scope; state.section = sectionOf(r);
    if (r.page !== 'exam') IC.stopRunner && IC.stopRunner();
    document.body.classList.remove('nav-open');
    IC.closeModals();
    if (scope === 'platform') {
      applyAccent(null); IC.renderChrome();
      if (r.page === 'certs') return IC.v.certs();
      if (r.page === 'learning') return IC.v.learning();
      return IC.v.home();
    }
    if (!state.cert) {
      const saved = IC.store.get('cert', null);
      if (!IC.regEntry(saved)) { location.replace('#/certs'); return; }
      applyAccent(IC.regEntry(saved).accent); IC.renderChrome();
      IC.setView('<div class="empty"><div class="spinner-border text-primary"></div><p class="mt-3">Loading…</p></div>');
      try { const loaded = await IC.loadCert(saved); if (tok !== routeToken) return; state.certId = saved; state.cert = loaded; }
      catch (e) {
        if (tok !== routeToken) return;
        return IC.setView(`<div class="ic-card pad"><h4>Could not load the certification content</h4><p class="text-muted">${esc(e.message)}</p><p class="small">If you opened this file directly, make sure the <code>certs</code> folder sits next to <code>index.html</code>.</p></div>`);
      }
    }
    const c = state.cert; applyAccent(c.reg.accent); IC.renderChrome(); trackLast(c, r);
    switch (r.page) {
      case 'start': return IC.v.start(c);
      case 'chapters': return IC.v.chapters(c, r.arg);
      case 'whole': return IC.v.whole(c);
      case 'study': return IC.v.study(c, r.arg, r.arg2);
      case 'syllabus': return IC.v.syllabus(c);
      case 'results': return IC.v.results(c);
      case 'result': return IC.runResult(c, r.arg);
      case 'exam': return IC.runExam(c);
      default: return IC.v.overview(c);
    }
  };

  IC.switchDialog = () => {
    const cur = state.certId;
    const m = IC.modal(`<div class="modal-header border-0"><div><div class="eyebrow">iCertified</div><h5 class="modal-title">Switch certification</h5></div><button class="btn-close" data-bs-dismiss="modal"></button></div>
      <div class="modal-body pt-0">${IC.registry().map(r => `<button class="swrow ${r.id === cur ? 'on' : ''}" data-cert="${esc(r.id)}" data-to="#/overview" style="--ic-cert:${esc(r.accent)}"><span class="chnum sm" style="background:${esc(r.accent)}">${esc(r.badge || r.short.slice(0, 2))}</span><span class="tx"><b>${esc(r.short)}</b><small>${esc(r.name)}</small></span>${r.id === cur ? '<span class="chip ok">Current</span>' : icon('arrowR', 16)}</button>`).join('')}
        <a href="#/certs" class="btn btn-soft w-100 mt-2" data-bs-dismiss="modal">Browse all certifications</a></div>`);
    return m;
  };

  document.addEventListener('click', e => {
    const t = e.target.closest('[data-go],[data-start],[data-act],[data-cert],.ic-backdrop,.ic-nav a'); if (!t) return;
    if (t.matches('.ic-backdrop') || t.matches('.ic-nav a')) { document.body.classList.remove('nav-open'); if (t.matches('.ic-nav a')) return; }
    if (t.dataset.go) { e.preventDefault(); location.hash = t.dataset.go; return; }
    if (t.dataset.start) { e.preventDefault(); const spec = IC.findSpec(state.cert, t.dataset.start); if (spec) IC.startDialog(state.cert, spec); else if (/^retry-/.test(t.dataset.start)) { IC.toast('Nothing left to retry from that test – all its questions are now answered correctly.'); IC.route(); } return; }
    if (t.dataset.cert) { e.preventDefault(); document.body.classList.remove('nav-open'); IC.selectCert(t.dataset.cert, t.dataset.to); return; }
    const a = t.dataset.act; if (!a) return; e.preventDefault();
    if (a === 'menu') document.body.classList.toggle('nav-open');
    else if (a === 'theme') { const n = document.documentElement.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark'; document.documentElement.setAttribute('data-bs-theme', n); IC.store.set('theme', n); IC.renderChrome(); }
    else if (a === 'name') IC.askName();
    else if (a === 'switch') IC.switchDialog();
    else if (a === 'scroll') { const el = document.getElementById(t.dataset.target); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    else if (a === 'date') IC.editExamDate(state.cert);
    else if (a === 'discard') { IC.clearActive(state.cert.id); IC.toast('Unfinished attempt discarded'); IC.route(); }
    else if (a === 'clear') {
      const m = IC.modal(`<div class="modal-header border-0"><h5 class="modal-title">Clear all history?</h5></div><div class="modal-body text-muted">This deletes every saved result for ${esc(state.cert.short)} on this device and resets which questions count as “seen”. It cannot be undone.</div><div class="modal-footer border-0"><button class="btn btn-soft" data-bs-dismiss="modal">Cancel</button><button class="btn btn-danger" id="clrOk">Delete</button></div>`);
      IC.$('#clrOk', m.el).onclick = () => { IC.store.del('attempts.' + state.cert.id); IC.resetSeen(state.cert.id); m.hide(); IC.route(); };
    }
  });
  window.addEventListener('hashchange', () => IC.route());
  IC.route();
})();

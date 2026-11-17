/* iCertified – bootstrap, router, sidebar, topbar */
(function () {
  const IC = window.IC; const { esc, icon } = IC;
  const NAV = [
    { h: '#/home', k: 'home', i: 'home', t: 'Home' },
    { h: '#/start', k: 'start', i: 'play', t: 'Start Exam' },
    { h: '#/chapters', k: 'chapters', i: 'layers', t: 'Chapter-wise Tests' },
    { h: '#/whole', k: 'whole', i: 'award', t: 'Whole Tests' },
    { h: '#/study', k: 'study', i: 'book', t: 'Enroll & Study' },
    { h: '#/results', k: 'results', i: 'chart', t: 'My Results' }
  ];
  const state = { certId: null, cert: null, section: 'home' };

  IC.renderChrome = () => {
    const name = IC.name(); const c = state.cert; const active = c ? IC.activeAttempt(c.id) : null;
    IC.$('#sidebar').innerHTML = `<a class="ic-brand" href="#/home"><span class="ic-logo">${icon('check', 24).replace('stroke-width="1.9"', 'stroke-width="2.8"').replace('currentColor', '#fff')}</span><span><b>iCertified</b><small>Exam prep studio</small><em class="ic-by">by Iftikhar Haider</em></span></a>
      <div class="ic-navlabel">Menu</div><nav class="ic-nav">${NAV.map(n => `<a href="${n.h}" class="${state.section === n.k ? 'active' : ''}">${icon(n.i, 20)}<span>${n.t}</span>${n.k === 'start' && active ? '<span class="pill">resume</span>' : ''}</a>`).join('')}</nav>
      ${c ? `<div class="ic-navlabel">Certification</div><div class="ic-nav"><a href="#/home" style="pointer-events:none"><span class="chnum" style="width:34px;height:34px;font-size:.8rem;border-radius:10px">${esc(c.short.slice(0, 2))}</span><span style="line-height:1.15"><span class="d-block text-white">${esc(c.short)}</span><small>${esc(c.org)}</small></span></a></div>` : ''}
      <div class="ic-user mt-auto"><div class="ic-avatar">${esc(IC.initials(name))}</div><div><div class="nm">${esc(name || 'Guest')}</div><button data-act="name">${name ? 'Change name' : 'Add your name'}</button></div></div>`;
    const dark = document.documentElement.getAttribute('data-bs-theme') === 'dark';
    const cur = NAV.find(n => n.k === state.section);
    IC.$('#topbar').innerHTML = `<button class="ic-iconbtn ic-menu-btn" data-act="menu" aria-label="Open menu">${icon('menu', 20)}</button><div class="crumb">${esc(cur ? cur.t : 'iCertified')}</div><div class="ms-auto d-flex gap-2 align-items-center">${c ? `<span class="chip d-none d-sm-inline-flex">${esc(c.org)} ${esc(c.short)}</span>` : ''}<button class="ic-iconbtn" data-act="theme" aria-label="Toggle dark mode">${icon(dark ? 'sun' : 'moon', 18)}</button></div>`;
  };

  function parse() {
    const raw = (location.hash || '#/home').replace(/^#\/?/, ''); const p = raw.split('?')[0].split('/').filter(Boolean);
    return { page: p[0] || 'home', arg: p[1], arg2: p[2] };
  }

  IC.route = async () => {
    const r = parse(); const map = { home: 'home', start: 'start', chapters: 'chapters', whole: 'whole', study: 'study', results: 'results', result: 'results', exam: 'start' };
    state.section = map[r.page] || 'home';
    if (r.page !== 'exam') IC.stopRunner && IC.stopRunner();
    document.body.classList.remove('nav-open');
    IC.closeModals();
    IC.renderChrome();
    if (!state.cert) IC.setView('<div class="empty"><div class="spinner-border text-primary"></div><p class="mt-3">Loading…</p></div>');
    try {
      if (!state.cert) { const saved = IC.store.get('cert', null); const id = IC.regEntry(saved) ? saved : IC.registry()[0].id; state.certId = id; state.cert = await IC.loadCert(id); IC.renderChrome(); }
    } catch (e) {
      return IC.setView(`<div class="ic-card pad"><h4>Could not load the certification content</h4><p class="text-muted">${esc(e.message)}</p><p class="small">If you opened this file directly, make sure the <code>certs</code> folder sits next to <code>index.html</code>.</p></div>`);
    }
    const c = state.cert;
    switch (r.page) {
      case 'start': return IC.v.start(c);
      case 'chapters': return IC.v.chapters(c, r.arg);
      case 'whole': return IC.v.whole(c);
      case 'study': return IC.v.study(c, r.arg, r.arg2);
      case 'results': return IC.v.results(c);
      case 'result': return IC.runResult(c, r.arg);
      case 'exam': return IC.runExam(c);
      default: return IC.v.home(c);
    }
  };

  document.addEventListener('click', e => {
    const t = e.target.closest('[data-go],[data-start],[data-act],[data-cert],.ic-backdrop,.ic-nav a'); if (!t) return;
    if (t.matches('.ic-backdrop') || t.matches('.ic-nav a')) { document.body.classList.remove('nav-open'); if (t.matches('.ic-nav a')) return; }
    if (t.dataset.go) { e.preventDefault(); location.hash = t.dataset.go; return; }
    if (t.dataset.start) { e.preventDefault(); const spec = IC.findSpec(state.cert, t.dataset.start); if (spec) IC.startDialog(state.cert, spec); return; }
    if (t.dataset.cert) { e.preventDefault(); IC.store.set('cert', t.dataset.cert); state.cert = null; location.hash = '#/home'; IC.route(); return; }
    const a = t.dataset.act; if (!a) return; e.preventDefault();
    if (a === 'menu') document.body.classList.toggle('nav-open');
    else if (a === 'theme') { const n = document.documentElement.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark'; document.documentElement.setAttribute('data-bs-theme', n); IC.store.set('theme', n); IC.renderChrome(); }
    else if (a === 'name') IC.askName();
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

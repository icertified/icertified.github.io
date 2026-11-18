/* iCertified – main views: home, start, chapter-wise, whole test, results, dialogs */
(function () {
  const IC = window.IC; const { esc, icon } = IC;
  IC.v = IC.v || {};
  const view = html => { const el = IC.$('#view'); el.innerHTML = `<div class="fade-in">${html}</div>`; el.scrollTop = 0; window.scrollTo(0, 0); return el; };
  IC.setView = view;
  const plural = (n, w) => `${n} ${w}${n === 1 ? '' : 's'}`;

  // ---------- state helpers ----------
  IC.name = () => IC.store.get('name', '');
  IC.examDate = cert => IC.store.get('examDate.' + cert.id, cert.reg.defaultExamDate || '');
  IC.daysToExam = cert => { const d = IC.examDate(cert); if (!d) return null; const t = new Date(d + 'T00:00:00'); const n = new Date(); n.setHours(0, 0, 0, 0); return Math.round((t - n) / 864e5); };
  IC.studyProgress = cert => {
    const done = IC.store.get('study.' + cert.id, {}); const res = { done: 0, total: 0, byCh: {} };
    if (!cert.study) return res;
    Object.keys(cert.study.chapters).forEach(n => { const secs = cert.study.chapters[n].sections; const d = secs.filter(s => done[`${n}.${s.id}`]).length; res.byCh[n] = { d, t: secs.length }; res.done += d; res.total += secs.length; });
    return res;
  };
  IC.wrongQids = cert => {
    const seen = new Set(), out = [];
    IC.attempts(cert.id).forEach(a => a.questions.forEach(it => { const q = cert.qmap[it.id]; if (!q || seen.has(it.id)) return; const ans = a.answers[it.id]; if (ans && ans.length && !IC.isCorrect(q, ans)) { seen.add(it.id); out.push(it.id); } }));
    return out;
  };

  // ---------- name & date dialogs ----------
  IC.askName = (cb) => {
    const m = IC.modal(`<div class="modal-header border-0"><h5 class="modal-title">Welcome to iCertified</h5></div>
      <div class="modal-body"><p class="text-muted">No registration needed. Just tell us your name – it appears on your results and stays on this device.</p>
      <label class="form-label fw-semibold" for="nmIn">Your name</label><input id="nmIn" class="form-control form-control-lg" maxlength="40" placeholder="e.g. Iftikhar Haider" autocomplete="name"></div>
      <div class="modal-footer border-0"><button class="btn btn-primary" id="nmGo">Continue ${icon('arrowR', 18)}</button></div>`, { static: !!cb });
    const inp = IC.$('#nmIn', m.el); IC.name() && (inp.value = IC.name());
    m.el.addEventListener('shown.bs.modal', () => inp.focus());
    const go = () => { const v = inp.value.trim(); if (!v) { inp.classList.add('is-invalid'); return; } IC.store.set('name', v); m.hide(); IC.renderChrome(); cb ? cb(v) : IC.route(); };
    IC.$('#nmGo', m.el).onclick = go; inp.onkeydown = e => { if (e.key === 'Enter') go(); };
  };
  IC.editExamDate = cert => {
    const m = IC.modal(`<div class="modal-header border-0"><h5 class="modal-title">Your exam date</h5><button class="btn-close" data-bs-dismiss="modal"></button></div>
      <div class="modal-body"><input type="date" id="exD" class="form-control form-control-lg" value="${esc(IC.examDate(cert))}"></div>
      <div class="modal-footer border-0"><button class="btn btn-soft" id="exClr">Clear</button><button class="btn btn-primary" id="exSave">Save</button></div>`);
    IC.$('#exSave', m.el).onclick = () => { IC.store.set('examDate.' + cert.id, IC.$('#exD', m.el).value); m.hide(); IC.route(); };
    IC.$('#exClr', m.el).onclick = () => { IC.store.set('examDate.' + cert.id, ''); m.hide(); IC.route(); };
  };

  // ---------- start dialog ----------
  IC.startDialog = (cert, spec) => {
    const info = IC.specInfo(cert, spec); const active = IC.activeAttempt(cert.id);
    const timed = spec.kind !== 'chapter' || spec.mode === 'exam';
    const m = IC.modal(`<div class="modal-header border-0"><div><div class="eyebrow">${esc(cert.short)}</div><h5 class="modal-title">${esc(spec.title)}</h5></div><button class="btn-close" data-bs-dismiss="modal"></button></div>
      <div class="modal-body">
        <p class="text-muted mb-3">${esc(spec.subtitle || '')}</p>
        <div class="kv mb-3"><div><b>${info.n}</b><span>questions</span></div><div><b>${info.minutes} min</b><span>suggested time</span></div><div><b>${info.total}</b><span>points</span></div><div><b>${info.pass != null ? info.pass : '65%'}</b><span>${info.pass != null ? 'to pass' : 'pass mark'}</span></div></div>
        <div class="fw-semibold mb-2">Choose a mode</div>
        <div class="row g-2 mb-3">
          <div class="col-6"><label class="mode-card"><input type="radio" name="mode" value="exam" ${spec.mode === 'exam' ? 'checked' : ''}><b>Exam mode</b><div class="small text-muted">Timed. Answers and explanations shown only at the end – like the real exam.</div></label></div>
          <div class="col-6"><label class="mode-card"><input type="radio" name="mode" value="practice" ${spec.mode !== 'exam' ? 'checked' : ''}><b>Practice mode</b><div class="small text-muted">Untimed. Check each answer and read the explanation straight away.</div></label></div>
        </div>
        <div class="form-check mb-3" id="extraWrap"><input class="form-check-input" type="checkbox" id="extraT"><label class="form-check-label" for="extraT">The exam language is not my native language (+${cert.exam.extraPercent}% time, as allowed by ISTQB)</label></div>
        ${IC.name() ? '' : `<label class="form-label fw-semibold" for="stName">Your name</label><input id="stName" class="form-control mb-2" maxlength="40" placeholder="Enter your name to proceed">`}
        ${active ? `<div class="callout warn"><b>Heads up</b>You have an unfinished attempt (“${esc(active.title)}”). Starting a new one replaces it.</div>` : ''}
      </div>
      <div class="modal-footer border-0"><button class="btn btn-soft" data-bs-dismiss="modal">Cancel</button><button class="btn btn-primary btn-lg" id="goStart">Start ${icon('arrowR', 18)}</button></div>`);
    const sync = () => { const ex = IC.$('input[name=mode]:checked', m.el).value === 'exam'; IC.$('#extraWrap', m.el).style.display = ex ? '' : 'none'; };
    IC.$$('input[name=mode]', m.el).forEach(r => r.onchange = sync); sync();
    IC.$('#goStart', m.el).onclick = () => {
      let name = IC.name(); const ni = IC.$('#stName', m.el);
      if (!name) { name = (ni && ni.value.trim()) || ''; if (!name) { ni.classList.add('is-invalid'); ni.focus(); return; } IC.store.set('name', name); IC.renderChrome(); }
      const mode = IC.$('input[name=mode]:checked', m.el).value; const extra = IC.$('#extraT', m.el).checked && mode === 'exam';
      const at = IC.createAttempt(cert, spec, { mode, extra, name }); IC.setActive(at); m.hide(); location.hash = '#/exam';
    };
  };

  // ---------- small components ----------
  const bestChip = (cert, spec) => { const b = IC.bestFor(cert.id, spec.id); if (!b) return '<span class="chip">Not attempted</span>'; return `<span class="chip ${b.result.pass ? 'ok' : 'warn'}">Best ${b.result.pct}%</span>`; };
  const specRow = (cert, spec, tag) => {
    const i = IC.specInfo(cert, spec);
    return `<div class="setrow"><div class="t"><b>${esc(spec.title)} ${tag || ''}</b><small>${i.n} questions · ${i.minutes} min · ${i.total} pts${spec.mode === 'practice' ? ' · practice' : ''}</small></div>${bestChip(cert, spec)}<button class="btn btn-primary btn-sm" data-start="${esc(spec.id)}">Start</button></div>`;
  };
  const accBar = (label, c, t) => { const p = t ? Math.round((c / t) * 100) : 0; return `<div class="pbar"><div class="lbl">${label}</div><div class="track"><div class="fill" style="width:${t ? p : 0}%;background:${t ? IC.colorFor(p) : 'transparent'}"></div></div><div class="val">${t ? p + '% (' + c + '/' + t + ')' : 'no data'}</div></div>`; };

  // ---------- START EXAM ----------
  IC.v.start = cert => {
    const cat = IC.catalogue(cert); const done = new Set(IC.attempts(cert.id).map(a => a.specId)); const nextMock = cat.mocks.find(m => !done.has(m.id)) || cat.mocks[0];
    const wrong = IC.wrongQids(cert).length;
    const opts = [
      { spec: cat.random, ico: 'award', t: 'Full exam simulation', d: `${cert.exam.questions} questions drawn at random to the real blueprint. ${cert.exam.minutes} minutes.`, tag: 'Recommended' },
      { spec: nextMock, ico: 'layers', t: nextMock.title, d: 'Next fixed mock you have not tried yet – good for tracking progress.', tag: done.has(nextMock.id) ? 'Retake' : 'New' },
      { spec: cat.official[0], ico: 'shield', t: cat.official[0] ? cat.official[0].title : '', d: 'The real ISTQB paper. Take it under exam conditions.', tag: 'Official' },
      { spec: cat.quick.mixed, ico: 'zap', t: 'Quick quiz · 10 mixed', d: 'Ten random questions from every chapter. Perfect for a coffee break.', tag: 'Practice' },
      { spec: cat.quick.weak, ico: 'target', t: 'Weak-areas drill', d: 'Targets the chapters where your accuracy is lowest (or untested).', tag: 'Smart' },
      { spec: cat.quick.mistakes, ico: 'refresh', t: 'Retry my mistakes', d: wrong ? `${Math.min(wrong, 20)} of the ${wrong} questions you have answered wrongly.` : 'Available after your first test – replays questions you got wrong.', tag: 'Smart', disabled: !wrong }
    ].filter(o => o.spec);
    view(`<h1 class="ic-page-title">Exam prep</h1><p class="ic-sub">Pick a format. You will choose exam mode (timed) or practice mode (instant feedback) on the next screen.</p>
      <div class="row g-3">${opts.map(o => `<div class="col-md-6 col-xl-4"><div class="ic-card hover tile" ${o.disabled ? 'style="opacity:.55;pointer-events:none"' : `data-start="${esc(o.spec.id)}"`}><div class="d-flex justify-content-between"><div class="chnum">${icon(o.ico, 22)}</div><span class="ribbon ${o.tag === 'Official' ? 'off' : ''}">${o.tag}</span></div><h5>${esc(o.t)}</h5><div class="text-muted small">${esc(o.d)}</div><div class="foot"><span class="text-primary fw-semibold">Choose ${icon('arrowR', 16)}</span></div></div></div>`).join('')}</div>`);
  };

  // ---------- CHAPTER-WISE ----------
  IC.v.chapters = (cert, n) => {
    const cat = IC.catalogue(cert); const st = IC.chapterStats(cert.id);
    if (n) {
      const chp = cert.chapters.find(c => c.n === +n); const c = cat.chapters[n]; if (!chp) return IC.v.chapters(cert);
      const s = st[n] || { c: 0, t: 0 };
      return view(`<a href="#/chapters" class="text-decoration-none small">← All chapters</a>
        <div class="d-flex flex-wrap align-items-center gap-3 mt-2 mb-4"><div class="chnum">${chp.n}</div><div class="flex-grow-1"><h1 class="ic-page-title m-0">${esc(chp.title)}</h1><div class="text-muted">${c.count} questions · ${chp.points} exam points · ${chp.minutes} min of teaching</div></div><button class="btn btn-soft" data-go="#/study/${n}">${icon('book', 18)} Study this chapter</button></div>
        <div class="row g-3"><div class="col-lg-8"><div class="ic-card">${c.quick ? specRow(cert, c.quick, '<span class="ribbon">Random</span>') : ''}${c.sets.map(x => specRow(cert, x)).join('')}${c.full ? specRow(cert, c.full, '<span class="ribbon off">Full</span>') : ''}${!c.count ? '<div class="empty">No questions yet for this chapter.</div>' : ''}</div></div>
        <div class="col-lg-4"><div class="ic-card pad"><h5>Your accuracy</h5>${accBar('Chapter ' + n, s.c, s.t)}<hr><h6>Learning objectives</h6>${chp.los.map(l => `<div class="lo-row"><span class="badge-k k-${l.k}">${l.k}</span><div class="small">${esc(l.t)}</div></div>`).join('')}</div></div></div>`);
    }
    view(`<h1 class="ic-page-title">Chapter-wise tests</h1><p class="ic-sub">Master the syllabus one chapter at a time. Each chapter has short practice sets, a random quick quiz and a full chapter test.</p>
      <div class="row g-3">${cert.chapters.map(chp => { const c = cat.chapters[chp.n]; const s = st[chp.n]; const p = s && s.t ? Math.round((s.c / s.t) * 100) : null;
        return `<div class="col-md-6 col-xl-4"><a class="ic-card hover tile" href="#/chapters/${chp.n}"><div class="d-flex gap-3 align-items-center"><div class="chnum">${chp.n}</div><div><h5>${esc(chp.title)}</h5></div></div>
        <div class="meta"><span>${icon('list', 14)} ${c.count} questions</span><span>${icon('layers', 14)} ${c.sets.length} sets</span><span>${icon('award', 14)} ${chp.points} exam pts</span></div>
        <div><div class="d-flex justify-content-between small text-muted mb-1"><span>Accuracy</span><span>${p == null ? 'not started' : p + '%'}</span></div><div class="progress"><div class="progress-bar" style="width:${p || 0}%"></div></div></div>
        <div class="foot"><span class="text-primary fw-semibold">Open sets ${icon('arrowR', 16)}</span></div></a></div>`; }).join('')}</div>`);
  };

  // ---------- WHOLE TESTS ----------
  IC.v.whole = cert => {
    const cat = IC.catalogue(cert);
    view(`<h1 class="ic-page-title">Whole tests</h1><p class="ic-sub">Full-length papers that follow the real exam: ${cert.exam.questions} questions, ${cert.exam.totalPoints} points, ${cert.exam.minutes} minutes, pass at ${IC.passMark(cert, cert.exam.totalPoints)} points (${cert.exam.passPercent}%).</p>
      <div class="ic-card pad mb-4"><div class="d-flex flex-wrap gap-4 align-items-center"><div class="kv flex-grow-1"><div><b>${cert.exam.questions}</b><span>questions</span></div><div><b>${cert.exam.minutes} min</b><span>time</span></div><div><b>${cert.exam.totalPoints}</b><span>points</span></div><div><b>${IC.passMark(cert, cert.exam.totalPoints)}</b><span>to pass</span></div></div></div></div>
      ${cat.official.length ? `<h5 class="mb-2">Official ISTQB paper</h5><div class="ic-card mb-4">${cat.official.map(s => specRow(cert, s, '<span class="ribbon off">Official</span>')).join('')}</div>` : ''}
      <h5 class="mb-2">iCertified mock exams</h5><div class="ic-card mb-4">${cat.mocks.map(s => specRow(cert, s)).join('')}${specRow(cert, cat.random, '<span class="ribbon">Random</span>')}</div>
      <div class="callout good"><b>Tip</b>Aim for 80% or more in two consecutive mocks before exam day – the real pass mark is ${cert.exam.passPercent}%.</div>
      ${cert.reg.officialUrl ? `<div class="callout mt-3"><b>Official sample exams</b>ISTQB publishes free sample exams with answers for this certification. Take them straight from the source: <a href="${esc(cert.reg.officialUrl)}" target="_blank" rel="noopener">istqb.org – ${esc(cert.short)}</a>. They are © ISTQB and are not copied into iCertified.</div>` : ''}`);
  };

  // ---------- RESULTS HISTORY ----------
  IC.v.results = cert => {
    const list = IC.attempts(cert.id).filter(a => a.result); const st = IC.chapterStats(cert.id); const wrong = IC.wrongQids(cert).length; const cat = IC.catalogue(cert);
    if (!list.length) return view(`<h1 class="ic-page-title">My results</h1><div class="ic-card empty mt-3">${icon('chart', 36)}<h5 class="mt-2">No completed tests yet</h5><p>Take a quiz or a mock exam and your scores and weak areas will show up here.</p><button class="btn btn-primary" data-go="#/start">Start exam</button></div>`);
    const best = Math.max(...list.map(a => a.result.pct)); const passes = list.filter(a => a.result.pass).length;
    const weakest = cert.chapters.map(c => ({ c, s: st[c.n] })).filter(x => x.s && x.s.t).sort((a, b) => a.s.c / a.s.t - b.s.c / b.s.t)[0];
    view(`<div class="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3"><div><h1 class="ic-page-title">My results</h1><div class="text-muted">${esc(IC.name() || '')}</div></div>
      <div class="d-flex gap-2"><button class="btn btn-primary" data-start="${esc(cat.quick.mistakes.id)}" ${wrong ? '' : 'disabled'}>${icon('refresh', 18)} Retry my mistakes (${wrong})</button><button class="btn btn-soft" data-act="clear">${icon('trash', 18)} Clear history</button></div></div>
      <div class="row g-3 mb-4"><div class="col-6 col-xl-3"><div class="ic-card stat"><div class="ico">${icon('list', 22)}</div><div><b>${list.length}</b><span>Tests completed</span></div></div></div>
      <div class="col-6 col-xl-3"><div class="ic-card stat"><div class="ico w">${icon('award', 22)}</div><div><b>${best}%</b><span>Best score</span></div></div></div>
      <div class="col-6 col-xl-3"><div class="ic-card stat"><div class="ico t">${icon('check', 22)}</div><div><b>${passes}/${list.length}</b><span>Passed (≥ ${cert.exam.passPercent}%)</span></div></div></div>
      <div class="col-6 col-xl-3"><div class="ic-card stat"><div class="ico">${icon('target', 22)}</div><div><b>${weakest ? 'Ch ' + weakest.c.n : '—'}</b><span>Weakest chapter</span></div></div></div></div>
      <div class="row g-3"><div class="col-lg-5"><div class="ic-card pad h-100"><h5 class="mb-3">Accuracy by chapter</h5>${cert.chapters.map(c => accBar('Chapter ' + c.n, (st[c.n] || {}).c || 0, (st[c.n] || {}).t || 0)).join('')}${weakest ? `<div class="callout warn"><b>Focus next</b>Chapter ${weakest.c.n} “${esc(weakest.c.title)}” – <a href="#/study/${weakest.c.n}">review the notes</a> or <a href="#/chapters/${weakest.c.n}">practise it</a>.</div>` : ''}</div></div>
      <div class="col-lg-7"><div class="ic-card">${list.map(a => `<div class="setrow"><div class="t"><b>${esc(a.title)}</b><small>${IC.fmtDate(a.ended || a.started)} · ${a.mode} · ${a.result.correct}/${a.result.n} correct · ${IC.fmtDur((a.ended || a.started) - a.started >= 0 ? ((a.ended || a.started) - a.started) / 1000 : 0)}</small></div><span class="chip ${a.result.pass ? 'ok' : 'bad'}">${a.result.pct}% · ${a.result.pass ? 'Pass' : 'Fail'}</span><button class="btn btn-soft btn-sm" data-go="#/result/${a.id}">Review</button></div>`).join('')}</div></div></div>`);
  };
})();

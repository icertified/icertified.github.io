/* iCertified – platform-level views (landing, catalogue, my learning) and the certification dashboard + syllabus */
(function () {
  const IC = window.IC; const { esc, icon } = IC;
  IC.v = IC.v || {};
  const view = html => IC.setView(html);
  const plural = (n, w) => `${n} ${w}${n === 1 ? '' : 's'}`;
  const loadingHtml = '<div class="empty"><div class="spinner-border text-primary"></div><p class="mt-3">Loading…</p></div>';

  // numbers shown on cards (needs the certification pack to be loaded)
  const certStats = c => {
    const sp = IC.studyProgress(c); const done = IC.attempts(c.id).filter(a => a.result);
    const terms = new Set(); if (c.study) Object.values(c.study.chapters).forEach(ch => (ch.terms || []).forEach(t => terms.add(t[0])));
    const flashTotal = c.study ? (c.study.flash || []).length + terms.size : 0;
    const known = Object.keys(IC.store.get('flash.' + c.id, {})).length;
    return {
      chapters: c.chapters.length, questions: c.questions.filter(q => q.pool !== false).length, flash: flashTotal, known,
      studyPct: sp.total ? Math.round((sp.done / sp.total) * 100) : 0, tests: done.length, best: done.length ? Math.max(...done.map(a => a.result.pct)) : null,
      mocks: (c.exam.mockCount || 0) + IC.catalogue(c).official.length
    };
  };
  const bigNum = (n) => n >= 1000 ? (Math.round(n / 100) / 10) + 'k' : String(n);

  // ---------- certification card (catalogue + landing preview) ----------
  const certCard = (r, c, compact) => {
    const has = IC.hasProgress(r.id); const res = IC.resume(r.id); const s = c ? certStats(c) : null;
    const goTo = res ? res.h : '#/overview';
    return `<div class="col-md-6 col-xl-${compact ? '6' : '4'}"><div class="ic-card cert-card" style="--ic-cert:${esc(r.accent)}">
      <div class="cc-top"><span class="cc-badge">${esc(r.badge || r.short.slice(0, 2))}</span><div class="cc-org"><span class="chip">${esc(r.org)}</span></div></div>
      <h4>${esc(r.short)}</h4><div class="cc-name">${esc(r.name)}</div><div class="small text-muted mb-2">${esc(r.level)}</div>
      <p class="small text-muted">${esc(r.description)}</p>
      ${s ? `<div class="cc-facts"><span>${icon('list', 14)} ${s.chapters} chapters</span><span>${icon('target', 14)} ${s.questions} questions</span><span>${icon('award', 14)} ${s.mocks} mock exams</span><span>${icon('cards', 14)} ${s.flash} flashcards</span></div>` : ''}
      ${has && s ? `<div class="mb-3"><div class="d-flex justify-content-between small text-muted mb-1"><span>Study progress</span><span>${s.studyPct}%${s.best != null ? ' · best test ' + s.best + '%' : ''}</span></div><div class="progress"><div class="progress-bar" style="width:${s.studyPct}%"></div></div>${res ? `<div class="small mt-2 text-muted">${icon('clock', 13)} ${esc(res.label)}</div>` : ''}</div>` : ''}
      <div class="cc-actions"><button class="btn btn-primary" data-cert="${esc(r.id)}" data-to="${esc(goTo)}">${has ? 'Continue Learning' : 'Start Learning'} ${icon('arrowR', 16)}</button><button class="btn btn-soft" data-cert="${esc(r.id)}" data-to="#/syllabus">View Syllabus</button></div>
    </div></div>`;
  };
  const soonCard = () => `<div class="col-md-6 col-xl-4"><div class="ic-card cert-card soon"><span class="cc-badge">${icon('zap', 22)}</span><h5 class="mt-3">More certifications coming</h5><p class="small text-muted mb-0">New certifications plug straight into the platform – same syllabus, notes, flashcards, chapter tests and mock exams.</p></div></div>`;

  // ---------- LANDING (platform home) ----------
  IC.v.home = () => {
    const reg = IC.registry(); const lr = IC.lastResume(); const name = IC.name();
    const feats = [
      ['list', 'Syllabus &amp; chapters', 'The official structure broken into chapters and learning objectives, so you always know what to cover.'],
      ['book', 'Structured learning', 'Study notes written for the exam, with tips, common traps and key terms for every topic.'],
      ['layers', 'Chapter-wise practice', 'Short practice sets and a full test for every chapter, with instant feedback and explanations.'],
      ['target', 'Chapter mock exams', 'Check one chapter at a time before you move on – weak chapters show up straight away.'],
      ['award', 'Full certification mocks', 'Timed, exam-style papers that follow the real exam blueprint, plus free practice draws.'],
      ['chart', 'Progress &amp; revision', 'Results by chapter, a weak-areas drill and a “retry my mistakes” mode to focus your last weeks.']
    ];
    view(`
      <section class="hero lp-hero mb-5"><div class="row align-items-center g-5"><div class="col-lg-7">
        <div class="lp-brand"><span class="ic-logo">${icon('check', 24).replace('stroke-width="1.9"', 'stroke-width="2.8"')}</span><span class="tx"><b>iCertified</b><small>Certification prep platform</small></span></div>
        <span class="chip mb-3 on-dark">${icon('zap', 14)} Free · no sign-up · works in your browser</span>
        <h1>Learn it. Practise it.<br>Revise it. <span class="hl">Certify.</span></h1>
        <p class="lead mb-4">iCertified brings your whole certification journey into one place – syllabus, study notes, chapter tests, full mock exams and flashcards – instead of juggling ten different websites.</p>
        <div class="d-flex flex-wrap gap-2"><button class="btn btn-light btn-lg" data-go="#/certs">${icon('play', 20)} Get started</button><button class="btn btn-ghost btn-lg" data-act="scroll" data-target="lp-why">Why iCertified?</button></div>
        ${lr ? `<div class="mt-4" style="max-width:480px">${resumeLink(lr)}</div>` : ''}
      </div><div class="col-lg-5 d-none d-lg-block"><div class="lp-stack">${reg.slice(0, 3).map((r, i) => `<div class="lp-mini" style="--ic-cert:${esc(r.accent)};--i:${i}"><span class="cc-badge">${esc(r.badge || r.short.slice(0, 2))}</span><div><b>${esc(r.short)}</b><small>${esc(r.name)}</small></div></div>`).join('')}<div class="lp-mini ghost" style="--i:${Math.min(reg.length, 3)}"><span class="cc-badge">+</span><div><b>More soon</b><small>New certifications keep joining</small></div></div></div></div></div></section>

      <section class="mb-5" id="lp-about"><div class="row g-3">
        <div class="col-md-4"><div class="ic-card pad h-100 lp-block"><div class="ico">${icon('info', 22)}</div><h5>What is iCertified?</h5><p class="text-muted mb-0">A free certification learning and exam-preparation platform. Pick a certification and you get its syllabus, chapter-by-chapter study material, practice, mock exams and revision flashcards in a single, consistent place.</p></div></div>
        <div class="col-md-4"><div class="ic-card pad h-100 lp-block"><div class="ico t">${icon('user', 22)}</div><h5>Who we are</h5><p class="text-muted mb-0">iCertified is an independent personal project created by <b>Iftikhar Haider</b>, a QA professional. It started while preparing for his own ISTQB exams and has grown into a platform that any certification can be added to.</p></div></div>
        <div class="col-md-4"><div class="ic-card pad h-100 lp-block"><div class="ico w">${icon('bulb', 22)}</div><h5>Why it exists</h5><p class="text-muted mb-0">Preparing usually means a syllabus PDF here, notes there, flashcards in another app and practice questions somewhere else. iCertified removes that scattered search so your time goes into learning.</p></div></div>
      </div></section>

      <section class="mb-5" id="lp-why"><div class="text-center mb-4"><span class="eyebrow">The problem we solve</span><h2 class="lp-h2">One platform instead of ten tabs</h2></div>
        <div class="row g-3"><div class="col-md-6"><div class="ic-card pad h-100 lp-vs before"><h5>${icon('x', 18)} Without iCertified</h5><ul><li>Syllabus on one site, glossary on another</li><li>Notes scattered across blogs, videos and PDFs</li><li>Practice questions behind paywalls or in random apps</li><li>Flashcards you build and maintain yourself</li><li>No clear picture of what you have covered</li></ul></div></div>
        <div class="col-md-6"><div class="ic-card pad h-100 lp-vs after"><h5>${icon('check', 18)} With iCertified</h5><ul><li>Syllabus, chapters and learning objectives in order</li><li>Exam-focused study notes with tips and traps</li><li>Chapter tests, mock exams and free practice draws</li><li>Flashcards per chapter and for the whole certification</li><li>Progress tracking and “continue where you left off”</li></ul></div></div></div></section>

      <section class="mb-5"><div class="text-center mb-4"><span class="eyebrow">What you can do</span><h2 class="lp-h2">Everything for exam day, in one place</h2></div>
        <div class="row g-3">${feats.map(f => `<div class="col-md-6 col-xl-4"><div class="ic-card pad h-100 lp-feat"><div class="ico">${icon(f[0], 22)}</div><h5>${f[1]}</h5><p class="text-muted small mb-0">${f[2]}</p></div></div>`).join('')}
          <div class="col-12"><div class="lp-flash"><div class="ico">${icon('cards', 28)}</div><div class="flex-grow-1"><span class="ribbon">Final revision</span><h4 class="mt-2 mb-1">Flashcards – your last-mile revision tool</h4><p class="mb-0">Flashcards for every individual chapter <b>and</b> a deck that covers the complete certification. Flip, mark what you know and keep drilling what you don’t – ideal in the final days before your exam.</p></div><button class="btn btn-light btn-lg" data-go="#/certs">Try them ${icon('arrowR', 18)}</button></div></div></div></section>

      <section class="mb-5"><div class="text-center mb-4"><span class="eyebrow">How it works</span><h2 class="lp-h2">Three simple steps</h2></div>
        <div class="row g-3">${[['1', 'Choose your certification', 'Open the catalogue and pick the exam you are preparing for.'], ['2', 'Learn and practise', 'Follow the syllabus, read the notes and test yourself chapter by chapter.'], ['3', 'Revise and pass', 'Use flashcards and full mock exams until you are consistently above the pass mark.']].map(s => `<div class="col-md-4"><div class="ic-card pad h-100 lp-step"><span class="n">${s[0]}</span><h5>${s[1]}</h5><p class="text-muted mb-0">${s[2]}</p></div></div>`).join('')}</div></section>

      <section class="mb-5"><div class="d-flex flex-wrap justify-content-between align-items-end mb-3 gap-2"><div><span class="eyebrow">Available now</span><h2 class="lp-h2 m-0">Certifications</h2></div><button class="btn btn-soft" data-go="#/certs">Browse all ${icon('arrowR', 16)}</button></div>
        <div class="row g-3" id="lpCerts">${loadingHtml}</div></section>

      <section class="lp-cta"><h3>Ready to start preparing${name ? ', ' + esc(name.split(' ')[0]) : ''}?</h3><p>Pick a certification and start learning in under a minute.</p><button class="btn btn-light btn-lg" data-go="#/certs">${icon('play', 20)} Start learning</button></section>`);
    IC.loadAll().then(() => { const el = IC.$('#lpCerts'); if (!el) return; el.innerHTML = reg.map(r => certCard(r, IC.registry().length && window.ICERT[r.id] && window.ICERT[r.id].__ready ? window.ICERT[r.id] : null, true)).join(''); });
  };
  const resumeLink = x => { const r = IC.regEntry(x.certId); return `<a class="ic-resume on-dark" href="#" data-cert="${esc(x.certId)}" data-to="${esc(x.h)}"><span class="ico">${icon('play', 20)}</span><span class="tx"><small>Continue where you left off</small><b>${esc(r.short)} – ${esc(x.label)}</b></span>${icon('arrowR', 18)}</a>`; };

  // ---------- CERTIFICATION CATALOGUE ----------
  IC.v.certs = () => {
    view(`<h1 class="ic-page-title">Choose your certification</h1><p class="ic-sub">Pick the certification you are preparing for. Each one comes with its own syllabus, study material, flashcards, chapter tests and mock exams.</p><div class="row g-3" id="catGrid">${loadingHtml}</div>`);
    IC.loadAll().then(() => { const el = IC.$('#catGrid'); if (!el) return; el.innerHTML = IC.registry().map(r => certCard(r, window.ICERT && window.ICERT[r.id] && window.ICERT[r.id].__ready ? window.ICERT[r.id] : null)).join('') + soonCard(); });
  };

  // ---------- MY LEARNING ----------
  IC.v.learning = () => {
    view(`<h1 class="ic-page-title">My learning</h1><p class="ic-sub">Everything you have started, in one place. Your progress is saved in this browser on this device.</p><div id="mlBody">${loadingHtml}</div>`);
    IC.loadAll().then(() => {
      const el = IC.$('#mlBody'); if (!el) return; const lr = IC.lastResume();
      const rows = IC.registry().map(r => ({ r, c: window.ICERT[r.id] && window.ICERT[r.id].__ready ? window.ICERT[r.id] : null })).filter(x => x.c);
      const started = rows.filter(x => IC.hasProgress(x.r.id));
      if (!started.length) { el.innerHTML = `<div class="ic-card empty">${icon('book', 36)}<h5 class="mt-2">You have not started a certification yet</h5><p>Choose one and your progress, flashcards and results will appear here.</p><button class="btn btn-primary" data-go="#/certs">Browse certifications</button></div>`; return; }
      el.innerHTML = `${lr ? `<div class="mb-4">${IC.resumeCard(lr)}</div>` : ''}<div class="row g-3">${started.map(x => { const s = certStats(x.c); const res = IC.resume(x.r.id);
        return `<div class="col-lg-6"><div class="ic-card pad cert-card h-100" style="--ic-cert:${esc(x.r.accent)}"><div class="d-flex gap-3 align-items-center mb-3"><span class="cc-badge">${esc(x.r.badge)}</span><div class="flex-grow-1"><h5 class="m-0">${esc(x.r.short)}</h5><div class="small text-muted">${esc(x.r.name)}</div></div></div>
          <div class="kv mb-3"><div><b>${s.studyPct}%</b><span>study progress</span></div><div><b>${s.tests}</b><span>tests completed</span></div><div><b>${s.best == null ? '—' : s.best + '%'}</b><span>best score</span></div><div><b>${s.known}/${s.flash}</b><span>flashcards known</span></div></div>
          ${res ? `<div class="small text-muted mb-3">${icon('clock', 13)} ${esc(res.label)}</div>` : ''}
          <div class="cc-actions"><button class="btn btn-primary" data-cert="${esc(x.r.id)}" data-to="${esc(res ? res.h : '#/overview')}">Continue Learning ${icon('arrowR', 16)}</button><button class="btn btn-soft" data-cert="${esc(x.r.id)}" data-to="#/results">Progress</button></div></div></div>`; }).join('')}</div>`;
    });
  };

  // ---------- CERTIFICATION DASHBOARD (overview) ----------
  IC.v.overview = cert => {
    const name = IC.name(); const days = IC.daysToExam(cert); const at = IC.attempts(cert.id).filter(a => a.result);
    const best = at.length ? Math.max(...at.map(a => a.result.pct)) : null; const avg = at.length ? Math.round(at.slice(0, 5).reduce((s, a) => s + a.result.pct, 0) / Math.min(5, at.length)) : null;
    const sp = IC.studyProgress(cert); const spPct = sp.total ? Math.round((sp.done / sp.total) * 100) : 0; const res = IC.resume(cert.id); const s = certStats(cert);
    const ex = cert.exam; const heavy = cert.chapters.slice().sort((a, b) => b.points - a.points)[0]; const maxPts = heavy.points;
    const k3 = Object.values(ex.blueprint).reduce((n, bp) => n + (bp.K3 || 0), 0); const k3pts = ex.pointsByK.K3 || 1;
    const countTile = days == null ? `<div class="count-tile"><span>Your exam date</span><b>—</b><a href="#" class="text-white small" data-act="date">Set your date</a></div>`
      : `<div class="count-tile"><span>${days >= 0 ? 'Days until your exam' : 'Exam date passed'}</span><b>${days >= 0 ? days : Math.abs(days)}</b><a href="#" class="text-white small" data-act="date">${new Date(IC.examDate(cert) + 'T00:00:00').toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })} · change</a></div>`;
    view(`
      <section class="hero mb-4"><div class="row align-items-center g-4"><div class="col-lg-8">
        <span class="chip mb-3 on-dark">${esc(cert.org)} · ${esc(cert.short)} · ${esc(cert.reg.level)}</span>
        <h1>${name ? `${at.length || sp.done ? 'Welcome back' : 'Welcome'}, ${esc(name.split(' ')[0])}.` : esc(cert.name)}</h1>
        <p class="lead mb-4">${name ? `Everything for <b>${esc(cert.fullName)}</b> in one place: ${plural(s.chapters, 'chapter')}, ${plural(s.questions, 'practice question')}, ${plural(s.mocks, 'mock exam')} and ${plural(s.flash, 'flashcard')}.` : `Study notes, chapter tests, flashcards and full mock exams for <b>${esc(cert.fullName)}</b>. No sign-up – enter your name and start.`}</p>
        ${name ? `<div class="d-flex flex-wrap gap-2"><button class="btn btn-light btn-lg" data-go="${res && !res.exam ? esc(res.h) : '#/study'}">${icon('book', 20)} ${res && !res.exam ? 'Continue learning' : 'Start learning'}</button><button class="btn btn-ghost btn-lg" data-go="#/start">${icon('play', 20)} Take an exam</button></div>`
          : `<div class="name-box"><input id="heroName" maxlength="40" placeholder="Your name" aria-label="Your name" autocomplete="name"><button class="btn btn-light btn-lg" id="heroGo">Get started ${icon('arrowR', 18)}</button></div>`}
      </div><div class="col-lg-4 d-flex justify-content-lg-end">${countTile}</div></div></section>
      ${res ? `<a class="ic-resume mb-4" href="#" data-go="${esc(res.h)}"><span class="ico">${icon('play', 20)}</span><span class="tx"><small>Continue where you left off</small><b>${esc(res.label)}</b>${res.exam ? `<small>${esc(res.sub)}</small>` : ''}</span>${icon('arrowR', 18)}</a>` : ''}
      <div class="row g-3 mb-4">
        <div class="col-6 col-xl-3"><div class="ic-card stat"><div class="ico">${icon('book', 22)}</div><div><b>${spPct}%</b><span>Study progress (${sp.done}/${sp.total})</span></div></div></div>
        <div class="col-6 col-xl-3"><div class="ic-card stat"><div class="ico t">${icon('list', 22)}</div><div><b>${at.length}</b><span>Tests completed</span></div></div></div>
        <div class="col-6 col-xl-3"><div class="ic-card stat"><div class="ico w">${icon('award', 22)}</div><div><b>${best == null ? '—' : best + '%'}</b><span>Best score</span></div></div></div>
        <div class="col-6 col-xl-3"><div class="ic-card stat"><div class="ico t">${icon('target', 22)}</div><div><b>${avg == null ? '—' : avg + '%'}</b><span>Recent average · pass ${ex.passPercent}%</span></div></div></div>
      </div>
      <h4 class="mb-3">What would you like to do?</h4>
      <div class="row g-3 mb-4">
        ${[['#/syllabus', 'list', 'Syllabus', 'Chapters, learning objectives and what each chapter is worth in the exam.'], ['#/study', 'book', 'Study material', 'Exam-focused notes, key terms, tips and common traps.'], ['#/study/flash', 'cards', 'Flashcards', 'Per-chapter decks and a full-certification deck for final revision.'], ['#/chapters', 'layers', 'Chapter tests', 'Practise one chapter at a time with instant feedback.'], ['#/whole', 'award', 'Mock exams', 'Full-length, exam-style papers that follow the real blueprint.'], ['#/start', 'play', 'Exam prep', 'Quick quizzes, weak-areas drill and full exam simulations.']].map(c => `<div class="col-md-6 col-xl-4"><a class="ic-card hover tile" href="${c[0]}"><div class="chnum">${icon(c[1], 22)}</div><h5>${c[2]}</h5><div class="text-muted small">${c[3]}</div><div class="foot"><span class="text-primary fw-semibold">Open ${icon('arrowR', 16)}</span></div></a></div>`).join('')}
      </div>
      <div class="row g-3">
        <div class="col-lg-7"><div class="ic-card pad h-100"><div class="d-flex justify-content-between align-items-center mb-3"><h5 class="m-0">Where the exam points are</h5><span class="chip">${ex.totalPoints} points</span></div>
          ${cert.chapters.map(c => `<div class="pbar2"><div class="top"><span class="nm"><b>Ch ${c.n}</b> · ${esc(c.title)}</span><span class="pts">${c.points} pts</span></div><div class="track"><div class="fill" style="width:${(c.points / maxPts) * 100}%;background:var(--ic-grad)"></div></div></div>`).join('')}
          <div class="callout"><b>Insight</b>Chapter ${heavy.n} (${esc(heavy.title)}) is worth the most – ${heavy.points} of ${ex.totalPoints} points.${k3 ? ` ${plural(k3, 'question')} test application (K3)${k3pts > 1 ? `, worth ${k3pts} points each` : ''}.` : ''}</div></div></div>
        <div class="col-lg-5"><div class="ic-card pad h-100"><h5>Exam at a glance</h5><div class="kv mt-3"><div><b>${ex.questions}</b><span>questions</span></div><div><b>${ex.minutes} min</b><span>(+${ex.extraPercent}% non-native)</span></div><div><b>${ex.totalPoints}</b><span>points</span></div><div><b>${IC.passMark(cert, ex.totalPoints)}</b><span>to pass (${ex.passPercent}%)</span></div></div>
          <p class="small text-muted mt-3 mb-0">Prerequisite: ${esc(cert.prerequisite)}. ${k3pts > 1 ? `K3 questions are worth ${k3pts} points; K1 and K2 are worth 1.` : 'Every question is worth 1 point.'}</p></div></div>
      </div>`);
    const hg = IC.$('#heroGo'); if (hg) { const hn = IC.$('#heroName'); const go = () => { const v = hn.value.trim(); if (!v) { hn.focus(); hn.style.outline = '3px solid #fecaca'; return; } IC.store.set('name', v); IC.renderChrome(); IC.v.overview(cert); }; hg.onclick = go; hn.onkeydown = e => { if (e.key === 'Enter') go(); }; }
  };

  // ---------- SYLLABUS ----------
  IC.v.syllabus = cert => {
    const ex = cert.exam; const st = IC.chapterStats(cert.id); const sp = IC.studyProgress(cert);
    view(`<h1 class="ic-page-title">Syllabus</h1><p class="ic-sub">${esc(cert.fullName)} – ${cert.chapters.length} chapters, ${cert.chapters.reduce((n, c) => n + c.los.length, 0)} learning objectives.</p>
      <div class="ic-card pad mb-4"><div class="kv"><div><b>${ex.questions}</b><span>questions</span></div><div><b>${ex.minutes} min</b><span>(+${ex.extraPercent}% non-native)</span></div><div><b>${ex.totalPoints}</b><span>points</span></div><div><b>${IC.passMark(cert, ex.totalPoints)} (${ex.passPercent}%)</b><span>to pass</span></div></div>
        <p class="small text-muted mt-3 mb-0">${cert.reg.syllabusNote || ''}</p></div>
      ${cert.chapters.map(c => { const bp = ex.blueprint[c.n] || {}; const nq = Object.values(bp).reduce((a, b) => a + b, 0); const p = sp.byCh[c.n]; const s = st[c.n]; const acc = s && s.t ? Math.round(s.c / s.t * 100) : null;
        return `<div class="ic-card pad mb-3"><div class="d-flex flex-wrap align-items-center gap-3 mb-2"><div class="chnum">${c.n}</div><div class="flex-grow-1"><h5 class="m-0">${esc(c.title)}</h5><div class="small text-muted">${Math.round(c.minutes / 60 * 10) / 10} h teaching · ${nq} exam question${nq === 1 ? '' : 's'} · ${c.points} points${p ? ` · ${p.d}/${p.t} topics studied` : ''}${acc != null ? ` · ${acc}% accuracy` : ''}</div></div>
          <div class="d-flex flex-wrap gap-2"><a class="btn btn-sm btn-primary" href="#/study/${c.n}">${icon('book', 15)} Study</a><a class="btn btn-sm btn-soft" href="#/study/flash/ch${c.n}">${icon('cards', 15)} Flashcards</a><a class="btn btn-sm btn-soft" href="#/chapters/${c.n}">${icon('layers', 15)} Tests</a></div></div>
          ${c.los.map(l => `<div class="lo-row"><span class="lo-id">${esc(l.id)}</span><span class="badge-k k-${l.k}">${l.k}</span><div>${esc(l.t)}</div></div>`).join('')}</div>`; }).join('')}
      <div class="callout"><b>K-levels</b>K1 = remember · K2 = understand and explain · K3 = apply to a concrete situation. Questions in the exam are drawn from these learning objectives.</div>`);
  };
})();

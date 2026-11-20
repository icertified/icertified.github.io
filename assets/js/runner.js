/* iCertified – exam runner and result review */
(function () {
  const IC = window.IC; const { esc, icon } = IC;
  let timerId = null, keyHandler = null;
  const stopTimer = () => { if (timerId) { clearInterval(timerId); timerId = null; } if (keyHandler) { document.removeEventListener('keydown', keyHandler); keyHandler = null; } };
  IC.stopRunner = () => { stopTimer(); document.body.classList.remove('focus-mode'); };

  // ---- shared option renderer (runner + review) ----
  function optionsHtml(q, it, picked, o) {
    // o: {locked, reveal}  picked = array of ORIGINAL indices
    const multi = q.type === 'multi';
    return it.perm.map((orig, pos) => {
      const sel = picked.includes(orig), isAns = q.ans.includes(orig); let cls = 'opt' + (multi ? ' multi' : '');
      if (o.reveal) { cls += ' locked'; if (isAns && sel) cls += ' right'; else if (sel && !isAns) cls += ' wrong'; else if (isAns) cls += ' right missed'; }
      else if (sel) cls += ' sel';
      const mark = o.reveal ? (isAns ? `<span class="ms-auto text-success">${icon('check', 18)}</span>` : sel ? `<span class="ms-auto text-danger">${icon('x', 18)}</span>` : '') : '';
      return `<div class="${cls}" ${o.reveal || o.static ? '' : `data-opt="${orig}" role="${multi ? 'checkbox' : 'radio'}" aria-checked="${sel}" tabindex="0"`}><span class="ltr">${IC.letter(pos)}</span><span class="tx">${esc(q.opts[orig])}</span>${mark}</div>`;
    }).join('');
  }

  // ======================= RUNNER =======================
  IC.runExam = cert => {
    stopTimer();
    const at = IC.activeAttempt(cert.id);
    if (!at) { location.hash = '#/start'; return; }
    document.body.classList.add('focus-mode');
    const view = IC.$('#view'); const exam = at.mode === 'exam'; const N = at.questions.length;
    const persist = () => IC.setActive(at);
    const remaining = () => at.limit ? Math.max(0, at.limit - (Date.now() - at.started) / 1000) : 0;

    function render() {
      const it = at.questions[at.cur]; const q = cert.qmap[it.id]; const picked = at.answers[it.id] || []; const checked = !!at.checked[it.id];
      const answered = Object.keys(at.answers).filter(k => at.answers[k].length).length; const pts = IC.points(cert, q);
      const reveal = !exam && checked; const ok = reveal && IC.isCorrect(q, picked);
      const grid = at.questions.map((x, i) => {
        const a = at.answers[x.id] && at.answers[x.id].length; let c = '';
        if (i === at.cur) c += ' cur'; else if (!exam && at.checked[x.id]) c += IC.isCorrect(cert.qmap[x.id], at.answers[x.id]) ? ' good' : ' bad'; else if (a) c += ' ans';
        if (at.flags[x.id]) c += ' flag'; return `<button class="${c}" data-jump="${i}" aria-label="Question ${i + 1}">${i + 1}</button>`;
      }).join('');
      view.innerHTML = `<div class="ex">
        <div class="ex-top"><button class="ic-iconbtn" data-exit title="Exit to menu" aria-label="Exit">${icon('arrowL', 18)}</button>
          <div class="flex-grow-1" style="min-width:200px"><h2 class="ex-title">${esc(at.title)}</h2><div class="progress mt-1"><div class="progress-bar" style="width:${(answered / N) * 100}%"></div></div></div>
          <span class="chip ${exam ? 'warn' : ''}">${exam ? 'Exam mode' : 'Practice mode'}</span>
          ${at.limit ? `<span class="ex-timer" id="exTimer">${icon('clock', 18)}<span id="exTimerTx">${IC.fmtTime(remaining())}</span></span>` : ''}
          <button class="ic-iconbtn d-lg-none" data-navtoggle title="Question navigator">${icon('grid', 18)}</button>
          <button class="btn btn-primary" data-finish>Finish</button></div>
        <div class="ex-body"><div>
          <div class="ic-card qcard"><div class="qmeta"><span class="badge-k k-${q.k}">${q.k}</span><b>Question ${at.cur + 1} of ${N}</b><span>· ${pts} point${pts > 1 ? 's' : ''}</span>${exam ? '' : `<span>· Ch ${q.ch} · ${esc(q.lo)}</span>`}${q.type === 'multi' ? '<span class="chip">Select two</span>' : ''}${at.flags[it.id] ? `<span class="chip warn">${icon('flag', 13)} Flagged</span>` : ''}</div>
            <div class="qtext">${esc(q.q)}</div><div id="opts">${optionsHtml(q, it, picked, { reveal })}</div>
            ${reveal ? `<div class="explain fade-in"><b class="h">${ok ? 'Correct' : 'Not quite'} · explanation</b>${esc(q.exp)}</div>` : ''}</div>
          <div class="ex-foot"><button class="btn btn-soft" data-prev ${at.cur === 0 ? 'disabled' : ''}>${icon('arrowL', 18)} Previous</button>
            <div class="d-flex gap-2"><button class="btn ${at.flags[it.id] ? 'btn-warning' : 'btn-soft'}" data-flag>${icon('flag', 18)} ${at.flags[it.id] ? 'Unflag' : 'Flag'}</button>
              ${!exam && !checked ? `<button class="btn btn-primary" data-check ${picked.length ? '' : 'disabled'}>Check answer</button>` : ''}</div>
            <button class="btn btn-primary" data-next>${at.cur === N - 1 ? 'Review & finish' : 'Next'} ${icon('arrowR', 18)}</button></div>
          <div class="small text-muted mt-2">Shortcuts: ← → navigate · 1–${q.opts.length} choose · F flag${exam ? '' : ' · Enter check'}</div></div>
          <aside class="ex-nav ic-card" id="exNav"><div class="d-flex justify-content-between align-items-center mb-3"><b>Navigator</b><span class="small text-muted">${answered}/${N} answered</span></div><div class="navgrid">${grid}</div>
            <div class="legend"><span><i style="background:var(--ic-primary-600)"></i>Current</span><span><i style="background:var(--ic-primary-soft);border-color:var(--ic-primary)"></i>Answered</span><span><i style="background:var(--ic-warn)"></i>Flagged</span></div></aside></div></div>`;
      const nav = IC.$('#exNav'); const scroller = IC.$('.navgrid button.cur'); scroller && scroller.scrollIntoView({ block: 'nearest' });
      bind(); if (nav) nav.classList.remove('show');
    }

    function choose(orig) {
      const it = at.questions[at.cur]; const q = cert.qmap[it.id]; if (!exam && at.checked[it.id]) return;
      let cur = (at.answers[it.id] || []).slice();
      if (q.type === 'multi') { cur = cur.includes(orig) ? cur.filter(x => x !== orig) : [...cur, orig]; if (cur.length > 2) cur.shift(); } else cur = [orig];
      at.answers[it.id] = cur.sort(); persist(); render();
    }
    function go(i) { at.cur = Math.max(0, Math.min(N - 1, i)); persist(); render(); window.scrollTo(0, 0); }
    function finish(auto) {
      const unanswered = at.questions.filter(x => !(at.answers[x.id] && at.answers[x.id].length)).length; const flagged = Object.keys(at.flags).filter(k => at.flags[k]).length;
      const submit = () => { stopTimer(); at.finished = true; at.ended = Date.now(); at.result = IC.score(cert, at); IC.saveAttempt(at); IC.clearActive(cert.id); location.hash = '#/result/' + at.id; };
      if (auto) return submit();
      const m = IC.modal(`<div class="modal-header border-0"><h5 class="modal-title">Finish this test?</h5></div><div class="modal-body">
        <div class="kv mb-3"><div><b>${N - unanswered}</b><span>answered</span></div><div><b class="${unanswered ? 'text-danger' : ''}">${unanswered}</b><span>unanswered</span></div><div><b>${flagged}</b><span>flagged</span></div></div>
        <p class="text-muted mb-0">${unanswered ? 'Unanswered questions score zero. You can go back and complete them.' : 'All questions answered. Ready to see your score?'}</p></div>
        <div class="modal-footer border-0"><button class="btn btn-soft" data-bs-dismiss="modal">Keep working</button><button class="btn btn-primary" id="subOk">Submit &amp; see results</button></div>`);
      IC.$('#subOk', m.el).onclick = () => { m.hide(); submit(); };
    }
    function bind() {
      view.onclick = e => {
        const t = e.target.closest('button, [data-opt]'); if (!t) return;
        if (t.dataset.opt != null) return choose(+t.dataset.opt);
        if (t.dataset.jump != null) return go(+t.dataset.jump);
        if ('prev' in t.dataset) return go(at.cur - 1);
        if ('next' in t.dataset) return at.cur === N - 1 ? finish() : go(at.cur + 1);
        if ('flag' in t.dataset) { const id = at.questions[at.cur].id; at.flags[id] = !at.flags[id]; persist(); return render(); }
        if ('check' in t.dataset) { at.checked[at.questions[at.cur].id] = true; persist(); return render(); }
        if ('finish' in t.dataset) return finish();
        if ('navtoggle' in t.dataset) return IC.$('#exNav').classList.toggle('show');
        if ('exit' in t.dataset) { const m = IC.modal(`<div class="modal-header border-0"><h5 class="modal-title">Leave this test?</h5></div><div class="modal-body text-muted">Your progress is saved. You can resume from the Home page${at.limit ? ' – but the exam timer keeps running' : ''}.</div><div class="modal-footer border-0"><button class="btn btn-soft" data-bs-dismiss="modal">Stay</button><button class="btn btn-primary" id="lvOk">Leave</button></div>`); IC.$('#lvOk', m.el).onclick = () => { m.hide(); location.hash = '#/home'; }; }
      };
      view.onkeydown = e => { if (e.key === 'Enter' && e.target.dataset && e.target.dataset.opt != null) { e.preventDefault(); choose(+e.target.dataset.opt); } };
    }
    keyHandler = e => {
      if ((e.target.matches && e.target.matches('input, textarea')) || document.querySelector('.modal.show')) return;
      const it = at.questions[at.cur]; const q = cert.qmap[it.id];
      if (e.key === 'ArrowRight') go(at.cur + 1); else if (e.key === 'ArrowLeft') go(at.cur - 1);
      else if (e.key.toLowerCase() === 'f') { at.flags[it.id] = !at.flags[it.id]; persist(); render(); }
      else if (e.key === 'Enter' && !exam && !at.checked[it.id] && (at.answers[it.id] || []).length) { at.checked[it.id] = true; persist(); render(); }
      else if (/^[1-5]$/.test(e.key) && +e.key <= q.opts.length) choose(it.perm[+e.key - 1]);
    };
    document.addEventListener('keydown', keyHandler);
    if (at.limit) {
      if (remaining() <= 0) return finish(true);
      timerId = setInterval(() => { const r = remaining(); const tx = IC.$('#exTimerTx'); if (tx) tx.textContent = IC.fmtTime(r); const tm = IC.$('#exTimer'); if (tm) tm.classList.toggle('low', r <= 300); if (r <= 0) { IC.toast('Time is up – submitting your answers.', 'warning'); finish(true); } }, 1000);
    }
    render();
  };

  // ======================= RESULT =======================
  function donut(pct, pass) {
    const r = 74, c = 2 * Math.PI * r, col = pass ? '#16a34a' : '#ef4444';
    return `<svg class="donut" viewBox="0 0 190 190"><circle cx="95" cy="95" r="${r}" fill="none" stroke="var(--ic-border)" stroke-width="16"/><circle cx="95" cy="95" r="${r}" fill="none" stroke="${col}" stroke-width="16" stroke-linecap="round" stroke-dasharray="${(c * Math.min(pct, 100)) / 100} ${c}" transform="rotate(-90 95 95)"/><text x="95" y="96" text-anchor="middle" font-size="40" fill="currentColor">${Math.round(pct)}%</text><text x="95" y="124" text-anchor="middle" font-size="13" fill="${col}" style="font-weight:700;letter-spacing:.1em">${pass ? 'PASSED' : 'NOT PASSED'}</text></svg>`;
  }
  IC.runResult = (cert, id) => {
    IC.stopRunner();
    const at = IC.getAttempt(cert.id, id); const el = IC.$('#view');
    if (!at || !at.result) { location.hash = '#/results'; return; }
    const r = at.result; let filter = 'all';
    const secs = Math.max(0, Math.round(((at.ended || at.started) - at.started) / 1000));
    const rows = at.questions.map((it, i) => { const q = cert.qmap[it.id]; const ans = at.answers[it.id] || []; return { it, q, i, ans, ok: IC.isCorrect(q, ans), skip: !ans.length, flag: !!at.flags[it.id] }; });
    const weak = cert.chapters.map(c => ({ c, v: r.byChapter[c.n] })).filter(x => x.v && x.v.t && x.v.c / x.v.t < 0.65);
    const cat = IC.catalogue(cert); const spec = IC.findSpec(cert, at.specId);
    // Per-test retry: only the misses of THIS test that are not yet fixed in a later attempt.
    const missedAll = IC.missedIn(cert, at, true).length, retryN = IC.missedIn(cert, at).length;
    const retryBtn = retryN ? `<button class="btn btn-primary" data-start="retry-${at.id}">${icon('refresh', 18)} Retry the ${retryN} ${retryN < missedAll ? 'still missed from' : 'I missed in'} this test</button>` : (missedAll ? '<div class="callout good mb-0"><b>All fixed</b>You have since answered every question you missed in this test correctly.</div>' : '');

    function review() {
      const list = rows.filter(x => filter === 'all' || (filter === 'wrong' && !x.ok && !x.skip) || (filter === 'skip' && x.skip) || (filter === 'flag' && x.flag) || (filter === 'right' && x.ok));
      return list.map(x => `<div class="ic-card rv"><div class="hd"><span class="num ${x.ok ? 'good' : x.skip ? 'skip' : 'bad'}">${x.i + 1}</span><span class="badge-k k-${x.q.k}">${x.q.k}</span><span class="chip">Ch ${x.q.ch}</span><span class="text-muted small">${esc(x.q.lo)} · ${IC.points(cert, x.q)} pt</span>${x.flag ? `<span class="chip warn">${icon('flag', 12)} flagged</span>` : ''}<span class="ms-auto chip ${x.ok ? 'ok' : 'bad'}">${x.ok ? 'Correct' : x.skip ? 'Unanswered' : 'Incorrect'}</span></div>
        <div class="qtext" style="font-size:1rem">${esc(x.q.q)}</div>${optionsHtml(x.q, x.it, x.ans, { reveal: true })}<div class="explain"><b class="h">Explanation</b>${esc(x.q.exp)}</div></div>`).join('') || '<div class="ic-card empty">Nothing in this filter.</div>';
    }
    function paint() {
      el.innerHTML = `<div class="fade-in"><a href="#/results" class="small text-decoration-none">← All results</a>
      <div class="ic-card pad my-3"><div class="d-flex flex-wrap gap-4 align-items-center">${donut(r.pct, r.pass)}
        <div class="flex-grow-1" style="min-width:260px"><div class="eyebrow">${esc(at.mode === 'exam' ? 'Exam mode' : 'Practice mode')} · ${esc(cert.short)}</div><h2 class="mb-1">${esc(at.title)}</h2><div class="text-muted mb-3">${esc(at.name)} · ${IC.fmtDate(at.ended)}</div>
          <div class="kv"><div><b>${r.earned}/${r.total}</b><span>points (pass ${r.passMark})</span></div><div><b class="text-success">${r.correct}</b><span>correct</span></div><div><b class="text-danger">${r.wrong}</b><span>wrong</span></div><div><b>${r.unanswered}</b><span>unanswered</span></div><div><b>${IC.fmtTime(secs)}</b><span>time used</span></div></div>
          <p class="mt-3 mb-0 ${r.pass ? 'text-success' : 'text-danger'} fw-semibold">${r.pass ? 'Well done – this score would pass the real exam. Keep it consistent.' : `You need ${r.passMark - r.earned} more point${r.passMark - r.earned > 1 ? 's' : ''} to reach the pass mark. Review the explanations below.`}</p></div></div></div>
      <div class="row g-3 mb-3"><div class="col-lg-7"><div class="ic-card pad h-100"><h5 class="mb-3">Score by chapter</h5>${cert.chapters.filter(c => r.byChapter[c.n]).map(c => { const v = r.byChapter[c.n]; const p = Math.round((v.c / v.t) * 100); return `<div class="pbar"><div class="lbl">Ch ${c.n}</div><div class="track"><div class="fill" style="width:${p}%;background:${IC.colorFor(p)}"></div></div><div class="val">${p}% (${v.c}/${v.t})</div></div>`; }).join('')}
        <h6 class="mt-3">By level</h6>${['K1', 'K2', 'K3'].filter(k => r.byK[k]).map(k => { const v = r.byK[k]; const p = Math.round((v.c / v.t) * 100); return `<div class="pbar"><div class="lbl"><span class="badge-k k-${k}">${k}</span></div><div class="track"><div class="fill" style="width:${p}%;background:${IC.colorFor(p)}"></div></div><div class="val">${p}% (${v.c}/${v.t})</div></div>`; }).join('')}</div></div>
        <div class="col-lg-5"><div class="ic-card pad h-100"><h5>What next?</h5>${weak.length ? `<div class="callout warn mb-3"><b>Weak chapters (below 65%)</b>${weak.map(x => `<a href="#/study/${x.c.n}">Chapter ${x.c.n}</a>`).join(' · ')}</div>` : '<div class="callout good mb-3"><b>Solid</b>No chapter below the pass line in this attempt.</div>'}
          <div class="d-grid gap-2">${retryBtn}${IC.wrongQids(cert).length > retryN ?`<button class="btn btn-soft" data-start="${cat.quick.mistakes.id}">Retry all my past mistakes (${IC.wrongQids(cert).length})</button>` : ''}${spec ? `<button class="btn btn-soft" data-start="${esc(spec.id)}">Take this test again</button>` : ''}<a class="btn btn-soft" href="#/whole">More whole tests</a><a class="btn btn-soft" href="#/chapters">Chapter-wise practice</a></div></div></div></div>
      <div class="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3"><h4 class="m-0">Answer review</h4><div class="filter-chips d-flex gap-2 flex-wrap">${[['all', 'All ' + rows.length], ['wrong', 'Wrong ' + r.wrong], ['skip', 'Unanswered ' + r.unanswered], ['right', 'Correct ' + r.correct], ['flag', 'Flagged']].map(f => `<button data-f="${f[0]}" class="${filter === f[0] ? 'on' : ''}">${f[1]}</button>`).join('')}</div></div>
      <div id="rvList">${review()}</div></div>`;
      IC.$$('[data-f]', el).forEach(b => b.onclick = () => { filter = b.dataset.f; paint(); IC.$('#rvList').scrollIntoView({ behavior: 'smooth', block: 'start' }); });
    }
    paint();
  };
})();

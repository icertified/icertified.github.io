/* iCertified – study views: overview, chapter notes, flashcards, key terms, exam guide */
(function () {
  const IC = window.IC; const { esc, icon } = IC; let flashKey = null;

  const tabsHtml = cur => `<div class="tabs-ic">${[['', 'Study path'], ['flash', 'Flashcards'], ['terms', 'Key terms'], ['guide', 'Exam guide']].filter(t => t[0] !== 'guide' || (IC.cert() && IC.cert().study && IC.cert().study.guide)).map(t => `<a href="#/study${t[0] ? '/' + t[0] : ''}" class="${cur === t[0] ? 'on' : ''}">${t[1]}</a>`).join('')}</div>`;
  const secHtml = (n, s, done, open) => {
    let b = '';
    if (s.bullets) b += `<ul>${s.bullets.map(x => `<li>${x}</li>`).join('')}</ul>`;
    if (s.table) b += `<div class="table-responsive"><table class="tbl"><thead><tr>${s.table.head.map(h => `<th>${h}</th>`).join('')}</tr></thead><tbody>${s.table.rows.map(r => `<tr>${r.map((c, i) => `<td>${i === 0 ? '<b>' + c + '</b>' : c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
    if (s.callout) b += `<div class="callout ${s.callout.t === 'good' ? 'good' : s.callout.t === 'warn' ? 'warn' : ''}"><b>${s.callout.h}</b>${s.callout.x}</div>`;
    return `<details class="sec" ${open ? 'open' : ''}><summary><span class="done-check ${done ? 'on' : ''}" data-ck="${n}.${s.id}">${icon('check', 14)}</span><span>${s.title}</span><span class="chev">${icon('chev', 18)}</span></summary><div class="body">${b}<div class="mt-3"><button class="btn btn-sm ${done ? 'btn-soft' : 'btn-primary'}" data-done="${n}.${s.id}">${done ? '✓ Studied – undo' : 'Mark as studied'}</button></div></div></details>`;
  };

  function overview(cert) {
    const S = cert.study; const sp = IC.studyProgress(cert); const pct = sp.total ? Math.round((sp.done / sp.total) * 100) : 0;
    IC.setView(`<h1 class="ic-page-title">Enroll &amp; study</h1><p class="ic-sub">Your learning path for ${esc(cert.fullName)}. Work through the chapters in order, then lock it in with flashcards and tests.</p>${tabsHtml('')}
      <div class="ic-card pad mb-4 d-flex flex-wrap gap-3 align-items-center"><div class="flex-grow-1" style="min-width:240px"><div class="d-flex justify-content-between mb-1"><b>Study progress</b><span class="text-muted">${sp.done} of ${sp.total} topics · ${pct}%</span></div><div class="progress" style="height:12px"><div class="progress-bar" style="width:${pct}%"></div></div></div>
        <button class="btn btn-primary" data-go="#/study/flash/k1">${icon('cards', 18)} K1 flashcards</button></div>
      <div class="row g-3">${cert.chapters.map(c => { const p = sp.byCh[c.n] || { d: 0, t: 0 }; const cp = p.t ? Math.round((p.d / p.t) * 100) : 0; const ks = {}; c.los.forEach(l => ks[l.k] = (ks[l.k] || 0) + 1);
        return `<div class="col-md-6 col-xl-4"><a class="ic-card hover tile" href="#/study/${c.n}"><div class="d-flex gap-3 align-items-center"><div class="chnum">${c.n}</div><h5>${esc(c.title)}</h5></div>
          <div class="meta"><span>${icon('clock', 14)} ${Math.round(c.minutes / 60 * 10) / 10} h teaching</span><span>${icon('award', 14)} ${c.points} exam pts</span></div>
          <div class="d-flex gap-1">${Object.keys(ks).map(k => `<span class="badge-k k-${k}">${ks[k]} × ${k}</span>`).join('')}</div>
          <div><div class="d-flex justify-content-between small text-muted mb-1"><span>${p.d}/${p.t} topics studied</span><span>${cp}%</span></div><div class="progress"><div class="progress-bar" style="width:${cp}%"></div></div></div>
          <div class="foot"><span class="text-primary fw-semibold">${cp ? 'Continue' : 'Start'} ${icon('arrowR', 16)}</span></div></a></div>`; }).join('')}</div>`);
  }

  function chapter(cert, n) {
    const S = cert.study; const c = cert.chapters.find(x => x.n === +n); const d = S.chapters[n];
    if (!c || !d) return overview(cert);
    const done = IC.store.get('study.' + cert.id, {});
    const prev = cert.chapters.find(x => x.n === c.n - 1), next = cert.chapters.find(x => x.n === c.n + 1);
    IC.setView(`<a href="#/study" class="small text-decoration-none">← Study path</a>
      <div class="d-flex flex-wrap align-items-center gap-3 mt-2 mb-3"><div class="chnum">${c.n}</div><div class="flex-grow-1"><h1 class="ic-page-title m-0">${esc(c.title)}</h1><div class="text-muted">${c.points} exam points · ${c.minutes} min of teaching</div></div><button class="btn btn-primary" data-go="#/chapters/${c.n}">${icon('layers', 18)} Practise this chapter</button></div>
      <div class="ic-card pad mb-3"><p class="mb-3">${d.summary}</p><h6>Learning objectives</h6>${c.los.map(l => `<div class="lo-row"><span class="lo-id">${l.id}</span><span class="badge-k k-${l.k}">${l.k}</span><div>${esc(l.t)}</div></div>`).join('')}</div>
      <div id="secs">${d.sections.map((s, i) => secHtml(c.n, s, done[`${c.n}.${s.id}`], i === 0)).join('')}</div>
      <div class="row g-3 mt-1"><div class="col-lg-6"><div class="ic-card pad h-100"><h5>${icon('bulb', 20)} Exam tips</h5><ul class="mb-0">${d.tips.map(t => `<li class="mb-2">${t}</li>`).join('')}</ul></div></div>
      <div class="col-lg-6"><div class="ic-card pad h-100"><h5>${icon('shield', 20)} Common traps</h5><ul class="mb-0">${d.traps.map(t => `<li class="mb-2">${t}</li>`).join('')}</ul></div></div></div>
      <div class="ic-card pad mt-3"><h5>Key terms</h5>${d.terms.map(t => `<div class="term"><b>${t[0]}</b> – ${t[1]}</div>`).join('')}</div>
      <div class="d-flex justify-content-between mt-4">${prev ? `<a class="btn btn-soft" href="#/study/${prev.n}">${icon('arrowL', 18)} Chapter ${prev.n}</a>` : '<span></span>'}${next ? `<a class="btn btn-primary" href="#/study/${next.n}">Chapter ${next.n} ${icon('arrowR', 18)}</a>` : `<a class="btn btn-primary" href="#/start">Start an exam ${icon('arrowR', 18)}</a>`}</div>`);
    const toggle = key => { const m = IC.store.get('study.' + cert.id, {}); m[key] ? delete m[key] : (m[key] = true); IC.store.set('study.' + cert.id, m); const secs = IC.$$('details.sec'); const open = secs.map(x => x.open); IC.keepScroll(); chapter(cert, n); IC.$$('details.sec').forEach((x, i) => x.open = open[i]); };
    IC.$('#secs').onclick = e => { const b = e.target.closest('[data-done],[data-ck]'); if (!b) return; e.preventDefault(); toggle(b.dataset.done || b.dataset.ck); };
  }

  function terms(cert) {
    const S = cert.study; const map = new Map();
    Object.values(S.chapters).forEach(c => c.terms.forEach(t => { if (!map.has(t[0].toLowerCase())) map.set(t[0].toLowerCase(), t); }));
    const all = [...map.values()].sort((a, b) => a[0].localeCompare(b[0]));
    IC.setView(`<h1 class="ic-page-title">Key terms</h1><p class="ic-sub">Glossary of the terms you must be able to recognise and explain. Keywords are examined at K2 level (definition).</p>${tabsHtml('terms')}
      <div class="ic-card pad"><input class="form-control mb-3" id="tq" placeholder="Search ${all.length} terms…" aria-label="Search terms"><div id="tl"></div></div>`);
    const paint = q => { IC.$('#tl').innerHTML = all.filter(t => !q || (t[0] + ' ' + t[1]).toLowerCase().includes(q)).map(t => `<div class="term"><b>${t[0]}</b> – ${t[1]}</div>`).join('') || '<div class="empty">No match.</div>'; };
    paint(''); IC.$('#tq').oninput = e => paint(e.target.value.trim().toLowerCase());
  }

  function guide(cert) {
    const g = cert.study.guide; const ex = cert.exam;
    IC.setView(`<h1 class="ic-page-title">Exam guide</h1><p class="ic-sub">Everything about the exam itself, and how to turn knowledge into points.</p>${tabsHtml('guide')}
      <div class="ic-card pad mb-3"><h5>Exam facts</h5><div class="kv mt-2"><div><b>${ex.questions}</b><span>multiple-choice questions</span></div><div><b>${ex.totalPoints}</b><span>points in total</span></div><div><b>${IC.passMark(cert, ex.totalPoints)} (${ex.passPercent}%)</b><span>to pass</span></div><div><b>${ex.minutes} min</b><span>+${ex.extraPercent}% non-native</span></div></div><p class="small text-muted mt-3 mb-0">Prerequisite: ${esc(cert.prerequisite)}.</p></div>
      <div class="ic-card pad mb-3"><h5>Points by chapter</h5><div class="table-responsive"><table class="tbl"><thead><tr><th>Chapter</th><th>Questions</th><th>Points</th><th>% of points</th><th>K-levels</th></tr></thead><tbody>${cert.chapters.map(c => { const bp = ex.blueprint[c.n]; const n = Object.values(bp).reduce((a, b) => a + b, 0); return `<tr><td><b>${c.n}. ${esc(c.title)}</b></td><td>${n}</td><td>${c.points}</td><td>${(c.points / ex.totalPoints * 100).toFixed(1)}%</td><td>${Object.keys(bp).map(k => `<span class="badge-k k-${k}">${k} × ${bp[k]}</span>`).join(' ')}</td></tr>`; }).join('')}<tr><td><b>Total</b></td><td><b>${ex.questions}</b></td><td><b>${ex.totalPoints}</b></td><td>100%</td><td></td></tr></tbody></table></div></div>
      <div class="ic-card pad mb-3"><h5>How K-levels shape your strategy</h5><div class="table-responsive"><table class="tbl"><thead><tr><th>Level</th><th>Focus</th><th>Questions</th><th>Points</th><th>Study approach</th></tr></thead><tbody>${g.kLevels.map(r => `<tr><td><span class="badge-k k-${r[0]}">${r[0]}</span></td><td>${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td><td>${r[4]}</td></tr>`).join('')}</tbody></table></div>
        ${g.callout ? `<div class="callout"><b>${g.callout.h}</b>${g.callout.x}</div>` : ''}</div>
      <div class="row g-3 mb-3"><div class="col-lg-6"><div class="ic-card pad h-100"><h5>${icon('clock', 20)} Time management</h5><ul>${g.time.map(t => `<li class="mb-2">${t}</li>`).join('')}</ul></div></div><div class="col-lg-6"><div class="ic-card pad h-100"><h5>${icon('target', 20)} Answering technique</h5><ul>${g.technique.map(t => `<li class="mb-2">${t}</li>`).join('')}</ul></div></div></div>
      <div class="ic-card pad mb-3"><h5>Suggested study plan</h5>${g.plan.map(p => `<div class="lo-row"><span class="lo-id" style="min-width:90px"><b>${p[0]}</b></span><div>${p[1]}</div></div>`).join('')}</div>
      <div class="ic-card pad"><h5>Exam-day checklist</h5><ul class="mb-0">${g.checklist.map(t => `<li class="mb-2">${t}</li>`).join('')}</ul></div>`);
  }

  // ---------- flashcards ----------
  const fs = { deck: 'k1', order: [], i: 0, flip: false, onlyLearning: false };
  function flashCards(cert, deck) {
    const S = cert.study; const cards = (S.flash || []).map(c => ({ key: c.lo + '|' + c.f, f: c.f, b: c.b, ch: c.ch, k: c.k, lo: c.lo }));
    const termMap = new Map(); Object.values(S.chapters).forEach(c => c.terms.forEach(t => { if (!termMap.has(t[0])) termMap.set(t[0], { key: 'term|' + t[0], f: t[0], b: t[1], ch: 0, k: 'Term', lo: 'Glossary' }); }));
    const decks = { k1: ['K1 recall', cards.filter(c => c.k === 'K1')], list: ['Key lists', cards.filter(c => c.k === 'List')], terms: ['Glossary', [...termMap.values()]], all: ['Everything', [...cards, ...termMap.values()]] };
    cert.chapters.forEach(ch => { decks['ch' + ch.n] = ['Chapter ' + ch.n, [...cards.filter(c => c.ch === ch.n), ...[...termMap.values()].filter(() => false)]]; });
    if (!decks[deck]) deck = 'all';
    const known = IC.store.get('flash.' + cert.id, {});
    if (fs.deck !== deck || !fs.order.length) { fs.deck = deck; fs.order = IC.shuffle(decks[deck][1]); fs.i = 0; fs.flip = false; }
    const pool = () => fs.onlyLearning ? fs.order.filter(c => !known[c.key]) : fs.order;
    let first = true;
    function paint() {
      if (!first) IC.keepScroll(); first = false;
      const list = pool(); const nKnown = decks[deck][1].filter(c => known[c.key]).length; const tot = decks[deck][1].length;
      if (fs.i >= list.length) fs.i = Math.max(0, list.length - 1);
      const c = list[fs.i];
      IC.setView(`<h1 class="ic-page-title">Flashcards</h1><p class="ic-sub">Active recall beats re-reading. <b>K1 recall</b> covers every “Recall / Recognize” learning objective – these are the free points on exam day.</p>${tabsHtml('flash')}
        <div class="filter-chips d-flex gap-2 flex-wrap mb-3">${Object.keys(decks).filter(k => decks[k][1].length).map(k => `<button data-deck="${k}" class="${k === deck ? 'on' : ''}">${decks[k][0]} · ${decks[k][1].length}</button>`).join('')}</div>
        <div class="row justify-content-center"><div class="col-lg-8">
          <div class="d-flex justify-content-between small text-muted mb-1"><span>${list.length ? 'Card ' + (fs.i + 1) + ' of ' + list.length : 'No cards'}</span><span>${nKnown}/${tot} known</span></div><div class="progress mb-3"><div class="progress-bar" style="width:${tot ? nKnown / tot * 100 : 0}%"></div></div>
          ${c ? `<div class="flash ${fs.flip ? 'flip' : ''}" id="fc" tabindex="0" role="button" aria-label="Flip card"><div class="flash-in"><div class="face front"><div class="small mb-2" style="opacity:.8">${esc(c.k)} · ${esc(c.lo)}</div>${c.f}<div class="small mt-3" style="opacity:.75;font-weight:500">Tap or press Space to reveal</div></div><div class="face back"><div class="eyebrow mb-2">${c.f}</div>${c.b}</div></div></div>
          <div class="d-flex flex-wrap justify-content-between gap-2 mt-3"><button class="btn btn-soft" data-fa="prev">${icon('arrowL', 18)} Prev</button><div class="d-flex gap-2"><button class="btn btn-outline-danger" data-fa="learn">Still learning (L)</button><button class="btn btn-primary" data-fa="know">${icon('check', 18)} I know it (K)</button></div><button class="btn btn-soft" data-fa="next">Next ${icon('arrowR', 18)}</button></div>`
            : `<div class="ic-card empty">${icon('award', 34)}<h5 class="mt-2">Deck complete!</h5><p>You know every card in this deck.</p><button class="btn btn-primary" data-fa="reset">Reset deck</button></div>`}
          <div class="d-flex flex-wrap justify-content-between align-items-center mt-3"><div class="form-check"><input class="form-check-input" type="checkbox" id="onlyL" ${fs.onlyLearning ? 'checked' : ''}><label class="form-check-label small" for="onlyL">Hide cards I know</label></div><div class="d-flex gap-2"><button class="btn btn-sm btn-soft" data-fa="shuffle">${icon('refresh', 15)} Shuffle</button><button class="btn btn-sm btn-soft" data-fa="reset">Reset progress</button></div></div></div></div>`);
      const set = (k, v) => { if (!c) return; if (v) known[c.key] = true; else delete known[c.key]; IC.store.set('flash.' + cert.id, known); };
      const act = a => {
        const l = pool();
        if (a === 'flip') fs.flip = !fs.flip;
        else if (a === 'next') { fs.i = (fs.i + 1) % Math.max(1, l.length); fs.flip = false; }
        else if (a === 'prev') { fs.i = (fs.i - 1 + l.length) % Math.max(1, l.length); fs.flip = false; }
        else if (a === 'know') { set(0, true); if (!fs.onlyLearning) fs.i = (fs.i + 1) % Math.max(1, l.length); fs.flip = false; }
        else if (a === 'learn') { set(0, false); fs.i = (fs.i + 1) % Math.max(1, l.length); fs.flip = false; }
        else if (a === 'shuffle') { fs.order = IC.shuffle(fs.order); fs.i = 0; fs.flip = false; }
        else if (a === 'reset') { decks[deck][1].forEach(x => delete known[x.key]); IC.store.set('flash.' + cert.id, known); fs.i = 0; fs.flip = false; }
        paint();
      };
      IC.$$('[data-deck]').forEach(b => b.onclick = () => { fs.order = []; location.hash = '#/study/flash/' + b.dataset.deck; });
      IC.$$('[data-fa]').forEach(b => b.onclick = () => act(b.dataset.fa));
      const fc = IC.$('#fc'); if (fc) fc.onclick = () => act('flip');
      const ol = IC.$('#onlyL'); if (ol) ol.onchange = () => { fs.onlyLearning = ol.checked; fs.i = 0; paint(); };
      if (flashKey) document.removeEventListener('keydown', flashKey);
      flashKey = e => {
        if (!location.hash.startsWith('#/study/flash') || (e.target.matches && e.target.matches('input,textarea,button,a')) || document.querySelector('.modal.show')) return;
        const m = { ' ': 'flip', Enter: 'flip', ArrowRight: 'next', ArrowLeft: 'prev', k: 'know', l: 'learn' }[e.key.length === 1 ? e.key.toLowerCase() : e.key];
        if (m) { e.preventDefault(); act(m); }
      };
      document.addEventListener('keydown', flashKey);
    }
    paint();
  }

  IC.v.study = (cert, arg, arg2) => {
    if (!cert.study) return IC.setView('<div class="ic-card empty">Study material for this certification is coming soon.</div>');
    if (arg === 'flash') { if (fs.cert !== cert.id) { fs.cert = cert.id; fs.order = []; fs.i = 0; fs.flip = false; fs.deck = ''; } return flashCards(cert, arg2 || 'all'); }
    if (arg === 'terms') return terms(cert);
    if (arg === 'guide') return guide(cert);
    if (arg && /^\d+$/.test(arg)) return chapter(cert, arg);
    overview(cert);
  };
})();

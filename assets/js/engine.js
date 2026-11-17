/* iCertified – certification loader, exam builder, scoring (no UI code here) */
(function () {
  const IC = window.IC;

  // ---------- certification packs ----------
  IC.registry = () => window.ICREGISTRY || [];
  IC.regEntry = id => IC.registry().find(c => c.id === id);
  const loading = {};
  function loadScript(src) {
    return new Promise((res, rej) => {
      const s = document.createElement('script'); s.src = src; s.async = false;
      s.onload = res; s.onerror = () => rej(new Error('Could not load ' + src)); document.head.appendChild(s);
    });
  }
  IC.loadCert = id => {
    const reg = IC.regEntry(id); if (!reg) return Promise.reject(new Error('Unknown certification ' + id));
    if (window.ICERT && window.ICERT[id] && window.ICERT[id].__ready) return Promise.resolve(window.ICERT[id]);
    if (loading[id]) return loading[id];
    loading[id] = reg.files.reduce((p, f) => p.then(() => loadScript(`certs/${reg.folder}/${f}`)), Promise.resolve()).then(() => {
      const cert = window.ICERT[id]; cert.reg = reg;
      cert.questions = (window.ICQ && window.ICQ[id]) || [];
      cert.qmap = {}; cert.questions.forEach(q => { cert.qmap[q.id] = q; });
      cert.study = (window.ICSTUDY && window.ICSTUDY[id]) || null;
      cert.__ready = true; return cert;
    });
    return loading[id];
  };

  IC.points = (cert, q) => (cert.exam.pointsByK[q.k] != null ? cert.exam.pointsByK[q.k] : 1);
  IC.pool = (cert, f) => cert.questions.filter(q => q.pool !== false && (!f || f(q)));
  IC.passMark = (cert, total) => Math.ceil((total * cert.exam.passPercent) / 100 - 1e-9);
  const estMinutes = (cert, qs) => Math.max(5, Math.ceil(qs.reduce((s, q) => s + (q.k === 'K3' ? 3 : q.k === 'K2' ? 1.5 : 1), 0)));

  // ---------- exam catalogue ----------
  function blueprintDraw(cert, rnd, used) {
    const out = [];
    Object.keys(cert.exam.blueprint).map(Number).sort().forEach(ch => {
      const bp = cert.exam.blueprint[ch];
      Object.keys(bp).forEach(k => {
        let cand = IC.pool(cert, q => q.ch === ch && q.k === k);
        cand = IC.shuffle(cand, rnd);
        if (used) cand.sort((a, b) => (used[a.id] || 0) - (used[b.id] || 0)); // stable: prefer unused
        const take = cand.slice(0, bp[k]); take.forEach(q => { if (used) used[q.id] = (used[q.id] || 0) + 1; }); out.push(...take);
      });
    });
    return out.sort((a, b) => a.ch - b.ch || a.lo.localeCompare(b.lo, undefined, { numeric: true }));
  }

  IC.catalogue = cert => {
    if (cert.__cat) return cert.__cat;
    const cat = { official: [], mocks: [], chapters: {}, random: null };
    const sets = {}; cert.questions.forEach(q => { if (q.set) (sets[q.set] = sets[q.set] || []).push(q); });
    const offTitle = { 'official-a': 'ISTQB Website Sample Exam A' };
    Object.keys(sets).forEach(sid => {
      const qs = sets[sid].slice().sort((a, b) => a.id.localeCompare(b.id));
      cat.official.push({ id: sid, kind: 'official', title: offTitle[sid] || sid, subtitle: 'Official ISTQB sample paper – questions exactly as published', qids: qs.map(q => q.id), minutes: cert.exam.minutes, shuffleOpts: false, mode: 'exam', ordered: true });
    });
    const used = {}; const nMock = cert.exam.mockCount || 5;
    for (let m = 1; m <= nMock; m++) {
      const qs = blueprintDraw(cert, IC.rng(IC.hashStr(cert.id + 'mock' + m)), used);
      cat.mocks.push({ id: 'mock-' + m, kind: 'mock', title: `iCertified Mock Exam ${m}`, subtitle: 'Full-length mock built to the official exam blueprint', qids: qs.map(q => q.id), minutes: cert.exam.minutes, shuffleOpts: true, mode: 'exam', ordered: true });
    }
    cat.random = { id: 'random-whole', kind: 'random', title: 'iCertified Whole Test – Random Draw', subtitle: 'A fresh exam drawn to the official blueprint – questions you have not seen yet come first', gen: 'blueprint', minutes: cert.exam.minutes, shuffleOpts: true, mode: 'exam', ordered: true };
    cert.chapters.forEach(chp => {
      const pool = IC.pool(cert, q => q.ch === chp.n);
      const rnd = IC.rng(IC.hashStr(cert.id + 'ch' + chp.n));
      const sh = IC.shuffle(pool, rnd);
      const nSets = Math.max(1, Math.round(sh.length / 10)); const size = Math.ceil(sh.length / nSets);
      const list = [];
      for (let i = 0; i < nSets; i++) {
        const qs = sh.slice(i * size, (i + 1) * size).sort((a, b) => a.lo.localeCompare(b.lo, undefined, { numeric: true }));
        if (!qs.length) continue;
        list.push({ id: `ch${chp.n}-set${i + 1}`, kind: 'chapter', ch: chp.n, title: `Chapter ${chp.n} · Practice Set ${i + 1}`, subtitle: chp.title, qids: qs.map(q => q.id), minutes: estMinutes(cert, qs), shuffleOpts: true, shuffleQ: true, mode: 'practice' });
      }
      cat.chapters[chp.n] = {
        count: pool.length, sets: list,
        full: pool.length ? { id: `ch${chp.n}-full`, kind: 'chapter', ch: chp.n, title: `Chapter ${chp.n} · Full Chapter Test`, subtitle: chp.title, qids: pool.map(q => q.id), minutes: estMinutes(cert, pool), shuffleOpts: true, shuffleQ: true, mode: 'exam' } : null,
        quick: pool.length ? { id: `ch${chp.n}-quick`, kind: 'chapter', ch: chp.n, title: `Chapter ${chp.n} · Quick 10 (random)`, subtitle: chp.title, gen: 'chapterRandom', n: 10, minutes: 15, shuffleOpts: true, shuffleQ: true, mode: 'practice' } : null
      };
    });
    cat.quick = {
      mixed: { id: 'quick-mixed', kind: 'quick', title: 'Quick Quiz · 10 mixed questions', subtitle: 'Ten questions from every chapter – unseen ones come first', gen: 'mixed', n: 10, minutes: 15, shuffleOpts: true, mode: 'practice' },
      weak: { id: 'quick-weak', kind: 'quick', title: 'Weak-Areas Drill', subtitle: 'Questions from the chapters where you score lowest', gen: 'weak', n: 15, minutes: 22, shuffleOpts: true, mode: 'practice' },
      mistakes: { id: 'quick-mistakes', kind: 'quick', title: 'Retry My Mistakes', subtitle: 'Questions you answered wrongly in earlier tests', gen: 'mistakes', n: 20, minutes: 30, shuffleOpts: true, mode: 'practice' }
    };
    cert.__cat = cat; return cat;
  };
  IC.findSpec = (cert, id) => {
    const c = IC.catalogue(cert);
    const all = [...c.official, ...c.mocks, c.random, c.quick.mixed, c.quick.weak, c.quick.mistakes];
    Object.values(c.chapters).forEach(x => { all.push(...x.sets); if (x.full) all.push(x.full); if (x.quick) all.push(x.quick); });
    return all.find(s => s && s.id === id);
  };
  IC.specInfo = (cert, spec) => {
    let qs;
    if (spec.qids) qs = spec.qids.map(id => cert.qmap[id]);
    else if (spec.gen === 'blueprint') return { n: cert.exam.questions, total: cert.exam.totalPoints, pass: IC.passMark(cert, cert.exam.totalPoints), minutes: spec.minutes };
    else {
      const avail = spec.gen === 'chapterRandom' ? IC.pool(cert, q => q.ch === spec.ch).length : spec.gen === 'mistakes' ? (IC.wrongQids ? IC.wrongQids(cert).length : spec.n) : IC.pool(cert).length;
      const n = Math.min(spec.n, avail); return { n, total: Math.round(n * 1.2), pass: null, minutes: spec.minutes };
    }
    const total = qs.reduce((s, q) => s + IC.points(cert, q), 0);
    return { n: qs.length, total, pass: IC.passMark(cert, total), minutes: spec.minutes };
  };

  // ---------- "seen" tracking: random draws prefer questions the learner has not met yet ----------
  IC.seen = certId => IC.store.get('seen.' + certId, {});
  IC.markSeen = (certId, ids) => { const s = IC.seen(certId); ids.forEach(id => { s[id] = (s[id] || 0) + 1; }); IC.store.set('seen.' + certId, s); };
  IC.resetSeen = certId => IC.store.del('seen.' + certId);
  function unseenFirst(cert, list, n) {
    const s = IC.seen(cert.id);
    return IC.shuffle(list).sort((a, b) => (s[a.id] || 0) - (s[b.id] || 0)).slice(0, n); // shuffle first = random tie-break; sort is stable
  }

  // ---------- attempts ----------
  const comboOpts = q => q.opts.some(o => /^(i|ii|iii|iv|v|both|neither)\b/i.test(o.trim()));
  IC.createAttempt = (cert, spec, o) => {
    let qs;
    if (spec.qids) qs = spec.qids.map(id => cert.qmap[id]);
    else if (spec.gen === 'blueprint') qs = blueprintDraw(cert, Math.random, Object.assign({}, IC.seen(cert.id))); // least-seen questions first, blueprint unchanged
    else if (spec.gen === 'mixed') qs = unseenFirst(cert, IC.pool(cert), spec.n);
    else if (spec.gen === 'mistakes') qs = IC.shuffle(IC.wrongQids(cert).map(id => cert.qmap[id]).filter(Boolean)).slice(0, spec.n);
    else if (spec.gen === 'weak') {
      const st = IC.chapterStats(cert.id);
      const rank = cert.chapters.map(c => ({ n: c.n, acc: st[c.n] && st[c.n].t ? st[c.n].c / st[c.n].t : 0.5 })).sort((a, b) => a.acc - b.acc);
      const picks = rank.slice(0, 2).map(r => r.n); const wrongSet = new Set(IC.wrongQids(cert));
      let cand = IC.shuffle(IC.pool(cert, q => picks.includes(q.ch)));
      cand.sort((a, b) => (wrongSet.has(b.id) ? 1 : 0) - (wrongSet.has(a.id) ? 1 : 0));
      qs = IC.shuffle(cand.slice(0, spec.n));
    }
    else qs = unseenFirst(cert, IC.pool(cert, q => q.ch === spec.ch), spec.n);
    if (spec.shuffleQ) qs = IC.shuffle(qs);
    if (!qs.length) qs = IC.shuffle(IC.pool(cert)).slice(0, spec.n || 10);
    IC.markSeen(cert.id, qs.filter(q => q.pool !== false).map(q => q.id));
    const questions = qs.map(q => {
      let perm = q.opts.map((_, i) => i);
      if (spec.shuffleOpts && !comboOpts(q)) perm = IC.shuffle(perm);
      return { id: q.id, perm };
    });
    const exam = o.mode === 'exam';
    return {
      id: 'a' + Date.now().toString(36) + Math.floor(Math.random() * 1e4).toString(36),
      cert: cert.id, specId: spec.id, title: spec.title, kind: spec.kind, ch: spec.ch || null,
      name: o.name, mode: o.mode, extra: !!o.extra, started: Date.now(),
      limit: exam ? Math.round(spec.minutes * 60 * (o.extra ? 1.25 : 1)) : 0,
      questions, answers: {}, flags: {}, checked: {}, cur: 0, finished: false
    };
  };
  IC.isCorrect = (q, ans) => { if (!ans || !ans.length) return false; const a = ans.slice().sort().join(','), c = q.ans.slice().sort().join(','); return a === c; };
  IC.score = (cert, at) => {
    const r = { total: 0, earned: 0, correct: 0, wrong: 0, unanswered: 0, n: at.questions.length, byChapter: {}, byK: {}, byLO: {} };
    at.questions.forEach(it => {
      const q = cert.qmap[it.id]; const pts = IC.points(cert, q); const ans = at.answers[it.id];
      const ok = IC.isCorrect(q, ans); r.total += pts;
      const bc = r.byChapter[q.ch] = r.byChapter[q.ch] || { c: 0, t: 0, ep: 0, tp: 0 };
      const bk = r.byK[q.k] = r.byK[q.k] || { c: 0, t: 0 };
      bc.t++; bc.tp += pts; bk.t++;
      if (!ans || !ans.length) r.unanswered++;
      else if (ok) { r.correct++; r.earned += pts; bc.c++; bc.ep += pts; bk.c++; }
      else r.wrong++;
      if (ok) bc.ok = 1;
    });
    r.pct = r.total ? Math.round((r.earned / r.total) * 1000) / 10 : 0;
    r.passMark = IC.passMark(cert, r.total); r.pass = r.earned >= r.passMark;
    return r;
  };

  IC.attempts = certId => IC.store.get('attempts.' + certId, []);
  IC.saveAttempt = at => { const l = IC.attempts(at.cert).filter(a => a.id !== at.id); l.unshift(at); IC.store.set('attempts.' + at.cert, l.slice(0, 200)); };
  IC.getAttempt = (certId, id) => IC.attempts(certId).find(a => a.id === id);
  IC.activeAttempt = certId => IC.store.get('active.' + certId, null);
  IC.setActive = at => IC.store.set('active.' + at.cert, at);
  IC.clearActive = certId => IC.store.del('active.' + certId);
  IC.bestFor = (certId, specId) => {
    const l = IC.attempts(certId).filter(a => a.specId === specId && a.result);
    if (!l.length) return null; return l.reduce((b, a) => (a.result.pct > b.result.pct ? a : b));
  };
  IC.chapterStats = certId => {
    const st = {};
    IC.attempts(certId).forEach(a => { if (!a.result) return; Object.entries(a.result.byChapter).forEach(([ch, v]) => { const s = st[ch] = st[ch] || { c: 0, t: 0 }; s.c += v.c; s.t += v.t; }); });
    return st;
  };
})();

/* CTFL v4.0 study notes – Chapter 3, written in our own words from Syllabus v4.0.1 for exam preparation.
 * Always cross-check with the official syllabus: https://www.istqb.org */
(window.ICSTUDY = window.ICSTUDY || {});
(window.ICSTUDY['ctfl-4'] = window.ICSTUDY['ctfl-4'] || { chapters: {}, flash: [] });
window.ICSTUDY['ctfl-4'].chapters[3] = {
  summary: 'Static testing: what it is, which work products it can examine, its value, how it differs from dynamic testing, the benefits of early stakeholder feedback, the review process, review roles, review types and success factors. 4 exam questions, 4 points: 2 × K1 and 2 × K2 (1 point each; pass mark is 26 of 40 over the whole exam).',
  sections: [
    { id: 'basics', title: 'Static testing basics and work products (FL-3.1.1 · K1)', bullets: [
      'In static testing the software does <b>not</b> have to be executed. Work products are evaluated by <b>manual examination</b> (reviews) or <b>with a tool</b> (static analysis). It can serve verification and validation.',
      'Objectives: improve quality, detect defects, assess characteristics such as readability, completeness, correctness, testability and consistency.',
      '<b>Examinable work products:</b> almost any – requirement specifications, source code, test plans, test cases, product backlog items, test charters, project documentation, contracts, models.',
      '<b>Reviews</b> work on anything that can be read and understood. <b>Static analysis</b> needs a structure to check against (models, code, text with formal syntax).',
      '<b>Not suitable:</b> work products hard for humans to interpret and which should not be analysed by tools, e.g. third-party executable code (legal reasons).',
      'Agile collaboration (example mapping, collaborative user story writing, backlog refinement) uses review techniques to make sure user stories are complete, understandable and have testable acceptance criteria, e.g. against the Definition of Ready.',
      'Static analysis finds problems before dynamic testing, often with less effort (no test cases needed), is often part of CI, and is also used for maintainability and security. Spelling checkers and readability tools are examples.'
    ] },
    { id: 'value', title: 'Value of static testing (FL-3.1.2 · K2)', bullets: [
      'Finds defects in the <b>earliest SDLC phases</b> (early testing principle).',
      'Finds defects dynamic testing cannot: <b>unreachable code</b>, design patterns not implemented as intended, defects in non-executable work products.',
      'Builds confidence in work products; checking documented requirements lets stakeholders confirm they reflect real needs; creates <b>shared understanding</b> and better communication, so involve a wide variety of stakeholders.',
      'Reviews can be costly, but total project cost is usually much lower than without them, because less is spent fixing defects late.',
      'Some code defects are found more efficiently by static analysis than by dynamic testing, giving fewer code defects and lower development effort.'
    ], callout: { t: 'good', h: 'Key idea', x: 'Static testing finds <i>defects</i> directly and early; it complements, not replaces, dynamic testing.' } },
    { id: 'static-vs-dynamic', title: 'Static vs dynamic testing (FL-3.1.3 · K2)', table: { head: ['Aspect', 'Static testing', 'Dynamic testing'], rows: [
      ['Execution', 'Software not executed', 'Software must run'],
      ['How defects are found', 'Directly finds defects', 'Causes failures; defects are then found by analysing them'],
      ['Applicable work products', 'Also non-executable ones', 'Only executable ones'],
      ['Hard-to-reach code paths', 'Can detect defects on rarely executed or hard-to-reach paths more easily', 'Such paths are hard to exercise'],
      ['Quality characteristics', 'Those independent of execution, e.g. maintainability', 'Those dependent on execution, e.g. performance efficiency']
    ] }, bullets: [
      'Both support defect detection and complement each other; some defect types can only be found by one of them.',
      '<b>Typical defects easier or cheaper to find statically:</b> requirement defects (inconsistencies, ambiguities, contradictions, omissions, inaccuracies, duplications); design defects (inefficient database structures, poor modularization); some coding defects (undefined or undeclared variables, unreachable or duplicated code, excessive complexity); deviations from standards (e.g. naming conventions); incorrect interface specifications (mismatched number, type or order of parameters); specific security vulnerabilities (e.g. buffer overflows); gaps in test basis coverage (e.g. no test for an acceptance criterion).'
    ] },
    { id: 'feedback', title: 'Early and frequent stakeholder feedback (FL-3.2.1 · K1)', bullets: [
      'Allows <b>early communication of potential quality problems</b>.',
      'Without enough stakeholder involvement the product may miss the stakeholders’ original or current vision, leading to costly rework, missed deadlines, blame games, even project failure.',
      'Frequent feedback <b>prevents misunderstandings about requirements</b>, makes sure requirement changes are understood and implemented earlier, and helps the team understand what they build.',
      'The team can focus on the features that give the most value and best address identified risks.'
    ] },
    { id: 'process', title: 'The review process activities (FL-3.2.2 · K2)', bullets: [
      'ISO/IEC 20246 defines a generic, tailorable review process; more formal reviews use more of its tasks. Large work products may need several review runs.'
    ], table: { head: ['Activity', 'What happens'], rows: [
      ['1. Planning', 'Define the scope: purpose, work product, quality characteristics, focus areas, exit criteria, standards, effort and timeframe'],
      ['2. Review initiation', 'Make sure everyone and everything is ready: access to the work product, understanding of roles, all needed material'],
      ['3. Individual review', 'Each reviewer assesses the work product with one or more techniques (e.g. checklist-based, scenario-based) and logs anomalies, recommendations and questions'],
      ['4. Communication and analysis', 'Anomalies are not necessarily defects, so they are analysed and discussed (usually in a review meeting): decide status, ownership and actions for each, and the quality level of the work product; follow-up review may be needed'],
      ['5. Fixing and reporting', 'Create a defect report for every defect; fix; accept the work product once exit criteria are met; report review results']
    ] }, callout: { t: 'warn', h: 'Exam trap', x: 'Anomalies logged by reviewers are <i>not automatically defects</i>; deciding which are defects happens during communication and analysis.' } },
    { id: 'roles', title: 'Roles and responsibilities in reviews (FL-3.2.3 · K1)', table: { head: ['Role', 'Responsibility'], rows: [
      ['Manager', 'Decides what is reviewed; provides resources such as staff and time'],
      ['Author', 'Creates and fixes the work product under review'],
      ['Moderator (facilitator)', 'Ensures effective review meetings: mediation, time management, a safe environment where everyone can speak freely'],
      ['Scribe (recorder)', 'Collates anomalies from reviewers; records review information such as decisions and new anomalies from the meeting'],
      ['Reviewer', 'Performs reviews; may be a project member, subject matter expert or other stakeholder'],
      ['Review leader', 'Takes overall responsibility: decides who is involved; organises when and where the review happens']
    ] }, bullets: ['One person may take several roles. ISO/IEC 20246 describes more detailed roles.'] },
    { id: 'types', title: 'Review types (FL-3.2.4 · K2)', table: { head: ['Type', 'Characteristics', 'Main objective(s)'], rows: [
      ['Informal review', 'No defined process; no formal documented output required', 'Detect anomalies'],
      ['Walkthrough', 'Led by the <b>author</b>; individual review beforehand is optional', 'Many: quality, confidence, educating reviewers, consensus, new ideas, motivating authors, finding anomalies'],
      ['Technical review', 'Technically qualified reviewers; led by a <b>moderator</b>', 'Consensus and decisions on a technical problem; also anomalies, quality, confidence, ideas, author motivation'],
      ['Inspection', 'Most formal; follows the complete generic process; metrics collected to improve the SDLC and the inspection process; the author cannot be review leader or scribe', 'Find the maximum number of anomalies; also quality, confidence, author motivation']
    ] }, bullets: [
      'Needed formality depends on the SDLC, process maturity, criticality and complexity of the work product, legal or regulatory needs, and the need for an audit trail. The same work product may get an informal review first and a more formal one later.',
      'Choosing the type depends on objectives and also project needs, resources, work product type and risks, business domain and company culture.'
    ] },
    { id: 'success', title: 'Success factors for reviews (FL-3.2.5 · K1)', bullets: [
      'Clear objectives and <b>measurable exit criteria</b>; evaluating participants is never an objective.',
      'Right review type for the objectives, work product, participants and context.',
      'Review <b>small chunks</b> so concentration is kept.',
      'Give feedback to stakeholders and authors.',
      'Give participants <b>adequate preparation time</b>.',
      '<b>Management support</b> for the review process.',
      'Make reviews part of the <b>organisation’s culture</b> (learning, process improvement).',
      'Provide <b>adequate training</b> so people can fulfil their roles.',
      'Facilitate meetings.'
    ] }
  ],
  terms: [
    ['Anomaly', 'Any condition that deviates from expectation, e.g. found in a review or in testing; not necessarily a defect.'],
    ['Dynamic testing', 'Testing that involves executing the test object.'],
    ['Formal review', 'Review following a defined process with formally documented output (e.g. inspection).'],
    ['Informal review', 'Review without a defined process and without a required formal output.'],
    ['Inspection', 'The most formal review type; follows the complete generic process and aims to find the maximum number of anomalies.'],
    ['Review', 'Static testing in which people examine a work product to find anomalies and improve quality.'],
    ['Static analysis', 'Tool-supported examination of code or other work products without executing them.'],
    ['Static testing', 'Testing a work product without executing the software, by review or static analysis.'],
    ['Technical review', 'Review by technically qualified reviewers, led by a moderator, to reach consensus on technical issues.'],
    ['Walkthrough', 'Author-led review used to inform, educate, gain consensus and detect anomalies.']
  ],
  tips: [
    'Memorise the five review activities in order and the six principal roles with one responsibility each.',
    'For review types, remember the leader: walkthrough = author, technical review = moderator, inspection = formal with metrics and author not leader or scribe.',
    'Static testing finds defects; dynamic testing shows failures. Use that contrast for compare-and-contrast questions.',
    'Know the success factors list; “evaluating participants” is the classic wrong one.'
  ],
  traps: [
    'Assuming static testing replaces dynamic testing – they complement each other and each finds defects the other cannot.',
    'Treating every review anomaly as a defect.',
    'Thinking performance efficiency can be measured statically – it depends on execution, so it needs dynamic testing.',
    'Mixing up the moderator (runs the meeting) with the review leader (overall responsibility, who and when) and the scribe (records).'
  ]
};
window.ICSTUDY['ctfl-4'].flash.push(
  { ch: 3, k: 'K1', lo: 'FL-3.1.1', f: 'Work products examinable by static testing', b: 'Almost any: requirement specs, source code, test plans, test cases, backlog items, test charters, project documentation, contracts, models.' },
  { ch: 3, k: 'K1', lo: 'FL-3.1.1', f: 'Work products NOT suited to static testing', b: 'Those hard for humans to interpret and which should not be tool-analysed, e.g. third-party executable code (legal reasons).' },
  { ch: 3, k: 'K1', lo: 'FL-3.1.1', f: 'Review vs static analysis: what can be examined?', b: 'Reviews: anything that can be read and understood. Static analysis: work products with a structure to check against (models, code, formal-syntax text).' },
  { ch: 3, k: 'K1', lo: 'FL-3.2.1', f: 'Benefits of early and frequent stakeholder feedback', b: 'Early notice of quality problems · prevents requirement misunderstandings · changes understood and implemented earlier · focus on the most valuable features and biggest risks.' },
  { ch: 3, k: 'List', lo: 'FL-3.2.2', f: 'The five review process activities', b: 'Planning · review initiation · individual review · communication and analysis · fixing and reporting.' },
  { ch: 3, k: 'K1', lo: 'FL-3.2.3', f: 'Manager and author roles in a review', b: 'Manager: decides what is reviewed and provides resources. Author: creates and fixes the work product under review.' },
  { ch: 3, k: 'K1', lo: 'FL-3.2.3', f: 'Moderator (facilitator) role', b: 'Ensures effective review meetings: mediation, time management and a safe environment in which everyone can speak freely.' },
  { ch: 3, k: 'K1', lo: 'FL-3.2.3', f: 'Scribe (recorder) role', b: 'Collates anomalies from reviewers and records review information such as decisions and new anomalies from the meeting.' },
  { ch: 3, k: 'K1', lo: 'FL-3.2.3', f: 'Reviewer and review leader roles', b: 'Reviewer: performs the review (project member, SME or other stakeholder). Review leader: overall responsibility, decides participants, organises when and where.' },
  { ch: 3, k: 'List', lo: 'FL-3.2.4', f: 'Four commonly used review types', b: 'Informal review · walkthrough · technical review · inspection.' },
  { ch: 3, k: 'List', lo: 'FL-3.2.4', f: 'Who leads each review type?', b: 'Walkthrough: the author. Technical review: a moderator. Inspection: formal process, author may not be review leader or scribe. Informal: no defined process.' },
  { ch: 3, k: 'K1', lo: 'FL-3.2.5', f: 'Success factors for reviews (part 1)', b: 'Clear objectives and measurable exit criteria (never evaluating participants) · appropriate review type · small chunks · feedback to stakeholders and authors · adequate preparation time.' },
  { ch: 3, k: 'K1', lo: 'FL-3.2.5', f: 'Success factors for reviews (part 2)', b: 'Management support · reviews part of organisational culture · adequate training · facilitated meetings.' },
  { ch: 3, k: 'List', lo: 'FL-3.1.3', f: 'Typical defects easier to find by static testing', b: 'Requirement defects · design defects · some coding defects · deviations from standards · wrong interface specifications · some security vulnerabilities · test basis coverage gaps.' },
  { ch: 3, k: 'List', lo: 'FL-3.1.3', f: 'Static vs dynamic testing in one line', b: 'Static finds defects directly without execution (also in non-executable products); dynamic causes failures from which defects are analysed and needs executable software.' },
  { ch: 3, k: 'List', lo: 'FL-3.1.2', f: 'Value of static testing', b: 'Early defect detection · finds defects dynamic testing cannot (e.g. unreachable code) · builds confidence · shared understanding · lower overall cost despite review effort.' }
);

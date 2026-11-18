/* CTFL v4.0 study notes – Chapter 2, written in our own words from Syllabus v4.0.1 for exam preparation.
 * Always cross-check with the official syllabus: https://www.istqb.org */
(window.ICSTUDY = window.ICSTUDY || {});
(window.ICSTUDY['ctfl-4'] = window.ICSTUDY['ctfl-4'] || { chapters: {}, flash: [] });
window.ICSTUDY['ctfl-4'].chapters[2] = {
  summary: 'How testing fits into the software development lifecycle (SDLC): the impact of the SDLC, good practices, test-first approaches, DevOps, shift left, retrospectives, then test levels, test types, confirmation vs regression testing and maintenance testing. 6 exam questions, 6 points: 2 × K1 and 4 × K2 (1 point each; pass mark is 26 of 40 over the whole exam).',
  sections: [
    { id: 'sdlc-impact', title: 'Impact of the SDLC on testing (FL-2.1.1 · K2)', bullets: [
      'An SDLC model is an abstract, high-level view of how development phases and activities relate logically and in time. Families: <b>sequential</b> (waterfall, V-model), <b>iterative</b> (spiral, prototyping), <b>incremental</b> (Unified Process).',
      'Testing must be adapted to the SDLC. The chosen SDLC affects: <b>scope and timing of test activities</b> (levels and types), <b>level of test documentation</b>, <b>choice of test techniques and approach</b>, <b>extent of test automation</b>, and the <b>role and responsibilities of the tester</b>.',
      '<b>Sequential models:</b> testers take part early in requirement reviews, test analysis and test design, but code exists only in later phases, so dynamic testing is typically not possible early.',
      '<b>Iterative/incremental models:</b> every iteration delivers a working product increment, so static and dynamic testing can happen at all test levels in each iteration. Frequent delivery needs fast feedback and extensive regression testing.',
      '<b>Agile:</b> change is expected, so lightweight documentation and extensive test automation (to ease regression testing) are favoured; most manual testing uses experience-based techniques that need little upfront analysis and design.'
    ], table: { head: ['SDLC family', 'Testing consequence'], rows: [
      ['Sequential (waterfall, V-model)', 'Early static testing and test design; dynamic testing late, once code exists'],
      ['Iterative / incremental', 'Static and dynamic testing at all levels in every iteration; fast feedback; heavy regression testing'],
      ['Agile', 'Light documentation, extensive automation, experience-based techniques for manual testing']
    ] } },
    { id: 'good-practices', title: 'Good testing practices in every SDLC (FL-2.1.2 · K1)', bullets: [
      'Every development activity has a <b>corresponding test activity</b>, so all development activities are subject to quality control.',
      'Each test level has <b>its own specific objectives</b>, which keeps testing comprehensive without redundancy.',
      'Test analysis and design for a level <b>start during the corresponding development phase</b> (principle of early testing).',
      'Testers join <b>reviews of work product drafts as soon as drafts exist</b>, supporting shift left.'
    ], callout: { t: 'good', h: 'Memory hook', x: 'Four practices: corresponding test activity · level-specific objectives · early analysis and design · early review of drafts.' } },
    { id: 'test-first', title: 'Test-first approaches: TDD, ATDD, BDD (FL-2.1.3 · K1)', table: { head: ['Approach', 'Key idea'], rows: [
      ['TDD – test-driven development', 'Tests direct the coding instead of extensive upfront design: write tests first, write code to pass them, then refactor tests and code.'],
      ['ATDD – acceptance test-driven development', 'Tests are derived from acceptance criteria as part of system design, and are written before the corresponding part of the application is built.'],
      ['BDD – behavior-driven development', 'Desired behavior is expressed as test cases in simple natural language that stakeholders understand, usually Given/When/Then; these are then automatically turned into executable tests.']
    ] }, bullets: [
      'All three apply early testing and shift left because tests are defined <b>before</b> the code, and they support an iterative development model.',
      'The resulting tests can stay as automated tests to protect code quality during future changes and refactoring.'
    ] },
    { id: 'devops', title: 'DevOps and testing (FL-2.1.4 · K2)', bullets: [
      'DevOps is an organisational approach in which development (including testing) and operations work together towards common goals. It needs a cultural shift and promotes team autonomy, fast feedback, integrated toolchains, and CI/CD practices delivered through a <b>delivery pipeline</b>.',
      '<b>Benefits for testing:</b> fast feedback on code quality and on whether changes harm existing code; CI promotes shift left (developers submit code with component tests and static analysis); automation (CI/CD) helps establish stable test environments; more visibility of non-functional characteristics (e.g. performance efficiency, reliability); less repetitive manual testing; lower regression risk thanks to many automated regression tests.',
      '<b>Risks and challenges:</b> the delivery pipeline has to be defined and set up; CI/CD tools must be introduced and maintained; test automation needs extra resources and can be hard to build and maintain.',
      'Manual testing, especially from the user’s perspective, is still needed.'
    ], callout: { t: 'warn', h: 'Exam trap', x: 'DevOps does <i>not</i> remove manual testing. It reduces repetitive manual testing, but user-perspective manual testing remains necessary.' } },
    { id: 'shift-left', title: 'Shift left (FL-2.1.5 · K2)', bullets: [
      'Shift left is another name for the principle of early testing: test <b>earlier</b> in the SDLC (do not wait for code or integration). It does <b>not</b> mean later testing is neglected.',
      '<b>Practices that achieve it:</b> reviewing specifications from the tester’s viewpoint (finds ambiguities, incompleteness, inconsistencies); writing test cases before code and running code in a test harness while it is implemented; using CI, ideally CD, with automated component tests accompanying each submission; running static analysis before dynamic testing or in an automated process; starting non-functional testing at component level where possible.',
      'It may cost extra training, effort or money early on, but is expected to save effort and cost later. Stakeholders must be convinced and buy into the idea.'
    ] },
    { id: 'retro', title: 'Retrospectives and process improvement (FL-2.1.6 · K2)', bullets: [
      'Held at the end of a project or iteration, at a release milestone, or when needed; timing and form depend on the SDLC. Participants include testers, developers, architects, product owner, business analysts and others.',
      'Three questions: what went well and should be kept? what did not go well and could improve? how do we put improvements in place and keep the successes?',
      'Results are recorded and normally become part of the <b>test completion report</b> (see 5.3.2). Retrospectives are critical for continuous improvement, so recommended improvements must be <b>followed up</b>.',
      '<b>Typical benefits for testing:</b> higher test effectiveness/efficiency; better testware quality; team bonding and learning; improved quality of the test basis (requirement problems get addressed); better cooperation between development and testing.'
    ] },
    { id: 'levels', title: 'Test levels (FL-2.2.1 · K2)', bullets: [
      'A test level is a group of test activities organised and managed together; each is an instance of the test process, related to a phase of development. In sequential models the exit criteria of one level are often part of the entry criteria of the next; levels may overlap in time.',
      'Levels are told apart by (non-exhaustive): <b>test object, test objectives, test basis, defects and failures, approach and responsibilities</b>.'
    ], table: { head: ['Level', 'Focus', 'Notes'], rows: [
      ['Component testing (unit testing)', 'Components in isolation', 'Often needs test harnesses or unit test frameworks; normally done by developers in their own environment'],
      ['Component integration testing (unit integration testing)', 'Interfaces and interactions between components', 'Depends heavily on the integration strategy: bottom-up, top-down or big-bang'],
      ['System testing', 'Overall behavior and capabilities of the whole system or product', 'End-to-end functional tasks and non-functional characteristics; representative environment; may be done by an independent team; related to system specifications'],
      ['System integration testing', 'Interfaces between the system under test and other systems and external services', 'Needs an environment similar to the operational one'],
      ['Acceptance testing', 'Validation and readiness for deployment: does the system meet the users’ business needs?', 'Ideally done by intended users. Forms: UAT, operational, contractual, regulatory, alpha and beta testing']
    ] } },
    { id: 'types', title: 'Test types (FL-2.2.2 · K2)', table: { head: ['Type', 'Question it answers', 'Main objective'], rows: [
      ['Functional', 'WHAT should the test object do?', 'Check functional completeness, correctness and appropriateness'],
      ['Non-functional', 'HOW WELL does it behave?', 'Check non-functional quality characteristics (ISO/IEC 25010)'],
      ['Black-box', 'Is behavior as specified? (specification-based; ignores internal structure)', 'Check behavior against specifications'],
      ['White-box', 'Is the internal structure covered? (structure-based: code, architecture, work and data flows)', 'Cover the underlying structure to an acceptable degree']
    ] }, bullets: [
      '<b>ISO/IEC 25010 non-functional characteristics:</b> performance efficiency, compatibility, usability (interaction capability), reliability, security, maintainability, portability (flexibility), safety.',
      'Non-functional testing can start early (reviews, component testing); many non-functional tests reuse functional tests while checking a constraint (e.g. response time). Late discovery of non-functional defects is a serious project threat; some need special environments (e.g. usability lab).',
      'All four types can be applied at <b>all</b> test levels, though the focus differs. Test types are groups of activities tied to specific quality characteristics.'
    ] },
    { id: 'conf-reg', title: 'Confirmation vs regression testing (FL-2.2.3 · K2)', table: { head: ['', 'Confirmation testing', 'Regression testing'], rows: [
      ['Purpose', 'Confirm that the original defect has been fixed', 'Confirm that a change (including an already confirmed fix) has had no adverse side effects'],
      ['Typical tests', 'Re-run the tests that failed because of the defect; possibly add tests for changes made by the fix; under time pressure, just redo the steps that reproduced the failure', 'Broad suite covering the changed area, other components, even connected systems and the environment'],
      ['Planning aids', 'Depends on risk', 'Impact analysis first to see which parts could be affected; strong candidate for automation, grows every iteration or release']
    ] }, bullets: [
      'Both are needed on every test level where defects are fixed or changes made. With CI (e.g. DevOps) include automated regression tests, possibly on several levels. Start test automation early.'
    ] },
    { id: 'maintenance', title: 'Maintenance testing and its triggers (FL-2.3.1 · K2)', bullets: [
      'Maintenance can be corrective, adaptive (to environment changes) or aimed at improving performance or maintainability (ISO/IEC 14764); releases can be planned or unplanned (hot fixes).',
      'Testing a change to an operational system covers both <b>evaluating the change itself</b> and <b>checking for regressions</b> in the unchanged parts (usually most of the system). <b>Impact analysis</b> may be done before the change to decide whether to make it.',
      '<b>Scope depends on:</b> the degree of risk of the change, the size of the existing system, the size of the change.',
      '<b>Triggers:</b> (1) <b>modifications</b> – planned enhancements, corrective changes, hot fixes; (2) <b>upgrades or migrations</b> of the operational environment – including tests of the new environment and of data conversion; (3) <b>retirement</b> – may need testing of data archiving, and of restore/retrieval procedures for archived data.'
    ], callout: { t: 'good', h: 'Memory hook', x: 'Three triggers: Modification · Migration/upgrade · Retirement.' } }
  ],
  terms: [
    ['Acceptance testing', 'Test level focused on validation and on showing the system is ready for deployment and meets business needs.'],
    ['Black-box testing', 'Specification-based testing that derives tests from documentation, not from internal structure.'],
    ['Component integration testing', 'Test level checking the interfaces and interactions between components.'],
    ['Component testing', 'Test level that tests components in isolation (also unit testing).'],
    ['Confirmation testing', 'Re-testing to confirm that an original defect has been fixed.'],
    ['Functional testing', 'Testing the functions (the “what”) a component or system should perform.'],
    ['Integration testing', 'Testing the interfaces and interactions between components or systems (component integration and system integration).'],
    ['Maintenance testing', 'Testing changes to an operational system or the impact of a changed environment on it.'],
    ['Non-functional testing', 'Testing attributes other than functionality, i.e. how well the system behaves.'],
    ['Regression testing', 'Testing that a change has not caused adverse effects in the changed or other parts of the system.'],
    ['Shift left', 'Approach of performing testing earlier in the SDLC.'],
    ['System integration testing', 'Test level checking interfaces between the system under test and other systems or external services.'],
    ['System testing', 'Test level covering the overall behavior and capabilities of an entire system or product.'],
    ['Test level', 'A group of test activities that are organised and managed together.'],
    ['Test object', 'The component or system being tested.'],
    ['Test type', 'A group of test activities related to specific quality characteristics.'],
    ['White-box testing', 'Structure-based testing that derives tests from the internal structure or implementation.']
  ],
  tips: [
    'Learn the five levels with their focus, and the four test types as two pairs (functional/non-functional, black-box/white-box).',
    'Know which lists are K1 and must be recalled exactly: good practices (4), test-first approaches (TDD, ATDD, BDD).',
    'Confirmation testing looks at the fixed defect; regression testing looks for side effects. Both can be needed at any level.',
    'For SDLC questions, ask what is available when: sequential means no code early, iterative/agile means testing every iteration.'
  ],
  traps: [
    'Believing shift left means skipping late testing – it only adds earlier testing.',
    'Treating test types as tied to particular levels – all four types can apply at every level.',
    'Confusing system integration testing (system versus other systems and external services) with component integration testing (components inside the system).',
    'Thinking maintenance testing is only for corrective changes – upgrades, migrations and retirement are triggers too.'
  ]
};
window.ICSTUDY['ctfl-4'].flash.push(
  { ch: 2, k: 'List', lo: 'FL-2.1.1', f: 'Five aspects of testing affected by the SDLC', b: 'Scope and timing of test activities · level of test documentation · test techniques and approach · extent of test automation · role and responsibilities of the tester.' },
  { ch: 2, k: 'K1', lo: 'FL-2.1.2', f: 'Good testing practices for every SDLC', b: 'Every development activity has a corresponding test activity · levels have specific objectives · test analysis and design start in the matching development phase · testers review drafts early.' },
  { ch: 2, k: 'K1', lo: 'FL-2.1.3', f: 'Test-first approaches to development', b: 'TDD (test-driven development) · ATDD (acceptance test-driven development) · BDD (behavior-driven development).' },
  { ch: 2, k: 'K1', lo: 'FL-2.1.3', f: 'TDD in one line', b: 'Tests direct the coding: write tests first, write code to pass them, then refactor tests and code.' },
  { ch: 2, k: 'K1', lo: 'FL-2.1.3', f: 'ATDD in one line', b: 'Tests are derived from acceptance criteria and written before the related part of the application is developed.' },
  { ch: 2, k: 'K1', lo: 'FL-2.1.3', f: 'BDD in one line', b: 'Behavior is expressed as natural-language test cases (usually Given/When/Then) that are then automatically translated into executable tests.' },
  { ch: 2, k: 'List', lo: 'FL-2.1.4', f: 'Testing benefits of DevOps', b: 'Fast feedback · shift left via CI · stable test environments · visibility of non-functional characteristics · less repetitive manual testing · lower regression risk.' },
  { ch: 2, k: 'List', lo: 'FL-2.1.4', f: 'Risks and challenges of DevOps', b: 'Pipeline must be defined and built · CI/CD tools must be introduced and maintained · test automation needs extra resources and is hard to maintain.' },
  { ch: 2, k: 'List', lo: 'FL-2.1.5', f: 'Practices that achieve shift left', b: 'Tester review of specifications · tests written before code · CI/CD with automated component tests · static analysis before dynamic testing · early non-functional testing.' },
  { ch: 2, k: 'List', lo: 'FL-2.1.6', f: 'Three questions of a retrospective', b: 'What was successful and should be kept? What was not and could improve? How do we implement improvements and keep the successes?' },
  { ch: 2, k: 'List', lo: 'FL-2.2.1', f: 'The five test levels', b: 'Component · component integration · system · system integration · acceptance testing.' },
  { ch: 2, k: 'List', lo: 'FL-2.2.1', f: 'Attributes that distinguish test levels', b: 'Test object · test objectives · test basis · defects and failures · approach and responsibilities.' },
  { ch: 2, k: 'List', lo: 'FL-2.2.1', f: 'Main forms of acceptance testing', b: 'User acceptance (UAT) · operational · contractual · regulatory · alpha · beta.' },
  { ch: 2, k: 'List', lo: 'FL-2.2.2', f: 'The four test types in the syllabus', b: 'Functional · non-functional · black-box · white-box.' },
  { ch: 2, k: 'List', lo: 'FL-2.2.2', f: 'ISO/IEC 25010 non-functional characteristics', b: 'Performance efficiency · compatibility · usability · reliability · security · maintainability · portability · safety.' },
  { ch: 2, k: 'List', lo: 'FL-2.2.3', f: 'Confirmation vs regression testing', b: 'Confirmation: has the original defect been fixed? Regression: has the change caused adverse effects elsewhere? Impact analysis helps size regression testing; automate it.' },
  { ch: 2, k: 'List', lo: 'FL-2.3.1', f: 'Triggers for maintenance testing', b: 'Modifications (enhancements, corrective changes, hot fixes) · upgrades or migrations of the operational environment · retirement of the system.' },
  { ch: 2, k: 'List', lo: 'FL-2.3.1', f: 'What determines the scope of maintenance testing?', b: 'The degree of risk of the change · the size of the existing system · the size of the change.' },
  { ch: 2, k: 'List', lo: 'FL-2.1.6', f: 'Typical benefits of retrospectives for testing', b: 'Higher test effectiveness/efficiency · better testware quality · team bonding and learning · better test basis · better dev–test cooperation.' },
  { ch: 2, k: 'List', lo: 'FL-2.1.1', f: 'Testing in agile projects', b: 'Lightweight documentation, extensive test automation for regression, manual testing mostly with experience-based techniques.' }
);

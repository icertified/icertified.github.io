/* CTFL v4.0 – Chapter 5 study notes, condensed from ISTQB CTFL Syllabus v4.0.1 for exam preparation (own words).
 * Always cross-check with the official syllabus: https://www.istqb.org */
(window.ICSTUDY = window.ICSTUDY || {});
(window.ICSTUDY['ctfl-4'] = window.ICSTUDY['ctfl-4'] || { chapters: {}, flash: [] });
window.ICSTUDY['ctfl-4'].chapters[5] = {
  summary: 'Managing the Test Activities: test planning (plans, entry/exit criteria, estimation, prioritisation, test pyramid, testing quadrants), risk management, monitoring/control/completion with metrics and reports, configuration management and defect management. Exam weight: 9 questions, 9 points (1 × K1, 5 × K2, 3 × K3; 1 point each). The three K3 questions come from estimation (5.1.4), test case prioritisation (5.1.5) and defect reports (5.5.1). Pass mark overall: 26 of 40 points.',
  sections: [
    { id: 'test-plan', title: 'Purpose and content of a test plan (FL-5.1.1 · K2)', bullets: [
      'A <b>test plan</b> describes the objectives, resources and processes of a test project. It documents the means and schedule for reaching the test objectives and helps make sure the planned activities will satisfy the established criteria.',
      'It is a <b>communication tool</b> for team members and stakeholders, and it shows that testing follows the test policy and test strategy – or explains why it deviates from them.',
      'Preparing the plan makes testers think through risks, schedules, people, tools, costs and effort <i>before</i> the work starts.',
      '<b>Typical content:</b> context of testing (scope, objectives, test basis) · assumptions and constraints · stakeholders (roles, responsibilities, hiring and training needs) · communication (forms, frequency, templates) · <b>risk register</b> (product and project risks) · <b>test approach</b> · budget and schedule.',
      'The <b>test approach</b> part covers: test levels, test types, test techniques, test deliverables, entry and exit criteria, independence of testing, metrics to be collected, test data and test environment requirements, and deviations from the test policy/strategy.',
      'ISO/IEC/IEEE 29119-3 contains more detail and templates.'
    ], callout: { t: 'good', h: 'Memory hook', x: 'C-A-S-C-R-A-B: Context, Assumptions, Stakeholders, Communication, Risk register, Approach, Budget and schedule.' } },
    { id: 'planning-agile', title: 'Tester’s contribution to iteration and release planning (FL-5.1.2 · K1)', table: { head: ['', 'Release planning', 'Iteration planning'], rows: [
      ['Looks ahead to', 'The release of the product; defines and re-defines the product backlog; may split large user stories into smaller ones', 'The end of one iteration; works on the iteration backlog'],
      ['Basis for', 'The test approach and test plan across all iterations', 'The detailed work of the single iteration'],
      ['Tester contributes by', 'Writing <b>testable user stories and acceptance criteria</b>; taking part in <b>project and quality risk analysis</b>; <b>estimating test effort</b> for user stories; determining the test approach; planning testing for the release', 'Taking part in <b>detailed risk analysis</b> of user stories; determining <b>testability</b> of user stories; <b>breaking stories into tasks</b> (especially testing tasks); estimating effort for all test tasks; identifying and refining functional and non-functional aspects of the test object']
    ] }, bullets: [], callout: { t: 'warn', h: 'Exam trap', x: 'Do not swap the levels: acceptance criteria and release-level test approach belong to release planning; task breakdown and testability checks belong to iteration planning.' } },
    { id: 'entry-exit', title: 'Entry criteria and exit criteria (FL-5.1.3 · K2)', bullets: [
      '<b>Entry criteria</b> = preconditions for starting an activity. If they are not met, the activity is likely to be harder, slower, costlier and riskier.',
      '<b>Exit criteria</b> = what must be achieved to declare the activity complete. Both should be defined for every test level and depend on the test objectives.',
      '<b>Typical entry criteria:</b> availability of resources (people, tools, environments, test data, budget, time); availability of testware (test basis, testable requirements, user stories, test cases); initial quality of the test object (e.g. all smoke tests passed).',
      '<b>Typical exit criteria:</b> measures of thoroughness (achieved coverage, number of unresolved defects, defect density, number of failed test cases) and binary yes/no criteria (planned tests executed, static testing performed, all defects reported, all regression tests automated).',
      'Running out of time or budget can be a valid exit – <b>if stakeholders have reviewed and accepted the risk</b> of going live with less testing.',
      '<b>Agile:</b> exit criteria are often called the <b>Definition of Done</b> (objective measures for a releasable item); entry criteria a user story must meet before development/testing starts are the <b>Definition of Ready</b>.'
    ] },
    { id: 'estimation', title: 'Estimation techniques (FL-5.1.4 · K3)', bullets: [
      'Test effort estimation predicts the work needed to meet the test objectives. Always tell stakeholders that an estimate rests on assumptions and carries <b>estimation error</b>. Small tasks are estimated more accurately than large ones, so <b>decompose</b> large tasks.',
      '<b>1. Ratio-based (metrics-based):</b> derive “standard” ratios from earlier projects of your own organisation and apply them to the new one.',
      '<b>2. Extrapolation (metrics-based):</b> measure early in the current project, then extend the observed data with a mathematical model; ideal for iterative SDLCs.',
      '<b>3. Wideband Delphi (expert-based, iterative):</b> experts estimate in isolation, discuss deviations that exceed agreed bounds, re-estimate in isolation, and repeat until consensus. <b>Planning Poker</b> is the Agile variant using numbered cards.',
      '<b>4. Three-point estimation (expert-based):</b> a = most optimistic, m = most likely, b = most pessimistic. <b>E = (a + 4m + b) / 6</b> and <b>SD = (b − a) / 6</b>.'
    ], callout: { t: 'good', h: 'Worked examples (own numbers)', x: '<b>Ratio:</b> earlier project dev:test = 5:2; new project dev effort 450 person-days → test = 450 ÷ 5 × 2 = <b>180 person-days</b>.<br><b>Extrapolation:</b> last three iterations needed 12, 15 and 18 person-days of testing → next iteration ≈ (12 + 15 + 18) / 3 = <b>15 person-days</b>.<br><b>Three-point:</b> a = 8, m = 14, b = 26 person-hours → E = (8 + 4×14 + 26) / 6 = 90 / 6 = <b>15</b>; SD = (26 − 8) / 6 = <b>3</b> → 15 ± 3, i.e. between 12 and 18 person-hours.<br><b>Syllabus example:</b> a = 6, m = 9, b = 18 → E = 10, SD = 2.' } },
    { id: 'prioritisation', title: 'Test case prioritisation (FL-5.1.5 · K3)', bullets: [
      'Test suites are placed in a <b>test execution schedule</b>. Three common strategies:',
      '<b>Risk-based</b> – order follows the product risk analysis; tests covering the most important risks run first.',
      '<b>Coverage-based</b> – tests achieving the highest coverage run first. <b>Additional coverage</b> variant: first the test with highest coverage, then each time the test adding the most <i>new</i> coverage.',
      '<b>Requirements-based</b> – order follows the stakeholder-defined priorities of the requirements traced to the tests.',
      '<b>Dependencies:</b> if a higher-priority test depends on a lower-priority one, the lower-priority test must run first. <b>Resources</b> (tools, environments, people available only in a time window) also shape the order.'
    ], callout: { t: 'good', h: 'Worked example (own numbers)', x: '<b>Risk-based with dependency.</b> Risk level = likelihood × impact: TC1 = 3×3 = 9, TC2 = 2×4 = 8, TC3 = 3×2 = 6, TC4 = 1×2 = 2, TC5 = 5×1 = 5. Pure priority order: TC1 (9), TC2 (8), TC3 (6), TC5 (5), TC4 (2). But TC2 needs data created by TC4, so TC4 must run before TC2. Final schedule: <b>TC1, TC4, TC2, TC3, TC5</b>.<br><b>Additional coverage.</b> TC-A covers statements 1–10, TC-B covers 1–8, TC-C covers 9–14. Pure coverage: A (10), B (8), C (6). Additional coverage: A first (10); then B adds 0 new, C adds 4 new (11–14) → <b>A, C, B</b>.' } },
    { id: 'pyramid', title: 'The test pyramid (FL-5.1.6 · K1)', bullets: [
      'A model showing that tests have different <b>granularity</b>; it guides test automation and effort allocation. The layers represent groups of tests.',
      '<b>Bottom layer:</b> small, isolated, fast tests of a small piece of functionality – <b>many</b> are needed for reasonable coverage.',
      '<b>Top layer:</b> complex, high-level, end-to-end tests – slower, check large functionality, <b>few</b> are needed.',
      '<b>The higher the layer: lower granularity, lower isolation, longer execution time.</b>',
      'Layers and names vary: Cohn’s original model has <b>unit, service and UI tests</b>; another popular model uses unit (component), integration (component integration) and end-to-end tests; other test levels can also be used.'
    ] },
    { id: 'quadrants', title: 'Testing quadrants (FL-5.1.7 · K2)', table: { head: ['Quadrant', 'Orientation', 'Typical content'], rows: [
      ['Q1', 'Technology facing · supports the team', 'Component tests and component integration tests – should be automated and run in CI'],
      ['Q2', 'Business facing · supports the team', 'Functional tests, examples, user story tests, UX prototypes, API testing, simulations – check acceptance criteria; manual or automated'],
      ['Q3', 'Business facing · critiques the product', 'Exploratory testing, usability testing, user acceptance testing – user-oriented, often manual'],
      ['Q4', 'Technology facing · critiques the product', 'Smoke tests and non-functional tests except usability – often automated']
    ] }, bullets: [
      'Defined by Brian Marick for <b>Agile</b> development. Two axes: <i>business facing vs technology facing</i> and <i>supports the team (guides development) vs critiques the product (measures behaviour against expectations)</i>.',
      'Use: visualise that all suitable test types and levels are covered, understand that some test types fit certain levels better, and explain test types to developers, testers and business people.'
    ] },
    { id: 'risk-basics', title: 'Risk, risk level, project vs product risks (FL-5.2.1, 5.2.2)', bullets: [
      '<b>Risk</b> = a potential event, hazard, threat or situation whose occurrence has an adverse effect. Two factors: <b>likelihood</b> (probability, greater than 0 and less than 1) and <b>impact</b> (harm, the consequences). Together they give the <b>risk level</b>; the higher the level, the more important its treatment.',
      '<b>Project risks</b> concern managing and controlling the project and may affect schedule, budget or scope: organisational (late deliveries, inaccurate estimates, cost cutting), people (lack of skills, conflicts, communication problems, staff shortage), technical (scope creep, poor tool support), supplier (third-party delivery failure, supplier bankruptcy).',
      '<b>Product risks</b> concern product quality characteristics (e.g. ISO 25010): missing or wrong functionality, incorrect calculations, runtime errors, poor architecture, inefficient algorithms, inadequate response time, poor user experience, security vulnerabilities.',
      'Consequences of product risks: user dissatisfaction; loss of revenue, trust or reputation; damage to third parties; high maintenance costs and help-desk overload; criminal penalties; in extreme cases injuries or death.'
    ], callout: { t: 'warn', h: 'Exam trap', x: 'A likelihood of exactly 0 or exactly 1 is not a risk likelihood: a risk is neither impossible nor certain.' } },
    { id: 'risk-analysis', title: 'Product risk analysis and its effect on testing (FL-5.2.3 · K2)', bullets: [
      '<b>Risk management</b> = risk analysis (identification + assessment) and risk control (mitigation + monitoring). A test approach driven by this is <b>risk-based testing</b>.',
      'Goal of product risk analysis: awareness of product risk so that test effort is focused to <b>minimise the residual risk level</b>. Ideally it starts early in the SDLC.',
      '<b>Risk identification</b> generates a comprehensive list of risks (brainstorming, workshops, interviews, cause-effect diagrams). <b>Risk assessment</b> categorises risks, determines likelihood, impact and level, prioritises, and proposes ways to handle them. Same-category risks can often be mitigated similarly.',
      '<b>Quantitative</b> assessment: risk level = likelihood × impact (e.g. 0.2 × 8 = 1.6). <b>Qualitative</b>: a <b>risk matrix</b> (e.g. low/medium/high on both axes). Mixed approaches are possible.',
      '<b>Results are used to:</b> determine test scope · choose test levels and propose test types · choose test techniques and coverage · estimate effort per task · prioritise testing so critical defects are found early · decide whether activities other than testing could reduce the risk. Higher risk → more thorough testing, earlier.'
    ] },
    { id: 'risk-control', title: 'Product risk control – responses to risk (FL-5.2.4 · K2)', bullets: [
      '<b>Risk control</b> = all measures taken in response to analysed risks: <b>risk mitigation</b> (carrying out the actions proposed in the assessment to reduce the risk level) and <b>risk monitoring</b> (check that mitigation works, gather information to improve the assessment, spot emerging risks).',
      '<b>Response options:</b> mitigation by testing · risk acceptance · risk transfer · contingency plan.',
      '<b>Mitigation by testing</b> includes: choosing testers with experience and skills suited to the risk type · an appropriate level of independence of testing · reviews and static analysis · appropriate test techniques and coverage levels · test types that address the affected quality characteristics · dynamic testing, including regression testing.'
    ] },
    { id: 'monitoring-metrics', title: 'Test monitoring, control, completion and metrics (FL-5.3.1 · K1)', bullets: [
      '<b>Test monitoring</b> gathers information about testing to assess progress and check whether exit criteria (or the tasks behind them, e.g. coverage of risks, requirements, acceptance criteria) are met.',
      '<b>Test control</b> uses that information to issue <b>control directives</b>: e.g. reprioritise tests when a risk becomes an issue, re-evaluate entry/exit criteria after rework, adjust the schedule when the environment is late, add resources.',
      '<b>Test completion</b> collects data, testware and experience from finished activities at milestones (test level done, iteration finished, project completed or cancelled, release, maintenance release).',
      '<b>Common metric categories:</b> project progress (task completion, resource usage, test effort) · test progress (test case implementation, environment preparation, test cases run/not run, passed/failed, execution time) · product quality (availability, response time, mean time to failure) · defect (number and priority of defects found/fixed, defect density, defect detection percentage) · risk (residual risk level) · coverage (requirements, code) · cost (cost of testing, cost of quality).',
      'Metrics show progress against schedule and budget, the current quality of the test object, and the effectiveness of testing against objectives or an iteration goal.'
    ] },
    { id: 'reports', title: 'Test reports and communicating status (FL-5.3.2, 5.3.3 · K2)', table: { head: ['', 'Test progress report', 'Test completion report'], rows: [
      ['Purpose', 'Supports ongoing test control; gives enough information to change schedule, resources or plan', 'Summarises a finished activity (test level, cycle, iteration, project); input for later testing'],
      ['When', 'Regularly during monitoring and control (daily, weekly …)', 'Once, when the activity is complete and ideally exit criteria are met'],
      ['Typical content', 'Testing period · progress vs schedule and notable deviations · impediments and workarounds · metrics · new and changed risks · testing planned for next period', 'Test summary · test and product quality evaluation against plan (objectives, exit criteria) · deviations from plan · impediments and workarounds · metrics · unmitigated risks and unfixed defects · lessons learned'],
      ['Audience / form', 'Often the own team: frequent and informal', 'Follows a set template; stakeholders']
    ] }, bullets: [
      'Audience influences the formality and frequency of reporting. ISO/IEC/IEEE 29119-3 provides templates (progress reports are called “test status reports” there).',
      '<b>Ways to communicate status:</b> verbal communication · dashboards (CI/CD dashboards, task boards, burn-down charts) · electronic channels (email, chat) · online documentation · formal test reports. Combine as needed.',
      'Formal communication suits <b>distributed teams</b> (distance, time differences). Different stakeholders want different information, so <b>tailor</b> the communication.'
    ] },
    { id: 'cm', title: 'Configuration management (FL-5.4.1 · K2)', bullets: [
      'CM provides a discipline to <b>identify, control and track</b> work products – test plans, strategies, conditions, cases, scripts, results, logs, reports – as <b>configuration items</b>.',
      'For a complex item such as a <b>test environment</b>, CM records its components, their relationships and versions. An item approved for testing becomes a <b>baseline</b> and may change only through a formal <b>change control</b> process.',
      'CM keeps a record of changes when a new baseline is created; you can <b>revert to a previous baseline</b> to reproduce earlier test results.',
      'It ensures that all configuration items (including test items) are <b>uniquely identified, version controlled, tracked for changes and related to other items</b>, so traceability holds through the test process, and that documentation and software items are referenced unambiguously in testware.',
      'In CI/CD and DevOps pipelines, <b>automated CM</b> is normally included.'
    ] },
    { id: 'defects', title: 'Defect management and defect reports (FL-5.5.1 · K3)', bullets: [
      'Because finding defects is a main test objective, a defined <b>defect management process</b> is essential. Reported anomalies may turn out to be real defects or something else (false positive, change request). The workflow covers: log → analyse and classify → decide on response (fix, keep as is) → close. All stakeholders must follow it; treat defects from static testing similarly.',
      '<b>Objectives of defect reports:</b> give those who resolve defects enough information; track the quality of the work product; give ideas for improving development and test processes.',
      '<b>Typical fields (dynamic testing):</b> unique identifier · title with short summary · date observed, issuing organisation and author with role · test object and test environment · context (test case, activity, SDLC phase, technique, checklist, test data) · description of the failure with steps to reproduce, logs, dumps, screenshots, recordings · expected and actual results · severity (impact on stakeholder interests or requirements) · priority to fix · status (open, deferred, duplicate, waiting to be fixed, awaiting confirmation testing, re-opened, closed, rejected) · references (e.g. test case).',
      'Tools may fill in some fields automatically (identifier, date, author, initial status). ISO/IEC/IEEE 29119-3 calls defect reports “incident reports”.'
    ], callout: { t: 'warn', h: 'Exam trap', x: 'Severity (degree of impact) and priority (urgency to fix) are separate fields; do not treat them as synonyms.' } }
  ],
  terms: [
    ['Defect management', 'The process of recognising, recording, classifying, investigating, resolving and disposing of defects.'],
    ['Defect report', 'Documentation of the occurrence, nature and status of a defect.'],
    ['Entry criteria', 'The set of conditions that must be met before an activity can officially start.'],
    ['Exit criteria', 'The set of conditions that must be met for an activity to be officially considered complete.'],
    ['Product risk', 'A risk affecting the quality of a work product or the product itself.'],
    ['Project risk', 'A risk affecting the successful management and control of the project (schedule, budget, scope).'],
    ['Risk', 'A factor that could result in future negative consequences; characterised by likelihood and impact.'],
    ['Risk analysis', 'The overall process of risk identification and risk assessment.'],
    ['Risk assessment', 'Determining risk likelihood, impact and level, categorising and prioritising identified risks and proposing how to handle them.'],
    ['Risk control', 'The overall process of risk mitigation and risk monitoring.'],
    ['Risk identification', 'Finding, recognising and describing risks, e.g. by brainstorming or workshops.'],
    ['Risk level', 'The measure of a risk, derived from its likelihood and impact.'],
    ['Risk management', 'Coordinated activities to direct and control an organisation with regard to risk (analysis and control).'],
    ['Risk mitigation', 'Implementing actions to reduce the level of a risk.'],
    ['Risk monitoring', 'Checking that mitigation actions work, gathering information to improve the assessment and spotting emerging risks.'],
    ['Risk-based testing', 'A test approach in which test activities are selected, prioritised and managed based on risk analysis and risk control.'],
    ['Test approach', 'The way the test strategy is implemented for a specific project or release.'],
    ['Test completion report', 'A report summarising a finished test activity, produced at test completion.'],
    ['Test control', 'Using monitoring information to give guidance and corrective actions (control directives) for effective and efficient testing.'],
    ['Test monitoring', 'Gathering information about testing to assess progress and to check whether exit criteria are satisfied.'],
    ['Test plan', 'Documentation of test objectives, resources and processes for a test project, with the means and schedule to achieve them.'],
    ['Test progress report', 'A periodic report on test progress, used for ongoing test control (also called test status report).'],
    ['Test pyramid', 'A model showing that tests differ in granularity, with many small fast tests at the bottom and few end-to-end tests at the top.'],
    ['Test strategy', 'A general description of how testing is to be carried out to reach test objectives under given circumstances.'],
    ['Testing quadrants', 'A model grouping test levels and types in Agile by business/technology facing and support/critique orientation (Q1–Q4).']
  ],
  tips: [
    'Memorise the formulas: risk level = likelihood × impact; three-point E = (a + 4m + b) / 6 and SD = (b − a) / 6. Always check the arithmetic twice.',
    'For prioritisation questions, first sort by the strategy given, then move any test that a higher-priority test depends on in front of it.',
    'Learn the quadrants as a 2×2 grid: Q1 technology/support (component), Q2 business/support (functional, API), Q3 business/critique (exploratory, UAT), Q4 technology/critique (smoke, non-functional).',
    'Be able to sort items into progress report vs completion report, entry vs exit criteria, and project vs product risks – these classification questions are common.'
  ],
  traps: [
    'Mixing up Definition of Ready (entry criteria for a user story) and Definition of Done (exit criteria).',
    'Treating poor tool support or staff shortage as product risks; they are project risks. Incorrect calculations or poor response time are product risks.',
    'Confusing test monitoring (gathering information) with test control (acting on it with directives) and with test completion (consolidating at milestones).',
    'Assuming a higher-priority test always runs first – a dependency on a lower-priority test forces the lower one to run earlier.'
  ]
};

window.ICSTUDY['ctfl-4'].flash.push(
  { ch: 5, k: 'K1', lo: 'FL-5.1.1', f: 'Test plan – purpose', b: 'Describes the objectives, resources and processes of a test project; documents means and schedule, supports communication and shows adherence to (or deviation from) the test policy and strategy.' },
  { ch: 5, k: 'K1', lo: 'FL-5.1.1', f: 'Typical content of a test plan', b: 'Context · assumptions and constraints · stakeholders · communication · risk register · test approach · budget and schedule.' },
  { ch: 5, k: 'K1', lo: 'FL-5.1.1', f: 'What does the “test approach” section of a test plan include?', b: 'Test levels, types, techniques, deliverables, entry/exit criteria, independence, metrics, test data and environment needs, deviations from policy/strategy.' },
  { ch: 5, k: 'K1', lo: 'FL-5.1.2', f: 'Release planning – tester contributions', b: 'Write testable user stories and acceptance criteria, join project and quality risk analysis, estimate test effort for user stories, determine the test approach, plan testing for the release.' },
  { ch: 5, k: 'K1', lo: 'FL-5.1.2', f: 'Iteration planning – tester contributions', b: 'Detailed risk analysis of stories, testability of stories, break stories into (testing) tasks, estimate effort for all test tasks, refine functional and non-functional aspects of the test object.' },
  { ch: 5, k: 'K1', lo: 'FL-5.1.3', f: 'Entry criteria', b: 'Preconditions for starting an activity: resources available, testware available, initial quality of the test object (e.g. smoke tests passed).' },
  { ch: 5, k: 'K1', lo: 'FL-5.1.3', f: 'Exit criteria', b: 'What must be achieved to declare an activity complete: thoroughness measures (coverage, unresolved defects, defect density, failed tests) and yes/no criteria (planned tests executed, defects reported …).' },
  { ch: 5, k: 'K1', lo: 'FL-5.1.3', f: 'Definition of Ready vs Definition of Done', b: 'Agile names: Definition of Ready = entry criteria for a user story; Definition of Done = exit criteria for a releasable item.' },
  { ch: 5, k: 'K1', lo: 'FL-5.1.3', f: 'Is running out of time or budget a valid exit criterion?', b: 'It can be – if stakeholders have reviewed and accepted the risk of going live without further testing.' },
  { ch: 5, k: 'K1', lo: 'FL-5.1.4', f: 'Four estimation techniques', b: 'Ratio-based · extrapolation · Wideband Delphi · three-point estimation.' },
  { ch: 5, k: 'K1', lo: 'FL-5.1.4', f: 'Estimation based on ratios', b: 'Metrics-based: use standard ratios from earlier projects of the organisation. Example: dev:test 3:2 and 600 dev person-days → 400 test person-days.' },
  { ch: 5, k: 'K1', lo: 'FL-5.1.4', f: 'Extrapolation', b: 'Metrics-based: measure early in the current project and extrapolate (e.g. average of last three iterations). Very suitable for iterative SDLCs.' },
  { ch: 5, k: 'K1', lo: 'FL-5.1.4', f: 'Wideband Delphi / Planning Poker', b: 'Expert-based, iterative: experts estimate in isolation, discuss out-of-range deviations, re-estimate until consensus. Planning Poker (cards) is the Agile variant.' },
  { ch: 5, k: 'K1', lo: 'FL-5.1.4', f: 'Three-point estimation formulas', b: 'E = (a + 4m + b) / 6 ; SD = (b − a) / 6 (a optimistic, m most likely, b pessimistic). Example a=6, m=9, b=18 → 10 ± 2.' },
  { ch: 5, k: 'K1', lo: 'FL-5.1.5', f: 'Three test case prioritisation strategies', b: 'Risk-based · coverage-based (incl. additional coverage) · requirements-based.' },
  { ch: 5, k: 'K1', lo: 'FL-5.1.5', f: 'Additional coverage prioritisation', b: 'First the test with highest coverage; then repeatedly the test that adds the highest additional coverage.' },
  { ch: 5, k: 'K1', lo: 'FL-5.1.5', f: 'Prioritisation and dependencies', b: 'If a higher-priority test depends on a lower-priority one, the lower-priority test must run first. Resource availability also influences order.' },
  { ch: 5, k: 'K1', lo: 'FL-5.1.6', f: 'Test pyramid – layers and properties', b: 'Bottom: small, isolated, fast, many tests. Top: end-to-end, slower, large scope, few tests. Higher layer = lower granularity, lower isolation, longer execution.' },
  { ch: 5, k: 'K1', lo: 'FL-5.1.6', f: 'Layers of the original test pyramid (Cohn)', b: 'Unit tests, service tests, UI tests. Alternative: unit (component), integration, end-to-end.' },
  { ch: 5, k: 'K1', lo: 'FL-5.1.7', f: 'Testing quadrants – two axes', b: 'Business facing vs technology facing; supports the team vs critiques the product. Defined by Brian Marick for Agile.' },
  { ch: 5, k: 'K1', lo: 'FL-5.1.7', f: 'Quadrants Q1 and Q2', b: 'Q1 technology facing / support the team: component and component integration tests (automated, in CI). Q2 business facing / support the team: functional, user story and API tests, simulations.' },
  { ch: 5, k: 'K1', lo: 'FL-5.1.7', f: 'Quadrants Q3 and Q4', b: 'Q3 business facing / critique: exploratory, usability, user acceptance tests. Q4 technology facing / critique: smoke tests and non-functional tests except usability.' },
  { ch: 5, k: 'K1', lo: 'FL-5.2.1', f: 'Risk likelihood and impact', b: 'Likelihood = probability of occurrence (greater than 0, less than 1). Impact = harm caused. Together they give the risk level.' },
  { ch: 5, k: 'K1', lo: 'FL-5.2.2', f: 'Project risks – categories', b: 'Organisational, people, technical, supplier issues. They affect schedule, budget or scope.' },
  { ch: 5, k: 'K1', lo: 'FL-5.2.2', f: 'Product risks', b: 'Related to product quality characteristics: wrong functionality, incorrect calculations, runtime errors, poor performance or UX, security vulnerabilities.' },
  { ch: 5, k: 'K1', lo: 'FL-5.2.3', f: 'Risk analysis consists of …', b: 'Risk identification (list the risks) and risk assessment (categorise, likelihood, impact, level, prioritise, propose handling).' },
  { ch: 5, k: 'K1', lo: 'FL-5.2.3', f: 'Quantitative vs qualitative risk assessment', b: 'Quantitative: risk level = likelihood × impact. Qualitative: risk matrix. A mix is possible.' },
  { ch: 5, k: 'K1', lo: 'FL-5.2.3', f: 'What are risk analysis results used for?', b: 'Test scope, levels and types, techniques and coverage, effort per task, prioritisation to find critical defects early, activities beyond testing to reduce risk.' },
  { ch: 5, k: 'K1', lo: 'FL-5.2.4', f: 'Risk control consists of …', b: 'Risk mitigation (implement actions to reduce the level) and risk monitoring (check effectiveness, improve assessment, find emerging risks).' },
  { ch: 5, k: 'K1', lo: 'FL-5.2.4', f: 'Response options to an analysed risk', b: 'Mitigation by testing · risk acceptance · risk transfer · contingency plan.' },
  { ch: 5, k: 'K1', lo: 'FL-5.3.1', f: 'Seven categories of test metrics', b: 'Project progress · test progress · product quality · defect · risk · coverage · cost.' },
  { ch: 5, k: 'K1', lo: 'FL-5.3.2', f: 'Test progress report – typical content', b: 'Testing period · progress and deviations · impediments and workarounds · metrics · new/changed risks · testing planned for next period.' },
  { ch: 5, k: 'K1', lo: 'FL-5.3.2', f: 'Test completion report – typical content', b: 'Test summary · evaluation vs plan · deviations · impediments · metrics · unmitigated risks and unfixed defects · lessons learned.' },
  { ch: 5, k: 'K1', lo: 'FL-5.3.3', f: 'Test monitoring vs test control vs test completion', b: 'Monitoring gathers information; control uses it for directives and corrective actions; completion consolidates data and experience at milestones.' },
  { ch: 5, k: 'K1', lo: 'FL-5.3.3', f: 'Ways to communicate test status', b: 'Verbal, dashboards (CI/CD, task boards, burn-down charts), electronic channels, online documentation, formal test reports. Tailor to the stakeholder; more formal for distributed teams.' },
  { ch: 5, k: 'K1', lo: 'FL-5.4.1', f: 'Configuration management in testing', b: 'Identifies, controls and tracks work products as configuration items; items are uniquely identified, version controlled, tracked and related for traceability; baselines change only via formal change control.' },
  { ch: 5, k: 'K1', lo: 'FL-5.4.1', f: 'Why can you revert to a previous baseline?', b: 'CM records changed items when a new baseline is created, so earlier test results can be reproduced.' },
  { ch: 5, k: 'K1', lo: 'FL-5.5.1', f: 'Objectives of defect reports', b: 'Give resolvers enough information, track the quality of the work product, provide ideas to improve development and test processes.' },
  { ch: 5, k: 'List', lo: 'FL-5.5.1', f: 'Typical fields of a defect report', b: 'ID · title · date, organisation, author · test object and environment · context · failure description with steps/logs · expected vs actual results · severity · priority · status · references.' },
  { ch: 5, k: 'List', lo: 'FL-5.5.1', f: 'Defect status examples', b: 'Open, deferred, duplicate, waiting to be fixed, awaiting confirmation testing, re-opened, closed, rejected.' },
  { ch: 5, k: 'List', lo: 'FL-5.2.4', f: 'Mitigating product risks by testing', b: 'Right testers · suitable independence · reviews and static analysis · appropriate techniques and coverage · appropriate test types · dynamic testing incl. regression testing.' }
);

/* CTFL v4.0 in-depth notes (own words) */
(window.ICDETAIL = window.ICDETAIL || {});
(window.ICDETAIL['ctfl-4'] = window.ICDETAIL['ctfl-4'] || {})[5] = {

  'test-plan': {
    paras: [
      'A <b>test plan</b> is the written answer to the question “how are we going to reach our test objectives on this project?” It records <i>what</i> will be tested and why, <i>who</i> will do it, <i>with which resources</i>, <i>by when</i> and <i>following which rules</i>. Its value is twofold: the finished document is a communication tool, and the act of writing it forces the team to face risks, schedules, people, tools, costs and effort while there is still time to react.',
      'The plan also links the project to the organisation. The <b>test policy</b> states why the organisation tests at all, and the <b>test strategy</b> describes in general how it tests. The plan shows that this project will follow both, or it explains openly why it will deviate (for example, a safety-critical release needing more independence than the strategy normally demands). The <b>test approach</b> is the way the strategy is applied to this particular project or release.',
      'Typical content is easy to remember as context, assumptions and constraints, stakeholders, communication, risk register, test approach, budget and schedule. The <b>context</b> gives scope, objectives and the test basis. <b>Assumptions and constraints</b> record things such as “the test environment will be ready on 1 March”; if an assumption fails it becomes a project risk. <b>Stakeholders</b> lists roles, responsibilities and any hiring or training needs. <b>Communication</b> fixes the forms and frequency of reporting. The <b>risk register</b> lists product and project risks. The <b>budget and schedule</b> turn all of this into money and dates.',
      'The <b>test approach</b> is the largest part. It names test levels, test types, test techniques, test deliverables, entry and exit criteria, how independent the testers are, which metrics will be collected, the test data and test environment needed, and any deviation from policy or strategy. A plan is a living document: when circumstances change, it is revised and re-communicated. ISO/IEC/IEEE 29119-3 offers templates, but the exam only expects you to recognise the typical content.'
    ],
    list: [
      '<b>Purpose:</b> record how and when the objectives will be reached, check that planned activities will satisfy the agreed criteria, keep the team and stakeholders informed, show conformity with policy and strategy (or explain deviations).',
      '<b>Content (7 items):</b> context · assumptions and constraints · stakeholders · communication · risk register · test approach · budget and schedule.',
      '<b>Inside the test approach:</b> levels, types, techniques, deliverables, entry/exit criteria, independence, metrics, test data, test environment, deviations.'
    ],
    blocks: [
      { t: 'good', h: 'Worked example', x: 'A bank plans testing for a mobile-app release. <b>Context:</b> scope is the new “instant transfer” feature, objective is to confirm the acceptance criteria and key security properties. <b>Assumption:</b> a sandbox of the payment gateway is available from week 2. <b>Stakeholders:</b> product owner, two testers, one security specialist (training needed on mobile penetration tools). <b>Communication:</b> weekly progress report, daily stand-up. <b>Risk register:</b> product risk “duplicate payment on network timeout”; project risk “gateway sandbox delivered late”. <b>Approach:</b> component and system testing, exploratory sessions, exit criterion “no open defects of the highest severity”. <b>Budget:</b> 120 person-days over six weeks.' },
      { t: 'warn', h: 'Exam trap', x: 'The plan is not the same as the test strategy. Strategy = general and long-lived, valid across projects. Plan = specific to one project or release. Also, entry/exit criteria are listed inside the test approach, not as a separate top-level item.' }
    ]
  },

  'planning-agile': {
    paras: [
      'In iterative and Agile development, planning happens at two horizons. <b>Release planning</b> looks at the whole release, perhaps several iterations or sprints long. Here the product backlog is defined and refined, and big user stories may be split into smaller ones. The result is the basis for the test approach and test plan for all iterations. <b>Iteration planning</b> looks only at the end of the current iteration and works from the iteration backlog: the few stories the team has committed to now.',
      'Think of it as zooming in. At release level a tester helps decide whether the release is testable at all and how risky it is. At iteration level the tester helps decide whether this story can be tested, in what small steps, and how long each step will take.',
      'Tester’s contributions at <b>release</b> level: write testable user stories and acceptance criteria (a story like “search must be fast” is useless until it says “results appear within 2 seconds for 10 000 products”); take part in project and quality risk analysis; estimate test effort for the user stories; decide the test approach; plan the testing for the release.',
      'Tester’s contributions at <b>iteration</b> level: take part in detailed risk analysis of the stories; judge <b>testability</b> of the stories (can we observe results, set up data, control the environment?); break the stories into tasks, especially testing tasks; estimate the effort of all test tasks; identify and refine functional and non-functional aspects of the test object, such as response time or accessibility needs.',
      'The reason this counts as “adding value” is that a tester with a critical, quality-focused mindset notices ambiguities, missing criteria and untestable wording before any code exists, when correcting them is cheapest. This is the shift-left idea from chapter 2.'
    ],
    blocks: [
      { t: 'good', h: 'Worked example', x: 'Release planning: the backlog contains the epic “customer self-service portal”. The tester points out that “easy to use” is not verifiable, helps rewrite it as an acceptance criterion (“a new user completes registration in under 3 minutes without help”), and estimates 40 person-days of testing for the whole release. Iteration planning: for the story “reset password by email” the tester checks that a mail-catcher test server exists (testability), splits the story into the tasks “design tests”, “prepare test data”, “execute and automate regression”, “exploratory session”, and estimates 6 person-days for them.' },
      { t: 'warn', h: 'Exam trap', x: 'Do not swap the levels. Acceptance criteria, release risk analysis and the release test approach = release planning. Testability of stories, task breakdown and detailed story risk analysis = iteration planning. Estimating effort appears at both levels (user stories at release level, all test tasks at iteration level).' }
    ],
    table: { head: ['Question', 'Release planning', 'Iteration planning'], rows: [
      ['Time horizon', 'The whole release', 'One iteration'],
      ['Work item', 'Product backlog, large stories', 'Iteration backlog, stories split into tasks'],
      ['Typical tester action', 'Testable stories and acceptance criteria, project and quality risk analysis', 'Testability check, detailed risk analysis, test tasks and their estimates']
    ] }
  },

  'entry-exit': {
    paras: [
      '<b>Entry criteria</b> are the preconditions that must be true before an activity may sensibly start. Starting without them usually makes the work harder, slower, more expensive and riskier: imagine beginning system testing on a build that cannot even log in. <b>Exit criteria</b> state what has to be achieved before the activity may be declared finished. Without them, nobody can say when testing is “done”, and the decision becomes a matter of opinion or pressure. Both are defined for every test level, and they differ according to that level’s objectives: component testing might exit on a statement coverage target, acceptance testing on stakeholder sign-off.',
      '<b>Typical entry criteria</b> fall into three groups. (1) Resources: people, tools, environments, test data, budget and time are available. (2) Testware: test basis, testable requirements or user stories, and test cases exist. (3) Initial quality of the test object, for instance all smoke tests have passed.',
      '<b>Typical exit criteria</b> fall into two groups. <i>Measures of thoroughness</i> are numbers compared to a target: coverage achieved, unresolved defects, defect density, failed test cases. <i>Binary yes/no criteria</i> are either met or not: planned tests executed, static testing performed, all found defects reported, all regression tests automated.',
      'Time and budget can also end testing. The syllabus accepts this as a valid exit, but only if the stakeholders have reviewed and accepted the risk of releasing with less testing. The tester’s job is to make the residual risk visible, not to decide alone.',
      'In Agile teams the same ideas carry other names. The <b>Definition of Done</b> is the exit criteria for a releasable item (code reviewed, tests passed, documentation updated). The <b>Definition of Ready</b> is the entry criteria a user story must meet before development or testing begins (acceptance criteria written, dependencies identified, estimate agreed).'
    ],
    table: { head: ['', 'Entry criteria', 'Exit criteria'], rows: [
      ['Question answered', 'May we start?', 'May we stop?'],
      ['Agile name', 'Definition of Ready', 'Definition of Done'],
      ['Example – thoroughness/resources', 'Test environment and test data available', 'Statement coverage at least 90 %; no open highest-severity defects'],
      ['Example – yes/no', 'Smoke tests on the build passed', 'All planned tests executed; all defects reported']
    ] },
    blocks: [
      { t: 'good', h: 'Worked example', x: 'System test of a webshop. Entry: environment up, 150 test cases ready, smoke test passed. Exit: 100 % of planned tests executed, at least 95 % passed (that is at least 143 of 150), no open highest-severity defect. At the end of week 4, 148 tests have run and 139 passed, so exit is not met (only 148 of 150 executed; 139 is below 143). The project manager asks to ship anyway; the team writes up the 2 unexecuted tests and 9 failures as unmitigated risks, and stakeholders formally accept them. Ending here is now a valid, documented decision.' },
      { t: 'warn', h: 'Exam trap', x: 'Definition of Ready belongs to the <i>start</i> (entry), Definition of Done to the <i>end</i> (exit). Also: “coverage achieved” is a thoroughness measure (an exit criterion), while “smoke tests passed” on the incoming build is an entry criterion.' }
    ]
  },

  'estimation': {
    paras: [
      '<b>Test effort estimation</b> predicts how much test-related work is needed to meet the test objectives. An estimate is never a promise: it rests on assumptions and always carries <b>estimation error</b>, which stakeholders must be told. Small tasks are estimated more accurately than big ones, so a large task is <b>decomposed</b> into smaller tasks that are estimated separately and added up. The syllabus describes four techniques, two metrics-based and two expert-based.',
      '<b>1. Ratio-based.</b> You take data from earlier similar projects of your own organisation, work out a standard ratio (such as development effort to test effort) and apply it to the new project. Your own history is the best source because it reflects your people, tools and quality level.',
      '<b>2. Extrapolation.</b> You measure early in the current project and extend the observed data with a mathematical model (average, trend line). It fits iterative life cycles well because every iteration yields fresh measurements.',
      '<b>3. Wideband Delphi.</b> Experts estimate independently, the results are collected, and where an estimate falls outside agreed bounds the experts discuss reasons, then estimate again independently. This repeats until consensus. Estimating in isolation prevents the loudest voice from dominating. <b>Planning Poker</b> is the Agile variant using numbered cards.',
      '<b>4. Three-point.</b> Experts give three values: optimistic <b>a</b>, most likely <b>m</b>, pessimistic <b>b</b>. The estimate is the weighted mean <b>E = (a + 4m + b) / 6</b> and the uncertainty is <b>SD = (b − a) / 6</b>. The result is written E ± SD. The weight of 4 on m expresses that the most likely value matters most, and a wide gap between a and b means high uncertainty.'
    ],
    blocks: [
      { t: 'good', h: 'Worked example 1 – ratio-based', x: 'Previous project: development 1 200 person-days, testing 480 person-days. Ratio dev:test = 1 200 : 480 = 5 : 2. New similar project: development expected at 750 person-days. Test effort = 750 ÷ 5 × 2 = 150 × 2 = <b>300 person-days</b>.' },
      { t: 'good', h: 'Worked example 2 – extrapolation', x: 'Test effort in the first three iterations: 20, 24 and 28 person-days. Averaging model: (20 + 24 + 28) / 3 = 72 / 3 = <b>24 person-days</b> for the next iteration. With 4 iterations left that is 4 × 24 = 96 person-days. (A trend model would note the steady growth of 4 per iteration and predict 32; the model you use is a judgement, so state it.)' },
      { t: 'good', h: 'Worked example 3 – Wideband Delphi', x: 'Three experts estimate a regression suite. Agreed bound: no estimate may differ from the mean by more than 25 %. Round 1: 30, 50, 34 person-days, mean = 114 / 3 = 38. The value 50 is 12 above the mean = 31.6 % (out of bounds); 30 is 8 below = 21.1 % (within). Expert 2 explains that data-migration checks are needed; all discuss, then re-estimate alone. Round 2: 36, 42, 38, mean = 116 / 3 = 38.67; deviations are 6.9 %, 8.6 % and 1.7 %, all within bounds. Consensus: about <b>39 person-days</b>.' },
      { t: 'good', h: 'Worked example 4 – three-point', x: 'a = 10, m = 16, b = 34 person-hours. E = (10 + 4×16 + 34) / 6 = (10 + 64 + 34) / 6 = 108 / 6 = <b>18</b>. SD = (34 − 10) / 6 = 24 / 6 = <b>4</b>. Final estimate: 18 ± 4, i.e. between 14 and 22 person-hours. Note E (18) is above m (16) because the pessimistic value is much further from m than the optimistic one.' },
      { t: 'warn', h: 'Exam trap', x: 'Do not divide by 3 in the three-point formula, and do not forget the factor 4 on m. SD uses only a and b. Ratio and extrapolation are metrics-based, Wideband Delphi and three-point are expert-based. Planning Poker is a <i>variant of Wideband Delphi</i>, not a fifth technique.' }
    ]
  },

  'prioritisation': {
    paras: [
      'Once test cases are grouped into test suites, someone must decide in which order they run. This order is the <b>test execution schedule</b>. Prioritisation matters because time is rarely sufficient: if testing is cut short, the tests that already ran should be the ones that told us the most. Three strategies are in common use.',
      '<b>Risk-based prioritisation</b> follows the product risk analysis. Each test case inherits the risk level (likelihood × impact) of the risk it covers, and the highest levels run first, so critical defects appear early.',
      '<b>Coverage-based prioritisation</b> orders by coverage achieved, for instance statement coverage. The plain version runs the test with the highest coverage first. The <b>additional coverage</b> variant runs the highest-coverage test first, then repeatedly picks the test that adds the most coverage <i>not yet reached</i>. It avoids spending time on tests that only repeat what earlier ones covered.',
      '<b>Requirements-based prioritisation</b> follows the priority that stakeholders gave to the requirements. Each test traces back to a requirement and inherits its priority.',
      'Ideally the order simply follows the priorities. In practice two things interfere. <b>Dependencies</b>: if a high-priority test depends on a lower-priority one (it needs the data or state the other creates), the lower-priority one must run first. <b>Resources</b>: tools, environments or people available only in a time window can force tests into that window.',
      'The method for exam questions is always the same: compute or read the priority, sort by it, then check dependencies and move prerequisites forward.'
    ],
    blocks: [
      { t: 'good', h: 'Worked example 1 – risk-based with a dependency', x: 'Likelihood and impact on a 1–5 scale. TC1: 4×5 = 20; TC2: 3×5 = 15; TC3: 2×4 = 8; TC4: 5×1 = 5; TC5: 4×3 = 12. Pure priority order: TC1 (20), TC2 (15), TC5 (12), TC3 (8), TC4 (5). Dependency: TC5 uses an order created by TC3. TC3 has lower priority than TC5, so it must run first. Final schedule: <b>TC1, TC2, TC3, TC5, TC4</b>.' },
      { t: 'good', h: 'Worked example 2 – coverage-based and additional coverage', x: 'The code has 20 statements. TC-A covers 1–8 (8), TC-B covers 5–14 (10), TC-C covers 9–16 (8), TC-D covers 15–20 (6). <b>Plain coverage:</b> B (10), then A and C tied at 8 (take A, C by ID), then D: B, A, C, D. <b>Additional coverage:</b> B first (covers 5–14). New coverage now: A adds 1–4 = 4; C adds 15–16 = 2; D adds 15–20 = 6. Pick D. Then A adds 4, C adds 0. Pick A, then C. Order: <b>B, D, A, C</b>, reaching all 20 statements after three tests (B, D, A).' },
      { t: 'good', h: 'Worked example 3 – requirements-based with a dependency', x: 'Stakeholder priorities: R1 high, R2 medium, R3 low. Traceability: TC-W → R1, TC-X → R2, TC-Y → R1, TC-Z → R3. Order by requirement priority: TC-W, TC-Y (R1), TC-X (R2), TC-Z (R3). But TC-Y needs the data TC-Z creates, so TC-Z moves in front of TC-Y: <b>TC-W, TC-Z, TC-Y, TC-X</b> (TC-W has no dependency and may stay first; running TC-Z, TC-W, TC-Y, TC-X would also respect the dependency).' },
      { t: 'warn', h: 'Exam trap', x: 'A higher priority does not guarantee an earlier slot. When a dependency exists, the lower-priority prerequisite goes first. And in additional coverage, the order can differ from plain coverage: a short test (D) can jump forward because it adds much new coverage, while one that adds little (C) falls back.' }
    ]
  },

  'pyramid': {
    paras: [
      'The <b>test pyramid</b> is a model that says tests come in different sizes, or <b>granularity</b>, and that the team should balance them deliberately. Picture a pyramid cut into layers, each layer standing for a group of tests. The model helps the team decide where to automate and where to invest effort, because different test objectives are served at different layers.',
      'At the <b>bottom</b> are small tests that check a tiny piece of functionality, such as one function or class. They are <b>isolated</b> (little dependence on other parts of the system), <b>fast</b> (milliseconds) and cheap to maintain. Because each covers little, you need <b>many</b> of them to reach reasonable coverage, which is why the base of the pyramid is wide.',
      'At the <b>top</b> are complex, high-level, end-to-end tests that exercise a whole business flow through the entire system. They are slower, more dependent on other components and environments, and they check a large piece of functionality at once, so a <b>few</b> are enough. Failures at the top are also harder to diagnose, since many components were involved.',
      'The rule to remember: moving up a layer means <b>coarser tests (lower granularity), weaker isolation and longer execution time</b>. Isolation means the degree of dependency on other elements of the system; a high-isolation test does not break because something unrelated changed.',
      'Names and numbers of layers differ between sources. Cohn’s original model has three: <b>unit tests, service tests, UI tests</b>. A popular alternative says <b>unit (component), integration (component integration) and end-to-end</b> tests. Other test levels from chapter 2 can be used as layers too. The exam wants the shape and the trade-offs, not a single fixed naming.'
    ],
    table: { head: ['Property', 'Bottom layer', 'Top layer'], rows: [
      ['Typical test', 'Unit / component test', 'End-to-end / UI test'],
      ['Number needed', 'Many', 'Few'],
      ['Granularity', 'High (small piece)', 'Low (large piece)'],
      ['Isolation', 'High', 'Low'],
      ['Execution time', 'Short', 'Long']
    ] },
    blocks: [
      { t: 'good', h: 'Worked example', x: 'A team has 600 unit tests (run in 2 minutes in every build), 80 service/API tests (run in 10 minutes nightly) and 12 UI end-to-end tests (run in 40 minutes before release). If a pricing rule breaks, a unit test points to the exact function in seconds; only the UI test would reveal that checkout fails as a whole, but it would take longer to locate the cause. An “inverted pyramid” with 600 UI tests and 12 unit tests would be slow, fragile and expensive to maintain.' },
      { t: 'warn', h: 'Exam trap', x: 'Do not say “higher layer = higher granularity”. It is the opposite: higher layer = <i>lower</i> granularity, lower isolation, longer execution.' }
    ]
  },

  'quadrants': {
    paras: [
      'The <b>testing quadrants</b> were defined by Brian Marick for Agile development. The model arranges test levels, test types, activities, techniques and work products on a 2×2 grid, so a team can see at a glance whether anything important is missing. It is also a vocabulary: developers, testers and business people can use it to explain what a given kind of test is for.',
      'The two axes are independent. Horizontally: is the test <b>business facing</b> (understood and judged by business people, expressed in business terms) or <b>technology facing</b> (concerned with the internal workings, written in technical terms)? Vertically: does the test <b>support the team</b> (guides development, gives early feedback while building) or <b>critique the product</b> (measures actual behaviour against expectations after something exists)?',
      '<b>Q1</b> (technology facing, supports the team): component and component integration tests. They should be automated and run in continuous integration. <b>Q2</b> (business facing, supports the team): functional tests, examples, user story tests, user-experience prototypes, API testing and simulations. They check acceptance criteria and may be manual or automated. <b>Q3</b> (business facing, critiques the product): exploratory testing, usability testing and user acceptance testing. They are user oriented and often manual. <b>Q4</b> (technology facing, critiques the product): smoke tests and non-functional tests apart from usability. They are often automated.',
      'The model also shows that some test types fit certain levels better: Q1 relates to the lowest test levels, whereas acceptance and exploratory work sit on the business side. The quadrants are not a sequence; teams do work in all four during an iteration.'
    ],
    table: { head: ['', 'Supports the team', 'Critiques the product'], rows: [
      ['Business facing', 'Q2: functional, user story, API tests, simulations', 'Q3: exploratory, usability, user acceptance'],
      ['Technology facing', 'Q1: component and component integration tests', 'Q4: smoke and non-functional tests (not usability)']
    ] },
    blocks: [
      { t: 'good', h: 'Worked example', x: 'Classifying activities in a banking app team: a developer’s unit test of an interest function = Q1. A tester verifying the acceptance criterion “transfers above the daily limit are rejected” through the API = Q2. A product owner trying the app freely to see whether the flow feels natural = Q3 (exploratory/usability). A load test of 5 000 simultaneous logins and a security scan = Q4 (non-functional). Usability is the one non-functional type that is <i>not</i> in Q4.' },
      { t: 'warn', h: 'Exam trap', x: 'Usability testing is Q3, not Q4. Smoke tests are Q4 even though they look functional. Q1 and Q4 are both technology facing; Q2 and Q3 are both business facing.' }
    ]
  },

  'risk-basics': {
    paras: [
      'A <b>risk</b> is something that might happen (an event, hazard, threat or situation) and would have a harmful result if it did. It has not happened yet; once it does, it is an issue or problem. A risk is described by two factors. <b>Risk likelihood</b> is the probability that it occurs and is greater than 0 and less than 1: if something is impossible it is no risk, and if it is certain it is a fact to plan for. <b>Risk impact</b> (harm) is the consequence if it does occur. Together they give the <b>risk level</b>: <b>risk level = likelihood × impact</b>, and the higher the level, the more important it is to treat the risk.',
      'Because risks drive testing, the syllabus asks you to separate two families. <b>Project risks</b> concern managing and controlling the <i>project</i>. They threaten schedule, budget or scope and so the project’s ability to meet its goals. The syllabus groups them as organisational (late deliveries, inaccurate estimates, cost cutting), people (insufficient skills, conflicts, communication problems, staff shortage), technical (scope creep, poor tool support) and supplier issues (third-party failing to deliver, supplier bankruptcy).',
      '<b>Product risks</b> concern the <i>quality of the product</i> and relate to quality characteristics such as those in ISO 25010. Examples: missing or wrong functionality, incorrect calculations, runtime errors, poor architecture, inefficient algorithms, inadequate response time, poor user experience, security vulnerabilities. Their realisation can mean dissatisfied users, lost revenue, trust or reputation, damage to third parties, high maintenance costs and an overloaded help desk, criminal penalties and, in extreme cases, injury or death.',
      'A handy test: ask “if this happens, does the <i>project</i> go wrong, or does the <i>software</i> behave wrongly?” Project: late delivery. Product: wrong tax calculation. Testing mainly mitigates product risks, but testers care about project risks too, since a late environment shortens testing time.'
    ],
    table: { head: ['Example risk', 'Type', 'Reason'], rows: [
      ['Key tester leaves mid-project', 'Project (people)', 'Threatens schedule and capacity'],
      ['Test tool cannot handle the new UI technology', 'Project (technical)', 'Poor tool support'],
      ['Cloud supplier delivers the environment late', 'Project (supplier)', 'Third-party delivery failure'],
      ['Invoice total is rounded wrongly', 'Product', 'Incorrect calculation'],
      ['Pages need 12 seconds to load under peak load', 'Product', 'Inadequate response time']
    ] },
    blocks: [
      { t: 'good', h: 'Worked example', x: 'On a 1–5 scale for both factors: “payment charged twice” has likelihood 3 and impact 5, level 3 × 5 = <b>15</b>. “Footer text misaligned on one browser” has likelihood 4 and impact 1, level 4 × 1 = <b>4</b>. Although the second is more probable, the first deserves much more testing. With probabilities and a money scale: likelihood 0.2 and impact 8 gives 1.6.' },
      { t: 'warn', h: 'Exam trap', x: 'Poor tool support, staff shortage and inaccurate estimates are <b>project</b> risks. Incorrect calculations and poor response time are <b>product</b> risks. Also, a likelihood of exactly 0 or 1 is not a valid risk likelihood.' }
    ]
  },

  'risk-analysis': {
    paras: [
      '<b>Risk management</b> has two main activities: <b>risk analysis</b> (made up of risk identification and risk assessment) and <b>risk control</b> (made up of risk mitigation and risk monitoring). A test approach in which test activities are selected, prioritised and managed according to this analysis and control is called <b>risk-based testing</b>. The purpose of product risk analysis, from a testing view, is to make the team aware of product risks so the test effort is focused where it reduces the <b>residual risk</b> (the risk left after mitigation) the most. It should start early in the life cycle.',
      '<b>Risk identification</b> creates a comprehensive list of risks. Stakeholders use brainstorming, workshops, interviews or cause-effect diagrams; involving people with different viewpoints (business, development, operations) finds more risks than testers alone.',
      '<b>Risk assessment</b> then takes each identified risk and does four things: categorises it, determines likelihood, impact and level, prioritises it, and proposes how to handle it. Categorising helps because risks in the same category (say security) can usually be mitigated in a similar way.',
      'Assessment may be <b>quantitative</b>, where level = likelihood × impact (e.g. 0.3 × 6 = 1.8), or <b>qualitative</b>, where a <b>risk matrix</b> with, for example, low/medium/high likelihood and impact gives a rating per cell. A mix is also allowed. Quantitative numbers look exact but often rest on guesses, so qualitative matrices are common.',
      'The results shape testing in six ways: they determine the <b>test scope</b>; the <b>test levels</b> and test types; the <b>techniques and coverage</b> to be reached; the <b>effort</b> per task; the <b>priority</b>, so that critical defects are found as early as possible; and whether <b>activities other than testing</b> (training, redesign, extra reviews) would reduce the risk. In short, higher risk means more thorough testing, done earlier.'
    ],
    table: { head: ['Impact \\ Likelihood', 'Low', 'Medium', 'High'], rows: [
      ['High', 'Medium', 'High', 'High'],
      ['Medium', 'Low', 'Medium', 'High'],
      ['Low', 'Low', 'Low', 'Medium']
    ] },
    blocks: [
      { t: 'good', h: 'Worked example', x: 'Workshop on an online pharmacy identifies four product risks (likelihood × impact, scale 1–5): R1 wrong dosage shown, 2 × 5 = 10; R2 slow search, 4 × 2 = 8; R3 personal data exposed, 3 × 5 = 15; R4 typo in help text, 3 × 1 = 3. Ranking: R3, R1, R2, R4. Consequences for testing: R3 gets security testing and a penetration test plus code reviews (more thorough, earliest); R1 gets reviews of the content plus boundary-value and decision-table tests with high coverage; R2 gets a performance test; R4 gets only a quick proofreading, no dedicated tests.' },
      { t: 'warn', h: 'Exam trap', x: 'Identification = <i>listing</i> risks; assessment = <i>rating</i> them. Do not mix these with mitigation and monitoring, which belong to risk control. The test <i>approach</i> that uses the whole cycle is risk-based testing.' }
    ]
  },

  'risk-control': {
    paras: [
      '<b>Product risk control</b> is everything done in response to risks that were identified and assessed. It has two parts. <b>Risk mitigation</b> means implementing the actions proposed during assessment in order to reduce the risk level. <b>Risk monitoring</b> checks that the mitigation actions really work, collects more information to improve the assessment, and looks out for <b>emerging risks</b> that nobody listed earlier. Monitoring is why the risk register is reviewed repeatedly rather than written once.',
      'After analysis, several <b>response options</b> exist. <b>Mitigation by testing</b> reduces the likelihood that defects stay hidden. <b>Risk acceptance</b> means deciding to live with the risk, typically when its level is low or the treatment costs more than the possible damage. <b>Risk transfer</b> shifts the consequences to someone else, such as buying insurance or putting liability in a contract with a supplier. A <b>contingency plan</b> prepares the actions to take if the risk does occur, for example a rollback procedure.',
      'The syllabus lists the actions that mitigate product risk <i>by testing</i>: select testers with the experience and skills matching the risk type; use an appropriate level of independence of testing; perform reviews and static analysis; apply appropriate test techniques and coverage levels; use test types that address the affected quality characteristics; and perform dynamic testing, including regression testing.',
      'The link with analysis is direct. A high-risk area gets more skilled testers, higher independence, stronger techniques (e.g. decision-table or state transition testing with a demanding coverage level) and several test types. A low-risk area may only get a smoke test. Monitoring then feeds back: if defects keep appearing in a module rated low risk, the likelihood was underestimated and the plan is changed through test control.'
    ],
    blocks: [
      { t: 'good', h: 'Worked example', x: 'Risk: “interest calculation produces wrong amounts”, level rated high. <b>Mitigation by testing:</b> assign an experienced tester, run a code review and static analysis of the calculation module, use boundary value analysis plus decision tables with full coverage of the rules, and include the module in the regression suite. <b>Acceptance:</b> the rarely used “export to PDF” layout issue is accepted. <b>Transfer:</b> a third-party rate-feed provider is made contractually liable for wrong data. <b>Contingency:</b> a prepared script to correct and reissue statements if wrong amounts reach customers. <b>Monitoring:</b> after the first sprint, 4 defects were still found in the module, so the risk level stays high and more tests are added.' },
      { t: 'warn', h: 'Exam trap', x: 'Do not confuse the four <i>response options</i> (mitigation by testing, acceptance, transfer, contingency plan) with the six <i>testing actions</i> that mitigate risk. And risk monitoring is part of risk control, not of risk analysis.' }
    ]
  },

  'monitoring-metrics': {
    paras: [
      'Three related activities close the loop of test management. <b>Test monitoring</b> gathers information about testing, to judge progress and to check whether exit criteria (or the tasks that stand behind them, such as targets for coverage of product risks, requirements or acceptance criteria) are met. <b>Test control</b> takes that information and gives guidance and corrective actions, called <b>control directives</b>, so that testing stays effective and efficient. <b>Test completion</b> gathers data, testware and experience from finished activities at milestones: end of a test level, end of an Agile iteration, project completed or cancelled, system released, maintenance release completed.',
      'Examples of control directives: reprioritise tests when an identified risk becomes an issue; re-evaluate whether a test item meets entry or exit criteria after rework; adjust the schedule because the environment arrived late; add new resources where needed. The pattern is always “monitoring observed X, so control decides Y”.',
      '<b>Metrics</b> are the numbers monitoring collects. They show progress against schedule and budget, the current quality of the test object, and how effective testing is against the objectives or an iteration goal. The syllabus names seven families: <b>project progress</b> (task completion, resource usage, test effort); <b>test progress</b> (test cases implemented, environment prepared, test cases run/not run, passed/failed, execution time); <b>product quality</b> (availability, response time, mean time to failure); <b>defect</b> (number and priority of defects found/fixed, defect density, defect detection percentage); <b>risk</b> (residual risk level); <b>coverage</b> (requirements, code); <b>cost</b> (cost of testing, organisational cost of quality).',
      'A single metric rarely tells the whole story, and metrics should be interpreted with the plan in mind: 60 % of tests executed is exactly on plan on day 6 of 10, but a warning on day 9.'
    ],
    blocks: [
      { t: 'good', h: 'Worked example', x: 'Plan: 200 test cases, 20 per day over 10 days. At the end of day 5 the dashboard shows 70 executed (35 %), 56 passed, 14 failed, environment down for one day. <b>Test progress metrics:</b> executed 70 of the 100 planned for that point, 30 behind; pass rate 56 / 70 = 80 %. <b>Defect metric:</b> 14 failures produced 11 defect reports. <b>Control directives:</b> add a second tester for days 6–7 (extra resource), reprioritise so high-risk tests run first, and ask operations for a backup environment (schedule adjustment).' },
      { t: 'warn', h: 'Exam trap', x: 'Monitoring only <i>collects</i> information; control <i>acts</i> on it; completion <i>consolidates</i> at milestones. Defect density and defect detection percentage are defect metrics; mean time to failure is a product quality metric; residual risk level is a risk metric.' }
    ]
  },

  'reports': {
    paras: [
      '<b>Test reporting</b> summarises and communicates test information during and after testing. Two report types matter, and the difference is mostly purpose and timing. A <b>test progress report</b> supports ongoing test control: it has to contain enough information to change the schedule, resources or plan when reality deviates. A <b>test completion report</b> summarises a finished test activity, such as a test level, a test cycle or an iteration, and gives information useful for later testing. It is based on the progress reports and other data, and it is written when the activity is complete and, ideally, the exit criteria have been met.',
      'Progress reports are produced regularly (daily, weekly) and contain: the testing period; progress, including whether the team is ahead or behind schedule and notable deviations; impediments and their workarounds; metrics; new and changed risks in the period; and testing planned for the next period. Completion reports contain: a test summary; an evaluation of testing and product quality against the original plan (objectives and exit criteria); deviations from the plan (schedule, duration, effort); impediments and workarounds; metrics; unmitigated risks and defects not fixed; and lessons learned relevant to testing.',
      '<b>Audience shapes the report.</b> Reporting to your own team is frequent and informal. A completion report follows a set template and occurs only once. Different stakeholders need different information: a developer wants defect details, a manager wants progress against schedule and open risks, an executive wants a go/no-go view. ISO/IEC/IEEE 29119-3 calls the progress report a “test status report”.',
      'How to communicate status (5.3.3): verbal communication; dashboards such as CI/CD dashboards, task boards and burn-down charts; electronic channels like email and chat; online documentation; formal test reports. Teams may combine them. The right mix depends on test management concerns, the organisation’s test strategy, regulatory standards or, for self-organising teams, the team itself. <b>Distributed teams</b> separated by distance or time zones usually need more formal communication because face-to-face talk is not always possible.'
    ],
    table: { head: ['Item', 'Progress report', 'Completion report'], rows: [
      ['Frequency', 'Regular (daily, weekly)', 'Once per finished activity'],
      ['Main use', 'Test control: change plan, schedule, resources', 'Evaluate against plan, learn for the future'],
      ['Contains “testing planned for next period”', 'Yes', 'No'],
      ['Contains “lessons learned”', 'No', 'Yes'],
      ['Contains “unmitigated risks, defects not fixed”', 'No (it lists new and changed risks)', 'Yes'],
      ['Typical form', 'Frequent, often informal', 'Template, formal']
    ] },
    blocks: [
      { t: 'good', h: 'Worked example', x: 'Weekly progress report, week 3: period 12–16 Mar; 150 of 220 tests run (68 %), 5 % behind plan; impediment: payment sandbox unstable, workaround is a stub; pass rate 91 %; new risk: certificate expires 30 Mar; next week: finish regression and run performance tests. Completion report after release: summary of 220 tests run, exit criteria met except one open medium-severity defect (unfixed, accepted by the product owner), effort 12 % over plan because of the sandbox, lesson learned: set up the stub in week 1.' },
      { t: 'warn', h: 'Exam trap', x: 'Items are easy to place in the wrong report. “Testing planned for the next period” and “new and changed risks” belong to the progress report. “Lessons learned” and “unmitigated risks, defects not fixed” belong to the completion report.' }
    ]
  },

  'cm': {
    paras: [
      '<b>Configuration management (CM)</b> is the discipline that identifies, controls and tracks work products so that everybody knows exactly what version of what is in use. In testing the work products are test plans, test strategies, test conditions, test cases, test scripts, test results, test logs and test reports, and each one is managed as a <b>configuration item</b>. Without CM, a tester might run an old script against a new build and report a bogus failure, or be unable to say which version of the software produced a given result.',
      'For a <b>complex configuration item</b>, such as a test environment, CM records the parts it is made of, their relationships and their versions (operating system release, database version, application build, test data set). An item that has been approved for testing becomes a <b>baseline</b>. From then on it can be changed only through a formal <b>change control</b> process, which prevents silent changes that would invalidate results.',
      'Whenever a new baseline is created, CM keeps a record of which items changed. This makes it possible to <b>revert to a previous baseline</b> and reproduce earlier test results, for example when a defect reported by a customer must be recreated on the exact version they use.',
      'CM supports testing by making sure every configuration item, <b>test items</b> (the individual parts of the test object) included, has a <b>unique identity, a version history, tracked changes and links to related items</b>, which keeps traceability intact for the whole test process. It also makes sure the testware points to documents and software items without ambiguity, for instance “test case TC-45 v1.3 for requirement R-12 v2, build 4.7.2”.',
      'In modern delivery, continuous integration, delivery and deployment and their testing run in an automated DevOps pipeline, and <b>automated CM</b> is normally part of it: the pipeline itself records which commit, build and environment produced each test result.'
    ],
    blocks: [
      { t: 'good', h: 'Worked example', x: 'Release 2.3 is tested on baseline B-2.3: build 2.3.0, database 14.2, test data set v5, scripts v3.1. Mid-test, a developer wants to upgrade the database to 14.3. Under change control the upgrade is requested, approved and recorded as new baseline B-2.3.1 with the changed item noted. A week later production reports a failure that only occurs on 2.3.0 with database 14.2; the team reverts the environment to B-2.3 and reproduces the failure exactly.' },
      { t: 'warn', h: 'Exam trap', x: 'Configuration items are not only the software; test cases, scripts, results and reports are items too. A baseline is changed only by formal change control, not by whoever owns the item. The purpose is traceability and reproducibility of test results.' }
    ]
  },

  'defects': {
    paras: [
      'Finding defects is a main objective of testing, so an established <b>defect management</b> process is essential. We say “defect”, but a reported anomaly may turn out to be a real defect or something else, such as a false-positive result (the test or the tester was wrong) or a change request (the system behaves as specified, but the user wants something different). Resolving that is part of the process. Anomalies can be reported in any phase of the life cycle. At minimum the process contains a <b>workflow</b> from discovery to closure and <b>rules for classification</b>: log the anomaly, analyse and classify it, decide a response (fix it or keep it as is), and finally close the report. All stakeholders must follow it, and defects from static testing, especially static analysis, are best handled the same way.',
      'A <b>defect report</b> has three objectives: give those who must resolve the defect enough information to do so; provide a means of tracking the quality of the work product; and provide ideas for improving development and test processes (for example, if many defects come from unclear requirements, review requirements earlier).',
      'A defect report logged during dynamic testing typically has: a <b>unique identifier</b>; a <b>title</b> with a short summary; the <b>date</b>, issuing <b>organisation</b> and <b>author</b> with role; the <b>test object and environment</b>; the <b>context</b> (test case, activity, life cycle phase, technique, checklist, test data); a <b>description of the failure</b> with the steps that detected it and logs, database dumps, screenshots or recordings; <b>expected and actual results</b>; <b>severity</b> (degree of impact on stakeholder interests or requirements); <b>priority</b> to fix; <b>status</b> (open, deferred, duplicate, waiting to be fixed, awaiting confirmation testing, re-opened, closed, rejected); and <b>references</b> such as the test case. Tools often fill in identifier, date, author and initial status automatically.',
      'A good report is <b>reproducible</b> (exact steps, data and environment), <b>objective</b> (facts, no blame), <b>concise</b> (one defect per report, clear title) and <b>complete</b> (expected versus actual). <b>Severity</b> is how bad the effect is; <b>priority</b> is how soon it should be fixed. They often correlate but are independent: a misspelt company name on the home page has low severity but may get high priority, while a crash in a function used once a year has high severity but low priority. ISO/IEC/IEEE 29119-3 calls defect reports “incident reports”.'
    ],
    list: [
      '<b>Workflow:</b> log → analyse and classify → decide (fix / keep) → close.',
      '<b>Possible final outcomes of an anomaly:</b> real defect, false positive, change request, duplicate, rejected.',
      '<b>Reproducibility checklist:</b> exact steps, input data, environment and build version, expected vs actual result, evidence (screenshot, log).'
    ],
    blocks: [
      { t: 'good', h: 'Sample defect report', x: '<b>ID:</b> DEF-0231 (tool generated)<br><b>Title:</b> Discount code SAVE10 applied twice when the Apply button is double-clicked<br><b>Date / author:</b> 14 Mar 2026, A. Novak, tester, QA team of Shop Inc.<br><b>Test object / environment:</b> WebShop 3.2.1 (build 3.2.1-457); staging, Chrome 124, Windows 11, test database set v5<br><b>Context:</b> system testing, test case TC-CART-18, equivalence partitioning of discount codes<br><b>Steps:</b> 1. Add item priced 100.00 to the cart. 2. Enter code SAVE10 in the cart. 3. Double-click Apply quickly.<br><b>Expected result:</b> 10 % discount once; total 90.00.<br><b>Actual result:</b> discount applied twice; total 81.00. Screenshot and server log attached.<br><b>Severity:</b> High (revenue loss, reproducible 5 of 5 times).<br><b>Priority:</b> High (promotion starts Monday).<br><b>Status:</b> Open.<br><b>References:</b> TC-CART-18, requirement R-DISC-4.' },
      { t: 'warn', h: 'Exam trap', x: 'A report that says “Cart is broken, please fix” is a bad report: it has no steps, no expected or actual result, no environment and no evidence. Also never use severity and priority as synonyms, and remember that the status list includes both <i>rejected</i> and <i>duplicate</i>, so not every anomaly ends in a fix.' }
    ]
  }

};

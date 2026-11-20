/* CTFL v4.0 in-depth notes (own words) */
(window.ICDETAIL = window.ICDETAIL || {});
(window.ICDETAIL['ctfl-4'] = window.ICDETAIL['ctfl-4'] || {})[2] = {
  'sdlc-impact': {
    paras: [
      'A <b>software development lifecycle (SDLC) model</b> is an abstract, high-level description of how development phases and kinds of work relate to each other, both logically (what depends on what) and in time (what comes when). The syllabus groups examples into three families: <b>sequential</b> (waterfall, V-model), <b>iterative</b> (spiral, prototyping) and <b>incremental</b> (Unified Process). More detailed methods and Agile practices such as Scrum, Kanban, XP, TDD, ATDD and BDD describe parts of the work inside those models.',
      'The central message is that testing has to be <i>adapted</i> to the lifecycle in order to work. The chosen model influences five things: the <b>scope and timing of test activities</b> (which levels and types, and when), the <b>level of detail of test documentation</b>, the <b>choice of test techniques and approach</b>, the <b>extent of test automation</b>, and the <b>role and responsibilities of the tester</b>.',
      'In a <b>sequential</b> model, testers join early: they review requirements and do test analysis and design while the product is still on paper. But executable code only appears in later phases, so dynamic testing cannot normally happen early. In <b>some iterative and incremental</b> models, each iteration is expected to deliver a working prototype or product increment. That means static and dynamic testing can take place at all test levels in every iteration, and because increments arrive often, fast feedback and a lot of regression testing are required. <b>Agile</b> development assumes change can arrive at any time. So lightweight documentation is favoured, and extensive test automation is used to make regression testing easier. Most manual testing relies on experience-based techniques (see chapter 4), which need little preparation in the form of detailed analysis and design.'
    ],
    blocks: [
      { t: '', h: 'Example', x: 'Project A follows a V-model: testers write system test cases from the requirements specification months before any build exists, and the first system test run happens near the end. Project B is a Scrum team shipping every two weeks: it has a large automated regression suite that runs on each build, a thin test plan and testers who spend manual time exploring each new story.' },
      { t: 'warn', h: 'Exam trap', x: 'Do not say that dynamic testing can start at the very beginning of a sequential project: there is no executable code yet, though static testing and test design can begin. And do not claim Agile means “no documentation or planning”; it means lightweight documentation.' }
    ],
    table: { head: ['Lifecycle family', 'What it means for testing'], rows: [
      ['Sequential', 'Early reviews, analysis and design; dynamic testing only once code exists'],
      ['Iterative / incremental', 'Static and dynamic testing at all levels each iteration; fast feedback; much regression testing'],
      ['Agile', 'Light documentation, heavy automation, experience-based manual testing']
    ] }
  },
  'good-practices': {
    paras: [
      'Whatever lifecycle model a project uses, the syllabus names four testing habits that always pay off. This is a K1 objective, so the exam expects you to <i>recall</i> them, but understanding the reasoning makes them easy to remember.',
      '<b>1. Each development activity has a matching test activity.</b> If designing is an activity, there is a corresponding way to check the design; if coding is, there is a corresponding way to check the code. In this way no development step escapes quality control. <b>2. Each test level has its own specific objectives.</b> Component testing, system testing and acceptance testing aim at different things (see section 2.2.1). Because objectives differ, testing can be complete enough without duplicating effort at every level. <b>3. Test analysis and design for a level start during the corresponding development phase.</b> Planning your system tests while requirements are being written, rather than after coding finishes, applies the principle of early testing from chapter 1. <b>4. Testers take part in reviewing work products as soon as drafts exist.</b> The sooner a tester reads a draft requirement or design, the sooner ambiguities and gaps are caught, which supports shift left.',
      'Notice that none of these says <i>when to execute tests</i> or <i>what documents to write</i>. They are about alignment and timing of testing with development, so they hold in a waterfall project as well as in a Scrum team.'
    ],
    blocks: [
      { t: '', h: 'Example', x: 'While architects are drafting the interface design, a tester reads the draft and spots that error codes are not defined (practice 4). At the same time the test team starts outlining integration test conditions for those interfaces (practice 3). They know the integration tests will target interface problems only, while the system tests will target end-to-end behaviour (practice 2), and each design activity has a matching check (practice 1).' },
      { t: 'good', h: 'Memory hook', x: 'Corresponding activity, level-specific objectives, early analysis and design, early review of drafts.' },
      { t: 'warn', h: 'Exam trap', x: 'Be careful with distractors that sound sensible but are not on the list, such as “testing only starts when code is complete” or “every level repeats the same tests”. The practices stress avoiding redundancy and starting early.' }
    ]
  },
  'test-first': {
    paras: [
      'Test-first approaches use tests as a tool to <i>steer</i> development rather than merely to check it afterwards. All three named in the syllabus apply early testing and shift left because the tests are defined before the code that satisfies them, and they fit an iterative style of development. The exam objective is K1: recall the three examples and what characterises each.',
      '<b>Test-driven development (TDD)</b> lets test cases direct the coding, instead of relying on extensive upfront software design. The rhythm: write a test first (it fails because the code does not exist), write just enough code to make it pass, and then refactor both the code and the tests. <b>Acceptance test-driven development (ATDD)</b> derives tests from the acceptance criteria as part of designing the system; again, the tests are written before the corresponding part of the application is built to satisfy them. <b>Behavior-driven development (BDD)</b> expresses the desired behaviour of the application as test cases in a simple natural language that stakeholders can read, commonly in the <i>Given / When / Then</i> format. These test cases are then automatically translated into executable tests.',
      'In all three, the tests can stay behind as automated tests. They act as a safety net that protects code quality during later adaptations and refactoring, which also supports regression testing.',
      'A convenient way to tell them apart: TDD is about the <i>code</i> (developers write tests that drive coding), ATDD is about <i>acceptance criteria</i> (what the business has agreed counts as done), and BDD is about <i>readable behaviour descriptions</i> (shared language that stakeholders understand).'
    ],
    blocks: [
      { t: '', h: 'Example', x: 'BDD scenario for a library app: “Given a member has 3 books on loan, When the member tries to borrow a 4th book, Then the system shows the loan-limit message.” A tool turns the sentence into an automated test, so business people can read the same scenario that the pipeline runs. A TDD developer would instead start with a failing unit test for a method that checks the loan count.' },
      { t: 'warn', h: 'Exam trap', x: 'Do not mix up the expansions (acceptance test-driven vs behavior-driven vs test-driven), and remember that Given/When/Then is the usual BDD format. All three write tests before the code.' }
    ],
    table: { head: ['Approach', 'Where the tests come from', 'Distinctive trait'], rows: [
      ['TDD', 'Developer’s intent for the code', 'Write test, write code, refactor'],
      ['ATDD', 'Acceptance criteria', 'Tests written before that part of the application is developed'],
      ['BDD', 'Desired behaviour in natural language', 'Given/When/Then, automatically turned into executable tests']
    ] }
  },
  'devops': {
    paras: [
      '<b>DevOps</b> is an organisational approach that brings development (testing included) and operations together to pursue shared goals, treating both functions as equally valuable. That demands a cultural shift, since the two groups traditionally had separate aims. DevOps promotes team autonomy, fast feedback, integrated toolchains and technical practices such as <b>continuous integration (CI)</b> and <b>continuous delivery (CD)</b>. Teams use a <b>delivery pipeline</b> to build, test and release code faster and with high quality.',
      'For testing, the syllabus lists several benefits. Feedback on code quality is fast, including whether a change harms existing code. CI encourages shift left, because developers are expected to submit good code together with component tests and static analysis. Automated processes such as CI/CD help establish stable test environments. Quality characteristics that are not functional, such as performance efficiency and reliability, become more visible. The pipeline reduces repetitive manual testing, and the scale and range of automated regression tests keeps the risk of regression low.',
      'It is not free of risks and challenges. The delivery pipeline has to be defined and established, the CI/CD tools must be introduced and maintained, and test automation needs additional resources and can be hard to set up and maintain.',
      'Finally, a high level of automation does not remove the human tester. Manual testing, especially done from the user’s perspective, is still needed, because users notice things automated checks were not written to look for.'
    ],
    blocks: [
      { t: '', h: 'Example', x: 'Each time a developer pushes a change, the pipeline compiles it, runs static analysis and component tests and deploys to a test environment, where automated regression tests run. If anything fails, the developer knows within minutes (fast feedback). The test team uses the saved time for exploratory sessions in which they use the app as a customer would (manual, user perspective).' },
      { t: 'warn', h: 'Exam trap', x: 'Statements that DevOps eliminates manual testing, guarantees defect-free software or needs no extra effort are wrong. It reduces repetitive manual testing, and the setup and maintenance of pipeline and automation are explicit challenges.' }
    ],
    table: { head: ['Benefits for testing', 'Risks and challenges'], rows: [
      ['Fast feedback on code quality and on harm to existing code', 'Pipeline must be defined and established'],
      ['CI promotes shift left (component tests, static analysis with submissions)', 'CI/CD tools must be introduced and maintained'],
      ['Stable test environments through automation', 'Test automation needs extra resources, may be hard to maintain'],
      ['More visibility of non-functional characteristics', ''],
      ['Less repetitive manual testing, lower regression risk', '']
    ] }
  },
  'shift-left': {
    paras: [
      '<b>Shift left</b> is another name for the principle of early testing (chapter 1). Picture the lifecycle as a timeline running left (early) to right (late); traditionally much testing sat at the right-hand end, after coding and integration. Shifting left means moving testing activity earlier instead of waiting for code to be written or components integrated. Importantly, it does <i>not</i> mean that testing later in the lifecycle can be neglected; it adds early testing rather than replacing late testing.',
      'The syllabus gives practices that show how to do it. Testers can <b>review specifications from their viewpoint</b>, which often uncovers ambiguities, incompleteness and inconsistencies. Teams can <b>write test cases before the code</b> and run the code in a test harness while it is being implemented. They can use <b>CI, and even better CD</b>, so that fast feedback and automated component tests accompany every submission to the repository. They can perform <b>static analysis</b> of source code before dynamic testing, or as part of an automated process. And they can begin <b>non-functional testing at component level</b> where possible; this counts as shift left because such tests are normally postponed until a complete system and representative environment exist.',
      'There is a cost side. Shift left may demand additional training, effort or money earlier in the project, but it is expected to save effort and cost later. Because the investment comes first and the payoff comes afterwards, stakeholders need to understand and accept the idea; without their buy-in, the early effort may be cut.'
    ],
    blocks: [
      { t: '', h: 'Example', x: 'A team used to testing performance only before release now includes a response-time check in the component tests of the search service. A slow query is caught in week 2 and fixed by the developer who just wrote it, instead of surfacing during a stressful pre-release load test that would require redesign.' },
      { t: 'warn', h: 'Exam trap', x: 'Shift left is not “test only early” and not “skip system or acceptance testing”. It is also not a different principle from early testing; the syllabus presents them as the same idea under two names.' }
    ]
  },
  'retro': {
    paras: [
      'A <b>retrospective</b> is a structured meeting in which a team looks back at its own way of working in order to get better. Depending on the SDLC model it might be held at the end of a project or an iteration, at a release milestone, or whenever the team feels it is needed. Participants are not only testers; developers, architects, the product owner, business analysts and others join, because the improvement topics usually cross role boundaries.',
      'The discussion revolves around three questions. Which things worked well and are worth keeping? Which did not work and could be better? And what will the team do to put the improvements in place while holding on to the successes? The results are recorded and usually become part of the <b>test completion report</b> (a testware item produced at the completion stage, described later in the syllabus). The syllabus stresses that retrospectives are critical for continuous improvement and that recommended improvements must actually be <b>followed up</b>; a retrospective whose actions are ignored changes nothing.',
      'Typical benefits for testing are: higher test effectiveness and efficiency (by applying process-improvement suggestions); better testware quality (for example, by reviewing test processes together); team bonding and learning (people get a chance to raise issues and propose improvements); a better test basis (shortcomings in the extent and quality of requirements can be raised and resolved); and better cooperation between development and testing (because collaboration is examined and tuned regularly).'
    ],
    blocks: [
      { t: '', h: 'Example', x: 'At the end of a sprint the team notes that automated tests ran green quickly (keep), but that stories often reached testers without acceptance criteria (improve). They agree that the product owner adds criteria before sprint planning, and the next retrospective starts by checking whether that happened. The agreed action later appears in the completion report.' },
      { t: 'warn', h: 'Exam trap', x: 'A retrospective is not a test-team-only meeting and not a defect-triage session. Its value comes from following up on the agreed improvements.' }
    ]
  },
  'levels': {
    paras: [
      'A <b>test level</b> is a group of test activities organised and managed together. Each level is an instance of the test process, carried out on software at a particular stage of development, from single components up to whole systems or, where relevant, systems of systems. In sequential models the exit criteria of one level often form part of the entry criteria of the next; in some iterative models that does not apply. Levels can overlap in time, and one development activity may span several of them.',
      'To keep levels from overlapping in what they test, we tell them apart by attributes: <b>test object, test objectives, test basis, defects and failures, and approach and responsibilities</b> (the list is not exhaustive). The syllabus describes five levels. <b>Component testing</b> (unit testing) examines components in isolation, often needing harnesses or unit test frameworks, and is normally done by developers in their own environment. <b>Component integration testing</b> checks interfaces and interactions between components, and depends heavily on the integration strategy (bottom-up, top-down or big-bang). <b>System testing</b> examines the overall behaviour and capabilities of a whole system or product: end-to-end functional tasks and non-functional characteristics. Some non-functional characteristics, usability for instance, are best tested on a complete system in a representative environment, though simulating subsystems is possible. An independent team may perform it, and it relates to the system specifications. <b>System integration testing</b> checks the interfaces between the system under test and other systems or external services, and needs an environment similar to operation. <b>Acceptance testing</b> concentrates on validation and on showing readiness for deployment, i.e. that the system fulfils the users’ business needs; ideally the intended users do it. Its main forms: user acceptance (UAT), operational, contractual, regulatory, alpha and beta testing.'
    ],
    blocks: [
      { t: '', h: 'Example', x: 'An online shop: a developer checks the price-calculation class alone (component). Next the team checks that the cart service and the pricing service exchange data correctly (component integration). Testers then run the full purchase journey on the whole shop (system). They check the shop against the external payment provider and courier API (system integration). Finally a group of shop staff confirms that the daily workflow suits them (acceptance, UAT).' },
      { t: 'warn', h: 'Exam trap', x: 'Component integration is about components inside the system; system integration is about the system and other systems or external services. Also, “unit testing” = component testing, and “unit integration testing” = component integration testing.' }
    ],
    table: { head: ['Level', 'Focus', 'Typical performer or note'], rows: [
      ['Component', 'Components in isolation', 'Developers, own environment, harness or framework'],
      ['Component integration', 'Interfaces between components', 'Depends on integration strategy'],
      ['System', 'Whole system behaviour', 'Often independent team, representative environment'],
      ['System integration', 'Interfaces to other systems and external services', 'Environment like operation'],
      ['Acceptance', 'Validation, readiness for deployment', 'Ideally intended users']
    ] }
  },
  'types': {
    paras: [
      'While a test <i>level</i> says where in development you are testing, a test <b>type</b> says what kind of concern you are checking: a group of test activities related to specific quality characteristics. The syllabus covers four types, and they can be applied at every test level, although the focus changes from level to level.',
      '<b>Functional testing</b> evaluates the functions that a component or system should perform, the “what”. Its aim is to check <i>functional completeness</i> (are all needed functions there?), <i>functional correctness</i> (do they give right results?) and <i>functional appropriateness</i> (do they suit the tasks users have?). <b>Non-functional testing</b> evaluates attributes other than the functions, the “how well”. ISO/IEC 25010 classifies the characteristics as performance efficiency, compatibility, usability (also called interaction capability), reliability, security, maintainability, portability (also called flexibility) and safety. Non-functional testing can start early, for example in reviews or component testing, and many non-functional tests reuse functional tests while checking a constraint, such as that a function finishes within a stated time or can be moved to a new platform. Finding non-functional defects late can seriously threaten a project, and some tests need a special environment, such as a usability lab.',
      '<b>Black-box testing</b> is specification-based: tests are derived from documentation that is independent of the internal structure, and the objective is to check behaviour against the specification. <b>White-box testing</b> is structure-based: tests come from the implementation or internal structure (code, architecture, work flows and data flows), and the objective is to cover that structure to an acceptable degree. Different test techniques (chapter 4) can be used for all four types.'
    ],
    blocks: [
      { t: '', h: 'Example', x: 'For a ticket-booking site: checking that selecting a seat reserves it is functional. Checking that the same action still completes within three seconds with a thousand users is non-functional (performance efficiency). Deriving tests from the requirement text alone is black-box; deriving tests to make sure every branch of the seat-allocation code is run is white-box. Both can happen at component or system level.' },
      { t: 'warn', h: 'Exam trap', x: 'Functional vs black-box are not the same thing, and non-functional vs white-box are not either: the two pairs describe different dimensions (what is checked vs how tests are derived). And no type belongs to only one level.' }
    ],
    table: { head: ['Type', 'Asks', 'Based on'], rows: [
      ['Functional', 'What should it do?', 'Required functions'],
      ['Non-functional', 'How well does it behave?', 'Quality characteristics (ISO/IEC 25010)'],
      ['Black-box', 'Does behaviour match the specification?', 'Specification, not internal structure'],
      ['White-box', 'Is the internal structure covered?', 'Code, architecture, work flows, data flows']
    ] }
  },
  'conf-reg': {
    paras: [
      'Software changes for two reasons: to add something new or to fix a defect. After a change, two checks are needed, and they answer different questions.',
      '<b>Confirmation testing</b> asks: <i>was the original defect really fixed?</i> The thorough way is to re-execute every test that failed because of the defect, and possibly add new tests that cover whatever additional changes the fix required. The choice depends on risk. When time or money is short, confirmation testing may be reduced to simply performing the steps that used to reproduce the failure and checking that the failure no longer appears.',
      '<b>Regression testing</b> asks: <i>did this change, including a fix that has already been confirmed, damage anything else?</i> The adverse effects could appear in the changed component, in other components of the same system or even in connected systems, and testing can also relate to the environment rather than only the test object. It is advisable to carry out an <b>impact analysis</b> first, which shows which parts of the software could be affected and thus how large the regression testing should be. Regression suites run many times and typically grow with every iteration or release, which makes regression testing a strong candidate for automation. Automation should begin early in the project, and where CI is used (as in DevOps) automated regression tests should be part of it, possibly on several test levels.',
      'Both kinds of testing are required at every test level where defects are fixed or changes are made.'
    ],
    blocks: [
      { t: '', h: 'Worked example', x: 'Defect: the order summary shows the wrong VAT for a particular country. After the fix, the tester repeats the failed test for that country (confirmation). Because the change touched shared tax code, impact analysis says invoices, refunds and the export to accounting may be affected, so the automated regression suite for those areas runs too (regression). Passing confirmation does not make regression unnecessary.' },
      { t: 'warn', h: 'Exam trap', x: 'Confirmation looks at the specific fixed defect; regression looks for side effects elsewhere. Remember too that “tests wear out” in chapter 1 has an exception exactly here: repeating automated regression tests is useful.' }
    ],
    table: { head: ['', 'Confirmation testing', 'Regression testing'], rows: [
      ['Question', 'Is the defect fixed?', 'Did the change break anything?'],
      ['Scope', 'Tests that failed, plus tests for the fix', 'Changed area, other components, connected systems, environment'],
      ['Sizing aid', 'Risk', 'Impact analysis'],
      ['Automation', 'Possible', 'Strong candidate, begin early']
    ] }
  },
  'maintenance': {
    paras: [
      'Once a system is live it keeps changing, and testing those changes is called <b>maintenance testing</b>. The syllabus notes that maintenance can be corrective, adaptive to changes in the environment, or aimed at improving performance or maintainability (see ISO/IEC 14764), and releases can be planned or unplanned (hot fixes).',
      'Testing a change to an operational system has two sides: evaluating whether the change itself was implemented successfully, and checking for regressions in the parts that did not change, which is usually most of the system. <b>Impact analysis</b> can be done even before the change, to help decide whether to make it at all, based on the possible consequences elsewhere in the system.',
      'How much maintenance testing is needed typically depends on three things: the degree of risk of the change, the size of the existing system and the size of the change.',
      'The syllabus classifies the triggers into three groups. <b>Modifications</b> include planned, release-based enhancements, corrective changes and hot fixes. <b>Upgrades or migrations of the operational environment</b>, for example moving from one platform to another, can require tests of the new environment as well as of the changed software, and tests of data conversion when data from another application is migrated into the system. <b>Retirement</b> happens when an application reaches end of life; it may require testing of data archiving if long retention periods are needed, and testing of restore and retrieval procedures in case archived data is needed later.'
    ],
    blocks: [
      { t: '', h: 'Example', x: 'A company moves its HR application to a new cloud platform without changing features (migration trigger). Testers check that the application works in the new environment, that employee records converted correctly and that the unchanged payroll features still behave as before. Later, when the application is retired, they verify that archived records can still be retrieved on request.' },
      { t: 'good', h: 'Memory hook', x: 'Modification, migration/upgrade, retirement.' },
      { t: 'warn', h: 'Exam trap', x: 'Maintenance testing is not limited to bug fixes. Also do not confuse the scope factors (risk of change, size of system, size of change) with the triggers.' }
    ],
    table: { head: ['Trigger', 'Typical testing concerns'], rows: [
      ['Modifications', 'Enhancements, corrective changes, hot fixes; the change plus regression'],
      ['Upgrade or migration', 'New environment, changed software, data conversion'],
      ['Retirement', 'Data archiving, restore and retrieval of archived data']
    ] }
  }
};

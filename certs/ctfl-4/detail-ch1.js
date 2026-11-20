/* CTFL v4.0 in-depth notes (own words) */
(window.ICDETAIL = window.ICDETAIL || {});
(window.ICDETAIL['ctfl-4'] = window.ICDETAIL['ctfl-4'] || {})[1] = {
  'what-is-testing': {
    paras: [
      'Many people picture testing as one thing: somebody runs the program and checks whether the screen shows the right answer. The syllabus deliberately pushes against that picture. <b>Testing</b> is a whole bundle of activities whose two big goals are <i>discovering defects</i> and <i>evaluating the quality</i> of software work products. Whatever is being examined at a given moment (a requirement, a user story, a design, a class, a complete application) is called the <b>test object</b>. Running the software is just one slice of the bundle; the rest is planning, analysing what to check, designing checks, watching progress, steering when things drift and reporting. That is why the syllabus also calls testing a largely <i>intellectual</i> activity: tools can execute and compare, but deciding what is worth checking needs analytical and critical thinking.',
      'A second misconception is that testing only asks “did we build it to the specification?”. That question is <b>verification</b>. Testing also asks <b>validation</b>: “is this actually what the users and other stakeholders need, once it is in its real operating environment?”. A product can pass verification perfectly and still fail validation, because the specification itself may have been wrong or incomplete.',
      'Testing can be <b>dynamic</b> (the software is executed and its behaviour observed) or <b>static</b> (nothing is executed; people read work products in reviews, or tools analyse code in static analysis). Both are testing, because both can reveal defects.',
      'Why do objectives matter? Because they decide how much effort goes where. A team can test to find as many defects as possible, to prove a legal requirement is met, to give managers evidence for a release decision, or to build confidence. The same product may be tested with different emphasis depending on the work product, the test level, the risks, the lifecycle model and business pressures such as time to market.'
    ],
    list: [
      'Typical objectives: evaluate work products; cause failures and find defects; ensure required coverage of the test object; reduce the risk of inadequate quality; verify requirements are fulfilled; verify compliance with contractual, legal and regulatory demands; inform stakeholders so they can decide; build confidence; validate completeness and fitness for stakeholder expectations.',
      '<b>Coverage</b> (an objective on its own) means how much of something specified, such as requirements or code branches, has been exercised by the tests.'
    ],
    blocks: [
      { t: '', h: 'Example', x: 'A bank is about to release a mobile transfer feature. Reviewing the user stories before any code exists is static testing with the objective “evaluate work products”. Running transfers on a test build is dynamic testing aimed at “cause failures and find defects”. Checking the app against the regulator’s rules is “verify compliance”. Letting a few customers try it to see whether it fits how they really pay bills is validation.' },
      { t: 'warn', h: 'Exam trap', x: 'Do not answer “testing = executing the software and comparing results”, and do not treat validation as something separate from testing. Also note that static testing is testing, even though no code runs.' }
    ]
  },
  'testing-vs-debugging': {
    paras: [
      'Testing and debugging are neighbours that are easily mistaken for one another, but they have different jobs and often different people. Testing <i>exposes</i> a problem: in dynamic testing it provokes a failure, in static testing it points straight at a defect in a document or code. Debugging is what happens afterwards, and it is a development activity, not a testing one: somebody tracks down why the failure happened and removes the underlying defect.',
      'After a dynamic test shows a failure, the typical debugging flow has three steps. First the developer must <b>reproduce</b> the failure, because a problem that cannot be repeated is very hard to analyse. Second comes <b>diagnosis</b>: studying the behaviour to locate the defect that produced it. Third is <b>fixing</b> the defect. Testing then returns to the picture: <b>confirmation testing</b> checks that the original problem is gone, ideally carried out by the same person who first found it, because they know exactly how the failure appeared. <b>Regression testing</b> may follow, checking that the fix did not break something elsewhere (chapter 2 develops both).',
      'The flow is shorter for static testing. A review that finds a typo in a requirement or a faulty condition in code has already found the defect itself. No failure had to occur, so there is nothing to reproduce and no diagnosis is needed; debugging reduces to removing the defect.',
      'Understanding this split also explains a common team confusion. When a tester says “I found a bug”, the work of the tester is the finding and describing; analysing the cause and correcting the code belong to debugging. Keeping the two apart makes planning more honest, since time spent fixing is not time spent testing.'
    ],
    blocks: [
      { t: '', h: 'Worked example', x: 'A tester runs a discount test and sees a total of 90 instead of 80 (failure triggered by dynamic testing). The developer reproduces it, steps through the code and discovers the discount is subtracted from the wrong amount (diagnosis), then corrects that calculation (fix). The tester re-runs the same test (confirmation testing) and then re-runs related invoice tests (regression testing). Had the same wrong rule been spotted in a design review, the author would simply have edited the document.' },
      { t: 'warn', h: 'Exam trap', x: 'Fixing a defect is not a testing activity. Also remember the asymmetry: reproduction and diagnosis are needed only after dynamic testing, never after static testing.' }
    ],
    table: { head: ['Step', 'After dynamic testing', 'After static testing'], rows: [
      ['What the test found', 'A failure', 'A defect directly'],
      ['Reproduce the failure', 'Yes', 'Not needed'],
      ['Diagnose to find the defect', 'Yes', 'Not needed'],
      ['Remove the defect', 'Yes (debugging)', 'Yes (debugging)'],
      ['Follow-up testing', 'Confirmation and regression testing', '']
    ] }
  },
  'why-testing': {
    paras: [
      'Why spend money on testing at all? The syllabus gives several reasons, and they are best remembered as the ways testing <i>contributes to a project’s success</i>. First, it is a cost-effective way of detecting defects. Note the wording: testing itself finds defects, and quality improves <i>indirectly</i> once those defects are removed through debugging. Second, it gives a direct reading of quality at different points of the lifecycle, and project managers use such readings when deciding whether to move on, for example to release. Third, testers act as an indirect voice of the users. Involving a representative group of real users throughout development is normally too expensive or simply impossible, so testers keep user needs in mind instead. Fourth, contracts, laws or regulatory standards may demand testing.',
      'Testing is also not limited to the people with “tester” in their job title. Any stakeholder can apply testing skills to move the project forward. Testing is one form of <b>quality control</b>; others the syllabus names are formal methods (such as model checking and proof of correctness), simulation and prototyping.',
      'The syllabus then separates testing from <b>quality assurance (QA)</b>, two terms people often use as synonyms. Testing is <i>product-oriented</i> and <i>corrective</i>: it examines the thing built and exposes problems to be fixed. QA is <i>process-oriented</i> and <i>preventive</i>: it works on the way of working, on the belief that a well-run, correctly followed process produces a good product. QA covers both development and testing processes, and everyone on the project shares responsibility for it. Test results serve both: testing uses them to get defects fixed, while QA uses the same results as feedback on how well the processes are performing.'
    ],
    blocks: [
      { t: '', h: 'Example', x: 'A team keeps finding the same kind of defect: requirements that leave out error messages. Testing reports each missing message so it can be fixed (corrective). QA looks at the pattern in the results and changes the process, for instance adding an error-handling checklist to requirement reviews so the gap stops occurring (preventive).' },
      { t: 'good', h: 'Remember', x: 'Contributions of testing: cost-effective defect detection, direct quality evaluation during the SDLC, indirect user representation, and meeting contractual, legal or regulatory needs. Testing = product, corrective, a form of quality control. QA = process, preventive, everyone’s responsibility.' },
      { t: 'warn', h: 'Exam trap', x: 'Testing does not itself raise quality; it provides information and enables defect removal. Likewise QA is not “the test team”.' }
    ],
    table: { head: ['', 'Testing', 'Quality assurance'], rows: [
      ['Focus', 'The product', 'The processes'],
      ['Style', 'Corrective', 'Preventive'],
      ['Who is responsible', 'Not limited to the test team; any stakeholder can use testing skills', 'Everyone on the project'],
      ['Use of test results', 'Get defects fixed', 'Judge how well processes work']
    ] }
  },
  'error-defect-failure': {
    paras: [
      'This section gives you the vocabulary for talking precisely about what goes wrong, and the exam likes to check that you can tell the four terms apart. The chain starts with a person. A human being makes an <b>error</b> (a mistake): misreading a requirement, mistyping a formula, forgetting a case. That error leaves behind a <b>defect</b> (also called a fault or bug) in some work product. If the work product is code and the defective part runs, the system may behave wrongly, which is a <b>failure</b>: the observable deviation from what the software should do.',
      'Several subtleties follow. Defects live in far more than code: requirement documents, test scripts and build files can all contain them. A defect in an early document that nobody catches tends to spawn further defects in everything derived from it, which is one reason finding defects early pays off. Not every defect turns into a failure. Some fail every time they are executed, some only under special circumstances, and some never cause a failure at all (for example, code that is never reached). And failures do not always need a defect: environmental conditions such as radiation or strong electromagnetic fields can disturb firmware and make a system fail.',
      'People err for ordinary reasons: time pressure, complex products, processes, infrastructure or interactions, tiredness, and lack of training.',
      'Finally the <b>root cause</b>: the fundamental reason a problem occurred, such as a situation that led someone to make the error. It is searched for by <b>root cause analysis</b>, usually when a failure occurs or a defect is found. The idea is that removing the root cause prevents similar problems or makes them less frequent, which is more valuable than fixing one defect at a time.'
    ],
    blocks: [
      { t: 'good', h: 'Worked example', x: 'A new developer joins mid-sprint with no briefing on the pricing rules (root cause). Lacking knowledge, she writes the free-shipping condition as “order total above 50” instead of “50 or more” (error). The code now contains a wrong comparison (defect). A customer with an order of exactly 50 is charged shipping in production (failure). Root cause analysis points to the missing onboarding, so the fix of the process helps beyond this one bug.' },
      { t: 'warn', h: 'Exam trap', x: 'Do not call the observed wrong behaviour a “defect”: what the user sees is the failure, what sits in the work product is the defect, and the human action is the error. Also remember that a defect does not guarantee a failure, and that a failure can arise without any defect.' }
    ],
    table: { head: ['Term', 'What it is', 'Where it lives'], rows: [
      ['Root cause', 'Fundamental reason the problem arose', 'Situation, process or conditions'],
      ['Error (mistake)', 'Human action that goes wrong', 'In a person'],
      ['Defect (fault, bug)', 'Flaw in a work product', 'Code, requirements, scripts, build files'],
      ['Failure', 'Observed deviation in behaviour', 'At run time, seen by users or testers']
    ] }
  },
  'principles': {
    paras: [
      'The seven principles are broad guidelines gathered over decades. They are not laws of physics; they describe tendencies that help you decide how to test. Treat each as a short story you can recognise in a scenario.',
      '<b>1. Testing shows the presence of defects, not their absence.</b> A failure caused by a defect shows that defects are present, but a passing suite never proves the product is correct. More testing lowers the chance of leftover defects without reducing it to zero. <b>2. Exhaustive testing is impossible</b> beyond trivial cases, since the combinations of inputs, paths and preconditions explode; so we choose with test techniques, prioritisation and risk-based testing. <b>3. Early testing saves time and money.</b> A defect removed early cannot infect the work products derived from it, so fewer failures happen later; start static and dynamic testing as soon as possible. <b>4. Defects cluster together.</b> A small number of components usually hold most defects or cause most operational failures, an instance of the Pareto principle; predicted and observed clusters feed risk-based testing. <b>5. Tests wear out.</b> Re-running identical tests finds fewer and fewer new defects, so tests and data may need changing and new tests writing. Yet repetition is sometimes valuable, notably automated regression testing. <b>6. Testing is context dependent.</b> No single approach suits every situation; a game and an insulin pump are tested differently. <b>7. Absence-of-defects fallacy.</b> Believing that verifying every requirement and fixing every found defect guarantees success is mistaken: the product may still fail users, miss business goals or lose to competitors. Validation is needed as well.'
    ],
    blocks: [
      { t: '', h: 'Example', x: 'A team sees that 60% of last quarter’s production incidents trace back to the payment module, so they assign extra testers and reviews there (principle 4). Their nightly suite has found nothing new for months, so they add new data variations (principle 5). They cannot try every card, currency and browser combination, so they select by risk (principle 2).' },
      { t: 'warn', h: 'Exam trap', x: 'Tests wear out is about repetition losing effectiveness; defects cluster together is about location. The absence-of-defects fallacy is not about proving zero defects (that is principle 1); it is about a defect-free-looking product that still does not meet needs. Also, “early testing” is the principle behind shift left.' }
    ],
    table: { head: ['#', 'Principle', 'Typical scenario clue'], rows: [
      ['1', 'Presence, not absence, of defects', 'Suite passed, so “no bugs” is claimed'],
      ['2', 'Exhaustive testing impossible', 'Too many combinations to try all'],
      ['3', 'Early testing saves time and money', 'Review finds a defect before coding'],
      ['4', 'Defects cluster together', 'One module produces most bugs'],
      ['5', 'Tests wear out', 'Same tests stop finding new defects'],
      ['6', 'Context dependent', 'Different domains need different testing'],
      ['7', 'Absence-of-defects fallacy', 'Requirements met but users unhappy']
    ] }
  },
  'test-process': {
    paras: [
      'A <b>test process</b> is the set of activity groups that, taken together, make it likely that testing reaches its objectives. Which ones you include, how you carry them out and when they occur is decided when you plan for the situation at hand. The seven groups look like a sequence, but in practice they overlap and repeat: in an Agile team, analysis, design and execution for one story can happen on the same day, and you loop back whenever something changes.',
      '<b>Test planning</b> sets the objectives and picks the approach that best achieves them within the project’s constraints. <b>Test monitoring and control</b> run alongside everything else: monitoring is the continuous checking of activities and comparing real progress with the plan; control is acting to meet the objectives when reality drifts (for example reassigning testers). <b>Test analysis</b> asks “what to test?”. Testers study the test basis (requirements, designs, code, risk information), identify testable features and define and prioritise <b>test conditions</b>, considering risk. They also look for defects in the basis itself and judge its testability. <b>Test design</b> asks “how to test?”: conditions are elaborated into test cases and other testware such as charters; <b>coverage items</b> are identified to guide the choice of inputs; test data and environment needs, tools and infrastructure are specified. <b>Test implementation</b> makes everything ready to run: test data is created, cases are grouped into procedures and suites, scripts are written, an execution schedule is prioritised and the environment is built and checked. <b>Test execution</b> runs the tests (manually or automated), compares actual with expected results, logs outcomes, analyses anomalies for likely causes and reports defects. <b>Test completion</b> typically happens at milestones such as a release or the end of an iteration: change requests or backlog items are raised for unresolved defects, useful testware is archived or handed over, the environment is shut down to an agreed state, lessons are analysed and a completion report goes to stakeholders.'
    ],
    blocks: [
      { t: '', h: 'Worked example', x: 'Story: “a user can reset a forgotten password”. Analysis yields conditions such as “link expires after use” and “unknown email is handled safely”. Design turns them into cases with data and picks coverage items. Implementation writes the scripts and sets up a mail simulator. Execution runs them and logs two failures. Completion at sprint end archives the suite, raises a backlog item for a deferred defect and records lessons in the report.' },
      { t: 'warn', h: 'Exam trap', x: 'Analysis and design are easily swapped: analysis = what, design = how. Also, building the test environment belongs to implementation, while defining its requirements belongs to design.' }
    ]
  },
  'context-testware': {
    paras: [
      'Testing never happens in a vacuum. It is paid for by stakeholders, built into development work and meant to serve business needs, so <i>how</i> you test depends on context. The syllabus lists eight factors: <b>stakeholders</b> (needs, expectations, willingness to cooperate), <b>team members</b> (skills, experience, availability, training needs), <b>business domain</b> (criticality, risks, market needs, legal regulations), <b>technical factors</b> (type of software, architecture, technology), <b>project constraints</b> (scope, time, budget, resources), <b>organisational factors</b> (structure, policies, existing practices), the <b>SDLC</b> (engineering practices, methods) and <b>tools</b> (availability, usability, compliance). They influence the test strategy, the techniques chosen, the degree of automation, the required coverage, the level of detail of testware and the reporting.',
      '<b>Testware</b> is everything the test activities produce as work products. Names and organisation differ between companies, and <i>configuration management</i> keeps these items consistent and intact. Sorting testware by the activity that creates it is a very useful memory aid: planning produces the test plan, schedule, <b>risk register</b> (a list of risks with likelihood, impact and mitigation information) and entry and exit criteria; monitoring and control produce progress reports, control directives and risk information; analysis produces prioritised test conditions (acceptance criteria are an example) and defect reports about the test basis; design produces test cases, charters, coverage items and data and environment requirements; implementation produces procedures, scripts, suites, data, the execution schedule and environment items such as stubs, drivers, simulators and service virtualisation; execution produces test logs and defect reports; completion produces the completion report, improvement actions, lessons learned and change requests.',
      '<b>Traceability</b> is the maintained link between test basis elements, the testware derived from them (conditions, risks, cases), the test results and the defects. Its value: you can show which requirements have test cases, estimate residual risk by relating results to risks, assess the impact of a change, support audits and IT governance, and make progress and completion reports understandable by expressing status in terms of basis elements. It also informs judgments about product quality, process capability and progress toward business goals.'
    ],
    blocks: [
      { t: '', h: 'Example', x: 'Requirement R7 (“lock account after 5 bad logins”) links to test condition C7, test cases TC21 and TC22, their last run results, and defect D104. If R7 changes, the links show instantly which tests to revisit; if D104 is still open, the report can show R7 as having an unresolved defect.' },
      { t: 'warn', h: 'Exam trap', x: 'Do not file test logs under test design or test cases under implementation. Test cases and charters come from design; procedures, scripts and suites from implementation; logs from execution.' }
    ]
  },
  'roles': {
    paras: [
      'The syllabus talks about two principal roles in testing. They are <i>roles</i>, not job titles or necessarily different people: what matters is which responsibilities are being carried out. The exact tasks assigned to each depend on the project and product context, the skills of the people involved and the organisation.',
      'The <b>test management role</b> owns the test process as a whole, together with the team and the leadership of the testing activities. Its main focus is <b>test planning, test monitoring, test control and test completion</b>. This is the person (or group) who decides the approach, tracks progress against the plan, reacts to deviations and closes things out with a report. How it is done changes with context: in Agile development the team itself may take over some management tasks, while work that spans several teams or the whole organisation may be done by test managers who sit outside the development team.',
      'The <b>testing role</b> owns the engineering, i.e. technical, side of testing. Its main focus is <b>test analysis, test design, test implementation and test execution</b>: working out what to test, designing the checks, building data, scripts and environments, running tests and reporting what happens.',
      'Roles can move around. The management role may be performed by a team leader, a dedicated test manager or even a development manager, and different people can take it on at different times. One person may also hold both roles simultaneously, which is common in small teams. This flexibility is a good reason to remember the roles by <i>activities</i> rather than by job title.'
    ],
    blocks: [
      { t: '', h: 'Example', x: 'On a 12-person Agile team, the testers design and run the tests (testing role), while the team jointly plans the sprint’s testing and monitors progress at the daily stand-up (test management tasks absorbed by the team). A test manager outside the team coordinates a release-wide regression plan across five such teams (management role at organisation level). In a tiny start-up, one engineer does all of it, holding both roles.' },
      { t: 'warn', h: 'Exam trap', x: 'Test completion belongs to the management role, while test implementation and execution belong to the testing role. Do not assume a role needs a separate person or a specific job title.' }
    ],
    table: { head: ['Activity', 'Test management role', 'Testing role'], rows: [
      ['Test planning', 'Yes', ''],
      ['Monitoring and control', 'Yes', ''],
      ['Test analysis', '', 'Yes'],
      ['Test design', '', 'Yes'],
      ['Test implementation', '', 'Yes'],
      ['Test execution', '', 'Yes'],
      ['Test completion', 'Yes', '']
    ] }
  },
  'skills-team': {
    paras: [
      'Good testers combine several kinds of skill. The syllabus highlights: <b>testing knowledge</b> (e.g. knowing test techniques raises effectiveness); <b>thoroughness, carefulness, curiosity, attention to detail and a methodical way of working</b> (to find defects, especially hard-to-spot ones); <b>communication, active listening and team play</b> (to deal with all stakeholders, convey information and report and discuss defects); <b>analytical thinking, critical thinking and creativity</b>; <b>technical knowledge</b> (improves efficiency, e.g. by using tools well); and <b>domain knowledge</b> (to understand and talk with end users and business representatives).',
      'Communication deserves special care. Testers often carry bad news, and people tend to blame the messenger. A report of a failure can feel like criticism of the product and its author, and <i>confirmation bias</i> (the tendency to resist information that contradicts what one already believes) makes it harder to accept. Some even see testing as destructive. The remedy is to share defect and failure information constructively.',
      'The <b>whole team approach</b>, taken from Extreme Programming, builds on teamwork: anyone with the needed knowledge and skills can do any task, everyone is responsible for quality, and members share a workspace (physical or virtual) to ease communication. Benefits: better team dynamics, communication and collaboration, and synergy from the different skill sets. Testers help business representatives write good acceptance tests and agree on test strategy and automation with developers, spreading testing knowledge. It does not suit every context, for example safety-critical systems that demand a high level of independence.',
      '<b>Independence of testing</b> is a scale. Tests designed by the author have no independence; by peers on the same team, some; by testers outside the team but inside the organisation, high; by people outside the organisation, very high. Independence helps because different backgrounds and biases reveal different defects, and an independent tester can challenge assumptions made by stakeholders. The costs: isolation, communication problems or an adversarial relationship, developers feeling less responsible for quality, and testers being seen as a bottleneck or blamed for late releases. Independence is not a substitute for familiarity, since developers find many defects in their own code efficiently. Most projects mix levels.'
    ],
    blocks: [
      { t: '', h: 'Example', x: 'A common mix: developers test their own components and integrations (low independence, high familiarity), a separate test team handles system and system integration testing (high independence), and business users perform acceptance testing (independent viewpoint of needs).' },
      { t: 'warn', h: 'Exam trap', x: 'Independent testing is not automatically better, and the whole team approach is not automatically right. Also tell apart the K-levels: skills (K2, give examples), whole team advantages (K1, recall), independence benefits and drawbacks (K2, distinguish).' }
    ],
    table: { head: ['Level of independence', 'Who tests'], rows: [
      ['None', 'The author of the work product'],
      ['Some', 'Peers from the author’s team'],
      ['High', 'Testers outside the team, inside the organisation'],
      ['Very high', 'Testers outside the organisation']
    ] }
  }
};

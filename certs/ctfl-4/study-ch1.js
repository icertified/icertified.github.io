(window.ICSTUDY = window.ICSTUDY || {});
(window.ICSTUDY['ctfl-4'] = window.ICSTUDY['ctfl-4'] || { chapters: {}, flash: [] });
/* CTFL v4.0 study notes – Chapter 1, condensed from ISTQB CTFL Syllabus v4.0.1 for exam preparation.
 * Always cross-check with the official syllabus: https://www.istqb.org */
window.ICSTUDY['ctfl-4'].chapters[1] = {
  summary: 'The foundations: what testing is (and is not), why it is necessary, the seven testing principles, the test process with its activities, testware, traceability and roles, and the skills and good practices of testers. Chapter 1 carries 8 of the 40 exam questions (2 × K1 and 6 × K2, 1 point each). The whole exam has 40 questions in 60 minutes; the pass mark is 26 of 40 points (65%).',
  sections: [
    { id: 'what-is-testing', title: 'What is testing? Test objectives (FL-1.1.1 · K1)', bullets: [
      '<b>Testing</b> is a set of activities to discover defects and evaluate the quality of software work products. The work product being tested is the <b>test object</b>.',
      'Testing is <i>more than running tests</i>: it also includes planning, analysis, design, monitoring, control and reporting. It is largely an intellectual activity, even though tools help.',
      'Testing covers both <b>verification</b> (does it meet the specified requirements?) and <b>validation</b> (does it meet the needs of users and other stakeholders in its operational environment?).',
      '<b>Dynamic testing</b> executes the software; <b>static testing</b> does not (reviews and static analysis).',
      'Typical test objectives: evaluate work products (requirements, user stories, designs, code) · cause failures and find defects · ensure required coverage · reduce the risk of inadequate quality · verify that requirements are fulfilled · verify compliance with contractual, legal and regulatory requirements · give stakeholders information for informed decisions · build confidence in quality · validate that the test object is complete and works as stakeholders expect.',
      'Objectives vary with context: the work product tested, test level, risks, the SDLC and business factors (e.g. time to market).'
    ], callout: { t: 'warn', h: 'Exam trap', x: 'Testing is not only test execution and not only verification. Validation is part of it too.' } },
    { id: 'testing-vs-debugging', title: 'Testing vs debugging (FL-1.1.2 · K2)', table: { head: ['', 'Testing', 'Debugging'], rows: [
      ['Purpose', 'Triggers failures (dynamic) or finds defects directly (static)', 'Finds the cause of a failure, analyses it and removes the defect'],
      ['Typical steps', 'Design, execute, compare results, report', 'Reproduce the failure → diagnose (find the defect) → fix the defect'],
      ['After a dynamic test', 'Confirmation testing checks the fix; regression testing checks for side effects', '—'],
      ['After static testing', 'A defect is found directly', 'Just remove it – no reproduction or diagnosis needed'] ]
    }, bullets: [
      'Testing and debugging are <b>separate activities</b>. Fixing defects is not a testing activity.',
      'Confirmation testing is preferably done by the person who performed the initial test.'
    ] },
    { id: 'why-testing', title: 'Why testing is necessary (FL-1.2.1 · K2) and testing vs QA (FL-1.2.2 · K1)', bullets: [
      'Testing is a cost-effective way to detect defects; removing them (by debugging) <b>indirectly</b> raises quality.',
      'It directly evaluates the quality of a test object at various SDLC phases, feeding decisions such as release.',
      'It gives users an <b>indirect representation</b> in the project, because involving enough real users is usually too costly or unavailable.',
      'It may be required to meet contractual or legal requirements or regulatory standards.',
      'Any stakeholder can use testing skills to move the project towards success – not only the test team.',
      'Other forms of quality control besides testing: formal methods (model checking, proof of correctness), simulation and prototyping.'
    ], callout: { t: 'good', h: 'Remember', x: 'Contributions: find defects cost-effectively · evaluate quality · represent users · satisfy contracts/laws/regulations. QA is process-oriented and preventive; testing is product-oriented and corrective.' }, table: { head: ['', 'Testing', 'Quality assurance (QA)'], rows: [
      ['Orientation', 'Product-oriented', 'Process-oriented'],
      ['Approach', 'Corrective (finds defects to be fixed)', 'Preventive (good process → good product)'],
      ['Relation', 'A major form of quality control', 'Covers development and test processes'],
      ['Responsibility', 'Supports reaching appropriate quality', 'Everyone on the project'],
      ['Use of test results', 'To fix defects', 'Feedback on how well the processes perform'] ]
    } },
    { id: 'error-defect-failure', title: 'Error, defect, failure and root cause (FL-1.2.3 · K2)', bullets: [
      'A human makes an <b>error</b> (mistake) → it produces a <b>defect</b> (fault, bug) in a work product → if the defect is executed, it may cause a <b>failure</b>.',
      'Reasons for errors: time pressure, complexity, tiredness, lack of training, and so on.',
      'Defects can be in code, but also in requirements, test scripts or build files. Undetected defects in earlier work products often lead to defects in later ones.',
      'Not every defect causes a failure: some always do when executed, some only in special circumstances, some never.',
      'Failures can also come from <b>environmental conditions</b> (e.g. radiation or electromagnetic fields affecting firmware), not only from defects.',
      'A <b>root cause</b> is the fundamental reason for a problem (e.g. a situation that leads to an error). It is found by <b>root cause analysis</b>; addressing it can prevent or reduce similar failures and defects.'
    ], callout: { t: 'good', h: 'Chain', x: 'Root cause → error → defect → failure. Example: unclear requirements (root cause) → misunderstanding by the developer (error) → wrong formula in code (defect) → wrong invoice total in production (failure).' } },
    { id: 'principles', title: 'The seven testing principles (FL-1.3.1 · K2)', table: { head: ['#', 'Principle', 'Key idea'], rows: [
      ['1', 'Testing shows the presence, not the absence, of defects', 'Reduces the probability of undiscovered defects but cannot prove correctness, even if none is found'],
      ['2', 'Exhaustive testing is impossible', 'Use test techniques, prioritisation and risk-based testing to focus effort'],
      ['3', 'Early testing saves time and money', 'Early-removed defects do not cause follow-on defects; start static and dynamic testing as early as possible'],
      ['4', 'Defects cluster together', 'A few components hold most defects/failures (Pareto principle); input to risk-based testing'],
      ['5', 'Tests wear out', 'Repeated identical tests find fewer new defects; vary tests and data (but repeated automated regression tests can still be useful)'],
      ['6', 'Testing is context dependent', 'No single approach fits all; testing differs in different contexts'],
      ['7', 'Absence-of-defects fallacy', 'Verifying all requirements and fixing all defects does not guarantee a system that meets user needs; validation is needed too'] ]
    }, callout: { t: 'warn', h: 'Exam trap', x: 'Do not confuse “tests wear out” (repeating tests loses effectiveness) with “defects cluster together” (defects concentrate in a few components). And “absence-of-defects fallacy” is about validation, not about proving zero defects.' } },
    { id: 'test-process', title: 'Test activities and tasks (FL-1.4.1 · K2)', table: { head: ['Activity', 'Purpose and main tasks'], rows: [
      ['Test planning', 'Define test objectives and choose an approach that meets them within the constraints'],
      ['Test monitoring and control', 'Monitoring: ongoing checking and comparing actual progress with the plan. Control: taking actions needed to meet the objectives'],
      ['Test analysis', '“What to test?” Analyse the test basis, identify testable features, define and prioritise test conditions (with risk in mind), evaluate test basis and test object for defects and testability'],
      ['Test design', '“How to test?” Elaborate test conditions into test cases and other testware, identify coverage items, define test data and environment requirements, tools and infrastructure'],
      ['Test implementation', 'Create or acquire the testware needed for execution: test data, procedures, scripts, suites, an execution schedule; build and verify the test environment'],
      ['Test execution', 'Run tests per the schedule (manual or automated), compare actual and expected results, log results, analyse anomalies and report defects'],
      ['Test completion', 'At milestones: create change requests or backlog items for unresolved defects, archive or hand over testware, shut down the environment, analyse lessons learned, issue a test completion report'] ]
    }, bullets: ['The activities look sequential but are often performed <b>iteratively or in parallel</b>, and are tailored to the system and project.'] },
    { id: 'context-testware', title: 'Context, testware and traceability (FL-1.4.2, 1.4.3, 1.4.4 · K2)', bullets: [
      '<b>FL-1.4.2 – Context.</b> The test process depends on: stakeholders · team members · business domain (criticality, risks, regulations) · technical factors · project constraints (scope, time, budget, resources) · organisational factors · SDLC · tools. These influence the test strategy, techniques, degree of automation, required coverage, level of detail of testware and reporting.',
      '<b>FL-1.4.3 – Testware</b> is the output of the test activities; configuration management keeps it consistent. Examples by activity:',
      '&nbsp;&nbsp;• Planning: test plan, test schedule, risk register, entry and exit criteria.',
      '&nbsp;&nbsp;• Monitoring and control: test progress reports, control directives, risk information.',
      '&nbsp;&nbsp;• Analysis: (prioritised) test conditions such as acceptance criteria; defect reports on the test basis.',
      '&nbsp;&nbsp;• Design: (prioritised) test cases, test charters, coverage items, test data and test environment requirements.',
      '&nbsp;&nbsp;• Implementation: test procedures, manual and automated test scripts, test suites, test data, execution schedule, test environment items (stubs, drivers, simulators, service virtualisation).',
      '&nbsp;&nbsp;• Execution: test logs, defect reports.',
      '&nbsp;&nbsp;• Completion: test completion report, improvement action items, lessons learned, change requests.',
      '<b>FL-1.4.4 – Traceability</b> links test basis elements ↔ testware (conditions, risks, test cases) ↔ test results ↔ defects. Value: evaluates coverage (e.g. requirements covered by test cases), shows residual risk (results traced to risks), supports impact analysis of changes, audits and IT governance, and makes progress and completion reports easier to understand; it informs product quality, process capability and progress against business goals.'
    ], callout: { t: 'good', h: 'Tip', x: 'Match testware to its activity: schedule/risk register → planning; test conditions → analysis; test cases and charters → design; procedures, scripts, suites, data → implementation; logs and defect reports → execution.' } },
    { id: 'roles', title: 'Roles in testing (FL-1.4.5 · K2)', table: { head: ['', 'Test management role', 'Testing role'], rows: [
      ['Responsibility', 'Overall responsibility for the test process, the test team and leadership of test activities', 'Overall responsibility for the engineering (technical) aspects of testing'],
      ['Main activities', 'Test planning, monitoring, control and completion', 'Test analysis, design, implementation and execution'] ]
    }, bullets: [
      'Roles depend on project and product context, skills and the organisation. In Agile, the team may handle some management tasks; cross-team or organisation-wide tasks may be done by test managers outside the team.',
      'One person can hold both roles, or different people can hold a role at different times (team leader, test manager, development manager, etc.).'
    ] },
    { id: 'skills-team', title: 'Skills, whole team approach and independence (FL-1.5.1, 1.5.2, 1.5.3)', bullets: [
      '<b>FL-1.5.1 (K2) Generic skills:</b> testing knowledge · thoroughness, carefulness, being methodical, curiosity, attention to detail · communication, active listening, team play · analytical and critical thinking, creativity · technical knowledge · domain knowledge.',
      'Testers often bring bad news, and confirmation bias makes it hard to accept contradicting information. Communicate defects constructively, because testing is sometimes wrongly seen as destructive.',
      '<b>FL-1.5.2 (K1) Whole team approach</b> (from Extreme Programming): any team member with the right skills can do any task; everyone is responsible for quality; the team shares a workspace (physical or virtual). Advantages: better team dynamics, communication and collaboration, and synergy from combining skill sets; testers work with business reps on acceptance tests and with developers on test strategy and automation, passing on testing knowledge. It may not suit every context, e.g. safety-critical systems needing high independence.',
      '<b>FL-1.5.3 (K2) Independence levels:</b> author (none) → peers in the same team (some) → testers outside the team but inside the organisation (high) → testers outside the organisation (very high).'
    ], table: { head: ['Independence of testing', 'Details'], rows: [
      ['Benefits', 'Different biases and perspectives, so different failures and defects are recognised; can challenge or disprove assumptions of stakeholders; more effective at finding defects'],
      ['Drawbacks', 'Isolation from the team, poor communication or adversarial relations; developers may lose their sense of responsibility for quality; testers may be seen as a bottleneck or blamed for release delays'] ]
    }, callout: { t: 'warn', h: 'Remember', x: 'Independence does not replace familiarity: developers can efficiently find many defects in their own code. Most projects benefit from several levels of independence.' } }
  ],
  terms: [
    ['Coverage', 'The degree to which specified coverage items have been exercised by a test suite, usually expressed as a percentage.'],
    ['Debugging', 'Finding, analysing and removing the causes of failures in software.'],
    ['Defect', 'An imperfection or deficiency in a work product that keeps it from meeting its requirements or specification (also fault, bug).'],
    ['Error', 'A human action that produces an incorrect result (a mistake).'],
    ['Failure', 'An event in which a component or system does not perform a required function within specified limits.'],
    ['Quality', 'The degree to which a work product satisfies stated and implied stakeholder needs.'],
    ['Quality assurance', 'Activities focused on providing confidence that quality requirements will be fulfilled; process-oriented and preventive.'],
    ['Root cause', 'A fundamental reason for a problem, e.g. a situation that leads to an error.'],
    ['Test analysis', 'The activity that identifies test conditions by analysing the test basis.'],
    ['Test basis', 'The body of knowledge used as the foundation for test analysis and design (e.g. requirements, designs, code).'],
    ['Test case', 'A set of preconditions, inputs, actions (where applicable), expected results and postconditions, developed from test conditions.'],
    ['Test completion', 'The activity that makes testware available for later use, leaves the test environment in a good state and reports test results to stakeholders.'],
    ['Test condition', 'A testable aspect of a component or system identified as a basis for testing.'],
    ['Test control', 'The activity that develops and applies corrective actions to get a test project on track when it deviates from the plan.'],
    ['Test data', 'Data needed for test execution (e.g. inputs and data in the database).'],
    ['Test design', 'The activity that derives and specifies test cases from test conditions.'],
    ['Test execution', 'The activity that runs a test on a component or system and produces actual results.'],
    ['Test implementation', 'The activity that prepares the testware needed for test execution, based on test analysis and design.'],
    ['Test monitoring', 'The activity that checks the status of testing activities, identifies variances from the plan and reports status.'],
    ['Test object', 'The work product to be tested (component or system).'],
    ['Test objective', 'The reason or purpose of testing.'],
    ['Test planning', 'The activity of defining the test objectives and the approach for meeting them within project constraints.'],
    ['Test procedure', 'A sequence of test cases in execution order, with any associated actions needed to set up and clean up.'],
    ['Test process', 'The set of interrelated activities of testing: planning, monitoring and control, analysis, design, implementation, execution and completion.'],
    ['Test result', 'The consequence or outcome of running a test, including logs, status and defects found.'],
    ['Testing', 'The process of activities performed to discover defects and evaluate the quality of a component, system or work product.'],
    ['Testware', 'Work products produced during the test process for planning, designing, executing, evaluating and reporting on testing.'],
    ['Traceability', 'The degree to which a relationship can be established between two or more work products.'],
    ['Validation', 'Confirmation that a work product satisfies stakeholder needs in its intended operational environment.'],
    ['Verification', 'Confirmation that a work product fulfils its specified requirements.']
  ],
  tips: [
    'Memorise the seven principles by their short names and one example each; the exam often describes a situation and asks which principle it illustrates.',
    'Learn the test activities in order with their key question: analysis = “what to test?”, design = “how to test?”.',
    'Be able to sort testware by the activity that produces it (e.g. test cases → design, test suites and scripts → implementation, test logs → execution).',
    'For error / defect / failure questions, find who or what made the mistake first: a human error, then a defect in a work product, then a failure when it is executed.'
  ],
  traps: [
    'Believing testing means only running tests, or only checking against the specification (validation matters too).',
    'Treating testing and debugging, or testing and QA, as the same thing. Debugging fixes causes; QA is process-oriented and preventive.',
    'Thinking that finding no defects proves the software is correct, or that fixing every defect guarantees a successful system (absence-of-defects fallacy).',
    'Assuming independent testing is always better, or that the whole team approach suits every context regardless of criticality.'
  ]
};

window.ICSTUDY['ctfl-4'].flash.push(
  { ch: 1, k: 'List', lo: 'FL-1.1.1', f: 'Typical test objectives (examples)', b: 'Evaluate work products · cause failures and find defects · ensure required coverage · reduce risk of inadequate quality · verify requirements · verify contractual/legal/regulatory compliance · inform stakeholders · build confidence · validate completeness and fitness for stakeholders.' },
  { ch: 1, k: 'K1', lo: 'FL-1.1.1', f: 'Verification vs validation', b: 'Verification: does the system meet the specified requirements? Validation: does it meet users’ and stakeholders’ needs in its operational environment?' },
  { ch: 1, k: 'K1', lo: 'FL-1.1.1', f: 'Testing', b: 'A set of activities to discover defects and evaluate the quality of software work products (the test objects).' },
  { ch: 1, k: 'K1', lo: 'FL-1.1.2', f: 'Debugging steps (after a dynamic-test failure)', b: 'Reproduce the failure → diagnose (find the defect) → fix the defect. Then confirmation and regression testing.' },
  { ch: 1, k: 'K1', lo: 'FL-1.1.2', f: 'Debugging after static testing', b: 'Only the removal of the defect – static testing finds defects directly, so no reproduction or diagnosis is needed.' },
  { ch: 1, k: 'List', lo: 'FL-1.2.1', f: 'How testing contributes to success', b: 'Cost-effective defect detection · direct evaluation of quality at various SDLC phases · indirect user representation · meeting contractual, legal and regulatory needs.' },
  { ch: 1, k: 'K1', lo: 'FL-1.2.2', f: 'Testing vs QA in one line each', b: 'Testing: product-oriented, corrective, a form of quality control. QA: process-oriented, preventive, everyone’s responsibility.' },
  { ch: 1, k: 'K1', lo: 'FL-1.2.2', f: 'Other forms of quality control besides testing', b: 'Formal methods (model checking, proof of correctness), simulation and prototyping.' },
  { ch: 1, k: 'K1', lo: 'FL-1.2.3', f: 'Error → defect → failure', b: 'A human makes an error (mistake), which produces a defect (fault, bug) in a work product, which may cause a failure when executed.' },
  { ch: 1, k: 'K1', lo: 'FL-1.2.3', f: 'Root cause', b: 'The fundamental reason for a problem (e.g. a situation that leads to an error); found by root cause analysis, to prevent or reduce similar problems.' },
  { ch: 1, k: 'K1', lo: 'FL-1.2.3', f: 'Can a failure occur without a defect?', b: 'Yes – environmental conditions such as radiation or electromagnetic fields can cause failures.' },
  { ch: 1, k: 'List', lo: 'FL-1.3.1', f: 'The seven testing principles', b: '1 Presence, not absence, of defects · 2 Exhaustive testing impossible · 3 Early testing saves time and money · 4 Defects cluster together · 5 Tests wear out · 6 Context dependent · 7 Absence-of-defects fallacy.' },
  { ch: 1, k: 'K1', lo: 'FL-1.3.1', f: 'Defects cluster together – which law/idea?', b: 'A few components contain most defects or cause most failures – an illustration of the Pareto principle; used as input for risk-based testing.' },
  { ch: 1, k: 'K1', lo: 'FL-1.3.1', f: 'Tests wear out – what to do?', b: 'Modify existing tests and data and write new tests. (Repeating tests can still help, e.g. automated regression testing.)' },
  { ch: 1, k: 'K1', lo: 'FL-1.3.1', f: 'Absence-of-defects fallacy', b: 'Expecting verification alone to ensure success is a fallacy: a system with all requirements verified and defects fixed may still fail users’ needs. Validation is also needed.' },
  { ch: 1, k: 'List', lo: 'FL-1.4.1', f: 'The seven test activities', b: 'Planning · monitoring and control · analysis · design · implementation · execution · completion. Often iterative or parallel.' },
  { ch: 1, k: 'K1', lo: 'FL-1.4.1', f: 'Test analysis vs test design', b: 'Analysis answers “what to test?” (test conditions from the test basis). Design answers “how to test?” (test cases, coverage items, data and environment requirements).' },
  { ch: 1, k: 'K1', lo: 'FL-1.4.1', f: 'Test monitoring vs test control', b: 'Monitoring: ongoing checking of progress against the plan. Control: taking the actions needed to meet the test objectives.' },
  { ch: 1, k: 'K1', lo: 'FL-1.4.1', f: 'Tasks of test completion', b: 'Create change requests/backlog items for unresolved defects · archive or hand over testware · shut down the environment · analyse lessons learned · issue the completion report.' },
  { ch: 1, k: 'List', lo: 'FL-1.4.2', f: 'Contextual factors that shape the test process', b: 'Stakeholders · team members · business domain · technical factors · project constraints · organisational factors · SDLC · tools.' },
  { ch: 1, k: 'List', lo: 'FL-1.4.3', f: 'Testware by activity (planning, monitoring/control, analysis)', b: 'Planning: test plan, schedule, risk register, entry/exit criteria. Monitoring/control: progress reports, control directives, risk info. Analysis: test conditions, defect reports on the test basis.' },
  { ch: 1, k: 'List', lo: 'FL-1.4.3', f: 'Testware by activity (design, implementation, execution, completion)', b: 'Design: test cases, charters, coverage items, data/environment requirements. Implementation: procedures, scripts, suites, data, schedule, environment items. Execution: test logs, defect reports. Completion: completion report, lessons learned, action items, change requests.' },
  { ch: 1, k: 'K1', lo: 'FL-1.4.3', f: 'Examples of test environment items', b: 'Stubs, drivers, simulators and service virtualisation (implementation testware).' },
  { ch: 1, k: 'List', lo: 'FL-1.4.4', f: 'Value of traceability', b: 'Coverage evaluation · residual risk assessment · impact analysis of changes · audits and IT governance · clearer progress and completion reports · information on quality, process capability and progress.' },
  { ch: 1, k: 'List', lo: 'FL-1.4.5', f: 'The two principal testing roles', b: 'Test management role: planning, monitoring, control, completion. Testing role: analysis, design, implementation, execution.' },
  { ch: 1, k: 'List', lo: 'FL-1.5.1', f: 'Generic skills for testers', b: 'Testing knowledge · thoroughness, curiosity, attention to detail · communication and team play · analytical/critical thinking and creativity · technical knowledge · domain knowledge.' },
  { ch: 1, k: 'K1', lo: 'FL-1.5.2', f: 'Whole team approach', b: 'Any team member with the right skills can do any task; everyone is responsible for quality; shared workspace; better communication, collaboration and synergy. Comes from Extreme Programming.' },
  { ch: 1, k: 'List', lo: 'FL-1.5.3', f: 'Levels of test independence', b: 'Author (none) → peers in the same team (some) → testers outside the team in the organisation (high) → testers outside the organisation (very high).' },
  { ch: 1, k: 'List', lo: 'FL-1.5.3', f: 'Benefits and drawbacks of independent testing', b: 'Benefits: different biases and perspectives, finds other defects, challenges assumptions. Drawbacks: isolation, communication problems, developers lose responsibility for quality, testers seen as a bottleneck.' }
);

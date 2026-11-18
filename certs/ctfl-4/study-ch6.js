(window.ICSTUDY = window.ICSTUDY || {});
(window.ICSTUDY['ctfl-4'] = window.ICSTUDY['ctfl-4'] || { chapters: {}, flash: [] });
/* CTFL v4.0 study notes – Chapter 6, written in our own words from Syllabus v4.0.1 for exam preparation.
 * Always cross-check with the official syllabus: https://www.istqb.org */
window.ICSTUDY['ctfl-4'].chapters[6] = {
  summary: 'The shortest chapter (20 minutes of the syllabus): which kinds of tools support which test activities, and the potential benefits and risks of test automation. Chapter 6 carries 2 exam questions (2 points): 1 × K1 (benefits and risks of test automation) and 1 × K2 (how tool types support testing). Easy points if you learn the two lists below.',
  sections: [
    { id: 'tool-types', title: 'Tool support for testing (FL-6.1.1 · K2)', bullets: [
      'Tools support and facilitate many test activities. The syllabus groups them by <b>the activity they support</b>; the list is a set of examples, not a closed list.',
      'The exam asks you to <i>explain how a type of tool supports testing</i>: read the scenario, find the activity, and pick the matching tool type.'
    ], table: { head: ['Tool type', 'How it supports testing', 'Typical scenario clue'], rows: [
      ['Test management tools', 'Increase test process efficiency by facilitating the management of the SDLC, requirements, tests, defects and configuration.', 'Linking requirements to tests, tracking results and defects, reporting'],
      ['Static testing tools', 'Support the tester in performing reviews and static analysis.', 'Checking code or documents without executing them'],
      ['Test design and test implementation tools', 'Facilitate generation of test cases, test data and test procedures.', 'Generating tests or data from a model'],
      ['Test execution and test coverage tools', 'Facilitate automated test execution and coverage measurement.', 'Running regression tests automatically; measuring statement or branch coverage'],
      ['Non-functional testing tools', 'Allow the tester to perform non-functional testing that is difficult or impossible to do manually.', 'Load with thousands of virtual users; performance testing'],
      ['DevOps tools', 'Support the DevOps delivery pipeline, workflow tracking, automated builds and CI/CD.', 'Build, deploy and test on every commit'],
      ['Collaboration tools', 'Facilitate communication.', 'Chat, shared boards for distributed teams'],
      ['Tools for scalability and deployment standardization', 'E.g. virtual machines and containerization tools.', 'Identical test environments on demand'],
      ['Any other tool that assists in testing', 'E.g. a spreadsheet is a test tool in the context of testing.', 'Everyday tools used for test data or tracking']
    ] }, callout: { t: 'good', h: 'Memory hook', x: 'Manage · Static · Design · Execute+Coverage · Non-functional · DevOps · Collaborate · Scale (VMs/containers) · Anything else. Match the verb in the scenario to the tool type.' } },
    { id: 'benefits', title: 'Benefits of test automation (FL-6.2.1 · K1)', bullets: [
      'Simply acquiring a tool does not guarantee success. Every new tool needs effort (introduction, maintenance, training) before it brings lasting benefits.',
      '<b>Time saved</b> by reducing repetitive manual work, e.g. executing regression tests, re-entering test data, comparing expected and actual results, checking coding standards.',
      '<b>Prevention of simple human errors</b> through more consistency and repeatability: tests derived consistently from requirements, test data created systematically, tests executed in the same order with the same frequency.',
      '<b>More objective assessment</b> (e.g. coverage) and measures that are too complicated for humans to determine.',
      '<b>Easier access to information about testing</b> for test management and reporting: statistics, graphs, aggregated data on progress, failure rates, execution duration.',
      '<b>Reduced execution times</b>, giving earlier defect detection, faster feedback and faster time to market.',
      '<b>More time for testers</b> to design new, deeper and more effective tests.'
    ] },
    { id: 'risks', title: 'Risks of test automation (FL-6.2.1 · K1)', bullets: [
      '<b>Unrealistic expectations</b> about the tool (functionality and ease of use).',
      '<b>Inaccurate estimations</b> of time, cost and effort to introduce the tool, maintain test scripts and change the existing manual test process.',
      '<b>Using a tool when manual testing is more appropriate.</b>',
      '<b>Relying on a tool too much</b>, e.g. ignoring the need for human critical thinking.',
      '<b>Dependency on the tool vendor</b>: it may go out of business, retire or sell the tool, or give poor support (queries, upgrades, defect fixes).',
      '<b>Open-source software</b> may be abandoned (no more updates), or its internal components may need frequent updates.',
      'The automation tool is <b>not compatible with the development platform</b>.',
      'Choosing an <b>unsuitable tool</b> that does not comply with regulatory requirements and/or safety standards.'
    ], callout: { t: 'warn', h: 'Exam trap', x: 'Questions mix benefit and risk statements. “Time saved, consistency, objective measures, reporting information, faster feedback, more time for deeper tests” are benefits; “unrealistic expectations, bad estimates, wrong use, over-reliance, vendor/open-source/compatibility/regulatory problems” are risks.' } }
  ],
  terms: [
    ['Test automation', 'Use of software (tools) to perform or support test activities, e.g. test management, test design, test execution and test result checking.'],
    ['Test management tool', 'Tool supporting the management of requirements, tests, defects and configuration and the test process.'],
    ['Static testing tool', 'Tool supporting reviews and static analysis.'],
    ['Test execution tool', 'Tool facilitating automated execution of tests.'],
    ['Coverage tool', 'Tool measuring the coverage achieved by tests.'],
    ['Non-functional testing tool', 'Tool enabling non-functional tests that are hard or impossible to perform manually (e.g. load generation).'],
    ['DevOps tool', 'Tool supporting the delivery pipeline, automated builds and CI/CD.'],
    ['Collaboration tool', 'Tool facilitating communication within the team.']
  ],
  tips: [
    'Learn the nine tool categories with one scenario clue each (manage, static, design, execute/coverage, non-functional, DevOps, collaborate, scale, anything else).',
    'For benefit/risk questions, sort each option into benefit or risk first; the syllabus lists are short enough to memorise fully.',
    'Remember the syllabus message: a tool needs effort and critical thinking, and it does not guarantee success by itself.'
  ],
  traps: [
    'Assigning execution and coverage tasks to test management tools (management tools organise tests, results and defects; they do not run tests).',
    'Treating over-reliance on the tool or “manual would be better” as benefits; they are risks.',
    'Believing only purpose-built tools count as test tools; a spreadsheet can be one.'
  ]
};

window.ICSTUDY['ctfl-4'].flash.push(
  { ch: 6, k: 'List', lo: 'FL-6.1.1', f: 'Tool types by test activity (syllabus examples)', b: 'Test management · static testing · test design and implementation · test execution and coverage · non-functional testing · DevOps · collaboration · scalability and deployment standardization (VMs, containers) · any other helpful tool (e.g. a spreadsheet).' },
  { ch: 6, k: 'List', lo: 'FL-6.1.1', f: 'What do test management tools support?', b: 'Management of the SDLC, requirements, tests, defects and configuration, which increases test process efficiency.' },
  { ch: 6, k: 'List', lo: 'FL-6.1.1', f: 'What do static testing tools support?', b: 'Reviews and static analysis.' },
  { ch: 6, k: 'List', lo: 'FL-6.1.1', f: 'What do test design and implementation tools support?', b: 'Generation of test cases, test data and test procedures.' },
  { ch: 6, k: 'List', lo: 'FL-6.1.1', f: 'What do test execution and coverage tools support?', b: 'Automated test execution and coverage measurement.' },
  { ch: 6, k: 'List', lo: 'FL-6.1.1', f: 'Why use non-functional testing tools?', b: 'They let testers perform non-functional testing that is difficult or impossible to do manually (e.g. load with many virtual users).' },
  { ch: 6, k: 'List', lo: 'FL-6.1.1', f: 'DevOps tools vs collaboration tools', b: 'DevOps tools: delivery pipeline, workflow tracking, automated builds, CI/CD. Collaboration tools: facilitate communication.' },
  { ch: 6, k: 'K1', lo: 'FL-6.2.1', f: 'Benefits of test automation (list)', b: 'Time saved on repetitive work · fewer simple human errors (consistency, repeatability) · more objective assessment · easier access to test information · shorter execution time (earlier defects, faster feedback) · more time for testers to design deeper tests.' },
  { ch: 6, k: 'K1', lo: 'FL-6.2.1', f: 'Risks of test automation (list)', b: 'Unrealistic expectations · inaccurate estimates · tool used where manual is better · over-reliance on the tool · vendor dependency · abandoned open-source · incompatibility with development platform · tool not meeting regulatory/safety requirements.' },
  { ch: 6, k: 'K1', lo: 'FL-6.2.1', f: 'Is buying a test tool enough for success?', b: 'No. Each tool needs effort (introduction, maintenance, training) to bring real and lasting benefits, and its risks must be analysed and mitigated.' },
  { ch: 6, k: 'K1', lo: 'FL-6.2.1', f: 'Vendor and open-source risks', b: 'Vendor may go out of business, retire or sell the tool, or give poor support. Open-source software may be abandoned or need frequent updates of internal components.' },
  { ch: 6, k: 'K1', lo: 'FL-6.2.1', f: 'How does automation help consistency?', b: 'Tests are derived consistently from requirements, test data is created systematically, and a tool runs tests in the same order with the same frequency, preventing simple human errors.' }
);

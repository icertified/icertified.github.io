/* CTFL v4.0 in-depth notes (own words) */
(window.ICDETAIL = window.ICDETAIL || {});
(window.ICDETAIL['ctfl-4'] = window.ICDETAIL['ctfl-4'] || {})[6] = {
  'tool-types': {
    paras: [
      'Testing involves many tasks that are repetitive, bulky or hard for people to do by hand, which is why tools exist for almost every activity. The syllabus does not give a closed catalogue. It gives examples grouped by <i>the activity that the tool supports</i>, and the exam objective is K2: you must be able to explain how a given type of tool helps testing, usually by reading a scenario and identifying which activity is involved.',
      '<b>Test management tools</b> raise the efficiency of the test process by helping manage the lifecycle, requirements, tests, defects and configuration. They hold the links between requirements, tests and defects and produce progress reports, but they do not execute tests. <b>Static testing tools</b> help testers carry out reviews and static analysis. <b>Test design and test implementation tools</b> generate test cases, test data and test procedures, for example from a model. <b>Test execution and test coverage tools</b> run tests automatically and measure how much of the test object (code, requirements and so on) the tests have covered.',
      '<b>Non-functional testing tools</b> make it possible to run non-functional tests that would be very hard or impossible by hand; generating load from thousands of virtual users is the textbook case. <b>DevOps tools</b> support the delivery pipeline, tracking of work flow, automated builds and continuous integration and delivery (CI/CD). <b>Collaboration tools</b> make communication easier, particularly across distributed teams. Tools for <b>scalability and deployment standardization</b>, such as virtual machines and containerization tools, give consistent, reproducible environments on demand. Finally, <b>any other tool that assists testing</b> counts, and the syllabus gives a spreadsheet as an example of an everyday tool that serves as a test tool when used for testing.',
      'A practical way to answer scenario questions is to underline the verb. “Track and report” points to management, “generate” to design tools, “run automatically” or “measure coverage” to execution and coverage, “simulate many users” to non-functional tools, and “build and deploy on every commit” to DevOps.'
    ],
    blocks: [
      { t: 'good', h: 'Example', x: 'A team stores requirements and test cases in one tool that shows which requirements have no test (management). A pipeline compiles each commit and starts the regression suite (DevOps plus execution). The suite reports 82 percent branch coverage (coverage). Before release a load tool simulates 5,000 shoppers (non-functional). Test environments are started as containers (scalability and deployment standardization), and test data is kept in a spreadsheet (any other tool).' },
      { t: 'warn', h: 'Exam trap', x: 'Do not attribute test execution or coverage measurement to a test management tool; those belong to execution and coverage tools. Also do not treat the list as exhaustive: tools that are not purpose-built, like a spreadsheet, can still be test tools.' }
    ],
    table: { head: ['Tool type', 'Supports'], rows: [
      ['Test management', 'Managing SDLC, requirements, tests, defects, configuration'],
      ['Static testing', 'Reviews and static analysis'],
      ['Test design / implementation', 'Generating test cases, data, procedures'],
      ['Execution and coverage', 'Automated execution; coverage measurement'],
      ['Non-functional', 'Tests hard or impossible by hand'],
      ['DevOps', 'Pipeline, workflow tracking, builds, CI/CD'],
      ['Collaboration', 'Communication'],
      ['Scalability / deployment standardization', 'VMs, containers'],
      ['Any other', 'For example a spreadsheet']
    ] }
  },
  'benefits': {
    paras: [
      'The syllabus opens this topic with a caution: buying or installing a tool does not by itself guarantee success. Introduction, maintenance and training all take effort before a tool pays off in a lasting way. Keep that in mind, because the benefits below are <i>potential</i> benefits that must be earned.',
      '<b>Time saved</b> comes from taking over repetitive manual work, such as re-running regression tests, re-entering the same test data, comparing expected and actual results, or checking code against coding standards. <b>Fewer simple human errors</b> follow from greater consistency and repeatability: tests are derived from requirements in the same way each time, test data is created systematically, and a tool executes tests in the same order and with the same frequency. A tired person may skip step seven; a script does not.',
      'Automation gives <b>more objective assessment</b>, for example of coverage, and can provide measures too complicated for humans to work out. It gives <b>easier access to information about testing</b> for management and reporting: statistics, graphs and aggregated data on progress, failure rates and execution duration are produced almost for free. <b>Reduced execution time</b> leads to earlier defect detection, faster feedback and faster time to market. And because machines take over routine checking, testers have <b>more time to design new, deeper and more effective tests</b>, which is where human skill is most valuable.',
      'Learn the six benefits as a set; the objective is K1 (recall), so exam options are usually taken straight from this list or from the risk list, and your job is to sort them.'
    ],
    list: [
      'Time saved on repetitive work',
      'Prevention of simple human errors (consistency, repeatability)',
      'More objective assessment and measures humans find too complex',
      'Easier access to test information for management and reporting',
      'Reduced execution time: earlier defects, faster feedback, faster time to market',
      'More time for testers to design new, deeper, more effective tests'
    ],
    blocks: [
      { t: 'good', h: 'Worked example', x: 'A regression suite of 600 checks took two testers three days by hand each release. Automated and run nightly, it finishes in two hours and reports the pass rate and failure trend on a dashboard. The team gains time (hours instead of days), consistency (identical steps every night), earlier feedback (defects found the next morning) and spare capacity for exploratory testing of new features. Note that it first needed weeks of effort to build and maintain the scripts, which is the cost the syllabus warns about.' },
      { t: 'warn', h: 'Exam trap', x: 'Statements such as “automation guarantees success” or “automation removes the need for human judgement” are not benefits; they are the false beliefs behind the risks. Also keep faster feedback and earlier defect detection on the benefit side.' }
    ]
  },
  'risks': {
    paras: [
      'Every benefit has a flip side, and the syllabus says plainly that the risks need analysis and mitigation. They fall into a few families.',
      'The first family is about <b>people and planning</b>. <i>Unrealistic expectations</i> mean believing a tool will do more, or be easier to use, than it will. <i>Inaccurate estimations</i> underestimate the time, cost and effort of introducing the tool, maintaining test scripts and changing the existing manual process. <i>Using a tool where manual testing is more appropriate</i> wastes effort, for instance automating a check that will be run only once. <i>Relying on the tool too much</i> means neglecting the human critical thinking that finds what scripts were never written to look for.',
      'The second family concerns <b>dependency</b>. A <i>vendor</i> may go out of business, retire the tool, sell it to another company, or give poor support such as slow answers, upgrades and defect fixes. <i>Open-source</i> software may be abandoned so that no further updates appear, or its internal components may need quite frequent updates as it develops further.',
      'The third family covers <b>fit</b>. The automation tool may not be compatible with the development platform. And an unsuitable tool may fail to comply with regulatory requirements or safety standards, which matters in domains such as medical or automotive software.',
      'Mitigation follows naturally from the list: set realistic goals, run a pilot, estimate maintenance honestly, choose tools against the real platform and regulatory context, and keep skilled humans in the loop. The learning objective itself is K1, so recall of the eight risks, and the ability to tell them from benefits, is what counts.'
    ],
    list: [
      'Unrealistic expectations',
      'Inaccurate estimations',
      'Tool used where manual testing is more appropriate',
      'Over-reliance on the tool',
      'Vendor dependency',
      'Open-source software abandoned or needing frequent updates',
      'Tool incompatible with the development platform',
      'Unsuitable tool that does not meet regulatory or safety requirements'
    ],
    blocks: [
      { t: 'good', h: 'Example', x: 'A company buys a UI automation tool after a demo and plans to automate 100 percent of its tests in a month. Scripts break with every redesign, maintenance eats the team’s time and the vendor is acquired and drops support. These map to unrealistic expectations, inaccurate estimations and vendor dependency. A pilot on one module and honest effort estimates would have exposed them early.' },
      { t: 'warn', h: 'Exam trap', x: 'Questions often mix the two lists. “Time saved” and “more objective assessment” are benefits; “over-reliance” and “manual testing would have been better” are risks, even though they sound like opinions. Sort first, then answer.' }
    ]
  }
};

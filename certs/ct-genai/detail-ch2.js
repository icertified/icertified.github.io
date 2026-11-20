/* CT-GenAI in-depth notes (own words) */
(window.ICDETAIL = window.ICDETAIL || {});
(window.ICDETAIL['ct-genai'] = window.ICDETAIL['ct-genai'] || {})[2] = {
  'structure': {
    paras: [
      '<b>Prompt engineering</b> is the craft of writing prompts so an LLM produces useful output. The syllabus gives a reusable skeleton of <b>six components</b>. You do not always need all six, but knowing each one’s job lets you diagnose a weak prompt quickly. The skeleton is then combined with a technique (next section) that suits the task and the model.',
      '<b>Role</b> tells the model which perspective to take (tester, test manager, automation engineer), which shapes its tone and approach. <b>Context</b> is background the model needs to work out the test conditions: the test object, the feature in scope, relevant circumstances. <b>Instruction</b> is the task itself, ideally clear, imperative and concise, including any requirements for doing it.',
      '<b>Input data</b> is the material the task operates on: user stories, acceptance criteria, screenshots, code, existing test cases, or sample outputs. Detailed and well-structured input leads to more accurate, context-aware results. <b>Constraints</b> are restrictions and special considerations that shape how the instruction is applied to the input. <b>Output format</b> states the structure or properties you expect in the answer, for example a table with named columns.',
      'A helpful way to separate the two easily confused parts: context describes the <i>situation</i>, input data is the <i>thing to be processed</i>.'
    ],
    table: {
      head: ['Component', 'Question it answers', 'Tester example'],
      rows: [
        ['Role', 'Who should the model act as?', 'Senior test analyst'],
        ['Context', 'What is the background?', 'Web shop, guest checkout, EU customers'],
        ['Instruction', 'What must be done?', 'Derive test conditions from each criterion'],
        ['Input data', 'What material is used?', 'The user story and its acceptance criteria'],
        ['Constraints', 'What limits apply?', 'Ignore cosmetic aspects; at most 12 conditions'],
        ['Output format', 'How should the answer look?', 'Table: ID, condition, linked criterion, priority']
      ]
    },
    blocks: [
      { t: 'good', h: 'Worked example', x: 'Weak prompt: “Write tests for login.” Improved: “You are a test analyst (role). The app is a banking portal with two-factor login (context). Create test conditions (instruction) for the user story below (input data). Cover only functional behaviour and do not invent requirements (constraints). Return a table with ID, condition and priority (output format).” Each addition removes a guess the model would otherwise make.' },
      { t: 'warn', h: 'Exam trap', x: 'Constraints and output format are different things: constraints restrict <i>how the instruction is applied</i>, output format describes the <i>shape of the answer</i>. Examples of expected output given inside the input data are not the same as the technique called few-shot prompting, which is a separate topic.' }
    ]
  },

  'techniques': {
    paras: [
      'Besides the six-part structure, the syllabus names three core prompting techniques for test tasks. Each solves a different problem.',
      '<b>Prompt chaining</b> splits a task into a sequence of smaller prompts. After every step the output is checked, by a person or automatically, and corrected before it feeds the next prompt. Because each answer informs the next prompt, accuracy rises, which is valuable when a task is complicated and needs breaking down with systematic checks of intermediate outputs. It also supports dynamic, back-and-forth work.',
      '<b>Few-shot prompting</b> puts examples inside the prompt. With <i>zero-shot</i> there is no example and the model relies on what it already knows; <i>one-shot</i> gives a single example; <i>few-shot</i> gives more than one. Examples serve as a clear reference, so the output follows the expected pattern consistently. It works best when examples can show the behaviour you want.',
      '<b>Meta prompting</b> asks the LLM itself to write or improve prompts. The tester evaluates the draft prompt and the two iterate. This cuts the manual effort of prompt design and helps when you do not know how to phrase a request; the syllabus describes it as a kind of pairing between tester and AI.',
      'The techniques combine well, and none of them replaces high-quality input: weak input data produces weak results whichever technique you use.'
    ],
    blocks: [
      { t: '', h: 'Example', x: '<b>Chaining:</b> step 1 list ambiguities in a user story; you correct the list; step 2 rate testability using the corrected list; step 3 check completeness. <b>Few-shot:</b> paste two sample Gherkin scenarios and ask for a third in the same style for a new story. <b>Meta:</b> “I need a prompt that makes an LLM spot duplicate defects in a test report. Draft it and ask me what you need to know.”' },
      { t: 'warn', h: 'Exam trap', x: 'Count the examples: none = zero-shot, exactly one = one-shot, more than one = few-shot. Definitions are often swapped in answer options: examples belong to few-shot, steps with checking belong to chaining, AI-written prompts belong to meta prompting.' }
    ]
  },

  'system-user': {
    paras: [
      'Chatbots and LLM applications usually receive two layers of instruction. The <b>system prompt</b> is normally written by the developer or tester and sets the overall behaviour of the LLM: its personality and its <i>operational parameters</i> (how it responds, such as formal tone, concise answers, respect for domain rules, avoiding certain behaviour). In most interfaces the chatbot’s end user cannot see or edit it. It acts as the rulebook for the whole conversation and may contain parts of the structured prompt, typically role, context and constraints.',
      'The system prompt <b>stays constant</b> for the session. The <b>user prompt</b> is the actual request or question from the person chatting. It <b>changes with every turn</b>, is visible, and forms the immediate context for the next answer. The model reads both together: the unchanging rules plus the current request.',
      'Good practice follows from the roles. A system prompt should be clear and specific about the role and constraints, and may add general context and output expectations. A user prompt should be focused and well structured, with explicit instructions, any extra context and the format wanted.',
      'The usual flow is to set the system prompt once at the start, then send a series of user prompts.'
    ],
    blocks: [
      { t: 'good', h: 'Example', x: 'You build a team assistant for reviewing test scripts. System prompt: “You are a test automation reviewer. Use formal language, keep answers short, flag any hard-coded waits, never invent framework features.” Each colleague then sends a different user prompt: a pasted script and “Review this”, followed later by “Suggest a clearer name for step 4”. The rules stay put; only the requests change.' },
      { t: 'warn', h: 'Exam trap', x: 'Do not mix them up: the system prompt is constant and usually hidden from the end user; the user prompt varies per interaction and is visible. Neither is “more important” in a way that lets one be ignored, because the model considers both.' }
    ]
  },

  'analysis': {
    paras: [
      'Test analysis is the activity of working out <i>what</i> to test. GenAI can help because the input, such as requirements, user stories, technical specifications and GUI wireframes, is largely language or imagery. The outputs are the usual analysis work products, for instance prioritised test conditions (acceptance criteria are one example). At K3 you must be able to <b>apply</b> this, not just describe it.',
      'The syllabus lists five supported tasks. <b>Spotting potential defects in the test basis</b>: the LLM flags inconsistencies, ambiguities or gaps, drawing on patterns in similar requirements or earlier defect reports. <b>Generating test conditions</b>: it turns requirement text into measurable, testable statements. <b>Prioritising by risk</b>: given likelihood and impact of failure, it can recommend priorities, for example giving weight to regulatory points or payment features. <b>Coverage analysis</b>: by mapping requirements to conditions it shows what is not yet covered. <b>Suggesting test techniques</b>: such as boundary value analysis or equivalence partitioning, according to the kind of requirement.',
      'Quality in, quality out: how relevant and complete your inputs are directly shapes accuracy and precision. The hands-on objectives illustrate two good habits: a structured multimodal prompt (story plus wireframe) and a chain that first finds ambiguities, then evaluates testability, then completeness, with a person verifying and correcting after every step so the next step starts from a clean result.'
    ],
    blocks: [
      { t: '', h: 'Worked example', x: 'Story: “As a member I can reset my password.” Step 1 (chain): ask the LLM to list ambiguities, for instance link lifetime, password rules, behaviour for unknown emails. You confirm and correct them. Step 2: using that corrected list, derive test conditions. Step 3: ask for a table mapping conditions to criteria to reveal gaps, and for suitable techniques (boundary values for the link expiry time). You review the final table before using it.' },
      { t: 'warn', h: 'Exam trap', x: 'Risk-based prioritisation needs information about <b>likelihood and impact</b>; the model cannot know your business risk unless you supply it. Also remember that generated conditions are drafts: human verification stays in the loop.' }
    ]
  },

  'design': {
    paras: [
      'After analysis come test design (refining conditions into test cases and other testware) and test implementation (creating or obtaining the testware needed to run the tests). GenAI can assist across this broad block for both manual tests and automated scripts, including their prioritisation and placement in an execution schedule.',
      '<b>Test case generation</b>: from functional and non-functional requirements an LLM can draft cases with preconditions, inputs, expected results and coverage criteria, from simple verification to end-to-end flows. <b>Test data synthesis</b>: it can produce representative synthetic data that resembles production data without exposing sensitive information, including extreme situations, usable for functional and non-functional testing. <b>Automated test script generation</b>: it can produce manual procedures and scripts from structured test cases, translating steps into code for different automation frameworks and updating them when requirements change. <b>Scheduling and prioritisation</b>: it can look at cases and their interdependencies and propose an order based on priority, risk, available resources and objectives.',
      'The hands-on objectives show which technique fits which job: prompt chaining plus structured prompts plus meta prompting to produce test cases, check that every acceptance criterion is covered (via a coverage table) and then build end-to-end procedures; few-shot prompting to produce Gherkin (Given-When-Then) scenarios; and prompt chaining to prioritise a suite while considering risks and dependencies. In the prioritisation exercise the model’s reasoning must be checked by hand, because multi-criteria reasoning is where errors creep in.'
    ],
    blocks: [
      { t: '', h: 'Worked example', x: 'You supply three examples, each a user story with its test conditions and Gherkin scenarios, then a new story. The model returns scenarios in the same Given-When-Then style. You notice it invented a payment method that is not in the story, so you tighten the constraints, fix the examples, and rerun. This is few-shot prompting plus human verification.' },
      { t: 'warn', h: 'Exam trap', x: 'Synthetic test data is valued because it can avoid exposing real personal data, but it still needs to be checked for realism and coverage of extremes. Do not assume generated cases are complete: ask for a coverage check and review it.' }
    ]
  },

  'regression': {
    paras: [
      'Regression tests accumulate with every iteration or release, and run often, so they are prime candidates for automation, especially in CI/CD pipelines. GenAI can help create, maintain and optimise such suites, and by analysing code changes it can point at the areas most likely to be affected, so effort goes where it is most needed.',
      'The supported activities are: <b>keyword-driven script implementation</b> (mapping predefined keywords for common steps to test cases and generating scripts); <b>impact analysis and test optimisation</b> (analysing code changes to find high-risk areas for targeted regression); <b>self-healing and adaptive tests</b> (automatically adjusting scripts to minor UI or API changes so small modifications do not cause pointless failures); <b>automated reporting and insights</b> (reports with metrics, failures, trends and predictive hints for stakeholders); and <b>enhanced defect reporting and root cause analysis</b> (compiling logs, screenshots and environment data).',
      'Two kinds of automated regression are highlighted. <b>GUI tests</b> get unstable because the interface keeps changing, so GenAI can adapt to things like dynamic locators and changed interactions. <b>API tests</b> face changing request and response formats, endpoints and authentication, so GenAI can adapt scripts to the evolving specification and generate varied test data.',
      'The caveat is stated explicitly: GenAI can make mistakes, so output must be checked in proportion to risk. The report-analysis exercise uses one conversation with a chain of structured prompts: analyse results against the specification, cluster similar defects, maintain a list of known anomalies, then cross-check the findings.'
    ],
    blocks: [
      { t: '', h: 'Example', x: 'A release renames a button id from “btn-pay” to “pay-now”. Ten GUI scripts fail on the locator, not on a real defect. A self-healing approach lets the AI propose the updated locator so the suite stays stable, and the tester confirms the change did not hide a genuine problem.' },
      { t: 'warn', h: 'Exam trap', x: 'Self-healing deals with <i>minor</i> UI or API changes; it is not a licence to accept every passing run as correct. Keep a risk-based check on what the AI adapted or summarised.' }
    ]
  },

  'monitoring': {
    paras: [
      'Test monitoring means gathering information about progress and quality, and test control means taking action when reality departs from the plan. Monitoring often needs large amounts of data, some of it unstructured, much of which already sits in test management tools. That is exactly the sort of material GenAI can analyse and condense.',
      'The syllabus lists four supports. <b>Monitoring and metrics analysis</b>: automating monitoring, analysing trends to predict risks, and alerting the team to deviations from plan. <b>Test control</b>: providing insight for re-prioritising tests, adjusting schedules and reallocating resources, so that testing stays flexible and focused on high-priority areas. <b>Completion insights and continuous learning</b>: drafting test completion reports that highlight successes and lessons learned, which feeds improvement of future test processes. <b>Enhanced visualisation and reporting</b>: building dynamic dashboards and plain-language summaries so every stakeholder can see the relevant metrics and make quick decisions.',
      'In the observation exercise, test data extracted from tools is turned by an LLM into metrics such as progress, defect trends or coverage, highlighting risks, shown on a dashboard and summarised in natural language.',
      'As always, the figures the LLM reports should be traceable to the underlying data, and the tester remains accountable for decisions taken on them.'
    ],
    blocks: [
      { t: '', h: 'Example', x: 'Prompt: “Using the attached progress export, summarise test execution status for a non-technical sponsor in five sentences. State what is behind plan, why it matters, and what you suggest we do next.” The answer becomes a draft for the weekly report. If it says 80 percent of tests passed, you check that number against the tool before sending.' },
      { t: 'warn', h: 'Exam trap', x: 'Monitoring (observing and reporting) is not control (acting to change course). Options that blur the two, or that treat AI predictions as facts rather than inputs to human decisions, are suspect.' }
    ]
  },

  'choose': {
    paras: [
      'The last K3 objective of section 2.2 asks you to <b>select and apply</b> a prompting technique that fits a given context and task. The syllabus offers a simple matching based on the characteristics of the work.',
      '<b>Prompt chaining</b> fits complex tasks that need precision with human verification at each step. It breaks work into smaller steps and suits test analysis, test design and test automation, where every step is checked for correctness. <b>Few-shot prompting</b> fits repetitive tasks or those with a specific, constrained output format: examples show the pattern for Gherkin test cases, keyword-driven tests or reports in a fixed layout. <b>Meta prompting</b> fits flexible, dynamic tasks and situations where you need help crafting a prompt for a new task: you describe the objective in general terms and the LLM helps build the prompt, useful for complex jobs such as test report analysis and anomaly detection.',
      'You can also stack techniques inside a single use case. For example, use meta prompting to obtain a first prompt; it may contain examples that you adapt and improve (few-shot); finally, split the work into subtasks so intermediate results can be validated (chaining).',
      'When faced with a scenario, read the task description for the deciding words: precision or verification at each step, repeated pattern or fixed format, or uncertainty about how to ask.'
    ],
    table: {
      head: ['Signal in the task', 'Technique'],
      rows: [
        ['Needs precision, step-by-step checking', 'Prompt chaining'],
        ['Same pattern repeated, strict output format', 'Few-shot prompting'],
        ['New or flexible task, unsure how to prompt', 'Meta prompting']
      ]
    },
    blocks: [
      { t: '', h: 'Example', x: 'Task: produce keyword-driven scripts in your company’s exact style for 40 cases. Signal: repeated pattern plus constrained format, so few-shot. Task: analyse a user story for ambiguity, then testability, then completeness. Signal: verified steps, so chaining. Task: you have never prompted an LLM for anomaly detection in logs. Signal: unsure how to ask, so meta prompting first.' },
      { t: 'warn', h: 'Exam trap', x: 'Combining is allowed, but the question usually wants the <i>best fit</i> for the main characteristic described. Do not pick few-shot just because examples sound helpful; check whether the task really calls for a fixed pattern.' }
    ]
  },

  'metrics': {
    paras: [
      'You cannot improve or trust GenAI output without measuring it. Section 2.3.1 lists seven general metrics, and says task-specific ones can be added. Evaluation can be a manual review or automated, for example by comparing the output with a predefined reference.',
      '<b>Accuracy</b> is overall correctness against a standard such as expert-written tests or requirements. <b>Precision</b> is correctness with respect to a specific objective (the syllabus example: generated tests correctly identify anomalies). <b>Recall</b> is the ability to find <i>all</i> the relevant instances (example: covering both valid and invalid equivalence partitions). <b>Relevance and contextual fit</b> asks whether the output suits the context and test basis and respects domain rules. <b>Diversity</b> is breadth of inputs and scenarios without repetition, including edge cases. <b>Execution success rate</b> is the proportion of generated artefacts that run as-is in the test environment. <b>Time efficiency</b> compares time saved with manual effort.',
      'Because LLMs are non-deterministic, one good (or bad) run proves little. Metrics need to rest on <b>statistically relevant data</b>, meaning enough runs or samples.'
    ],
    table: {
      head: ['Metric', 'Ask yourself'],
      rows: [
        ['Accuracy', 'Is it correct overall against a trusted standard?'],
        ['Precision', 'Is what it produced right for the specific goal?'],
        ['Recall', 'Did it find everything that matters?'],
        ['Relevance and contextual fit', 'Does it suit our domain and test basis?'],
        ['Diversity', 'Is there variety, or the same case repeated?'],
        ['Execution success rate', 'How many scripts run without fixing?'],
        ['Time efficiency', 'Did it really save time versus doing it by hand?']
      ]
    },
    blocks: [
      { t: '', h: 'Worked example', x: 'You ask for boundary tests for an age field (18 to 65). The model returns ten scripts; seven run unchanged, so execution success rate is 70 percent. Three of them repeat the same input: low diversity. None tests an invalid age: weak recall for invalid partitions. Since results vary, you repeat the prompt several times before concluding anything about the prompt’s quality.' },
      { t: 'warn', h: 'Exam trap', x: 'Do not confuse precision with recall: precision is about correctness for an objective, recall is about completeness of relevant findings. Also, judging a prompt on a single output ignores non-determinism.' }
    ]
  },

  'refine': {
    paras: [
      'Metrics tell you how good a result is; refinement techniques tell you how to make the prompt better. The syllabus gives five.',
      '<b>Iterative prompt modification</b> starts with a base prompt and changes it in light of actual results, adding context or adjusting wording (for example terminology) to make it more specific and relevant. <b>A/B testing of prompts</b> creates several versions and compares them against predefined metrics, to learn which phrasing or structure works best. <b>Output analysis</b> examines errors and inconsistencies, for example against the test basis, to understand why the prompt led the model astray so the same problem is avoided next time. <b>Integrating user feedback</b> gathers testers’ views on usefulness and clarity, such as whether the level of detail in generated tests is right, and turns them into prompt changes. <b>Adjusting prompt length and specificity</b> means experimenting: sometimes more context improves the answer, sometimes a shorter prompt generalises better.',
      'Teams can run prompt evaluation and optimisation sessions and share what they learn, for instance through shared prompt libraries. This standardises technique, keeps quality consistent, avoids repeating mistakes and builds a learning culture.'
    ],
    blocks: [
      { t: 'good', h: 'Worked example', x: 'Prompt A (“Generate test cases for the transfer feature”) and prompt B (same, plus role, constraints and output table) are each run five times. You score both on relevance and execution success rate. B wins, but testers say the cases are too detailed, so you ask for one-line steps and re-measure. Finally the winning prompt goes into the team’s prompt library.' },
      { t: 'warn', h: 'Exam trap', x: 'Longer is not automatically better. The syllabus explicitly notes that shorter prompts can sometimes generalise better, so the answer is to experiment and measure. A/B testing compares prompt versions using predefined metrics, not personal preference alone.' }
    ]
  }
};

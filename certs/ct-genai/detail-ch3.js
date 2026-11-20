/* CT-GenAI in-depth notes (own words) */
(window.ICDETAIL = window.ICDETAIL || {});
(window.ICDETAIL['ct-genai'] = window.ICDETAIL['ct-genai'] || {})[3] = {
  'defects': {
    paras: [
      'An LLM does not look facts up and it does not reason the way a person does. It predicts the next token from patterns it absorbed in training. Three typical quality problems follow from that, and the syllabus wants you to be able to name and tell them apart: <b>hallucinations</b>, <b>reasoning errors</b> and <b>biases</b>. All three come from the nature of the training data and the built-in limits of the transformer architecture, so they are properties of the technology, not rare bugs that a vendor will soon patch.',
      'A <b>hallucination</b> is content that looks plausible but is factually wrong or unrelated to the task. For testers it shows up as invented test cases, scripts that call functions or locators that do not exist, or tests that check an acceptance criterion nobody ever wrote. The danger is the confident tone: the output reads like a normal deliverable, so it can mislead and damage the validity of the test results.',
      'A <b>reasoning error</b> is a failure to follow logical structure: cause and effect, conditions (if/else, AND/OR), or multi-step problem solving. Because the model imitates patterns rather than applying real logic, it can get arithmetic, dependencies or ordering wrong. Test planning and test case prioritisation are classic examples because they need exact logical work.',
      'A <b>bias</b> is a systematic lean in the output toward certain information, approaches or assumptions, inherited from what the model was trained on. If the data is mostly English, other languages and cultures are under-represented. In testing this can distort generated test data or the way acceptance criteria are refined.',
      'Finally, because LLM output is non-deterministic (1.1.2), a defect that seems fixed after you adjust a prompt can show up again in another conversation. So "I tried it once and it was fine" is never proof.'
    ],
    list: [
      '<b>Hallucination</b> = wrong or irrelevant content presented as if it were true.',
      '<b>Reasoning error</b> = broken logic, ordering, conditionals or maths.',
      '<b>Bias</b> = skew that comes from the training data.'
    ],
    blocks: [
      { t: '', h: 'Example', x: 'You paste a login user story with three acceptance criteria and ask for test cases. The answer contains a test for "login with a social account", which is in none of the criteria (hallucination). Another case asks you to run the lockout test <i>before</i> the account exists (reasoning error). All generated usernames are typical Western names, so Unicode and long-name handling is never exercised (bias).' },
      { t: 'warn', h: 'Exam trap', x: 'Do not describe these as bugs caused by a bad prompt only. Poor prompts raise the likelihood, but the root causes named in the syllabus are the training data and the transformer’s limitations. Also note that K1 here means you must recall the three definitions and their testing examples.' }
    ]
  },

  'identify': {
    paras: [
      'Spotting a defect in LLM output is a skill you can apply to a concrete situation (K3). The method depends on the kind of problem, which is why the syllabus pairs each problem with its own detection approaches. All of them are carried out by <b>review</b> or by a <b>mix of review and automated verification</b>; the more risk a task carries, the more rigorous the checking should be.',
      'For <b>hallucinations</b> you compare the output with a trusted reference. <i>Cross-verification</i> means checking it against requirements, existing documentation and known system behaviour (tools can help flag mismatches). <i>Domain expert consultation</i> brings in a subject matter expert who notices subtle inaccuracies that tools miss. <i>Consistency checks</i> verify that different parts of the output do not contradict each other or what is already known.',
      'For <b>reasoning errors</b> you test the logic. <i>Logical validation</i> is a review of the flow and coherence of the argument or steps. <i>Output testing</i> goes further and actually executes the generated test cases or scripts against the test object; a script that fails for the wrong reasons reveals flawed logic. Depending on the testware this can be partly or fully automated.',
      'For <b>bias</b> you ask whether the generated testware (test code, synthetic test data) honestly reflects the defined test strategy and coverage needs, and whether certain test types are under-represented, for example hardly any non-functional tests.',
      'A practical K3 routine: first extract what the source material really says, then walk through the output element by element. Anything not traceable to the source is a hallucination suspect; anything traceable but logically wrong (wrong numbers, wrong order, wrong condition) is a reasoning error; a pattern of lopsided coverage or data points to bias.'
    ],
    blocks: [
      { t: 'good', h: 'Worked example', x: 'Brief: a shop gives 10% off orders over 100 EUR, free shipping over 50 EUR. The LLM lists a test "order of 40 EUR gets free shipping" (contradicts the brief: hallucinated or wrong rule, found by cross-verification) and computes the discounted price of a 120 EUR order as 118 EUR (arithmetic reasoning error, found by running it or recalculating). All 20 generated customer records are from one country (bias, found by reviewing the data against the coverage need).' },
      { t: 'warn', h: 'Exam trap', x: 'Match the method to the problem. "Output testing" is the answer for reasoning errors, not for bias; "cross-verification" targets hallucinations. Reviewing under-represented test types is a bias check.' }
    ],
    table: { head: ['Problem', 'Typical detection'], rows: [
      ['Hallucination', 'Cross-verification, expert consultation, consistency checks'],
      ['Reasoning error', 'Logical validation, output testing (execute the artefacts)'],
      ['Bias', 'Compare testware to strategy and coverage; look for missing test types']
    ] }
  },

  'mitigate': {
    paras: [
      'Detection is half the story; the other half is lowering the chance that defects appear at all. They occur more often when prompts are poorly built or the model lacks the context it needs. The syllabus lists five measures, and each one attacks a specific cause.',
      '<b>Provide complete context.</b> A model that is missing information fills the gap with plausible guesses. Using all six prompt components (role, context, instruction, input data, constraints, output format; see 2.1.1) closes those gaps.',
      '<b>Divide prompts into manageable segments.</b> Prompt chaining splits a complex task into steps and you check each result before continuing. Reasoning errors are then caught early rather than being buried in a long final answer. This is the same technique as in 2.1.2, now used as a risk control.',
      '<b>Use clear, interpretable data formats.</b> Ambiguous or messy inputs (screenshots of tables, mixed formats, unclear structure) are harder for the model to read correctly. Plain, well-structured input lets it concentrate on the task.',
      '<b>Select an appropriate model.</b> Choose one that has been trained for the task you want, as discussed in 5.1.3 (for instance a code-capable or reasoning-capable model when the job demands it).',
      '<b>Compare results across models.</b> Where sensible, send the same prompt to several LLMs and compare. Disagreement is a signal to look closer, and agreement raises confidence.',
      'The syllabus also points ahead to Chapter 4: <b>RAG</b> and <b>fine-tuning</b> are complementary ways to improve results, because they give the model better knowledge than its general training.',
      'None of these measures guarantees correctness. They reduce risk; human review and verification (3.1.2) stay necessary.'
    ],
    blocks: [
      { t: 'good', h: 'Example', x: 'A tester asks for "all test cases for the checkout" in one prompt and receives a long, partly invented list. Improved approach: (1) give the user story, business rules and test format; (2) chain: first list test conditions, review them, then derive cases from the approved conditions; (3) send the same chain to a second model and compare the condition lists; differences go to a human for decision.' },
      { t: 'warn', h: 'Exam trap', x: 'Lowering temperature or setting a seed belongs to non-determinism (3.1.4), not to the five hallucination mitigations. Also, "trust the biggest model" is not a mitigation; fitness for the task is.' }
    ]
  },

  'nondet': {
    paras: [
      'Ask an LLM the same question twice and the answers may differ. This is <b>non-determinism</b>. It happens because the model does not pick the single most likely next token; it samples from a probability distribution at inference time. Randomness in that sampling gives variation, and the longer the output, the more chances for the paths to diverge, so long outputs are the hardest to reproduce.',
      'For testers this matters twice. First, it undermines repeatability: a prompt that produced good test cases yesterday may produce different ones today. Second, it makes fixing defects slippery, as noted in 3.1.1: a hallucination can vanish and return.',
      'Two settings help reduce variation. <b>Temperature</b> controls how flat or sharp the probability distribution is when the model generates a response. A <i>lower</i> temperature narrows the distribution so the most likely tokens dominate, giving more consistent outputs, at the price of less creativity and diversity (answers become repetitive or overly rigid). A <i>higher</i> temperature widens it, which can be useful when you want varied ideas. A <b>random seed</b>, where the implementation lets you set one, makes the pseudo-random number generator replay the same sequence, which improves reproducibility.',
      'The syllabus is explicit that <b>complete reproducibility cannot be guaranteed</b>. Because of this, you should automate parts of the verification of outputs, so evaluation of results is structured and consistent even when the wording of the output changes. That ties directly to reducing hallucinations and reasoning errors.'
    ],
    blocks: [
      { t: 'good', h: 'Example', x: 'A team uses an LLM to turn requirements into regression test titles. For stable, comparable runs they set a low temperature and a fixed seed. For a brainstorming session about exploratory test charters they raise the temperature to get a wider spread of ideas, accepting that the result will not be repeatable.' },
      { t: 'warn', h: 'Exam trap', x: 'Temperature acts at <b>inference</b> (when responding). Learning rate is a training parameter and does not control output variability. Lower temperature never means "guaranteed identical output", and it is not a way to make the model more factually correct, only more consistent.' }
    ]
  },

  'privacy': {
    paras: [
      'Testing often touches real or realistic data: production extracts, logs, customer records, source code, internal specifications. When such material is pasted into a GenAI tool, <b>privacy</b> (protection of personal and sensitive data) and <b>security</b> (protection against unauthorised access and attack) questions appear. The syllabus separates data privacy concerns from security risks.',
      'Three <b>data privacy</b> concerns are named. <i>Unintentional data exposure</i>: the model produces output that accidentally reveals sensitive information. <i>Lack of control over data usage</i>: a tool may store and process what you send without explicit consent or any control on your side, with possible misuse or unauthorised access. <i>Compliance risks</i>: using GenAI in ways that break data protection law such as the GDPR can lead to legal disputes.',
      'On the <b>security</b> side, three points are made. The LLM-powered test infrastructure itself can be attacked, for example through breaches or unauthorised access. Malicious actors can exploit weaknesses such as manipulative attacks (section 3.2.2) to change the model’s behaviour or pull out sensitive information. And attackers can deliberately feed harmful input to mislead the model and damage its accuracy or security.',
      'Keep in mind the other side of the coin from 2.2.2: GenAI can <i>produce</i> synthetic test data that imitates realistic scenarios without exposing real personal data, which is privacy-friendly. The risk is in what you feed to the model, not in the technique itself.'
    ],
    blocks: [
      { t: 'warn', h: 'Example', x: 'A tester pastes a CSV of 500 real customer orders (names, addresses, card fragments) into a public chatbot to "generate edge cases". Data left the organisation without approval (lack of control), the provider may keep it (data usage), and the company may have breached GDPR (compliance). The same task could have used a masked or synthetic sample.' },
      { t: 'warn', h: 'Exam trap', x: 'Do not confuse privacy with security in answers: privacy concerns are exposure, control and compliance; security risks are breaches, unauthorised access, manipulative attacks and malicious input. Compliance risk is about regulation, not about model accuracy.' }
    ]
  },

  'attacks': {
    paras: [
      'The syllabus gives four <b>attack vectors</b> on GenAI used in test processes and tools. The exam likes matching each name with its description and example, so learn them as pairs.',
      '<b>Context Manipulation</b>: the attacker sends requests designed to pull out confidential training data. The example given is overwhelming the model’s context window with very long prompts to overload its memory, which could lead it to disclose random fragments of what it was trained on, which might include sensitive information.',
      '<b>Request manipulation</b>: the attacker introduces input that disturbs the model’s answer. Example: images that lure the model into a different context so it hallucinates, say, acceptance criteria that were never specified. The target here is the runtime input.',
      '<b>Data poisoning</b>: manipulation of the <i>training</i> data. Example: submitting fake evaluations when people rate the results of an AI-generated test report, so that what the model learns from the feedback is corrupted.',
      '<b>Malicious code generation</b>: the model is manipulated so that it produces backdoors during use, for instance external command calls. Example: generated code that opens a communication channel to a specific malicious IP address.',
      'A memory aid: <i>what is attacked and when?</i> Context manipulation extracts secrets via the context at run time; request manipulation corrupts the answer via input at run time; poisoning corrupts learning data; malicious code generation turns the model into a source of harmful code.'
    ],
    table: { head: ['Vector', 'Core idea', 'Example in the syllabus'], rows: [
      ['Context Manipulation', 'Extract confidential training data', 'Overflowing the context window with long prompts'],
      ['Request manipulation', 'Disrupt the output with crafted input', 'Images leading to hallucinated acceptance criteria'],
      ['Data poisoning', 'Corrupt training data', 'Fake ratings of an AI-generated test report'],
      ['Malicious code generation', 'Make the LLM emit backdoors', 'Code that opens a channel to a malicious IP']
    ] },
    blocks: [
      { t: 'warn', h: 'Exam trap', x: 'Context Manipulation is about extracting training data, not to be mixed up with request manipulation. Poisoning concerns <b>training</b> data, whereas request manipulation concerns input supplied while the model is in use.' }
    ]
  },

  'protect': {
    paras: [
      'No single control protects a GenAI-supported test process; the syllabus stresses that the strategies are complementary and are usually combined. Regulation such as the GDPR does not ban GenAI as such, but it sets safeguards that can limit what you may do, particularly the lawfulness of processing and the limits on purposes of collecting, processing and storing data.',
      'Four <b>core data privacy measures</b>. <i>Data minimisation</i>: avoid processing sensitive data unless it is legally allowed, and use only as much non-sensitive data as the task needs. <i>Anonymisation and pseudonymisation</i>: mask sensitive values or replace them with non-identifiable ones. <i>Secure storage and transmission</i>: strong encryption and access controls. <i>Training and policies</i>: clear programmes so staff use GenAI responsibly and ethically.',
      '<b>Additional strategies</b>. <i>Systematic review</i> of generated output by humans; <i>comparison with another LLM</i> to evaluate answers; <i>choice of a secure operating environment</i> matched to the confidentiality needed (a commercial secure offering from a provider, an LLM run in a secure cloud, or a model installed in the organisation’s own infrastructure); <i>regular security audits and vulnerability assessments</i>; and <i>staying up to date</i> with security guidance and technology.',
      'Because these topics are cross-disciplinary, the syllabus recommends involving senior security engineers, legal counsel, and, if the company has them, the CTO or CISO.'
    ],
    blocks: [
      { t: 'good', h: 'Worked example', x: 'A team wants an LLM to draft test data for a patient portal. Plan: minimise (only the fields the tests need), pseudonymise names and IDs before sending, use the company’s secure cloud deployment rather than a free public chatbot, keep encrypted storage with role-based access, have a tester review all output, and ask the security engineer and legal counsel to sign off the set-up.' },
      { t: 'warn', h: 'Exam trap', x: 'Options like "disable encryption for speed" or "give unrestricted access so everyone can use the tool" are the opposite of mitigation. Also, "GDPR forbids using GenAI" is wrong: it limits purposes and requires lawfulness, it does not prohibit the technology.' }
    ]
  },

  'energy': {
    paras: [
      'Training and running LLMs needs large amounts of specialised computing hardware. Since LLMs are mostly offered as web services, every use adds load to devices, networks and data centres, which means higher energy consumption and associated CO2 emissions. The syllabus asks you to understand that this impact should not be underestimated.',
      'Two factors drive consumption: the <b>complexity of the task</b> and the <b>computational resources</b> needed to perform it. Energy use rises sharply as usage grows. The syllabus gives one illustration: producing a single image with a powerful model can use about as much energy as fully charging a smartphone, whereas generating text needs only a small percentage of a charge. So image generation is much more energy-hungry than text generation.',
      'It is admittedly hard to obtain precise data about the environmental footprint of GenAI, but the overall picture is clear. One query looks harmless; multiplied by millions of users worldwide, the cumulative effect becomes a notable strain on the environment.',
      'The practical best practice named here is to <b>limit unnecessary interactions</b> with models. For testers this means thinking before prompting: reuse good results, avoid pointless regenerations, do not use heavy generation (such as images) when text does the job, and keep prompts purposeful. Choosing right-sized models is a related lever that the syllabus treats under skills in 5.2.1.',
      'There is a hands-on exercise with a simulator where you calculate energy and emissions for test tasks and see which task characteristics matter. You do not need figures for the exam, only the drivers and the direction (more complexity and more usage mean more energy).'
    ],
    blocks: [
      { t: 'good', h: 'Example', x: 'A team runs an LLM over 2,000 test reports every night and regenerates the full summary each time, even when only 10 reports changed. Processing only changed reports, and using a small model for simple classification, cuts needless interactions and therefore energy and cost.' },
      { t: 'warn', h: 'Exam trap', x: 'Do not claim that text and image generation consume the same energy, or that one query alone is a major emitter. The point is the large difference between modalities and the cumulative effect of mass usage.' }
    ]
  },

  'regs': {
    paras: [
      'Risks such as reasoning errors, privacy breaches, vulnerabilities and environmental impact are not only managed internally. Governments and standards bodies publish rules and guidance, and test organisations must know the relevant ones and keep watching how they develop. At K1 level you only need to recognise the four items in the syllabus table and what each is about.',
      '<b>ISO/IEC 42001:2023</b> is a <i>standard</i> that specifies requirements for an AI <i>management system</i> within an organisation. Applied to testing, it encourages that GenAI use follows recommended practice, which supports consistency and reliability.',
      '<b>ISO/IEC 23053:2022</b> is also a <i>standard</i>. It gives a framework for AI systems that use machine learning, centred on lifecycle processes with emphasis on safety and transparency. In testing it provides a frame for data quality, transparency and safety when GenAI is used.',
      'The <b>EU AI Act</b> is a <i>regulation</i>, which means it is law. It sets up a legal framework addressing AI risks by classifying applications by risk level. For GenAI in testing it requires compliance in areas like transparency, accountability and bias mitigation.',
      'The <b>NIST AI Risk Management Framework</b> (AI RMF 1.0, from the United States) is a <i>framework</i>, i.e. guidance rather than law. It offers guidelines for managing AI risks with a focus on fairness, transparency and security, and supports fair results and risk reduction, helping avoid biased test results.',
      'The type label matters: standard, regulation or framework. A regulation binds legally; standards and frameworks give recommended practice and structure.'
    ],
    table: { head: ['Name', 'Type', 'Keyword to remember'], rows: [
      ['ISO/IEC 42001:2023', 'Standard', 'AI management system in an organisation'],
      ['ISO/IEC 23053:2022', 'Standard', 'Framework for AI systems using ML; lifecycle'],
      ['EU AI Act', 'Regulation', 'Risk-level classification of AI applications'],
      ['NIST AI RMF 1.0', 'Framework (US)', 'Managing AI risk: fairness, transparency, security']
    ] },
    blocks: [
      { t: 'warn', h: 'Exam trap', x: 'Other well known testing standards (for example ISO/IEC 25010 on quality models, or ISO/IEC/IEEE 29119 on software testing) are not part of this 3.4.1 list. Within the four items of the 3.4.1 table, only the EU AI Act is a regulation (the GDPR in 3.2 is a separate data protection regulation).' }
    ]
  }
};

/* CT-GenAI study notes – condensed from ISTQB CT-GenAI Syllabus v1.1 for exam preparation.
 * Always cross-check with the official syllabus: https://www.istqb.org */
(window.ICSTUDY = window.ICSTUDY || {})['ct-genai'] = {
  chapters: {
    1: {
      summary: 'The foundations: what GenAI and LLMs are, how they work (tokens, embeddings, transformer, context window), the three LLM types, multimodal models, what LLMs can do for testers, and the two ways of using them. 7 exam questions, 7 points: 1 × K1 and 6 × K2.',
      sections: [
        { id: 'spectrum', title: 'The AI spectrum (GenAI-1.1.1 · K1)', bullets: [
          '<b>Symbolic AI</b> – rule-based; represents knowledge with symbols and logical rules to mimic human decision-making.',
          '<b>Classical machine learning</b> – data-driven; needs data preparation, feature selection and model training. Test uses: defect categorisation, predicting software problems.',
          '<b>Deep learning</b> – neural networks that learn features automatically from (very large, complex) data such as images, audio, text.',
          '<b>Generative AI</b> – uses deep learning to <i>create new content</i> (text, images, code) by learning and mimicking patterns in its training data.',
          'Key advantage of GenAI for testing: <b>pre-trained models can be used directly, with no extra training phase</b> – but with risks (Chapter 3).'
        ], callout: { t: 'good', h: 'Memory hook', x: 'Rules → Features → Neural networks → New content (symbolic → classical ML → deep learning → GenAI).' } },
        { id: 'llm-basics', title: 'LLM basics: tokens, embeddings, transformer, context (GenAI-1.1.2)', bullets: [
          'LLMs are based on the <b>generative pre-trained transformer</b>, trained on very large datasets (books, articles, websites). <b>SLMs</b> (small language models) are compact, with fewer parameters – lightweight and focused.',
          '<b>Tokenization</b> splits text into tokens (as small as a character, as large as a word or sub-word). <b>Embeddings</b> are numeric vectors for tokens that encode semantic, syntactic and contextual relationships; similar meanings sit close together.',
          'During inference the LLM <b>predicts the next token</b>. Output is statistically plausible – <b>plausible is not necessarily correct</b>.',
          '<b>Non-determinism:</b> the same input can give different outputs because inference is probabilistic and depends on hyper-parameters.',
          '<b>Context window</b> = how much preceding text (measured in tokens) the model can consider at once. Larger window → better coherence over long inputs (e.g. big test logs) but increases computational complexity and processing time.'
        ], callout: { t: 'warn', h: 'Exam trap', x: 'Tokenization ≠ embeddings. Tokenization splits text into units; embeddings turn tokens into numeric vectors that capture meaning.' } },
        { id: 'llm-types', title: 'Foundation vs instruction-tuned vs reasoning LLMs (GenAI-1.1.3)', table: { head: ['Type', 'What it is', 'Strength'], rows: [
          ['Foundation LLM (base LLM)', 'General-purpose, pre-trained on vast, diverse data (text, code, images…); predicts the next word. Usually needs adaptation for specific tasks.', 'Powerful and flexible across domains'],
          ['Instruction-tuned LLM', 'Foundation model fine-tuned on prompt/response pairs → follows instructions, formats, styles. Sometimes called “non-reasoning”.', 'Task adherence, instruction following, response coherence'],
          ['Reasoning LLM', 'Extends instruction-tuned models: logical inference, multi-step problem solving, chain-of-thought, synthesis of complex information.', 'High-cognitive-load tasks, including technical domains']
        ] }, bullets: ['The choice depends on the complexity and reasoning demands of the test task (the sample exam uses template/format tasks for instruction-tuned and trend analysis/prioritisation for reasoning LLMs).'] },
        { id: 'multimodal', title: 'Multimodal LLMs and vision-language models (GenAI-1.1.4)', bullets: [
          'Multimodal LLMs process several data types: text, images, sound, video. Tokenization is adapted per modality (images → embeddings via vision-language models).',
          '<b>Vision-language models are a subset of multimodal LLMs</b> (not the other way round): image captioning, visual Q&amp;A, checking consistency between image and text.',
          'Test uses: compare a GUI screenshot/wireframe with a user story or defect report, spot visual discrepancies, generate test cases using text + visual cues, derive acceptance criteria from a wireframe.'
        ] },
        { id: 'capabilities', title: 'Key LLM capabilities for test tasks (GenAI-1.2.1)', bullets: [
          '<b>Requirements analysis &amp; improvement</b> – find ambiguities, inconsistencies, gaps; generate clarification questions.',
          '<b>Test case creation support</b> – test cases and objectives from requirements/user stories.',
          '<b>Test oracle generation</b> – expected results.',
          '<b>Test data generation</b> – datasets, boundary values, combinations.',
          '<b>Test automation support</b> – generate test scripts from test case descriptions; improve existing scripts by suggesting changes and identifying appropriate test techniques.',
          '<b>Test result analysis</b> – summaries; classify anomalies by severity and priority.',
          '<b>Testware creation</b> – test plans, test reports, defect reports, kept up to date.'
        ], callout: { t: 'warn', h: 'Limits', x: 'LLM output can be wrong (see Chapter 3) and needs human review. Exam note: “performing exploratory testing” and “generating complete application code” appear as <i>wrong</i> capability options in the official sample exam, although §1.2.2 says chatbots are useful for exploratory testing support.' } },
        { id: 'interaction', title: 'AI chatbots vs LLM-powered testing applications (GenAI-1.2.2)', table: { head: ['', 'AI chatbot', 'LLM-powered testing application'], rows: [
          ['Interface', 'Conversational, natural language', 'LLM reached via APIs and embedded in test tools/frameworks'],
          ['Best for', 'Ad hoc, routine tasks, exploration, fast feedback, onboarding; usable by non-technical people', 'Well-defined, often automated tasks at scale (test generation, defect analysis, data synthesis)'],
          ['Flexibility', 'Very flexible, little integration', 'Customised, scalable, integrated into the test process'],
          ['Advanced form', '—', 'AI agents for specific testing roles (Chapter 4)']
        ] }, bullets: ['Both need strong <b>prompt engineering</b> to get accurate, relevant output.'] }
      ],
      terms: [['AI chatbot', 'Conversational agent using LLMs to process queries and generate human-like text replies.'], ['Tokenization', 'Breaking text into tokens that the model processes.'], ['Embedding', 'Numeric vector representing a token’s semantic, syntactic and contextual relationships.'], ['Context window', 'Span of text, in tokens, that a model considers when generating a response.'], ['Foundation LLM', 'General-purpose model pre-trained on broad data (synonym: base LLM).'], ['Instruction-tuned LLM', 'Foundation LLM trained to follow instructions, often reinforced with feedback.'], ['Reasoning LLM', 'LLM building on instruction-tuned models, emulating human-like reasoning.'], ['Multimodal model', 'Handles and generates several data types such as text, images, audio.'], ['Transformer', 'Deep learning model architecture using self-attention mechanisms to capture long-range dependencies in input sequences.'], ['Vision-language model', 'GenAI system that jointly processes visual and textual data to perform tasks by linking and generating content across both modalities.'], ['Large language model (LLM)', 'Computer program that uses very large collections of language data to understand and produce text similar to the way humans do.'], ['Generative AI', 'AI system using machine learning models to generate new content that resembles human-created content.'], ['Deep learning', 'ML using neural networks with multiple layers.'], ['Symbolic AI', 'AI using symbols, rules and structured knowledge.']],
      tips: ['Know the four AI types in order and one test example for classical ML.', 'Be able to tell instruction-tuned from reasoning tasks (templates vs. inference/prioritisation).', 'Remember “vision-language ⊂ multimodal”.'],
      traps: ['Saying the context window controls time order or cross-document referencing – it limits how much text can be considered at once.', 'Mixing up AI chatbots (ad hoc) and LLM-powered applications (integrated, customised).']
    },
    2: {
      summary: 'The heaviest chapter: 11 questions and 16 of 46 points, including 5 of the 6 K3 questions (2 points each). You must be able to <i>apply</i> prompt structure and techniques to realistic test tasks, and evaluate results with metrics.',
      sections: [
        { id: 'structure', title: 'The six prompt components (GenAI-2.1.1)', table: { head: ['Component', 'Purpose', 'Example'], rows: [
          ['Role', 'Persona/perspective the LLM adopts', '“You are an experienced test analyst.”'],
          ['Context', 'Background: test object, functionality, relevant situation', '“Online shop checkout, EU customers…”'],
          ['Instruction', 'The task – clear, imperative, concise', '“Generate test conditions for each acceptance criterion.”'],
          ['Input data', 'What the task works on: user stories, criteria, screenshots, code, existing tests, output examples', 'The user story text'],
          ['Constraints', 'Restrictions on how instructions apply to the data', '“Exclude cosmetic issues; max 10 cases.”'],
          ['Output format', 'Expected structure/characteristics of the answer', '“A table: ID, condition, priority.”']
        ] }, callout: { t: 'good', h: 'Memory hook', x: 'RCI-ICO → Role, Context, Instruction, Input data, Constraints, Output format. Context = background; Input data = material to process.' } },
        { id: 'techniques', title: 'Core prompting techniques (GenAI-2.1.2)', bullets: [
          '<b>Prompt chaining</b> – break a task into sequential prompts; each result is checked (manually or automatically) and refined before the next. Higher accuracy; ideal for complex tasks needing decomposition and systematic checking; also allows dynamic interaction.',
          '<b>Few-shot prompting</b> – give <i>more than one</i> example. <b>Zero-shot</b> = no example, <b>one-shot</b> = one example. Examples give a clear reference so results are consistent. Best for repetitive or constrained-format output (Gherkin, keyword-driven scripts, report formats).',
          'High-quality input is crucial for meaningful GenAI results, whichever technique you use.',
          '<b>Meta prompting</b> – the LLM generates or refines prompts; tester evaluates and iterates. Good when unsure how to craft a prompt (“pairing” with the AI) and for flexible, new tasks.',
          'Techniques can be combined: meta prompting → initial prompt; add examples (few-shot); split into steps (chaining).'
        ], callout: { t: 'warn', h: 'Exam trap', x: 'Exam distractors swap the definitions: few-shot supplies examples; chaining decomposes into steps; meta prompting uses AI to refine prompts.' } },
        { id: 'system-user', title: 'System prompt vs user prompt (GenAI-2.1.3)', bullets: [
          '<b>System prompt</b> – set by developer/tester; defines behaviour, personality and operational parameters (tone, concision, domain rules, things to avoid); usually hidden from the chatbot user; <b>constant for the whole session</b>; may contain role, context, constraints.',
          '<b>User prompt</b> – the actual input/question; <b>changes each turn</b>; visible; forms the immediate context; should be focused and structured with explicit instructions.',
          'The LLM considers both together. Typical use: system prompt once, then successive user prompts.'
        ] },
        { id: 'analysis', title: 'Test analysis with GenAI (GenAI-2.2.1 · K3)', bullets: [
          'Inputs: requirements, user stories, specifications, GUI wireframes. Outputs: prioritised test conditions (e.g. acceptance criteria).',
          '<b>Identify potential defects in the test basis</b> (ambiguity, inconsistency, incompleteness).',
          '<b>Generate test conditions</b> from requirements/user stories.',
          '<b>Prioritise test conditions by risk</b> (needs likelihood &amp; impact info).',
          '<b>Support coverage analysis</b> – map requirements ↔ test conditions to find gaps.',
          '<b>Suggest test techniques</b> (e.g. BVA, equivalence partitioning).',
          'Example chain (HO-2.2.1b): identify ambiguities → evaluate testability → evaluate completeness, with human verification after each step.'
        ], callout: { t: 'good', h: 'K3 approach', x: 'Good prompts for analysis give structure and context, work step by step, and use a clean, verified result as input to the next step.' } },
        { id: 'design', title: 'Test design &amp; implementation with GenAI (GenAI-2.2.2 · K3)', bullets: [
          '<b>Test case generation</b> – draft cases (preconditions, inputs, expected results, coverage) from functional and non-functional requirements.',
          '<b>Test data synthesis</b> – representative, privacy-preserving synthetic data incl. extreme cases.',
          '<b>Automated test script generation</b> – manual procedures and scripts from structured test cases; update as requirements change.',
          '<b>Execution scheduling and prioritisation</b> – using priorities, risks, dependencies, resources.',
          'Practice patterns: prompt chaining + structured prompts + meta prompting for test cases from acceptance criteria and coverage tables; few-shot for Gherkin (Given-When-Then) examples; prompt chaining for prioritisation with dependencies – always verify the LLM’s reasoning.'
        ] },
        { id: 'regression', title: 'Automated regression testing with GenAI (GenAI-2.2.3 · K3)', bullets: [
          '<b>Keyword-driven script implementation</b> – map predefined keywords to test cases and generate scripts.',
          '<b>Impact analysis &amp; test optimisation</b> – analyse code changes to focus regression on high-risk areas.',
          '<b>Self-healing, adaptive tests</b> – adjust to minor UI/API changes (dynamic locators; changed request/response formats, endpoints, authentication).',
          '<b>Automated reporting &amp; insights</b> – reports, trends, predictive hints.',
          '<b>Enhanced defect reporting &amp; root cause analysis</b> – compile logs, screenshots, environment data.',
          'Test report analysis chain: analyse results vs specification → cluster similar defects → maintain a known-anomalies list → cross-check findings. Output must be checked according to risk.'
        ] },
        { id: 'monitoring', title: 'Test monitoring &amp; control with GenAI (GenAI-2.2.4 · K3)', bullets: [
          '<b>Monitoring &amp; metrics analysis</b> – trends, risk prediction, alerting on deviations.',
          '<b>Test control</b> – reprioritise tests, adjust schedules, reallocate resources.',
          '<b>Completion insights</b> – completion reports, lessons learned.',
          '<b>Enhanced visualisation and reporting</b> – dashboards and natural-language summaries for all stakeholders (a plain-language summary that interprets metrics and next steps is a typical prompt improvement).'
        ] },
        { id: 'choose', title: 'Choosing the right technique (GenAI-2.2.5 · K3)', table: { head: ['Technique', 'Use when…', 'Typical test examples'], rows: [
          ['Prompt chaining', 'Complex task needing precision and human verification at each step', 'Test analysis, test design, automation steps'],
          ['Few-shot prompting', 'Repetitive task or specific/constrained output format', 'Gherkin test cases, keyword-driven tests, fixed-format reports'],
          ['Meta prompting', 'Flexible, dynamic tasks; crafting prompts for new tasks', 'Test report analysis, anomaly detection']
        ] }, bullets: ['Quick rule: <b>precision → chain · pattern → few-shot · unknown prompt → meta</b>. Combine when useful.'] },
        { id: 'metrics', title: 'Metrics for evaluating GenAI results (GenAI-2.3.1)', table: { head: ['Metric', 'Meaning', 'Example'], rows: [
          ['Accuracy', 'Overall correctness vs expert-written tests, requirements or standards', 'Generated tests cover all specified requirements'],
          ['Precision', 'Correctness w.r.t. a specific objective', 'Generated tests correctly identify anomalies'],
          ['Recall', 'Ability to find all relevant instances', 'Tests cover valid and invalid equivalence partitions'],
          ['Relevance &amp; contextual fit', 'Applicable and appropriate for the context', 'Consistent with test basis and domain rules'],
          ['Diversity', 'Wide range of inputs/scenarios, avoiding repetition', 'Varied user behaviours; explores edge cases'],
          ['Execution success rate', 'Share of generated artefacts executable as-is in the test environment', 'Scripts run without syntax/format errors'],
          ['Time efficiency', 'Time saved vs manual effort', 'AI generation time vs human time']
        ] }, bullets: ['Task-specific metrics can be added. Evaluate by manual review or automatically against a reference. Because of non-determinism, metrics must be based on <b>statistically relevant data</b>.'] },
        { id: 'refine', title: 'Evaluating &amp; refining prompts (GenAI-2.3.2)', bullets: [
          '<b>Iterative prompt modification</b> – start with a base prompt, adjust using the results (context, wording, terminology).',
          '<b>A/B testing of prompts</b> – compare versions against predefined metrics.',
          '<b>Output analysis</b> – examine errors/inconsistencies vs test basis to see why the prompt misled the LLM.',
          '<b>Integrate user feedback</b> – testers’ view on usefulness, clarity, level of detail.',
          '<b>Adjust prompt length and specificity</b> – sometimes more context helps, sometimes shorter generalises better.',
          'Share prompt libraries and run optimisation sessions across the team.'
        ] }
      ],
      terms: [['Prompt', 'Natural-language input given to elicit a response from an LLM.'], ['Prompt engineering', 'Designing and refining prompts to guide LLMs to desired outputs.'], ['Prompt chaining', 'Using the output of one prompt as input of the next in a sequence.'], ['Few-shot prompting', 'Giving a few examples in the prompt.'], ['One-shot prompting', 'Giving exactly one example in the prompt.'], ['Zero-shot prompting', 'No example – relies on pre-existing knowledge.'], ['Meta prompting', 'Higher-level instructions that generate specific prompts.'], ['System prompt', 'Developer/tester-defined prompt that sets behaviour for the whole session.'], ['User prompt', 'The user’s actual input in each turn.'], ['Natural language processing', 'Processing of data encoded in natural language by computers.']],
      tips: ['Practise on real prompts: spot which component is missing, then fix the weakest part first.', 'In K3 “improve this prompt” questions, prefer the option that adds specific, task-relevant structure (steps, output format, examples) over generic role changes.', 'Metrics: link each metric to its example (e.g. diversity ↔ edge cases, execution success rate ↔ scripts that run).'],
      traps: ['One giant prompt “to do everything in one step” is the opposite of prompt chaining.', 'Few-shot is not “manual optimisation of prompts”; meta prompting is not “breaking tasks into steps”.', 'A/B testing compares prompt versions; it does not diagnose why a particular output was wrong (output analysis does).']
    },
    3: {
      summary: 'Risks, mitigations, security, environment and regulation. 10 questions, 11 points: 3 × K1, 6 × K2, 1 × K3 (identify hallucinations, reasoning errors, biases).',
      sections: [
        { id: 'defects', title: 'Hallucinations, reasoning errors, biases (GenAI-3.1.1 · K1)', bullets: [
          '<b>Hallucination</b> – output that appears factually incorrect or irrelevant to the task (fictitious test cases, non-working scripts, tests for non-existent acceptance criteria).',
          '<b>Reasoning error</b> – misreading logical structure (cause/effect, conditionals, step-by-step logic). LLMs use pattern matching, not true logic. Typical in test planning, estimation, prioritisation, maths.',
          '<b>Bias</b> – originates from training data; favours certain information/approaches/assumptions (e.g. English-dominant data). Affects test data generation and acceptance criteria.',
          'They result from the nature of the training data and the inherent limitations of the transformer model.',
          'Because of non-determinism these defects may seem fixed and then reappear.'
        ] },
        { id: 'identify', title: 'Identifying them in LLM output (GenAI-3.1.2 · K3)', table: { head: ['Problem', 'Detection approaches'], rows: [
          ['Hallucination', 'Cross-verification with docs/requirements/known behaviour · Domain expert consultation · Consistency checks'],
          ['Reasoning error', 'Logical validation (coherence, structure) · Output testing (run generated tests/scripts against the test object)'],
          ['Bias', 'Review whether testware/test data fairly represents strategy and coverage · Look for under-represented test types (e.g. non-functional)']
        ] }, bullets: ['Detection works through review, or a combination of review and automated verification.', 'Depth of checking depends on the <b>estimated risk</b> of the task.'], callout: { t: 'good', h: 'K3 approach', x: 'Compare the output with the briefing/requirements: anything not in the source (e.g. a “wishlist” test when the brief has none) is likely a hallucination; wrong arithmetic or order is a reasoning error; skewed data is bias.' } },
        { id: 'mitigate', title: 'Mitigating hallucinations, errors, biases (GenAI-3.1.3)', bullets: [
          'Provide <b>complete context</b> (all six prompt components).',
          '<b>Divide prompts</b> into manageable steps (prompt chaining) and verify each output.',
          'Use <b>clear, interpretable data formats</b> – ambiguity comes from unclear or poorly structured data.',
          '<b>Select the appropriate model</b> – an LLM specifically trained for the task at hand (see 5.1.3).',
          '<b>Compare results across models</b>.',
          'RAG and fine-tuning (Chapter 4) also improve results.'
        ] },
        { id: 'nondet', title: 'Non-determinism (GenAI-3.1.4 · K1)', bullets: [
          '<b>Lower temperature</b> → narrower probability distribution → more consistent output, but less creativity/diversity.',
          '<b>Set a random seed</b> (where supported) → more reproducible results.',
          'Complete reproducibility cannot be guaranteed; long outputs vary more. Automate parts of verification.'
        ], callout: { t: 'warn', h: 'Exam trap', x: 'Learning rate is a training setting – it does not affect inference variability. Temperature does.' } },
        { id: 'privacy', title: 'Data privacy and security risks (GenAI-3.2.1)', bullets: [
          '<b>Unintentional data exposure</b> – outputs revealing sensitive information.',
          '<b>Lack of control over data usage</b> – tools store/process data without explicit consent.',
          '<b>Compliance risks</b> – e.g. GDPR violations → legal disputes.',
          'Security: LLM infrastructure can suffer breaches/unauthorised access; attackers can exploit manipulative attacks or feed malicious input to mislead the LLM.',
          'Synthetic test data generated by GenAI is described as privacy-preserving: it simulates realistic scenarios without exposing sensitive information (2.2.2).'
        ] },
        { id: 'attacks', title: 'Attack vectors (GenAI-3.2.2) – v1.1 wording', table: { head: ['Attack vector', 'Description', 'Example'], rows: [
          ['Context Manipulation', 'Requests designed to extract confidential training data', 'Overflowing the context window with long prompts so the model leaks random snippets of training data'],
          ['Request manipulation', 'Introducing data that disrupts output', 'Images that lure the AI into another context → hallucinated acceptance criteria'],
          ['Data poisoning', 'Manipulating training data', 'Fake evaluations when rating an AI-generated test report'],
          ['Malicious code generation', 'Manipulating the LLM to generate backdoors during use', 'Generated code opening a channel to a malicious IP']
        ] }, callout: { t: 'warn', h: 'v1.1 change', x: '“Data exfiltration” was renamed <b>Context Manipulation</b>. Poisoning = training data; request manipulation = runtime input.' } },
        { id: 'protect', title: 'Mitigation strategies (GenAI-3.2.3)', bullets: [
          '<b>Data minimisation</b> – only necessary, non-sensitive data.',
          '<b>Anonymisation / pseudonymisation</b> – mask or replace sensitive info.',
          '<b>Secure storage and transmission</b> – encryption, access controls.',
          '<b>Training and policies</b> for responsible use.',
          'Also: systematic human review · compare with another LLM · choose a secure environment (commercial secure offering, secure cloud, on-prem) · regular audits and vulnerability assessments · stay up to date with security practice.',
          'Involve security engineers, legal, CTO/CISO. GDPR doesn’t forbid GenAI but limits purposes of collection, processing, storage.'
        ] },
        { id: 'energy', title: 'Energy and environment (GenAI-3.3.1)', bullets: [
          'Energy use depends on <b>task complexity</b> and <b>computational resources</b>; it rises sharply with usage.',
          'Generating one <b>image</b> can use as much energy as fully charging a smartphone; <b>text</b> uses only a small percentage – images are far more energy-intensive.',
          'A single search or text generation may seem negligible, but the cumulative effect across millions of users causes substantial CO<sub>2</sub> emissions and environmental strain.',
          'Best practice (3.3.1): limit unnecessary model interactions. Choosing right-sized models is covered in 5.2.1.'
        ] },
        { id: 'regs', title: 'Regulations, standards, frameworks (GenAI-3.4.1 · K1)', table: { head: ['Name', 'Type', 'Purpose'], rows: [
          ['ISO/IEC 42001:2023', 'Standard', 'AI management system requirements within an organisation – consistency and reliability'],
          ['ISO/IEC 23053:2022', 'Standard', 'Framework for AI systems using ML – lifecycle, data quality, transparency, safety'],
          ['EU AI Act', 'Regulation', 'Legal framework classifying AI applications by risk level – transparency, accountability, bias mitigation'],
          ['NIST AI RMF 1.0 (US)', 'Framework', 'Managing AI risks: fairness, transparency, security']
        ] }, bullets: ['Sample Exam A uses ISO/IEC 25010 and ISO/IEC/IEEE 29119 as wrong options; they are not in the 3.4.1 list.'] }
      ],
      terms: [['Hallucination', 'Wrong information created by an LLM.'], ['Reasoning error', 'Faulty conclusion caused by misinterpreting logical structure.'], ['Bias', 'Systematic skew in outputs inherited from training data.'], ['Temperature', 'Parameter controlling randomness of output during inference.'], ['Context manipulation', 'Requests designed to extract confidential training data.'], ['Data privacy', 'Protection of personal/sensitive information.'], ['Vulnerability', 'Weakness that can be exploited.'], ['Security', 'Protection from unauthorised access and attacks.']],
      tips: ['Pair each attack vector with its example; they are classic matching questions.', 'For the K3 question: work out what the briefing says, then find the output element that isn’t supported.'],
      traps: ['“Disable encryption” or “unrestricted access” are never mitigations.', 'Hallucinations cannot be fully prevented – only identified and mitigated.']
    },
    4: {
      summary: 'Architecture of LLM-powered test tools, RAG, agents, fine-tuning and LLMOps. 5 questions, 5 points – all K2, one per learning objective.',
      sections: [
        { id: 'arch', title: 'Architecture of LLM-powered test infrastructure (GenAI-4.1.1)', bullets: [
          '<b>Front-end</b> – user interface for queries/commands.',
          '<b>Back-end</b> – authentication, data retrieval, <b>prompt preparation</b>, LLM interaction, and <b>post-processing</b> of output.',
          '<b>LLM</b> – third-party service via API or custom in-house model.',
          '<b>Data sources</b> – relational databases (structured data such as test cases) and <b>vector databases</b> (semantic retrieval via embeddings).',
          'Unlike scripted chatbots, the LLM is a “smart processing component” generating insights dynamically from requirements, code, results.'
        ] },
        { id: 'rag', title: 'Retrieval-Augmented Generation (GenAI-4.1.2)', bullets: [
          '<b>Preparation:</b> split documents into chunks (e.g. 256–512 tokens) → clean/process → encode into embeddings → store in a vector database.',
          '<b>Query time:</b> (1) <b>Retrieval</b> – encode the query, fetch chunks by semantic similarity; (2) <b>Generation</b> – feed chunks to the LLM as context to produce a grounded answer.',
          'RAG does <i>not</i> retrain the model; it supplies retrieved data as context.',
          'Value for testing: answers stay aligned with the latest specs, requirements and existing test data from enterprise sources.'
        ], callout: { t: 'good', h: 'Order to remember', x: 'Chunk → Clean → Embed &amp; store → Retrieve → Generate.' } },
        { id: 'agents', title: 'LLM-powered agents (GenAI-4.1.3)', bullets: [
          'Agents act by <b>invoking tools</b> (predefined functions), not just answering questions.',
          '<b>Autonomous</b> agents work with minimal human intervention; <b>semi-autonomous</b> agents have periodic human oversight – use for critical tasks.',
          '<b>Multi-agent</b> systems: specialised agents coordinated by <b>orchestration</b>.',
          'AI assistants expose agents in test tools: from user stories to analysis, design, implementation, execution, reporting – moving from script-based to <b>goal-driven, agent-based</b> automation.',
          'Agents inherit hallucinations, reasoning errors and biases → add automated verification or semi-autonomy.'
        ] },
        { id: 'ft', title: 'Fine-tuning (GenAI-4.2.1)', bullets: [
          'Further trains a pre-trained LLM/SLM on a targeted dataset for domain knowledge, vocabulary or output format (e.g. test cases from your user stories in your template).',
          'SLMs are cheaper to fine-tune.',
          'Challenges: <b>high-quality task-specific data</b>, <b>overfitting</b>, <b>opacity</b> of reasoning, <b>compute cost</b>.',
          'Suits equipping generic LLMs with specialised reasoning abilities or a domain-specific vocabulary; overfitting must be mitigated to keep generalisation across scenarios.'
        ] },
        { id: 'llmops', title: 'LLMOps (GenAI-4.2.2)', bullets: [
          'LLMOps = practices, tools and processes for developing, deploying, monitoring and maintaining LLMs in production (privacy, security, cost).',
          'Three approaches (can be combined): <b>AI chatbot</b> (privacy/security, cost; LLM-as-a-service or in-house open-source), <b>test tool with GenAI capabilities</b> (vendor data security and performance assurances; cost-benefit and risk assessment), <b>in-house tool</b> (full control; compute, storage, staff training; validation and maintenance processes).',
          'RAG and fine-tuning can be added to any of them.'
        ] }
      ],
      terms: [['Retrieval-augmented generation (RAG)', 'LLM combined with a retriever that fetches relevant data to ground answers.'], ['Vector database', 'Stores embeddings for similarity-based retrieval.'], ['LLM-powered agent', 'Application integrating LLM reasoning, decisions and memory, using tools to perform tasks.'], ['Fine-tuning', 'Supervised training on labelled examples to adapt LLM weights to a task/domain.'], ['LLMOps', 'Practices and tools for deploying, monitoring and maintaining LLMs in production.'], ['Test infrastructure', 'Test tools and environments supporting testing.']],
      tips: ['Draw the architecture once from memory: front-end → back-end (auth, retrieval, prompt prep, post-processing) → LLM, with relational + vector databases.', 'Know what each LLMOps approach worries about.'],
      traps: ['Don’t say RAG “trains” the model or needs manual query refining.', 'Overfitting is a fine-tuning challenge to be mitigated, not something fine-tuning removes.', 'Verification is never eliminated, even with autonomous agents.']
    },
    5: {
      summary: 'Adoption: shadow AI, strategy, model selection, phases, skills, team capability building and changing roles. 7 questions, 7 points: 4 × K1, 3 × K2.',
      sections: [
        { id: 'shadow', title: 'Risks of shadow AI (GenAI-5.1.1 · K1)', bullets: [
          '<b>Shadow AI</b> = using GenAI tools without formal approval or oversight.',
          'Risks: <b>information security and data privacy</b> weaknesses (breaches) · <b>compliance and regulatory</b> issues · <b>vague intellectual property</b> (unclear licences, copyrighted data).',
          'A strategy and deployment steps help organisations avoid it.'
        ] },
        { id: 'strategy', title: 'Key aspects of a GenAI strategy (GenAI-5.1.2)', bullets: [
          'Measurable <b>test objectives</b> (productivity, shorter cycles, quality).',
          'Right <b>LLM selection</b>, compatible with existing test infrastructure and scalable.',
          '<b>Data quality</b> – accurate, relevant input data, protected by robust security procedures.',
          'Comprehensive <b>training</b> (technical and ethical).',
          '<b>Metrics</b> specific to test tasks (Section 2.3.1).',
          '<b>Process guidelines</b>: rules for sensitive data, transparency (what was AI-generated), quality gates with review of generated testware; compliance with regulations and ethics.'
        ] },
        { id: 'select', title: 'Selecting LLMs/SLMs (GenAI-5.1.3)', bullets: [
          '<b>Model performance</b> on target test tasks vs the organisation’s benchmarks, using the Section 2.3.1 metrics (few benchmarks are test-specific).',
          '<b>Fine-tuning potential</b>.',
          '<b>Recurring cost</b> – licensing fees and operational expenses (e.g. usage priced per token) vs budget.',
          '<b>Community and support</b> – active community, documentation.',
          'Also consider capabilities (multimodal, reasoning), context window size, licence type (commercial vs open source).',
          'Cost exercise inputs: tokens in/out, prompts, task frequency, vendor pricing models (incl. one open-source model).'
        ] },
        { id: 'phases', title: 'Three adoption phases (GenAI-5.1.4 · K1)', table: { head: ['#', 'Phase', 'Focus'], rows: [
          ['1', 'Discovery', 'Awareness, capability building: train teams, give access to LLMs/SLMs, experiment with first use cases'],
          ['2', 'Initiation and usage definition', 'Identify and prioritise use cases, evaluate LLM-powered infrastructure, build expertise, align to needs'],
          ['3', 'Utilization and iteration', 'Full integration, continuous monitoring, measure and manage the transformation for sustainable benefit and scale']
        ] }, bullets: ['Phases can run in parallel for different use cases. Address fear of job displacement early.'] },
        { id: 'skills', title: 'Skills &amp; knowledge (GenAI-5.2.1)', bullets: [
          'Prompt engineering, understanding <b>context windows</b>, <b>test review methods</b> for AI-generated testware.',
          'Domain and test expertise combined with AI skills.',
          'Key competencies: <b>assessing LLM capabilities</b>, prompt refinement, evaluating AI testware.',
          'Know inherent risks and mitigations; <b>data sanitisation</b> (remove/mask sensitive data) and privacy-preserving prompting.',
          'Environmental awareness: right-sized models, balance benefits vs cost and energy.'
        ] },
        { id: 'capability', title: 'Building capabilities in teams (GenAI-5.2.2 · K1)', bullets: [
          'Hands-on practice with various LLMs/SLMs, structured learning paths, guided exercises, <b>peer learning</b>, gradual integration into daily tasks (not big-bang).',
          'Progress from basic prompts to test-specific prompts; use <b>prompt patterns</b> (reusable templates).',
          '<b>Communities of practice</b> share successes, challenges, prompt pattern libraries and lessons learned.'
        ] },
        { id: 'roles', title: 'Evolving test processes and roles (GenAI-5.2.3 · K1)', bullets: [
          '<b>Testers</b> become AI-assisted test specialists: guide and verify AI-generated testware, review overall AI output, refine prompts, maintain prompt libraries.',
          '<b>Test managers</b> add: AI-based test strategy, AI-based risk management, monitoring and control of AI-based test processes, AI governance, balancing human and AI capabilities, coordinating hybrid teams of people and GenAI agents.',
          'Managers also ensure their teams keep both traditional testing competence and AI literacy, and monitor and control AI-based test processes.'
        ] }
      ],
      terms: [['Shadow AI', 'Use of GenAI tools or systems in an organisation without formal approval or oversight.'], ['Small language model (SLM)', 'Intentionally small model balancing efficiency and task-specific language understanding.'], ['Prompt pattern', 'Reusable prompt template that guides GenAI to consistent output.'], ['Community of practice', 'Internal group sharing GenAI know-how, prompts and lessons.']],
      tips: ['Memorise the three phases in order and one activity for each.', 'Chapter 5 is mostly K1: learn the lists (3 shadow-AI risks, 4 selection criteria, 3 phases).'],
      traps: ['Relying only on theory courses or “experiment alone” is not the recommended capability-building approach.', 'Selecting a model needs benchmarks tailored to test tasks, not full compatibility with public community benchmarks.']
    }
  },
  // Flashcards. k:'K1' = recall objectives (GenAI-1.1.1, 3.1.1, 3.1.4, 3.4.1, 5.1.1, 5.1.4, 5.2.2, 5.2.3); k:'List' = key lists worth memorising.
  flash: [
    { ch: 1, k: 'K1', lo: 'GenAI-1.1.1', f: 'Symbolic AI', b: 'Rule-based system that mimics human decision-making; knowledge is represented with symbols and logical rules.' },
    { ch: 1, k: 'K1', lo: 'GenAI-1.1.1', f: 'Classical machine learning', b: 'Data-driven approach needing data preparation, feature selection and model training. Test uses: defect categorisation, predicting software problems.' },
    { ch: 1, k: 'K1', lo: 'GenAI-1.1.1', f: 'Deep learning', b: 'Uses neural networks to automatically learn features from large, complex data (images, video, audio, text).' },
    { ch: 1, k: 'K1', lo: 'GenAI-1.1.1', f: 'Generative AI', b: 'Uses deep learning to create new content (text, images, code) by learning and mimicking patterns from its training data.' },
    { ch: 1, k: 'K1', lo: 'GenAI-1.1.1', f: 'The four AI types, in order', b: 'Symbolic AI → classical machine learning → deep learning → generative AI.' },
    { ch: 1, k: 'K1', lo: 'GenAI-1.1.1', f: 'Key advantage of GenAI for testing?', b: 'Pre-trained models can be applied directly to test tasks without an additional training phase – but with risks (hallucinations etc.).' },
    { ch: 3, k: 'K1', lo: 'GenAI-3.1.1', f: 'Hallucination', b: 'LLM output that appears factually incorrect or irrelevant to the task – e.g. fictitious test cases or tests for non-existent acceptance criteria.' },
    { ch: 3, k: 'K1', lo: 'GenAI-3.1.1', f: 'Reasoning error', b: 'LLM misinterprets logical structures (cause/effect, conditions, step-by-step logic) and reaches wrong conclusions. LLMs use pattern matching, not true logic.' },
    { ch: 3, k: 'K1', lo: 'GenAI-3.1.1', f: 'Bias (in LLM output)', b: 'Skew inherited from training data that favours certain information, approaches or assumptions – e.g. under-representing non-English perspectives.' },
    { ch: 3, k: 'K1', lo: 'GenAI-3.1.1', f: 'Test tasks where LLMs often make reasoning errors', b: 'Test planning and test case prioritisation (also estimation and mathematical reasoning).' },
    { ch: 3, k: 'K1', lo: 'GenAI-3.1.4', f: 'Two ways to reduce LLM output variability', b: '1) Lower the temperature. 2) Set a random seed (where the implementation allows). Reproducibility is still never guaranteed.' },
    { ch: 3, k: 'K1', lo: 'GenAI-3.1.4', f: 'Downside of a low temperature', b: 'Less creativity and diversity – outputs become more repetitive or overly deterministic.' },
    { ch: 3, k: 'K1', lo: 'GenAI-3.4.1', f: 'ISO/IEC 42001:2023', b: 'Standard: requirements for an AI management system within an organisation – promotes consistency and reliability of GenAI use in testing.' },
    { ch: 3, k: 'K1', lo: 'GenAI-3.4.1', f: 'ISO/IEC 23053:2022', b: 'Standard: framework for AI systems using machine learning – lifecycle, safety, transparency, data quality.' },
    { ch: 3, k: 'K1', lo: 'GenAI-3.4.1', f: 'EU AI Act', b: 'Regulation: legal framework classifying AI applications by risk level – transparency, accountability, bias mitigation.' },
    { ch: 3, k: 'K1', lo: 'GenAI-3.4.1', f: 'NIST AI Risk Management Framework', b: 'US framework for managing AI risks – fairness, transparency, security.' },
    { ch: 5, k: 'K1', lo: 'GenAI-5.1.1', f: 'Shadow AI', b: 'Use of GenAI tools or systems in an organisation without formal approval or oversight.' },
    { ch: 5, k: 'K1', lo: 'GenAI-5.1.1', f: 'Three risks of shadow AI', b: '1) Information security and data privacy weaknesses. 2) Compliance and regulatory issues. 3) Vague intellectual property (unclear licences, copyrighted data).' },
    { ch: 5, k: 'K1', lo: 'GenAI-5.1.4', f: 'Three phases of adopting GenAI', b: '1) Discovery → 2) Initiation and usage definition → 3) Utilization and iteration.' },
    { ch: 5, k: 'K1', lo: 'GenAI-5.1.4', f: 'Phase 1 – Discovery', b: 'Awareness and capability building: train teams, provide access to LLMs/SLMs, experiment with initial use cases.' },
    { ch: 5, k: 'K1', lo: 'GenAI-5.1.4', f: 'Phase 2 – Initiation and usage definition', b: 'Identify and prioritise practical use cases, evaluate LLM-powered test infrastructure, develop expertise, align with organisational needs.' },
    { ch: 5, k: 'K1', lo: 'GenAI-5.1.4', f: 'Phase 3 – Utilization and iteration', b: 'Fully integrate GenAI into test processes; continuous monitoring; measure and manage the transformation for sustainable, scalable benefit.' },
    { ch: 5, k: 'K1', lo: 'GenAI-5.2.2', f: 'How to build GenAI capability in test teams', b: 'Hands-on practice with various LLMs/SLMs, structured learning paths, guided exercises, peer learning, gradual integration, internal communities of practice.' },
    { ch: 5, k: 'K1', lo: 'GenAI-5.2.2', f: 'Prompt pattern', b: 'A reusable template for crafting effective prompts that guides GenAI toward consistent, reliable outputs.' },
    { ch: 5, k: 'K1', lo: 'GenAI-5.2.3', f: 'How the tester’s role evolves', b: 'From test design/execution specialist to AI-assisted test specialist: guide and verify AI-generated testware, review AI output, refine prompts, maintain prompt libraries.' },
    { ch: 5, k: 'K1', lo: 'GenAI-5.2.3', f: 'How the test manager’s role evolves', b: 'AI-based test strategy and risk management, monitoring and control of AI-based processes, AI governance, balancing human and AI, leading hybrid teams with GenAI agents.' },
    { ch: 2, k: 'List', lo: 'GenAI-2.1.1', f: 'The six prompt components', b: 'Role · Context · Instruction · Input data · Constraints · Output format.' },
    { ch: 2, k: 'List', lo: 'GenAI-2.1.2', f: 'Three core prompting techniques', b: 'Prompt chaining (steps + verification) · Few-shot prompting (examples) · Meta prompting (AI creates/refines prompts).' },
    { ch: 2, k: 'List', lo: 'GenAI-2.1.2', f: 'Zero-shot vs one-shot vs few-shot', b: 'Zero-shot: no example. One-shot: one example. Few-shot: more than one example.' },
    { ch: 2, k: 'List', lo: 'GenAI-2.3.1', f: 'The seven evaluation metrics', b: 'Accuracy · Precision · Recall · Relevance and contextual fit · Diversity · Execution success rate · Time efficiency.' },
    { ch: 2, k: 'List', lo: 'GenAI-2.3.2', f: 'Five prompt-refinement techniques', b: 'Iterative modification · A/B testing · Output analysis · Integrating user feedback · Adjusting prompt length and specificity.' },
    { ch: 2, k: 'List', lo: 'GenAI-2.2.5', f: 'Which technique when?', b: 'Prompt chaining: complex, precise, verified steps. Few-shot: repetitive or fixed-format output. Meta prompting: flexible/new tasks, crafting prompts.' },
    { ch: 3, k: 'List', lo: 'GenAI-3.2.2', f: 'Four attack vectors (v1.1 names)', b: 'Context Manipulation · Request manipulation · Data poisoning · Malicious code generation.' },
    { ch: 3, k: 'List', lo: 'GenAI-3.1.2', f: 'Detection approaches', b: 'Hallucinations: cross-verification, expert consultation, consistency checks. Reasoning errors: logical validation, output testing. Bias: review testware/data representativeness and under-represented test types.' },
    { ch: 3, k: 'List', lo: 'GenAI-3.2.3', f: 'Privacy &amp; security mitigations', b: 'Data minimisation · anonymisation/pseudonymisation · secure storage and transmission · training · human review · compare LLMs · secure environment · audits · stay updated.' },
    { ch: 1, k: 'List', lo: 'GenAI-1.2.1', f: 'Seven key LLM capabilities for test tasks', b: 'Requirements analysis · test case creation · test oracle generation · test data generation · test automation support · test result analysis · testware creation.' },
    { ch: 4, k: 'List', lo: 'GenAI-4.1.2', f: 'RAG process order', b: 'Chunk documents → clean/process → embed and store in vector DB → retrieve by similarity → generate with LLM.' },
    { ch: 4, k: 'List', lo: 'GenAI-4.2.2', f: 'Three LLMOps approaches', b: 'Using an AI chatbot · using a test tool with GenAI capabilities · in-house development of a GenAI test tool.' },
    { ch: 4, k: 'List', lo: 'GenAI-4.2.1', f: 'Fine-tuning challenges', b: 'Need high-quality task-specific data · overfitting · opacity · significant computational resources.' },
    { ch: 5, k: 'List', lo: 'GenAI-5.1.3', f: 'LLM/SLM selection criteria', b: 'Model performance · fine-tuning potential · recurring cost · community and support.' }
  ],
  guide: {
    callout: { h: 'Why Chapter 2 matters', x: 'The 6 K3 questions are worth 12 of 46 points (26%) and 5 of them sit in Chapter 2 – hands-on prompt practice is critical.' },
    kLevels: [
      ['K1', 'Memorisation', '8 questions', '1 point each', 'Flashcards, glossary, lists (3 phases, 4 attack vectors, 6 prompt components).'],
      ['K2', 'Comprehension', '26 questions', '1 point each', 'Focus on “why/how concepts differ”: chaining vs few-shot vs meta, chatbot vs application.'],
      ['K3', 'Application', '6 questions', '2 points each (12 points)', 'Write and evaluate real prompts; identify hallucinations in sample output. 5 of 6 are Chapter 2.']
    ],
    time: [
      'You have 60 minutes for 40 questions (75 min if the exam is not in your native language) – about 1.5 minutes per question on average.',
      'Spend ~1 minute on K1, 1–2 on K2 and about 3 on K3 questions.',
      'Pass 1: answer everything you are confident about (≈ 40 min). Flag the rest. Pass 2: return to flagged questions (≈ 15 min). Leave 5 minutes to make sure nothing is left unanswered (check your exam provider’s rules on negative marking – the ISTQB rules document sets only the pass mark).'
    ],
    technique: [
      'Read the <b>last line first</b> (what is being asked), then the scenario.',
      'Beware absolutes: “always”, “never”, “eliminates”, “prevents”, “fully automates” are usually wrong; the syllabus talks about <b>mitigating</b> risks and keeping <b>human oversight</b>.',
      'For “i–v” statement questions, judge each statement true/false first, then find the matching option.',
      'Multi-select (“choose TWO”) questions: select exactly two. Check your exam provider’s rules on partial credit – the ISTQB rules only set the 65% pass mark.',
      'Eliminate two options first; then compare the remaining two against the syllabus wording.',
      'Use exact syllabus terms: <b>Context Manipulation</b> (not data exfiltration), <b>one-shot</b>, <b>instruction-tuned</b>, <b>LLMOps</b>.'
    ],
    plan: [
      ['Week 1', 'Chapters 1 and 2 (study notes → chapter tests). Do the six prompt components and three techniques until automatic. Write 10 real prompts yourself in any chatbot.'],
      ['Week 2', 'Chapters 3, 4 and 5. Daily: flashcards (15 min) + one chapter set. Take the Weak-Areas Drill every second day.'],
      ['Week 3', 'Mocks: ISTQB sample exam in exam mode, then Mocks 1–3. Review <i>every</i> explanation. Target ≥ 80% twice in a row.'],
      ['Last 2 days', 'Retry My Mistakes, flashcards, the K3 chapter-2 sets, exam guide. Rest the evening before.']
    ],
    checklist: ['Check ID and booking confirmation; know whether your exam is online-proctored or at a centre.', 'Test your equipment and room if remote.', 'Know your time plan (two passes, 5-minute check).', 'Sleep, water, calm – you only need 30 of 46 points.']
  }
};

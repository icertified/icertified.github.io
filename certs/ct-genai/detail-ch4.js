/* CT-GenAI in-depth notes (own words) */
(window.ICDETAIL = window.ICDETAIL || {});
(window.ICDETAIL['ct-genai'] = window.ICDETAIL['ct-genai'] || {})[4] = {
  'arch': {
    paras: [
      'A <b>test infrastructure</b> is the set of tools and environments that support testing. An <b>LLM-powered test infrastructure</b> is one where a large language model is built into the test process to help with automation, reasoning and decisions. It differs from a plain chatbot (see 1.2.2): a chatbot is mainly about conversation, while an LLM-powered test tool is designed to handle test-related queries, analyse requirements, generate test cases and evaluate outputs.',
      'The typical design has several cooperating components. The <b>front-end</b> is the user interface where testers type queries or commands. The <b>back-end</b> does the real work around the model: it handles <i>authentication</i>, <i>data retrieval</i>, <i>prompt preparation</i> (turning the tester’s request plus retrieved data into a well-structured prompt) and the <i>interaction with the LLM</i>. The <b>LLM</b> itself can be a third-party service reached through an API, or a custom in-house model; it produces answers from the structured prompts it receives.',
      'This goes beyond a classic client-server picture in four ways. (1) The LLM is not just a server; it is an intelligent processing component that interprets and reasons about testware. (2) Unlike rule-based chatbots with scripted answers, it creates test insights dynamically from context such as requirements, code or test results. (3) The back-end draws on several <b>data sources</b>: <i>relational databases</i> for structured testing data (for example stored test cases) and <i>vector databases</i> for semantic retrieval of related content through embeddings (explained in 4.1.2). (4) The back-end performs <b>post-processing</b> of the raw LLM output so that it fits the test conditions of the process before it is shown in the front-end.',
      'Why this matters for the exam: you should be able to say which component does what, and recognise where concerns sit. Authentication and data access are back-end duties; prompt preparation and post-processing sit around the model, not inside the front-end.'
    ],
    blocks: [
      { t: 'good', h: 'Example', x: 'A tester types "create test cases for story US-142" in the web UI (front-end). The back-end checks the user’s rights, fetches US-142 and similar older stories from the databases, builds a prompt with a fixed output template, calls the LLM API, then post-processes the answer (for instance converting it to the test management tool’s import format and dropping malformed rows) before the UI displays it.' },
      { t: 'warn', h: 'Exam trap', x: 'A vector database is for semantic similarity search over embeddings; a relational database holds structured records such as test cases. The LLM does not authenticate users or fetch data on its own; the back-end does.' }
    ]
  },

  'rag': {
    paras: [
      '<b>Retrieval-Augmented Generation (RAG)</b> improves an LLM’s answers by letting it use extra data sources while generating a response. The model was trained on general data up to some date and knows nothing about your company’s latest requirements. RAG fixes that without changing the model: relevant information is looked up first and handed to the model as context, so answers are more relevant and accurate and are grounded in real material rather than only the model’s memory.',
      '<b>Preparation phase (before any question).</b> Large documents are split into smaller <i>chunks</i>, for example 256 to 512 tokens, so retrieval is focused and chunks fit into the context window. Each chunk is cleaned and processed and then converted by a pre-trained model into a high-dimensional numeric vector called an <i>embedding</i>, which captures meaning. These embeddings are stored in a <b>vector database</b>, which supports fast similarity-based search.',
      '<b>Query phase (at run time, inference).</b> The user’s question is encoded in the same way, and the process has two steps. <b>1. Retrieval</b>: the system finds chunks whose embeddings are semantically closest to the question. <b>2. Generation</b>: the retrieved chunks are passed to the LLM, which combines its own knowledge with this fresh information to write a grounded answer.',
      'In testing, RAG lets an LLM-powered infrastructure reach enterprise sources such as documentation, databases and repositories, so tasks like test analysis and test design stay aligned with the latest specifications, requirements and existing test data.',
      'Note what RAG is not: it does <b>not</b> retrain or change the model weights (that would be fine-tuning, 4.2.1). Its quality depends on the quality of the stored material and on retrieving the right chunks, which is also what the hands-on exercise explores by comparing answers with and without RAG.'
    ],
    list: [
      'Order: chunk, clean, embed, store (preparation); then retrieve, generate (per query).',
      'Retrieval is typically based on semantic similarity between the embeddings of the query and of the chunks.'
    ],
    blocks: [
      { t: 'good', h: 'Worked example', x: 'Your company keeps 300 pages of API specifications that change monthly. They are chunked, embedded and stored. A tester asks: "Which fields are mandatory in the refund endpoint?" The query is embedded, the three closest chunks (the refund section) are retrieved and given to the LLM, which answers from the current specification. Without RAG the model might describe a generic, outdated or invented refund API.' },
      { t: 'warn', h: 'Exam trap', x: 'RAG supplies information as context at question time; it does not train the model. Chunking happens in preparation, not when the user asks. Retrieval comes before generation.' }
    ]
  },

  'agents': {
    paras: [
      'An <b>LLM-powered agent</b> is a GenAI application built around an LLM and designed to process defined tasks semi-autonomously or autonomously. The LLM provides understanding and generation of natural language, and the agent adds the ability to process instructions, retrieve context and take intelligent actions.',
      'The defining difference from an ordinary chatbot, which just answers questions, is that an agent can <b>act</b>. It does so by invoking a predefined set of functions, called <b>tools</b>, which let it interact with and change external systems (for example querying a test management tool, running a test suite or creating a defect). That makes agents flexible in carrying out tasks.',
      'The degree of autonomy varies. <b>Autonomous agents</b> work independently with minimal human intervention, using predefined rules, reinforcement learning and adaptive feedback loops. <b>Semi-autonomous agents</b> carry out tasks but have periodic human oversight to confirm that the result meets the goals the user set.',
      '<b>Multi-agent architectures</b> combine several agents with specialised roles that communicate and coordinate to solve complex problems more efficiently than one agent alone. This coordination is called <b>orchestration</b>.',
      'In modern test tools, agents are often exposed to users through AI assistants within the testing workflow. Starting from user stories or requirements they can support the whole lifecycle semi-autonomously: test analysis, design, implementation, execution and reporting. The result is a continuous, end-to-end flow that cuts manual effort and shortens feedback cycles, and test automation shifts from <i>script-based</i> execution to <i>goal-driven, agent-based</i> automation.',
      'The catch: agents inherit the weaknesses of LLMs, namely hallucinations, reasoning errors and biases (3.1), so they can deliver wrong or misleading results and weaken the reliability of automated test processes. Two mitigations are named: <b>automated verification</b> of the agent’s results, and using <b>semi-autonomous</b> agents for critical tasks.'
    ],
    blocks: [
      { t: 'good', h: 'Example', x: 'A multi-agent set-up: an analysis agent reads the user story and proposes test conditions, a design agent derives test cases, an implementation agent writes automation code, and an execution agent runs it and files results, with an orchestrator passing work between them. For release-blocking decisions the team keeps the agent semi-autonomous so a tester approves each important step.' },
      { t: 'warn', h: 'Exam trap', x: 'Autonomy does not remove the need for verification, and an agent is not just a chatbot with a nicer interface: tool use (acting) is the key feature. Orchestration refers to coordinating multiple agents.' }
    ]
  },

  'ft': {
    paras: [
      '<b>Fine-tuning</b> takes a pre-trained language model (an LLM or a Small Language Model, SLM, see 1.1.2) and trains it further on a targeted dataset so that it learns domain-specific knowledge and nuances. Afterwards it performs better, being more accurate and relevant, for a specialised application. Unlike RAG, fine-tuning actually changes the model itself.',
      'It is a good fit when you want to equip a generic model with specialised reasoning for a field, or to make it use vocabulary unique to that field. It can also be applied to SLMs, which need fewer resources; a fine-tuned SLM can reach strong performance on a narrow task without the heavy computing load an LLM would impose. So both model sizes are legitimate choices depending on task needs.',
      'A testing example from the syllabus: fine-tune an LLM or SLM to produce test cases from user stories in an output format specific to your organisation. By training on your own user stories paired with the corresponding test cases, the model adopts your test process and terminology.',
      'Four <b>challenges</b> must be managed. (1) <b>Data quality</b>: use high-quality, task-specific training data, otherwise you teach the model biased or inaccurate behaviour. (2) <b>Overfitting</b>: the model becomes too specialised in its training data and does worse on new, unseen data, so you must work to keep it generalising across scenarios. (3) <b>Opacity</b>: it is not transparent how the model reaches its outputs, which makes debugging and validation harder. (4) <b>Computational resources</b>: fine-tuning, especially of LLMs, needs a lot of compute.',
      'The related demonstration walks through selecting a model, preparing a dataset for the test task, using a framework to fine-tune, and then judging the output quality, with special attention to training data quality.'
    ],
    blocks: [
      { t: 'good', h: 'Worked example', x: 'A bank has 5,000 approved pairs of user story and test case in its own template. It fine-tunes an SLM on these. The model now writes cases with the bank’s field names and step style without long prompts. If the data included many poor cases, the model would copy those flaws (data quality); if it only saw payment stories, it might fail on a reporting story (overfitting).' },
      { t: 'warn', h: 'Exam trap', x: 'Fine-tuning is a challenge-laden process: it does not remove overfitting or opacity, it requires you to mitigate or manage them. Do not mix it up with RAG, which leaves the model unchanged and just feeds it retrieved context.' }
    ]
  },

  'llmops': {
    paras: [
      '<b>LLMOps</b> (Large Language Model Operations) is the set of practices, tools and processes that streamline the development, deployment and maintenance of LLMs in production. It is the operational side of a working LLM-powered test infrastructure, and its decisions involve concerns such as privacy, security and cost.',
      'The way an organisation uses GenAI in testing determines which LLMOps decisions matter. The syllabus describes <b>three approaches</b>.',
      '<b>1. Using an AI chatbot.</b> The main considerations are managing data privacy and security risks while keeping costs under control. An organisation may use an LLM-as-a-Service platform if the provider gives the necessary assurances, or run its own infrastructure with open-source licensed LLMs for more control. Either way, vendor assurances or internal capabilities need rigorous assessment (see 3.2).',
      '<b>2. Using a test tool with GenAI capabilities.</b> Similar concerns apply (privacy, security, running costs), plus the need to evaluate the data security and performance assurances of the tool vendor. Since such tools usually complement existing test processes, a thorough cost-benefit analysis and risk assessment is expected.',
      '<b>3. In-house development of a GenAI-based test tool.</b> This gives the most control over privacy and security but demands careful planning of AI resources: compute, data storage and staff training. The organisation must also set up structured processes to validate and maintain GenAI-specific developments, and needs real expertise to implement and deploy an LLM-powered test infrastructure.',
      'The approaches are <b>not mutually exclusive</b>. A company may use a chatbot for some tasks and custom tools for others at the same time, and any of them can be extended with technologies such as RAG and fine-tuning of LLMs/SLMs to make the test processes more effective and adaptable.'
    ],
    table: { head: ['Approach', 'Key LLMOps concerns'], rows: [
      ['AI chatbot', 'Privacy and security, cost; LLM-as-a-Service with assurances or in-house open-source LLM'],
      ['Test tool with GenAI capabilities', 'Vendor data security and performance assurances; cost-benefit and risk assessment'],
      ['In-house tool', 'Full control; compute, storage, training; validation and maintenance processes; expertise']
    ] },
    blocks: [
      { t: 'good', h: 'Example', x: 'A company lets testers use an approved chatbot for drafting test ideas (approach 1), buys a test automation tool with built-in GenAI for script generation (approach 2) after checking the vendor’s data handling, and builds a small in-house RAG assistant over its own requirements (approach 3). All three run in parallel, which is allowed.' },
      { t: 'warn', h: 'Exam trap', x: 'Match the concern to the approach: "vendor assurances of the test tool" belongs to approach 2, "compute, storage and staff training" to the in-house approach. LLMOps is about operating LLMs in production, not about prompt wording.' }
    ]
  }
};

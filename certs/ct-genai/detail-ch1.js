/* CT-GenAI in-depth notes (own words) */
(window.ICDETAIL = window.ICDETAIL || {});
(window.ICDETAIL['ct-genai'] = window.ICDETAIL['ct-genai'] || {})[1] = {
  'spectrum': {
    paras: [
      'Artificial intelligence is an umbrella term, and the syllabus asks you to <b>recall</b> (K1) four families that sit under it. The easiest way to keep them apart is to ask one question about each: <i>where does the “intelligence” come from?</i>',
      'In <b>symbolic AI</b> a human writes it down. Knowledge is expressed as symbols plus logical rules (if this condition holds, conclude that), and the system mimics human decision-making by following them. Nothing is learned from data, so the behaviour is predictable but only as good as the rules someone wrote.',
      'In <b>classical machine learning</b> the intelligence comes from data, but a person still prepares that data, chooses the <i>features</i> (the measurable properties the model looks at) and runs a training step. The syllabus names defect categorisation and predicting software problems as typical test uses.',
      'In <b>deep learning</b> the model is a neural network that works out useful features by itself from very large, complex data such as images, audio or text. People are not removed from the loop completely, because data still has to be annotated, models tuned and results validated.',
      '<b>Generative AI</b> builds on deep learning to <i>create new content</i> (text, images, code) by learning patterns from its training data and reproducing similar ones. LLMs belong here. Their big practical advantage for testers is that they arrive <b>pre-trained</b>: you can aim them at a test task straight away, with no training project of your own. The price is the set of risks covered in Chapter 3.'
    ],
    blocks: [
      { t: '', h: 'Example', x: 'A team wants to sort incoming defect reports. A hand-written rule such as “title contains ‘timeout’ means performance” is <b>symbolic</b>. Training a classifier on 5,000 labelled past defects, after choosing features like component and keywords, is <b>classical ML</b>. A network that learns from raw report text without hand-picked features is <b>deep learning</b>. Asking a chatbot to draft a clear defect report from raw notes is <b>generative AI</b>.' },
      { t: 'warn', h: 'Exam trap', x: 'Do not say generative AI needs no data or no human involvement. The point is that <i>you</i> need no extra training phase because the model is already pre-trained. Also keep the order in mind: symbolic (rules), classical ML (hand-chosen features), deep learning (learned features), GenAI (new content).' }
    ]
  },

  'llm-basics': {
    paras: [
      'An LLM (large language model) is a generative model built on the <b>generative pre-trained transformer</b> design and trained on huge text collections such as books, articles and websites. A <b>small language model (SLM)</b> follows the same idea with far fewer parameters, giving a lighter and more focused solution.',
      'Computers need numbers, so two steps translate language. <b>Tokenization</b> cuts text into <i>tokens</i>: pieces that may be a single character, part of a word or a whole word. <b>Embeddings</b> then convert each token into a vector (a list of numbers) in a high-dimensional space. The vector encodes meaning, grammatical role and surrounding context, and tokens used in similar ways end up close to each other. That closeness is what lets the model relate words and keep track of context.',
      'The <b>transformer</b> is the neural network architecture that looks at long sequences of tokens and learns how they relate to one another. At <b>inference</b> time (when you actually use the model) it predicts the next token, appends it, and repeats. The result is text that is <i>statistically plausible</i> given training and prompt. Plausible does not equal correct, which is the root of hallucination (Chapter 3).',
      'Because inference is probabilistic and influenced by hyperparameter settings, LLMs are <b>non-deterministic</b>: the same prompt can produce different answers on different runs.',
      'The <b>context window</b> is the amount of preceding text, counted in tokens, that the model can take into account when producing its answer. Bigger windows help coherence over long material, for instance a large test log, but cost more computation and processing time.'
    ],
    blocks: [
      { t: '', h: 'Worked example', x: 'You paste a 2,000-line CI log and ask for the root cause of a failure. The log is split into tokens; if it exceeds the model’s context window, the earliest part is simply not considered, so the answer may ignore the real cause. Run the same prompt twice and the wording of the diagnosis may differ, because the model samples tokens probabilistically. Practical reaction: check the token count (the hands-on objective HO-1.1.2), trim to relevant sections, and verify the answer against the log.' },
      { t: 'warn', h: 'Exam trap', x: 'Tokenization splits text into units; embeddings turn those units into meaningful numeric vectors. They are not synonyms. Also, a larger context window is not “free”: it raises computational complexity and processing time.' }
    ]
  },

  'llm-types': {
    paras: [
      'LLMs go through progressively more specialised training stages, and the syllabus uses the outcome to separate three categories. Think of it as a ladder where each rung is built on the one below.',
      '<b>Foundation LLMs</b> are the base: general-purpose models trained on vast and varied data (text, code, images and more). They are powerful and flexible across many domains, but on their own they usually need further adaptation before they handle a specific task well.',
      '<b>Instruction-tuned LLMs</b> start from a foundation model and are fine-tuned on data that pairs prompts with the responses you would want. The tuning improves task adherence, instruction following and coherence, so the model reacts to what the user actually asks. They are sometimes called non-reasoning models.',
      '<b>Reasoning LLMs</b> go one step further. They are trained or fine-tuned on carefully chosen tasks that demand logical inference, multi-step problem solving, intermediate reasoning steps (chain-of-thought) and synthesis of complex information. They suit high-cognitive-load work, including technical domains.',
      'In testing, both instruction-tuned and reasoning models are used. The choice depends on how much reasoning the task demands, not on which one is “newer”.'
    ],
    table: {
      head: ['Type', 'Built from', 'Typical test fit'],
      rows: [
        ['Foundation', 'Broad pre-training on vast data', 'Base for further adaptation; rarely the direct choice for a specific test task'],
        ['Instruction-tuned', 'Foundation model fine-tuned on prompt/response pairs', 'Well-defined tasks: reformatting test cases, filling a template, drafting a report'],
        ['Reasoning', 'Instruction-tuned model further trained for multi-step reasoning', 'Tasks with several interacting criteria: prioritising a suite with risks and dependencies, analysing trends']
      ]
    },
    blocks: [
      { t: '', h: 'Example', x: 'Converting 30 test cases into a fixed CSV layout is mostly instruction following, so an instruction-tuned model is a sensible fit. Deciding the execution order of 200 tests given risk ratings and dependencies between them requires weighing several factors in sequence, which is where a reasoning model earns its place. Either way, the tester verifies the result.' },
      { t: 'warn', h: 'Exam trap', x: 'The chain is foundation → instruction-tuned → reasoning, each derived from the previous. Do not describe a reasoning LLM as a separate, unrelated technology, and do not assume a foundation model is ready to follow instructions without adaptation.' }
    ]
  },

  'multimodal': {
    paras: [
      'A <b>multimodal LLM</b> extends the transformer so that it can take in more than one kind of data, called modalities: text, images, sound and video. It is trained on large, varied datasets so it learns how the different kinds of data relate. To make that work, tokenization is adapted to every modality. For images, for instance, a vision-language component converts the picture into embeddings that the transformer can process alongside text tokens.',
      '<b>Vision-language models</b> are a <i>subset</i> of multimodal LLMs. They specialise in combining visual and written information, for tasks such as captioning an image, answering questions about it, or judging whether a picture and a piece of text are consistent.',
      'For testers this matters because a lot of test input is not text. Screenshots, GUI wireframes and diagrams carry requirements and evidence. A multimodal model can read them together with the written material (user stories, defect reports) and point out where the real screen differs from what was expected. It can also help produce richer test cases that use both textual data and visual clues, which can improve coverage.',
      'The learning objective is K2 (summarise the principles), and the matching hands-on objective (HO-1.1.4) has you run a prompt that combines text and an image.'
    ],
    blocks: [
      { t: 'good', h: 'Example', x: 'You upload a screenshot of the checkout page and the text of defect report “Total is not updated after applying coupon”. You ask the model to compare what the screenshot shows with the report and list discrepancies. It may notice that the coupon line is displayed but the total still shows the old value. You then confirm this on the real application before logging anything.' },
      { t: 'warn', h: 'Exam trap', x: 'Direction of the subset relationship: vision-language models are a subset of multimodal LLMs, not the other way round. Multimodal also does not mean error-free; image interpretation still needs human checking.' }
    ]
  },

  'capabilities': {
    paras: [
      'LLMs are strongest where the work is language, code or images: reading, summarising, translating, answering questions, generating coherent text and code, and analysing screenshots when the model is multimodal. The syllabus maps this to seven capabilities across the test process. For each one, remember the verb it describes.',
      '<b>Requirements analysis and improvement</b>: examine the test basis for ambiguity, inconsistency and missing information, and generate questions to ask stakeholders. <b>Test case creation support</b>: propose test objectives and test cases from requirements or user stories. <b>Test oracle generation</b>: suggest expected results (the oracle is whatever tells you what the correct outcome is). <b>Test data generation</b>: produce datasets, boundary values and combinations.',
      '<b>Test automation support</b>: create scripts from test case descriptions and improve existing ones by suggesting changes and fitting test techniques. <b>Test result analysis</b>: summarise results and classify anomalies by severity and priority. <b>Testware creation</b>: draft and maintain documents such as test plans, test reports and defect reports as the project changes.',
      'The common thread is that the model <i>supports</i> a skilled person. It drafts, suggests and summarises; the tester decides, because outputs can be wrong (Chapter 3).'
    ],
    blocks: [
      { t: '', h: 'Example', x: 'Requirement: “The system should respond quickly to search.” Asked to analyse it, an LLM can flag “quickly” as unmeasurable and propose clarifying questions (what response time, under what load, for which data volume?). That is requirements analysis. Asked afterwards for sample inputs around an agreed 2-second limit, it is doing test data generation. A tester reviews both.' },
      { t: 'warn', h: 'Exam trap', x: 'Match the capability to its description. “Generate expected results” is oracle generation, not test case creation. “Classify anomalies by severity and priority” is result analysis. Be careful with claims that go beyond the list, such as an LLM independently owning the whole testing job or guaranteeing complete, correct output.' }
    ]
  },

  'interaction': {
    paras: [
      'The syllabus describes two complementary ways for test professionals, in any role, to use GenAI: <b>AI chatbots</b> and <b>LLM-powered testing applications</b>. The question to ask is how the LLM is reached and how much structure surrounds it.',
      'An <b>AI chatbot</b> is a conversational interface: you type a question, instruction or prompt and get a context-aware answer straight away. Because you can follow up, you can improve results step by step through <i>prompt chaining</i> (covered in Chapter 2). That makes chatbots good for routine tasks, exploratory work, quick clarification of testing concepts and onboarding new testers. Their simple interface is usable even by non-technical stakeholders, which helps adoption.',
      'An <b>LLM-powered testing application</b> reaches the LLM through APIs and embeds it into a tool or framework. It targets well-defined, often automated tasks, such as generating test cases, analysing defects or synthesising test data, with more customisation and scalability. In more advanced forms, organisations build AI agents for particular testing roles (Chapter 4).',
      'Whichever route you take, results depend on <b>prompt engineering</b>: carefully designed, clear and specific prompts raise the chance that the output is accurate, relevant and aligned with the test objective.'
    ],
    table: {
      head: ['Aspect', 'AI chatbot', 'LLM-powered testing application'],
      rows: [
        ['Access', 'Conversation in natural language', 'LLM called through APIs inside a tool or framework'],
        ['Strength', 'Instant feedback, flexibility, easy for anyone', 'Repeatable, scalable, customised automation of defined tasks'],
        ['Typical use', 'Ad hoc questions, exploration, onboarding, refining a draft', 'Bulk test generation, defect analysis, test data synthesis in the pipeline']
      ]
    },
    blocks: [
      { t: '', h: 'Example', x: 'A new tester asks a chatbot to explain boundary value analysis with a small example and then asks follow-up questions: chatbot use. A test management tool that automatically sends each new user story to an LLM through an API and attaches suggested test conditions to the ticket is an LLM-powered application.' },
      { t: 'warn', h: 'Exam trap', x: 'Neither model removes the need for good prompts. And do not treat them as rivals: the syllabus calls them complementary, each fitting different situations.' }
    ]
  }
};

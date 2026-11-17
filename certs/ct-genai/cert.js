/* ISTQB Certified Tester – Testing with Generative AI (CT-GenAI) – exam definition. Source: Syllabus v1.1,
 * Exam Structures & Rules v1.2 and Exam Structure Tables v1.21. */
(window.ICERT = window.ICERT || {})['ct-genai'] = {
  id: 'ct-genai',
  name: 'Testing with Generative AI',
  short: 'CT-GenAI',
  org: 'ISTQB',
  fullName: 'ISTQB Certified Tester – Testing with Generative AI (Specialist)',
  prerequisite: 'ISTQB Foundation Level (CTFL) certificate',
  exam: {
    questions: 40,
    totalPoints: 46,
    minutes: 60,
    extraPercent: 25,        // extra time when the exam is not in your native language
    passPercent: 65,         // 30 of 46 points
    pointsByK: { K1: 1, K2: 1, K3: 2 },
    mockCount: 5,
    // questions per chapter and K-level in the real exam (Exam Structure Tables v1.21)
    blueprint: {
      1: { K1: 1, K2: 6 },
      2: { K2: 6, K3: 5 },
      3: { K1: 3, K2: 6, K3: 1 },
      4: { K2: 5 },
      5: { K1: 4, K2: 3 }
    }
  },
  chapters: [
    { n: 1, title: 'Introduction to Generative AI for Software Testing', minutes: 100, points: 7, los: [
      { id: 'GenAI-1.1.1', k: 'K1', t: 'Recall different types of AI: symbolic AI, classical machine learning, deep learning, and generative AI' },
      { id: 'GenAI-1.1.2', k: 'K2', t: 'Explain the basics of generative AI and large language models' },
      { id: 'GenAI-1.1.3', k: 'K2', t: 'Distinguish between foundation, instruction-tuned and reasoning LLMs' },
      { id: 'GenAI-1.1.4', k: 'K2', t: 'Write and execute a given prompt addressing a test task using a multimodal LLM model' },
      { id: 'GenAI-1.2.1', k: 'K2', t: 'Give examples of key LLM capabilities for test tasks' },
      { id: 'GenAI-1.2.2', k: 'K2', t: 'Compare interaction models when using GenAI for software testing' }
    ] },
    { n: 2, title: 'Prompt Engineering for Effective Software Testing', minutes: 365, points: 16, los: [
      { id: 'GenAI-2.1.1', k: 'K2', t: 'Give examples of the structure of prompts used in generative AI for software testing' },
      { id: 'GenAI-2.1.2', k: 'K2', t: 'Differentiate core prompting techniques for software testing' },
      { id: 'GenAI-2.1.3', k: 'K2', t: 'Distinguish between system prompts and user prompts' },
      { id: 'GenAI-2.2.1', k: 'K3', t: 'Apply generative AI to test analysis tasks' },
      { id: 'GenAI-2.2.2', k: 'K3', t: 'Apply generative AI to test design and test implementation tasks' },
      { id: 'GenAI-2.2.3', k: 'K3', t: 'Apply generative AI to automated regression testing' },
      { id: 'GenAI-2.2.4', k: 'K3', t: 'Apply generative AI to test monitoring and control task' },
      { id: 'GenAI-2.2.5', k: 'K3', t: 'Select and apply appropriate prompting techniques for a given context and test task' },
      { id: 'GenAI-2.3.1', k: 'K2', t: 'Understand the metrics for evaluating the results of generative AI on test tasks' },
      { id: 'GenAI-2.3.2', k: 'K2', t: 'Give examples of techniques for evaluating and iteratively refining prompts' }
    ] },
    { n: 3, title: 'Managing Risks of Generative AI in Software Testing', minutes: 160, points: 11, los: [
      { id: 'GenAI-3.1.1', k: 'K1', t: 'Recall the definitions of hallucinations, reasoning errors and biases in Generative AI systems' },
      { id: 'GenAI-3.1.2', k: 'K3', t: 'Identify hallucinations, reasoning errors and biases in LLM output' },
      { id: 'GenAI-3.1.3', k: 'K2', t: 'Summarize mitigation techniques for GenAI hallucinations, reasoning errors and biases in software test tasks' },
      { id: 'GenAI-3.1.4', k: 'K1', t: 'Recall mitigation techniques for non-deterministic behavior of LLMs' },
      { id: 'GenAI-3.2.1', k: 'K2', t: 'Explain key data privacy and security risks associated with using generative AI in software testing' },
      { id: 'GenAI-3.2.2', k: 'K2', t: 'Give examples of data privacy and vulnerabilities in using Generative AI in software testing' },
      { id: 'GenAI-3.2.3', k: 'K2', t: 'Summarize mitigation strategies to protect data privacy and enhance security in Generative AI for software testing' },
      { id: 'GenAI-3.3.1', k: 'K2', t: 'Explain the impact of task characteristics and model usage on the energy consumption of Generative AI in software testing' },
      { id: 'GenAI-3.4.1', k: 'K1', t: 'Recall examples of AI regulations, standards and best practice frameworks relevant to Generative AI in software testing' }
    ] },
    { n: 4, title: 'LLM-Powered Test Infrastructure for Software Testing', minutes: 110, points: 5, los: [
      { id: 'GenAI-4.1.1', k: 'K2', t: 'Explain key architectural components and concepts of LLM-powered test infrastructure' },
      { id: 'GenAI-4.1.2', k: 'K2', t: 'Summarize Retrieval-Augmented Generation' },
      { id: 'GenAI-4.1.3', k: 'K2', t: 'Explain the role and application of LLM-powered agents in automating test processes' },
      { id: 'GenAI-4.2.1', k: 'K2', t: 'Explain the fine-tuning of language models for specific test tasks' },
      { id: 'GenAI-4.2.2', k: 'K2', t: 'Explain LLMOps and its role in deploying and managing LLMs for test tasks' }
    ] },
    { n: 5, title: 'Deploying and Integrating Generative AI in Test Organizations', minutes: 80, points: 7, los: [
      { id: 'GenAI-5.1.1', k: 'K1', t: 'Recall the risks of shadow AI' },
      { id: 'GenAI-5.1.2', k: 'K2', t: 'Explain the key aspects to consider when defining a Generative AI strategy for software testing' },
      { id: 'GenAI-5.1.3', k: 'K2', t: 'Summarize key criteria for selecting LLMs/SLMs for software test tasks in a given context' },
      { id: 'GenAI-5.1.4', k: 'K1', t: 'Recall key phases in the adoption of Generative AI in a test organization' },
      { id: 'GenAI-5.2.1', k: 'K2', t: 'Explain the essential skills and knowledge areas required for testers to work effectively with generative AI in test processes' },
      { id: 'GenAI-5.2.2', k: 'K1', t: 'Recall strategies for cultivating AI skills within test teams to support the adoption of Generative AI in test activities' },
      { id: 'GenAI-5.2.3', k: 'K1', t: 'Recognize how test processes and responsibilities shift within a test organization when adopting Generative AI' }
    ] }
  ]
};

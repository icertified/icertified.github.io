/* ISTQB Certified Tester – Foundation Level (CTFL) v4.0 – exam definition.
 * Sources: CTFL Syllabus v4.0.1 (errata release of v4.0), Exam Structures & Rules v1.2, Exam Structure Tables v1.21. */
(window.ICERT = window.ICERT || {})['ctfl-4'] = {
  id: 'ctfl-4',
  name: 'Foundation Level',
  short: 'CTFL v4.0',
  org: 'ISTQB',
  fullName: 'ISTQB Certified Tester – Foundation Level (CTFL) v4.0',
  prerequisite: 'None – open to anyone interested in software testing',
  exam: {
    questions: 40,
    totalPoints: 40,
    minutes: 60,
    extraPercent: 25,        // extra time when the exam is not in your native language
    passPercent: 65,         // 26 of 40 points
    pointsByK: { K1: 1, K2: 1, K3: 1 },
    mockCount: 5,
    // questions per chapter and K-level in the real exam (Exam Structure Tables v1.21)
    blueprint: {
      1: { K1: 2, K2: 6 },
      2: { K1: 2, K2: 4 },
      3: { K1: 2, K2: 2 },
      4: { K2: 6, K3: 5 },
      5: { K1: 1, K2: 5, K3: 3 },
      6: { K1: 1, K2: 1 }
    }
  },
  topicTitles: {'1.1':'What is testing?','1.2':'Why is testing necessary?','1.3':'Testing principles','1.4':'Test activities, testware and test roles','1.5':'Essential skills and good practices','2.1':'Testing in the context of a software development lifecycle','2.2':'Test levels and test types','2.3':'Maintenance testing','3.1':'Static testing basics','3.2':'Feedback and the review process','4.1':'Test techniques overview','4.2':'Black-box test techniques','4.3':'White-box test techniques','4.4':'Experience-based test techniques','4.5':'Collaboration-based test approaches','5.1':'Test planning','5.2':'Risk management','5.3':'Test monitoring, control and completion','5.4':'Configuration management','5.5':'Defect management','6.1':'Tool support for testing','6.2':'Benefits and risks of test automation'},
  chapters: [
    { n: 1, title: 'Fundamentals of Testing', minutes: 180, points: 8, los: [
      { id: 'FL-1.1.1', k: 'K1', t: 'Identify typical test objectives' },
      { id: 'FL-1.1.2', k: 'K2', t: 'Differentiate testing from debugging' },
      { id: 'FL-1.2.1', k: 'K2', t: 'Exemplify why testing is necessary' },
      { id: 'FL-1.2.2', k: 'K1', t: 'Recall the relation between testing and quality assurance' },
      { id: 'FL-1.2.3', k: 'K2', t: 'Distinguish between root cause, error, defect, and failure' },
      { id: 'FL-1.3.1', k: 'K2', t: 'Explain the seven testing principles' },
      { id: 'FL-1.4.1', k: 'K2', t: 'Explain the different test activities and related tasks' },
      { id: 'FL-1.4.2', k: 'K2', t: 'Explain the impact of context on the test process' },
      { id: 'FL-1.4.3', k: 'K2', t: 'Differentiate the testware that supports the test activities' },
      { id: 'FL-1.4.4', k: 'K2', t: 'Explain the value of maintaining traceability' },
      { id: 'FL-1.4.5', k: 'K2', t: 'Compare the different roles in testing' },
      { id: 'FL-1.5.1', k: 'K2', t: 'Give examples of the generic skills required for testing' },
      { id: 'FL-1.5.2', k: 'K1', t: 'Recall the advantages of the whole team approach' },
      { id: 'FL-1.5.3', k: 'K2', t: 'Distinguish the benefits and drawbacks of independence of testing' }
    ] },
    { n: 2, title: 'Testing Throughout the Software Development Lifecycle', minutes: 130, points: 6, los: [
      { id: 'FL-2.1.1', k: 'K2', t: 'Explain the impact of the chosen software development lifecycle on testing' },
      { id: 'FL-2.1.2', k: 'K1', t: 'Recall good testing practices that apply to all software development lifecycles' },
      { id: 'FL-2.1.3', k: 'K1', t: 'Recall the examples of test-first approaches to development' },
      { id: 'FL-2.1.4', k: 'K2', t: 'Summarize how DevOps might have an impact on testing' },
      { id: 'FL-2.1.5', k: 'K2', t: 'Explain shift left' },
      { id: 'FL-2.1.6', k: 'K2', t: 'Explain how retrospectives can be used as a mechanism for process improvement' },
      { id: 'FL-2.2.1', k: 'K2', t: 'Distinguish the different test levels' },
      { id: 'FL-2.2.2', k: 'K2', t: 'Distinguish the different test types' },
      { id: 'FL-2.2.3', k: 'K2', t: 'Distinguish confirmation testing from regression testing' },
      { id: 'FL-2.3.1', k: 'K2', t: 'Summarize maintenance testing and its triggers' }
    ] },
    { n: 3, title: 'Static Testing', minutes: 80, points: 4, los: [
      { id: 'FL-3.1.1', k: 'K1', t: 'Recognize types of work products that can be examined by static testing' },
      { id: 'FL-3.1.2', k: 'K2', t: 'Explain the value of static testing' },
      { id: 'FL-3.1.3', k: 'K2', t: 'Compare and contrast static testing and dynamic testing' },
      { id: 'FL-3.2.1', k: 'K1', t: 'Identify the benefits of early and frequent stakeholder feedback' },
      { id: 'FL-3.2.2', k: 'K2', t: 'Summarize the activities of the review process' },
      { id: 'FL-3.2.3', k: 'K1', t: 'Recall which responsibilities are assigned to the principal roles when performing reviews' },
      { id: 'FL-3.2.4', k: 'K2', t: 'Compare and contrast the different review types' },
      { id: 'FL-3.2.5', k: 'K1', t: 'Recall the factors that contribute to a successful review' }
    ] },
    { n: 4, title: 'Test Analysis and Design', minutes: 390, points: 11, los: [
      { id: 'FL-4.1.1', k: 'K2', t: 'Distinguish black-box test techniques, white-box test techniques and experience-based test techniques' },
      { id: 'FL-4.2.1', k: 'K3', t: 'Use equivalence partitioning to derive test cases' },
      { id: 'FL-4.2.2', k: 'K3', t: 'Use boundary value analysis to derive test cases' },
      { id: 'FL-4.2.3', k: 'K3', t: 'Use decision table testing to derive test cases' },
      { id: 'FL-4.2.4', k: 'K3', t: 'Use state transition testing to derive test cases' },
      { id: 'FL-4.3.1', k: 'K2', t: 'Explain statement testing' },
      { id: 'FL-4.3.2', k: 'K2', t: 'Explain branch testing' },
      { id: 'FL-4.3.3', k: 'K2', t: 'Explain the value of white-box testing' },
      { id: 'FL-4.4.1', k: 'K2', t: 'Explain error guessing' },
      { id: 'FL-4.4.2', k: 'K2', t: 'Explain exploratory testing' },
      { id: 'FL-4.4.3', k: 'K2', t: 'Explain checklist-based testing' },
      { id: 'FL-4.5.1', k: 'K2', t: 'Explain how to write user stories in collaboration with developers and business representatives' },
      { id: 'FL-4.5.2', k: 'K2', t: 'Classify the different options for writing acceptance criteria' },
      { id: 'FL-4.5.3', k: 'K3', t: 'Use acceptance test-driven development (ATDD) to derive test cases' }
    ] },
    { n: 5, title: 'Managing the Test Activities', minutes: 335, points: 9, los: [
      { id: 'FL-5.1.1', k: 'K2', t: 'Exemplify the purpose and content of a test plan' },
      { id: 'FL-5.1.2', k: 'K1', t: 'Recognize how a tester adds value to iteration and release planning' },
      { id: 'FL-5.1.3', k: 'K2', t: 'Compare and contrast entry criteria and exit criteria' },
      { id: 'FL-5.1.4', k: 'K3', t: 'Use estimation techniques to calculate the required test effort' },
      { id: 'FL-5.1.5', k: 'K3', t: 'Apply test case prioritization' },
      { id: 'FL-5.1.6', k: 'K1', t: 'Recall the concepts of the test pyramid' },
      { id: 'FL-5.1.7', k: 'K2', t: 'Summarize the testing quadrants and their relationships with test levels and test types' },
      { id: 'FL-5.2.1', k: 'K1', t: 'Identify risk level by using risk likelihood and risk impact' },
      { id: 'FL-5.2.2', k: 'K2', t: 'Distinguish between project risks and product risks' },
      { id: 'FL-5.2.3', k: 'K2', t: 'Explain how product risk analysis may influence thoroughness and test scope' },
      { id: 'FL-5.2.4', k: 'K2', t: 'Explain what measures can be taken in response to analyzed product risks' },
      { id: 'FL-5.3.1', k: 'K1', t: 'Recall metrics used for testing' },
      { id: 'FL-5.3.2', k: 'K2', t: 'Summarize the purposes, content, and audiences for test reports' },
      { id: 'FL-5.3.3', k: 'K2', t: 'Exemplify how to communicate the status of testing' },
      { id: 'FL-5.4.1', k: 'K2', t: 'Summarize how configuration management supports testing' },
      { id: 'FL-5.5.1', k: 'K3', t: 'Prepare a defect report' }
    ] },
    { n: 6, title: 'Test Tools', minutes: 20, points: 2, los: [
      { id: 'FL-6.1.1', k: 'K2', t: 'Explain how different types of test tools support testing' },
      { id: 'FL-6.2.1', k: 'K1', t: 'Recall the benefits and risks of test automation' }
    ] }
  ]
};

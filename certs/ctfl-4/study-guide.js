(window.ICSTUDY = window.ICSTUDY || {});
(window.ICSTUDY['ctfl-4'] = window.ICSTUDY['ctfl-4'] || { chapters: {}, flash: [] });
/* CTFL v4.0 exam guide – written for exam preparation. Facts from ISTQB CTFL Syllabus v4.0.1 and the ISTQB exam rules.
 * Always cross-check with the official ISTQB pages and your exam provider: https://www.istqb.org */
window.ICSTUDY['ctfl-4'].guide = {
  kLevels: [
    ['K1', 'Remember', '8 questions', '1 point each', 'Recall of terms, lists and facts. Use the flashcards: seven principles, test activities, review roles, test pyramid, metrics, benefits and risks of test automation.'],
    ['K2', 'Understand', '24 questions', '1 point each', 'The bulk of the exam. Explain, compare, summarise, exemplify: test levels vs test types, static vs dynamic testing, entry vs exit criteria, project vs product risks.'],
    ['K3', 'Apply', '8 questions', '1 point each (8 points)', 'Use a technique on a concrete example: 5 questions in Chapter 4 (equivalence partitioning, boundary value analysis, decision tables, state transition testing, coverage) and 3 in Chapter 5 (estimation, test case prioritization, defect report). Writing the steps down helps (if your provider permits notes).']
  ],
  time: [
    'The exam has 40 multiple-choice questions, 40 points (1 point each) and lasts 60 minutes (75 minutes if the exam is not in your native language, where your exam provider grants the extra 25%). The pass mark is 26 of 40 points (65%).',
    'That is about 1.5 minutes per question (1.9 with the extension). Spend roughly 1 minute on K1 questions, 1 to 1.5 on K2 and 2 to 3 on K3 calculation questions: the K3 questions pay back the extra time, because they are exact and have one right answer.',
    'Pass 1 (about 40 minutes): answer what you are sure about immediately, do short K1/K2 questions first, flag anything long or doubtful. Pass 2 (about 15 minutes): the flagged questions and the K3 calculations. Keep the last 5 minutes to make sure that every question has an answer and to re-read flagged questions once more.',
    'Make sure every question has an answer before time runs out. Read your exam provider’s rules for the details of how the exam is run.'
  ],
  technique: [
    'Read the <b>last line first</b> (what is actually asked: “which is correct”, “which is NOT”, “choose TWO”), then the scenario. Underline the key condition mentally.',
    'Eliminate options. Usually two are clearly wrong. Then compare the remaining two with the exact syllabus wording, not with what “sounds reasonable” or what you do at work.',
    'Beware of absolutes: “always”, “never”, “only”, “guarantees”, “eliminates”, “proves” are usually wrong. The syllabus says that testing <b>reduces</b> risk, it cannot prove the absence of defects.',
    '“NOT” and “LEAST” questions: judge each option true or false first, then pick the odd one out.',
    'Statement questions (“which of i–iv are correct”): mark each statement T or F on your note sheet, then find the option that matches. Do not stop at the first match that looks right.',
    '“Choose TWO” questions: select exactly two. Decide for each option separately whether it is correct, and check that your pair makes sense together.',
    'Calculation and technique questions (K3): always write things down. For equivalence partitioning write the partitions, for boundary value analysis list the boundary values (2-value or 3-value, as the question says), for decision tables list the rules, for state transition testing draw the states and transitions, for estimation write the formula (E = (a + 4m + b) / 6, SD = (b − a) / 6) and the numbers, for prioritization write the order and mark dependencies. Re-do the calculation once before you answer.',
    'Use the exact syllabus terms (test basis, test condition, test oracle, confirmation testing vs regression testing, severity vs priority); distractors often swap two similar terms.',
    'Do not spend more than about 3 minutes on one question in the first pass. Flag it and move on.'
  ],
  plan: [
    ['Week 1', 'Chapters 1, 2 and 3 (light): read the study notes once, then take the chapter tests. Learn the K1 terms with the flashcards. Start Chapter 4 with the black-box techniques: equivalence partitioning and boundary value analysis, with 5 to 10 worked examples on paper.'],
    ['Week 2', 'Chapter 4, the heart of the exam (390 minutes in the syllabus, 11 exam questions of which 5 are K3): decision tables, state transition testing, white-box coverage (statement and branch), experience-based techniques and collaboration-based approaches. Do the Chapter 4 chapter tests daily and redo every K3 question you got wrong, by hand.'],
    ['Week 3', 'Chapter 5 (335 minutes, 9 questions with 3 K3): test planning, estimation, prioritization, risks, metrics and reports, configuration management and defect reports; then Chapter 6 (2 questions: tool types, benefits and risks of automation). Practise the K3 calculations. Flashcards every day (about 15 minutes).'],
    ['Week 4', 'Revision and mock exams. Early in the week: your weak chapters and the flashcards. Then take Mock Exams in exam mode with the time limit (60 minutes, or 75 if that applies to you). Review every explanation, including the questions you got right by luck. Aim for 80% or more in two mocks in a row.'],
    ['Last 2 days', 'Flashcards (all K1 and list cards), your list of mistakes, the K3 sets one more time and this exam guide. No new topics. Rest the evening before.']
  ],
  checklist: [
    'Confirm the date, time, location or online-proctoring requirements, and which identification your exam provider asks for.',
    'If remote: test the computer, camera, microphone and internet connection, clear the desk and the room as required, and close other programs.',
    'Check your exam provider’s rules beforehand: what you may use or bring, and whether the extra time (75 minutes) applies to you.',
    'Know your time plan: two passes, K3 calculations in the second pass, 5-minute final check.',
    'Remember the numbers: 40 questions, 40 points, pass at 26 (65%), 60 minutes (75 with extension).',
    'Sleep well, eat and drink something, and arrive or log in early. You can miss up to 14 points and still pass.'
  ]
};

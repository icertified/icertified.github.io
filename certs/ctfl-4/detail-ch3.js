/* CTFL v4.0 in-depth notes (own words) */
(window.ICDETAIL = window.ICDETAIL || {});
(window.ICDETAIL['ctfl-4'] = window.ICDETAIL['ctfl-4'] || {})[3] = {
  'basics': {
    paras: [
      'Most people picture testing as running a program and watching what happens. <b>Static testing</b> is the opposite idea: you learn about quality by <i>looking at</i> a work product rather than by executing anything. Because nothing has to run, it can start the day the first requirement is written, long before any code exists. There are two ways to do it. A person can examine the work product by hand, which is called a <b>review</b>, or a tool can analyse it automatically, which is called <b>static analysis</b>. Both can support verification (are we building it right?) and validation (are we building the right thing?).',
      'The goals are broader than hunting defects. A static check may aim to raise quality in general, or to judge characteristics such as readability, completeness, correctness, testability and consistency. A requirement can be perfectly “correct” and still be untestable because nobody can say what a pass looks like, and a review is the natural place to notice that.',
      'Almost any work product qualifies. A review only needs something people can read and understand, so contracts, test plans, test cases, backlog items, charters and models are all fair game. Static analysis is pickier: the work product needs a structure that a tool can check against, such as source code, a model, or text written in a formal syntax. A free-form email cannot be parsed by a linter, but a person can still review it.',
      'In agile teams static testing is woven into everyday collaboration. When testers, developers and business people work together on example mapping, write stories jointly or refine the backlog, they are applying review techniques. The testers’ typical contribution is asking probing questions so that a story becomes complete, understandable and carries testable acceptance criteria, for instance so it satisfies the team’s Definition of Ready.',
      'Static analysis tools typically find issues earlier and with less effort than dynamic testing because you do not have to design and run test cases. They often run inside a continuous integration pipeline, mainly to find specific coding defects, but also to judge maintainability and security. Spell checkers and readability checkers are simple everyday examples.'
    ],
    list: [
      '<b>Review</b> = people examine the work product; <b>static analysis</b> = a tool examines it.',
      'Reviews need something readable; static analysis needs something with structure.',
      'Not suitable: work products that humans cannot interpret and that must not be tool-analysed, such as third-party executable code (legal reasons).'
    ],
    blocks: [
      { t: 'good', h: 'Example', x: 'A team refines the user story “As a customer I want to reset my password”. The tester asks: how long is the reset link valid, what happens after three failed attempts, and which message is shown for an unknown email address? None of this involves running software, yet three missing acceptance criteria were found before a line of code was written. That is static testing in an agile setting.' },
      { t: 'warn', h: 'Exam trap', x: 'Do not claim that “only code can be statically analysed” or that static testing is only about finding defects. Reviews can examine almost any readable work product, and static testing also assesses characteristics such as readability and testability.' }
    ]
  },
  'value': {
    paras: [
      'The central argument for static testing is timing. A defect found in a requirement costs very little to fix, because only a sentence changes. The same defect found after design, coding and test execution has been copied into many other work products, so fixing it is much more expensive. Static testing can be applied in the very earliest phases of the lifecycle, so it puts the principle of early testing into practice.',
      'It also reaches defects that running the software can never expose. Unreachable code never executes, so no test can hit it; a reviewer or analyser sees it at once. A design pattern that was implemented differently from what the architects intended may work perfectly in every test, yet be a maintenance problem. And documents such as requirements or contracts are not executable at all, so dynamic testing cannot touch their defects.',
      'Beyond defects, static testing builds confidence. When stakeholders review the documented requirements they can confirm that the text really describes what they need. Because this happens early, the people involved develop a <b>shared understanding</b> of what is to be built and communicate better. That is why a wide variety of stakeholders, not just testers, should be involved.',
      'The honest counter-argument is cost: reviews take people’s time and can be expensive. The syllabus point is that the total project cost is normally much lower with reviews than without, since much less effort goes into late rework. Likewise, some code defects are found more efficiently by static analysis than by writing and running tests, which tends to mean fewer defects in the product and less overall development effort.'
    ],
    blocks: [
      { t: 'good', h: 'Worked example', x: 'A requirement states “every response shall take at most 2 seconds” in one section and “at most 5 seconds” in another. A review catches the contradiction in one hour. If it were found after release, design, code and tests would all need rework, and the release date could slip. A small review effort has avoided a large late cost.' },
      { t: 'warn', h: 'Exam trap', x: 'Static testing complements dynamic testing; it does not replace it. Statements that say static testing makes dynamic testing unnecessary, or that reviews always cost more than they save, contradict the syllabus.' }
    ],
    list: [
      'Early detection fulfils the early testing principle.',
      'Finds what dynamic testing cannot: unreachable code, wrongly applied design patterns, defects in non-executable work products.',
      'Builds confidence, checks that requirements match real needs, creates shared understanding.',
      'Review effort is repaid by lower overall project cost.'
    ]
  },
  'static-vs-dynamic': {
    paras: [
      'The two approaches share a goal, which is to help find defects in work products, but they reach it by different paths. The syllabus stresses that they <b>complement</b> each other: there are defect types that only one of them can find.',
      'The biggest conceptual difference is how a defect shows itself. In static testing you meet the <i>defect</i> directly, for example the reviewer points at the wrong formula. In dynamic testing the software runs and you first see a <i>failure</i>, such as a wrong total on screen. Only then do you analyse the failure to locate the defect that caused it. This is the same defect-failure relationship from chapter 1.',
      'Applicability differs too. Static testing can examine non-executable work products such as requirements, while dynamic testing needs something that runs. Static testing can also reach code paths that are rarely executed or very hard to trigger (for example an error handler for a hardware fault), while dynamic testing struggles to provoke them. On quality characteristics, static testing can evaluate those that do not depend on execution, such as maintainability, while dynamic testing measures those that do depend on it, such as performance efficiency. You cannot know the response time of a program by reading its code.',
      'The syllabus lists typical defects that are easier or cheaper to find statically. Remember them by work product: requirements (inconsistencies, ambiguities, contradictions, omissions, inaccuracies, duplications); design (inefficient database structures, poor modularization); code (variables with undefined values, undeclared variables, unreachable or duplicated code, excessive complexity); standards (naming conventions ignored); interfaces (mismatch in number, type or order of parameters); security (for example buffer overflows); and test basis coverage (an acceptance criterion with no test).'
    ],
    blocks: [
      { t: 'good', h: 'Example', x: 'A function is called with an argument of the wrong type. A static analyser flags the mismatch immediately and names the defect. Dynamically, you would see a strange result only when a test happens to exercise that call, and would then have to debug to find the cause. Conversely, nobody can learn from the source code alone that the page takes eight seconds to load under 500 concurrent users; that needs execution.' },
      { t: 'warn', h: 'Exam trap', x: 'Maintainability is the syllabus example for a characteristic checked statically, and performance efficiency for one that needs execution. Do not swap them, and do not say dynamic testing finds defects “directly”: it causes failures first.' }
    ],
    table: { head: ['Question', 'Static testing', 'Dynamic testing'], rows: [
      ['What do you observe first?', 'The defect itself', 'A failure, then analyse to the defect'],
      ['Needs running software?', 'No', 'Yes'],
      ['Non-executable work products?', 'Yes', 'No'],
      ['Characteristic example', 'Maintainability', 'Performance efficiency']
    ] }
  },
  'feedback': {
    paras: [
      'Software is built for stakeholders: users, customers, sponsors, operations people. If they only see the product at the end, any gap between what they imagined and what was built appears at the most expensive moment. <b>Early and frequent stakeholder feedback</b> shortens that distance. Each small increment or document is shown while changing it is still cheap.',
      'The first benefit is that potential quality problems are communicated early, while there is still time to react. The second is that misunderstandings about requirements are prevented: words that mean different things to a business analyst and a developer are exposed quickly. The third is that changed requirements are understood and implemented sooner, instead of piling up as a surprise. A fourth is that the development team gets a better understanding of what it is actually building, and so is able to concentrate on the features that provide the most value to stakeholders and best address the identified risks.',
      'The syllabus also describes what happens without it. With little stakeholder involvement the product may fail to match the stakeholders’ original vision, or their current one, since needs move over time. The consequences listed are costly rework, missed deadlines, blame games between parties, and in the worst case failure of the whole project.',
      'This learning objective is only K1, so expect to be asked to identify benefits from a list, not to explain mechanisms. Learn the benefits as a short set: early notice of problems, fewer requirement misunderstandings, earlier handling of changes, better team understanding, and focus on value and risk.'
    ],
    blocks: [
      { t: 'good', h: 'Example', x: 'An agile team demonstrates a half-finished checkout page to the product owner after the first week. The owner points out that guest checkout, not account creation, is the priority. The team adjusts in days. Had the same insight arrived at the end of a six-month project, a large part of the work would have been rework.' },
      { t: 'warn', h: 'Exam trap', x: 'Feedback is valuable because it is both <i>early</i> and <i>frequent</i>. Options that describe a single final acceptance session as providing the same benefit, or that claim feedback mainly reduces test effort, do not match the syllabus list.' }
    ]
  },
  'process': {
    paras: [
      'A review is more than a meeting. The standard ISO/IEC 20246 describes a generic review process that is structured but can be tailored. A very formal review uses many of the tasks defined for each activity; an informal one uses only a few. Large work products are usually too big for one review, so the process can be repeated several times for different parts.',
      '<b>Planning</b> fixes the scope: why the review is held, which work product is covered, which quality characteristics matter, where reviewers should concentrate, the exit criteria, supporting material such as standards, and the effort and timeframe. <b>Review initiation</b> makes sure everyone is ready: each participant can reach the work product, knows their role and responsibilities, and has what they need.',
      'In the <b>individual review</b> each reviewer works alone, applying one or more review techniques, such as checklist-based or scenario-based reviewing, and logs anomalies, recommendations and questions. An <b>anomaly</b> is any observed deviation from expectation. This matters in the next step. <b>Communication and analysis</b> is needed precisely because anomalies are not necessarily defects: a reviewer may misunderstand, or may flag a stylistic preference. Usually in a review meeting the group decides, for each anomaly, its status, who owns it and what action follows. They also judge the quality level of the work product and what follow-up is needed; a follow-up review may be required to check that actions were done.',
      '<b>Fixing and reporting</b> closes the loop: a defect report is created for every defect so corrective actions can be tracked, the author fixes the work product, the work product can be accepted once the exit criteria are reached, and the results of the review are reported.'
    ],
    list: [
      'Order to remember: Planning, Initiation, Individual review, Communication and analysis, Fixing and reporting.',
      'Individual preparation logs anomalies, recommendations and questions; the decision about defects comes later.'
    ],
    blocks: [
      { t: 'good', h: 'Worked example', x: 'A team reviews a 60-page specification. Planning: scope is chapters 1 to 3, focus on testability, exit criterion “no open major defects”, two days of effort. Initiation: the document and checklist are sent out. Individual review: four reviewers log 31 items. Communication and analysis: in a meeting, 22 items are classed as defects, 5 as questions answered on the spot and 4 as rejected misunderstandings. Fixing and reporting: defect reports are raised, the author corrects the text and the results are reported.' },
      { t: 'warn', h: 'Exam trap', x: 'Anomalies are not automatically defects. Also, a defect report is created in fixing and reporting, not during the individual review, and a meeting is typical but belongs to communication and analysis rather than being an activity of its own.' }
    ]
  },
  'roles': {
    paras: [
      'Reviews work best when everyone knows what they are responsible for. The syllabus names six principal roles, and one person may play several of them, for instance a team member who is both reviewer and scribe in a small review. Because the objective asks only for recall (K1), the safest preparation is to attach one short responsibility to each name.',
      'The <b>manager</b> is the person who decides what gets reviewed and makes resources such as staff and time available. The <b>author</b> created the work product and is also the person who fixes it afterwards. The <b>moderator</b>, also called the facilitator, makes review meetings run well: they mediate disagreements, keep to the time and maintain a safe atmosphere where everyone can speak freely. The <b>scribe</b>, also called the recorder, gathers the anomalies from the individual reviewers and writes down review information such as decisions and any new anomalies raised in the meeting. The <b>reviewer</b> actually performs the review and may be a colleague on the project, a subject matter expert or any other stakeholder. The <b>review leader</b> carries overall responsibility for the review: choosing who takes part and organising when and where it happens.',
      'The most commonly confused trio is moderator, scribe and review leader. A useful shortcut: the moderator manages the <i>meeting</i>, the scribe manages the <i>record</i>, and the review leader manages the <i>whole review</i>. The manager sits above all of this at the level of decision and resourcing. The syllabus adds that the ISO/IEC 20246 standard defines other, more detailed roles, but the six above are the examinable ones.'
    ],
    blocks: [
      { t: 'good', h: 'Example', x: 'Ahmed (project manager) decides that the payment API specification must be reviewed and gives the team two days. Lena (review leader) picks four participants and books the room. Priya (author) wrote the specification. During the meeting Tom (moderator) stops a heated debate and keeps to the timebox, while Sara (scribe) writes down every decision. Two developers and a security expert are the reviewers.' },
      { t: 'warn', h: 'Exam trap', x: 'Mixing up moderator and review leader is the classic mistake. The moderator ensures effective meetings and a safe environment; the review leader decides who is involved and organises when and where. Also note the author creates <i>and fixes</i> the work product.' }
    ],
    table: { head: ['Role', 'Short hook'], rows: [
      ['Manager', 'Decides what; provides resources'],
      ['Author', 'Creates and fixes'],
      ['Moderator / facilitator', 'Runs the meeting, mediates, keeps it safe'],
      ['Scribe / recorder', 'Collates anomalies and records decisions'],
      ['Reviewer', 'Does the review'],
      ['Review leader', 'Overall responsibility; who, when, where']
    ] }
  },
  'types': {
    paras: [
      'Reviews form a spectrum from informal to formal. There is no single best type; the right one depends on how much formality the situation demands. Factors that push towards more formality are the lifecycle being followed, the maturity of the development process, the criticality and complexity of the work product, legal or regulatory requirements and the need for an audit trail. The same work product can even be reviewed twice, first informally and later with a formal type.',
      'An <b>informal review</b> has no defined process and does not need formally documented output; its main aim is simply to detect anomalies, for example a colleague glancing over your draft. A <b>walkthrough</b> is led by the author, who guides others through the work product. It serves many purposes: assessing quality, building confidence, educating the reviewers, reaching consensus, generating ideas, motivating the author and finding anomalies. Reviewers may prepare individually beforehand, but this is optional.',
      'A <b>technical review</b> is carried out by technically qualified reviewers and led by a moderator. Its signature objective is to reach consensus and make decisions on a technical problem, while also detecting anomalies, evaluating quality, building confidence, generating ideas and motivating the author. An <b>inspection</b> is the most formal type. It follows the whole generic review process, its main goal is to find the maximum number of anomalies, and metrics are collected to improve the development lifecycle and the inspection process itself. A defining rule is that the author cannot act as review leader or scribe.',
      'Choosing is not purely about objectives. Project needs, available resources, type of work product and its risks, business domain and company culture all matter as well.'
    ],
    blocks: [
      { t: 'good', h: 'Example', x: 'A developer shows a colleague a new class over coffee (informal). Later the author walks the team through the design to teach it and collect ideas (walkthrough). Architects then meet under a moderator to choose between two caching approaches (technical review). Finally, the safety-critical braking module is inspected with the full process, a trained team, recorded metrics and an audit trail (inspection).' },
      { t: 'warn', h: 'Exam trap', x: 'Leader identity is the usual discriminator: walkthrough is led by the author, technical review by a moderator. “Maximum number of anomalies”, metrics and the author-cannot-lead-or-scribe rule point to inspection. Informal reviews are not forbidden from being useful; they simply have no defined process.' }
    ],
    table: { head: ['Type', 'Key point'], rows: [
      ['Informal', 'No defined process; detect anomalies'],
      ['Walkthrough', 'Author-led; many objectives; individual review optional'],
      ['Technical review', 'Qualified reviewers; moderator; consensus on technical decisions'],
      ['Inspection', 'Most formal; full process; max anomalies; metrics']
    ] }
  },
  'success': {
    paras: [
      'Plenty of reviews are held and yet deliver little. The syllabus lists the factors that make the difference, and each one has an obvious reason once you picture a failing review.',
      '<b>Clear objectives and measurable exit criteria</b> let everybody know what the review is for and when it is finished. Evaluating the participants must never be an objective: if reviewers fear that their performance or the author’s will be judged, they hold back and the review loses value. Choosing the <b>appropriate review type</b> for the objective, work product, participants and context avoids using a heavy inspection where a quick informal check is enough, or the reverse. Reviewing <b>small chunks</b> protects concentration, both in the individual review and in a meeting if one is held.',
      'Giving <b>feedback</b> from the review to stakeholders and authors lets them improve the product and their own working practices. Participants also need <b>adequate time to prepare</b>; a review squeezed in with no preparation finds only superficial problems. <b>Management support</b> provides the time and backing the process needs. Making reviews <b>part of the organisation’s culture</b> promotes learning and process improvement, so they are seen as normal rather than as an audit. <b>Adequate training</b> ensures participants know how to fulfil their roles, and <b>facilitating meetings</b> keeps discussions productive.',
      'Since this is a K1 objective, the exam tends to test recognition: you will see a list of statements and must pick the one that is, or is not, a success factor.'
    ],
    blocks: [
      { t: 'good', h: 'Example', x: 'A team reviews a 200-page specification as ten 20-page packages over two weeks. Each package has an agreed exit criterion (“all major findings resolved”), reviewers get three days of preparation time, and a trained moderator facilitates the meeting. Feedback is given to the authors and the lessons are shared with the whole department. That combines several success factors at once.' },
      { t: 'warn', h: 'Exam trap', x: 'A review used to appraise how good the participants or the author are is the classic wrong answer. Likewise, reviewing the entire large document in one session is the opposite of the small-chunks factor.' }
    ]
  }
};

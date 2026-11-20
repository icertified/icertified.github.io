/* CTFL v4.0 in-depth notes (own words) */
(window.ICDETAIL = window.ICDETAIL || {});
(window.ICDETAIL['ctfl-4'] = window.ICDETAIL['ctfl-4'] || {})[4] = {
  'overview': {
    paras: [
      'Think of the work in this chapter as a funnel. <b>Test analysis</b> asks <i>what</i> should be tested and produces <b>test conditions</b>. <b>Test design</b> asks <i>how</i> and turns each condition into <b>coverage items</b> (a partition, a boundary value, a rule, a transition, a statement) and then into <b>test cases</b> with concrete <b>test data</b>. A technique is simply a repeatable recipe for performing those steps, so that two testers facing the same specification end up with comparable, defensible tests instead of an arbitrary pile.',
      'The three families differ in <i>where the knowledge comes from</i>. Black-box techniques read the specification and therefore survive refactoring: if behaviour stays the same, the tests stay valid. White-box techniques read the code or its control flow, so they can only be written once something exists, but they can measure how much of the structure was really executed. Experience-based techniques read the tester’s head: they are cheap to start and can catch what the formal models never imagined, but their quality varies from person to person.',
      'In practice the families are combined. A common pattern is black-box techniques for the core requirements, a white-box coverage measurement to find what the tests never touched, and an experience-based session for the odd corners. The collaboration-based approaches in section 4.5 sit beside all of this: they try to stop defects from being written by getting business, development and testing to agree on examples early.'
    ],
    list: [
      'Condition → coverage item → test case: “quantity within allowed range” → “partition 1–50” → “order 25 items, expect acceptance”.',
      'One test case usually covers several coverage items; the coverage percentage is always (items exercised) ÷ (items identified) × 100.',
      'Coverage is a measure against a <i>chosen</i> technique, not a statement about quality in general.'
    ],
    blocks: [
      { t: 'good', h: 'Worked example: one feature, three lenses', x: 'Feature: a password field that accepts 8–20 characters.<br><b>Black-box:</b> partitions (&lt;8, 8–20, &gt;20) and boundary values 7, 8, 20, 21 come straight from the requirement.<br><b>White-box:</b> after running those tests, a coverage tool shows an <code>if</code> branch that rejects passwords without a digit. The spec never mentioned it, so a new test is added to execute it.<br><b>Experience-based:</b> from past incidents the tester also tries a password with a trailing space and one containing an emoji.<br>Each lens found something the others would not have.' },
      { t: 'warn', h: 'Trap', x: 'White-box test cases cannot be derived before the design or code exists, while black-box test cases can be written from the specification alone. Also, experience-based techniques are <i>complementary</i>, not a replacement for the systematic ones.' }
    ],
    table: { head: ['Question', 'Black-box', 'White-box', 'Experience-based'], rows: [['Test basis', 'Specified behaviour', 'Code / control flow', 'Tester knowledge'], ['Needs code to exist?', 'No', 'Yes', 'No'], ['Typical coverage measure', 'Partitions, boundaries, rules, transitions', 'Statements, branches', 'None formal (charter, checklist items)'], ['Weak spot', 'Cannot see code that is never specified', 'Cannot see missing code', 'Depends on the person']] }
  },

  'ep': {
    paras: [
      'Equivalence partitioning (EP) starts from a bet: values that the test object treats identically are interchangeable, so one representative per group is enough. Your job is to find the groups. Look at the requirement and ask “where does the processing change?”. Each change of processing starts a new partition. Partitions cover every possible value, never overlap and are never empty. Invalid values form partitions too (below the range, above the range, wrong type) and they count as coverage items.',
      'Do not forget that partitions exist for outputs and other data as well, for instance “fee 4.00” versus “fee 9.00”. The recipe is always the same: <b>1)</b> list the partitions, <b>2)</b> number them, <b>3)</b> pick one value for each, <b>4)</b> after a test set is given, tick which partitions it touches, <b>5)</b> divide by the total.'
    ],
    list: [
      'Coverage = partitions exercised ÷ partitions identified × 100, invalid partitions included.',
      'Two values from the same partition add nothing to coverage.',
      'With several parameters, a test case covers one partition of each set. Each Choice coverage needs every partition of every set at least once, so the minimum number of tests equals the size of the largest set, not the product.'
    ],
    blocks: [
      { t: 'good', h: 'Worked example: parcel weight', x: 'A courier accepts whole-kilogram weights. 1–5 kg is charged as Small, 6–20 kg as Large; anything else is refused.<br><b>Partitions:</b> P1 weight ≤ 0 (invalid), P2 1–5, P3 6–20, P4 ≥ 21 (invalid) = <b>4 partitions</b>.<br><b>Tests, one per partition:</b> −2, 3, 12, 25.<br><b>Coverage of the set {3, 12, 25}:</b> P2, P3, P4 touched → 3 ÷ 4 = <b>75%</b>.<br><b>Coverage of {2, 4, 12}:</b> 2 and 4 both sit in P2, so only P2 and P3 are touched → 2 ÷ 4 = <b>50%</b> (not 3 ÷ 4).' },
      { t: 'good', h: 'Worked example: Each Choice with two parameters', x: 'Add a second parameter, delivery option: B1 standard, B2 express, B3 unknown option (invalid). Partitions: 4 + 3 = 7.<br>Four tests reach 100% Each Choice (the largest set has 4): (−2, standard), (3, express), (12, unknown), (25, standard).<br>All combinations would need 4 × 3 = 12 tests, which Each Choice does <i>not</i> demand. Many testers still prefer one invalid value per test to avoid defect masking; that variant needs 3 invalid-driven tests plus 2 valid ones = 5 tests, still far below 12.' },
      { t: 'warn', h: 'Classic traps', x: 'Forgetting the invalid partitions when counting (here 2 valid + 2 invalid = 4, not 2). Counting every <i>test</i> as a covered partition. Treating Each Choice as “all combinations”. Making partitions that overlap, such as 1–5 and 5–20.' }
    ]
  },

  'bva': {
    paras: [
      'Boundary value analysis (BVA) refines EP for <b>ordered</b> partitions: defects love the edges, where a developer wrote “&lt;” instead of “≤” or put the limit one step off. Find the boundaries between a valid and an adjacent invalid partition, then test exactly there. “Neighbour” means the next value in the data’s resolution: for integers ±1, for money with cents ±0.01.',
      'The only difference between the two versions is how many items belong to each boundary. <b>2-value</b>: the boundary value plus its closest neighbour in the <i>adjacent</i> partition, so each boundary gives 2 items and a range with two edges gives 4. <b>3-value</b>: the boundary value plus <i>both</i> neighbours, so each boundary gives 3 items and the same range gives 6. Always check which version the question names before you write a single value.'
    ],
    blocks: [
      { t: 'good', h: 'Worked example: thermostat setting', x: 'A thermostat accepts whole degrees from 10 to 30. Partitions: ≤ 9 (invalid), 10–30 (valid), ≥ 31 (invalid). Boundaries of the valid partition: <b>10</b> and <b>30</b>.<br><b>2-value items:</b> 9, 10, 30, 31 = <b>4</b>.<br><b>3-value items:</b> 9, 10, 11, 29, 30, 31 = <b>6</b>.<br><b>Coverage of the test set {10, 20, 30, 31}:</b><br>2-value → 10, 30, 31 exercised, 9 not → 3 ÷ 4 = <b>75%</b>.<br>3-value → the same three items out of 6 (20 is not an item) → 3 ÷ 6 = <b>50%</b>.<br>The same tests often score lower under the stricter variant because it has more items, but this is not guaranteed (for example {11, 29} scores 0% with 2-value and 2 ÷ 6 with 3-value).' },
      { t: 'good', h: 'Worked example: a defect only 3-value finds', x: 'Requirement: temperatures up to 30 are accepted (x ≤ 30). The developer wrongly codes <code>x == 30</code>.<br>2-value upper-boundary data is 30 (accepted, correct) and 31 (rejected, correct): no failure, the defect hides.<br>3-value adds 29, which should be accepted but is rejected: the defect shows up.' },
      { t: 'warn', h: 'Classic traps', x: 'Using 3-value data when asked for 2-value coverage (or the reverse). Applying BVA to unordered partitions such as “card, voucher, cash”. Counting a mid-range value (20) as a boundary item. Taking the neighbour from the <i>same</i> partition for 2-value BVA: it must come from the adjacent one. Using the wrong resolution: for a field with one decimal place the neighbours of 10 are 9.9 and 10.1.' }
    ],
    table: { head: ['Boundary', '2-value items', '3-value items'], rows: [['Lower (10)', '9, 10', '9, 10, 11'], ['Upper (30)', '30, 31', '29, 30, 31'], ['Total items', '4', '6']] }
  },

  'dt': {
    paras: [
      'When the outcome depends on <i>combinations</i> of conditions, EP and BVA on each field alone will miss interactions. A decision table lists every condition and action as a row, and each column is a rule: one unique combination of condition values with the resulting actions. In a limited-entry table the cells are Boolean; in an extended-entry table a cell may hold a value or range (for example order value “&lt;50 / 50–99 / ≥100”).',
      'Building it is mechanical. <b>1)</b> Extract conditions and actions. <b>2)</b> Write the full table: n Boolean conditions give 2^n columns, so 3 conditions give 8 and 4 give 16. <b>3)</b> Fill in the actions from the rules of the requirement; a blank cell that you cannot fill is a gap in the requirement. <b>4)</b> Delete columns that cannot happen (infeasible). <b>5)</b> Optionally merge columns whose conditions do not change the outcome, marking the irrelevant condition with “–”. <b>6)</b> One test per remaining column; coverage = columns exercised ÷ feasible columns.'
    ],
    blocks: [
      { t: 'good', h: 'Worked example: online order', x: 'Rules: an unverified customer is rejected. A verified customer with the item in stock gets it shipped, with an express fee if express is chosen. A verified customer with the item out of stock gets a backorder. The UI only allows express for in-stock items.<br>Conditions: C1 verified, C2 in stock, C3 express chosen → 2^3 = <b>8</b> columns. Express with no stock is impossible, so R3 and R7 are <b>infeasible</b> → <b>6 feasible columns</b>.<br><b>Coverage:</b> tests for R1, R2, R4, R5 give 4 ÷ 6 ≈ <b>66.7%</b>; adding R6 and R8 makes 100%.<br><b>Minimised:</b> R5, R6 and R8 all reject whatever C2 and C3 say, so they merge into (F, –, –). The minimised table has <b>4 columns</b>: R1, R2, R4, (F, –, –); four tests give 100% of it.' },
      { t: 'warn', h: 'Classic traps', x: 'Dividing by 8 instead of 6: infeasible columns are not coverage items, so 4 ÷ 8 = 50% would be wrong. Merging columns whose actions differ. Forgetting that a minimised table has fewer coverage items, so the same tests give a different percentage. Confusing “–” (irrelevant, still a valid column) with “N/A” (infeasible).' }
    ],
    table: { head: ['', 'R1', 'R2', 'R3', 'R4', 'R5', 'R6', 'R7', 'R8'], rows: [['C1 Verified', 'T', 'T', 'T', 'T', 'F', 'F', 'F', 'F'], ['C2 In stock', 'T', 'T', 'F', 'F', 'T', 'T', 'F', 'F'], ['C3 Express', 'T', 'F', 'T', 'F', 'T', 'F', 'T', 'F'], ['A1 Ship', 'X', 'X', 'N/A', '', '', '', 'N/A', ''], ['A2 Express fee', 'X', '', 'N/A', '', '', '', 'N/A', ''], ['A3 Backorder', '', '', 'N/A', 'X', '', '', 'N/A', ''], ['A4 Reject', '', '', 'N/A', '', 'X', 'X', 'N/A', 'X']] }
  },

  'st': {
    paras: [
      'State transition testing fits anything whose reaction depends on <i>history</i>: the same event does different things depending on the current state. A model has states, transitions, events, optional guards and actions, written <code>event [guard] / action</code>. A <b>state table</b> lists every state against every event, so the empty cells show the invalid transitions that a diagram leaves out. The total number of cells is states × events, and valid + invalid = that product.',
      'A test case is a sequence of events producing a sequence of states. Compute coverage by listing the items first, then ticking them while walking through each test. The starting state counts as visited. For all-transitions coverage, a test attempts an invalid event from a given state, and best practice is <b>one invalid attempt per test</b> so that one defect cannot mask another.'
    ],
    blocks: [
      { t: 'good', h: 'Worked example: order life cycle', x: 'States: Cart, Paid, Shipped, Cancelled. Events: pay, ship, cancel.<br>Valid transitions (4): T1 Cart –pay [card authorised] / send receipt→ Paid; T2 Cart –cancel→ Cancelled; T3 Paid –ship→ Shipped; T4 Paid –cancel / refund→ Cancelled. Table size 4 × 3 = <b>12</b> cells, so <b>8 invalid</b>.<br><b>TC1</b> pay, ship: Cart→Paid→Shipped. States 3 ÷ 4 = 75%; valid transitions 2 ÷ 4 = 50%.<br><b>TC2</b> cancel from Cart: adds Cancelled. All states 4 ÷ 4 = <b>100%</b>, yet valid transitions only 3 ÷ 4 = <b>75%</b>.<br><b>TC3</b> pay, cancel: adds T4 → valid transitions 4 ÷ 4 = <b>100%</b>.<br><b>All transitions:</b> after TC1–TC3 only the 4 valid ones are done: 4 ÷ 12 ≈ <b>33.3%</b>. Eight more tests, each attempting a single invalid cell (Cart/ship, Paid/pay, Shipped/pay, Shipped/ship, Shipped/cancel, Cancelled/pay, Cancelled/ship, Cancelled/cancel), give 12 ÷ 12 = 100%.' },
      { t: 'warn', h: 'Classic traps', x: 'Equating “every state visited” with “every transition used” (TC1 + TC2 above). Counting the invalid cells in valid-transitions coverage: they belong only to all-transitions coverage. Forgetting that a guard needs both outcomes (authorised and declined) to be tried: the declined card keeps the order in Cart. Remember the chain: all transitions ⇒ valid transitions ⇒ all states, never the reverse.' }
    ],
    table: { head: ['State \\ Event', 'pay', 'ship', 'cancel'], rows: [['Cart', 'Paid (receipt)', '', 'Cancelled'], ['Paid', '', 'Shipped', 'Cancelled (refund)'], ['Shipped', '', '', ''], ['Cancelled', '', '', '']] }
  },

  'statement': {
    paras: [
      'Statement coverage looks at the code, not the spec. The coverage items are <b>executable statements</b>: assignments, calls, prints, and also the <code>if</code>/<code>while</code> line itself. Things that do nothing at run time, such as <code>end if</code>, <code>else</code>, braces, declarations and comments, are not counted. Count first, then trace each test through the code and tick the lines it runs.',
      'Reaching 100% proves that every line has been run at least once. It does not prove the lines are right (data-dependent defects such as division by zero slip through) and it does not prove that every decision outcome has been tried: a decision whose “false” side has no statement of its own can be left untested while all statements are covered.'
    ],
    blocks: [
      { t: 'good', h: 'Worked example: shipping fee', x: '<code>1 fee = 5<br>2 if weight &gt; 10 then<br>3 &nbsp; fee = fee + 10<br>4 end if<br>5 if express = true then<br>6 &nbsp; fee = fee * 2<br>7 end if<br>8 print fee</code><br>Executable statements: 1, 2, 3, 5, 6, 8 = <b>6</b> (lines 4 and 7 are not).<br><b>Test A:</b> weight 12, express true runs 1, 2, 3, 5, 6, 8 → 6 ÷ 6 = <b>100%</b> with one test.<br><b>Test B:</b> weight 5, express false runs 1, 2, 5, 8 → 4 ÷ 6 ≈ <b>66.7%</b>.<br><b>Test C:</b> weight 12, express false runs 1, 2, 3, 5, 8 → 5 ÷ 6 ≈ <b>83.3%</b>.' },
      { t: 'warn', h: 'Classic traps', x: 'Counting <code>end if</code> or <code>else</code> as statements. Thinking 100% statement coverage means every decision outcome was exercised: Test A reaches 100% statement coverage but never makes either decision false (see the next section). Believing it finds all defects in executed code: executed does not mean verified.' }
    ]
  },

  'branch': {
    paras: [
      'A branch is one edge in the control flow graph: the control goes from one node to the next, either unconditionally (straight-line code, or paths joining again after an <code>if</code>) or conditionally (the true or false outcome of a decision, a <code>switch</code> case, staying in or leaving a loop). Branch coverage is the exercised branches divided by all branches, and 100% means every edge was taken, which in particular forces <b>every decision to be true and false at least once</b>.',
      'This is why branch coverage subsumes statement coverage: if every edge is traversed, every node, and therefore every statement, is run. The reverse fails, as the example shows. Test sets are often built by satisfying each decision both ways and then checking for lines still untouched.'
    ],
    blocks: [
      { t: 'good', h: 'Worked example: same shipping-fee code', x: 'Nodes: N1 (lines 1–2, decision weight &gt; 10), N3 (fee + 10), N5 (decision express), N6 (fee * 2), N8 (print). Branches: N1→N3 (true), N1→N5 (false), N3→N5 (unconditional), N5→N6 (true), N5→N8 (false), N6→N8 (unconditional) = <b>6 branches</b>.<br><b>Test A</b> (weight 12, express true) takes N1→N3, N3→N5, N5→N6, N6→N8 = 4 ÷ 6 ≈ <b>66.7%</b>, although statement coverage is 100%.<br><b>Test B</b> (weight 5, express false) takes N1→N5 and N5→N8, which are exactly the two missing branches. A + B → 6 ÷ 6 = <b>100%</b>.<br>Another valid pair is (12, false) plus (5, true). Two tests are the minimum, because each test takes only one outcome per decision.<br><i>Shortcut:</i> if a question counts only decision outcomes, there are 4 (two decisions × true/false), and Test A scores 2 ÷ 4 = 50%. Read the question for how the graph is defined; the principle is unchanged.' },
      { t: 'warn', h: 'Classic traps', x: 'Calling statement coverage the stronger criterion. The direction is: 100% branch ⇒ 100% statement, never the reverse. Forgetting that an <code>if</code> without an <code>else</code> still has a false branch. Believing that 100% branch coverage tests every path: two decisions give four paths, but two tests can already cover all branches.' }
    ]
  },

  'whitebox': {
    paras: [
      'The defining strength of structure-based testing is that it looks at what the software actually does, not what the documents claim. If the specification is vague, outdated or missing, the code is still there to analyse, so white-box tests can still be designed. The mirror-image weakness is that the code can only be tested for what it contains. A requirement that nobody implemented leaves no statement or branch to cover, so 100% coverage can coexist with a missing feature.',
      'Because the techniques depend only on the logic, they also work <i>without running anything</i>: walking through code or pseudocode by hand with sample data (a dry run) during a review is a form of white-box analysis, and it suits code that is not yet executable. Finally, coverage figures are an objective yardstick. Pure black-box testing gives you no idea which parts of the code were exercised; a coverage report shows exactly which statements or branches are untouched, and that tells you which tests to add.'
    ],
    blocks: [
      { t: 'good', h: 'Worked example: two sides of the same coin', x: 'Spec: “Cancelled orders are refunded. Orders above 100 get a gift wrap.” The code has a gift-wrap check but nobody wrote the refund routine.<br><b>Strength:</b> the coverage report shows the gift-wrap branch for orders ≤ 100 untested, so a test is added, even though the spec never said what should happen there.<br><b>Weakness:</b> after the tests, coverage is 100% of the existing code and everything passes, yet cancelled orders are never refunded. Only a specification-based test (“cancel an order, check the refund”) exposes this defect of omission.' },
      { t: 'warn', h: 'Remember', x: 'The right conclusion is not “white-box is better” but “use both”. Black-box finds missing behaviour, white-box finds untested and unspecified behaviour, and white-box coverage measures what black-box tests really reached.' }
    ],
    list: [
      'Strength: whole implementation considered, works with poor specifications.',
      'Weakness: defects of omission are invisible.',
      'Also useful in static testing and for pseudocode that can be modelled as a control flow graph.',
      'Provides an objective coverage figure and pointers to additional tests.'
    ]
  },

  'errorguess': {
    paras: [
      'Error guessing is not random poking. It turns lessons into tests: how this application misbehaved before, which mistakes developers on this team make again and again, and what went wrong in similar products. A useful way to think is by <b>error type</b>: input (valid data refused, parameter missing), output (wrong format, wrong result), logic (missing case, wrong operator), computation (wrong operand, wrong formula), interface (parameter mismatch, incompatible types), data (not initialised, wrong type).',
      'A <b>fault attack</b> is the organised version. You build a list of suspected faults from experience, defect and failure data or general knowledge of why software fails, then design a test for each entry that would make the fault visible. Because the list comes from the tester, the technique is only as good as the person’s experience, which is why it complements systematic techniques rather than replacing them. Keep the list alive: add every high-severity defect found later.'
    ],
    blocks: [
      { t: 'good', h: 'Worked example: money-transfer form', x: 'Fault attack list for a form with source account, destination account and amount. Each row ties a suspected error type to a concrete test.' },
      { t: 'warn', h: 'Trap', x: 'Error guessing has no coverage measure such as “75% of partitions”. Do not claim a percentage for it. It also does not require documented test cases, and it is not the same as exploratory testing, although exploratory sessions often use it.' }
    ],
    table: { head: ['Error type', 'Suspected fault', 'Test input'], rows: [['Input', 'Valid value rejected', 'Amount 1,000.00 with a thousands separator'], ['Input', 'Missing parameter not detected', 'Amount field left empty'], ['Logic', 'Same account allowed', 'Source and destination identical'], ['Computation', 'Rounding wrong', 'Amount 0.005 and 10.995'], ['Data', 'Wrong type accepted', 'Amount “ten”; amount −50'], ['Interface', 'Limit mismatch with bank API', 'Amount 1 above the API limit'], ['Output', 'Confirmation shows wrong value', 'Compare the receipt amount with the entered amount']] }
  },

  'exploratory': {
    paras: [
      'In exploratory testing the thinking, running and judging all happen at the same time: each result you see decides the next thing you try. It is a way to learn the product while testing it, to dig deeper where something looks fishy, and to create tests for areas nobody covered. It is valuable when documentation is thin, when time is short, and as a complement to scripted tests.',
      'To avoid chaos, teams use <b>session-based testing</b>: a fixed time box, a <b>charter</b> that states the objective, notes taken during the session (a session sheet) and a short <b>debriefing</b> with stakeholders afterwards. The charter objectives act as high-level test conditions, and the tester identifies coverage items (screens, rules, data classes) while exploring. Exploratory testers can use other techniques inside the session, for example EP for the data they enter. The approach rewards experience, domain knowledge, curiosity and analytical skill.'
    ],
    blocks: [
      { t: 'good', h: 'Worked example: one 90-minute session', x: '<b>Charter:</b> “Explore the booking-cancellation flow with different user roles to discover problems in refund amounts.”<br><b>Time box:</b> 90 minutes.<br><b>During:</b> the tester cancels a booking 48 h before departure, then 2 h before, then after check-in; repeats as guest and member; switches currency halfway. Notes record what was tried and what looked odd.<br><b>Session sheet:</b> coverage items touched (3 time windows × 2 roles), defect found (member refund uses the guest rate), open questions (is the fee refundable?).<br><b>Debrief:</b> tester and product owner review the findings and decide on follow-up charters, for example “explore the refund email texts”.' },
      { t: 'warn', h: 'Trap', x: 'Exploratory testing is not “testing without a plan”: a time box and a charter are the plan. And a charter is a test objective, not a test case: nothing is scripted in advance, so repeatability is low.' }
    ]
  },

  'checklist': {
    paras: [
      'A checklist captures the conditions that matter, often learnt the hard way, so that nothing important is forgotten and testers behave consistently without full test scripts. The tester designs and runs tests to cover each entry. Entries are best formulated as <b>questions</b> that can be answered separately and directly, such as “Does an invalid e-mail address show an error message next to the field?”.',
      'Quality rules: leave out what a tool can check automatically, what is really an entry or exit criterion, and anything so general that two testers would interpret it differently. Maintenance matters as much as writing: entries age because developers stop making those mistakes, new high-severity defects should produce new entries, and the list should be pruned so it stays short enough to be used.',
      'A high-level checklist leaves room for interpretation. That brings variety, and with it possibly greater coverage, but two runs will not be identical, so <b>repeatability suffers</b>.'
    ],
    blocks: [
      { t: 'good', h: 'Worked example: login page checklist', x: '1. Is the password masked while typing?<br>2. Does a wrong password show a message that does not reveal whether the user name exists?<br>3. Is the account locked after the configured number of failed attempts?<br>4. Does Enter submit the form?<br>5. Can the whole form be used with the keyboard only?<br><b>Run:</b> tester A ticks 1, 2, 4 as passed, 3 as failed (lock after 6 instead of 5 tries), 5 not tested. Result: 3 of 5 entries pass, 1 fails, 1 open. Tester B might try different wrong passwords and so reach slightly different coverage: that is the repeatability trade-off.' },
      { t: 'warn', h: 'Bad items and why', x: '“Is the system usable?” is too general. “Does the unit-test suite pass?” is checkable by a tool. “Is the build free of blocking defects?” is really an entry criterion for the testing phase. None of the three belongs in a checklist.' }
    ]
  },

  'userstory': {
    paras: [
      'A user story is a short statement of something valuable to a user or purchaser, not a specification. The “3 C’s” describe its life: the <b>Card</b> holds the short text, the <b>Conversation</b> is where the team discovers the details, and the <b>Confirmation</b> is the set of acceptance criteria that will tell everyone it is done. The usual template is <i>As a [role], I want [goal], so that I can [benefit]</i>.',
      'Writing the story together, with brainstorming or mind maps, is a defect-avoidance activity: business, development and testing contribute their own perspective, and ambiguity is discovered while it is cheap to fix. Testers typically ask the awkward questions about errors and limits. The quality bar is <b>INVEST</b>: Independent, Negotiable, Valuable, Estimable, Small, Testable. If a stakeholder cannot say how the story would be tested, that is a signal: the story may be unclear, may not be valuable to them, or they may simply need help with testing.'
    ],
    blocks: [
      { t: 'good', h: 'Worked example: from vague to good', x: '<b>Vague:</b> “The system shall handle loan renewals.” (no role, no value, not testable).<br><b>Story:</b> “As a library member, I want to renew a borrowed book online, so that I avoid a trip to the library.”<br><b>Conversation, three perspectives:</b> business (how many renewals, and how long is each?), development (does the catalogue API expose reservations?), testing (what happens when someone reserved the title, and on the last allowed renewal?).<br><b>Confirmation, agreed result:</b> each renewal adds 14 days; at most 2 renewals; renewal refused if another member reserved the book.' },
      { t: 'warn', h: 'Trap', x: 'The 3 C’s (Card, Conversation, Confirmation) and INVEST are two different things; do not mix them. Also, “Estimable” and “Small” are not the same: a story can be understood but still too large to fit an iteration, which means it should be split.' }
    ],
    list: [
      'Story text is deliberately short: the detail lives in the conversation and the criteria.',
      'Typical INVEST failure: a story that depends on another story (not Independent) or a vague “be fast” (not Testable).'
    ]
  },

  'ac': {
    paras: [
      'Acceptance criteria are the conditions that an implementation must meet to be accepted. They are the result of the conversation, and from a tester’s viewpoint they are the <b>test conditions</b> for the story. They are used to define scope, to reach consensus among stakeholders, to describe positive and negative scenarios, to serve as a basis for acceptance testing and to support planning and estimation.',
      'Two formats cover most needs. <b>Scenario-oriented</b> criteria tell a little story in <i>Given</i> (precondition) / <i>When</i> (action) / <i>Then</i> (observable result), the format used in behaviour-driven development. <b>Rule-oriented</b> criteria are a bullet list of rules or a table mapping inputs to outputs, which is better when many combinations of values exist. A team may also use its own format if every criterion is well defined and unambiguous.'
    ],
    blocks: [
      { t: 'good', h: 'Worked example: scenario-oriented', x: '<b>Scenario 1:</b> Given a member has renewed a book once and nobody has reserved it, When she presses “Renew”, Then the due date moves 14 days later and the screen shows “Renewals used: 2 of 2”.<br><b>Scenario 2:</b> Given a book with 2 renewals already used, When the member presses “Renew”, Then the renewal is refused with the message “Renewal limit reached” and the due date does not change.' },
      { t: 'good', h: 'Worked example: rule-oriented', x: 'The same behaviour as bullets: R1 each renewal extends the due date by 14 days; R2 at most 2 renewals per loan; R3 no renewal when another member has reserved the title. The table below maps inputs to results and doubles as a ready-made list of tests.' },
      { t: 'warn', h: 'Trap', x: 'Given/When/Then is <i>one</i> way (scenario-oriented), not the definition of acceptance criteria. And a criterion that cannot be answered with yes or no, such as “renewal should be quick”, is ambiguous and fails the “well-defined” test.' }
    ],
    table: { head: ['Renewals used', 'Reserved by another member', 'Result'], rows: [['0', 'No', 'Renewed, due date +14 days'], ['1', 'No', 'Renewed, due date +14 days'], ['2', 'No', 'Refused: limit reached'], ['0 or 1', 'Yes', 'Refused: title reserved'], ['2', 'Yes', 'Refused (either reason)']] }
  },

  'atdd': {
    paras: [
      'ATDD means the acceptance tests exist <i>before</i> the code. First, a <b>specification workshop</b> gathers customers, developers and testers to analyse the story and criteria, removing incompleteness and ambiguity. Next, test cases are derived from the criteria, by the whole team or by the tester alone, in language the stakeholders can read: preconditions, inputs and expected results. These tests are also examples of how the software should behave, and techniques from 4.2 to 4.4 (EP, BVA, decision tables) can be used to choose them.',
      'The order matters: <b>positive</b> tests first (the expected flow, no errors), then <b>negative</b> tests, and finally <b>non-functional</b> characteristics such as performance or usability. Quality rules for the set: it must cover all characteristics of the story, it must not go beyond the story, and no two tests may describe the same characteristic. If the tests are written in a format that an automation framework understands, developers can automate them while implementing the story, and they become executable requirements.'
    ],
    blocks: [
      { t: 'good', h: 'Worked example: renewing a library loan', x: 'Story: renew a loan online. Criteria: AC1 renewal adds 14 days, AC2 maximum 2 renewals, AC3 refused if the title is reserved, AC4 the renewal result appears within 2 seconds under normal load.<br><b>TC1 (positive, AC1):</b> Given a loan due 1 March with 0 renewals and no reservation, When renew, Then due date is 15 March and renewals used = 1.<br><b>TC2 (positive, AC2 upper limit):</b> Given 1 renewal used, When renew, Then it succeeds and renewals used = 2.<br><b>TC3 (negative, AC2 just beyond the limit):</b> Given 2 renewals used, When renew, Then refused with “Renewal limit reached”, due date unchanged.<br><b>TC4 (negative, AC3):</b> Given another member reserved the title, When renew, Then refused with “Title reserved”.<br><b>TC5 (non-functional, AC4):</b> a renewal is confirmed within 2 seconds.<br>The order is positive, negative, non-functional, and every criterion is covered once. TC2 and TC3 are 2-value BVA on the number of the renewal attempt (the 2nd is the last allowed, the 3rd is the first refused).' },
      { t: 'warn', h: 'Classic traps', x: 'A test “send an SMS reminder after renewal” goes beyond the story and must not be included. Two tests that both check the 14-day extension duplicate each other. Putting a performance test before the functional ones breaks the usual order. ATDD is not unit-level TDD: it starts from the story, with the business side present in the workshop.' }
    ]
  }
};

/* Registry of certification packs – the catalogue of the platform.
 * To add a certification: create certs/<folder>/ with cert.js (+ optional study files) and one or more
 * q-*.js files, then add ONE entry below. The landing page, catalogue, sidebar, syllabus, study, tests and
 * progress screens all build themselves from the pack – nothing else in the app needs to change.
 *
 * Entry fields
 *   id, folder, org, name, short, level, description   – shown on the catalogue card
 *   accent          – colour of the certification (buttons, headers and highlights switch to it)
 *   badge           – 2-4 letters shown on the card icon
 *   syllabusNote    – where the syllabus comes from (shown on the Syllabus page)
 *   officialUrl     – public ISTQB page where the official sample exams can be taken
 *   defaultExamDate – leave '' so every learner enters their own exam date
 *   files           – loaded lazily, in this order, when the certification is opened
 * Order in this list = order in the catalogue. */
window.ICREGISTRY = [
  {
    id: 'ctfl-4',
    folder: 'ctfl-4',
    org: 'ISTQB',
    name: 'Certified Tester Foundation Level',
    short: 'CTFL v4.0',
    badge: 'FL',
    level: 'Foundation level · Syllabus v4.0 (v4.0.1 errata edition)',
    description: 'The world’s most popular software-testing certification. Fundamentals, lifecycle, static testing, test techniques, test management and tools.',
    accent: '#475569',
    syllabusNote: 'Structure, learning objectives and exam rules follow the ISTQB CTFL Syllabus v4.0.1 (the errata release of v4.0) and the ISTQB Exam Structures &amp; Rules. All notes, flashcards and questions on iCertified are original.',
    officialUrl: 'https://www.istqb.org/certifications/certified-tester-foundation-level-ctfl-v4-0',
    defaultExamDate: '',
    files: ['cert.js', 'study-ch1.js', 'study-ch2.js', 'study-ch3.js', 'study-ch4.js', 'study-ch5.js', 'study-ch6.js', 'study-guide.js', 'detail-ch1.js', 'detail-ch2.js', 'detail-ch3.js', 'detail-ch4.js', 'detail-ch5.js', 'detail-ch6.js',
      'q-ch1.js', 'q-ch2.js', 'q-ch3.js', 'q-ch4.js', 'q-ch4b.js', 'q-ch5.js', 'q-ch5b.js', 'q-ch6.js', 'q-extra.js']
  },
  {
    id: 'ct-genai',
    folder: 'ct-genai',
    org: 'ISTQB',
    name: 'Testing with Generative AI',
    short: 'CT-GenAI',
    badge: 'AI',
    level: 'Specialist level · Syllabus v1.1',
    description: 'ISTQB Certified Tester – Testing with Generative AI. Prompt engineering, risks, LLM-powered test infrastructure and adoption.',
    accent: '#a24a08',
    syllabusNote: 'Structure, learning objectives and exam rules follow the ISTQB CT-GenAI Syllabus v1.1 and the ISTQB Exam Structures &amp; Rules. All notes, flashcards and questions on iCertified are original.',
    officialUrl: 'https://istqb.org/certifications/gen-ai/',
    defaultExamDate: '',
    // loaded lazily, in this order, when the certification is opened
    files: ['cert.js', 'study.js', 'detail-ch1.js', 'detail-ch2.js', 'detail-ch3.js', 'detail-ch4.js', 'detail-ch5.js', 'q-ch1.js', 'q-ch2.js', 'q-ch3.js', 'q-ch4.js', 'q-ch5.js', 'q-extra.js']
  }
];

/* Registry of certification packs.
 * To add a certification: create certs/<folder>/ with cert.js (+ optional study.js) and one or more
 * q-*.js files, then add ONE entry below. Nothing else in the app needs to change. */
window.ICREGISTRY = [
  {
    id: 'ct-genai',
    folder: 'ct-genai',
    org: 'ISTQB',
    name: 'Testing with Generative AI',
    short: 'CT-GenAI',
    level: 'Specialist level · Syllabus v1.1',
    description: 'ISTQB Certified Tester – Testing with Generative AI. Prompt engineering, risks, LLM-powered test infrastructure and adoption.',
    accent: '#4f46e5',
    defaultExamDate: '2026-12-05',
    // loaded lazily, in this order, when the certification is opened
    files: ['cert.js', 'study.js', 'q-ch1.js', 'q-ch2.js', 'q-ch3.js', 'q-ch4.js', 'q-ch5.js']
  }
  // ,{ id: 'ctfl-4', folder: 'ctfl-4', org: 'ISTQB', name: 'Foundation Level', short: 'CTFL', ... files: [...] }
];

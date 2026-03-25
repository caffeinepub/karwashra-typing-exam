export interface ExamData {
  id: string;
  name: string;
  authority: string;
  requiredWPM: number;
  timeMin: number;
  language: string;
  accuracy: number;
  officialSite: string;
  description: string;
  category: string;
  rules: string[];
  negativeMarking: string;
  importantNotes: string[];
  eligibility: string;
  markingScheme: string;
}

export const EXAMS: ExamData[] = [
  {
    id: "ssc-chsl",
    name: "SSC CHSL",
    authority: "Staff Selection Commission",
    requiredWPM: 35,
    timeMin: 10,
    language: "English",
    accuracy: 95,
    officialSite: "https://ssc.nic.in",
    description: "Combined Higher Secondary Level Examination",
    category: "SSC",
    eligibility: "Class 12 pass from a recognized board",
    markingScheme:
      "1 mark per correct word, deduction for errors beyond 5% threshold",
    rules: [
      "Typing speed of 35 WPM for English medium posts",
      "Minimum accuracy of 95% required to qualify",
      "Test duration is 10 minutes on computer",
      "No use of backspace after passage begins in some variants",
      "Passage is provided on screen — candidate must type the same",
      "Speed is calculated as net words typed (correct) per minute",
    ],
    negativeMarking:
      "No negative marking. Errors count against net speed — each error reduces correct word count.",
    importantNotes: [
      "Skill test is qualifying in nature — marks not added to final merit",
      "Blind typing is preferred; do not look at keyboard",
      "Practice with official SSC passages for best preparation",
      "Bilingual passages not provided — English only for CHSL",
    ],
  },
  {
    id: "ssc-cgl",
    name: "SSC CGL",
    authority: "Staff Selection Commission",
    requiredWPM: 35,
    timeMin: 10,
    language: "English",
    accuracy: 95,
    officialSite: "https://ssc.nic.in",
    description: "Combined Graduate Level Examination",
    category: "SSC",
    eligibility: "Graduate from any recognized university",
    markingScheme:
      "Net typing speed (gross WPM minus error penalty) must meet 35 WPM threshold",
    rules: [
      "Typing test required for posts like Tax Assistant, DEO",
      "35 WPM minimum for English typing test",
      "Test is conducted on a standard QWERTY keyboard",
      "Passage is displayed on screen — candidate types verbatim",
      "Errors beyond 5% deducted from final speed calculation",
      "Duration: 10 minutes on computer",
    ],
    negativeMarking:
      "Errors reduce net WPM. Accuracy below 95% may lead to disqualification.",
    importantNotes: [
      "Typing test is qualifying — not included in final marks",
      "Some CGL posts have Data Entry speed requirement instead",
      "Practice government notification-style passages",
    ],
  },
  {
    id: "ssc-steno-c",
    name: "SSC Steno Grade C",
    authority: "Staff Selection Commission",
    requiredWPM: 50,
    timeMin: 10,
    language: "English",
    accuracy: 95,
    officialSite: "https://ssc.nic.in",
    description:
      "Stenographer Grade C — 100 WPM shorthand, 50 WPM transcription",
    category: "SSC",
    eligibility: "12th pass with shorthand proficiency at 100 WPM",
    markingScheme: "Transcription accuracy and speed both evaluated",
    rules: [
      "Shorthand dictation at 100 WPM for 10 minutes",
      "Transcription on computer — 50 WPM typing required",
      "Transcription time: 50 minutes (English) or 65 minutes (Hindi)",
      "Errors in shorthand notes and transcription both penalized",
      "Minimum 95% accuracy in typed transcript required",
      "Both shorthand and transcription must be qualified",
    ],
    negativeMarking:
      "Errors in transcription reduce score. Below threshold = disqualification.",
    importantNotes: [
      "Grade C steno serves in Central Government offices",
      "Must practice Pitman/Gregg shorthand alongside typing",
      "Transcription test uses dictation audio/text provided on day",
    ],
  },
  {
    id: "ssc-steno-d",
    name: "SSC Steno Grade D",
    authority: "Staff Selection Commission",
    requiredWPM: 40,
    timeMin: 10,
    language: "English",
    accuracy: 95,
    officialSite: "https://ssc.nic.in",
    description:
      "Stenographer Grade D — 80 WPM shorthand, 40 WPM transcription",
    category: "SSC",
    eligibility: "12th pass with shorthand proficiency at 80 WPM",
    markingScheme: "Combined shorthand + transcription evaluation",
    rules: [
      "Shorthand dictation at 80 WPM for 10 minutes",
      "Transcription on computer — 40 WPM typing required",
      "Transcription time: 50 minutes (English)",
      "Accuracy of 95% in transcription mandatory",
      "Test conducted at designated SSC centers",
      "Passage is official government correspondence style",
    ],
    negativeMarking:
      "Errors reduce effective WPM. Candidates with errors beyond limit are disqualified.",
    importantNotes: [
      "Grade D steno serves in lower administrative roles",
      "Shorthand practice equally important as typing",
      "Check SSC official notice for updated rules each year",
    ],
  },
  {
    id: "rrb-ntpc",
    name: "RRB NTPC",
    authority: "Railway Recruitment Board",
    requiredWPM: 30,
    timeMin: 10,
    language: "English/Hindi",
    accuracy: 95,
    officialSite: "https://www.rrbcdg.gov.in",
    description:
      "Non-Technical Popular Categories — 30 WPM English or 25 WPM Hindi",
    category: "Railway",
    eligibility: "Graduate for Level 6 posts; 12th pass for Level 2-5 posts",
    markingScheme:
      "Net WPM calculated; both English and Hindi options available",
    rules: [
      "Typing speed: 30 WPM in English or 25 WPM in Hindi",
      "Computer-based typing test for Junior Clerk, Accounts Clerk, etc.",
      "Bilingual passage — candidate chooses language at start of test",
      "Minimum 95% accuracy required",
      "Duration: 10 minutes on standard computer",
      "No bilingual option for Senior Clerk and higher posts",
    ],
    negativeMarking:
      "No negative marking. Net WPM = gross WPM minus error deduction.",
    importantNotes: [
      "Skill test is qualifying — merit based on written exam",
      "Hindi typing uses Mangal/Unicode font (Inscript/Remington layout)",
      "Check regional RRB website for specific post requirements",
    ],
  },
  {
    id: "bank-po",
    name: "Bank PO",
    authority: "IBPS / SBI",
    requiredWPM: 40,
    timeMin: 10,
    language: "English",
    accuracy: 95,
    officialSite: "https://www.ibps.in",
    description: "Probationary Officer Examination",
    category: "Banking",
    eligibility: "Graduate in any discipline aged 20-30 years",
    markingScheme:
      "Typing speed evaluated in interview/process phase for specific roles",
    rules: [
      "Typing test required for specific clerical and data-entry roles",
      "40 WPM minimum for English typing",
      "Test duration is 10 minutes",
      "Standard QWERTY keyboard used",
      "Passage is banking/finance related for contextual practice",
      "Accuracy of 95% required to pass",
    ],
    negativeMarking:
      "Errors reduce net speed. Consistent errors may result in test failure.",
    importantNotes: [
      "Typing test may be part of document verification or final round",
      "Focus on accuracy over speed in banking exams",
      "Check IBPS/SBI official notification for current year rules",
    ],
  },
  {
    id: "bank-clerk",
    name: "Bank Clerk",
    authority: "IBPS / SBI",
    requiredWPM: 30,
    timeMin: 10,
    language: "English",
    accuracy: 95,
    officialSite: "https://www.ibps.in",
    description: "Clerical Cadre Examination",
    category: "Banking",
    eligibility: "12th pass or Graduate depending on the bank",
    markingScheme: "Qualifying typing test alongside written examination",
    rules: [
      "Typing speed: 30 WPM for English",
      "Test duration: 10 minutes",
      "Passage provided on screen — must be typed verbatim",
      "Accuracy minimum: 95%",
      "Standard computer keyboard used",
      "No shortcuts or autocomplete features during test",
    ],
    negativeMarking:
      "No direct negative marking. Errors reduce net speed below threshold causes failure.",
    importantNotes: [
      "Qualifying typing test is mandatory for selection",
      "SBI Clerk has separate typing test as per notification",
      "Regional language typing may be required for some state banks",
    ],
  },
  {
    id: "high-court",
    name: "High Court Steno/Clerk",
    authority: "High Court of India",
    requiredWPM: 30,
    timeMin: 15,
    language: "English",
    accuracy: 97,
    officialSite: "https://highcourtchd.gov.in",
    description: "High Court Stenographer and Clerk typing test",
    category: "Court",
    eligibility: "Graduate; law background preferred for some posts",
    markingScheme: "Strict accuracy requirements — 97% minimum accuracy",
    rules: [
      "Typing test: 30 WPM minimum for 15 minutes",
      "Accuracy requirement: 97% (stricter than other exams)",
      "Legal terminology passages typically used",
      "No backspace/correction allowed in some High Court exams",
      "Test is conducted on computer with basic text editor",
      "Steno: additional shorthand test at 80-100 WPM",
    ],
    negativeMarking:
      "Errors strictly penalized. Each error may deduct from total score. High accuracy is critical.",
    importantNotes: [
      "High Court exam rules vary by state — check official HC website",
      "Legal vocabulary practice highly recommended",
      "Typing test may be online or offline depending on the HC",
      "Character verification conducted for all court posts",
    ],
  },
  {
    id: "haryana-ssc",
    name: "Haryana SSC (HSSC)",
    authority: "Haryana Staff Selection Commission",
    requiredWPM: 30,
    timeMin: 10,
    language: "Hindi/English",
    accuracy: 95,
    officialSite: "https://hssc.gov.in",
    description: "Haryana government jobs typing test",
    category: "State Govt",
    eligibility: "Domicile of Haryana required; qualification as per post",
    markingScheme: "Qualifying in nature; WPM and accuracy both checked",
    rules: [
      "Hindi typing: 25 WPM minimum using Kruti Dev or Unicode",
      "English typing: 30 WPM minimum",
      "Test duration: 10 minutes",
      "Both Hindi and English typing may be required for bilingual posts",
      "Accuracy: 95% minimum for qualifying",
      "Haryana government notification must be checked for each post",
    ],
    negativeMarking:
      "No negative marking. Below-threshold accuracy results in disqualification.",
    importantNotes: [
      "Hindi typing uses Kruti Dev font (Remington keyboard layout)",
      "Some posts require bilingual typing proficiency",
      "Check HSSC official site for post-specific requirements",
      "Haryana domicile certificate mandatory for state posts",
    ],
  },
  {
    id: "ldc",
    name: "LDC (Lower Division Clerk)",
    authority: "SSC / State PSC",
    requiredWPM: 35,
    timeMin: 10,
    language: "English/Hindi",
    accuracy: 95,
    officialSite: "https://ssc.nic.in",
    description: "Lower Division Clerk typing test — 10500 KDPH",
    category: "SSC",
    eligibility: "12th pass from a recognized board",
    markingScheme:
      "10500 key depressions per hour (KDPH) for English; 9000 KDPH for Hindi",
    rules: [
      "English: 10500 KDPH (approx. 35 WPM)",
      "Hindi: 9000 KDPH (approx. 30 WPM)",
      "Test duration: 10 minutes",
      "Speed measured in key depressions per hour",
      "95% accuracy mandatory",
      "Errors beyond 5% threshold cause disqualification",
    ],
    negativeMarking:
      "Net KDPH = gross KDPH minus errors. Below 10500 KDPH = not qualified.",
    importantNotes: [
      "LDC posts are in Central/State government offices",
      "Practice with all 10 fingers (touch typing) for best results",
      "Hindi medium candidates should practice Inscript layout",
      "Test keyboard is standard government-issue desktop",
    ],
  },
  {
    id: "deo",
    name: "DEO (Data Entry Operator)",
    authority: "SSC",
    requiredWPM: 0,
    timeMin: 15,
    language: "English",
    accuracy: 95,
    officialSite: "https://ssc.nic.in",
    description: "15000 Key Depressions Per Hour on computer",
    category: "SSC",
    eligibility: "12th pass with Science/Maths; Computer certificate mandatory",
    markingScheme: "15000 KDPH minimum (approx. 50 WPM); accuracy 95%+",
    rules: [
      "15000 key depressions per hour minimum",
      "Test duration: 15 minutes on computer",
      "Data entry includes numbers, symbols, and text",
      "Standard keyboard layout; numeric keypad may be used",
      "Accuracy: 95% minimum",
      "Both alphabetic and numeric data entry tested",
    ],
    negativeMarking:
      "No negative marking. Net KDPH must meet 15000 threshold after error deduction.",
    importantNotes: [
      "DEO in Income Tax: also requires data entry accuracy in accounts",
      "Numeric keypad proficiency is a major advantage",
      "Practice mixed text + numbers for realistic preparation",
      "SSC DEO is one of the most competitive typing posts",
    ],
  },
  {
    id: "clerk",
    name: "Clerk (General)",
    authority: "Various State Governments",
    requiredWPM: 30,
    timeMin: 10,
    language: "Hindi/English",
    accuracy: 95,
    officialSite: "https://ssc.nic.in",
    description: "State Government Clerk typing examination",
    category: "State Govt",
    eligibility: "12th pass; qualification varies by state",
    markingScheme: "30 WPM minimum for English; 25 WPM for Hindi; 95% accuracy",
    rules: [
      "English typing: 30 WPM minimum",
      "Hindi typing: 25 WPM minimum",
      "Test duration: 10 minutes",
      "Passage is government notice or official correspondence",
      "95% accuracy required",
      "State-specific font requirements (Kruti Dev for many Hindi states)",
    ],
    negativeMarking:
      "Errors reduce net WPM. State rules may vary — check official notification.",
    importantNotes: [
      "Rules vary significantly between states",
      "Always verify font (Unicode vs. Kruti Dev) from official notification",
      "Bilingual clerks may need both Hindi and English test",
      "Practice on the same keyboard type as exam center if possible",
    ],
  },
];

export const PASSAGES: Record<string, string[]> = {
  english: [
    "The Government of India has always given priority to the welfare of its citizens through various developmental schemes and programmes. The Ministry of Finance allocates substantial resources every year to ensure that essential services reach every corner of the country. It is the responsibility of every government employee to work diligently and with full honesty so that the common people benefit from these programmes. The integrity and efficiency of the public service system is crucial for the overall development of the nation.",
    "The Supreme Court of India serves as the apex judicial body responsible for interpreting the Constitution and ensuring justice for all citizens. Every year, thousands of cases are heard by the honourable judges who deliver landmark judgements that shape the legal landscape of the country. The rule of law is the foundation upon which democratic governance rests. Citizens must be aware of their fundamental rights and duties as enshrined in the Constitution of India to participate meaningfully in the democratic process.",
    "India Post, one of the largest postal networks in the world, has been serving the people of India for over 150 years. With thousands of post offices spread across rural and urban areas, it plays a crucial role in connecting people and facilitating government-to-citizen services. In recent years, the department has embraced digital technology to offer banking, insurance, and delivery services more efficiently. The transformation of India Post into a tech-savvy institution reflects the government's commitment to modernization.",
    "The National Education Policy 2020 marks a transformative shift in India's education system, aiming to make learning more holistic, flexible, and multidisciplinary. It emphasizes critical thinking, creativity, and the application of knowledge to real-world problems. Under this policy, students will have greater freedom to choose subjects across streams, and vocational education will be integrated from an early age. The focus on mother tongue instruction in primary years recognizes the importance of foundational literacy in one's own language.",
    "Public sector banks in India have been instrumental in driving financial inclusion across the country. Through schemes like Jan Dhan Yojana, millions of previously unbanked citizens have been brought into the formal financial system. These banks offer a wide range of services including savings accounts, loans, insurance, and pension products to citizens from all walks of life. Digital banking initiatives have further simplified access to financial services, enabling people to conduct transactions from the comfort of their homes.",
  ],
  hindi: [
    "भारत सरकार ने देश के नागरिकों के कल्याण के लिए अनेक योजनाएं चलाई हैं। इन योजनाओं का उद्देश्य देश के हर कोने में बुनियादी सुविधाएं पहुंचाना है। सरकारी कर्मचारियों का यह दायित्व है कि वे ईमानदारी और लगन से कार्य करें ताकि आम जनता को अधिकतम लाभ मिल सके। राष्ट्र के विकास में प्रशासनिक दक्षता और जनसेवा का महत्वपूर्ण योगदान होता है।",
    "भारत का संविधान विश्व का सबसे लंबा लिखित संविधान है जो नागरिकों को मौलिक अधिकार और कर्तव्य प्रदान करता है। यह संविधान 26 नवंबर 1949 को अंगीकृत किया गया और 26 जनवरी 1950 को लागू हुआ। भारतीय लोकतंत्र संविधान की आधारशिला पर खड़ा है। प्रत्येक नागरिक को अपने मौलिक अधिकारों की जानकारी होनी चाहिए और अपने कर्तव्यों का पालन करना चाहिए।",
    "रेलवे भर्ती बोर्ड हर वर्ष हजारों पदों पर भर्ती करता है। यह परीक्षा देश भर के लाखों उम्मीदवारों द्वारा दी जाती है। टाइपिंग टेस्ट में उम्मीदवार को दिए गए अनुच्छेद को यथाशीघ्र और शुद्धता के साथ टाइप करना होता है। हिंदी टाइपिंग के लिए यूनिकोड या कृतिदेव फ़ॉन्ट का उपयोग किया जाता है। उम्मीदवारों को परीक्षा से पूर्व दोनों फ़ॉन्ट का अभ्यास करना चाहिए।",
  ],
};

export function getPassagesForExam(exam: ExamData): string[] {
  if (exam.language.toLowerCase().includes("hindi")) {
    return [...PASSAGES.hindi, ...PASSAGES.english];
  }
  return PASSAGES.english;
}

export function getRandomPassage(exam: ExamData): string {
  const passages = getPassagesForExam(exam);
  return passages[Math.floor(Math.random() * passages.length)];
}

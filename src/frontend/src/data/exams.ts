export interface ExamData {
  id: string;
  name: string;
  authority: string;
  requiredWPM: number;
  timeMin: number;
  language: string;
  accuracy: number;
  officialSite: string;
  logoUrl: string;
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
    accuracy: 90,
    officialSite: "https://ssc.nic.in",
    logoUrl: "https://www.google.com/s2/favicons?domain=ssc.nic.in&sz=64",
    description: "Combined Higher Secondary Level Examination",
    category: "SSC",
    eligibility: "Class 12 pass from a recognized board",
    markingScheme:
      "Net WPM = (Total Words Typed - (Errors × 0.25)) / Time; Qualify if Speed ≥ 35 AND Accuracy ≥ 90%",
    rules: [
      "Typing speed of 35 WPM for English medium posts",
      "Minimum accuracy of 90% required to qualify",
      "Test duration is 10 minutes on computer",
      "Net WPM = (Total Words - (Errors × 0.25)) / Time in minutes",
      "Skill Test Score = (Net WPM / 35) × 50 + (Accuracy / 100) × 50",
      "Tier 2 Weightage: Typing Score × 0.4 + Written Score × 0.6",
    ],
    negativeMarking:
      "Each error reduces net WPM by 0.25 words. Accuracy below 90% leads to disqualification.",
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
    requiredWPM: 40,
    timeMin: 10,
    language: "English/Hindi",
    accuracy: 90,
    officialSite: "https://ssc.nic.in",
    logoUrl: "https://www.google.com/s2/favicons?domain=ssc.nic.in&sz=64",
    description: "Combined Graduate Level Examination",
    category: "SSC",
    eligibility: "Graduate from any recognized university",
    markingScheme:
      "Net WPM = (Total Words - Error Words) / Minutes; Typing Score = (Net WPM / 40) × 70 + (Accuracy / 100) × 30",
    rules: [
      "Typing test required for posts like Tax Assistant, DEO",
      "40 WPM minimum for English typing test",
      "Net WPM = (Total Words - Error Words) / Minutes",
      "Error Words = Wrong Words + (Missing Words × 1.5)",
      "Typing Score = (Net WPM / 40) × 70 + (Accuracy / 100) × 30",
      "Skill Test Weight = 20% of total selection",
    ],
    negativeMarking:
      "Error Words (wrong + missing × 1.5) deducted. Accuracy below 90% may lead to disqualification.",
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
    accuracy: 90,
    officialSite: "https://ssc.nic.in",
    logoUrl: "https://www.google.com/s2/favicons?domain=ssc.nic.in&sz=64",
    description:
      "Stenographer Grade C — 100 WPM shorthand, 50 WPM transcription",
    category: "SSC",
    eligibility: "12th pass with shorthand proficiency at 100 WPM",
    markingScheme:
      "Final Score = (Shorthand Score × 0.6) + (Transcription Score × 0.4); Qualify if Shorthand ≥ 80 AND Typing ≥ 30 AND Accuracy ≥ 90%",
    rules: [
      "Shorthand dictation at 100 WPM for 10 minutes",
      "Transcription on computer — 50 WPM typing required",
      "Transcription time: 50 minutes (English) or 65 minutes (Hindi)",
      "Shorthand Score = (Dictation Speed / Required Speed) × 50",
      "Transcription Score = (Transcription WPM / 30) × 50",
      "Final Score = (Shorthand Score × 0.6) + (Transcription Score × 0.4)",
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
    accuracy: 90,
    officialSite: "https://ssc.nic.in",
    logoUrl: "https://www.google.com/s2/favicons?domain=ssc.nic.in&sz=64",
    description:
      "Stenographer Grade D — 80 WPM shorthand, 40 WPM transcription",
    category: "SSC",
    eligibility: "12th pass with shorthand proficiency at 80 WPM",
    markingScheme:
      "Combined shorthand + transcription evaluation; Qualify if Shorthand ≥ 80 AND Typing ≥ 30 AND Accuracy ≥ 90%",
    rules: [
      "Shorthand dictation at 80 WPM for 10 minutes",
      "Transcription on computer — 40 WPM typing required",
      "Transcription time: 50 minutes (English)",
      "Accuracy of 90% in transcription mandatory",
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
    accuracy: 85,
    officialSite: "https://www.rrbcdg.gov.in",
    logoUrl: "https://www.google.com/s2/favicons?domain=rrbcdg.gov.in&sz=64",
    description:
      "Non-Technical Popular Categories — 30 WPM English or 25 WPM Hindi",
    category: "Railway",
    eligibility: "Graduate for Level 6 posts; 12th pass for Level 2-5 posts",
    markingScheme:
      "Net WPM = (Total Characters / 5 - Error Characters / 5) / Minutes; Skill Test Score = (Net WPM / 30) × 60 + (Accuracy / 100) × 40",
    rules: [
      "Typing speed: 30 WPM in English or 25 WPM in Hindi",
      "Net WPM = (Total Characters / 5 - Error Characters / 5) / Minutes",
      "Skill Test Score = (Net WPM / 30) × 60 + (Accuracy / 100) × 40",
      "Railway Merit = (CBT Score × 0.8) + (Typing Score × 0.2)",
      "Minimum 85% accuracy required",
      "Duration: 10 minutes on standard computer",
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
    accuracy: 90,
    officialSite: "https://www.ibps.in",
    logoUrl: "https://www.google.com/s2/favicons?domain=ibps.in&sz=64",
    description: "Probationary Officer Examination",
    category: "Banking",
    eligibility: "Graduate in any discipline aged 20-30 years",
    markingScheme:
      "Typing Score = (Net WPM / 35) × 50 + (Accuracy / 100) × 50; Bank Mains Weightage = Typing × 0.15 + Written × 0.85",
    rules: [
      "40 WPM minimum for English typing",
      "Net WPM = (Total Words - Error Words) / Minutes",
      "Error Words = (Wrong Words × 0.5) + (Omitted Words × 1)",
      "Typing Score = (Net WPM / 35) × 50 + (Accuracy / 100) × 50",
      "Bank Mains Weightage: Typing Test × 0.15 + Written Exam × 0.85",
      "Accuracy of 90% required to pass",
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
    accuracy: 90,
    officialSite: "https://www.ibps.in",
    logoUrl: "https://www.google.com/s2/favicons?domain=ibps.in&sz=64",
    description: "Clerical Cadre Examination",
    category: "Banking",
    eligibility: "12th pass or Graduate depending on the bank",
    markingScheme:
      "Qualifying typing test: 30 WPM and 90% accuracy both required",
    rules: [
      "Typing speed: 30 WPM for English",
      "Test duration: 10 minutes",
      "Net WPM = (Total Words - Error Words) / Minutes",
      "Accuracy minimum: 90%",
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
    requiredWPM: 35,
    timeMin: 15,
    language: "English",
    accuracy: 95,
    officialSite: "https://highcourtchd.gov.in",
    logoUrl:
      "https://www.google.com/s2/favicons?domain=highcourtchd.gov.in&sz=64",
    description: "High Court Stenographer and Clerk typing test",
    category: "Court",
    eligibility: "Graduate; law background preferred for some posts",
    markingScheme:
      "Net WPM = (Total Words - (Errors × 0.75)) / Minutes; Judicial Score = (Speed Score × 0.4) + (Accuracy Score × 0.6); Court Typing Weight = 30% of total",
    rules: [
      "Typing test: 35 WPM minimum for 15 minutes",
      "Accuracy requirement: 95% (stricter than other exams)",
      "Net WPM = (Total Words Typed - (Errors × 0.75)) / Minutes",
      "Judicial Score = (Speed Score × 0.4) + (Accuracy Score × 0.6)",
      "Speed Score = (Net WPM / Required Speed) × 100",
      "Court Typing Weight = 30% of total selection",
    ],
    negativeMarking:
      "Errors strictly penalized. Each error deducts 0.75 words from net WPM. High accuracy is critical.",
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
    accuracy: 85,
    officialSite: "https://hssc.gov.in",
    logoUrl: "https://www.google.com/s2/favicons?domain=hssc.gov.in&sz=64",
    description: "Haryana government jobs typing test",
    category: "State Govt",
    eligibility: "Domicile of Haryana required; qualification as per post",
    markingScheme:
      "HSSC Score = (Net WPM × 2) + (Accuracy × 1.5) + (Bonus for Haryana Words × 0.1); Final Merit = Written × 0.8 + Typing × 0.2",
    rules: [
      "Hindi typing: 25 WPM minimum using Kruti Dev or Unicode",
      "English typing: 30 WPM minimum",
      "Net WPM = (Total Correct Words) / Minutes",
      "HSSC Score = (Net WPM × 2) + (Accuracy × 1.5) + (Bonus for Haryana Words × 0.1)",
      "Final Merit = (Written Score × 0.8) + (Typing Score × 0.2)",
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
    id: "haryana-harton",
    name: "Haryana Harton",
    authority: "Haryana Government",
    requiredWPM: 25,
    timeMin: 5,
    language: "Hindi/English",
    accuracy: 85,
    officialSite: "https://hssc.gov.in",
    logoUrl: "https://www.google.com/s2/favicons?domain=hssc.gov.in&sz=64",
    description: "Haryana Harton typing exam — Strokes-based WPM calculation",
    category: "State Govt",
    eligibility: "Haryana domicile; qualification as per post",
    markingScheme:
      "Gross WPM = (Total Strokes / 5) / Time in minutes; Net WPM = Gross WPM - (Mistakes / 5); Example: 1200 strokes in 5 min with 10 mistakes = 48 - 2 = 46 WPM",
    rules: [
      "1 word = 5 Strokes (key depressions)",
      "Gross WPM = (Total Strokes / 5) / Time in minutes",
      "Mistakes deduction = Total Mistakes / 5",
      "Net WPM = Gross WPM - Mistakes deduction",
      "Example: 1200 strokes in 5 min with 10 mistakes = (1200/5)/5 - 10/5 = 48 - 2 = 46 WPM",
      "Min Speed: 25-30 WPM | Min Accuracy: 85%",
    ],
    negativeMarking:
      "Mistakes / 5 is deducted from Gross WPM to calculate Net WPM.",
    importantNotes: [
      "Strokes-based formula — every keystroke counts",
      "Hindi typing uses Unicode/Kruti Dev font",
      "Both Hindi and English passages available",
      "Haryana domicile certificate mandatory",
    ],
  },
  {
    id: "ldc",
    name: "LDC (Lower Division Clerk)",
    authority: "SSC / State PSC",
    requiredWPM: 30,
    timeMin: 10,
    language: "English/Hindi",
    accuracy: 85,
    officialSite: "https://ssc.nic.in",
    logoUrl: "https://www.google.com/s2/favicons?domain=ssc.nic.in&sz=64",
    description: "Lower Division Clerk typing test — 10500 KDPH",
    category: "SSC",
    eligibility: "12th pass from a recognized board",
    markingScheme:
      "Gross WPM = (Total Characters / 5) / Time; Net WPM = Gross WPM - (Errors × 0.2); Final Score = (Net WPM × 1.5) + (Accuracy × 1.2); Qualify if Speed ≥ 30 AND Accuracy ≥ 85%",
    rules: [
      "English: 10500 KDPH (approx. 35 WPM)",
      "Hindi: 9000 KDPH (approx. 30 WPM)",
      "Gross WPM = (Total Characters / 5) / Time in minutes",
      "Net WPM = Gross WPM - (Errors × 0.2)",
      "Final Score = (Net WPM × 1.5) + (Accuracy × 1.2)",
      "Qualify if Speed ≥ 30 AND Accuracy ≥ 85%",
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
    requiredWPM: 40,
    timeMin: 15,
    language: "English",
    accuracy: 95,
    officialSite: "https://ssc.nic.in",
    logoUrl: "https://www.google.com/s2/favicons?domain=ssc.nic.in&sz=64",
    description: "15000 Key Depressions Per Hour on computer",
    category: "SSC",
    eligibility: "12th pass with Science/Maths; Computer certificate mandatory",
    markingScheme:
      "Net WPM = (Total Words - Error Words) / Minutes; Efficiency Score = (Net Speed / Required Speed) × 100; Final Score = (Net Speed × 3) + (Accuracy × 2) - (Backspace × 0.2); Qualify if Speed ≥ 40 AND Accuracy ≥ 95%",
    rules: [
      "15000 key depressions per hour minimum",
      "Test duration: 15 minutes on computer",
      "Net WPM = (Total Words - Error Words) / Minutes",
      "Efficiency Score = (Net Speed / Required Speed) × 100",
      "Final Score = (Net Speed × 3) + (Accuracy × 2) - (Backspace × 0.2)",
      "Qualify if Speed ≥ 40 AND Accuracy ≥ 95%",
    ],
    negativeMarking:
      "No negative marking. Net KDPH must meet 15000 threshold after error deduction. Each backspace use reduces score by 0.2.",
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
    accuracy: 90,
    officialSite: "https://ssc.nic.in",
    logoUrl: "https://www.google.com/s2/favicons?domain=ssc.nic.in&sz=64",
    description: "State Government Clerk typing examination",
    category: "State Govt",
    eligibility: "12th pass; qualification varies by state",
    markingScheme:
      "Gross WPM = (Total Characters / 5) / Time; Net WPM = Gross WPM - (Errors × 0.2); Final Score = (Net WPM × 2) + (Accuracy × 1.8); Qualify if Speed ≥ 30 AND Accuracy ≥ 90%",
    rules: [
      "English typing: 30 WPM minimum",
      "Hindi typing: 25 WPM minimum",
      "Gross WPM = (Total Characters / 5) / Time in minutes",
      "Net WPM = Gross WPM - (Errors × 0.2)",
      "Final Score = (Net WPM × 2) + (Accuracy × 1.8)",
      "Qualify if Speed ≥ 30 AND Accuracy ≥ 90%",
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

  // Additional government exams
  {
    id: "delhi-police-hcm",
    name: "Delhi Police HCM",
    authority: "Delhi Police",
    requiredWPM: 35,
    timeMin: 10,
    language: "English/Hindi",
    accuracy: 90,
    officialSite: "https://delhipolice.gov.in",
    logoUrl:
      "https://www.google.com/s2/favicons?domain=delhipolice.gov.in&sz=64",
    description: "Head Constable Ministerial typing examination",
    category: "Police",
    eligibility: "12th pass with typing proficiency",
    markingScheme:
      "Net WPM = (Total Words - Error Words) / Time; Qualify if WPM >= 35 AND Accuracy >= 90%",
    rules: [
      "35 WPM minimum for English typing",
      "30 WPM minimum for Hindi typing",
      "Accuracy of 90% or above required",
      "10 minute test duration",
      "Net WPM = (Total Words - Error Words) / Time",
    ],
    negativeMarking: "Error words deducted from net WPM.",
    importantNotes: [
      "Both English and Hindi typing may be tested",
      "Inscript/Unicode keyboard layout for Hindi",
      "Practice with law enforcement vocabulary",
    ],
  },
  {
    id: "dsssb",
    name: "DSSSB",
    authority: "Delhi Subordinate Services Selection Board",
    requiredWPM: 35,
    timeMin: 10,
    language: "English/Hindi",
    accuracy: 90,
    officialSite: "https://dsssb.delhi.gov.in",
    logoUrl:
      "https://www.google.com/s2/favicons?domain=dsssb.delhi.gov.in&sz=64",
    description: "Delhi Subordinate Services Selection Board typing test",
    category: "State",
    eligibility: "Graduate/12th pass as per post requirement",
    markingScheme:
      "Net WPM = (Correct Words) / Minutes; Qualify if WPM >= 35 AND Accuracy >= 90%",
    rules: [
      "35 WPM minimum speed required",
      "90% accuracy mandatory",
      "10 minute test for most posts",
      "Errors deducted from gross speed",
    ],
    negativeMarking: "Each error reduces net WPM.",
    importantNotes: [
      "Skill test is qualifying in nature",
      "Hindi Mangal font or Inscript layout for Hindi tests",
      "Delhi government administrative vocabulary recommended",
    ],
  },
  {
    id: "ssc-mts",
    name: "SSC MTS",
    authority: "Staff Selection Commission",
    requiredWPM: 25,
    timeMin: 10,
    language: "English/Hindi",
    accuracy: 85,
    officialSite: "https://ssc.nic.in",
    logoUrl: "https://www.google.com/s2/favicons?domain=ssc.nic.in&sz=64",
    description: "Multi Tasking Staff computer-based typing examination",
    category: "SSC",
    eligibility: "Class 10 pass from a recognized board",
    markingScheme:
      "Net WPM = (Total Words - Error Words) / Time; Qualify if WPM >= 25 AND Accuracy >= 85%",
    rules: [
      "25 WPM minimum typing speed",
      "85% accuracy required",
      "10 minute test duration",
      "Qualifying in nature",
    ],
    negativeMarking: "Error words reduce net WPM score.",
    importantNotes: [
      "Skill test is qualifying",
      "Both English and Hindi language options available",
    ],
  },
  {
    id: "state-level",
    name: "State Level",
    authority: "State Public Service Commission",
    requiredWPM: 30,
    timeMin: 10,
    language: "English/Hindi",
    accuracy: 85,
    officialSite: "https://india.gov.in",
    logoUrl: "https://www.google.com/s2/favicons?domain=india.gov.in&sz=64",
    description: "State Government typing test for various posts",
    category: "State",
    eligibility: "As per respective state government requirements",
    markingScheme:
      "Net WPM = (Correct Words) / Minutes; Qualify if WPM >= 30 AND Accuracy >= 85%",
    rules: [
      "30 WPM minimum typing speed",
      "85% accuracy required to qualify",
      "10 minute standard test",
      "Both Hindi and English may be tested",
    ],
    negativeMarking: "Errors deducted from net speed.",
    importantNotes: [
      "Rules vary by state",
      "Hindi Mangal Unicode or Inscript for Hindi typing",
    ],
  },
  {
    id: "teaching",
    name: "Teaching",
    authority: "Education Department",
    requiredWPM: 25,
    timeMin: 10,
    language: "English/Hindi",
    accuracy: 85,
    officialSite: "https://india.gov.in",
    logoUrl: "https://www.google.com/s2/favicons?domain=ctet.nic.in&sz=64",
    description: "Teaching cadre typing test (TET/CTET/Shiksha Vibhag)",
    category: "Teaching",
    eligibility: "B.Ed/D.El.Ed qualified candidates",
    markingScheme:
      "Net WPM = (Correct Words) / Minutes; Qualify if WPM >= 25 AND Accuracy >= 85%",
    rules: [
      "25 WPM minimum typing speed",
      "85% accuracy required",
      "10 minute test duration",
      "Education and academic vocabulary used",
    ],
    negativeMarking: "Error words reduce net WPM.",
    importantNotes: [
      "Required for clerk/assistant posts in education department",
      "Both Hindi and English typing may be tested",
    ],
  },

  // Gaming categories
  {
    id: "esports-officials",
    name: "eSports Officials",
    authority: "eSports Federation of India",
    requiredWPM: 35,
    timeMin: 10,
    language: "English",
    accuracy: 85,
    officialSite: "https://esfi.in",
    logoUrl: "https://www.google.com/s2/favicons?domain=esfi.in&sz=64",
    description:
      "eSports Officials typing certification for gaming professionals",
    category: "Gaming",
    eligibility: "Any graduate with interest in eSports",
    markingScheme:
      "Net WPM = (Correct Words / Minutes); Qualify if WPM ≥ 35 AND Accuracy ≥ 85%",
    rules: [
      "Typing test 35 WPM minimum required",
      "Accuracy must be 85% or above to qualify",
      "Test duration 10 minutes on computer",
      "Game and eSports terminology paragraphs used",
    ],
    negativeMarking: "Wrong words are deducted from net WPM",
    importantNotes: [
      "Gaming and eSports vocabulary passages used for typing content",
    ],
  },
  {
    id: "competitive-gaming-league",
    name: "Competitive Gaming League",
    authority: "CGL Gaming Board",
    requiredWPM: 35,
    timeMin: 10,
    language: "English",
    accuracy: 85,
    officialSite: "https://esfi.in",
    logoUrl: "https://www.google.com/s2/favicons?domain=esfi.in&sz=64",
    description: "Competitive Gaming League official typing certification",
    category: "Gaming",
    eligibility: "Any graduate",
    markingScheme:
      "Net WPM = (Correct Words / Minutes); Qualify if WPM ≥ 35 AND Accuracy ≥ 85%",
    rules: [
      "Typing speed of 35 WPM minimum",
      "Accuracy of 85% or above required",
      "10-minute typing test",
      "Competitive gaming vocabulary content",
    ],
    negativeMarking: "Wrong words deducted from net score",
    importantNotes: ["Competitive gaming and esports passages used"],
  },
  {
    id: "gaming-ethics-law",
    name: "Gaming Ethics & Law",
    authority: "Gaming Regulatory Board",
    requiredWPM: 30,
    timeMin: 10,
    language: "English",
    accuracy: 85,
    officialSite: "https://meity.gov.in",
    logoUrl: "https://www.google.com/s2/favicons?domain=meity.gov.in&sz=64",
    description: "Gaming Ethics and Law regulatory typing examination",
    category: "Gaming",
    eligibility: "Any graduate",
    markingScheme:
      "Net WPM = (Correct Words / Minutes); Qualify if WPM ≥ 30 AND Accuracy ≥ 85%",
    rules: [
      "30 WPM minimum speed required",
      "85% accuracy required",
      "10 minute test duration",
      "Legal and regulatory gaming content passages",
    ],
    negativeMarking: "Wrong words deducted",
    importantNotes: ["Legal and ethics terminology related to gaming industry"],
  },
  {
    id: "gaming-strategy",
    name: "Gaming Strategy",
    authority: "Gaming Strategy Board",
    requiredWPM: 30,
    timeMin: 10,
    language: "English",
    accuracy: 85,
    officialSite: "https://esfi.in",
    logoUrl: "https://www.google.com/s2/favicons?domain=esfi.in&sz=64",
    description:
      "Gaming Strategy official typing test for strategic gaming roles",
    category: "Gaming",
    eligibility: "Any graduate",
    markingScheme:
      "Net WPM = (Correct Words / Minutes); Qualify if WPM ≥ 30 AND Accuracy ≥ 85%",
    rules: [
      "30 WPM minimum required",
      "85% accuracy threshold",
      "10 minute timed test",
      "Gaming strategy and tactical vocabulary",
    ],
    negativeMarking: "Wrong words deducted from net WPM",
    importantNotes: [
      "Game strategy and tactical decision-making passages used",
    ],
  },
  // New Government Exams
  {
    id: "nvs",
    name: "NVS",
    authority: "Navodaya Vidyalaya Samiti",
    requiredWPM: 35,
    timeMin: 10,
    language: "English/Hindi",
    accuracy: 90,
    officialSite: "https://navodaya.gov.in",
    logoUrl: "https://www.google.com/s2/favicons?domain=navodaya.gov.in&sz=64",
    description:
      "Navodaya Vidyalaya Samiti staff typing exam for LDC/Clerk posts",
    category: "State Govt",
    eligibility: "Graduates from recognized university",
    markingScheme:
      "Net WPM = (Total Words - Errors) / Minutes; Qualify if WPM ≥ 35 AND Accuracy ≥ 90%",
    rules: [
      "35 WPM minimum for English medium",
      "10 minute test duration",
      "90% accuracy required to qualify",
      "Errors deducted from net speed",
    ],
    negativeMarking: "Errors directly reduce net WPM",
    importantNotes: [
      "NVS uses English/Hindi bilingual passages",
      "Both Unicode and legacy font support",
    ],
  },
  {
    id: "up-police",
    name: "UP Police",
    authority: "Uttar Pradesh Police Recruitment Board",
    requiredWPM: 25,
    timeMin: 10,
    language: "Hindi",
    accuracy: 85,
    officialSite: "https://uppbpb.gov.in",
    logoUrl: "https://www.google.com/s2/favicons?domain=uppbpb.gov.in&sz=64",
    description: "UP Police clerical and Head Constable typing test in Hindi",
    category: "State Govt",
    eligibility: "12th pass or graduate as per post",
    markingScheme:
      "Net WPM = (Correct Keystrokes / 5) / Minutes; Qualify if WPM ≥ 25 AND Accuracy ≥ 85%",
    rules: [
      "25 WPM minimum Hindi typing speed",
      "85% accuracy required",
      "Test duration 10 minutes",
      "Hindi Mangal or Kruti Dev font accepted",
    ],
    negativeMarking: "Incorrect words reduce net speed",
    importantNotes: [
      "Hindi typing only - Unicode Mangal font preferred",
      "Practice UP Police specific vocabulary",
    ],
  },
  {
    id: "delhi-police",
    name: "Delhi Police",
    authority: "Delhi Police Recruitment Division",
    requiredWPM: 35,
    timeMin: 10,
    language: "English/Hindi",
    accuracy: 90,
    officialSite: "https://delhipolice.nic.in",
    logoUrl:
      "https://www.google.com/s2/favicons?domain=delhipolice.nic.in&sz=64",
    description: "Delhi Police Head Constable and Ministerial typing test",
    category: "State Govt",
    eligibility: "12th pass minimum",
    markingScheme:
      "Net WPM = (Correct Words - Wrong Words × 0.5) / Minutes; Qualify if WPM ≥ 35 AND Accuracy ≥ 90%",
    rules: [
      "35 WPM minimum typing speed",
      "90% accuracy threshold",
      "10 minute test duration",
      "English and Hindi both tested based on post",
    ],
    negativeMarking: "Half WPM deducted per wrong word",
    importantNotes: [
      "Delhi Police uses both Hindi and English passages",
      "Bilingual candidates preferred",
    ],
  },
  {
    id: "sbi-po",
    name: "SBI PO",
    authority: "State Bank of India",
    requiredWPM: 40,
    timeMin: 10,
    language: "English",
    accuracy: 90,
    officialSite: "https://sbi.co.in",
    logoUrl: "https://www.google.com/s2/favicons?domain=sbi.co.in&sz=64",
    description: "SBI Probationary Officer typing proficiency test",
    category: "Banking",
    eligibility: "Graduate from any recognized university",
    markingScheme:
      "Net WPM = (Total Words - (Errors × 1.0)) / Minutes; Qualify if WPM ≥ 40 AND Accuracy ≥ 90%",
    rules: [
      "40 WPM minimum English typing speed",
      "90% accuracy required",
      "10 minute test",
      "Errors fully deducted from net WPM",
    ],
    negativeMarking: "Each error reduces WPM by 1",
    importantNotes: [
      "Banking and finance terminology passages",
      "Practice speed and accuracy equally",
    ],
  },
  {
    id: "usc",
    name: "USC",
    authority: "Union Service Commission",
    requiredWPM: 35,
    timeMin: 10,
    language: "English/Hindi",
    accuracy: 90,
    officialSite: "https://upsc.gov.in",
    logoUrl: "https://www.google.com/s2/favicons?domain=upsc.gov.in&sz=64",
    description: "Union Service Commission administrative typing test",
    category: "SSC",
    eligibility: "Graduate as per UPSC requirements",
    markingScheme:
      "Net WPM = (Total Correct Words) / Minutes; Qualify if WPM ≥ 35 AND Accuracy ≥ 90%",
    rules: [
      "35 WPM minimum speed",
      "90% accuracy required",
      "10 minute test",
      "English/Hindi based on post requirement",
    ],
    negativeMarking: "Errors deducted from net speed",
    importantNotes: [
      "UPSC/USC administrative content passages",
      "Professional vocabulary expected",
    ],
  },
  {
    id: "knk",
    name: "KNK",
    authority: "Kendriya Nagarik Kalyan",
    requiredWPM: 30,
    timeMin: 10,
    language: "Hindi",
    accuracy: 85,
    officialSite: "https://india.gov.in",
    logoUrl: "https://www.google.com/s2/favicons?domain=india.gov.in&sz=64",
    description: "Kendriya Nagarik Kalyan government typing test",
    category: "State Govt",
    eligibility: "Graduates with Hindi typing proficiency",
    markingScheme:
      "Net WPM = (Correct Words) / Minutes; Qualify if WPM ≥ 30 AND Accuracy ≥ 85%",
    rules: [
      "30 WPM minimum Hindi typing",
      "85% accuracy required",
      "10 minute duration",
      "Hindi Devanagari script",
    ],
    negativeMarking: "Wrong words deducted",
    importantNotes: [
      "Hindi Mangal font preferred",
      "Government welfare scheme vocabulary",
    ],
  },
  {
    id: "edv",
    name: "EDV",
    authority: "Education Department Vidyalaya",
    requiredWPM: 30,
    timeMin: 10,
    language: "Hindi/English",
    accuracy: 85,
    officialSite: "https://education.gov.in",
    logoUrl: "https://www.google.com/s2/favicons?domain=education.gov.in&sz=64",
    description: "Education Department Vidyalaya administrative typing test",
    category: "State Govt",
    eligibility: "Any graduate",
    markingScheme:
      "Net WPM = (Correct Words) / Minutes; Qualify if WPM ≥ 30 AND Accuracy ≥ 85%",
    rules: [
      "30 WPM minimum speed",
      "85% accuracy required",
      "10 minute test",
      "Hindi or English based on post",
    ],
    negativeMarking: "Errors reduce net score",
    importantNotes: [
      "Education sector vocabulary used",
      "Both Hindi and English passages available",
    ],
  },
  {
    id: "nabard",
    name: "NABARD",
    authority: "National Bank for Agriculture and Rural Development",
    requiredWPM: 40,
    timeMin: 10,
    language: "English",
    accuracy: 90,
    officialSite: "https://nabard.org",
    logoUrl: "https://www.google.com/s2/favicons?domain=nabard.org&sz=64",
    description: "NABARD Office Assistant typing test for rural banking posts",
    category: "Banking",
    eligibility: "Graduate from recognized university",
    markingScheme:
      "Net WPM = (Total Words - Errors) / Minutes; Qualify if WPM ≥ 40 AND Accuracy ≥ 90%",
    rules: [
      "40 WPM minimum English typing",
      "90% accuracy required",
      "10 minute timed test",
      "Banking and agriculture vocabulary",
    ],
    negativeMarking: "Errors fully deducted",
    importantNotes: [
      "NABARD uses rural development and banking passages",
      "English typing only for most posts",
    ],
  },
  {
    id: "kvs",
    name: "KVS",
    authority: "Kendriya Vidyalaya Sangathan",
    requiredWPM: 35,
    timeMin: 10,
    language: "English/Hindi",
    accuracy: 90,
    officialSite: "https://kvsangathan.nic.in",
    logoUrl:
      "https://www.google.com/s2/favicons?domain=kvsangathan.nic.in&sz=64",
    description: "KVS clerk, LDC and office assistant typing test",
    category: "State Govt",
    eligibility: "12th pass or graduate depending on post",
    markingScheme:
      "Net WPM = (Correct Words - Wrong × 0.5) / Minutes; Qualify if WPM ≥ 35 AND Accuracy ≥ 90%",
    rules: [
      "35 WPM minimum for LDC/Clerk posts",
      "90% accuracy threshold",
      "10 minute test",
      "English/Hindi based on post",
    ],
    negativeMarking: "Half WPM deducted per error",
    importantNotes: [
      "KVS educational institution vocabulary",
      "Bilingual passages may be used",
    ],
  },
  {
    id: "ctet",
    name: "CTET",
    authority: "Central Board of Secondary Education",
    requiredWPM: 35,
    timeMin: 10,
    language: "English/Hindi",
    accuracy: 90,
    officialSite: "https://ctet.nic.in",
    logoUrl: "https://www.google.com/s2/favicons?domain=ctet.nic.in&sz=64",
    description: "CTET administrative and clerical typing proficiency test",
    category: "SSC",
    eligibility: "Graduates with teaching eligibility",
    markingScheme:
      "Net WPM = (Total Correct Words) / Minutes; Qualify if WPM ≥ 35 AND Accuracy ≥ 90%",
    rules: [
      "35 WPM minimum typing speed",
      "90% accuracy required",
      "10 minute test",
      "Educational content passages",
    ],
    negativeMarking: "Errors reduce net WPM",
    importantNotes: [
      "Education and teaching methodology vocabulary",
      "Both English and Hindi passages",
    ],
  },
  {
    id: "lic-ado",
    name: "LIC ADO",
    authority: "Life Insurance Corporation of India",
    requiredWPM: 40,
    timeMin: 10,
    language: "English",
    accuracy: 90,
    officialSite: "https://licindia.in",
    logoUrl: "https://www.google.com/s2/favicons?domain=licindia.in&sz=64",
    description: "LIC Apprentice Development Officer typing proficiency test",
    category: "Banking",
    eligibility: "Graduate from recognized university",
    markingScheme:
      "Net WPM = (Total Words - Errors × 1.5) / Minutes; Qualify if WPM ≥ 40 AND Accuracy ≥ 90%",
    rules: [
      "40 WPM minimum speed",
      "90% accuracy required",
      "10 minute test",
      "Insurance and financial service vocabulary",
    ],
    negativeMarking: "1.5× deduction for each error",
    importantNotes: [
      "LIC uses insurance and financial content passages",
      "English typing only",
    ],
  },
  {
    id: "psu-exams",
    name: "PSU Exams",
    authority: "Public Sector Undertaking Boards",
    requiredWPM: 35,
    timeMin: 10,
    language: "English/Hindi",
    accuracy: 90,
    officialSite: "https://india.gov.in",
    logoUrl: "https://www.google.com/s2/favicons?domain=india.gov.in&sz=64",
    description:
      "PSU clerical and assistant typing examinations across various departments",
    category: "State Govt",
    eligibility: "Graduates as per individual PSU requirements",
    markingScheme:
      "Net WPM = (Correct Words) / Minutes; Qualify if WPM ≥ 35 AND Accuracy ≥ 90%",
    rules: [
      "35 WPM minimum across most PSUs",
      "90% accuracy required",
      "10 minute test duration",
      "Industry-specific vocabulary",
    ],
    negativeMarking: "Errors reduce net WPM",
    importantNotes: [
      "Varies by PSU - check individual notifications",
      "Both Hindi and English may be required",
    ],
  },
  {
    id: "state-pcs",
    name: "State PCS",
    authority: "State Public Service Commission",
    requiredWPM: 30,
    timeMin: 10,
    language: "Hindi",
    accuracy: 85,
    officialSite: "https://india.gov.in",
    logoUrl: "https://www.google.com/s2/favicons?domain=india.gov.in&sz=64",
    description:
      "State PCS lower division clerk and administrative typing test",
    category: "State Govt",
    eligibility: "Graduates as per state PCS requirements",
    markingScheme:
      "Net WPM = (Correct Words) / Minutes; Qualify if WPM ≥ 30 AND Accuracy ≥ 85%",
    rules: [
      "30 WPM minimum Hindi typing speed",
      "85% accuracy required",
      "10 minute test",
      "State-specific administrative vocabulary",
    ],
    negativeMarking: "Errors deducted from net score",
    importantNotes: [
      "Hindi Mangal Unicode preferred",
      "State government administrative content",
    ],
  },
];

export const PASSAGES: Record<string, string[]> = {
  english: [
    "The Government of India has always given priority to the welfare of its citizens through various developmental schemes and programmes. The state of Haryana, with its capital at Chandigarh, has been at the forefront of agricultural and industrial development. Cities like Rohtak, Hisar, Karnal, Gurugram, and Faridabad have witnessed tremendous growth over the past few decades. The ancient city of Kurukshetra holds immense historical and religious significance as the place where the Mahabharata war was fought. The Ministry of Finance allocates substantial resources every year to ensure that essential services reach every corner of the country from the mountainous regions of the north to the coastal areas of the south. It is the responsibility of every government employee to work diligently and with full honesty so that the common people benefit from these programmes. The integrity and efficiency of the public service system is crucial for the overall development of the nation. India's Parliament, located in New Delhi, is the supreme legislative body of the country. The Rashtrapati Bhavan is the official residence of the President of India. Our Constitution, adopted on the twenty-sixth of November nineteen forty-nine, guarantees fundamental rights to every citizen. The National flag, with its three colours of saffron, white, and green, represents the values of courage, peace, and prosperity. The Republic of India, with its diverse culture and traditions, stands as one of the largest democracies in the world. Every year on the twenty-sixth of January, the nation celebrates Republic Day with great enthusiasm and patriotic fervour. The Indian Armed Forces, comprising the Army, Navy, and Air Force, protect the sovereignty and territorial integrity of the country. Education and healthcare are two of the most important pillars of national development and the government has been investing heavily in both these sectors. Under various flagship schemes, thousands of schools and hospitals have been built across the country to serve the needs of the population. The National Health Mission aims to provide affordable and quality healthcare to all citizens, especially those living in rural and remote areas. Digital India is another important initiative that seeks to transform the country into a digitally empowered society and knowledge economy. The Prime Minister's Office coordinates policy decisions across all ministries and departments to ensure smooth functioning of the executive machinery. Good governance requires transparency, accountability, and responsiveness to citizen needs at all levels of administration. Local self-governance through Panchayati Raj institutions has empowered millions of citizens at the grassroots level across the country.",
    "The Supreme Court of India serves as the apex judicial body responsible for interpreting the Constitution and ensuring justice for all citizens. Every year, thousands of cases are heard by the honourable judges who deliver landmark judgements that shape the legal landscape of the country. The rule of law is the foundation upon which democratic governance rests. Citizens must be aware of their fundamental rights and duties as enshrined in the Constitution of India to participate meaningfully in the democratic process. The legal system of India is based on the common law tradition inherited from British colonial rule, but it has evolved significantly since independence to reflect the values and aspirations of the Indian people. The judiciary plays a critical role in protecting individual rights and maintaining the balance of power between different branches of government. From the Supreme Court in Delhi to District Courts across Chandigarh, Rohtak, Hisar, and every corner of the country, justice must be accessible to all. Haryana has several prominent courts serving millions of citizens across districts including Gurugram, Faridabad, Karnal, and Kurukshetra. The legal aid services provided by the government ensure that even the poorest citizens can access justice without financial burden. Court modernization programmes have introduced digital filing systems, video conferencing for hearings, and electronic case management to improve judicial efficiency. Parliament enacts laws that govern every aspect of public and private life, from criminal justice to environmental protection, from taxation to social welfare. The Rashtrapati gives assent to all Bills passed by Parliament before they become law. The Constitution provides for a federal structure with clear division of powers between the Union and the States, ensuring that local needs are addressed effectively while maintaining national unity.",
    "India Post, one of the largest postal networks in the world, has been serving the people of India for over one hundred and fifty years. With thousands of post offices spread across rural and urban areas from Mumbai to the remote hills of the northeast, it plays a crucial role in connecting people and facilitating government-to-citizen services. In recent years, the department has embraced digital technology to offer banking, insurance, and delivery services more efficiently. The transformation of India Post into a tech-savvy institution reflects the government's commitment to modernization and inclusive growth. The Postal Payment Bank has brought millions of unbanked citizens into the formal financial system especially in remote villages across Haryana, Rajasthan, and Uttar Pradesh. Cities like Rohtak, Hisar, Karnal, and Gurugram have state-of-the-art postal facilities serving businesses and individual customers alike. The National Rural Employment Guarantee Act ensures that rural workers have access to employment and social security through the postal network for payment delivery. Faridabad and other industrial cities rely on the postal and courier network for business correspondence and documentation. Chandigarh, as the capital of Haryana and Punjab, houses key administrative offices that coordinate postal services across the region. The Republic of India's commitment to universal service obligation means that every citizen, regardless of geography, has access to affordable postal services. Parliament has repeatedly strengthened the legal framework governing postal operations to protect consumers and ensure service quality. The Constitution guarantees freedom of communication as part of the fundamental right to expression, making postal services a vital constitutional commitment. National initiatives like Speed Post, Registered Post, and e-Post have modernised the way Indians communicate and transact.",
    "The National Education Policy 2020 marks a transformative shift in India's education system, aiming to make learning more holistic, flexible, and multidisciplinary. It emphasizes critical thinking, creativity, and the application of knowledge to real-world problems. Under this policy, students will have greater freedom to choose subjects across streams, and vocational education will be integrated from an early age. The focus on mother tongue instruction in primary years recognizes the importance of foundational literacy in one's own language. Schools across Haryana in cities like Rohtak, Hisar, Karnal, Gurugram, Faridabad, and Kurukshetra are actively implementing the new curriculum framework. The government has established model schools in every district to serve as centres of excellence and innovation. Teacher training programmes have been revamped to equip educators with modern pedagogical skills and digital tools. The Chandigarh administration has been a pioneer in implementing educational reforms and has consistently produced top-performing students in national competitive examinations. The Constitution of India guarantees the right to education as a fundamental right for children between six and fourteen years of age. Parliament enacted the Right to Education Act to translate this constitutional provision into practical reality across the Republic. Rashtrapati Bhavan hosts annual felicitation ceremonies for outstanding teachers who have made exceptional contributions to education. The National Scholarship Portal provides financial support to meritorious students from economically weaker sections ensuring that talent is not constrained by financial circumstances. Digital classrooms, e-libraries, and online learning platforms have extended educational opportunities beyond physical boundaries reaching even the most remote villages. Mumbai and Delhi house premier educational institutions that attract students from every corner of the country and contribute to India's knowledge economy.",
    "Public sector banks in India have been instrumental in driving financial inclusion across the country. Through schemes like Jan Dhan Yojana, millions of previously unbanked citizens have been brought into the formal financial system. These banks offer a wide range of services including savings accounts, loans, insurance, and pension products to citizens from all walks of life. Digital banking initiatives have further simplified access to financial services, enabling people to conduct transactions from the comfort of their homes. The Reserve Bank of India, headquartered in Mumbai, serves as the central bank and regulator of the entire banking system. State Bank of India with its nationwide network has branches in every major city including Chandigarh, Rohtak, Hisar, Karnal, Gurugram, Faridabad, and Kurukshetra. The banking sector of Haryana has grown rapidly in line with the state's economic development, supporting farmers, small businesses, and industrial enterprises. IBPS conducts recruitment examinations for bank clerks, probationary officers, and specialists every year attracting millions of aspirants from across the Republic. The Constitution empowers Parliament to legislate on banking and currency matters ensuring uniform national standards. Rashtrapati gives assent to Banking Regulation Acts that govern the operations of all scheduled commercial banks. The National Payment System has made real-time fund transfers possible across the entire country reducing dependence on cash transactions. Financial literacy campaigns conducted by banks and the government are helping citizens in smaller towns and rural areas understand and use banking products effectively. The Mudra Yojana has provided collateral-free loans to small entrepreneurs and self-employed individuals helping them grow their businesses and create employment in their communities.",
  ],
  hindi: [
    "भारत सरकार ने देश के नागरिकों के कल्याण के लिए अनेक योजनाएं चलाई हैं। हरियाणा राज्य, जिसकी राजधानी चंडीगढ़ है, कृषि और औद्योगिक विकास में सदा अग्रणी रहा है। रोहतक, हिसार, करनाल, गुरुग्राम और फरीदाबाद जैसे नगरों ने पिछले कुछ दशकों में अत्यधिक विकास किया है। कुरुक्षेत्र का प्राचीन नगर महाभारत युद्ध की ऐतिहासिक और धार्मिक दृष्टि से अत्यंत महत्वपूर्ण स्थान है। वित्त मंत्रालय प्रत्येक वर्ष पर्याप्त संसाधन आवंटित करता है ताकि आवश्यक सेवाएं देश के हर कोने तक पहुंच सकें। यह प्रत्येक सरकारी कर्मचारी का दायित्व है कि वह पूरी ईमानदारी और लगन से कार्य करे। भारत की संसद, जो नई दिल्ली में स्थित है, देश का सर्वोच्च विधायी निकाय है। राष्ट्रपति भवन भारत के राष्ट्रपति का आधिकारिक निवास है। हमारा संविधान, जो उन्नीस सौ उनचास में छब्बीस नवंबर को अपनाया गया, प्रत्येक नागरिक को मौलिक अधिकार प्रदान करता है। राष्ट्रीय ध्वज के तीन रंग — केसरिया, सफेद और हरा — क्रमशः साहस, शांति और समृद्धि के प्रतीक हैं। भारतीय गणतंत्र अपनी विविध संस्कृति और परंपराओं के साथ विश्व के सबसे बड़े लोकतंत्रों में से एक है। प्रत्येक वर्ष छब्बीस जनवरी को देश हर्षोल्लास के साथ गणतंत्र दिवस मनाता है। भारतीय सशस्त्र बल देश की संप्रभुता और क्षेत्रीय अखंडता की रक्षा करते हैं। शिक्षा और स्वास्थ्य सेवाएं राष्ट्रीय विकास के सबसे महत्वपूर्ण स्तंभ हैं और सरकार इन दोनों क्षेत्रों में भारी निवेश कर रही है। विभिन्न प्रमुख योजनाओं के तहत देश भर में हजारों विद्यालय और अस्पताल बनाए गए हैं। राष्ट्रीय स्वास्थ्य मिशन का उद्देश्य सभी नागरिकों को सस्ती और गुणवत्तापूर्ण स्वास्थ्य सेवाएं प्रदान करना है।",
    "भारत का संविधान विश्व का सबसे लंबा लिखित संविधान है जो नागरिकों को मौलिक अधिकार और कर्तव्य प्रदान करता है। यह संविधान छब्बीस नवंबर उन्नीस सौ उनचास को अंगीकृत किया गया और छब्बीस जनवरी उन्नीस सौ पचास को लागू हुआ। भारतीय लोकतंत्र संविधान की आधारशिला पर खड़ा है। प्रत्येक नागरिक को अपने मौलिक अधिकारों की जानकारी होनी चाहिए और अपने कर्तव्यों का पालन करना चाहिए। हरियाणा के चंडीगढ़, रोहतक, हिसार, करनाल, गुरुग्राम, फरीदाबाद और कुरुक्षेत्र जैसे प्रमुख नगरों में नागरिकों को संवैधानिक अधिकारों के प्रति जागरूक किया जा रहा है। सर्वोच्च न्यायालय संविधान की व्याख्या करने और सभी नागरिकों को न्याय दिलाने के लिए जिम्मेदार सर्वोच्च न्यायिक निकाय है। संसद द्वारा पारित प्रत्येक विधेयक को राष्ट्रपति की स्वीकृति के बाद ही कानून का रूप मिलता है। राष्ट्रपति भवन में प्रत्येक वर्ष राष्ट्रीय पुरस्कार वितरण समारोह आयोजित होते हैं जिनमें विभिन्न क्षेत्रों में उत्कृष्ट कार्य करने वाले नागरिकों को सम्मानित किया जाता है। गणतंत्र दिवस परेड में देश की सैन्य शक्ति, सांस्कृतिक विविधता और विकास उपलब्धियों का भव्य प्रदर्शन किया जाता है। राष्ट्रीय एकता और अखंडता बनाए रखना हर भारतीय नागरिक का सर्वोच्च कर्तव्य है। मुंबई, दिल्ली और चंडीगढ़ जैसे महानगर देश की आर्थिक प्रगति में महत्वपूर्ण योगदान देते हैं। डिजिटल इंडिया कार्यक्रम ने सरकारी सेवाओं को ऑनलाइन उपलब्ध कराकर नागरिकों का जीवन सरल बना दिया है।",
    "रेलवे भर्ती बोर्ड हर वर्ष हजारों पदों पर भर्ती करता है। यह परीक्षा देश भर के लाखों उम्मीदवारों द्वारा दी जाती है। टाइपिंग टेस्ट में उम्मीदवार को दिए गए अनुच्छेद को यथाशीघ्र और शुद्धता के साथ टाइप करना होता है। हिंदी टाइपिंग के लिए यूनिकोड या कृतिदेव फ़ॉन्ट का उपयोग किया जाता है। हरियाणा के रोहतक, हिसार, करनाल और गुरुग्राम जैसे जिलों से हजारों उम्मीदवार प्रतिवर्ष सरकारी सेवा परीक्षाओं में भाग लेते हैं। चंडीगढ़ में स्थित विभिन्न सरकारी कार्यालय और प्रशिक्षण संस्थान उम्मीदवारों को परीक्षा की तैयारी में सहायता प्रदान करते हैं। फरीदाबाद और गुरुग्राम के औद्योगिक क्षेत्रों में डेटा एंट्री ऑपरेटरों और लिपिकों की भारी मांग है। कुरुक्षेत्र विश्वविद्यालय सरकारी सेवा परीक्षाओं की तैयारी के लिए उत्कृष्ट कोचिंग और संसाधन प्रदान करता है। संसद में पारित श्रम कानून सरकारी कर्मचारियों के अधिकारों और सेवा शर्तों की रक्षा करते हैं। राष्ट्रपति प्रत्येक वर्ष गणतंत्र दिवस पर राष्ट्र को संबोधित करते हैं और देश की प्रगति की समीक्षा प्रस्तुत करते हैं। भारतीय संविधान में दिए गए मौलिक अधिकार सुनिश्चित करते हैं कि प्रत्येक नागरिक को समान अवसर और न्याय मिले। मुंबई में स्थित भारतीय स्टेट बैंक का मुख्यालय देश की वित्तीय प्रणाली की रीढ़ है और लाखों कर्मचारियों को रोजगार प्रदान करता है।",
  ],
};

export function getPassagesForExam(
  exam: ExamData,
  languageOverride?: string,
): string[] {
  const lang = languageOverride ?? exam.language;
  if (lang.toLowerCase().includes("hindi")) {
    return PASSAGES.hindi;
  }
  return PASSAGES.english;
}

export function getRandomPassage(
  exam: ExamData,
  languageOverride?: string,
): string {
  const passages = getPassagesForExam(exam, languageOverride);
  return passages[Math.floor(Math.random() * passages.length)];
}

export function generatePassageOfLength(
  exam: ExamData,
  wordCount: number,
  languageOverride?: string,
): string {
  const basePassages = getPassagesForExam(exam, languageOverride);
  const allWords = basePassages
    .join(" ")
    .split(" ")
    .filter((w) => w.length > 0);
  const result: string[] = [];
  let i = 0;
  while (result.length < wordCount) {
    result.push(allWords[i % allWords.length]);
    i++;
  }
  return result.slice(0, wordCount).join(" ");
}

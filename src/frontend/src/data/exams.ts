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

export const ALLOWED_EXAM_IDS = [
  "delhi-police-hcm",
  "dsssb",
  "ssc-cgl",
  "ssc-chsl",
  "ssc-mts",
  "rrb-ntpc",
  "bank-po",
  "bank-clerk",
  "state-level",
  "haryana-harton",
  "deo",
  "state-pcs",
  "teaching",
  "clerk",
];

export const ALLOWED_EXAMS = EXAMS.filter((e) =>
  ALLOWED_EXAM_IDS.includes(e.id),
);

export const PASSAGES: Record<string, string[]> = {
  english: [
    "The Government of India has always given priority to the welfare of its citizens through various developmental schemes and programmes. The state of Haryana, with its capital at Chandigarh, has been at the forefront of agricultural and industrial development. Cities like Rohtak, Hisar, Karnal, Gurugram, and Faridabad have witnessed tremendous growth over the past few decades. The ancient city of Kurukshetra holds immense historical and religious significance as the place where the Mahabharata war was fought. The Ministry of Finance allocates substantial resources every year to ensure that essential services reach every corner of the country from the mountainous regions of the north to the coastal areas of the south. It is the responsibility of every government employee to work diligently and with full honesty so that the common people benefit from these programmes. The integrity and efficiency of the public service system is crucial for the overall development of the nation. India's Parliament, located in New Delhi, is the supreme legislative body of the country. The Rashtrapati Bhavan is the official residence of the President of India. Our Constitution, adopted on the twenty-sixth of November nineteen forty-nine, guarantees fundamental rights to every citizen. The National flag, with its three colours of saffron, white, and green, represents the values of courage, peace, and prosperity. The Republic of India, with its diverse culture and traditions, stands as one of the largest democracies in the world. Every year on the twenty-sixth of January, the nation celebrates Republic Day with great enthusiasm and patriotic fervour. The Indian Armed Forces, comprising the Army, Navy, and Air Force, protect the sovereignty and territorial integrity of the country. Education and healthcare are two of the most important pillars of national development and the government has been investing heavily in both these sectors. Under various flagship schemes, thousands of schools and hospitals have been built across the country to serve the needs of the population. The National Health Mission aims to provide affordable and quality healthcare to all citizens, especially those living in rural and remote areas. Digital India is another important initiative that seeks to transform the country into a digitally empowered society and knowledge economy. The Prime Minister's Office coordinates policy decisions across all ministries and departments to ensure smooth functioning of the executive machinery. Good governance requires transparency, accountability, and responsiveness to citizen needs at all levels of administration. Local self-governance through Panchayati Raj institutions has empowered millions of citizens at the grassroots level across the country.",
    "The Supreme Court of India serves as the apex judicial body responsible for interpreting the Constitution and ensuring justice for all citizens. Every year, thousands of cases are heard by the honourable judges who deliver landmark judgements that shape the legal landscape of the country. The rule of law is the foundation upon which democratic governance rests. Citizens must be aware of their fundamental rights and duties as enshrined in the Constitution of India to participate meaningfully in the democratic process. The legal system of India is based on the common law tradition inherited from British colonial rule, but it has evolved significantly since independence to reflect the values and aspirations of the Indian people. The judiciary plays a critical role in protecting individual rights and maintaining the balance of power between different branches of government. From the Supreme Court in Delhi to District Courts across Chandigarh, Rohtak, Hisar, and every corner of the country, justice must be accessible to all. Haryana has several prominent courts serving millions of citizens across districts including Gurugram, Faridabad, Karnal, and Kurukshetra. The legal aid services provided by the government ensure that even the poorest citizens can access justice without financial burden. Court modernization programmes have introduced digital filing systems, video conferencing for hearings, and electronic case management to improve judicial efficiency. Parliament enacts laws that govern every aspect of public and private life, from criminal justice to environmental protection, from taxation to social welfare. The Rashtrapati gives assent to all Bills passed by Parliament before they become law. The Constitution provides for a federal structure with clear division of powers between the Union and the States, ensuring that local needs are addressed effectively while maintaining national unity.",
    "India Post, one of the largest postal networks in the world, has been serving the people of India for over one hundred and fifty years. With thousands of post offices spread across rural and urban areas from Mumbai to the remote hills of the northeast, it plays a crucial role in connecting people and facilitating government-to-citizen services. In recent years, the department has embraced digital technology to offer banking, insurance, and delivery services more efficiently. The transformation of India Post into a tech-savvy institution reflects the government's commitment to modernization and inclusive growth. The Postal Payment Bank has brought millions of unbanked citizens into the formal financial system especially in remote villages across Haryana, Rajasthan, and Uttar Pradesh. Cities like Rohtak, Hisar, Karnal, and Gurugram have state-of-the-art postal facilities serving businesses and individual customers alike. The National Rural Employment Guarantee Act ensures that rural workers have access to employment and social security through the postal network for payment delivery. Faridabad and other industrial cities rely on the postal and courier network for business correspondence and documentation. Chandigarh, as the capital of Haryana and Punjab, houses key administrative offices that coordinate postal services across the region. The Republic of India's commitment to universal service obligation means that every citizen, regardless of geography, has access to affordable postal services. Parliament has repeatedly strengthened the legal framework governing postal operations to protect consumers and ensure service quality. The Constitution guarantees freedom of communication as part of the fundamental right to expression, making postal services a vital constitutional commitment. National initiatives like Speed Post, Registered Post, and e-Post have modernised the way Indians communicate and transact.",
    "The National Education Policy 2020 marks a transformative shift in India's education system, aiming to make learning more holistic, flexible, and multidisciplinary. It emphasizes critical thinking, creativity, and the application of knowledge to real-world problems. Under this policy, students will have greater freedom to choose subjects across streams, and vocational education will be integrated from an early age. The focus on mother tongue instruction in primary years recognizes the importance of foundational literacy in one's own language. Schools across Haryana in cities like Rohtak, Hisar, Karnal, Gurugram, Faridabad, and Kurukshetra are actively implementing the new curriculum framework. The government has established model schools in every district to serve as centres of excellence and innovation. Teacher training programmes have been revamped to equip educators with modern pedagogical skills and digital tools. The Chandigarh administration has been a pioneer in implementing educational reforms and has consistently produced top-performing students in national competitive examinations. The Constitution of India guarantees the right to education as a fundamental right for children between six and fourteen years of age. Parliament enacted the Right to Education Act to translate this constitutional provision into practical reality across the Republic. Rashtrapati Bhavan hosts annual felicitation ceremonies for outstanding teachers who have made exceptional contributions to education. The National Scholarship Portal provides financial support to meritorious students from economically weaker sections ensuring that talent is not constrained by financial circumstances. Digital classrooms, e-libraries, and online learning platforms have extended educational opportunities beyond physical boundaries reaching even the most remote villages. Mumbai and Delhi house premier educational institutions that attract students from every corner of the country and contribute to India's knowledge economy.",
    "Public sector banks in India have been instrumental in driving financial inclusion across the country. Through schemes like Jan Dhan Yojana, millions of previously unbanked citizens have been brought into the formal financial system. These banks offer a wide range of services including savings accounts, loans, insurance, and pension products to citizens from all walks of life. Digital banking initiatives have further simplified access to financial services, enabling people to conduct transactions from the comfort of their homes. The Reserve Bank of India, headquartered in Mumbai, serves as the central bank and regulator of the entire banking system. State Bank of India with its nationwide network has branches in every major city including Chandigarh, Rohtak, Hisar, Karnal, Gurugram, Faridabad, and Kurukshetra. The banking sector of Haryana has grown rapidly in line with the state's economic development, supporting farmers, small businesses, and industrial enterprises. IBPS conducts recruitment examinations for bank clerks, probationary officers, and specialists every year attracting millions of aspirants from across the Republic. The Constitution empowers Parliament to legislate on banking and currency matters ensuring uniform national standards. Rashtrapati gives assent to Banking Regulation Acts that govern the operations of all scheduled commercial banks. The National Payment System has made real-time fund transfers possible across the entire country reducing dependence on cash transactions. Financial literacy campaigns conducted by banks and the government are helping citizens in smaller towns and rural areas understand and use banking products effectively. The Mudra Yojana has provided collateral-free loans to small entrepreneurs and self-employed individuals helping them grow their businesses and create employment in their communities.",
    "Agriculture forms the backbone of the Indian economy and Haryana is one of the most agriculturally productive states in the country. The Green Revolution of the nineteen sixties transformed the state from a food-deficit region to a major contributor to India's food security. Crops like wheat and rice are grown extensively across the fertile plains of Karnal, Rohtak, Hisar, and Ambala. Modern irrigation facilities, including canal networks and groundwater extraction, have enabled farmers to produce two and sometimes three crops per year. The Haryana government has introduced several farmer welfare schemes including the Meri Fasal Mera Byora portal, which provides online registration for crops and ensures timely procurement at minimum support price. The government's efforts to introduce precision farming techniques, drip irrigation, and organic farming practices are gradually changing the agricultural landscape. Soil health cards have been distributed to millions of farmers to help them understand the nutrient composition of their land and apply fertilizers more efficiently. The Krishi Vigyan Kendras established across every district provide technical training and guidance to farmers about new seeds, pesticides, and farming methods. The Punjab and Haryana High Court at Chandigarh has repeatedly upheld the rights of farmers in disputes related to land acquisition and compensation. Crop insurance schemes like the Pradhan Mantri Fasal Bima Yojana provide financial protection to farmers against losses due to natural calamities. The government has also invested in cold storage infrastructure and food processing units to reduce post-harvest losses and add value to agricultural produce. Water conservation remains a critical challenge as the water table in several districts of Haryana has been declining due to over-extraction. Promoting micro-irrigation and crop diversification are essential strategies for sustainable agricultural development in the coming decades. The Digital Agriculture Mission aims to create a comprehensive database of farmers and land records to enable better policy planning and direct benefit transfer.",
    "The banking sector in India has undergone a massive transformation over the past decade, driven by technology and regulatory reforms. The Reserve Bank of India, headquartered in Mumbai, serves as the central banking authority responsible for monetary policy, currency management, and financial sector regulation. Nationalized banks like the State Bank of India, Punjab National Bank, and Bank of Baroda have a vast network of branches across every district in the country. In Haryana, banking services are available even in small towns and villages thanks to the Business Correspondent model and mobile banking vans. The implementation of the Unified Payments Interface has revolutionized digital payments in India, enabling instant money transfers through smartphones. The Pradhan Mantri Jan Dhan Yojana has brought crores of unbanked citizens into the formal financial system by opening zero-balance accounts with free insurance and overdraft facilities. Chandigarh houses several regional headquarters of major public and private sector banks serving both Punjab and Haryana. The concept of Priority Sector Lending ensures that banks allocate a specified percentage of their credit to agriculture, small businesses, and weaker sections. Non-Performing Assets have been a major challenge for public sector banks and the government has taken several steps including the Insolvency and Bankruptcy Code to address this issue. The establishment of the Insolvency and Bankruptcy Board has provided a time-bound mechanism for resolving corporate insolvencies and recovering value for creditors. NABARD, the National Bank for Agriculture and Rural Development, provides refinance and development support to rural financial institutions across India. The Financial Inclusion Index measures the progress of banking services across different regions of the country. The government's focus on cooperative banks and microfinance institutions ensures credit availability for the poor and marginalized communities who lack access to formal banking.",
    "The Indian Railways is one of the largest rail networks in the world and serves as the lifeline of the nation's transportation and logistics system. With thousands of stations spread across every corner of India, the railways connect metropolitan cities like Delhi and Mumbai with small towns and rural areas in states like Haryana, Rajasthan, and Uttar Pradesh. The Rail Land Development Authority manages the commercial development of railway land to generate revenue for the organization. The introduction of Vande Bharat trains has marked a new era in semi-high-speed rail travel in India, offering modern amenities and faster journey times. Railway Recruitment Boards conduct examinations for thousands of posts every year including Non-Technical Popular Category, Junior Clerk cum Typist, and Station Master positions. Candidates must demonstrate proficiency in both written examination and computer-based typing tests to qualify for these positions. The typing test for Railway NTPC requires a minimum speed of thirty words per minute with an accuracy of not less than eighty percent. Aspirants from Haryana cities like Rohtak, Hisar, Karnal, Gurugram, and Faridabad prepare extensively for these competitive examinations. The dedicated freight corridors being constructed between Delhi and Mumbai and Delhi and Kolkata will transform India's logistics efficiency and reduce transportation costs significantly. Station redevelopment projects are underway at major stations to improve passenger amenities and commercial facilities. The Railway Budget was merged with the Union Budget in two thousand seventeen, integrating railway finances into the mainstream government budgeting process. Solar energy projects at railway stations and on train rooftops are part of the green initiative to reduce the carbon footprint of rail operations. The Indian Railways is also a major employer and social institution that has played a crucial role in national integration since its inception.",
    "Computer science and information technology have emerged as the defining fields of the twenty-first century, reshaping how people work, communicate, learn, and conduct business. In India, cities like Bengaluru, Hyderabad, Pune, and Gurugram have emerged as major hubs for IT companies ranging from global giants to innovative startups. The software services industry has been a major source of foreign exchange earnings and employment for millions of skilled professionals. Data structures and algorithms form the foundation of efficient software development and are tested extensively in technical interviews at top companies. Object-oriented programming, functional programming, and cloud-native architectures represent the evolution of software development methodologies over the decades. Database management systems are central to virtually every application, from government portals to banking systems to social media platforms. The relational database model, based on structured query language, remains the most widely used approach for organized data storage and retrieval. Haryana's IT sector has grown significantly with the development of Gurugram and Panchkula as technology corridors. HARTRON has been instrumental in implementing e-governance solutions that digitize citizen services across Haryana. The government's emphasis on digital literacy has led to establishment of training centres in every block of every district. Cybersecurity threats including phishing, ransomware, and data breaches have become major concerns for organizations and individuals alike. The Information Technology Act provides the legal framework for electronic transactions, data protection, and cybercrime in India. Network administrators and security professionals are in high demand as organizations seek to protect their digital assets. The Internet of Things is expanding connectivity to billions of devices, creating both opportunities and new security challenges for the digital ecosystem.",
    "The Constitution of India is the supreme law of the land and the foundation upon which the entire governance structure of the Republic is built. Drafted by the Constituent Assembly under the chairmanship of Dr. B.R. Ambedkar, it was adopted on the twenty-sixth of November nineteen forty-nine and came into effect on the twenty-sixth of January nineteen fifty. The Constitution begins with a Preamble that declares India to be a Sovereign, Socialist, Secular, Democratic Republic committed to Justice, Liberty, Equality, and Fraternity. Part Three of the Constitution guarantees Fundamental Rights to all citizens including the right to equality, right to freedom, right against exploitation, right to freedom of religion, cultural and educational rights, and the right to constitutional remedies. The Directive Principles of State Policy in Part Four provide guidelines for the government in making laws and policies for social and economic welfare. Fundamental Duties were added to the Constitution by the forty-second amendment to remind citizens of their responsibilities towards the nation. The Parliament of India consists of two Houses: the Lok Sabha, which is the lower house, and the Rajya Sabha, which is the upper house. The President of India is the constitutional head of the state and exercises executive powers on the advice of the Council of Ministers headed by the Prime Minister. The Supreme Court of India is the apex court with the power of judicial review to strike down any law that violates the Constitution. High Courts in Chandigarh, Delhi, Mumbai, and other state capitals exercise appellate jurisdiction over lower courts and have original jurisdiction in certain matters. The Election Commission of India is an autonomous constitutional body responsible for conducting free and fair elections at all levels. Constitutional amendments require special majority in Parliament and sometimes ratification by state legislatures, ensuring that fundamental changes are deliberated carefully.",
    "Public health is a fundamental priority of any government committed to the welfare of its citizens. The Ministry of Health and Family Welfare coordinates national health programmes ranging from immunization to maternal and child health, mental health, and non-communicable diseases. The Ayushman Bharat Pradhan Mantri Jan Arogya Yojana is one of the world's largest government-funded health insurance schemes, providing coverage of up to five lakh rupees per family per year for secondary and tertiary hospitalization. Under this scheme, eligible families identified through socio-economic data can avail cashless treatment at empanelled hospitals across India. In Haryana, district hospitals in Rohtak, Hisar, Karnal, Gurugram, Faridabad, and Ambala have been upgraded with modern equipment and specialist services. The Haryana government's health infrastructure includes Primary Health Centres at the block level and Sub Health Centres at the village level ensuring basic healthcare within reach of every citizen. AIIMS Jhajjar in Haryana is a major national-level medical institution providing advanced treatment and training. The National Pharmaceutical Pricing Authority regulates the prices of essential medicines to ensure affordability. Jan Aushadhi stores established by the government provide generic medicines at prices significantly lower than branded alternatives. Mental health awareness has gained prominence in recent years and the government has launched schemes to address this often neglected aspect of public health. Yoga and traditional medicine systems like Ayurveda and Unani have been integrated into the mainstream health system through the AYUSH ministry. COVID-19 pandemic exposed both the strengths and vulnerabilities of India's public health system and led to massive investments in health infrastructure, vaccine development, and disease surveillance.",
    "Environmental protection and sustainable development are among the most pressing challenges of our times. Climate change, caused primarily by greenhouse gas emissions from burning fossil fuels, is already causing measurable impacts on weather patterns, sea levels, and biodiversity across the planet. India is both a victim of climate change and one of the largest emitters of carbon dioxide due to its large population and growing economy. The government has committed to ambitious climate targets including achieving net zero emissions by two thousand seventy and increasing renewable energy capacity significantly. Haryana has been implementing various environmental initiatives including the promotion of solar energy, restrictions on stubble burning, and tree plantation drives across all districts. The Aravalli hills passing through Gurugram and Faridabad play a crucial ecological role in the region and their protection is essential for maintaining the green cover and preventing desertification. River Yamuna flowing through the state receives significant pollution from industrial effluents and domestic sewage and its restoration is a major environmental priority. The Central Pollution Control Board monitors air and water quality across the country and issues advisories when levels exceed safe limits. The National Green Tribunal adjudicates cases related to environmental protection and compensation for ecological damage. Biodiversity conservation through wildlife sanctuaries and national parks protects endangered species and their habitats. The Sustainable Development Goals adopted by the United Nations provide a comprehensive framework for balancing economic growth with social equity and environmental sustainability. Renewable energy from solar, wind, and hydroelectric sources is rapidly becoming cost-competitive with fossil fuels, creating new opportunities for clean energy transition in India.",
    "The competitive examination system in India serves as the primary pathway for recruitment into government service at various levels from central services to state bureaucracy. The Union Public Service Commission conducts the Civil Services Examination, which selects candidates for the prestigious Indian Administrative Service, Indian Police Service, and Indian Foreign Service among others. The Staff Selection Commission recruits candidates for various Group B and Group C posts in central government ministries and departments. Railway Recruitment Boards manage recruitment for the largest employer in India. State Public Service Commissions conduct examinations for state government positions in each state. The Haryana Staff Selection Commission conducts examinations for recruitment to various posts in the Haryana government including clerks, data entry operators, junior engineers, and other positions. Typing test proficiency is mandatory for clerical and data entry posts with specific requirements for speed and accuracy. Aspirants from across Haryana cities including Rohtak, Hisar, Karnal, Gurugram, Faridabad, Panipat, Ambala, and Kurukshetra compete for limited government vacancies. Coaching institutes have flourished in cities across India to help aspirants prepare for these examinations. The National Career Service Portal provides a single platform for job seekers and employers including government recruitment notifications. Online application systems have replaced paper-based applications for most government examinations, making the process more accessible and efficient. Age relaxation provisions for reserved categories, ex-servicemen, and persons with disabilities ensure inclusivity in the recruitment process. Meritocracy and transparency in the selection process are essential for maintaining public trust in government institutions.",
    "Water management is critical for a water-stressed state like Haryana where agriculture, industry, and domestic needs compete for limited water resources. The Western Yamuna Canal, dating back to the nineteenth century, is a vital irrigation artery serving millions of farmers across several districts. The Bhakra Nangal Dam project on the Sutlej River, completed in the nineteen sixties, provides both irrigation water and hydroelectric power to Haryana and neighboring states. Groundwater over-extraction has led to a rapidly declining water table in many parts of Haryana, particularly in the western districts of Hisar, Bhiwani, and Sirsa where rainfall is low and irrigation demand is high. The government has been promoting micro-irrigation techniques like drip and sprinkler systems to improve water use efficiency in agriculture. Rainwater harvesting has been made mandatory for new constructions in urban areas of Haryana to recharge groundwater. The Mewat region, now Nuh district, faces severe water scarcity and special programmes have been implemented to provide safe drinking water to its rural population. The Munak canal system and other water supply networks ensure water availability for the National Capital Region including parts of Haryana bordering Delhi. Industrial water use efficiency standards have been strengthened to reduce discharge of treated effluents into water bodies. River interlinking proposals aim to transfer surplus water from river-rich states to water-deficient regions including parts of Haryana. The Central Ground Water Board monitors groundwater levels across the country and issues periodic reports on the state of aquifer health. Community participation in watershed management through village-level water user associations has shown promising results in several districts.",
    "Digital financial literacy is increasingly important in an era when banking and payment services are rapidly migrating to digital platforms. Understanding how to safely use internet banking, mobile wallets, and payment gateways is essential for every citizen. The Unified Payments Interface developed by the National Payments Corporation of India has made peer-to-peer and merchant payments instantaneous and free for most transactions. BHIM app, named after Dr. B.R. Ambedkar, was one of the first government-backed UPI applications. Common Service Centres have been established at panchayat level across India to deliver government and financial services digitally to citizens who lack connectivity or digital skills. In Haryana, thousands of such centres provide Aadhaar enrollment, banking, insurance, and government portal services to rural residents. Aadhaar, the world's largest biometric identity database, has transformed service delivery by enabling direct benefit transfer for subsidies, scholarships, and pensions directly into beneficiary accounts. The National Pension System provides a portable, professionally managed retirement savings option for both government employees and private sector workers. The Kisan Credit Card scheme provides farmers with revolving credit for agricultural expenses at subsidized interest rates. Consumer protection laws and the Financial Consumer Protection framework ensure that citizens have recourse against unfair practices by financial institutions. Financial regulators including the Securities and Exchange Board of India and the Insurance Regulatory and Development Authority oversee their respective sectors to protect investor and policyholder interests. Financial inclusion is measured by the RBI through its composite index covering access, usage, and quality dimensions of financial services.",
    "Sports and physical education play a vital role in the holistic development of individuals and contribute to national pride through achievements in international competitions. Haryana has produced an extraordinary number of Olympic and Commonwealth Games champions in disciplines including wrestling, boxing, athletics, and shooting. Wrestlers like Sushil Kumar and Yogeshwar Dutt have won Olympic medals bringing honour to the nation and inspiration to millions of aspiring athletes from Haryana's villages. The Chaudhary Bansi Lal Cricket Stadium in Lahli and the Tau Devi Lal Stadium in Panchkula are major sports venues in Haryana. The Haryana Sports Authority manages state-level sports academies and provides financial support and training facilities to promising athletes. The Khelo India initiative has identified young talent from across the country and provided them with quality coaching, equipment, and nutrition support. School Games Federation of India conducts inter-school competitions that serve as the first level of talent identification. Yoga has gained global recognition as an integral part of India's soft power and health promotion strategy. The sports goods manufacturing industry in Jalandhar, just across the border in Punjab, supplies equipment to athletes across India and exports to international markets. Universities and colleges in Haryana including Maharshi Dayanand University in Rohtak and Kurukshetra University provide sports science programmes to train coaches and sports administrators. The government's provision of cash incentives and job reservations for medal-winning athletes encourages youth to pursue careers in sports alongside education.",
    "Haryana's cultural heritage is rich and diverse, reflecting centuries of history, tradition, and artistic expression. The Kurukshetra region is internationally known as the land of the Mahabharata, where the epic battle described in the ancient text was fought thousands of years ago. The Brahma Sarovar in Kurukshetra is one of the holiest water tanks in India attracting millions of pilgrims especially during solar eclipses. Haryanvi folk music and dance including Ragini, Saang, and Swang are traditional performing arts that have entertained and educated rural communities for centuries. The Surajkund Crafts Mela held annually near Faridabad is one of India's largest craft fairs, showcasing traditional arts and crafts from states across the country and attracting international tourists. Panipat, known as the city of three historic battles, has a museum that preserves artifacts and narratives from the decisive conflicts that shaped medieval Indian history. The Pinjore Gardens near Chandigarh, also known as Yadavindra Gardens, represent the Mughal garden tradition and are a major tourist attraction. Bhiwani is known as the mini Cuba of India due to its remarkable tradition of producing professional boxers of national and international stature. Faridabad's ancient Baba Farid mosque and Sufi shrine attract devotees from across North India. The state's cuisine featuring dishes like bajra roti, sarson ka saag, lassi, and khichdi reflects the agricultural and pastoral heritage of the region. Traditional handicrafts including Phulkari embroidery, pottery, and wooden toys represent the skilled craftsmanship passed down through generations. Cultural festivals like Teej, Baisakhi, and Gugga Navami bring communities together and reinforce shared cultural identity.",
    "The role of women in India's development has been increasingly recognized and supported through progressive policies and legal reforms. The Beti Bachao Beti Padhao programme, launched in Panipat district of Haryana in two thousand fifteen, addressed the alarming decline in child sex ratio and promoted girls' education. Haryana has implemented several schemes to improve the status of women including free education up to postgraduate level for girls from economically weaker sections. The Pradhan Mantri Matru Vandana Yojana provides maternity benefit payments to pregnant and lactating women to compensate for wage loss and improve their health. Self-Help Groups formed under the National Rural Livelihood Mission have empowered millions of rural women through collective savings, credit, and enterprise development. Women entrepreneurs have been supported through the Mahila Udyam Nidhi scheme and stand-up India programme that provides loans for setting up businesses. The Panchayati Raj system mandates reservation of at least one-third of seats for women in all local government bodies. Female literacy rates in Haryana have improved significantly over the decades, though there is still progress to be made in ensuring that all girls complete secondary and higher education. The Saksham Anganwadi programme has improved nutritional and health outcomes for children and mothers in rural areas. Women's safety and protection laws have been strengthened through amendments to the Indian Penal Code and new legislation addressing domestic violence, sexual harassment, and trafficking. The one-stop centres established in every district provide integrated support services to women in distress including medical, legal, and counselling assistance.",
    "Urban development and smart cities represent the future direction of India's rapidly urbanizing landscape. The Smart Cities Mission launched by the Government of India aims to develop a hundred cities with state-of-the-art infrastructure, digital services, and sustainable urban planning. Gurugram and Faridabad in Haryana are part of this ambitious programme with projects focused on traffic management, waste management, water supply, and citizen services. Chandigarh, designed by the French architect Le Corbusier, is often cited as a model planned city with its logical sector-based layout, abundant green spaces, and efficient civic infrastructure. The Deen Dayal Upadhyaya Grameen Kaushalya Yojana focuses on skilling rural youth for employment in the urban economy as India's cities expand and demand more skilled workers. The Atal Mission for Rejuvenation and Urban Transformation has provided infrastructure grants to cities for basic services like water supply, sewerage, and parks. Rapid Micro Transit systems and Bus Rapid Transit corridors are being developed in major cities to reduce traffic congestion and pollution. The Haryana Urban Development Authority has planned and developed new sectors in Panchkula and other towns to accommodate the growing population. Construction of affordable housing under the Pradhan Mantri Awas Yojana Urban is addressing the housing shortage for lower income groups in Indian cities. Solid waste management remains a major challenge with most cities struggling to achieve scientific disposal of municipal solid waste. Green building standards and energy efficiency codes for new construction are reducing the environmental footprint of urban development. Metropolitan governance reforms are needed to coordinate planning and services across contiguous urban areas that span multiple municipalities.",
    "The role of media and communication in a democratic society is fundamental to informed citizenship and government accountability. Print, television, radio, and digital media collectively serve as the fourth pillar of democracy by reporting on government activities, investigative journalism, and providing a platform for public discourse. Doordarshan, India's public broadcaster, has served the nation since nineteen fifty-nine with educational programming, news, and entertainment reaching even remote areas without internet connectivity. All India Radio with its vast network of stations broadcasts in regional languages including Haryanvi, providing news, agricultural information, and cultural programmes to rural audiences. The Press Council of India regulates the conduct of print media and upholds journalistic standards and freedom. Digital media including news websites, YouTube channels, and social media platforms have democratized information production and distribution. However, the spread of misinformation and fake news through social media has created new challenges for public discourse and requires digital literacy initiatives. The government's factchecking initiative and PIB Fact Check service debunk false information circulated about government schemes and policies. Regional language media in Haryanvi and Hindi serves the majority of the state's population who prefer news in their mother tongue. Community radio stations operated by educational institutions and NGOs provide hyper-local information relevant to specific village and district communities. The cable television industry regulation and digitization has improved broadcast quality and consumer choice across India. Freedom of the press guaranteed under Article 19 of the Constitution is essential for maintaining transparency and accountability in public life. Media literacy education in schools and colleges helps young people critically evaluate information from multiple sources.",
  ],
  hindi: [
    "भारत सरकार ने देश के नागरिकों के कल्याण के लिए अनेक योजनाएं चलाई हैं। हरियाणा राज्य, जिसकी राजधानी चंडीगढ़ है, कृषि और औद्योगिक विकास में सदा अग्रणी रहा है। रोहतक, हिसार, करनाल, गुरुग्राम और फरीदाबाद जैसे नगरों ने पिछले कुछ दशकों में अत्यधिक विकास किया है। कुरुक्षेत्र का प्राचीन नगर महाभारत युद्ध की ऐतिहासिक और धार्मिक दृष्टि से अत्यंत महत्वपूर्ण स्थान है। वित्त मंत्रालय प्रत्येक वर्ष पर्याप्त संसाधन आवंटित करता है ताकि आवश्यक सेवाएं देश के हर कोने तक पहुंच सकें। यह प्रत्येक सरकारी कर्मचारी का दायित्व है कि वह पूरी ईमानदारी और लगन से कार्य करे। भारत की संसद, जो नई दिल्ली में स्थित है, देश का सर्वोच्च विधायी निकाय है। राष्ट्रपति भवन भारत के राष्ट्रपति का आधिकारिक निवास है। हमारा संविधान, जो उन्नीस सौ उनचास में छब्बीस नवंबर को अपनाया गया, प्रत्येक नागरिक को मौलिक अधिकार प्रदान करता है। राष्ट्रीय ध्वज के तीन रंग — केसरिया, सफेद और हरा — क्रमशः साहस, शांति और समृद्धि के प्रतीक हैं। भारतीय गणतंत्र अपनी विविध संस्कृति और परंपराओं के साथ विश्व के सबसे बड़े लोकतंत्रों में से एक है। प्रत्येक वर्ष छब्बीस जनवरी को देश हर्षोल्लास के साथ गणतंत्र दिवस मनाता है। भारतीय सशस्त्र बल देश की संप्रभुता और क्षेत्रीय अखंडता की रक्षा करते हैं। शिक्षा और स्वास्थ्य सेवाएं राष्ट्रीय विकास के सबसे महत्वपूर्ण स्तंभ हैं और सरकार इन दोनों क्षेत्रों में भारी निवेश कर रही है। विभिन्न प्रमुख योजनाओं के तहत देश भर में हजारों विद्यालय और अस्पताल बनाए गए हैं। राष्ट्रीय स्वास्थ्य मिशन का उद्देश्य सभी नागरिकों को सस्ती और गुणवत्तापूर्ण स्वास्थ्य सेवाएं प्रदान करना है।",
    "भारत का संविधान विश्व का सबसे लंबा लिखित संविधान है जो नागरिकों को मौलिक अधिकार और कर्तव्य प्रदान करता है। यह संविधान छब्बीस नवंबर उन्नीस सौ उनचास को अंगीकृत किया गया और छब्बीस जनवरी उन्नीस सौ पचास को लागू हुआ। भारतीय लोकतंत्र संविधान की आधारशिला पर खड़ा है। प्रत्येक नागरिक को अपने मौलिक अधिकारों की जानकारी होनी चाहिए और अपने कर्तव्यों का पालन करना चाहिए। हरियाणा के चंडीगढ़, रोहतक, हिसार, करनाल, गुरुग्राम, फरीदाबाद और कुरुक्षेत्र जैसे प्रमुख नगरों में नागरिकों को संवैधानिक अधिकारों के प्रति जागरूक किया जा रहा है। सर्वोच्च न्यायालय संविधान की व्याख्या करने और सभी नागरिकों को न्याय दिलाने के लिए जिम्मेदार सर्वोच्च न्यायिक निकाय है। संसद द्वारा पारित प्रत्येक विधेयक को राष्ट्रपति की स्वीकृति के बाद ही कानून का रूप मिलता है। राष्ट्रपति भवन में प्रत्येक वर्ष राष्ट्रीय पुरस्कार वितरण समारोह आयोजित होते हैं जिनमें विभिन्न क्षेत्रों में उत्कृष्ट कार्य करने वाले नागरिकों को सम्मानित किया जाता है। गणतंत्र दिवस परेड में देश की सैन्य शक्ति, सांस्कृतिक विविधता और विकास उपलब्धियों का भव्य प्रदर्शन किया जाता है। राष्ट्रीय एकता और अखंडता बनाए रखना हर भारतीय नागरिक का सर्वोच्च कर्तव्य है। मुंबई, दिल्ली और चंडीगढ़ जैसे महानगर देश की आर्थिक प्रगति में महत्वपूर्ण योगदान देते हैं। डिजिटल इंडिया कार्यक्रम ने सरकारी सेवाओं को ऑनलाइन उपलब्ध कराकर नागरिकों का जीवन सरल बना दिया है।",
    "रेलवे भर्ती बोर्ड हर वर्ष हजारों पदों पर भर्ती करता है। यह परीक्षा देश भर के लाखों उम्मीदवारों द्वारा दी जाती है। टाइपिंग टेस्ट में उम्मीदवार को दिए गए अनुच्छेद को यथाशीघ्र और शुद्धता के साथ टाइप करना होता है। हिंदी टाइपिंग के लिए यूनिकोड या कृतिदेव फ़ॉन्ट का उपयोग किया जाता है। हरियाणा के रोहतक, हिसार, करनाल और गुरुग्राम जैसे जिलों से हजारों उम्मीदवार प्रतिवर्ष सरकारी सेवा परीक्षाओं में भाग लेते हैं। चंडीगढ़ में स्थित विभिन्न सरकारी कार्यालय और प्रशिक्षण संस्थान उम्मीदवारों को परीक्षा की तैयारी में सहायता प्रदान करते हैं। फरीदाबाद और गुरुग्राम के औद्योगिक क्षेत्रों में डेटा एंट्री ऑपरेटरों और लिपिकों की भारी मांग है। कुरुक्षेत्र विश्वविद्यालय सरकारी सेवा परीक्षाओं की तैयारी के लिए उत्कृष्ट कोचिंग और संसाधन प्रदान करता है। संसद में पारित श्रम कानून सरकारी कर्मचारियों के अधिकारों और सेवा शर्तों की रक्षा करते हैं। राष्ट्रपति प्रत्येक वर्ष गणतंत्र दिवस पर राष्ट्र को संबोधित करते हैं और देश की प्रगति की समीक्षा प्रस्तुत करते हैं। भारतीय संविधान में दिए गए मौलिक अधिकार सुनिश्चित करते हैं कि प्रत्येक नागरिक को समान अवसर और न्याय मिले। मुंबई में स्थित भारतीय स्टेट बैंक का मुख्यालय देश की वित्तीय प्रणाली की रीढ़ है और लाखों कर्मचारियों को रोजगार प्रदान करता है।",
    "भारत सरकार की डिजिटल इंडिया योजना ने देश के सूचना प्रौद्योगिकी क्षेत्र में एक नई क्रांति लाई है। इस महत्वाकांक्षी कार्यक्रम का मुख्य उद्देश्य देश के प्रत्येक नागरिक को डिजिटल सेवाओं से जोड़ना और सरकारी कार्यों में पारदर्शिता लाना है। हरियाणा राज्य में चंडीगढ़, गुरुग्राम, फरीदाबाद, रोहतक, हिसार और करनाल जैसे नगरों में डिजिटल बुनियादी ढांचे का तेजी से विकास हो रहा है। सरकारी सेवाओं को ऑनलाइन उपलब्ध कराने से नागरिकों का समय और धन दोनों की बचत होती है। मोबाइल एप्लिकेशन और वेब पोर्टल के माध्यम से आम जनता अब घर बैठे ही राशन कार्ड, जन्म प्रमाण पत्र, आय प्रमाण पत्र और भूमि रिकॉर्ड जैसे दस्तावेज प्राप्त कर सकती है। भारतीय संविधान के अनुच्छेद 21 में निहित जीवन के अधिकार की व्याख्या अब डिजिटल अधिकारों को भी शामिल करने के लिए विस्तृत हो रही है। संसद ने सूचना प्रौद्योगिकी से संबंधित विभिन्न कानून पारित किए हैं जो इलेक्ट्रॉनिक लेनदेन और साइबर अपराधों को नियंत्रित करते हैं। राष्ट्रपति भवन और लोकसभा की वेबसाइटें अब सूचना और सेवाओं का महत्वपूर्ण स्रोत बन गई हैं। डेटा प्रविष्टि परिचालकों और कंप्यूटर पेशेवरों की मांग दिन-प्रतिदिन बढ़ती जा रही है क्योंकि सरकारी और निजी दोनों क्षेत्रों में डिजिटलीकरण का काम तेज हो रहा है। कुरुक्षेत्र, पानीपत और अंबाला जैसे ऐतिहासिक नगरों में भी आधुनिक प्रौद्योगिकी केंद्र स्थापित किए जा रहे हैं। हार्ट्रॉन जैसे संस्थान हरियाणा में ई-गवर्नेंस को नई ऊंचाइयों पर ले जाने में महत्वपूर्ण भूमिका निभा रहे हैं।",
    "हरियाणा की कृषि अर्थव्यवस्था भारत की खाद्य सुरक्षा में अत्यंत महत्वपूर्ण योगदान देती है। इस राज्य की उपजाऊ भूमि में गेहूं, धान, बाजरा और सरसों की प्रचुर फसलें उगाई जाती हैं। हरित क्रांति के दौरान हरियाणा के किसानों ने नई किस्मों के बीजों और आधुनिक कृषि तकनीकों को अपनाकर देश को खाद्यान्न उत्पादन में आत्मनिर्भर बनाने में सहायता की। रोहतक, हिसार, करनाल, सिरसा और फतेहाबाद जिलों में विशाल कृषि भूमि है जहां किसान परिश्रम और लगन से काम करते हैं। प्रधानमंत्री फसल बीमा योजना के अंतर्गत किसानों को प्राकृतिक आपदाओं से होने वाले नुकसान की भरपाई की जाती है। मृदा स्वास्थ्य कार्ड योजना के तहत किसानों को उनकी भूमि की पोषण संरचना की जानकारी दी जाती है ताकि वे उचित मात्रा में उर्वरकों का प्रयोग कर सकें। भारतीय कृषि अनुसंधान परिषद के अंतर्गत करनाल में स्थित राष्ट्रीय डेयरी अनुसंधान संस्थान पशुपालन और दुग्ध उत्पादन के क्षेत्र में अग्रणी अनुसंधान करता है। न्यूनतम समर्थन मूल्य नीति के तहत सरकार किसानों की फसलों की खरीद सुनिश्चित करती है। हरियाणा के कृषि विश्वविद्यालय हिसार में कृषि विज्ञान के विद्यार्थी उन्नत तकनीकों का अध्ययन करते हैं। जल संरक्षण और टपक सिंचाई प्रणाली को बढ़ावा देना राज्य सरकार की प्राथमिकता है क्योंकि भूजल स्तर लगातार घट रहा है।",
    "भारत के शिक्षा क्षेत्र में आमूलचूल परिवर्तन लाने के लिए राष्ट्रीय शिक्षा नीति दो हजार बीस को लागू किया गया है। इस नीति का मुख्य उद्देश्य शिक्षा को रटंत पद्धति से मुक्त कर उसे व्यावहारिक और समग्र बनाना है। प्राथमिक स्तर पर मातृभाषा में शिक्षा प्रदान करने पर विशेष बल दिया गया है जिससे बच्चों की बुनियादी समझ मजबूत होती है। हरियाणा में रोहतक, हिसार, गुरुग्राम, फरीदाबाद और करनाल जैसे नगरों में सरकारी और निजी विद्यालयों में नई पाठ्यचर्या लागू हो रही है। कौशल विकास को पाठ्यक्रम में शामिल करने से छात्र रोजगार के लिए बेहतर तैयारी कर सकते हैं। महर्षि दयानंद विश्वविद्यालय रोहतक और कुरुक्षेत्र विश्वविद्यालय हरियाणा के प्रमुख उच्च शिक्षण संस्थान हैं जो विभिन्न विषयों में डिग्री कार्यक्रम प्रदान करते हैं। शिक्षक प्रशिक्षण कार्यक्रमों को आधुनिक शैक्षणिक तरीकों और डिजिटल उपकरणों के उपयोग के अनुरूप अद्यतन किया जा रहा है। प्रधानमंत्री ई-विद्या कार्यक्रम के तहत डिजिटल शिक्षा सामग्री और ऑनलाइन कक्षाएं उपलब्ध कराई जा रही हैं। संविधान के अनुच्छेद इक्कीस ए के अंतर्गत छह से चौदह वर्ष के सभी बच्चों को निशुल्क और अनिवार्य शिक्षा का अधिकार प्राप्त है। शिक्षा के अधिकार अधिनियम ने सुनिश्चित किया है कि समाज के सभी वर्गों के बच्चों को गुणवत्तापूर्ण शिक्षा मिले।",
    "भारत की न्यायपालिका लोकतंत्र के चौथे स्तंभ के रूप में नागरिकों के अधिकारों की रक्षा करती है। सर्वोच्च न्यायालय संविधान का अंतिम व्याख्याकार है और उसके निर्णय पूरे देश में बाध्यकारी होते हैं। पंजाब और हरियाणा उच्च न्यायालय चंडीगढ़ में स्थित है और दोनों राज्यों के नागरिकों को न्याय प्रदान करता है। जिला न्यायालय रोहतक, हिसार, करनाल, गुरुग्राम, फरीदाबाद और अन्य जिलों में नागरिकों के विवादों का निपटारा करते हैं। लोक अदालतें विवादों का त्वरित और सस्ता समाधान प्रदान करती हैं और दोनों पक्षों की सहमति से निर्णय दिए जाते हैं। राष्ट्रीय कानूनी सेवा प्राधिकरण गरीब और कमजोर वर्ग के नागरिकों को निशुल्क कानूनी सहायता प्रदान करता है। न्यायिक सुधारों के अंतर्गत मामलों की सुनवाई में विलंब को कम करने के लिए फास्ट ट्रैक कोर्ट और ई-कोर्ट जैसी व्यवस्थाएं की गई हैं। राष्ट्रीय हरित अधिकरण पर्यावरण से संबंधित मामलों की सुनवाई करता है और प्रदूषणकारी उद्योगों पर जुर्माना लगाता है। उपभोक्ता संरक्षण कानून के अंतर्गत उपभोक्ता अदालतें उत्पाद दोष और सेवा में कमी के लिए मुआवजे के दावों का निपटारा करती हैं। न्याय में देरी और मामलों के बैकलॉग की समस्या को दूर करने के लिए डिजिटल कोर्ट रूम और वीडियो कॉन्फ्रेंसिंग के माध्यम से सुनवाई की जा रही है।",
    "स्वास्थ्य सेवाओं का विस्तार भारत सरकार की प्रमुख प्राथमिकताओं में से एक है। आयुष्मान भारत प्रधानमंत्री जन आरोग्य योजना के अंतर्गत लाखों गरीब परिवारों को पांच लाख रुपए तक का स्वास्थ्य बीमा प्रदान किया जाता है। हरियाणा में रोहतक का पोस्ट ग्रेजुएट इंस्टीट्यूट ऑफ मेडिकल साइंसेज उत्तर भारत के प्रमुख चिकित्सा संस्थानों में से एक है। जिला अस्पताल, सामुदायिक स्वास्थ्य केंद्र और प्राथमिक स्वास्थ्य केंद्रों का जाल ग्रामीण क्षेत्रों में भी स्वास्थ्य सेवाएं सुनिश्चित करता है। एम्स झज्जर हरियाणा में स्थापित एक राष्ट्रीय स्तर का अत्याधुनिक चिकित्सा संस्थान है जो जटिल बीमारियों का उपचार प्रदान करता है। जन औषधि केंद्रों में सस्ती दर पर जेनेरिक दवाइयां उपलब्ध कराई जाती हैं जिससे गरीब मरीजों का खर्च कम होता है। राष्ट्रीय स्वास्थ्य मिशन के अंतर्गत मातृ एवं शिशु मृत्यु दर को कम करने के लिए विशेष कार्यक्रम चलाए जाते हैं। कोविड-19 महामारी के दौरान हरियाणा ने त्वरित टीकाकरण अभियान चलाकर लाखों नागरिकों को सुरक्षित किया। मानसिक स्वास्थ्य के प्रति जागरूकता बढ़ाने और परामर्श सेवाएं प्रदान करने के लिए विशेष केंद्र स्थापित किए गए हैं। योग और आयुर्वेद सहित पारंपरिक चिकित्सा प्रणालियों को आधुनिक स्वास्थ्य सेवाओं के साथ एकीकृत किया जा रहा है।",
    "भारतीय संविधान में महिलाओं के अधिकारों और उनकी सुरक्षा के लिए कई महत्वपूर्ण प्रावधान किए गए हैं। बेटी बचाओ बेटी पढ़ाओ अभियान की शुरुआत पानीपत जिले से हुई थी और इसने हरियाणा में लड़कियों के प्रति सकारात्मक सामाजिक बदलाव लाने में महत्वपूर्ण भूमिका निभाई। स्वयं सहायता समूहों के माध्यम से ग्रामीण महिलाएं आर्थिक रूप से सशक्त हो रही हैं और लघु उद्यम स्थापित कर परिवार की आय में योगदान दे रही हैं। हरियाणा में महिलाओं को उच्च शिक्षा तक निशुल्क पहुंच प्रदान करने की योजनाएं लागू हैं। पंचायती राज संस्थाओं में महिलाओं के लिए एक तिहाई आरक्षण से उनकी राजनीतिक भागीदारी बढ़ी है। गुरुग्राम, फरीदाबाद, रोहतक और हिसार में महिला उद्यमियों की संख्या तेजी से बढ़ रही है। महिला हेल्पलाइन और वन स्टॉप सेंटर पीड़ित महिलाओं को चिकित्सा, कानूनी और परामर्श सेवाएं एक ही स्थान पर प्रदान करते हैं। श्रम कानूनों में महिलाओं के लिए समान वेतन और मातृत्व लाभ के प्रावधान कार्यस्थल पर उनकी स्थिति को सुदृढ़ करते हैं। खेलों में हरियाणा की बेटियों ने कुश्ती, मुक्केबाजी और एथलेटिक्स में राष्ट्रीय और अंतरराष्ट्रीय स्तर पर अनेक पदक जीतकर राज्य और देश का नाम रोशन किया है। नारी शक्ति पुरस्कार और अन्य सम्मान असाधारण महिलाओं को उनके योगदान के लिए दिए जाते हैं।",
    "पर्यावरण संरक्षण आज की सबसे बड़ी चुनौती है और इसके लिए सरकार, उद्योग और समाज को मिलकर काम करना होगा। वायु प्रदूषण विशेषकर राष्ट्रीय राजधानी क्षेत्र और हरियाणा के गुरुग्राम व फरीदाबाद जिलों में एक गंभीर समस्या बन चुकी है। पराली जलाने की समस्या से निपटने के लिए सरकार किसानों को वैकल्पिक तकनीकें अपनाने के लिए प्रोत्साहित कर रही है। यमुना नदी की सफाई के लिए विशेष योजनाएं लागू की गई हैं क्योंकि औद्योगिक और घरेलू अपशिष्ट से नदी का जल प्रदूषित हो रहा है। अरावली पर्वत श्रृंखला की हरी-भरी पहाड़ियां गुरुग्राम और फरीदाबाद क्षेत्र की पारिस्थितिकी के लिए अत्यंत महत्वपूर्ण हैं और इनकी सुरक्षा आवश्यक है। सौर ऊर्जा और पवन ऊर्जा परियोजनाओं के विस्तार से हरियाणा स्वच्छ ऊर्जा उत्पादन में अग्रणी राज्यों में शामिल होने का लक्ष्य रखता है। वन महोत्सव के अवसर पर प्रतिवर्ष लाखों पौधे लगाए जाते हैं। जल संग्रहण और वर्षा जल संचयन के कार्यक्रम भूजल पुनर्भरण में सहायक हो रहे हैं। राष्ट्रीय हरित अधिकरण ने पर्यावरण उल्लंघन के मामलों में कठोर दंड का प्रावधान किया है। जैव विविधता की रक्षा के लिए हरियाणा में कलेसर राष्ट्रीय उद्यान और सुल्तानपुर पक्षी अभयारण्य जैसे संरक्षित क्षेत्र स्थापित किए गए हैं।",
    "भारतीय रेलवे देश की आर्थिक धमनी है और लाखों यात्रियों व माल को प्रतिदिन एक स्थान से दूसरे स्थान तक पहुंचाती है। रेलवे भर्ती बोर्ड प्रतिवर्ष लिपिक, टाइपिस्ट और तकनीकी पदों के लिए परीक्षाएं आयोजित करता है जिनमें टाइपिंग परीक्षा अनिवार्य होती है। एनटीपीसी परीक्षा में उत्तीर्ण होने के लिए हिंदी और अंग्रेजी दोनों में न्यूनतम टाइपिंग गति आवश्यक है। हरियाणा के रोहतक, हिसार, करनाल, पानीपत, अंबाला और गुरुग्राम रेलवे स्टेशन प्रमुख जंक्शन हैं जहां से अनेक रेलगाड़ियां गुजरती हैं। वंदे भारत एक्सप्रेस ट्रेनों ने यात्रा को और तेज और सुविधाजनक बनाया है। रेलवे ने अपने स्टेशनों पर सौर ऊर्जा पैनल लगाने और पर्यावरण के अनुकूल प्रौद्योगिकियां अपनाने का काम तेज किया है। स्टेशनों का आधुनिकीकरण कर उन्हें विमानपत्तन की तर्ज पर विकसित किया जा रहा है। ऑनलाइन टिकट बुकिंग प्रणाली ने यात्रियों की लंबी कतारों से मुक्ति दिला दी है। भारतीय रेलवे का माल ढुलाई नेटवर्क देश की औद्योगिक आपूर्ति श्रृंखला का महत्वपूर्ण हिस्सा है। समर्पित मालगाड़ी गलियारों के निर्माण से माल परिवहन की गति और दक्षता में उल्लेखनीय सुधार होगा।",
    "कंप्यूटर टाइपिंग आधुनिक कार्यालय कार्य का एक अनिवार्य कौशल बन गया है। सरकारी परीक्षाओं में डेटा एंट्री ऑपरेटर और लिपिक पदों के लिए न्यूनतम टाइपिंग गति और सटीकता का मापदंड निर्धारित किया गया है। एसएससी, यूपीएससी, हरियाणा कर्मचारी चयन आयोग और रेलवे भर्ती बोर्ड की परीक्षाओं में टाइपिंग का अहम स्थान है। हिंदी टाइपिंग के लिए मंगल और कृति देव फॉन्ट का व्यापक उपयोग होता है। हार्ट्रॉन की परीक्षा में हिंदी और अंग्रेजी दोनों भाषाओं में टाइपिंग का परीक्षण किया जाता है। टच टाइपिंग की विधि से टाइपिस्ट बिना कीबोर्ड देखे ही तेज गति से टाइप कर सकते हैं जो दीर्घकालिक दक्षता के लिए आवश्यक है। मांसपेशियों की स्मृति विकसित करने के लिए हजारों घंटों का अभ्यास आवश्यक है। गलतियों को सुधारने में समय और संसाधन लगते हैं इसलिए सटीकता की आदत पहले से ही विकसित करनी चाहिए। हरियाणा के चंडीगढ़, रोहतक, हिसार और गुरुग्राम में कंप्यूटर प्रशिक्षण केंद्र युवाओं को टाइपिंग और कंप्यूटर कौशल सिखा रहे हैं। प्रतिस्पर्धात्मक परीक्षाओं में सफलता के लिए नियमित अभ्यास, सही मुद्रा और केंद्रित ध्यान अत्यंत आवश्यक है।",
    "भारतीय संविधान में मौलिक अधिकार हर नागरिक को स्वतंत्र और सम्मानजनक जीवन जीने की गारंटी देते हैं। अनुच्छेद चौदह में विधि के समक्ष समानता का अधिकार प्रदान किया गया है जिसका अर्थ है कि कानून की नजर में सभी नागरिक समान हैं। अनुच्छेद उन्नीस में भाषण और अभिव्यक्ति की स्वतंत्रता सहित कई स्वतंत्रताएं दी गई हैं। अनुच्छेद इक्कीस जीवन और व्यक्तिगत स्वतंत्रता के अधिकार की गारंटी देता है। संविधान के भाग चार में राज्य के नीति निर्देशक सिद्धांत हैं जो सरकार को समाज के कल्याण के लिए कानून बनाने का मार्गदर्शन करते हैं। मूल कर्तव्यों के अंतर्गत प्रत्येक नागरिक से अपेक्षा है कि वह संविधान का पालन करे, देश की रक्षा करे और सार्वजनिक संपत्ति की रक्षा करे। लोकसभा और राज्यसभा मिलकर संसद का निर्माण करती हैं जो देश के लिए कानून बनाती है। राष्ट्रपति संविधान के अनुसार कार्यपालिका का प्रमुख होता है और प्रधानमंत्री के नेतृत्व में मंत्रिपरिषद की सलाह पर कार्य करता है। राज्य विधानमंडल प्रांतीय मामलों पर कानून बनाते हैं और केंद्र-राज्य संबंधों की व्यवस्था संविधान में स्पष्ट रूप से की गई है। चुनाव आयोग एक स्वतंत्र संवैधानिक संस्था है जो स्वतंत्र और निष्पक्ष चुनाव कराने की जिम्मेदारी निभाती है।",
    "आधुनिक कार्यालय प्रबंधन में कंप्यूटर का उपयोग अपरिहार्य हो गया है। माइक्रोसॉफ्ट वर्ड, एक्सेल और पावरपॉइंट जैसे सॉफ्टवेयर कार्यालयीन कार्यों को सरल और प्रभावी बनाते हैं। डेटाबेस प्रबंधन प्रणाली सरकारी विभागों में नागरिकों की जानकारी को व्यवस्थित और सुरक्षित रखने में सहायक होती है। ईमेल और वीडियो कॉन्फ्रेंसिंग ने दूर-दराज के कार्यालयों के बीच संचार को तत्काल और सस्ता बना दिया है। क्लाउड कंप्यूटिंग के उपयोग से डेटा का सुरक्षित भंडारण और कहीं से भी पहुंच संभव हो गई है। साइबर सुरक्षा के नियमों का पालन करना आज के डिजिटल युग में हर सरकारी और निजी कर्मचारी की जिम्मेदारी है। हरियाणा सरकार के विभिन्न पोर्टल जैसे सरल हरियाणा नागरिकों को सरकारी सेवाएं ऑनलाइन प्रदान करते हैं। ई-ऑफिस प्रणाली ने फाइलों के भौतिक आवागमन की जगह डिजिटल प्रक्रिया अपनाकर कार्यालयी कार्यों में पारदर्शिता और गति लाई है। सूचना का अधिकार अधिनियम नागरिकों को सरकारी जानकारी प्राप्त करने का कानूनी अधिकार देता है। गुरुग्राम और फरीदाबाद में स्थित आईटी कंपनियां उच्च कुशल कंप्यूटर पेशेवरों को रोजगार प्रदान कर रही हैं। डिजिटल साक्षरता कार्यक्रम ग्रामीण क्षेत्रों में कंप्यूटर कौशल का प्रसार कर रहे हैं।",
    "हरियाणा का इतिहास अत्यंत समृद्ध और गौरवशाली रहा है। कुरुक्षेत्र की धरती पर महाभारत का महासंग्राम हुआ था जो भारतीय संस्कृति और दर्शन का आधारभूत ग्रंथ माना जाता है। पानीपत की तीन ऐतिहासिक लड़ाइयों ने भारत का राजनीतिक इतिहास बदला। थानेसर और हांसी जैसे प्राचीन नगर हर्षवर्धन काल की स्मृतियां समेटे हैं। रोहतक, हिसार और सिरसा में पुरातत्व खुदाई में हड़प्पाकालीन सभ्यता के अवशेष मिले हैं। अंग्रेजी शासन काल में हरियाणा के स्वतंत्रता सेनानियों ने ब्रिटिश साम्राज्य के विरुद्ध संघर्ष में अहम भूमिका निभाई। उन्नीस सौ छह की दयालपुर क्रांति और अन्य जन आंदोलनों में हरियाणा के किसानों और जवानों ने बढ़चढ़कर भाग लिया। स्वतंत्रता के बाद एक नवंबर उन्नीस सौ छियासठ को हरियाणा को पंजाब से अलग राज्य का दर्जा मिला। चंडीगढ़ हरियाणा और पंजाब दोनों राज्यों की राजधानी है। सूरजकुंड महोत्सव, पिंजौर गार्डन और कुरुक्षेत्र का ब्रह्मसरोवर राज्य के प्रमुख सांस्कृतिक और धार्मिक केंद्र हैं। हरियाणवी लोक संस्कृति, रागिनी और सांग की परंपरा राज्य की विशिष्ट पहचान है।",
    "बैंकिंग और वित्तीय सेवाओं तक पहुंच आर्थिक विकास और गरीबी उन्मूलन के लिए अनिवार्य है। प्रधानमंत्री जन धन योजना के अंतर्गत देश में शून्य शेष राशि पर बैंक खाते खोले गए जिससे करोड़ों लोग पहली बार बैंकिंग सेवाओं से जुड़े। यूनिफाइड पेमेंट्स इंटरफेस ने मोबाइल फोन के माध्यम से त्वरित और निशुल्क भुगतान की सुविधा देकर डिजिटल लेनदेन को जन-जन तक पहुंचाया। हरियाणा में ग्रामीण और अर्ध-शहरी क्षेत्रों में बैंकिंग सेवाओं का विस्तार बिजनेस करस्पोंडेंट मॉडल के माध्यम से किया जा रहा है। नाबार्ड ग्रामीण वित्तीय संस्थाओं को पुनर्वित्त और विकास सहायता प्रदान करता है। किसान क्रेडिट कार्ड कृषि ऋण की सरल और त्वरित उपलब्धता सुनिश्चित करता है। हरियाणा के जिला सहकारी बैंक किसानों को सस्ती दर पर ऋण प्रदान करने में महत्वपूर्ण भूमिका निभाते हैं। आरबीआई की वित्तीय समावेशन नीति के तहत बैंकिंग सेवाओं से वंचित क्षेत्रों में नई शाखाएं खोली जा रही हैं। डिजिटल भुगतान को प्रोत्साहित करने के लिए सरकार ने कैशबैक और रिवॉर्ड कार्यक्रम लागू किए हैं। उपभोक्ता वित्त साक्षरता अभियान लोगों को बचत, निवेश और ऋण प्रबंधन के बारे में शिक्षित करता है।",
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

import type { ParagraphItem } from "@/components/ParagraphSelector";
import { ALLOWED_EXAMS } from "@/data/exams";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { memo, useCallback, useEffect, useRef, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
type MainTab = "live-test" | "mock-test" | "practice" | "typing-exam";
type TestState = "idle" | "running" | "paused" | "finished";

interface ExamTile {
  id: string;
  name: string;
  icon: string;
  wpm: number;
  accuracy: number;
}

// ─── Exam List ─────────────────────────────────────────────────────────────────
const EXAM_TILES: ExamTile[] = [
  { id: "all", name: "All Exam", icon: "📋", wpm: 30, accuracy: 85 },
  {
    id: "delhi-police-hcm",
    name: "Delhi Police HCM",
    icon: "👮",
    wpm: 35,
    accuracy: 85,
  },
  { id: "dsssb", name: "DSSSB", icon: "🏛️", wpm: 35, accuracy: 85 },
  { id: "ssc-cgl", name: "SSC CGL", icon: "📊", wpm: 40, accuracy: 90 },
  { id: "ssc-chsl", name: "SSC CHSL", icon: "📝", wpm: 35, accuracy: 90 },
  { id: "ssc-mts", name: "SSC MTS", icon: "🔧", wpm: 27, accuracy: 85 },
  {
    id: "railway-ntpc",
    name: "Railway NTPC",
    icon: "🚆",
    wpm: 30,
    accuracy: 85,
  },
  { id: "banking", name: "Banking", icon: "🏦", wpm: 40, accuracy: 90 },
  { id: "state-level", name: "State Level", icon: "🏢", wpm: 25, accuracy: 80 },
  { id: "harton", name: "Harton", icon: "💻", wpm: 25, accuracy: 85 },
  { id: "deo", name: "DEO", icon: "⌨️", wpm: 40, accuracy: 95 },
  { id: "pcs", name: "PCS", icon: "🎯", wpm: 30, accuracy: 85 },
  { id: "teaching", name: "Teaching", icon: "👨‍🏫", wpm: 25, accuracy: 80 },
  { id: "clerk", name: "Clerk", icon: "📁", wpm: 30, accuracy: 85 },
];

// ─── Paragraphs ────────────────────────────────────────────────────────────────
const PARAGRAPHS: ParagraphItem[] = [
  {
    id: "p1",
    title: "E-Governance and Digital Transformation",
    language: "English",
    category: "Government",
    text: "The concept of e-Governance has transitioned from being a mere luxury to an absolute necessity in the modern administrative landscape of Haryana. The Haryana State Electronics Development Corporation Limited, widely recognized as HARTRON, has been at the forefront of this digital revolution, acting as a catalyst for change across various government tiers. The primary objective behind these massive digital shifts is to ensure that the benefits of governance reach the last person in the queue, often referred to as Antyodaya. By integrating Information Technology into core administrative functions, the state has managed to reduce red-tapism, enhance transparency, and eliminate the middleman culture that previously plagued public service delivery. One of the most significant milestones in this journey has been the implementation of the Parivar Pehchan Patra, an ambitious project that creates a comprehensive database of families residing in the state. This system allows the government to proactively deliver services and social security benefits to eligible citizens without them having to run from pillar to post. Furthermore, the digitalization of land records and the introduction of online registration systems have brought about a sense of security and ease for the common man. The role of data entry operators in this ecosystem is foundational; they are the gatekeepers of information accuracy. A single error in data entry can lead to significant discrepancies in official records, which underscores the importance of high speed coupled with near-perfect accuracy. As we move towards an era dominated by Artificial Intelligence and Big Data, the importance of robust IT infrastructure becomes even more critical. HARTRON continues to provide technical consultancy and support to various departments, ensuring that the hardware and software systems are up to international standards. The corporation also focuses on human resource restructuring to keep pace with the rapidly evolving tech landscape. In conclusion, the digital transformation of Haryana is a continuous journey that requires the collaborative efforts of technical experts, administrative officers, and the citizens themselves. By leveraging the power of the internet and web-enabled services, the state is building a future where governance is not just efficient but also empathetic and accessible to all.",
  },
  {
    id: "p2",
    title: "Evolution of IT and Infrastructure",
    language: "English",
    category: "Technology",
    text: "Information Technology has fundamentally altered the structural fabric of global economies over the last three decades, and India has emerged as a powerhouse in this domain. Within the Indian context, the state of Haryana has carved out a niche for itself as a preferred destination for IT and IT-enabled services. The development of Software Technology Parks and special economic zones in cities like Gurugram and Panchkula has attracted global giants, leading to massive job creation and infrastructural development. However, the growth of the IT sector is not limited to urban centers alone. The government's vision of a Digital India extends to the rural heartlands through initiatives like BharatNet, which aims to provide high-speed broadband connectivity to every Gram Panchayat. This rural connectivity is expected to unlock the untapped potential of rural youth, providing them with access to global education, remote work opportunities, and e-commerce platforms. The technical infrastructure required to support such a massive network is complex, involving a mix of optical fiber cables, satellite communication, and advanced networking protocols. HARTRON plays a vital role in managing the State Data Centers, which act as the central nervous system for all digital initiatives. These data centers must be equipped with state-of-the-art security measures to protect sensitive citizen data from cyber threats, which have become increasingly sophisticated. Cyber security is no longer just a technical issue; it is a matter of national security and public trust. Therefore, regular quality audits and security drills are conducted to ensure that the systems are resilient against attacks. The synergy between the government, the private sector, and academic institutions is essential for creating an ecosystem that fosters innovation and entrepreneurship. As we look towards the future, technologies like 5G, the Internet of Things, and Cloud Computing are set to redefine the boundaries of what is possible.",
  },
  {
    id: "p3",
    title: "Technical Skills and Typing Proficiency",
    language: "English",
    category: "Skills",
    text: "In the professional world of computer-based administration, technical proficiency is often measured by the ability to handle data with precision and speed. For a Data Entry Operator or a Computer Professional, typing is not just about hitting keys; it is a sophisticated cognitive-motor skill that requires immense practice and focus. In competitive exams like those conducted by HARTRON, SSC, and Railway departments, the typing test serves as a critical filter to identify candidates who can perform under pressure. A speed of thirty to forty words per minute is often the baseline, but to truly excel, one must aim for much higher benchmarks, sometimes reaching up to eighty or one hundred words per minute. Accuracy is equally, if not more, important than speed. A high-speed typist who makes frequent errors is less valuable than a slightly slower typist who delivers clean, error-free text. This is because the cost of correcting errors in a professional environment is high, both in terms of time and resources. Developing high-speed typing skills involves understanding the layout of the keyboard through touch typing, where the typist uses all ten fingers without looking at the keys. This method relies on muscle memory, which is built over thousands of hours of repetitive practice. Furthermore, a professional typist must be comfortable with special characters, numbers, and complex formatting, as real-world data is rarely limited to simple prose. Apart from typing, a computer professional must also have a deep understanding of office productivity tools, database management, and basic troubleshooting. Continuous learning is the only way to stay relevant in the IT industry, as software versions and hardware specifications change almost every year. Whether it is preparing a professional resume or developing a custom typing software, the underlying principle remains the same: a blend of technical knowledge and practical skill.",
  },
  {
    id: "p4",
    title: "Indian Constitution and Democracy",
    language: "English",
    category: "Civics",
    text: "The Constitution of India is the supreme law of the land and forms the foundation of Indian democracy. Adopted by the Constituent Assembly on the twenty-sixth of November nineteen forty-nine, it came into effect on the twenty-sixth of January nineteen fifty. The Constitution guarantees fundamental rights to every citizen including the right to equality, right to freedom, right against exploitation, right to freedom of religion, cultural and educational rights, and right to constitutional remedies. The Directive Principles of State Policy provide guidelines for governance to ensure social and economic justice. India follows a parliamentary system of government with the President as the constitutional head of state. The Parliament consists of two houses - the Lok Sabha or House of the People and the Rajya Sabha or Council of States. The Prime Minister is the head of the government and leads the Council of Ministers. The Supreme Court of India is the highest judicial authority and guardian of the Constitution. The federal structure distributes powers between the Union and the States ensuring balanced governance. The Election Commission of India is an autonomous constitutional body responsible for conducting free and fair elections across the country. Universal adult franchise gives every citizen above the age of eighteen the right to vote regardless of caste, religion, gender, or economic status. The Constitution has been amended more than one hundred times to address the changing needs of society and governance.",
  },
  {
    id: "p5",
    title: "Haryana Agriculture and Economy",
    language: "English",
    category: "Agriculture",
    text: "Haryana is one of the most agriculturally prosperous states in India despite being a relatively young state carved out of Punjab in nineteen sixty-six. The state produces substantial quantities of wheat and rice which contribute significantly to the national food grain pool managed by the Food Corporation of India. The fertile plains of Haryana are irrigated by an extensive network of canals drawing water from the Yamuna river. Cities like Karnal, Rohtak, Hisar, and Kurukshetra are major agricultural centers with thriving grain markets called mandis. The state government has launched several schemes to support farmers including the Meri Fasal Mera Byora portal for crop registration. Modern techniques including laser land leveling, drip irrigation, and soil health cards have improved agricultural productivity significantly. Haryana is also a leading producer of milk and dairy products with numerous cooperative societies operating across districts. The industrial sector centered around Gurugram and Faridabad has made Haryana one of the wealthiest states in India by per capita income. The automobile industry, textile manufacturing, and IT services are important contributors to the state economy. The government is actively promoting agro-processing industries and cold chain infrastructure to reduce post-harvest losses and increase farmer incomes. Rural development programs under schemes like MGNREGA provide employment to agricultural laborers during lean seasons ensuring year-round income security.",
  },
  {
    id: "p6",
    title: "Banking and Financial Services",
    language: "English",
    category: "Banking",
    text: "The Indian banking system has undergone a profound transformation over the past decade driven by technological innovation and regulatory reforms. The Reserve Bank of India headquartered in Mumbai serves as the central banking authority responsible for monetary policy, currency issuance, and financial stability. Public sector banks led by the State Bank of India have extensive branch networks serving citizens in every corner of the country from bustling metropolitan centers to remote rural villages. The Jan Dhan Yojana launched by the government has successfully brought hundreds of millions of previously unbanked citizens into the formal financial ecosystem. Digital payment systems including UPI, NEFT, RTGS, and IMPS have revolutionized how people conduct financial transactions making cashless payments seamless and instant. IBPS or the Institute of Banking Personnel Selection conducts common recruitment examinations for clerical and officer positions in public sector banks. Banking aspirants must prepare thoroughly for quantitative aptitude, reasoning ability, English language, and computer knowledge sections. Current awareness about economic policies, budget provisions, and regulatory changes is essential for bank examination candidates. The banking sector employs millions of trained professionals across diverse roles including tellers, loan officers, investment advisors, and risk managers. Haryana has a dense network of bank branches serving the agricultural, industrial, and service sectors across all districts.",
  },
  {
    id: "p7",
    title: "Indian Railways - A National Lifeline",
    language: "English",
    category: "Railway",
    text: "Indian Railways is not merely a transportation system; it is the lifeline of the nation connecting hundreds of millions of people across the vast geography of India. Established in eighteen fifty-three with the first train running between Mumbai and Thane, the railway network has grown into one of the largest and busiest rail systems in the entire world. The network now spans over sixty-seven thousand route kilometers with more than seven thousand stations handling millions of passengers and massive freight volumes every single day. The Railway Recruitment Board conducts examinations for various posts including Non-Technical Popular Categories offering employment to hundreds of thousands of candidates annually. Haryana enjoys excellent rail connectivity with important railway junctions at Ambala, Rohtak, Hisar, Karnal, Panipat, and Kurukshetra serving millions of commuters and travelers. The introduction of the Vande Bharat Express has set new benchmarks in speed, comfort, and technology for Indian rail passengers. The dedicated freight corridor project is transforming cargo transportation by separating freight trains from passenger trains on separate high-speed tracks. Station redevelopment under the UDAN and Smart Cities programs is modernizing railway infrastructure across the country. Modern signaling systems, automated ticketing, and real-time tracking applications have significantly improved the passenger experience. Railway employees including station masters, ticket collectors, loco pilots, and maintenance staff play vital roles in ensuring safe and efficient operations.",
  },
  {
    id: "p8",
    title: "SSC Examinations and Career Opportunities",
    language: "English",
    category: "SSC",
    text: "The Staff Selection Commission is one of the most important recruitment bodies of the Government of India conducting examinations for thousands of posts in various central government departments every year. The Commission conducts examinations like the Combined Graduate Level for group B and C posts, Combined Higher Secondary Level for twelfth pass candidates, Multi-Tasking Staff for matriculates, and Stenographer examinations for skilled typists. SSC examinations attract millions of aspirants from across the country who dream of securing stable and prestigious central government employment. The selection process typically involves written examinations testing quantitative aptitude, reasoning, general awareness, and English language skills. Qualifying candidates are then called for skill tests including typing proficiency examinations for relevant posts. The required typing speed varies from twenty-seven words per minute for MTS to thirty-five for CHSL and forty for CGL positions. Accuracy requirements typically range from eighty-five to ninety-five percent depending on the specific post and examination. Candidates from all states including Haryana, Punjab, Uttar Pradesh, Rajasthan, and Bihar compete fiercely for limited government positions. Chandigarh, Delhi, and other major cities have numerous coaching institutes preparing candidates for SSC and other competitive examinations. Regular and disciplined practice of typing on government-style passages is essential for clearing the typing skill test component.",
  },
  {
    id: "p9",
    title: "हिंदी टंकण और सरकारी सेवाएं",
    language: "Hindi",
    category: "Hindi",
    text: "हिंदी भारत की राजभाषा है और सरकारी कार्यालयों में इसका व्यापक उपयोग किया जाता है। केंद्र सरकार के कार्यालयों में हिंदी टंकण के लिए मंगल फॉन्ट का उपयोग मानक के रूप में किया जाता है। हरियाणा कर्मचारी चयन आयोग हिंदी और अंग्रेजी दोनों भाषाओं में टंकण परीक्षाएं आयोजित करता है। हिंदी टंकण में न्यूनतम गति पच्चीस शब्द प्रति मिनट और शुद्धता पचासी प्रतिशत निर्धारित है। रोहतक, हिसार, करनाल, गुरुग्राम, फरीदाबाद और कुरुक्षेत्र में सरकारी प्रशिक्षण केंद्र स्थापित हैं। हरियाणा की राजधानी चंडीगढ़ में उच्च न्यायालय, विधान सभा और राज्यपाल भवन स्थित हैं। राज्य की अर्थव्यवस्था में कृषि, उद्योग और सेवा क्षेत्र का समान रूप से महत्वपूर्ण योगदान है। यमुना नदी राज्य की पूर्वी सीमा बनाती है और लाखों किसानों को सिंचाई के लिए जल प्रदान करती है। हरियाणा के युवा सेना, पुलिस और प्रशासनिक सेवाओं में देश भर में अपनी पहचान बना रहे हैं। डिजिटल इंडिया अभियान ने सरकारी सेवाओं को ऑनलाइन उपलब्ध कराकर नागरिकों के जीवन को सरल बना दिया है।",
  },
  {
    id: "p10",
    title: "Computer Knowledge for Government Exams",
    language: "English",
    category: "Computer",
    text: "Computer knowledge has become an indispensable requirement for candidates seeking government employment in the modern digital age. Basic computer skills including operating systems, word processing, spreadsheets, internet navigation, and email communication are tested in most government recruitment examinations. Microsoft Office applications including Word, Excel, and PowerPoint are the most commonly used tools in government offices for creating documents, managing data, and preparing presentations. Database management systems help government departments maintain records of citizens, employees, assets, and transactions efficiently. Networking concepts including local area networks, wide area networks, internet protocols, and cybersecurity fundamentals are important topics for government IT examinations. The operating system manages all hardware and software resources of a computer enabling users to run applications and store files. Input devices like keyboard, mouse, and scanner allow users to enter data while output devices like monitor and printer display or produce results. The central processing unit or CPU is the brain of the computer that executes instructions and performs calculations. Random access memory provides temporary storage for running programs while hard disk drives store data permanently. Internet and email have transformed government communication enabling rapid exchange of information across departments and with citizens. Cloud computing allows government agencies to store and access data and applications over the internet reducing infrastructure costs. Cybersecurity practices including strong passwords, regular updates, firewalls, and antivirus software protect government systems from unauthorized access.",
  },
];

// ─── Passage Display Component ────────────────────────────────────────────────
const PassageDisplay = memo(function PassageDisplay({
  passage,
  typed,
  fontSize,
}: {
  passage: string;
  typed: string;
  fontSize: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const currentRef = useRef<HTMLSpanElement>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: typed.length triggers scroll
  useEffect(() => {
    if (currentRef.current && containerRef.current) {
      const container = containerRef.current;
      const el = currentRef.current;
      const elTop = el.offsetTop - container.offsetTop;
      const elBottom = elTop + el.offsetHeight;
      const scrollBottom = container.scrollTop + container.clientHeight;
      if (elBottom > scrollBottom - 20) {
        container.scrollTop = elTop - container.clientHeight / 2;
      } else if (elTop < container.scrollTop + 10) {
        container.scrollTop = elTop - 10;
      }
    }
  }, [typed.length]);

  const chars = Array.from(passage).map((ch, pos) => ({
    ch,
    key: `char-${pos}`,
    pos,
  }));

  return (
    <div
      ref={containerRef}
      style={{
        height: 280,
        overflowY: "auto",
        background: "#fff",
        border: "1.5px solid #c7d2e8",
        borderRadius: 4,
        padding: "12px 16px",
        fontFamily: "'Consolas', 'Courier New', monospace",
        fontSize,
        lineHeight: 2,
        letterSpacing: "0.01em",
        color: "#111",
      }}
    >
      {chars.map(({ ch, key, pos }) => {
        let color = "#333";
        let bg = "transparent";
        let fontWeight: "normal" | "bold" = "normal";
        if (pos < typed.length) {
          color = typed[pos] === ch ? "#15803d" : "#dc2626";
          if (typed[pos] !== ch) bg = "#fee2e2";
        } else if (pos === typed.length) {
          color = "#1d4ed8";
          fontWeight = "bold";
          bg = "#dbeafe";
        }
        return (
          <span
            key={key}
            ref={pos === typed.length ? currentRef : undefined}
            style={{ color, background: bg, fontWeight }}
          >
            {ch}
          </span>
        );
      })}
    </div>
  );
});

// ─── Typing Test Panel ────────────────────────────────────────────────────────
function TypingTestPanel({
  tabLabel,
  examName,
  wpm: requiredWpm,
  minAccuracy,
}: {
  tabLabel: string;
  examName: string;
  wpm: number;
  minAccuracy: number;
}) {
  const [paragraphIndex, setParagraphIndex] = useState(0);
  const [showParaList, setShowParaList] = useState(false);
  const [typed, setTyped] = useState("");
  const [testState, setTestState] = useState<TestState>("idle");
  const [timeLeft, setTimeLeft] = useState(600); // 10 min
  const [durationMin, setDurationMin] = useState(10);

  const [backspaceOn, setBackspaceOn] = useState(true);
  const [language, setLanguage] = useState("English");
  const [fontSize, setFontSize] = useState(18);
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [group, setGroup] = useState(1);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const filteredParas = PARAGRAPHS.filter((p) =>
    language === "Hindi" ? p.language === "Hindi" : p.language === "English",
  );
  const currentPara = filteredParas[paragraphIndex % filteredParas.length];
  const passage = currentPara?.text ?? "";

  // Timer
  useEffect(() => {
    if (testState === "running") {
      timerRef.current = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) {
            clearInterval(timerRef.current!);
            setTestState("finished");
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [testState]);

  const elapsed = durationMin * 60 - timeLeft;
  const elapsedMin = elapsed / 60;

  const correctChars = Array.from(typed).filter(
    (ch, i) => ch === passage[i],
  ).length;
  const liveWpm =
    elapsedMin > 0 ? Math.round(correctChars / 5 / elapsedMin) : 0;
  const accuracy =
    typed.length > 0 ? Math.round((correctChars / typed.length) * 100) : 100;

  const startTest = useCallback(() => {
    setTyped("");
    setTimeLeft(durationMin * 60);
    setTestState("running");
    setTimeout(() => textareaRef.current?.focus(), 50);
  }, [durationMin]);

  const resetTest = useCallback(() => {
    setTyped("");
    setTimeLeft(durationMin * 60);
    setTestState("idle");
  }, [durationMin]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (!backspaceOn && e.key === "Backspace") {
        e.preventDefault();
      }
    },
    [backspaceOn],
  );

  const handleTyping = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const val = e.target.value;
      if (testState === "idle") {
        setTimeLeft(durationMin * 60);
        setTestState("running");
      }
      if (testState === "finished") return;
      if (val.length <= passage.length) {
        setTyped(val);
        if (val.length === passage.length) {
          setTestState("finished");
        }
      }
    },
    [testState, durationMin, passage.length],
  );

  const handleDurationChange = (min: number) => {
    setDurationMin(min);
    setTimeLeft(min * 60);
    resetTest();
  };

  const handleParaChange = (idx: number) => {
    setParagraphIndex(idx);
    setShowParaList(false);
    resetTest();
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // Results
  const resultWords = passage.split(" ");
  const typedWords = typed.split(" ");
  const correctWords = resultWords.filter((w, i) => w === typedWords[i]).length;
  const wrongWords = resultWords
    .map((w, i) => ({ expected: w, typed: typedWords[i] ?? "" }))
    .filter((x) => x.expected !== x.typed);

  const passed = liveWpm >= requiredWpm && accuracy >= minAccuracy;

  // ── Styles (inline for TCS ION aesthetic) ────────────────────────────────────
  const s = {
    examBar: {
      background: "#1e3a5f",
      color: "#e8eef8",
      padding: "6px 14px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      fontSize: 13,
      fontWeight: 600,
    } as React.CSSProperties,
    groupRow: {
      background: "#f0f4fb",
      borderBottom: "1px solid #c7d2e8",
      padding: "5px 14px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    } as React.CSSProperties,
    groupBtn: (active: boolean): React.CSSProperties => ({
      padding: "3px 14px",
      borderRadius: 3,
      border: "1px solid #a0aec0",
      background: active ? "#1d4ed8" : "#fff",
      color: active ? "#fff" : "#374151",
      fontWeight: 600,
      cursor: "pointer",
      fontSize: 12,
      marginRight: 4,
    }),
    infoBar: {
      background: "#ede9fe",
      color: "#3730a3",
      padding: "5px 14px",
      fontSize: 12,
      fontWeight: 500,
      borderBottom: "1px solid #c4b5fd",
    } as React.CSSProperties,
    content: {
      display: "flex",
      gap: 0,
      flex: 1,
      overflow: "hidden",
    } as React.CSSProperties,
    leftPanel: {
      flex: "0 0 75%",
      borderRight: "1px solid #c7d2e8",
      padding: "12px 14px",
      overflowY: "auto" as const,
      background: "#f9fafb",
    } as React.CSSProperties,
    rightPanel: {
      flex: "0 0 25%",
      padding: "10px",
      background: "#fff",
      overflowY: "auto" as const,
    } as React.CSSProperties,
    ctrlBar: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      flexWrap: "wrap" as const,
      padding: "8px 0",
      borderTop: "1px solid #e2e8f0",
      borderBottom: "1px solid #e2e8f0",
      margin: "8px 0",
    } as React.CSSProperties,
    pill: {
      background: "#e0e7ef",
      color: "#1e3a5f",
      padding: "3px 10px",
      borderRadius: 99,
      fontSize: 12,
      fontWeight: 600,
    } as React.CSSProperties,
    select: {
      border: "1px solid #a0aec0",
      borderRadius: 4,
      padding: "3px 6px",
      fontSize: 12,
      background: "#fff",
      color: "#374151",
      cursor: "pointer",
    } as React.CSSProperties,
    blueBtn: {
      background: "#1d4ed8",
      color: "#fff",
      border: "none",
      borderRadius: 4,
      padding: "4px 12px",
      fontSize: 12,
      fontWeight: 600,
      cursor: "pointer",
    } as React.CSSProperties,
    grayBtn: {
      background: "#e5e7eb",
      color: "#374151",
      border: "none",
      borderRadius: 4,
      padding: "4px 10px",
      fontSize: 12,
      fontWeight: 600,
      cursor: "pointer",
    } as React.CSSProperties,
    toggle: (on: boolean): React.CSSProperties => ({
      background: on ? "#16a34a" : "#dc2626",
      color: "#fff",
      border: "none",
      borderRadius: 4,
      padding: "3px 10px",
      fontSize: 11,
      fontWeight: 700,
      cursor: "pointer",
    }),
    profileCard: {
      border: "1px solid #c7d2e8",
      borderRadius: 6,
      overflow: "hidden",
    } as React.CSSProperties,
    profileHeader: {
      background: "#1e3a5f",
      color: "#fff",
      padding: "7px 10px",
      fontWeight: 700,
      fontSize: 11,
      letterSpacing: "0.04em",
    } as React.CSSProperties,
    profileBody: {
      padding: "10px",
    } as React.CSSProperties,
    statRow: {
      display: "flex",
      justifyContent: "space-between",
      padding: "4px 0",
      borderBottom: "1px solid #f0f4fb",
      fontSize: 12,
    } as React.CSSProperties,
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Exam name bar */}
      <div style={s.examBar}>
        <span>{tabLabel === "Mock Test" ? "🎯 Mock Exam Mode" : examName}</span>
        <button
          type="button"
          style={{
            background: "none",
            border: "none",
            color: "#93c5fd",
            cursor: "pointer",
            fontSize: 12,
          }}
        >
          Instructions ℹ
        </button>
      </div>

      {/* Group tabs + timer */}
      <div style={s.groupRow}>
        <div>
          {[1, 2, 3].map((g) => (
            <button
              key={g}
              type="button"
              style={s.groupBtn(group === g)}
              onClick={() => {
                setGroup(g);
                resetTest();
              }}
            >
              Group {g}
            </button>
          ))}
        </div>
        <span
          style={{
            fontWeight: 700,
            fontSize: 14,
            color: timeLeft < 60 ? "#dc2626" : "#1e3a5f",
            fontFamily: "monospace",
          }}
        >
          ⏱ Time Left: {formatTime(timeLeft)}
        </span>
      </div>

      {/* Info bar */}
      <div style={s.infoBar}>
        Keyboard Layout: Inscript &nbsp;|&nbsp; Language: {language}{" "}
        &nbsp;|&nbsp; Exercise: {paragraphIndex + 1}/{filteredParas.length}{" "}
        &nbsp;|&nbsp; Tab: {tabLabel}
      </div>

      {/* Main content */}
      <div style={s.content}>
        {/* Left panel */}
        <div style={s.leftPanel}>
          {testState === "finished" ? (
            // Results screen
            <div
              style={{
                background: "#fff",
                border: "1.5px solid #c7d2e8",
                borderRadius: 6,
                padding: 16,
              }}
            >
              <div style={{ textAlign: "center", marginBottom: 14 }}>
                <div
                  style={{
                    fontSize: 28,
                    fontWeight: 800,
                    color: passed ? "#15803d" : "#dc2626",
                    marginBottom: 4,
                  }}
                >
                  {passed ? "✅ PASSED" : "❌ NOT PASSED"}
                </div>
                <div style={{ fontSize: 13, color: "#6b7280" }}>
                  {examName} — {tabLabel}
                </div>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: 10,
                  marginBottom: 14,
                }}
              >
                {[
                  {
                    label: "WPM Achieved",
                    val: liveWpm,
                    req: requiredWpm,
                    unit: "wpm",
                  },
                  {
                    label: "Accuracy",
                    val: accuracy,
                    req: minAccuracy,
                    unit: "%",
                  },
                  {
                    label: "Correct Words",
                    val: correctWords,
                    req: null,
                    unit: "",
                  },
                ].map((s2) => (
                  <div
                    key={s2.label}
                    style={{
                      background: "#f0f4fb",
                      borderRadius: 6,
                      padding: "10px 12px",
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 22,
                        fontWeight: 800,
                        color: "#1d4ed8",
                      }}
                    >
                      {s2.val}
                      {s2.unit}
                    </div>
                    <div
                      style={{ fontSize: 11, color: "#6b7280", marginTop: 2 }}
                    >
                      {s2.label}
                    </div>
                    {s2.req && (
                      <div style={{ fontSize: 10, color: "#9ca3af" }}>
                        Required: {s2.req}
                        {s2.unit}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {wrongWords.length > 0 && (
                <div style={{ marginBottom: 12 }}>
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: 13,
                      color: "#374151",
                      marginBottom: 6,
                    }}
                  >
                    Wrong Words:
                  </div>
                  <div
                    style={{
                      maxHeight: 120,
                      overflowY: "auto",
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 6,
                    }}
                  >
                    {wrongWords.slice(0, 30).map((w) => (
                      <span
                        key={`${w.expected}-${w.typed}`}
                        style={{
                          background: "#fee2e2",
                          border: "1px solid #fca5a5",
                          borderRadius: 4,
                          padding: "2px 7px",
                          fontSize: 11,
                          color: "#991b1b",
                        }}
                      >
                        {w.typed || "(blank)"} → <b>{w.expected}</b>
                      </span>
                    ))}
                  </div>
                </div>
              )}
              <button
                type="button"
                style={{ ...s.blueBtn, padding: "8px 20px", fontSize: 13 }}
                onClick={resetTest}
                data-ocid="exam.retry.button"
              >
                🔄 Retry Test
              </button>
            </div>
          ) : (
            <>
              {/* Passage */}
              <div
                style={{
                  fontSize: 12,
                  color: "#6b7280",
                  marginBottom: 4,
                  fontWeight: 500,
                }}
              >
                {currentPara?.title} — {currentPara?.category}
              </div>
              <PassageDisplay
                passage={passage}
                typed={typed}
                fontSize={fontSize}
              />

              {/* Controls bar */}
              <div style={s.ctrlBar}>
                <span
                  style={{ fontSize: 11, color: "#6b7280", fontWeight: 600 }}
                >
                  Duration:
                </span>
                <select
                  style={s.select}
                  value={durationMin}
                  onChange={(e) => handleDurationChange(Number(e.target.value))}
                  data-ocid="exam.duration.select"
                >
                  {[5, 10, 15, 20, 30].map((m) => (
                    <option key={m} value={m}>
                      {m} Minutes
                    </option>
                  ))}
                </select>

                <button
                  type="button"
                  style={s.blueBtn}
                  onClick={() => setShowParaList((v) => !v)}
                  data-ocid="exam.select_para.button"
                >
                  📄 Select Para
                </button>
                <span style={s.pill}>
                  Para {paragraphIndex + 1}/{filteredParas.length}
                </span>

                <button
                  type="button"
                  style={s.toggle(backspaceOn)}
                  onClick={() => setBackspaceOn((v) => !v)}
                  data-ocid="exam.backspace.toggle"
                >
                  ⌫ Backspace {backspaceOn ? "ON" : "OFF"}
                </button>

                <select
                  style={s.select}
                  value={language}
                  onChange={(e) => {
                    setLanguage(e.target.value);
                    resetTest();
                  }}
                  data-ocid="exam.language.select"
                >
                  <option>English</option>
                  <option>Hindi</option>
                </select>

                <div
                  style={{
                    marginLeft: "auto",
                    display: "flex",
                    gap: 4,
                    alignItems: "center",
                  }}
                >
                  <span style={{ fontSize: 11, color: "#6b7280" }}>A</span>
                  {[14, 16, 18, 20].map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      style={{
                        ...s.grayBtn,
                        background: fontSize === sz ? "#1d4ed8" : "#e5e7eb",
                        color: fontSize === sz ? "#fff" : "#374151",
                        padding: "2px 7px",
                        fontSize: sz - 4,
                      }}
                      onClick={() => setFontSize(sz)}
                    >
                      A
                    </button>
                  ))}
                </div>
              </div>

              {/* Para list modal */}
              {showParaList && (
                <div
                  style={{
                    border: "1px solid #c7d2e8",
                    borderRadius: 6,
                    background: "#fff",
                    maxHeight: 200,
                    overflowY: "auto",
                    marginBottom: 8,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
                  }}
                  data-ocid="exam.para_list.panel"
                >
                  {filteredParas.map((p, idx) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => handleParaChange(idx)}
                      style={{
                        width: "100%",
                        textAlign: "left",
                        padding: "7px 12px",
                        cursor: "pointer",
                        background:
                          idx === paragraphIndex ? "#dbeafe" : "transparent",
                        borderBottom: "1px solid #f0f4fb",
                        border: "none",
                        fontSize: 12,
                        color: "#1e3a5f",
                        fontWeight: idx === paragraphIndex ? 600 : 400,
                        display: "block",
                      }}
                    >
                      {idx + 1}. {p.title} ({p.category})
                    </button>
                  ))}
                </div>
              )}

              {/* Start bar */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "6px 0",
                  marginBottom: 6,
                }}
              >
                <span style={{ fontSize: 11, color: "#6b7280" }}>
                  {testState === "idle"
                    ? "Click below and start typing — test begins automatically"
                    : `WPM: ${liveWpm} | Accuracy: ${accuracy}%`}
                </span>
                <div style={{ display: "flex", gap: 6 }}>
                  {testState === "idle" && (
                    <button
                      type="button"
                      style={{
                        ...s.blueBtn,
                        padding: "5px 18px",
                        fontSize: 13,
                      }}
                      onClick={startTest}
                      data-ocid="exam.start.button"
                    >
                      ▶ Start Test
                    </button>
                  )}
                  {testState === "running" && (
                    <>
                      <button
                        type="button"
                        style={s.grayBtn}
                        onClick={() => setTestState("paused")}
                        data-ocid="exam.pause.button"
                      >
                        ⏸ Pause
                      </button>
                      <button
                        type="button"
                        style={{
                          ...s.grayBtn,
                          background: "#dc2626",
                          color: "#fff",
                        }}
                        onClick={resetTest}
                        data-ocid="exam.stop.button"
                      >
                        ■ Stop
                      </button>
                    </>
                  )}
                  {testState === "paused" && (
                    <button
                      type="button"
                      style={s.blueBtn}
                      onClick={() => setTestState("running")}
                      data-ocid="exam.resume.button"
                    >
                      ▶ Resume
                    </button>
                  )}
                </div>
              </div>

              {/* Typing area */}
              <textarea
                ref={textareaRef}
                value={typed}
                onChange={handleTyping}
                onKeyDown={handleKeyDown}
                disabled={testState === "paused"}
                placeholder={
                  testState === "idle"
                    ? "Start typing here — timer starts automatically on first keystroke..."
                    : ""
                }
                data-ocid="exam.typing.input"
                style={{
                  width: "100%",
                  height: 100,
                  fontFamily: "'Consolas', 'Courier New', monospace",
                  fontSize: 18,
                  padding: "10px 12px",
                  border: `2px solid ${testState === "running" ? "#1d4ed8" : "#c7d2e8"}`,
                  borderRadius: 4,
                  background: testState === "paused" ? "#f3f4f6" : "#1e293b",
                  color: "#f8fafc",
                  resize: "none",
                  outline: "none",
                  lineHeight: 1.7,
                  boxSizing: "border-box",
                }}
              />

              {/* Exercise nav */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  gap: 8,
                  marginTop: 6,
                }}
              >
                <button
                  type="button"
                  style={s.grayBtn}
                  onClick={() => {
                    setParagraphIndex((v) => Math.max(0, v - 1));
                    resetTest();
                  }}
                  data-ocid="exam.prev_para.button"
                >
                  ◄
                </button>
                <span
                  style={{ fontSize: 12, color: "#374151", fontWeight: 600 }}
                >
                  {paragraphIndex + 1} / {filteredParas.length}
                </span>
                <button
                  type="button"
                  style={s.grayBtn}
                  onClick={() => {
                    setParagraphIndex((v) =>
                      Math.min(filteredParas.length - 1, v + 1),
                    );
                    resetTest();
                  }}
                  data-ocid="exam.next_para.button"
                >
                  ►
                </button>
              </div>
            </>
          )}
        </div>

        {/* Right panel */}
        <div style={s.rightPanel}>
          <div style={s.profileCard}>
            <div style={s.profileHeader}>CANDIDATE PROFILE &amp; LOGIN</div>
            <div style={s.profileBody}>
              {/* Avatar */}
              <div style={{ textAlign: "center", marginBottom: 10 }}>
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    background: "#e0e7ef",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 26,
                    border: "2px solid #c7d2e8",
                  }}
                >
                  👤
                </div>
              </div>
              <div style={{ marginBottom: 6 }}>
                <label
                  htmlFor="ei-user-id"
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: "#374151",
                    display: "block",
                    marginBottom: 2,
                  }}
                >
                  User ID:
                </label>
                <input
                  id="ei-user-id"
                  type="text"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  style={{
                    width: "100%",
                    border: "1px solid #a0aec0",
                    borderRadius: 3,
                    padding: "4px 7px",
                    fontSize: 12,
                    boxSizing: "border-box",
                  }}
                  placeholder="Enter User ID"
                  data-ocid="exam.user_id.input"
                />
              </div>
              <div style={{ marginBottom: 8 }}>
                <label
                  htmlFor="ei-password"
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: "#374151",
                    display: "block",
                    marginBottom: 2,
                  }}
                >
                  Password:
                </label>
                <input
                  id="ei-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: "100%",
                    border: "1px solid #a0aec0",
                    borderRadius: 3,
                    padding: "4px 7px",
                    fontSize: 12,
                    boxSizing: "border-box",
                  }}
                  placeholder="Password"
                  data-ocid="exam.password.input"
                />
              </div>
              <button
                type="button"
                style={{
                  ...s.blueBtn,
                  width: "100%",
                  padding: "7px",
                  fontSize: 13,
                  marginBottom: 4,
                }}
                data-ocid="exam.login.button"
              >
                Log in
              </button>
              <div
                style={{
                  textAlign: "center",
                  fontSize: 11,
                  color: "#3b82f6",
                  cursor: "pointer",
                  marginBottom: 10,
                }}
              >
                Forgot password?
              </div>
              <hr style={{ borderColor: "#e2e8f0", margin: "8px 0" }} />
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#374151",
                  marginBottom: 6,
                }}
              >
                EXAM REQUIREMENTS
              </div>
              <div style={s.statRow}>
                <span style={{ color: "#6b7280" }}>Required WPM</span>
                <span style={{ color: "#1d4ed8", fontWeight: 700 }}>
                  {requiredWpm}
                </span>
              </div>
              <div style={s.statRow}>
                <span style={{ color: "#6b7280" }}>Min Accuracy</span>
                <span style={{ color: "#1d4ed8", fontWeight: 700 }}>
                  {minAccuracy}%
                </span>
              </div>
              <div style={s.statRow}>
                <span style={{ color: "#6b7280" }}>Duration</span>
                <span style={{ color: "#1d4ed8", fontWeight: 700 }}>
                  {durationMin} min
                </span>
              </div>
              {testState === "running" && (
                <>
                  <hr style={{ borderColor: "#e2e8f0", margin: "8px 0" }} />
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: "#374151",
                      marginBottom: 6,
                    }}
                  >
                    LIVE STATS
                  </div>
                  <div style={s.statRow}>
                    <span style={{ color: "#6b7280" }}>Current WPM</span>
                    <span
                      style={{
                        color: liveWpm >= requiredWpm ? "#15803d" : "#dc2626",
                        fontWeight: 700,
                      }}
                    >
                      {liveWpm}
                    </span>
                  </div>
                  <div style={s.statRow}>
                    <span style={{ color: "#6b7280" }}>Accuracy</span>
                    <span
                      style={{
                        color: accuracy >= minAccuracy ? "#15803d" : "#dc2626",
                        fontWeight: 700,
                      }}
                    >
                      {accuracy}%
                    </span>
                  </div>
                  <div style={s.statRow}>
                    <span style={{ color: "#6b7280" }}>Typed</span>
                    <span style={{ color: "#1d4ed8", fontWeight: 700 }}>
                      {typed.length} / {passage.length}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Nav */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              marginTop: 10,
            }}
          >
            <button
              type="button"
              style={s.grayBtn}
              onClick={() => {
                setParagraphIndex((v) => Math.max(0, v - 1));
                resetTest();
              }}
              data-ocid="exam.sidebar_prev.button"
            >
              ◄
            </button>
            <span style={{ fontSize: 12, fontWeight: 600, color: "#374151" }}>
              {paragraphIndex + 1} / {filteredParas.length}
            </span>
            <button
              type="button"
              style={s.grayBtn}
              onClick={() => {
                setParagraphIndex((v) =>
                  Math.min(filteredParas.length - 1, v + 1),
                );
                resetTest();
              }}
              data-ocid="exam.sidebar_next.button"
            >
              ►
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Exam Selection Grid (Typing Exam tab) ────────────────────────────────────
function ExamSelectionGrid({
  onSelect,
}: {
  onSelect: (exam: ExamTile) => void;
}) {
  return (
    <div style={{ padding: 20 }}>
      <div
        style={{
          background: "#1e3a5f",
          color: "#e8eef8",
          padding: "8px 16px",
          marginBottom: 16,
          borderRadius: 4,
          fontSize: 14,
          fontWeight: 700,
        }}
      >
        🖥️ Select Your Exam — Typing Exam Mode
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: 10,
        }}
      >
        {EXAM_TILES.map((exam) => (
          <button
            key={exam.id}
            type="button"
            data-ocid={`exam.tile.${exam.id}.button`}
            onClick={() => onSelect(exam)}
            style={{
              background: "#fff",
              border: "1.5px solid #c7d2e8",
              borderRadius: 8,
              padding: "14px 8px",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 6,
              transition: "all 0.15s",
              boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "#dbeafe";
              (e.currentTarget as HTMLButtonElement).style.borderColor =
                "#1d4ed8";
              (e.currentTarget as HTMLButtonElement).style.transform =
                "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "#fff";
              (e.currentTarget as HTMLButtonElement).style.borderColor =
                "#c7d2e8";
              (e.currentTarget as HTMLButtonElement).style.transform = "none";
            }}
          >
            <span style={{ fontSize: 24 }}>{exam.icon}</span>
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: "#1e3a5f",
                textAlign: "center",
                lineHeight: 1.3,
              }}
            >
              {exam.name}
            </span>
            <span
              style={{
                fontSize: 9,
                color: "#6b7280",
                background: "#f0f4fb",
                borderRadius: 3,
                padding: "1px 5px",
              }}
            >
              {exam.wpm} WPM
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Main ExamInterface ────────────────────────────────────────────────────────
export function ExamInterface() {
  const navigate = useNavigate();
  const search = useSearch({ from: "/exam-interface" }) as { tab?: string };

  const tabFromUrl = (search.tab as MainTab) || "typing-exam";
  const [activeTab, setActiveTab] = useState<MainTab>(tabFromUrl);
  const [selectedExam, setSelectedExam] = useState<ExamTile | null>(null);

  const handleTabChange = (tab: MainTab) => {
    setActiveTab(tab);
    setSelectedExam(null);
  };

  const TABS: { id: MainTab; label: string }[] = [
    { id: "live-test", label: "⏱ Live Test" },
    { id: "mock-test", label: "📋 Mock Test" },
    { id: "practice", label: "⌨️ Typing Practice" },
    { id: "typing-exam", label: "🎓 Typing Exam" },
  ];

  const currentExam = selectedExam ?? EXAM_TILES[0];

  const tabLabel =
    TABS.find((t) => t.id === activeTab)?.label.replace(/^.\s/, "") ??
    "Live Test";

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        fontFamily: "'Inter', sans-serif",
        background: "#f0f4fb",
        overflow: "hidden",
      }}
    >
      {/* Top toolbar */}
      <div
        style={{
          background: "#374151",
          color: "#e5e7eb",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "6px 12px",
          flexShrink: 0,
          userSelect: "none",
        }}
      >
        {/* Left icons */}
        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
          <button
            type="button"
            onClick={() => navigate({ to: "/" })}
            style={{
              background: "none",
              border: "1px solid #6b7280",
              borderRadius: 3,
              color: "#e5e7eb",
              padding: "2px 8px",
              fontSize: 11,
              cursor: "pointer",
            }}
            data-ocid="exam.home.link"
          >
            🏠 Home
          </button>
          {["💾", "🖨️", "❓"].map((ico) => (
            <button
              key={ico}
              type="button"
              style={{
                background: "none",
                border: "1px solid #6b7280",
                borderRadius: 3,
                color: "#e5e7eb",
                width: 24,
                height: 24,
                fontSize: 12,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {ico}
            </button>
          ))}
        </div>

        {/* Center title */}
        <div
          style={{
            fontWeight: 700,
            fontSize: 14,
            letterSpacing: "0.02em",
            color: "#f9fafb",
          }}
        >
          Karwashra Typing Exam —{" "}
          {new Date().toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </div>

        {/* Right window controls */}
        <div style={{ display: "flex", gap: 4 }}>
          {["─", "□", "✕"].map((c) => (
            <button
              key={c}
              type="button"
              style={{
                background: "none",
                border: "1px solid #6b7280",
                borderRadius: 3,
                color: "#e5e7eb",
                width: 22,
                height: 22,
                fontSize: 11,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={c === "✕" ? () => navigate({ to: "/" }) : undefined}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Main tabs */}
      <div
        style={{
          background: "#fff",
          borderBottom: "2px solid #1d4ed8",
          display: "flex",
          flexShrink: 0,
        }}
      >
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            data-ocid={`exam.${tab.id}.tab`}
            onClick={() => handleTabChange(tab.id)}
            style={{
              padding: "9px 22px",
              fontWeight: 700,
              fontSize: 13,
              border: "none",
              borderRight: "1px solid #e2e8f0",
              background: activeTab === tab.id ? "#1d4ed8" : "#fff",
              color: activeTab === tab.id ? "#fff" : "#374151",
              cursor: "pointer",
              transition: "all 0.15s",
              letterSpacing: "0.01em",
            }}
          >
            {tab.label}
          </button>
        ))}
        <div style={{ flex: 1, background: "#f9fafb" }} />
        <div
          style={{
            padding: "9px 16px",
            fontSize: 12,
            color: "#6b7280",
            fontWeight: 500,
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#16a34a",
              display: "inline-block",
            }}
          />
          SSC Digital Examination Module
        </div>
      </div>

      {/* Content area */}
      <div
        style={{
          flex: 1,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {activeTab === "typing-exam" && !selectedExam ? (
          <div style={{ overflowY: "auto", flex: 1 }}>
            <ExamSelectionGrid
              onSelect={(exam) => {
                setSelectedExam(exam);
              }}
            />
          </div>
        ) : (
          <>
            {activeTab === "typing-exam" && selectedExam && (
              <div
                style={{
                  background: "#fef3c7",
                  borderBottom: "1px solid #fcd34d",
                  padding: "5px 16px",
                  fontSize: 12,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  flexShrink: 0,
                }}
              >
                <span style={{ color: "#92400e", fontWeight: 600 }}>
                  {currentExam.icon} {currentExam.name}
                </span>
                <button
                  type="button"
                  style={{
                    background: "none",
                    border: "none",
                    color: "#1d4ed8",
                    cursor: "pointer",
                    fontSize: 12,
                    fontWeight: 500,
                    textDecoration: "underline",
                  }}
                  onClick={() => setSelectedExam(null)}
                  data-ocid="exam.back_to_grid.button"
                >
                  ← Change Exam
                </button>
              </div>
            )}
            <div style={{ flex: 1, overflow: "hidden" }}>
              <TypingTestPanel
                tabLabel={tabLabel}
                examName={currentExam.name}
                wpm={currentExam.wpm}
                minAccuracy={currentExam.accuracy}
              />
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <div
        style={{
          background: "#1e3a5f",
          color: "#93c5fd",
          padding: "4px 14px",
          fontSize: 11,
          textAlign: "center",
          flexShrink: 0,
          letterSpacing: "0.02em",
        }}
      >
        SSC Digital Examination Module : Powered by Karwashra Typing Exam ©{" "}
        {new Date().getFullYear()} ·{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#93c5fd", textDecoration: "none" }}
        >
          Built with caffeine.ai
        </a>
      </div>
    </div>
  );
}

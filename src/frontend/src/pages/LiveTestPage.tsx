import {
  type ParagraphItem,
  ParagraphSelector,
} from "@/components/ParagraphSelector";
import {
  ALLOWED_EXAMS as EXAMS,
  type ExamData,
  generatePassageOfLength,
} from "@/data/exams";
import { useActor } from "@/hooks/useActor";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "@tanstack/react-router";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";

type TestState = "idle" | "running" | "paused" | "finished";
type ActiveTab = "select" | "test" | "results" | "settings";

const TIME_PRESETS = [5, 10, 15, 20];

const EXAM_PARAGRAPHS: Record<string, ParagraphItem[]> = {
  "ssc-chsl": [
    {
      id: "ssc-chsl-1",
      title: "SSC CHSL Passage 1",
      language: "English",
      category: "SSC",
      text: "The Government of India has always been deeply committed to the welfare and development of its citizens across every region. The Staff Selection Commission conducts examinations for recruitment to various posts in central government ministries and departments. Candidates must demonstrate proficiency in typing to qualify for clerical and data entry positions. The typing test evaluates both speed and accuracy, with net WPM calculated after deducting errors. Regular practice on government-style passages is essential for success in these competitive examinations. Chandigarh serves as the capital of both Haryana and Punjab states and hosts many important central government offices. The city is well planned with wide roads, parks, and modern infrastructure making it one of the cleanest cities in India. Rohtak, Hisar, Karnal, Gurugram, and Faridabad are major cities of Haryana that have seen remarkable rapid development in recent decades. Kurukshetra, the sacred land of the Mahabharata, holds immense cultural and historical significance for the entire nation. Ambala is a major railway junction and an important military cantonment area of national strategic importance. Panipat has witnessed three decisive battles that changed the course of Indian history and is today known as the city of weavers for its thriving textile industry. The Yamuna river flows through eastern Haryana providing water for irrigation and drinking purposes to millions of people. Haryana has achieved great success in sports producing many Olympic medal winners especially in wrestling and boxing. The state government has established numerous training academies and sports facilities to nurture young talent from rural and urban areas alike.",
    },
    {
      id: "ssc-chsl-2",
      title: "SSC CHSL Passage 2",
      language: "English",
      category: "SSC",
      text: "India is a vast and diverse country with a rich cultural heritage spanning thousands of years of continuous civilization. The Constitution of India adopted on November twenty-sixth nineteen forty-nine guarantees fundamental rights and duties to every citizen. The national flag with its three colors of saffron, white, and green represents the core values of courage, peace, and prosperity. Our Parliament located in New Delhi is the supreme legislative body that enacts laws governing every aspect of national life. The Supreme Court of India serves as the apex judicial body ensuring constitutional rights for all citizens regardless of caste or creed. The Rashtrapati Bhavan is the magnificent official residence of the President of the Republic and a landmark of Delhi. India achieved independence on August fifteen nineteen forty-seven after a prolonged freedom struggle led by Mahatma Gandhi and countless other patriots. The country has made tremendous progress in science, technology, agriculture, and industry in the decades since independence. Digital India is a government initiative that seeks to transform the nation into a digitally empowered society and knowledge economy. Good governance requires transparency, accountability, and responsiveness to citizen needs at every level of administration. Panchayati Raj institutions have empowered millions of citizens at the grassroots level across the country. The National Health Mission aims to provide affordable and quality healthcare to all citizens especially those in rural areas. Education is one of the most important pillars of national development and the government has been investing heavily in schools and universities.",
    },
    {
      id: "ssc-chsl-3",
      title: "SSC CHSL Passage 3",
      language: "English",
      category: "SSC",
      text: "The modern economy requires workers who are proficient in computer operations and digital communication skills essential for government employment. Staff Selection Commission examinations are conducted every year to recruit thousands of qualified candidates into central government service. The typing component requires candidates to achieve the minimum speed with high accuracy to qualify for appointment. Net WPM is carefully calculated by subtracting error words from total gross words typed divided by time in minutes. Haryana Public Service Commission and Haryana Staff Selection Commission conduct state-level examinations separately. Cities across Haryana including Rohtak, Hisar, Karnal, and Gurugram are important centers of government activity and administration. The banking sector provides crucial financial services to millions of citizens through an extensive network of branches nationwide. Public sector banks like State Bank of India serve customers in every corner of the country including remote rural areas. The National Informatics Centre provides technology services to all central and state government departments enabling digital governance. E-governance initiatives have transformed how citizens interact with government offices making services more accessible and transparent. Computer proficiency including typing speed is now mandatory for most government clerical positions and administrative roles. The Digital India program aims to bring government services online and make them available to all citizens efficiently.",
    },
  ],
  "ssc-cgl": [
    {
      id: "ssc-cgl-1",
      title: "SSC CGL Passage 1",
      language: "English",
      category: "SSC",
      text: "The Combined Graduate Level examination is one of the most prestigious central government recruitment examinations conducted in India. It selects candidates for posts like Inspector of Income Tax, Assistant Audit Officer, Tax Assistant, and Senior Secretariat Assistant. The typing component requires candidates to achieve forty words per minute with ninety percent accuracy to qualify. Net WPM is calculated by subtracting error words from total gross words typed divided by time elapsed in minutes. India's Parliament located in New Delhi enacts laws that govern every aspect of national life and public administration. The Rashtrapati Bhavan is the official residence of the President of India and a landmark of the capital city. The Supreme Court ensures constitutional rights for all citizens of this vast and diverse democratic republic. The national flag with saffron, white, and green represents courage, peace, and prosperity valued by all Indians. India achieved independence on August fifteen nineteen forty-seven after a long struggle led by Mahatma Gandhi and others. The Constitution came into effect on January twenty-six nineteen fifty making India a sovereign democratic republic. Regular practice of government vocabulary and official passages significantly improves typing speed and accuracy for competitive examinations. Candidates from Haryana, Punjab, and other northern states regularly excel in SSC examinations securing central government employment.",
    },
    {
      id: "ssc-cgl-2",
      title: "SSC CGL Passage 2",
      language: "English",
      category: "SSC",
      text: "The administrative structure of the Government of India is organized into various ministries, departments, and subordinate offices spread across the country. Central government employees are recruited through competitive examinations conducted by Staff Selection Commission, UPSC, and other agencies. The typing test is a mandatory requirement for clerical and data entry positions in all central government departments. Candidates must practice regularly on government-style passages to achieve the required speed and accuracy levels. The Ministry of Finance oversees the financial affairs of the central government and prepares the annual Union Budget. The Ministry of Home Affairs deals with internal security, border management, and relations with state governments. The Cabinet Secretariat coordinates the work of various ministries and departments ensuring smooth functioning of the executive. The Planning Commission, now replaced by NITI Aayog, formulates policies for balanced regional development and economic growth. Chandigarh, Rohtak, Hisar, Karnal, and other cities of Haryana have many central government offices employing thousands of staff. The National Capital Region around Delhi is a major hub of central government offices and public sector undertakings. Young aspirants from all parts of the country work hard to secure government employment offering stability and prestige. The examination system ensures merit-based selection of candidates for various government positions across all levels.",
    },
  ],
  "rrb-ntpc": [
    {
      id: "rrb-ntpc-1",
      title: "RRB NTPC Passage 1",
      language: "English",
      category: "Railway",
      text: "Indian Railways is one of the largest railway networks in the world and a major employer of the Government of India. The Railway Recruitment Board conducts examinations for Non-Technical Popular Categories posts including junior clerk, accounts assistant, and station master. The NTPC typing test requires candidates to demonstrate a speed of at least thirty words per minute in English with eighty-five percent accuracy. Railway employees work across all states ensuring safe and efficient transportation for millions of passengers every day. Haryana enjoys excellent rail connectivity with major railway stations at Rohtak, Hisar, Karnal, Kurukshetra, Ambala, and Panipat. Indian Railways has been modernizing rapidly with complete electrification, Vande Bharat trains, and improved passenger amenities. The dedicated freight corridor project aims to separate freight traffic from passenger trains improving speed and efficiency. Railway recruitment examinations attract millions of applicants from across the country competing for limited government positions. Candidates must prepare thoroughly for both the written examination and the typing skill test components. Regular practice on railway-themed passages and government vocabulary helps improve typing speed and accuracy significantly. The station master position requires excellent communication skills and typing proficiency to handle daily operational tasks efficiently. Modern railway operations rely heavily on computer systems requiring staff to be proficient in digital tools and typing.",
    },
    {
      id: "rrb-ntpc-2",
      title: "RRB NTPC Passage 2",
      language: "English",
      category: "Railway",
      text: "The history of Indian Railways dates back to eighteen fifty-three when the first train ran between Mumbai and Thane covering a distance of thirty-four kilometers. Today the network spans more than sixty-seven thousand kilometers connecting towns and cities across every state and union territory. More than thirteen million passengers travel by train daily making Indian Railways one of the busiest rail networks globally. The rail network has been a great unifier bringing together people from different cultures, languages, and regions of this vast country. Freight operations carry billions of tons of goods including coal, cement, fertilizer, and food grains annually across the country. The railway ministry has been implementing ambitious modernization plans including hundred percent electrification and introduction of high-speed trains. Station redevelopment projects are transforming major railway stations into world-class facilities with modern amenities for passengers. The IRCTC platform enables millions of passengers to book tickets online saving time and providing convenience. Railway employees play a crucial role in maintaining the safety and efficiency of this vast transportation network. Haryana's cities are well connected to the national railway network enabling easy travel to Delhi and other major destinations. Station masters, clerks, and other staff are essential for the smooth day-to-day operations of railway stations across the country.",
    },
  ],
  "bank-po": [
    {
      id: "bank-po-1",
      title: "Bank PO Passage 1",
      language: "English",
      category: "Banking",
      text: "The Indian banking sector plays a pivotal role in driving sustainable economic growth and financial inclusion across the country. Public sector banks like State Bank of India, Punjab National Bank, and Bank of Baroda serve hundreds of millions of customers nationwide. IBPS conducts common recruitment examinations for bank clerks, probationary officers, and specialist officers every year. The typing test in banking examinations requires a minimum speed of forty words per minute with ninety percent accuracy. Financial literacy is essential for bank employees and customers to ensure proper utilization of banking services. Jan Dhan Yojana has brought hundreds of millions of previously unbanked citizens into the formal financial system. Digital banking through mobile applications, internet banking, and UPI has revolutionized how people manage their personal finances. Cities like Mumbai, Chandigarh, Gurugram, and Faridabad are major centers of banking and financial services activity. The Reserve Bank of India headquartered in Mumbai acts as the central bank and regulates monetary policy. NABARD supports agricultural and rural development through refinancing and developmental activities across the country. The banking sector has been undergoing rapid digital transformation with artificial intelligence being adopted for security. Bank employees must maintain high standards of accuracy and professionalism in all their financial transactions and customer interactions.",
    },
  ],
  "haryana-ssc": [
    {
      id: "haryana-ssc-1",
      title: "HSSC Passage 1",
      language: "Hindi",
      category: "Haryana",
      text: "हरियाणा एक समृद्ध और प्रगतिशील राज्य है जो भारत के उत्तर में दिल्ली से सटा हुआ स्थित है। इसकी राजधानी चंडीगढ़ है जो पंजाब की भी सांझी राजधानी है और एक आदर्श नियोजित शहर के रूप में विश्व में प्रसिद्ध है। रोहतक हरियाणा का एक प्रमुख शहर है जो उच्च शिक्षा, चिकित्सा सेवाओं और व्यापार का महत्वपूर्ण केंद्र है। हिसार में बड़े उद्योग, इस्पात संयंत्र और राष्ट्रीय स्तर के कृषि अनुसंधान संस्थान स्थित हैं। करनाल को किसानों, डेयरी विकास और कृषि अनुसंधान के लिए जाना जाता है। गुरुग्राम एक तेजी से उभरते आधुनिक औद्योगिक और सूचना प्रौद्योगिकी केंद्र के रूप में पहचान बना चुका है। फरीदाबाद उत्तर भारत के सबसे बड़े औद्योगिक शहरों में से एक है जहाँ हजारों कारखाने स्थापित हैं। कुरुक्षेत्र पौराणिक महाभारत की पवित्र भूमि है जहाँ भगवान श्रीकृष्ण ने अर्जुन को गीता का उपदेश दिया था। अम्बाला एक महत्वपूर्ण रेलवे जंक्शन और प्रमुख सैन्य केंद्र है। पानीपत तीन ऐतिहासिक निर्णायक युद्धों का स्थल रहा है और आज वस्त्र उद्योग के लिए प्रसिद्ध है। हरियाणा सरकार ने किसानों की आय दोगुनी करने के लिए अनेक महत्वाकांक्षी योजनाएं शुरू की हैं। राज्य में शिक्षा, स्वास्थ्य और बुनियादी ढाँचे के विकास पर विशेष ध्यान दिया जा रहा है। हरियाणा के युवा खेलों, सेना और प्रशासनिक सेवाओं में देश भर में नाम रोशन कर रहे हैं।",
    },
    {
      id: "haryana-ssc-2",
      title: "HSSC Passage 2",
      language: "Hindi",
      category: "Haryana",
      text: "हरियाणा कर्मचारी चयन आयोग राज्य सरकार के विभिन्न विभागों में भर्ती के लिए परीक्षाएं आयोजित करता है। टाइपिंग परीक्षा में हिंदी और अंग्रेजी दोनों भाषाओं में दक्षता की आवश्यकता होती है। मंगल यूनिकोड फ़ॉन्ट का उपयोग हिंदी टाइपिंग परीक्षाओं में सरकारी मानक के अनुसार किया जाता है। न्यूनतम गति पच्चीस शब्द प्रति मिनट और शुद्धता पचासी प्रतिशत निर्धारित है। हरियाणा की प्रमुख भाषा हरियाणवी है जो हिंदी की एक बोली है और राज्य की संस्कृति का अभिन्न अंग है। राज्य की अर्थव्यवस्था में कृषि, उद्योग और सेवा क्षेत्र का महत्वपूर्ण योगदान है। यमुना और घग्घर नदियाँ राज्य की प्रमुख नदियाँ हैं जो कृषि के लिए जल उपलब्ध कराती हैं। हरियाणा में पंचकुला, सोनीपत, झज्जर, भिवानी, महेंद्रगढ़ और यमुनानगर भी महत्वपूर्ण जिले हैं। राज्य सरकार युवाओं को रोजगार के अवसर प्रदान करने के लिए विभिन्न कौशल विकास कार्यक्रम चला रही है। किसानों को आधुनिक कृषि तकनीकों से अवगत कराने के लिए कृषि विभाग सक्रिय रूप से काम कर रहा है।",
    },
  ],
  "haryana-harton": [
    {
      id: "harton-1",
      title: "Haryana HARTRON Passage 1",
      language: "Hindi",
      category: "Haryana",
      text: "हरियाणा सरकार की हारटन टंकण परीक्षा में टंकण गति की गणना स्ट्रोक के आधार पर की जाती है। इस परीक्षा प्रणाली में एक शब्द पाँच स्ट्रोक के बराबर माना जाता है। सकल गति की गणना कुल स्ट्रोक को पाँच से विभाजित करके समय से विभाजित करके की जाती है। गलतियों की संख्या को पाँच से विभाजित करके सकल गति से घटाया जाता है। हारटन परीक्षा में पच्चीस शब्द प्रति मिनट निवल गति और पचासी प्रतिशत शुद्धता आवश्यक है। हरियाणा के सभी जिलों में सरकारी टंकण प्रशिक्षण केंद्र स्थापित किए गए हैं। रोहतक, हिसार, करनाल, गुरुग्राम, फरीदाबाद और कुरुक्षेत्र में आधुनिक प्रशिक्षण केंद्र उपलब्ध हैं। हरियाणा लोक सेवा आयोग और हरियाणा कर्मचारी चयन आयोग नियमित भर्ती परीक्षाएं आयोजित करते हैं। नियमित अभ्यास और सही तकनीक से टंकण गति में निरंतर सुधार संभव है। हरियाणा में चंडीगढ़ से लेकर छोटे कस्बों तक सरकारी कार्यालयों में टंकण कौशल की आवश्यकता होती है।",
    },
  ],
  deo: [
    {
      id: "deo-1",
      title: "DEO Passage 1",
      language: "English",
      category: "SSC",
      text: "Data Entry Operators play a crucial role in government offices by maintaining accurate digital records and processing important official data. The SSC DEO examination requires candidates to type at fifteen thousand key depressions per hour on a computer keyboard. This speed requirement translates to around forty words per minute with very high accuracy of ninety-five percent. Practice on numeric data entry, government correspondence, and official documents is highly recommended for aspirants. Delhi, Mumbai, Chandigarh, and other major centers serve as important hubs for central government data processing operations. Candidates from Haryana particularly from Rohtak, Hisar, and Gurugram regularly excel in national level competitive examinations. The National Informatics Centre provides technology services to government departments enabling digital governance across India. Computer proficiency including typing speed is mandatory for most government clerical and administrative positions today. The Digital India program has transformed how citizens interact with government offices making services more accessible and efficient. Many aspirants spend months practicing on special data entry passages to achieve the required speed for DEO examinations.",
    },
  ],
};

function getLanguageOptions(examLanguage: string): string[] {
  const lang = examLanguage.toLowerCase();
  if (lang.includes("hindi") && lang.includes("english"))
    return ["English", "Hindi"];
  if (lang.includes("hindi")) return ["Hindi", "English"];
  return ["English"];
}

function generateSessionId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

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
  const currentCharRef = useRef<HTMLSpanElement>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: typed.length triggers scroll
  useEffect(() => {
    if (currentCharRef.current && containerRef.current) {
      const container = containerRef.current;
      const el = currentCharRef.current;
      const elTop = el.offsetTop - container.offsetTop;
      const elBottom = elTop + el.offsetHeight;
      const containerScrollTop = container.scrollTop;
      const containerBottom = containerScrollTop + container.clientHeight;
      if (elBottom > containerBottom - 20) {
        container.scrollTop = elTop - container.clientHeight / 2;
      } else if (elTop < containerScrollTop + 10) {
        container.scrollTop = elTop - 10;
      }
    }
  }, [typed.length]);

  return (
    <div
      ref={containerRef}
      className="overflow-y-auto"
      style={{
        height: "160px",
        background: "#fff",
        border: "1px solid #ccc",
        borderRadius: 4,
        padding: "8px 10px",
      }}
    >
      <div style={{ fontFamily: "monospace", fontSize, lineHeight: 1.8 }}>
        {Array.from(passage)
          .map((char, _gi) => ({ char, pos: _gi }))
          .map(({ char, pos }) => {
            let color = "#999";
            let bg = "transparent";
            let fontWeight: "normal" | "bold" = "normal";
            if (pos < typed.length) {
              color = typed[pos] === char ? "#16a34a" : "#dc2626";
              if (typed[pos] !== char) bg = "#fee2e2";
            } else if (pos === typed.length) {
              color = "#1d4ed8";
              fontWeight = "bold";
              bg = "#dbeafe";
            }
            return (
              <span
                key={pos}
                ref={pos === typed.length ? currentCharRef : undefined}
                style={{ color, background: bg, fontWeight }}
              >
                {char}
              </span>
            );
          })}
      </div>
    </div>
  );
});

export function LiveTestPage() {
  const navigate = useNavigate();
  const { auth, isLoggedIn } = useAuth();
  const { actor } = useActor();

  const [activeTab, setActiveTab] = useState<ActiveTab>("select");
  const [selectedExam, setSelectedExam] = useState<ExamData>(EXAMS[0]);
  const [passage, setPassage] = useState("");
  const [typed, setTyped] = useState("");
  const [state, setState] = useState<TestState>("idle");
  const [timeLeft, setTimeLeft] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [_pausedTimeLeft, setPausedTimeLeft] = useState(0);
  const [backspaceAllowed, setBackspaceAllowed] = useState(true);
  const [selectedTimeMin, setSelectedTimeMin] = useState(10);
  const [paragraphWords, setParagraphWords] = useState(400);
  const [fontSize, setFontSize] = useState(14);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [selectedParagraphId, setSelectedParagraphId] = useState<string | null>(
    null,
  );
  const [lastResult, setLastResult] = useState<{
    wpm: number;
    accuracy: number;
    errors: number;
    passed: boolean;
    timeTaken: number;
  } | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const langOptions = useMemo(
    () => getLanguageOptions(selectedExam.language),
    [selectedExam.language],
  );

  const resetTest = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    const examParas = EXAM_PARAGRAPHS[selectedExam.id];
    const selectedPara =
      examParas?.find((p) => p.id === selectedParagraphId) ?? examParas?.[0];
    if (selectedPara) {
      setPassage(selectedPara.text);
    } else {
      setPassage(
        generatePassageOfLength(selectedExam, paragraphWords, selectedLanguage),
      );
    }
    setTimeLeft(selectedTimeMin * 60);
    setTyped("");
    setState("idle");
    setLastResult(null);
  }, [
    selectedExam,
    paragraphWords,
    selectedTimeMin,
    selectedLanguage,
    selectedParagraphId,
  ]);

  useEffect(() => {
    resetTest();
  }, [resetTest]);
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const startTest = () => {
    setState("running");
    setStartTime(Date.now());
    textareaRef.current?.focus();
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          setState("finished");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const pauseTest = () => {
    if (state === "running") {
      clearInterval(timerRef.current!);
      setPausedTimeLeft(timeLeft);
      setState("paused");
    } else if (state === "paused") {
      setState("running");
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setState("finished");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      textareaRef.current?.focus();
    }
  };

  const finishTest = useCallback(
    async (finalTyped: string) => {
      if (timerRef.current) clearInterval(timerRef.current);
      setState("finished");
      const elapsed = (Date.now() - startTime) / 60000;
      const correctChars = finalTyped
        .split("")
        .filter((c, idx) => c === passage[idx]).length;
      const totalTyped = finalTyped.length;
      const wpm = elapsed > 0 ? Math.round(correctChars / 5 / elapsed) : 0;
      const accuracy =
        totalTyped > 0 ? Math.round((correctChars / totalTyped) * 100) : 0;
      const errors = totalTyped - correctChars;
      const timeTaken = selectedTimeMin * 60 - timeLeft;
      const passed =
        wpm >= selectedExam.requiredWPM && accuracy >= selectedExam.accuracy;
      setLastResult({ wpm, accuracy, errors, passed, timeTaken });
      setActiveTab("results");

      if (isLoggedIn && auth?.token && actor) {
        const sessionId = generateSessionId();
        try {
          await actor.submitResult(
            auth.token,
            sessionId,
            selectedExam.id,
            selectedExam.name,
            BigInt(wpm),
            BigInt(accuracy),
            BigInt(errors),
            BigInt(timeTaken),
            passed,
            selectedLanguage,
          );
        } catch {
          /* ignore */
        }
      }
    },
    [
      startTime,
      passage,
      timeLeft,
      selectedTimeMin,
      selectedExam,
      isLoggedIn,
      auth,
      actor,
      selectedLanguage,
    ],
  );

  const handleTyping = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (state !== "running") return;
    const value = e.target.value;
    if (value.length > passage.length) return;
    setTyped(value);
    if (value.length === passage.length) finishTest(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (!backspaceAllowed && e.key === "Backspace") e.preventDefault();
  };

  const stats = useMemo(() => {
    const elapsed =
      state === "running" && startTime > 0
        ? (Date.now() - startTime) / 60000
        : 0;
    const correctChars = typed
      .split("")
      .filter((c, idx) => c === passage[idx]).length;
    const wpm = elapsed > 0 ? Math.round(correctChars / 5 / elapsed) : 0;
    const accuracy =
      typed.length > 0 ? Math.round((correctChars / typed.length) * 100) : 100;
    const errors = typed.length - correctChars;
    return { wpm, accuracy, errors };
  }, [typed, passage, state, startTime]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeStr = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  const progress =
    selectedTimeMin > 0
      ? ((selectedTimeMin * 60 - timeLeft) / (selectedTimeMin * 60)) * 100
      : 0;

  const TABS: { key: ActiveTab; label: string }[] = [
    { key: "select", label: "SELECT EXAM" },
    { key: "test", label: "START TEST" },
    { key: "results", label: "SHOW RESULTS" },
    { key: "settings", label: "SETTINGS" },
  ];

  const EXAM_CATEGORIES = ["SSC", "Railway", "Banking", "Court", "State Govt"];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#e8e8e8",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: "8px",
        fontFamily: "'Segoe UI', Arial, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "min(100vw - 16px, calc((100vh - 16px) * 16 / 9))",
          background: "#f0f0f0",
          border: "1px solid #bbb",
          boxShadow: "0 4px 24px rgba(0,0,0,0.15)",
        }}
      >
        {/* Blue Header */}
        <div
          style={{
            background:
              "linear-gradient(90deg, #1a237e 0%, #1565C0 60%, #1976D2 100%)",
            padding: "8px 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ color: "#FFD700", fontSize: 20 }}>⌨️</span>
            <div>
              <div
                style={{
                  color: "#fff",
                  fontWeight: 800,
                  fontSize: 15,
                  letterSpacing: 0.5,
                }}
              >
                KARWASHRA TYPING EXAM
              </div>
              <div style={{ color: "#90CAF9", fontSize: 10 }}>
                LIVE TEST — {selectedExam.name}
              </div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {isLoggedIn && auth?.username && (
              <span
                style={{
                  background: "rgba(255,255,255,0.15)",
                  color: "#fff",
                  fontSize: 10,
                  padding: "3px 8px",
                  borderRadius: 3,
                }}
              >
                ID: {auth.username}
              </span>
            )}
            <button
              type="button"
              onClick={() => navigate({ to: "/" })}
              data-ocid="livetest.link"
              style={{
                background: "rgba(255,255,255,0.2)",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.3)",
                padding: "4px 12px",
                borderRadius: 3,
                fontSize: 11,
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              ← Home
            </button>
          </div>
        </div>

        {/* Tab Bar */}
        <div
          style={{
            background: "#1565C0",
            display: "flex",
            borderBottom: "2px solid #0D47A1",
          }}
        >
          {TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              data-ocid={`livetest.${tab.key}.tab`}
              style={{
                padding: "7px 16px",
                fontSize: 11,
                fontWeight: 700,
                color: activeTab === tab.key ? "#1565C0" : "#fff",
                background: activeTab === tab.key ? "#fff" : "transparent",
                border: "none",
                cursor: "pointer",
                letterSpacing: 0.5,
                borderRight: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div
          style={{
            display: "flex",
            height:
              "calc(min(100vw - 16px, calc((100vh - 16px) * 16 / 9)) * 9 / 16 - 110px)",
            minHeight: 380,
            overflow: "hidden",
          }}
        >
          {/* LEFT: Exam List */}
          <div
            style={{
              width: "28%",
              minWidth: 160,
              background: "#fff",
              borderRight: "1px solid #ccc",
              overflowY: "auto",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                background: "#1565C0",
                color: "#fff",
                fontWeight: 700,
                fontSize: 11,
                padding: "6px 10px",
                letterSpacing: 0.5,
              }}
            >
              EXAM CATEGORIES
            </div>
            {EXAM_CATEGORIES.map((cat) => (
              <div key={cat}>
                <div
                  style={{
                    background: "#e8f0fe",
                    color: "#1565C0",
                    fontSize: 10,
                    fontWeight: 700,
                    padding: "4px 10px",
                    borderBottom: "1px solid #c5d8f8",
                  }}
                >
                  {cat}
                </div>
                {EXAMS.filter((e) => e.category === cat).map((exam) => (
                  <button
                    key={exam.id}
                    type="button"
                    onClick={() => {
                      setSelectedExam(exam);
                      setSelectedParagraphId(null);
                      setActiveTab("test");
                      resetTest();
                    }}
                    data-ocid={"livetest.exam.button"}
                    style={{
                      width: "100%",
                      textAlign: "left",
                      padding: "6px 10px",
                      fontSize: 11,
                      background:
                        selectedExam.id === exam.id ? "#1565C0" : "transparent",
                      color: selectedExam.id === exam.id ? "#fff" : "#333",
                      border: "none",
                      borderBottom: "1px solid #eee",
                      cursor: "pointer",
                      fontWeight: selectedExam.id === exam.id ? 700 : 400,
                    }}
                  >
                    <div>{exam.name}</div>
                    <div style={{ fontSize: 10, opacity: 0.7 }}>
                      {exam.requiredWPM} WPM · {exam.timeMin}min
                    </div>
                  </button>
                ))}
              </div>
            ))}
          </div>

          {/* RIGHT: Test Area */}
          <div style={{ flex: 1, overflowY: "auto", background: "#f5f5f5" }}>
            {activeTab === "select" && (
              <div style={{ padding: 16 }}>
                <div
                  style={{
                    background: "#1565C0",
                    color: "#fff",
                    borderRadius: 4,
                    padding: "10px 14px",
                    marginBottom: 12,
                  }}
                >
                  <div style={{ fontWeight: 800, fontSize: 14 }}>
                    {selectedExam.name}
                  </div>
                  <div style={{ fontSize: 11, opacity: 0.85, marginTop: 2 }}>
                    {selectedExam.authority} · {selectedExam.description}
                  </div>
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    gap: 8,
                    marginBottom: 12,
                  }}
                >
                  {[
                    { l: "Required WPM", v: selectedExam.requiredWPM },
                    { l: "Time", v: `${selectedExam.timeMin} min` },
                    { l: "Min Accuracy", v: `${selectedExam.accuracy}%` },
                  ].map((s) => (
                    <div
                      key={s.l}
                      style={{
                        background: "#fff",
                        border: "1px solid #ddd",
                        borderRadius: 4,
                        padding: "8px",
                        textAlign: "center",
                      }}
                    >
                      <div
                        style={{
                          fontSize: 18,
                          fontWeight: 800,
                          color: "#1565C0",
                        }}
                      >
                        {s.v}
                      </div>
                      <div style={{ fontSize: 10, color: "#666" }}>{s.l}</div>
                    </div>
                  ))}
                </div>
                {EXAM_PARAGRAPHS[selectedExam.id] && (
                  <ParagraphSelector
                    paragraphs={EXAM_PARAGRAPHS[selectedExam.id]}
                    selectedId={
                      selectedParagraphId ??
                      EXAM_PARAGRAPHS[selectedExam.id][0].id
                    }
                    onSelect={(id, text) => {
                      setSelectedParagraphId(id);
                      setPassage(text);
                    }}
                    examName={selectedExam.name}
                  />
                )}
                <div
                  style={{
                    background: "#fff",
                    border: "1px solid #ddd",
                    borderRadius: 4,
                    padding: 12,
                    marginBottom: 10,
                  }}
                >
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: 11,
                      color: "#1565C0",
                      marginBottom: 6,
                    }}
                  >
                    EXAM RULES
                  </div>
                  {selectedExam.rules.map((rule) => (
                    <div
                      key={rule.slice(0, 40)}
                      style={{
                        fontSize: 11,
                        color: "#444",
                        padding: "2px 0",
                        paddingLeft: 12,
                      }}
                    >
                      • {rule}
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab("test")}
                  data-ocid="livetest.primary_button"
                  style={{
                    background: "#f57c00",
                    color: "#fff",
                    border: "none",
                    borderRadius: 4,
                    padding: "8px 24px",
                    fontWeight: 700,
                    fontSize: 12,
                    cursor: "pointer",
                  }}
                >
                  START TEST →
                </button>
              </div>
            )}

            {activeTab === "test" && (
              <div style={{ padding: 10 }}>
                {/* Top Control Bar */}
                <div
                  style={{
                    background: "#fff",
                    border: "1px solid #ccc",
                    borderRadius: 4,
                    padding: "6px 10px",
                    marginBottom: 8,
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    flexWrap: "wrap",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setBackspaceAllowed((v) => !v)}
                    data-ocid="livetest.toggle"
                    style={{
                      background: backspaceAllowed ? "#e8f5e9" : "#ffebee",
                      color: backspaceAllowed ? "#2e7d32" : "#c62828",
                      border: `1px solid ${backspaceAllowed ? "#a5d6a7" : "#ef9a9a"}`,
                      borderRadius: 3,
                      padding: "3px 8px",
                      fontSize: 10,
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    {backspaceAllowed ? "⌫ ON" : "⌫ OFF"}
                  </button>
                  <button
                    type="button"
                    onClick={resetTest}
                    data-ocid="livetest.secondary_button"
                    style={{
                      background: "#e8f0fe",
                      color: "#1565C0",
                      border: "1px solid #90caf9",
                      borderRadius: 3,
                      padding: "3px 8px",
                      fontSize: 10,
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    New ¶
                  </button>
                  <button
                    type="button"
                    onClick={
                      state === "idle"
                        ? startTest
                        : state === "running" || state === "paused"
                          ? pauseTest
                          : resetTest
                    }
                    data-ocid="livetest.primary_button"
                    style={{
                      background: state === "running" ? "#ff6f00" : "#1565C0",
                      color: "#fff",
                      border: "none",
                      borderRadius: 3,
                      padding: "3px 10px",
                      fontSize: 10,
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    {state === "idle"
                      ? "▶ Start"
                      : state === "running"
                        ? "⏸ Pause"
                        : state === "paused"
                          ? "▶ Resume"
                          : "↺ Reset"}
                  </button>
                  {state !== "idle" && (
                    <button
                      type="button"
                      onClick={resetTest}
                      data-ocid="livetest.close_button"
                      style={{
                        background: "#ffebee",
                        color: "#c62828",
                        border: "1px solid #ef9a9a",
                        borderRadius: 3,
                        padding: "3px 8px",
                        fontSize: 10,
                        fontWeight: 700,
                        cursor: "pointer",
                      }}
                    >
                      ✕ Close
                    </button>
                  )}
                  <div
                    style={{
                      marginLeft: "auto",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 800,
                        color: timeLeft < 60 ? "#c62828" : "#1565C0",
                        background: timeLeft < 60 ? "#ffebee" : "#e8f0fe",
                        padding: "2px 8px",
                        borderRadius: 3,
                      }}
                    >
                      ⏱ {timeStr}
                    </span>
                  </div>
                </div>

                {/* Exam Info */}
                <div
                  style={{
                    background: "#e8f0fe",
                    border: "1px solid #90caf9",
                    borderRadius: 4,
                    padding: "5px 10px",
                    marginBottom: 8,
                    display: "flex",
                    gap: 12,
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{ fontSize: 11, fontWeight: 700, color: "#1565C0" }}
                  >
                    {selectedExam.name}
                  </span>
                  <span style={{ fontSize: 10, color: "#555" }}>
                    Req: {selectedExam.requiredWPM} WPM
                  </span>
                  <span style={{ fontSize: 10, color: "#555" }}>
                    Time: {selectedTimeMin} min
                  </span>
                  {langOptions.length > 1 &&
                    state === "idle" &&
                    langOptions.map((lang) => (
                      <button
                        key={lang}
                        type="button"
                        onClick={() => setSelectedLanguage(lang)}
                        data-ocid="livetest.toggle"
                        style={{
                          fontSize: 10,
                          padding: "2px 8px",
                          borderRadius: 3,
                          border: `1px solid ${selectedLanguage === lang ? "#1565C0" : "#ccc"}`,
                          background:
                            selectedLanguage === lang ? "#1565C0" : "#fff",
                          color: selectedLanguage === lang ? "#fff" : "#555",
                          cursor: "pointer",
                          fontWeight: 600,
                        }}
                      >
                        {lang}
                      </button>
                    ))}
                </div>

                {/* Time selector (idle only) */}
                {state === "idle" && (
                  <div
                    style={{
                      display: "flex",
                      gap: 5,
                      marginBottom: 8,
                      flexWrap: "wrap",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        fontSize: 10,
                        color: "#666",
                        fontWeight: 700,
                        marginRight: 2,
                      }}
                    >
                      ⏱ Time:
                    </span>
                    {TIME_PRESETS.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setSelectedTimeMin(t)}
                        data-ocid="livetest.toggle"
                        style={{
                          fontSize: 11,
                          padding: "4px 12px",
                          borderRadius: 20,
                          border: `2px solid ${selectedTimeMin === t ? "#1565C0" : "#ccc"}`,
                          background:
                            selectedTimeMin === t ? "#1565C0" : "#f5f5f5",
                          color: selectedTimeMin === t ? "#fff" : "#555",
                          cursor: "pointer",
                          fontWeight: selectedTimeMin === t ? 800 : 500,
                          boxShadow:
                            selectedTimeMin === t
                              ? "0 2px 6px rgba(21,101,192,0.3)"
                              : "none",
                          transition: "all 0.15s",
                        }}
                      >
                        {t} min
                      </button>
                    ))}
                    <span
                      style={{
                        fontSize: 10,
                        color: "#666",
                        marginLeft: 8,
                        marginRight: 4,
                      }}
                    >
                      Font:
                    </span>
                    <button
                      type="button"
                      onClick={() => setFontSize((s) => Math.max(11, s - 1))}
                      style={{
                        fontSize: 10,
                        padding: "2px 6px",
                        borderRadius: 3,
                        border: "1px solid #ccc",
                        background: "#fff",
                        cursor: "pointer",
                      }}
                    >
                      A-
                    </button>
                    <span
                      style={{
                        fontSize: 10,
                        color: "#666",
                        width: 22,
                        textAlign: "center",
                      }}
                    >
                      {fontSize}
                    </span>
                    <button
                      type="button"
                      onClick={() => setFontSize((s) => Math.min(22, s + 1))}
                      style={{
                        fontSize: 10,
                        padding: "2px 6px",
                        borderRadius: 3,
                        border: "1px solid #ccc",
                        background: "#fff",
                        cursor: "pointer",
                      }}
                    >
                      A+
                    </button>
                  </div>
                )}

                {/* Passage */}
                <PassageDisplay
                  passage={passage}
                  typed={typed}
                  fontSize={fontSize}
                />

                {/* Progress bar */}
                <div
                  style={{
                    background: "#e0e0e0",
                    borderRadius: 2,
                    height: 4,
                    margin: "4px 0",
                  }}
                >
                  <div
                    style={{
                      background: "#1565C0",
                      height: "100%",
                      borderRadius: 2,
                      width: `${progress}%`,
                      transition: "width 1s linear",
                    }}
                  />
                </div>

                {/* Textarea */}
                <textarea
                  ref={textareaRef}
                  value={typed}
                  onChange={handleTyping}
                  onKeyDown={handleKeyDown}
                  disabled={state !== "running"}
                  placeholder={
                    state === "idle"
                      ? "Click ▶ Start to begin..."
                      : state === "paused"
                        ? "Test paused. Click ▶ Resume."
                        : state === "finished"
                          ? "Test complete!"
                          : "Type here..."
                  }
                  style={{
                    width: "100%",
                    height: 70,
                    fontFamily: "monospace",
                    fontSize: 13,
                    border: "1px solid #ccc",
                    borderRadius: 4,
                    padding: "6px 8px",
                    resize: "none",
                    background: state === "running" ? "#fff" : "#f5f5f5",
                    outline: "none",
                    boxSizing: "border-box",
                    marginTop: 4,
                  }}
                  data-ocid="livetest.editor"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck={false}
                />

                {/* Live Stats Bar */}
                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    marginTop: 4,
                    flexWrap: "wrap",
                  }}
                >
                  {[
                    {
                      l: "WPM",
                      v: state === "running" ? stats.wpm : "—",
                      good: stats.wpm >= selectedExam.requiredWPM,
                    },
                    {
                      l: "Accuracy",
                      v: state === "running" ? `${stats.accuracy}%` : "—",
                      good: stats.accuracy >= selectedExam.accuracy,
                    },
                    {
                      l: "Errors",
                      v: state === "running" ? stats.errors : "—",
                      good: false,
                    },
                    { l: "Time Left", v: timeStr, good: false },
                  ].map(({ l, v, good }) => (
                    <div
                      key={l}
                      style={{
                        background: good ? "#e8f5e9" : "#fff",
                        border: `1px solid ${good ? "#a5d6a7" : "#ddd"}`,
                        borderRadius: 4,
                        padding: "4px 10px",
                        textAlign: "center",
                        minWidth: 60,
                      }}
                    >
                      <div
                        style={{
                          fontSize: 14,
                          fontWeight: 800,
                          color: good ? "#2e7d32" : "#1565C0",
                        }}
                      >
                        {v}
                      </div>
                      <div style={{ fontSize: 9, color: "#888" }}>{l}</div>
                    </div>
                  ))}
                  <div
                    style={{ flex: 1, display: "flex", alignItems: "center" }}
                  >
                    <div style={{ fontSize: 10, color: "#888" }}>
                      {typed.length} / {passage.length} chars
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "results" && (
              <div style={{ padding: 16 }}>
                {lastResult ? (
                  <div data-ocid="livetest.success_state">
                    <div
                      style={{
                        background: lastResult.passed ? "#e8f5e9" : "#ffebee",
                        border: `2px solid ${lastResult.passed ? "#66bb6a" : "#ef5350"}`,
                        borderRadius: 6,
                        padding: "12px 16px",
                        marginBottom: 12,
                        textAlign: "center",
                      }}
                    >
                      <div style={{ fontSize: 28, marginBottom: 4 }}>
                        {lastResult.passed ? "🏆" : "📋"}
                      </div>
                      <div
                        style={{
                          fontSize: 18,
                          fontWeight: 800,
                          color: lastResult.passed ? "#2e7d32" : "#c62828",
                        }}
                      >
                        {lastResult.passed ? "PASSED!" : "NOT QUALIFIED"}
                      </div>
                      <div
                        style={{ fontSize: 11, color: "#666", marginTop: 2 }}
                      >
                        {selectedExam.name} — {selectedLanguage}
                      </div>
                    </div>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: 8,
                        marginBottom: 12,
                      }}
                    >
                      {[
                        {
                          l: "Net WPM",
                          v: lastResult.wpm,
                          req: selectedExam.requiredWPM,
                          isWpm: true,
                        },
                        {
                          l: "Accuracy",
                          v: `${lastResult.accuracy}%",
                          req: "${selectedExam.accuracy}%`,
                        },
                        { l: "Errors", v: lastResult.errors, req: "" },
                        {
                          l: "Time Taken",
                          v: `${Math.floor(lastResult.timeTaken / 60)}m ${lastResult.timeTaken % 60}s`,
                          req: "",
                        },
                      ].map((s) => (
                        <div
                          key={s.l}
                          style={{
                            background: "#fff",
                            border: "1px solid #ddd",
                            borderRadius: 4,
                            padding: 10,
                            textAlign: "center",
                          }}
                        >
                          <div
                            style={{
                              fontSize: 22,
                              fontWeight: 800,
                              color: "#1565C0",
                            }}
                          >
                            {s.v}
                          </div>
                          <div style={{ fontSize: 10, color: "#888" }}>
                            {s.l}
                          </div>
                          {s.req && (
                            <div style={{ fontSize: 9, color: "#aaa" }}>
                              Required: {s.req}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    <div
                      style={{
                        background: "#fff",
                        border: "1px solid #ddd",
                        borderRadius: 4,
                        padding: "8px 12px",
                        marginBottom: 10,
                        fontSize: 11,
                        color: "#444",
                      }}
                    >
                      <div
                        style={{
                          fontWeight: 700,
                          color: "#1565C0",
                          marginBottom: 4,
                        }}
                      >
                        MARKING SCHEME
                      </div>
                      {selectedExam.markingScheme}
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        resetTest();
                        setActiveTab("test");
                      }}
                      data-ocid="livetest.primary_button"
                      style={{
                        background: "#1565C0",
                        color: "#fff",
                        border: "none",
                        borderRadius: 4,
                        padding: "8px 20px",
                        fontWeight: 700,
                        fontSize: 12,
                        cursor: "pointer",
                      }}
                    >
                      Try Again
                    </button>
                  </div>
                ) : (
                  <div
                    style={{
                      textAlign: "center",
                      padding: 40,
                      color: "#888",
                      fontSize: 13,
                    }}
                  >
                    Complete a test to see results here.
                  </div>
                )}
              </div>
            )}

            {activeTab === "settings" && (
              <div style={{ padding: 16 }}>
                <div
                  style={{
                    background: "#fff",
                    border: "1px solid #ddd",
                    borderRadius: 4,
                    padding: 12,
                    marginBottom: 10,
                  }}
                >
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: 11,
                      color: "#1565C0",
                      marginBottom: 8,
                    }}
                  >
                    TEST SETTINGS
                  </div>
                  <div style={{ marginBottom: 8 }}>
                    <div
                      style={{ fontSize: 10, color: "#666", marginBottom: 4 }}
                    >
                      Paragraph Length: {paragraphWords} words
                    </div>
                    <input
                      type="range"
                      min={250}
                      max={2000}
                      step={50}
                      value={paragraphWords}
                      onChange={(e) =>
                        setParagraphWords(Number(e.target.value))
                      }
                      style={{ width: "100%" }}
                      data-ocid="livetest.toggle"
                    />
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: 9,
                        color: "#aaa",
                      }}
                    >
                      <span>250</span>
                      <span>2000</span>
                    </div>
                  </div>
                  <div style={{ marginBottom: 8 }}>
                    <div
                      style={{ fontSize: 10, color: "#666", marginBottom: 4 }}
                    >
                      Backspace
                    </div>
                    <button
                      type="button"
                      onClick={() => setBackspaceAllowed((v) => !v)}
                      data-ocid="livetest.toggle"
                      style={{
                        background: backspaceAllowed ? "#e8f5e9" : "#ffebee",
                        color: backspaceAllowed ? "#2e7d32" : "#c62828",
                        border: `1px solid ${backspaceAllowed ? "#a5d6a7" : "#ef9a9a"}`,
                        borderRadius: 3,
                        padding: "4px 12px",
                        fontSize: 11,
                        fontWeight: 700,
                        cursor: "pointer",
                      }}
                    >
                      {backspaceAllowed
                        ? "Backspace: Allowed ✓"
                        : "Backspace: Disabled ✗"}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Status Bar */}
        <div
          style={{
            background: "#1565C0",
            color: "#fff",
            padding: "4px 14px",
            display: "flex",
            gap: 16,
            fontSize: 10,
            borderTop: "1px solid #0D47A1",
          }}
        >
          <span>👥 Active Users: 1</span>
          <span>
            🎯 Mode:{" "}
            {state === "idle"
              ? "Ready"
              : state === "running"
                ? "Running"
                : state === "paused"
                  ? "Paused"
                  : "Finished"}
          </span>
          {isLoggedIn && auth?.username && <span>🔑 {auth.username}</span>}
          <span style={{ marginLeft: "auto" }}>
            Exam: {selectedExam.name} · {selectedExam.requiredWPM} WPM required
          </span>
        </div>
      </div>
    </div>
  );
}

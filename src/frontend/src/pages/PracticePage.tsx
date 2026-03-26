import { ParagraphSelector } from "@/components/ParagraphSelector";
import { useEffect, useRef, useState } from "react";

type PracticeState = "idle" | "running" | "finished";

interface PracticeSet {
  id: string;
  title: string;
  category: string;
  language: "English" | "Hindi";
  text: string;
}

const PRACTICE_SETS: PracticeSet[] = [
  {
    id: "ssc-en-1",
    title: "SSC CHSL Passage 1",
    category: "SSC",
    language: "English",
    text: "The Government of India has always been deeply committed to the welfare and holistic development of its citizens across every region of the country. The Staff Selection Commission conducts examinations for recruitment to various posts in central government ministries, departments, and subordinate offices throughout the year. Candidates must demonstrate proficiency in typing to qualify for clerical and data entry positions. The typing test evaluates both speed and accuracy, with net WPM calculated after deducting errors from total words typed. Regular and consistent practice on government-style passages is absolutely essential for success in these competitive examinations. Chandigarh serves as the capital of both Haryana and Punjab states and hosts many important central government offices. The city is well planned with wide roads, parks, and modern infrastructure that makes it one of the cleanest cities in India. Rohtak, Hisar, Karnal, Gurugram, and Faridabad are major cities of Haryana that have seen remarkable rapid development in recent decades. Kurukshetra, the sacred land of the Mahabharata, holds immense cultural and historical significance for the entire nation and millions of pilgrims visit every year. Ambala is a major railway junction and an important military cantonment area of national strategic importance. Panipat has witnessed three decisive battles that changed the course of Indian history and is today known as the city of weavers for its thriving textile industry. The Yamuna river flows through eastern Haryana providing water for irrigation and drinking purposes to millions of people. Haryana has achieved great success in sports producing many Olympic and Commonwealth Games medal winners, especially in wrestling, boxing, and athletics. The state government has established numerous training academies and sports facilities to nurture young talent from rural and urban areas alike.",
  },
  {
    id: "ssc-en-2",
    title: "SSC CGL Passage 1",
    category: "SSC",
    language: "English",
    text: "The Combined Graduate Level examination is one of the most prestigious and sought-after central government recruitment examinations conducted in India every year. It selects candidates for coveted posts like Inspector of Income Tax, Assistant Audit Officer, Tax Assistant, Senior Secretariat Assistant, Data Entry Operator, and various other important positions across central government departments and ministries. The typing component of the SSC CGL examination requires candidates to achieve a minimum speed of forty words per minute with ninety percent accuracy to qualify for appointment. Net WPM is carefully calculated by subtracting error words from total gross words typed and then dividing the result by time elapsed in minutes. India's Parliament located in New Delhi enacts laws and legislation that govern every aspect of national life and public administration. The Rashtrapati Bhavan is the magnificent official residence of the President of the Republic and a landmark of Delhi. The Supreme Court of India located on Bhagwan Das Road in New Delhi is the apex judicial body ensuring constitutional rights for all citizens. Our Constitution guarantees fundamental rights to every citizen of India regardless of caste, creed, religion, or place of birth. The national flag with its three horizontal bands of saffron, white, and green and the Ashoka Chakra at the center represents the core values and aspirations of the nation. India achieved independence on August fifteen nineteen forty seven after a prolonged freedom struggle led by Mahatma Gandhi, Jawaharlal Nehru, Subhas Chandra Bose, Bhagat Singh, and thousands of other freedom fighters who sacrificed their lives. The Constitution of India came into effect on January twenty six nineteen fifty making India a sovereign democratic republic. Regular practice of government vocabulary and official passages significantly improves typing speed and accuracy for competitive examinations.",
  },
  {
    id: "ssc-en-3",
    title: "SSC DEO Passage",
    category: "SSC",
    language: "English",
    text: "Data Entry Operators play a crucial and indispensable role in government offices across the length and breadth of India by maintaining accurate digital records and processing important official data. The SSC DEO examination requires candidates to type at a certified speed of fifteen thousand key depressions per hour on a computer keyboard. This speed requirement approximately translates to around forty words per minute with very high accuracy of ninety-five percent or above. The efficiency score for DEO positions is carefully calculated based on the combination of net speed and overall accuracy measured together. Practice on numeric data entry, government correspondence formats, official letters, and important government documents is highly recommended for all aspiring candidates. Delhi, Mumbai, Chandigarh, Lucknow, and other major metropolitan centers serve as important hubs for central government data processing operations handling millions of records annually. Candidates from Haryana, particularly from districts of Rohtak, Hisar, and Gurugram, regularly excel in these national level competitive examinations. Faridabad and Karnal are rapidly emerging as important centers of government activity and administrative operations in the state. The National Informatics Centre provides technology services to all central and state government departments enabling digital governance across India. E-governance initiatives have transformed how citizens interact with government offices making services more accessible, transparent, and efficient. Computer proficiency including typing speed is now mandatory for most government clerical and administrative positions. The Digital India program launched by the central government aims to transform India into a digitally empowered society and knowledge economy within a short span of time.",
  },
  {
    id: "bank-en-1",
    title: "Bank PO Passage 1",
    category: "Banking",
    language: "English",
    text: "The Indian banking sector plays a pivotal and foundational role in driving sustainable economic growth and ensuring financial inclusion across every corner of this vast country. Public sector banks like State Bank of India, Punjab National Bank, Bank of Baroda, Canara Bank, and Union Bank of India serve hundreds of millions of customers nationwide through their extensive branch networks. IBPS conducts common recruitment examinations for bank clerks, probationary officers, regional rural bank staff, and specialist officers every year attracting millions of applicants. The typing test in banking examinations requires a minimum speed of forty words per minute with ninety percent accuracy for clerical cadre positions. Financial literacy is absolutely essential for both bank employees and customers to ensure proper and efficient utilization of the wide range of banking services available. Jan Dhan Yojana has successfully brought hundreds of millions of previously unbanked citizens into the formal financial system giving them access to savings accounts, insurance, and credit. Digital banking through mobile applications, internet banking portals, and UPI has completely revolutionized how ordinary people manage their personal finances and make payments. Cities like Mumbai, the undisputed financial capital of India, along with Chandigarh, Gurugram, and Faridabad are major centers of banking and financial services activity. The Reserve Bank of India headquartered in Mumbai acts as the central bank and regulates monetary policy for the entire country. NABARD supports agricultural and rural development through refinancing and developmental activities in rural areas. The banking sector has been undergoing rapid digital transformation with artificial intelligence and machine learning technologies being adopted to improve efficiency and security.",
  },
  {
    id: "bank-en-2",
    title: "Bank Clerk Passage",
    category: "Banking",
    language: "English",
    text: "Bank clerks form the essential backbone of retail banking operations carried out across tens of thousands of branches spread throughout urban, semi-urban, and rural India. They professionally handle cash transactions, new account opening procedures, passbook entries, cheque processing, demand draft issuance, and daily front-line customer service. The IBPS CRP Clerk examination carefully selects candidates who demonstrate strong aptitude in reasoning ability, quantitative mathematics, English language proficiency, general awareness, and computer operations knowledge. Typing proficiency of at least thirty words per minute with ninety percent accuracy is firmly required for all clerical cadre roles in public sector banks. Reserve Bank of India, headquartered in the heart of Mumbai, carefully regulates the entire Indian banking and financial system and ensures overall financial stability and monetary discipline. State Bank of India with its extraordinarily extensive network of more than twenty-two thousand branches operates in every single district of the country including the most remote areas of Haryana, Rajasthan, and the Northeast region. Chandigarh, as the important Union Territory and shared capital city, houses regional offices of all major banks serving both Haryana and Punjab efficiently. Bank clerks are trained in customer relationship management, complaint resolution, and digital banking tools to serve an increasingly tech-savvy customer base. Many aspirants from Haryana's cities and towns including Rohtak, Hisar, Karnal, Ambala, and Faridabad clear the IBPS clerk examination every year and secure stable government banking employment.",
  },
  {
    id: "rail-en-1",
    title: "RRB NTPC Passage 1",
    category: "Railway",
    language: "English",
    text: "Indian Railways is one of the largest and most complex railway networks in the entire world and remains a major employer of the Government of India providing livelihoods to millions of families across the country. The Railway Recruitment Board conducts highly competitive examinations for Non-Technical Popular Categories posts including junior clerk, accounts assistant, traffic assistant, goods guard, station master, and senior commercial apprentice roles at various pay levels. The NTPC typing test specifically requires candidates to demonstrate a speed of at least thirty words per minute in English or twenty-five words per minute in Hindi with a minimum of eighty-five percent accuracy to qualify for appointment. Railway employees across all departments work tirelessly across all states and union territories ensuring safe, reliable, and efficient transportation for millions of passengers and freight every single day throughout the year. Haryana enjoys excellent rail connectivity with major railway stations at Rohtak, Hisar, Karnal, Kurukshetra, Ambala Cantonment, and Panipat handling significant passenger and freight traffic. Gurugram and Faridabad on the outskirts of Delhi are efficiently served by the suburban metro and rail networks providing rapid commuting options. Indian Railways has been modernizing at an unprecedented rapid pace with complete electrification of the network, introduction of Vande Bharat high-speed trains, digital ticketing systems, and improved passenger amenities at stations. The dedicated freight corridor project aims to separate freight traffic from passenger trains significantly improving speeds and operational efficiency of the national rail network.",
  },
  {
    id: "court-en-1",
    title: "High Court Passage 1",
    category: "Court",
    language: "English",
    text: "The independent judiciary is the ultimate guardian of the Constitution and the fundamental rights of every citizen of India ensuring that no one is above the law including the government itself. High Courts established in each state serve as the highest courts of appeal at the state level handling criminal, civil, constitutional, and writ jurisdiction matters with utmost seriousness and impartiality. The Supreme Court of India located on Bhagwan Das Road in New Delhi is the apex judicial body with final jurisdiction over all courts in the country and its judgments are binding on all lower courts. Court stenographers and typists must possess excellent and reliable typing skills with very strict accuracy requirements since errors in legal documents and court orders can have serious consequences for litigants. The minimum speed requirement for court typing tests is typically thirty-five words per minute with a minimum of ninety-five percent accuracy reflecting the high standards required in judicial administration. Legal vocabulary, Latin legal maxims and phrases, and formal precise English must be thoroughly mastered by candidates aspiring for court typing and steno positions. The Punjab and Haryana High Court located at the beautiful city of Chandigarh serves the entire populations of both Punjab and Haryana states and handles hundreds of thousands of cases annually. Court modernization programs under the e-Courts Mission Mode Project have introduced e-filing systems, video conferencing for hearings, and comprehensive digital case management to significantly improve judicial efficiency and reduce pendency. The rule of law, equal justice, and universal access to an independent judiciary are fundamental pillars of Indian democracy as solemnly enshrined in our Constitution.",
  },
  {
    id: "haryana-en-1",
    title: "HSSC Passage 1",
    category: "Haryana",
    language: "English",
    text: "Haryana is one of the most prosperous and progressive states of India, especially known for its remarkable contributions to agriculture, sports excellence, and rapid industrial development. The Haryana Staff Selection Commission conducts recruitment examinations for various state government positions including clerks, patwaris, police constables, teachers, and other administrative staff. The state's major cities of Rohtak, Hisar, Karnal, Gurugram, Faridabad, Kurukshetra, and Ambala are significant centers of economic, educational, and cultural activity. Haryana has been a cradle of numerous national and international sports champions, particularly excelling in wrestling, boxing, athletics, and hockey at Olympic and Commonwealth Games. Gurugram has dramatically emerged as a leading information technology, fintech, and financial services hub attracting massive investments from top global technology companies and startups. Faridabad is recognized as one of the largest and most important industrial cities in the entire North India region producing automobiles, engineering goods, and consumer products. Karnal is internationally famous for its pioneering contributions to agricultural research, paddy development, and the dairy sector producing high-quality milk and dairy products. Panipat, historically famous for three decisive and epoch-making battles, has today become an important textile manufacturing center known for its recycled fabric and blanket industry. The state government under various centrally-sponsored and state schemes has been systematically working to provide quality primary and secondary education, accessible healthcare facilities, and modern infrastructure to all its citizens in urban and rural areas alike. Haryana leads the country in per capita income among all major states and continues to attract investment in manufacturing, logistics, real estate, and services sectors.",
  },
  {
    id: "haryana-en-2",
    title: "HSSC Passage 2",
    category: "Haryana",
    language: "English",
    text: "The administrative structure of Haryana state is efficiently divided into twenty-two districts, each with its own district headquarters, sub-divisions, tehsils, and a well-organized administrative machinery to deliver governance at the grassroots level. The state capital Chandigarh is a Union Territory shared jointly with Punjab and serves simultaneously as the seat of government for both state administrations. Panchkula, a well-planned modern city adjacent to Chandigarh on the eastern side, houses many important state government offices, high court benches, and serves as a significant administrative hub of the region. The Haryana Civil Services and Allied Services examination conducted by the Haryana Public Service Commission is one of the most competitive state-level examinations attracting tens of thousands of aspirants from across the state and neighboring regions every year. Agriculture forms the absolute economic backbone of Haryana with major cash crops like wheat, paddy rice, mustard seed, sugarcane, and seasonal vegetables cultivated across vast agricultural tracts benefiting from canal irrigation. The Yamuna and Ghaggar rivers along with an extensively developed canal network provide reliable irrigation water to agricultural lands across most districts of the state throughout the growing seasons. Major industrial estates in Manesar, Bawal, Kundli, Dharuhera, and Rewari contribute significantly to the national manufacturing output especially in automobiles, auto-components, and electronics. Haryana has also emerged as a major destination for logistics and warehousing infrastructure owing to its strategic location connecting Delhi with the rest of North India. Young people from all districts of Haryana are increasingly pursuing higher education, competitive examinations, and entrepreneurship opportunities creating a dynamic and aspirational society.",
  },
  {
    id: "steno-en-1",
    title: "Steno Transcription Passage",
    category: "Steno",
    language: "English",
    text: "Stenography remains an absolutely essential and irreplaceable skill for government offices, legislative bodies, and judicial institutions that handle high-level correspondence, important proceedings, and official records requiring verbatim accuracy. Stenographers working at Grade C and Grade D levels are posted in central government ministries, attached departments, subordinate offices, public sector undertakings, and constitutional bodies throughout the country performing critical documentation work. The shorthand speed dictation test is conducted at one hundred and eighty words per minute for the more senior Grade C positions and one hundred and sixty words per minute for Grade D positions as per official SSC examination guidelines. Transcription of the dictated matter must be carefully completed within fifty minutes for English language passages typed on a desktop computer at the examination center. The accuracy of transcription is evaluated very strictly by trained examiners and errors beyond the officially permissible limit inevitably lead to disqualification of the candidate from that particular examination. Systematic practice of either Pitman or Gregg shorthand systems combined with regular computer typing practice is absolutely essential for all steno aspirants seeking government employment. Parliamentary proceedings in Lok Sabha and Rajya Sabha, Supreme Court and High Court hearings, high-level ministerial conferences, and important committee meetings all require the professional services of highly skilled stenographers at all times. The national capital New Delhi along with other major administrative centers including Chandigarh, Mumbai, and Kolkata host numerous central and state government offices where stenographic services are in constant and growing demand.",
  },
  {
    id: "haryana-hi-1",
    title: "हरियाणा SSC पैसेज 1",
    category: "Haryana",
    language: "Hindi",
    text: "हरियाणा एक समृद्ध और प्रगतिशील राज्य है जो भारत के उत्तर में दिल्ली से सटा हुआ स्थित है। इसकी राजधानी चंडीगढ़ है जो पंजाब की भी सांझी राजधानी है और एक आदर्श नियोजित शहर के रूप में विश्व में प्रसिद्ध है। रोहतक हरियाणा का एक प्रमुख शहर है जो उच्च शिक्षा, चिकित्सा सेवाओं और व्यापार का एक महत्वपूर्ण केंद्र है। हिसार में बड़े उद्योग, इस्पात संयंत्र और राष्ट्रीय स्तर के कृषि अनुसंधान संस्थान स्थित हैं। करनाल को किसानों, डेयरी विकास और पूसा कृषि अनुसंधान संस्थान के लिए विश्व स्तर पर जाना जाता है। गुरुग्राम एक तेजी से उभरते आधुनिक औद्योगिक और सूचना प्रौद्योगिकी केंद्र के रूप में देश-विदेश में पहचान बना चुका है। फरीदाबाद उत्तर भारत के सबसे बड़े और महत्वपूर्ण औद्योगिक शहरों में से एक है जहाँ हजारों कारखाने और उद्यम स्थापित हैं। कुरुक्षेत्र पौराणिक महाभारत की पवित्र भूमि है जहाँ भगवान श्रीकृष्ण ने अर्जुन को अमर गीता का उपदेश दिया था। अम्बाला एक महत्वपूर्ण रेलवे जंक्शन और प्रमुख सैन्य केंद्र है जो देश की रक्षा में अहम भूमिका निभाता है। पानीपत तीन ऐतिहासिक निर्णायक युद्धों का स्थल रहा है और आज वस्त्र उद्योग और रीसाइक्लिंग के लिए राष्ट्रीय स्तर पर प्रसिद्ध है। हरियाणा सरकार ने किसानों की आय दोगुनी करने और ग्रामीण विकास के लिए अनेक महत्वाकांक्षी योजनाएं शुरू की हैं। राज्य में शिक्षा, स्वास्थ्य और बुनियादी ढाँचे के विकास पर विशेष ध्यान दिया जा रहा है। हरियाणा के युवा खेलों, सेना और प्रशासनिक सेवाओं में देश भर में नाम रोशन कर रहे हैं।",
  },
  {
    id: "ssc-hi-1",
    title: "SSC हिंदी पैसेज 1",
    category: "SSC",
    language: "Hindi",
    text: "भारत सरकार के विभिन्न मंत्रालयों, विभागों और संलग्न कार्यालयों में लिपिक और डेटा एंट्री ऑपरेटर पदों के लिए टाइपिंग परीक्षा अनिवार्य और महत्वपूर्ण है। कर्मचारी चयन आयोग प्रतिवर्ष लाखों उम्मीदवारों की भर्ती प्रक्रिया संचालित करता है जिसमें टाइपिंग परीक्षा एक निर्णायक भूमिका निभाती है। हिंदी टाइपिंग के लिए मंगल या यूनिकोड फ़ॉन्ट का उपयोग आधिकारिक रूप से किया जाता है। न्यूनतम गति पच्चीस शब्द प्रति मिनट और शुद्धता पचासी प्रतिशत निर्धारित की गई है। भारत की संसद नई दिल्ली में स्थित है और देश का सर्वोच्च विधायी निकाय है जो देश के लिए महत्वपूर्ण कानून बनाती है। राष्ट्रपति भवन में देश के माननीय राष्ट्रपति निवास करते हैं और यह भवन भारत की राजनैतिक शक्ति का प्रतीक है। संविधान प्रत्येक भारतीय नागरिक को मौलिक अधिकार और कर्तव्य प्रदान करता है। गणतंत्र दिवस छब्बीस जनवरी को पूरे देश में अत्यंत उत्साह और गर्व के साथ मनाया जाता है। स्वतंत्रता दिवस पंद्रह अगस्त को राष्ट्रीय ध्वज फहराकर और देशभक्ति कार्यक्रमों के साथ मनाया जाता है। डिजिटल इंडिया कार्यक्रम के अंतर्गत सरकारी सेवाओं को ऑनलाइन उपलब्ध कराया जा रहा है। हरियाणा, पंजाब, उत्तर प्रदेश और राजस्थान से बड़ी संख्या में उम्मीदवार एसएससी परीक्षाओं में सफलता प्राप्त करते हैं। सरकारी सेवा न केवल स्थिर आजीविका प्रदान करती है बल्कि देश की सेवा का भी अवसर देती है।",
  },
  {
    id: "bank-hi-1",
    title: "बैंक हिंदी पैसेज",
    category: "Banking",
    language: "Hindi",
    text: "भारतीय बैंकिंग क्षेत्र देश की अर्थव्यवस्था का एक अत्यंत महत्वपूर्ण और मजबूत स्तंभ है जो करोड़ों नागरिकों को वित्तीय सेवाएं प्रदान करता है। भारतीय स्टेट बैंक देश का सबसे बड़ा और सबसे पुराना सार्वजनिक क्षेत्र का बैंक है जिसकी शाखाएं देश के हर कोने में गांव और शहर दोनों में स्थित हैं। बैंक परीक्षाओं में हिंदी टाइपिंग तीस शब्द प्रति मिनट की न्यूनतम गति से करना आवश्यक है और शुद्धता नब्बे प्रतिशत से ऊपर होनी चाहिए। जन धन योजना के माध्यम से सरकार ने करोड़ों गरीब और ग्रामीण नागरिकों को औपचारिक बैंकिंग सुविधा से जोड़ने में ऐतिहासिक सफलता प्राप्त की है। डिजिटल बैंकिंग, मोबाइल बैंकिंग और यूपीआई भुगतान प्रणाली ने लोगों के लिए बैंकिंग सेवाओं का उपयोग अत्यंत सरल और सुविधाजनक बना दिया है। मुंबई देश की वित्तीय राजधानी है जहाँ भारतीय रिजर्व बैंक का मुख्यालय और बॉम्बे स्टॉक एक्सचेंज स्थित हैं। चंडीगढ़, गुरुग्राम और फरीदाबाद में बैंकिंग और वित्तीय सेवाओं की गतिविधियाँ तेजी से बढ़ रही हैं। आईबीपीएस परीक्षा के माध्यम से बैंक में नौकरी पाना लाखों युवाओं का सपना है। बैंक कर्मचारियों को ग्राहक सेवा, कंप्यूटर संचालन और टाइपिंग में दक्षता होना अनिवार्य है।",
  },
  {
    id: "haryana-hi-2",
    title: "हरियाणा हारटन पैसेज",
    category: "Haryana",
    language: "Hindi",
    text: "हरियाणा सरकार की हारटन टंकण परीक्षा में टंकण गति की गणना स्ट्रोक के आधार पर की जाती है जो अन्य परीक्षाओं से अलग और विशिष्ट पद्धति है। इस परीक्षा प्रणाली में एक शब्द पाँच स्ट्रोक के बराबर माना जाता है जो अंतर्राष्ट्रीय टंकण मानकों पर आधारित है। सकल गति की गणना कुल स्ट्रोक को पाँच से विभाजित करके और उसके बाद समय को मिनटों में विभाजित करके की जाती है। गलतियों की कुल संख्या को पाँच से विभाजित करके प्राप्त संख्या को सकल गति से घटाया जाता है जिससे अंतिम निवल गति प्राप्त होती है। हारटन परीक्षा में उत्तीर्ण होने के लिए न्यूनतम पच्चीस शब्द प्रति मिनट की निवल गति और पचासी प्रतिशत शुद्धता आवश्यक है। हरियाणा के सभी जिलों में सरकारी टंकण प्रशिक्षण केंद्र स्थापित किए गए हैं जहाँ युवा निशुल्क या न्यूनतम शुल्क पर प्रशिक्षण प्राप्त कर सकते हैं। रोहतक, हिसार, करनाल, गुरुग्राम, फरीदाबाद, कुरुक्षेत्र और सिरसा में आधुनिक टंकण प्रशिक्षण केंद्र उपलब्ध हैं। हरियाणा लोक सेवा आयोग और हरियाणा कर्मचारी चयन आयोग राज्य सरकार के विभिन्न विभागों में भर्ती के लिए नियमित परीक्षाएं आयोजित करते हैं। नियमित अभ्यास और सही तकनीक से टंकण गति में निरंतर सुधार संभव है और सफलता की संभावना बढ़ती है।",
  },
  {
    id: "court-hi-1",
    title: "न्यायालय हिंदी पैसेज",
    category: "Court",
    language: "Hindi",
    text: "भारत में न्यायपालिका संविधान की सर्वोच्च रक्षक है और प्रत्येक नागरिक के मौलिक अधिकारों की संरक्षक भी है। देश में न्यायिक व्यवस्था तीन स्तरों में संगठित है जिसमें जिला न्यायालय, उच्च न्यायालय और सर्वोच्च न्यायालय प्रमुख हैं। उच्च न्यायालय अपने अपने राज्य में अपील की सर्वोच्च अदालत के रूप में कार्य करते हैं और संवैधानिक मामलों की सुनवाई करते हैं। सर्वोच्च न्यायालय नई दिल्ली में स्थित भारत का सर्वोच्च न्यायिक निकाय है जिसके निर्णय देशभर के सभी न्यायालयों पर बाध्यकारी हैं। न्यायालयों में आशुलिपिकों और लिपिकों के लिए टाइपिंग और आशुलिपि परीक्षा अनिवार्य रूप से ली जाती है। हिंदी टाइपिंग की न्यूनतम गति पच्चीस शब्द प्रति मिनट से अधिक होनी चाहिए और शुद्धता नब्बे प्रतिशत से ऊपर होनी अनिवार्य है। पंजाब और हरियाणा उच्च न्यायालय चंडीगढ़ में स्थित है और यह दोनों राज्यों के लाखों नागरिकों को न्याय प्रदान करता है। न्यायालयों के आधुनिकीकरण कार्यक्रम के तहत ई-फाइलिंग, वीडियो कॉन्फ्रेंसिंग और डिजिटल केस प्रबंधन की सुविधा प्रदान की गई है। विधिक सेवा प्राधिकरण गरीब और कमजोर वर्गों को निशुल्क कानूनी सहायता प्रदान करता है।",
  },
  {
    id: "rail-hi-1",
    title: "रेलवे हिंदी पैसेज",
    category: "Railway",
    language: "Hindi",
    text: "भारतीय रेलवे विश्व के सबसे बड़े रेल नेटवर्क में से एक है और यह करोड़ों भारतीयों के जीवन की एक अपरिहार्य आवश्यकता है। भारतीय रेलवे प्रतिदिन लाखों यात्रियों और लाखों टन माल का परिवहन करती है जो देश की अर्थव्यवस्था के लिए बेहद जरूरी है। रेलवे भर्ती बोर्ड विभिन्न पदों जैसे क्लर्क, टीटीई, गार्ड और स्टेशन मास्टर पर भर्ती के लिए परीक्षाएं आयोजित करता है। एनटीपीसी परीक्षा में हिंदी टाइपिंग की आवश्यकता होती है और न्यूनतम पच्चीस शब्द प्रति मिनट की गति और पचासी प्रतिशत शुद्धता अनिवार्य है। हरियाणा में रोहतक, हिसार, करनाल, कुरुक्षेत्र, अम्बाला और पानीपत प्रमुख रेलवे स्टेशन हैं जहाँ से हजारों यात्री प्रतिदिन यात्रा करते हैं। गुरुग्राम और फरीदाबाद दिल्ली के उपनगरीय रेल और मेट्रो नेटवर्क से जुड़े हुए हैं। भारतीय रेलवे के आधुनिकीकरण में विद्युतीकरण, वंदे भारत हाई-स्पीड ट्रेनें और यात्री सुविधाओं में सुधार शामिल हैं। समर्पित माल ढुलाई गलियारा परियोजना रेलवे की क्षमता और कुशलता में क्रांतिकारी सुधार लाएगी। रेलवे में नौकरी पाना लाखों युवाओं का सपना है और इसके लिए टाइपिंग कौशल बहुत महत्वपूर्ण है।",
  },
  {
    id: "steno-hi-1",
    title: "स्टेनो हिंदी पैसेज",
    category: "Steno",
    language: "Hindi",
    text: "स्टेनोग्राफर केंद्र और राज्य सरकार के कार्यालयों में अत्यंत महत्वपूर्ण और जिम्मेदारी भरी भूमिका निभाते हैं। हिंदी आशुलिपि और हिंदी टाइपिंग दोनों में पूर्ण दक्षता एक कुशल सरकारी स्टेनोग्राफर के लिए अनिवार्य है। एसएससी स्टेनो ग्रेड सी और ग्रेड डी परीक्षाओं में आशुलिपि श्रुतलेख और उसके बाद कंप्यूटर पर प्रतिलेखन दोनों चरणों की परीक्षा होती है। हिंदी प्रतिलेखन के लिए पैंसठ मिनट का समय दिया जाता है जबकि अंग्रेजी के लिए पचास मिनट निर्धारित हैं। मंगल यूनिकोड फ़ॉन्ट का उपयोग हिंदी टाइपिंग परीक्षाओं में सरकारी मानक के अनुसार किया जाता है। केंद्र सरकार के मंत्रालयों और विभागों में हिंदी स्टेनोग्राफरों की भारी और निरंतर मांग बनी रहती है। दिल्ली, चंडीगढ़, मुंबई और अन्य बड़े शहरों में केंद्र सरकार के अनेक कार्यालय हैं जहाँ स्टेनोग्राफरों को नियमित रूप से नियुक्त किया जाता है। हरियाणा, उत्तर प्रदेश, राजस्थान और मध्य प्रदेश से बड़ी संख्या में युवा स्टेनो परीक्षाओं में सफलता प्राप्त करते हैं। नियमित अभ्यास और समर्पण से आशुलिपि और टाइपिंग में निपुणता प्राप्त की जा सकती है।",
  },
];

const CATEGORIES = [
  "All",
  "SSC",
  "Banking",
  "Railway",
  "Haryana",
  "Court",
  "Steno",
];
const MINUTE_OPTIONS = [1, 2, 3, 5, 10, 15, 20];

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

interface WordResult {
  typed: string;
  expected: string;
  correct: boolean;
}

export function PracticePage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLanguage, setSelectedLanguage] = useState<
    "All" | "English" | "Hindi"
  >("All");
  const [selectedSet, setSelectedSet] = useState<PracticeSet | null>(null);
  const [typed, setTyped] = useState("");
  const [testState, setTestState] = useState<PracticeState>("idle");
  const [startTime, setStartTime] = useState(0);
  const [timeLimit, setTimeLimit] = useState(5);
  const [timeRemaining, setTimeRemaining] = useState(5 * 60);
  const [backspaceAllowed, setBackspaceAllowed] = useState(true);
  const [result, setResult] = useState<{
    wpm: number;
    accuracy: number;
    wordResults: WordResult[];
    elapsed: number;
  } | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const typedRef = useRef(typed);
  const startTimeRef = useRef(startTime);
  const selectedSetRef = useRef(selectedSet);

  typedRef.current = typed;
  startTimeRef.current = startTime;
  selectedSetRef.current = selectedSet;

  const filtered = PRACTICE_SETS.filter((p) => {
    const catMatch =
      selectedCategory === "All" || p.category === selectedCategory;
    const langMatch =
      selectedLanguage === "All" || p.language === selectedLanguage;
    return catMatch && langMatch;
  });

  const buildWordResults = (
    typedText: string,
    originalText: string,
  ): WordResult[] => {
    const typedWords = typedText.trim().split(/\s+/).filter(Boolean);
    const expectedWords = originalText.trim().split(/\s+/).filter(Boolean);
    const results: WordResult[] = [];
    const maxLen = Math.max(typedWords.length, expectedWords.length);
    for (let i = 0; i < maxLen; i++) {
      const t = typedWords[i] ?? "";
      const e = expectedWords[i] ?? "";
      if (t) {
        results.push({ typed: t, expected: e, correct: t === e });
      }
    }
    return results;
  };

  const finishTest = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    const elapsed = (Date.now() - startTimeRef.current) / 1000;
    const elapsedMin = elapsed / 60;
    const text = selectedSetRef.current?.text ?? "";
    const currentTyped = typedRef.current;
    const correctChars = currentTyped
      .split("")
      .filter((c, i) => c === text[i]).length;
    const wpm = elapsedMin > 0 ? Math.round(correctChars / 5 / elapsedMin) : 0;
    const accuracy =
      currentTyped.length > 0
        ? Math.round((correctChars / currentTyped.length) * 100)
        : 0;
    const wordResults = buildWordResults(currentTyped, text);
    setResult({ wpm, accuracy, wordResults, elapsed });
    setTestState("finished");
  };

  const finishTestRef = useRef(finishTest);
  finishTestRef.current = finishTest;

  // countdown timer
  useEffect(() => {
    if (testState === "running") {
      timerRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            finishTestRef.current();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [testState]);

  const startTest = () => {
    setTimeRemaining(timeLimit * 60);
    setTestState("running");
    setStartTime(Date.now());
    startTimeRef.current = Date.now();
    setTimeout(() => textareaRef.current?.focus(), 50);
  };

  const resetPractice = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setTyped("");
    setTestState("idle");
    setResult(null);
    setTimeRemaining(timeLimit * 60);
  };

  const selectSet = (set: PracticeSet) => {
    setSelectedSet(set);
    if (timerRef.current) clearInterval(timerRef.current);
    setTyped("");
    setTestState("idle");
    setResult(null);
    setTimeRemaining(timeLimit * 60);
  };

  const handleTimeLimitChange = (val: number) => {
    setTimeLimit(val);
    if (testState === "idle") setTimeRemaining(val * 60);
  };

  const handleTyping = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (testState !== "running") return;
    const value = e.target.value;
    const text = selectedSet?.text ?? "";
    if (value.length > text.length) return;
    setTyped(value);
    typedRef.current = value;
    if (value.length === text.length) finishTest();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (!backspaceAllowed && e.key === "Backspace") {
      e.preventDefault();
    }
  };

  const liveWpm = () => {
    if (testState !== "running" || !startTime) return 0;
    const elapsedMin = (Date.now() - startTime) / 60000;
    const correctChars = typed
      .split("")
      .filter((c, i) => c === (selectedSet?.text ?? "")[i]).length;
    return elapsedMin > 0 ? Math.round(correctChars / 5 / elapsedMin) : 0;
  };

  const liveAcc = () => {
    if (!typed.length) return 100;
    const text = selectedSet?.text ?? "";
    const correctChars = typed.split("").filter((c, i) => c === text[i]).length;
    return Math.round((correctChars / typed.length) * 100);
  };

  const isTimerRed = timeRemaining < 30 && testState === "running";

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
            <span style={{ color: "#FFD700", fontSize: 20 }}>📚</span>
            <div>
              <div
                style={{
                  color: "#fff",
                  fontWeight: 800,
                  fontSize: 15,
                  letterSpacing: 0.5,
                }}
              >
                PRACTICE SETS
              </div>
              <div style={{ color: "#90CAF9", fontSize: 10 }}>
                100+ Exam-wise Paragraphs · SSC, Banking, Railway, Haryana,
                Court, Steno
              </div>
            </div>
          </div>
          <a
            href="/"
            data-ocid="practice.link"
            style={{
              background: "rgba(255,255,255,0.2)",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.3)",
              padding: "4px 12px",
              borderRadius: 3,
              fontSize: 11,
              cursor: "pointer",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            ← Home
          </a>
        </div>

        {/* Filter Bar */}
        <div
          style={{
            background: "#1565C0",
            padding: "5px 10px",
            display: "flex",
            gap: 4,
            alignItems: "center",
            flexWrap: "wrap",
            borderBottom: "2px solid #0D47A1",
          }}
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              data-ocid="practice.tab"
              style={{
                fontSize: 10,
                fontWeight: 700,
                padding: "3px 10px",
                borderRadius: 3,
                background: selectedCategory === cat ? "#fff" : "transparent",
                color: selectedCategory === cat ? "#1565C0" : "#fff",
                border:
                  selectedCategory === cat
                    ? "none"
                    : "1px solid rgba(255,255,255,0.3)",
                cursor: "pointer",
                lineHeight: "18px",
                height: 24,
                display: "inline-flex",
                alignItems: "center",
              }}
            >
              {cat}
            </button>
          ))}
          <div
            style={{
              marginLeft: 12,
              display: "flex",
              gap: 4,
              alignItems: "center",
            }}
          >
            {(["All", "English", "Hindi"] as const).map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => setSelectedLanguage(lang)}
                data-ocid="practice.tab"
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  padding: "3px 8px",
                  borderRadius: 3,
                  background:
                    selectedLanguage === lang ? "#f57c00" : "transparent",
                  color: "#fff",
                  border:
                    selectedLanguage === lang
                      ? "none"
                      : "1px solid rgba(255,255,255,0.3)",
                  cursor: "pointer",
                  lineHeight: "18px",
                  height: 24,
                  display: "inline-flex",
                  alignItems: "center",
                }}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div
          style={{
            display: "flex",
            height:
              "calc(min(100vw - 16px, calc((100vh - 16px) * 16 / 9)) * 9 / 16 - 100px)",
            minHeight: 420,
            overflow: "hidden",
          }}
        >
          {/* LEFT: Paragraph List */}
          <div
            style={{
              width: "30%",
              minWidth: 180,
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
              {filtered.length} PARAGRAPHS AVAILABLE
            </div>
            <ParagraphSelector
              paragraphs={filtered.map((s) => ({
                id: s.id,
                title: s.title,
                text: s.text,
                category: s.category,
                language: s.language,
              }))}
              selectedId={selectedSet?.id ?? null}
              onSelect={(id) => {
                const found = PRACTICE_SETS.find((s) => s.id === id);
                if (found) selectSet(found);
              }}
            />
          </div>

          {/* RIGHT: Practice Area */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              background: "#f5f5f5",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {!selectedSet ? (
              <div
                style={{
                  textAlign: "center",
                  padding: 40,
                  color: "#888",
                  flex: 1,
                }}
                data-ocid="practice.empty_state"
              >
                <div style={{ fontSize: 40, marginBottom: 12 }}>📝</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#555" }}>
                  Select a Practice Set
                </div>
                <div style={{ fontSize: 11, color: "#aaa", marginTop: 4 }}>
                  Choose a paragraph from the left panel to begin practice
                </div>
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                {/* Title bar */}
                <div
                  style={{
                    background: "#1565C0",
                    color: "#fff",
                    padding: "6px 12px",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    flexShrink: 0,
                  }}
                >
                  <div style={{ fontWeight: 800, fontSize: 13 }}>
                    {selectedSet.title}
                  </div>
                  <div style={{ fontSize: 10, opacity: 0.85, marginLeft: 4 }}>
                    {selectedSet.category} · {selectedSet.language} ·{" "}
                    {selectedSet.text.split(" ").length} words
                  </div>
                </div>

                {/* ===== TOP CONTROLS BAR ===== */}
                <div
                  style={{
                    background: "#fff",
                    borderBottom: "2px solid #e3eaf7",
                    padding: "6px 10px",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    flexWrap: "nowrap",
                    flexShrink: 0,
                    overflowX: "auto",
                  }}
                >
                  {/* Backspace Toggle */}
                  <button
                    type="button"
                    onClick={() => setBackspaceAllowed((v) => !v)}
                    data-ocid="practice.toggle"
                    title={
                      backspaceAllowed
                        ? "Backspace ON – click to disable"
                        : "Backspace OFF – click to enable"
                    }
                    style={{
                      background: backspaceAllowed ? "#e8f5e9" : "#ffebee",
                      color: backspaceAllowed ? "#2e7d32" : "#c62828",
                      border: `1px solid ${backspaceAllowed ? "#a5d6a7" : "#ef9a9a"}`,
                      borderRadius: 3,
                      padding: "0 8px",
                      fontSize: 10,
                      fontWeight: 700,
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                      height: 26,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 3,
                      flexShrink: 0,
                    }}
                  >
                    {backspaceAllowed ? "✓" : "✗"} Backspace
                  </button>

                  {/* Minutes Selector */}
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 3,
                      flexShrink: 0,
                    }}
                  >
                    <span style={{ fontSize: 11, color: "#555" }}>⏱</span>
                    <select
                      value={timeLimit}
                      onChange={(e) =>
                        handleTimeLimitChange(Number(e.target.value))
                      }
                      disabled={testState === "running"}
                      data-ocid="practice.select"
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        border: "1px solid #bbb",
                        borderRadius: 3,
                        padding: "0 4px",
                        background:
                          testState === "running" ? "#f5f5f5" : "#fff",
                        cursor:
                          testState === "running" ? "not-allowed" : "pointer",
                        height: 26,
                        color: "#333",
                      }}
                    >
                      {MINUTE_OPTIONS.map((m) => (
                        <option key={m} value={m}>
                          {m} min
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Divider */}
                  <div
                    style={{
                      width: 1,
                      height: 20,
                      background: "#ddd",
                      flexShrink: 0,
                    }}
                  />

                  {/* Start (idle) */}
                  {testState === "idle" && (
                    <button
                      type="button"
                      onClick={startTest}
                      data-ocid="practice.primary_button"
                      style={{
                        background: "#1565C0",
                        color: "#fff",
                        border: "none",
                        borderRadius: 3,
                        padding: "0 12px",
                        fontSize: 11,
                        fontWeight: 700,
                        cursor: "pointer",
                        height: 26,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 4,
                        flexShrink: 0,
                        whiteSpace: "nowrap",
                      }}
                    >
                      ▶ Start
                    </button>
                  )}

                  {/* Stop (running) */}
                  {testState === "running" && (
                    <button
                      type="button"
                      onClick={finishTest}
                      data-ocid="practice.secondary_button"
                      style={{
                        background: "#f57c00",
                        color: "#fff",
                        border: "none",
                        borderRadius: 3,
                        padding: "0 12px",
                        fontSize: 11,
                        fontWeight: 700,
                        cursor: "pointer",
                        height: 26,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 4,
                        flexShrink: 0,
                        whiteSpace: "nowrap",
                      }}
                    >
                      ⏹ Stop
                    </button>
                  )}

                  {/* Retry (finished) */}
                  {testState === "finished" && (
                    <button
                      type="button"
                      onClick={resetPractice}
                      data-ocid="practice.primary_button"
                      style={{
                        background: "#2e7d32",
                        color: "#fff",
                        border: "none",
                        borderRadius: 3,
                        padding: "0 12px",
                        fontSize: 11,
                        fontWeight: 700,
                        cursor: "pointer",
                        height: 26,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 4,
                        flexShrink: 0,
                        whiteSpace: "nowrap",
                      }}
                    >
                      ↺ Retry
                    </button>
                  )}

                  {/* Reset (not idle) */}
                  {testState !== "idle" && (
                    <button
                      type="button"
                      onClick={resetPractice}
                      data-ocid="practice.close_button"
                      style={{
                        background: "#ffebee",
                        color: "#c62828",
                        border: "1px solid #ef9a9a",
                        borderRadius: 3,
                        padding: "0 8px",
                        fontSize: 11,
                        fontWeight: 700,
                        cursor: "pointer",
                        height: 26,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 3,
                        flexShrink: 0,
                        whiteSpace: "nowrap",
                      }}
                    >
                      ✕ Reset
                    </button>
                  )}

                  {/* Spacer */}
                  <div style={{ flex: 1, minWidth: 4 }} />

                  {/* Timer */}
                  <div
                    style={{
                      background: isTimerRed ? "#ffebee" : "#f5f5f5",
                      border: `1px solid ${isTimerRed ? "#ef9a9a" : "#ddd"}`,
                      borderRadius: 3,
                      padding: "0 8px",
                      textAlign: "center",
                      flexShrink: 0,
                      height: 26,
                      display: "inline-flex",
                      alignItems: "center",
                      minWidth: 52,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 800,
                        color: isTimerRed ? "#c62828" : "#333",
                        fontFamily: "monospace",
                        letterSpacing: 1,
                      }}
                    >
                      {formatTime(timeRemaining)}
                    </span>
                  </div>

                  {/* WPM badge */}
                  <div
                    style={{
                      background: "#e8f0fe",
                      border: "1px solid #90CAF9",
                      borderRadius: 3,
                      padding: "0 8px",
                      flexShrink: 0,
                      height: 26,
                      display: "inline-flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      minWidth: 44,
                    }}
                  >
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 800,
                        color: "#1565C0",
                        lineHeight: 1,
                      }}
                    >
                      {testState === "running"
                        ? liveWpm()
                        : (result?.wpm ?? "—")}
                    </div>
                    <div style={{ fontSize: 8, color: "#888", lineHeight: 1 }}>
                      WPM
                    </div>
                  </div>

                  {/* Accuracy badge */}
                  <div
                    style={{
                      background: "#e8f5e9",
                      border: "1px solid #a5d6a7",
                      borderRadius: 3,
                      padding: "0 8px",
                      flexShrink: 0,
                      height: 26,
                      display: "inline-flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      minWidth: 44,
                    }}
                  >
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 800,
                        color: "#2e7d32",
                        lineHeight: 1,
                      }}
                    >
                      {testState === "running"
                        ? `${liveAcc()}%`
                        : result
                          ? `${result.accuracy}%`
                          : "—"}
                    </div>
                    <div style={{ fontSize: 8, color: "#888", lineHeight: 1 }}>
                      ACC
                    </div>
                  </div>
                </div>

                {/* ===== TYPING AREA ===== */}
                <div
                  style={{
                    flex: 1,
                    overflowY: "auto",
                    padding: 10,
                    display: "flex",
                    flexDirection: "column",
                    gap: 6,
                  }}
                >
                  {/* Passage Display */}
                  {testState !== "finished" && (
                    <div
                      style={{
                        background: "#fff",
                        border: "1px solid #ccc",
                        borderRadius: 4,
                        padding: "8px 10px",
                        height: 150,
                        overflowY: "auto",
                        fontFamily:
                          selectedSet.language === "Hindi"
                            ? "Mangal, Arial Unicode MS, sans-serif"
                            : "'Courier New', monospace",
                        fontSize: 14,
                        lineHeight: 2,
                      }}
                    >
                      {Array.from(selectedSet.text).map((char, pos) => {
                        let color = "#888";
                        let bg = "transparent";
                        if (pos < typed.length) {
                          color = typed[pos] === char ? "#16a34a" : "#dc2626";
                          if (typed[pos] !== char) bg = "#fee2e2";
                        } else if (pos === typed.length) {
                          color = "#1d4ed8";
                          bg = "#dbeafe";
                        }
                        return (
                          <span
                            key={`char-${pos}-${char}`}
                            style={{ color, background: bg }}
                          >
                            {char}
                          </span>
                        );
                      })}
                    </div>
                  )}

                  {/* Textarea */}
                  {testState !== "finished" && (
                    <textarea
                      ref={textareaRef}
                      value={typed}
                      onChange={handleTyping}
                      onKeyDown={handleKeyDown}
                      disabled={testState !== "running"}
                      placeholder={
                        testState === "idle"
                          ? "Click Start to begin typing..."
                          : "Type here..."
                      }
                      style={{
                        width: "100%",
                        height: 70,
                        fontFamily:
                          selectedSet.language === "Hindi"
                            ? "Mangal, Arial Unicode MS, sans-serif"
                            : "'Courier New', monospace",
                        fontSize: 14,
                        border:
                          testState === "running"
                            ? "2px solid #1565C0"
                            : "1px solid #ccc",
                        borderRadius: 4,
                        padding: "6px 8px",
                        resize: "none",
                        background:
                          testState === "running" ? "#fff" : "#f5f5f5",
                        outline: "none",
                        boxSizing: "border-box",
                      }}
                      data-ocid="practice.editor"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck={false}
                    />
                  )}

                  {/* Progress Bar */}
                  {testState !== "finished" && (
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 8 }}
                    >
                      <div
                        style={{
                          flex: 1,
                          background: "#e0e0e0",
                          borderRadius: 2,
                          height: 5,
                        }}
                      >
                        <div
                          style={{
                            background: "#1565C0",
                            height: "100%",
                            borderRadius: 2,
                            width: `${selectedSet.text.length > 0 ? Math.min((typed.length / selectedSet.text.length) * 100, 100) : 0}%`,
                            transition: "width 0.3s",
                          }}
                        />
                      </div>
                      <span
                        style={{
                          fontSize: 10,
                          color: "#888",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {typed.length}/{selectedSet.text.length}
                      </span>
                    </div>
                  )}

                  {/* ===== DETAILED RESULT PANEL ===== */}
                  {testState === "finished" && result && (
                    <div
                      data-ocid="practice.success_state"
                      style={{
                        background: "#fff",
                        border: "2px solid #1565C0",
                        borderRadius: 6,
                        overflow: "hidden",
                      }}
                    >
                      {/* Result Header */}
                      <div
                        style={{
                          background:
                            "linear-gradient(90deg, #1a237e 0%, #1565C0 100%)",
                          color: "#fff",
                          padding: "8px 14px",
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                        }}
                      >
                        <span style={{ fontSize: 18 }}>🎯</span>
                        <span
                          style={{
                            fontWeight: 800,
                            fontSize: 14,
                            letterSpacing: 0.5,
                          }}
                        >
                          RESULT SUMMARY
                        </span>
                      </div>

                      {/* Stats Row */}
                      <div
                        style={{
                          display: "flex",
                          gap: 0,
                          borderBottom: "1px solid #e3eaf7",
                        }}
                      >
                        {[
                          {
                            label: "WPM",
                            value: result.wpm,
                            color: "#1565C0",
                            bg: "#e8f0fe",
                          },
                          {
                            label: "Accuracy",
                            value: `${result.accuracy}%`,
                            color: "#2e7d32",
                            bg: "#e8f5e9",
                          },
                          {
                            label: "Time",
                            value: formatTime(Math.round(result.elapsed)),
                            color: "#6a1b9a",
                            bg: "#f3e5f5",
                          },
                          {
                            label: "✅ Correct",
                            value: result.wordResults.filter((w) => w.correct)
                              .length,
                            color: "#2e7d32",
                            bg: "#e8f5e9",
                          },
                          {
                            label: "❌ Wrong",
                            value: result.wordResults.filter((w) => !w.correct)
                              .length,
                            color: "#c62828",
                            bg: "#ffebee",
                          },
                        ].map((stat) => (
                          <div
                            key={stat.label}
                            style={{
                              flex: 1,
                              background: stat.bg,
                              padding: "10px 6px",
                              textAlign: "center",
                              borderRight: "1px solid #e3eaf7",
                            }}
                          >
                            <div
                              style={{
                                fontSize: 18,
                                fontWeight: 900,
                                color: stat.color,
                              }}
                            >
                              {stat.value}
                            </div>
                            <div
                              style={{
                                fontSize: 9,
                                color: "#777",
                                marginTop: 2,
                                fontWeight: 600,
                              }}
                            >
                              {stat.label}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Wrong Words */}
                      {result.wordResults.filter((w) => !w.correct).length >
                        0 && (
                        <div style={{ padding: "10px 14px" }}>
                          <div
                            style={{
                              fontSize: 11,
                              fontWeight: 800,
                              color: "#c62828",
                              marginBottom: 8,
                              letterSpacing: 0.5,
                              display: "flex",
                              alignItems: "center",
                              gap: 6,
                            }}
                          >
                            ❌ WRONG WORDS (
                            {
                              result.wordResults.filter((w) => !w.correct)
                                .length
                            }
                            )
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                              gap: 6,
                              maxHeight: 160,
                              overflowY: "auto",
                            }}
                          >
                            {result.wordResults
                              .filter((w) => !w.correct)
                              .map((w, idx) => (
                                <div
                                  key={`ww-${w.typed}-${w.expected}-${idx}`}
                                  style={{
                                    background: "#fff8f8",
                                    border: "1px solid #ffcdd2",
                                    borderRadius: 4,
                                    padding: "4px 8px",
                                    fontSize: 11,
                                  }}
                                >
                                  <span
                                    style={{
                                      color: "#c62828",
                                      fontWeight: 700,
                                    }}
                                  >
                                    "{w.typed}"
                                  </span>
                                  <span
                                    style={{ color: "#888", margin: "0 4px" }}
                                  >
                                    →
                                  </span>
                                  <span
                                    style={{
                                      color: "#2e7d32",
                                      fontWeight: 700,
                                    }}
                                  >
                                    "{w.expected}"
                                  </span>
                                </div>
                              ))}
                          </div>
                        </div>
                      )}

                      {/* Perfect score */}
                      {result.wordResults.filter((w) => !w.correct).length ===
                        0 && (
                        <div
                          style={{
                            padding: "12px 14px",
                            textAlign: "center",
                            color: "#2e7d32",
                            fontWeight: 700,
                            fontSize: 13,
                          }}
                        >
                          🏆 Perfect Score! All words typed correctly!
                        </div>
                      )}
                    </div>
                  )}
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
          <span>📚 {PRACTICE_SETS.length} Total Paragraphs</span>
          <span>🔍 Showing: {filtered.length}</span>
          <span style={{ marginLeft: "auto" }}>
            Category: {selectedCategory} · Language: {selectedLanguage}
          </span>
        </div>
      </div>
    </div>
  );
}

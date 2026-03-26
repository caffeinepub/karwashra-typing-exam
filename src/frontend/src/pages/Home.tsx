import type { LiveSessionPublic } from "@/backend";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EXAMS } from "@/data/exams";
import { useActor } from "@/hooks/useActor";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import {
  BookOpen,
  Building2,
  Gavel,
  GraduationCap,
  Landmark,
  MoreHorizontal,
  Train,
} from "lucide-react";
import { useState } from "react";

const EXAM_CATEGORIES = [
  {
    id: "ssc",
    label: "SSC CGL/CHSL",
    icon: GraduationCap,
    color: "text-red-600",
  },
  { id: "rrb", label: "RRB NTPC", icon: Train, color: "text-red-600" },
  {
    id: "state",
    label: "STATE GOVT",
    icon: Landmark,
    color: "text-orange-600",
  },
  { id: "court", label: "COURT EXAMS", icon: Gavel, color: "text-blue-700" },
  { id: "banking", label: "BANKING", icon: Building2, color: "text-green-700" },
  {
    id: "other",
    label: "OTHER EXAMS",
    icon: MoreHorizontal,
    color: "text-gray-600",
  },
];

const SESSION_OPTIONS = [
  { value: "en-10", label: "English 10-minute session" },
  { value: "hi-10", label: "Hindi 10-minute session" },
  { value: "en-5", label: "English 5-minute session" },
  { value: "hi-5", label: "Hindi 5-minute session" },
];

const SAMPLE_TEXT_EN =
  "The Staff Selection Commission conducts the Combined Higher Secondary Level examination every year for recruitment to various posts in Government of India. Candidates from Chandigarh, Rohtak, Hisar, Karnal and other cities of Haryana participate in large numbers. The examination tests typing speed and accuracy on computer. Practice daily to improve your words per minute and achieve success in the examination.";

const SAMPLE_TEXT_HI =
  "भारत सरकार के विभिन्न विभागों में भर्ती के लिए कर्मचारी चयन आयोग प्रतिवर्ष परीक्षाएं आयोजित करता है। चंडीगढ़, रोहतक, हिसार, करनाल और गुरुग्राम के अभ्यर्थी बड़ी संख्या में परीक्षा में भाग लेते हैं। कंप्यूटर पर टाइपिंग गति और सटीकता का परीक्षण किया जाता है।";

const MOCK_SESSIONS: LiveSessionPublic[] = [
  {
    roomId: "mock-1",
    examId: "ssc-chsl",
    examName: "SSC CGL Mock",
    timeLimit: BigInt(10),
    startTime: BigInt(Date.now()) * BigInt(1_000_000),
    isActive: false,
    participants: [],
  },
  {
    roomId: "mock-2",
    examId: "rrb-ntpc",
    examName: "RRB NTPC Mock",
    timeLimit: BigInt(10),
    startTime: BigInt(Date.now()) * BigInt(1_000_000),
    isActive: true,
    participants: [],
  },
];

type TabId =
  | "select-exam"
  | "start-test"
  | "pause"
  | "show-results"
  | "history"
  | "settings";

export function Home() {
  const navigate = useNavigate();
  const { actor, isFetching } = useActor();
  const [activeTab, setActiveTab] = useState<TabId>("select-exam");
  const [selectedCategory, setSelectedCategory] = useState("ssc");
  const [session, setSession] = useState("en-10");

  const sessionsQuery = useQuery<LiveSessionPublic[]>({
    queryKey: ["activeSessions-home"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getActiveLiveSessions();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 10000,
  });

  const liveSessions = sessionsQuery.data ?? MOCK_SESSIONS;
  const upcomingSessions = liveSessions.filter((s) => !s.isActive);
  const activeSessions = liveSessions.filter((s) => s.isActive);

  const handleTabClick = (tab: TabId) => {
    setActiveTab(tab);
    if (tab === "start-test") navigate({ to: "/exams" });
    else if (tab === "show-results" || tab === "history")
      navigate({ to: "/dashboard" });
  };

  const handleStartPractice = () => {
    const isHindi = session.startsWith("hi");
    const firstExam = EXAMS.find((e) =>
      isHindi ? e.language === "Hindi" : e.language === "English",
    );
    if (firstExam)
      navigate({ to: "/exam/$id/test", params: { id: firstExam.id } });
    else navigate({ to: "/exams" });
  };

  const sampleText = session.startsWith("hi") ? SAMPLE_TEXT_HI : SAMPLE_TEXT_EN;

  const getExamName = (examId: string) => {
    const exam = EXAMS.find((e) => e.id === examId);
    return exam?.name ?? examId.toUpperCase();
  };

  const formatTime = (createdAt: bigint) => {
    try {
      const ms = Number(createdAt) / 1_000_000;
      return new Date(ms).toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "09:00 PM";
    }
  };

  const TABS: { id: TabId; label: string }[] = [
    { id: "select-exam", label: "SELECT EXAM" },
    { id: "start-test", label: "START TEST" },
    { id: "pause", label: "PAUSE" },
    { id: "show-results", label: "SHOW RESULTS" },
    { id: "history", label: "HISTORY" },
    { id: "settings", label: "SETTINGS" },
  ];

  return (
    <div
      className="h-screen flex flex-col"
      style={{ fontFamily: "Arial, sans-serif" }}
    >
      {/* Blue Header Bar */}
      <div
        data-ocid="home.section"
        className="flex items-center justify-between px-4 py-2 flex-shrink-0"
        style={{ backgroundColor: "#1565C0" }}
      >
        <span className="text-white font-bold text-lg tracking-wide">
          KARWASHRA TYPING GOVT EXAM
        </span>
        <span className="text-white font-bold text-base">HOME PAGE</span>
      </div>

      {/* Tab Navigation */}
      <div
        className="flex flex-shrink-0"
        style={{ backgroundColor: "#0D1B3E" }}
      >
        {TABS.map((tab) => (
          <button
            type="button"
            key={tab.id}
            data-ocid={`home.${tab.id.replace("-", "_")}.tab`}
            onClick={() => handleTabClick(tab.id)}
            className="px-5 py-2 text-xs font-bold text-white uppercase tracking-wider border-r border-gray-600 hover:bg-blue-700 transition-colors"
            style={{
              backgroundColor: activeTab === tab.id ? "#1565C0" : "transparent",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 3-Column Content Area */}
      <div
        className="flex flex-1 overflow-hidden"
        style={{ backgroundColor: "#f0f0f0" }}
      >
        {/* Left: Exam Categories */}
        <div
          className="flex flex-col overflow-hidden border-r border-gray-300"
          style={{ width: "33%", backgroundColor: "#ffffff" }}
        >
          <div
            className="px-3 py-2 border-b border-gray-300 flex-shrink-0"
            style={{ backgroundColor: "#e8e8e8" }}
          >
            <span className="font-bold text-sm text-gray-800 uppercase tracking-wide">
              EXAM CATEGORIES
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 p-3 overflow-y-auto">
            {EXAM_CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  type="button"
                  key={cat.id}
                  data-ocid="home.exam_category.button"
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    navigate({ to: "/exams" });
                  }}
                  className="flex flex-col items-center justify-center gap-1 p-3 border-2 rounded cursor-pointer hover:bg-blue-50 transition-colors text-center"
                  style={{
                    borderColor: isSelected ? "#1565C0" : "#d0d0d0",
                    backgroundColor: isSelected ? "#EEF4FF" : "#fafafa",
                  }}
                >
                  <Icon className={`w-6 h-6 ${cat.color}`} />
                  <span className="text-xs font-semibold text-gray-700 leading-tight">
                    {cat.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Learn Typing mini link */}
          <div className="mt-auto border-t border-gray-200 p-2">
            <button
              type="button"
              data-ocid="home.learn_typing.button"
              onClick={() => navigate({ to: "/learn" })}
              className="w-full text-xs font-semibold text-blue-700 hover:underline py-1"
            >
              <BookOpen className="inline w-3 h-3 mr-1" />
              LEARN TYPING
            </button>
          </div>
        </div>

        {/* Middle: Quick Start Practice */}
        <div
          className="flex flex-col overflow-hidden border-r border-gray-300"
          style={{ width: "40%", backgroundColor: "#ffffff" }}
        >
          <div
            className="px-3 py-2 border-b border-gray-300 flex-shrink-0"
            style={{ backgroundColor: "#e8e8e8" }}
          >
            <span className="font-bold text-sm text-gray-800 uppercase tracking-wide">
              QUICK START PRACTICE
            </span>
          </div>
          <div className="flex flex-col gap-3 p-4 overflow-y-auto flex-1">
            <div>
              <span className="text-xs font-semibold text-gray-600 mb-1 block">
                Session Type
              </span>
              <Select value={session} onValueChange={setSession}>
                <SelectTrigger
                  data-ocid="home.session.select"
                  className="w-full text-sm border-gray-400"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SESSION_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              data-ocid="home.start_practice.primary_button"
              onClick={handleStartPractice}
              className="w-full font-bold text-sm py-5 uppercase tracking-wide"
              style={{ backgroundColor: "#1565C0" }}
            >
              START PRACTICE
            </Button>

            <div>
              <p className="text-xs font-semibold text-gray-600 mb-1">
                Popular practice texts:
              </p>
              <div
                className="border border-gray-300 rounded p-2 text-xs text-gray-700 leading-relaxed overflow-y-auto"
                style={{ height: "160px", backgroundColor: "#fafafa" }}
              >
                {sampleText}
              </div>
            </div>

            <div className="mt-auto">
              <p className="text-xs text-gray-500 text-center">
                All exams follow official scoring formulas.
              </p>
            </div>
          </div>
        </div>

        {/* Right: Live Typing Test Challenges */}
        <div
          className="flex flex-col overflow-hidden"
          style={{ width: "27%", backgroundColor: "#ffffff" }}
        >
          <div
            className="px-3 py-2 border-b border-gray-300 flex-shrink-0"
            style={{ backgroundColor: "#e8e8e8" }}
          >
            <span className="font-bold text-xs text-gray-800 uppercase tracking-wide">
              LIVE TYPING TEST CHALLENGES
            </span>
          </div>
          <div className="flex flex-col overflow-y-auto flex-1 p-2 gap-2">
            {/* Upcoming */}
            <p className="text-xs font-bold text-gray-600 uppercase mt-1">
              Upcoming Now
            </p>
            {upcomingSessions.length === 0 && (
              <div
                className="rounded p-2 border border-blue-200 text-xs"
                style={{ backgroundColor: "#DBEAFE" }}
              >
                <p className="font-semibold text-gray-700">SSC CGL Mock</p>
                <p className="text-gray-500">Start Time: 09:00 PM</p>
                <p className="text-gray-500">Participants: 22</p>
                <Button
                  data-ocid="home.join_upcoming.button"
                  size="sm"
                  className="mt-1 w-full text-xs h-6"
                  style={{ backgroundColor: "#1565C0" }}
                  onClick={() => navigate({ to: "/live" })}
                >
                  Join Now
                </Button>
              </div>
            )}
            {upcomingSessions.map((s, i) => (
              <div
                key={s.roomId}
                data-ocid={`home.upcoming_session.item.${i + 1}`}
                className="rounded p-2 border border-blue-200 text-xs"
                style={{ backgroundColor: "#DBEAFE" }}
              >
                <p className="font-semibold text-gray-700">
                  {getExamName(s.examId)} Mock
                </p>
                <p className="text-gray-500">
                  Start Time: {formatTime(s.startTime)}
                </p>
                <p className="text-gray-500">
                  Participants: {String(s.participants.length)}
                </p>
                <Button
                  data-ocid="home.join_upcoming.button"
                  size="sm"
                  className="mt-1 w-full text-xs h-6"
                  style={{ backgroundColor: "#1565C0" }}
                  onClick={() => navigate({ to: "/live" })}
                >
                  Join Now
                </Button>
              </div>
            ))}

            {/* Active */}
            <p className="text-xs font-bold text-gray-600 uppercase mt-2">
              Active Now
            </p>
            {activeSessions.length === 0 && (
              <div
                className="rounded p-2 border border-green-200 text-xs"
                style={{ backgroundColor: "#DCFCE7" }}
              >
                <p className="font-semibold text-gray-700">RRB NTPC Mock</p>
                <p className="text-gray-500">Start Time: 08:30 PM</p>
                <p className="text-gray-500">Participants: 15</p>
                <Button
                  data-ocid="home.join_active.button"
                  size="sm"
                  className="mt-1 w-full text-xs h-6"
                  style={{ backgroundColor: "#1565C0" }}
                  onClick={() => navigate({ to: "/live" })}
                >
                  Join Now
                </Button>
              </div>
            )}
            {activeSessions.map((s, i) => (
              <div
                key={s.roomId}
                data-ocid={`home.active_session.item.${i + 1}`}
                className="rounded p-2 border border-green-200 text-xs"
                style={{ backgroundColor: "#DCFCE7" }}
              >
                <p className="font-semibold text-gray-700">
                  {getExamName(s.examId)} Mock
                </p>
                <p className="text-gray-500">
                  Start Time: {formatTime(s.startTime)}
                </p>
                <p className="text-gray-500">
                  Participants: {String(s.participants.length)}
                </p>
                <Button
                  data-ocid="home.join_active.button"
                  size="sm"
                  className="mt-1 w-full text-xs h-6"
                  style={{ backgroundColor: "#1565C0" }}
                  onClick={() => navigate({ to: "/live" })}
                >
                  Join Now
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Learning Mode Section */}
      <div
        className="flex-shrink-0 border-t-2 border-gray-300 px-4 py-3"
        style={{ backgroundColor: "#ffffff" }}
      >
        <div className="flex items-center gap-4 flex-wrap">
          <div className="mr-4">
            <p className="font-bold text-sm text-gray-800 uppercase tracking-wide">
              LEARNING MODE
            </p>
            <p className="text-xs text-gray-500">
              Keyboard mastery for competitive exam preparation
            </p>
          </div>
          <Button
            data-ocid="home.row_practice.button"
            size="sm"
            className="text-xs font-semibold"
            style={{ backgroundColor: "#1565C0" }}
            onClick={() => navigate({ to: "/learn" })}
          >
            ROW PRACTICE (Home, Top, Bottom)
          </Button>
          <Button
            data-ocid="home.symbol_number.button"
            size="sm"
            className="text-xs font-semibold"
            style={{ backgroundColor: "#16A34A" }}
            onClick={() => navigate({ to: "/learn" })}
          >
            SYMBOL &amp; NUMBER
          </Button>
          <Button
            data-ocid="home.finger_position.button"
            size="sm"
            variant="secondary"
            className="text-xs font-semibold"
            onClick={() => navigate({ to: "/learn" })}
          >
            FINGER POSITION
          </Button>
          <Button
            data-ocid="home.accuracy_drills.button"
            size="sm"
            className="text-xs font-semibold"
            style={{ backgroundColor: "#38BDF8", color: "#0f172a" }}
            onClick={() => navigate({ to: "/learn" })}
          >
            ACCURACY DRILLS
          </Button>
        </div>
      </div>

      {/* Status Bar */}
      <div
        className="flex-shrink-0 px-4 py-1"
        style={{ backgroundColor: "#0D1B3E" }}
      >
        <p className="text-xs text-gray-300">
          Active Users Online: 12,450 | Latest Result: Rakesh – 55 WPM |
          Premium: Trial Active | Mode: Exam Prep
        </p>
      </div>
    </div>
  );
}

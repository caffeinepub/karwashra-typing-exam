import {
  EXAMS,
  generatePassageOfLength,
  getPassagesForExam,
} from "@/data/exams";
import { useActor } from "@/hooks/useActor";
import { useAuth } from "@/hooks/useAuth";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import {
  ChevronLeft,
  ChevronRight,
  FileText,
  HelpCircle,
  Maximize2,
  Minimize2,
  Printer,
  Save,
  User,
  X,
} from "lucide-react";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";

type TestState = "idle" | "running" | "paused" | "finished";

const TIME_PRESETS = [1, 2, 5, 10, 15, 20];

function generateSessionId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function getLanguageOptions(examLanguage: string): string[] {
  const lang = examLanguage.toLowerCase();
  if (lang.includes("hindi") && lang.includes("english"))
    return ["English", "Hindi"];
  if (lang.includes("hindi")) return ["Hindi", "English"];
  return ["English"];
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
      if (elBottom > containerBottom - 40) {
        container.scrollTop = elTop - container.clientHeight / 2;
      } else if (elTop < containerScrollTop + 20) {
        container.scrollTop = elTop - 20;
      }
    }
  }, [typed.length]);

  const words = passage.split(" ");
  let charIndex = 0;

  return (
    <div
      ref={containerRef}
      className="overflow-y-auto"
      style={{ height: "260px" }}
    >
      <div
        style={{
          fontSize: `${fontSize}px`,
          lineHeight: "2",
          textAlign: "justify",
          fontFamily: "serif",
          color: "#111",
        }}
      >
        {words.map((word, wi) => {
          const wordStart = charIndex;
          const wordEnd = charIndex + word.length;
          charIndex += word.length + 1; // +1 for space

          const chars = word.split("").map((char, ci) => {
            const gi = wordStart + ci;
            let color = "#888";
            if (gi < typed.length) {
              color = typed[gi] === char ? "#1a7f1a" : "#cc2222";
            } else if (gi === typed.length) {
              color = "#1155cc";
            }
            const isCurrent = gi === typed.length;
            return (
              <span
                key={gi}
                ref={isCurrent ? currentCharRef : undefined}
                style={{
                  color,
                  backgroundColor: isCurrent ? "#cce5ff" : "transparent",
                }}
              >
                {char}
              </span>
            );
          });

          return (
            <span key={wordStart}>
              {chars}
              {wi < words.length - 1 ? (
                <span
                  style={{
                    color:
                      wordEnd < typed.length
                        ? typed[wordEnd] === " "
                          ? "#888"
                          : "#cc2222"
                        : wordEnd === typed.length
                          ? "#1155cc"
                          : "#bbb",
                  }}
                >
                  {" "}
                </span>
              ) : null}
            </span>
          );
        })}
      </div>
    </div>
  );
});

export function TypingTest() {
  const { id } = useParams({ strict: false }) as { id: string };
  const navigate = useNavigate();
  const { auth, isLoggedIn } = useAuth();
  const { actor } = useActor();
  const exam = EXAMS.find((e) => e.id === id);

  const languageOptions = useMemo(
    () => (exam ? getLanguageOptions(exam.language) : ["English"]),
    [exam],
  );

  const [selectedLanguage, setSelectedLanguage] = useState<string>(
    languageOptions[0],
  );
  const [selectedTimeMin, setSelectedTimeMin] = useState(exam?.timeMin ?? 10);
  const [fontSize, setFontSize] = useState(16);
  const [backspaceAllowed, setBackspaceAllowed] = useState(true);
  const [showParaSelector, setShowParaSelector] = useState(false);

  // 3 group paragraphs
  const [groups, setGroups] = useState<string[]>([]);
  const [activeGroup, setActiveGroup] = useState(1); // 1-indexed

  const [typed, setTyped] = useState("");
  const [state, setState] = useState<TestState>("idle");
  const [timeLeft, setTimeLeft] = useState(0);
  const [startTime, setStartTime] = useState<number>(0);

  // Login form state (right panel)
  const [loginUserId, setLoginUserId] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const passage = groups[activeGroup - 1] ?? "";

  // Generate 3 group paragraphs on mount / exam / language change
  useEffect(() => {
    if (!exam) return;
    const generated = [1, 2, 3].map(() =>
      generatePassageOfLength(exam, 400, selectedLanguage),
    );
    setGroups(generated);
    setActiveGroup(1);
    setTyped("");
    setState("idle");
    setTimeLeft(selectedTimeMin * 60);
  }, [exam, selectedLanguage, selectedTimeMin]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const startTest = () => {
    setState("running");
    setStartTime(Date.now());
    setTimeLeft(selectedTimeMin * 60);
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
      if (timerRef.current) clearInterval(timerRef.current);
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

      const passageWords = passage.split(" ");
      const typedWords = finalTyped.split(" ");
      let correctWords = 0;
      let wrongWords = 0;
      passageWords.forEach((word, idx) => {
        if (typedWords[idx] === word) correctWords++;
        else if (typedWords[idx] !== undefined) wrongWords++;
      });

      const passed = exam
        ? wpm >= exam.requiredWPM && accuracy >= exam.accuracy
        : false;

      if (isLoggedIn && auth?.token && exam && actor) {
        const sessionId = generateSessionId();
        try {
          await actor.submitResult(
            auth.token,
            sessionId,
            exam.id,
            exam.name,
            BigInt(wpm),
            BigInt(accuracy),
            BigInt(errors),
            BigInt(timeTaken),
            passed,
            selectedLanguage,
          );
        } catch {
          /* ignore save errors */
        }
      }

      navigate({
        to: "/exam/$id/result",
        params: { id },
        search: {
          wpm: String(wpm),
          accuracy: String(accuracy),
          errors: String(errors),
          timeTaken: String(timeTaken),
          correctWords: String(correctWords),
          wrongWords: String(wrongWords),
        },
      });
    },
    [
      startTime,
      passage,
      timeLeft,
      selectedTimeMin,
      id,
      navigate,
      isLoggedIn,
      auth,
      exam,
      actor,
      selectedLanguage,
    ],
  );

  // Auto-finish when state becomes finished after timer
  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional - only trigger on state change
  useEffect(() => {
    if (state === "finished" && startTime > 0) {
      finishTest(typed);
    }
  }, [state]);

  const handleTyping = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (state !== "running") {
      // Auto-start on first keypress
      if (state === "idle" && e.target.value.length > 0) {
        startTest();
        setTyped(e.target.value);
      }
      return;
    }
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

  // Date for title bar
  const today = new Date();
  const dateStr = today.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  if (!exam) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Exam not found.</p>
          <Link
            to="/exams"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Back to Exams
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col"
      style={{
        height: "100vh",
        backgroundColor: "#f0f0f0",
        overflow: "hidden",
      }}
    >
      {/* ═══ TITLE BAR ═══ */}
      <div
        style={{
          backgroundColor: "#e0e0e0",
          borderBottom: "1px solid #bbb",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "3px 6px",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <button
            type="button"
            title="Menu"
            style={{
              padding: "2px 4px",
              border: "1px solid #aaa",
              background: "#f8f8f8",
              cursor: "pointer",
              borderRadius: "2px",
            }}
          >
            <FileText size={14} color="#555" />
          </button>
          <button
            type="button"
            title="Save"
            style={{
              padding: "2px 4px",
              border: "1px solid #aaa",
              background: "#f8f8f8",
              cursor: "pointer",
              borderRadius: "2px",
            }}
          >
            <Save size={14} color="#555" />
          </button>
          <button
            type="button"
            title="Print"
            style={{
              padding: "2px 4px",
              border: "1px solid #aaa",
              background: "#f8f8f8",
              cursor: "pointer",
              borderRadius: "2px",
            }}
          >
            <Printer size={14} color="#555" />
          </button>
          <button
            type="button"
            title="Help"
            style={{
              padding: "2px 4px",
              border: "1px solid #aaa",
              background: "#f8f8f8",
              cursor: "pointer",
              borderRadius: "2px",
            }}
          >
            <HelpCircle size={14} color="#555" />
          </button>
        </div>
        <div
          style={{
            fontWeight: "bold",
            fontSize: "15px",
            color: "#222",
            letterSpacing: "0.3px",
          }}
        >
          Typing Test — {dateStr}
        </div>
        <div style={{ display: "flex", gap: "3px" }}>
          <button
            type="button"
            title="Minimize"
            style={{
              width: "20px",
              height: "20px",
              border: "1px solid #888",
              background: "#d4d4d4",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "2px",
            }}
          >
            <Minimize2 size={11} />
          </button>
          <button
            type="button"
            title="Maximize"
            style={{
              width: "20px",
              height: "20px",
              border: "1px solid #888",
              background: "#d4d4d4",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "2px",
            }}
          >
            <Maximize2 size={11} />
          </button>
          <Link to="/exams">
            <button
              type="button"
              title="Close"
              data-ocid="test.close_button"
              style={{
                width: "20px",
                height: "20px",
                border: "1px solid #888",
                background: "#e05555",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "2px",
              }}
            >
              <X size={11} color="white" />
            </button>
          </Link>
        </div>
      </div>

      {/* ═══ EXAM NAME BAR ═══ */}
      <div
        style={{
          backgroundColor: "#1a1a1a",
          color: "white",
          fontSize: "12px",
          padding: "2px 8px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexShrink: 0,
        }}
      >
        <span style={{ fontWeight: "600" }}>{exam.name}</span>
        <span style={{ color: "#444", fontSize: "11px" }}>Instructions</span>
      </div>

      {/* ═══ TABS + TIMER ROW ═══ */}
      <div
        style={{
          backgroundColor: "#d0d0d0",
          borderBottom: "1px solid #b8b8b8",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "3px 8px",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", gap: "3px" }}>
          {[1, 2, 3].map((g) => (
            <button
              key={g}
              type="button"
              data-ocid="test.tab"
              onClick={() => {
                if (state === "idle") {
                  setActiveGroup(g);
                  setTyped("");
                }
              }}
              style={{
                padding: "2px 12px",
                fontSize: "12px",
                border: "1px solid #999",
                cursor: state === "idle" ? "pointer" : "default",
                fontWeight: activeGroup === g ? "600" : "400",
                backgroundColor: activeGroup === g ? "#4a90d9" : "#c0c0c0",
                color: activeGroup === g ? "white" : "#333",
                borderRadius: "2px 2px 0 0",
              }}
            >
              Group {g}
            </button>
          ))}
        </div>
        <div
          style={{
            fontWeight: "bold",
            fontSize: "13px",
            color: timeLeft < 60 ? "#cc0000" : "#111",
          }}
        >
          Time Left :{" "}
          <span
            style={{
              fontFamily: "monospace",
              fontSize: "14px",
              color: timeLeft < 60 ? "#cc0000" : "#1a3f7a",
            }}
          >
            {timeStr}
          </span>
        </div>
      </div>

      {/* ═══ PURPLE INFO BAR ═══ */}
      <div
        style={{
          backgroundColor: "#5b5ea6",
          color: "white",
          fontSize: "12px",
          padding: "3px 10px",
          display: "flex",
          alignItems: "center",
          gap: "24px",
          flexShrink: 0,
        }}
      >
        <span>Keyboard Layout: Inscript</span>
        <span>Language: {selectedLanguage}</span>
        {state === "running" && (
          <span style={{ marginLeft: "auto", opacity: 0.9 }}>
            WPM: {stats.wpm} &nbsp;| &nbsp; Accuracy: {stats.accuracy}% &nbsp;|
            &nbsp; Errors: {stats.errors}
          </span>
        )}
      </div>

      {/* ═══ MAIN BODY: 2 COLUMNS ═══ */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* LEFT COLUMN */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            padding: "6px",
            gap: "5px",
            overflow: "auto",
          }}
        >
          {/* Passage box */}
          <div
            data-ocid="test.panel"
            style={{
              backgroundColor: "white",
              border: "1px solid #aaa",
              padding: "10px 12px",
              height: "260px",
              overflow: "hidden",
              flexShrink: 0,
            }}
          >
            <PassageDisplay
              passage={passage}
              typed={typed}
              fontSize={fontSize}
            />
          </div>

          {/* Controls bar */}
          <div
            style={{
              backgroundColor: "#d8d8d8",
              border: "1px solid #aaa",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "4px 8px",
              fontSize: "12px",
              flexShrink: 0,
              flexWrap: "wrap",
            }}
          >
            <span style={{ color: "#333" }}>Duration:</span>
            <select
              value={selectedTimeMin}
              onChange={(e) => {
                if (state === "idle")
                  setSelectedTimeMin(Number(e.target.value));
              }}
              data-ocid="test.select"
              style={{
                border: "1px solid #999",
                padding: "1px 4px",
                fontSize: "12px",
                background: "#f8f8f8",
              }}
            >
              {TIME_PRESETS.map((t) => (
                <option key={t} value={t}>
                  {t} Minutes
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={() => setShowParaSelector(true)}
              data-ocid="test.open_modal_button"
              style={{
                border: "1px solid #1565C0",
                padding: "2px 8px",
                background: "#e8f0fe",
                cursor: "pointer",
                fontSize: "11px",
                fontWeight: "600",
                color: "#1565C0",
              }}
            >
              📄 Select Para
            </button>

            <button
              type="button"
              onClick={() => {
                if (state === "idle") {
                  const newG = activeGroup > 1 ? activeGroup - 1 : 3;
                  setActiveGroup(newG);
                  setTyped("");
                }
              }}
              data-ocid="test.secondary_button"
              style={{
                border: "1px solid #999",
                padding: "1px 8px",
                background: "#f0f0f0",
                cursor: "pointer",
                fontSize: "13px",
                fontWeight: "bold",
              }}
            >
              {"<<"}
            </button>

            <span
              style={{
                border: "1px solid #999",
                padding: "1px 8px",
                background: "#f8f8f8",
                fontSize: "12px",
                minWidth: "120px",
                textAlign: "center",
              }}
            >
              Exercise: {activeGroup}/3
            </span>

            <button
              type="button"
              onClick={() => {
                if (state === "idle") {
                  const newG = activeGroup < 3 ? activeGroup + 1 : 1;
                  setActiveGroup(newG);
                  setTyped("");
                }
              }}
              data-ocid="test.secondary_button"
              style={{
                border: "1px solid #999",
                padding: "1px 8px",
                background: "#f0f0f0",
                cursor: "pointer",
                fontSize: "13px",
                fontWeight: "bold",
              }}
            >
              {">>"}
            </button>

            {/* Backspace toggle */}
            <button
              type="button"
              onClick={() => setBackspaceAllowed((v) => !v)}
              data-ocid="test.toggle"
              style={{
                border: "1px solid #999",
                padding: "1px 8px",
                background: backspaceAllowed ? "#d4edda" : "#f8d7da",
                cursor: "pointer",
                fontSize: "11px",
                color: backspaceAllowed ? "#155724" : "#721c24",
              }}
            >
              ⌫ {backspaceAllowed ? "ON" : "OFF"}
            </button>

            {/* Language selector */}
            {languageOptions.length > 1 && (
              <select
                value={selectedLanguage}
                onChange={(e) => {
                  if (state === "idle") setSelectedLanguage(e.target.value);
                }}
                data-ocid="test.select"
                style={{
                  border: "1px solid #999",
                  padding: "1px 4px",
                  fontSize: "12px",
                  background: "#f8f8f8",
                }}
              >
                {languageOptions.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            )}

            <div style={{ flex: 1 }} />

            {/* Pause/Resume */}
            {state === "running" && (
              <button
                type="button"
                onClick={pauseTest}
                data-ocid="test.toggle"
                style={{
                  border: "1px solid #999",
                  padding: "2px 12px",
                  background: "#fff3cd",
                  cursor: "pointer",
                  fontSize: "12px",
                  fontWeight: "600",
                  color: "#856404",
                }}
              >
                ⏸ Pause
              </button>
            )}
            {state === "paused" && (
              <button
                type="button"
                onClick={pauseTest}
                data-ocid="test.toggle"
                style={{
                  border: "1px solid #999",
                  padding: "2px 12px",
                  background: "#d4edda",
                  cursor: "pointer",
                  fontSize: "12px",
                  fontWeight: "600",
                  color: "#155724",
                }}
              >
                ▶ Resume
              </button>
            )}

            {/* Font size */}
            <button
              type="button"
              onClick={() => setFontSize((s) => Math.min(28, s + 2))}
              data-ocid="test.toggle"
              style={{
                border: "1px solid #999",
                padding: "1px 6px",
                background: "#f0f0f0",
                cursor: "pointer",
                fontSize: "13px",
                fontWeight: "bold",
              }}
            >
              A+
            </button>
            <button
              type="button"
              onClick={() => setFontSize(16)}
              style={{
                border: "1px solid #999",
                padding: "1px 6px",
                background: "#f0f0f0",
                cursor: "pointer",
                fontSize: "13px",
              }}
            >
              A
            </button>
            <button
              type="button"
              onClick={() => setFontSize((s) => Math.max(12, s - 2))}
              data-ocid="test.toggle"
              style={{
                border: "1px solid #999",
                padding: "1px 6px",
                background: "#f0f0f0",
                cursor: "pointer",
                fontSize: "11px",
              }}
            >
              A-
            </button>
          </div>

          {/* Paragraph Selector Modal */}
          {showParaSelector && (
            <div
              onKeyDown={(e) => {
                if (e.key === "Escape") setShowParaSelector(false);
              }}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0,0,0,0.5)",
                zIndex: 1000,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={() => setShowParaSelector(false)}
            >
              <dialog
                open
                onKeyDown={(e) => e.stopPropagation()}
                onClick={(e) => e.stopPropagation()}
                data-ocid="test.modal"
                style={{
                  backgroundColor: "white",
                  border: "2px solid #1565C0",
                  borderRadius: 4,
                  width: "min(600px, 90vw)",
                  maxHeight: "80vh",
                  display: "flex",
                  flexDirection: "column",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    backgroundColor: "#1565C0",
                    color: "white",
                    padding: "8px 14px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexShrink: 0,
                  }}
                >
                  <span style={{ fontWeight: 700, fontSize: 13 }}>
                    📄 Select Paragraph — {exam?.name ?? "All"}
                  </span>
                  <button
                    type="button"
                    data-ocid="test.close_button"
                    onClick={() => setShowParaSelector(false)}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "white",
                      cursor: "pointer",
                      fontSize: 16,
                      fontWeight: "bold",
                      lineHeight: 1,
                    }}
                  >
                    ✕
                  </button>
                </div>
                <div style={{ overflowY: "auto", flex: 1, padding: 8 }}>
                  {exam &&
                    getPassagesForExam(exam, selectedLanguage).map(
                      (para, idx) => (
                        <button
                          // biome-ignore lint/suspicious/noArrayIndexKey: paragraphs have no stable id
                          key={`para-${idx}`}
                          type="button"
                          data-ocid={`test.item.${idx + 1}`}
                          onClick={() => {
                            const newGroups = [...groups];
                            newGroups[activeGroup - 1] = para;
                            setGroups(newGroups);
                            setTyped("");
                            setShowParaSelector(false);
                          }}
                          style={{
                            display: "block",
                            width: "100%",
                            textAlign: "left",
                            padding: "8px 10px",
                            marginBottom: 5,
                            border: "1px solid #ddd",
                            borderRadius: 3,
                            background: "#fafafa",
                            cursor: "pointer",
                            fontSize: 12,
                            color: "#222",
                            lineHeight: 1.5,
                          }}
                        >
                          <span
                            style={{
                              fontWeight: 700,
                              color: "#1565C0",
                              marginRight: 6,
                            }}
                          >
                            #{idx + 1}
                          </span>
                          {para.slice(0, 100)}
                          {para.length > 100 ? "..." : ""}
                        </button>
                      ),
                    )}
                </div>
              </dialog>
            </div>
          )}

          {/* Typing area */}
          <div
            style={{
              backgroundColor: "white",
              border:
                state === "paused" ? "2px solid #ff9900" : "1px solid #aaa",
              flexShrink: 0,
            }}
          >
            {state === "idle" && (
              <div
                style={{
                  padding: "6px 10px",
                  backgroundColor: "#fffbea",
                  borderBottom: "1px solid #ddd",
                  fontSize: "11px",
                  color: "#222",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span>
                  Click below and start typing — test begins automatically
                </span>
                <button
                  type="button"
                  onClick={startTest}
                  data-ocid="test.primary_button"
                  style={{
                    backgroundColor: "#4a90d9",
                    color: "white",
                    border: "none",
                    padding: "3px 16px",
                    fontSize: "12px",
                    cursor: "pointer",
                    borderRadius: "2px",
                    fontWeight: "600",
                  }}
                >
                  ▶ Start Test
                </button>
              </div>
            )}
            {state === "paused" && (
              <div
                style={{
                  padding: "4px 10px",
                  backgroundColor: "#fff3cd",
                  borderBottom: "1px solid #ddd",
                  fontSize: "11px",
                  color: "#856404",
                  textAlign: "center",
                }}
              >
                ⏸ Test Paused — Click Resume to continue
              </div>
            )}
            <textarea
              ref={textareaRef}
              value={typed}
              onChange={handleTyping}
              onKeyDown={handleKeyDown}
              disabled={state === "paused" || state === "finished"}
              placeholder={
                state === "idle"
                  ? "Start typing here — timer starts automatically on first keystroke..."
                  : state === "finished"
                    ? "Test complete! Calculating results..."
                    : "Type the passage above here..."
              }
              data-ocid="test.editor"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              style={{
                width: "100%",
                height: "120px",
                fontFamily: "monospace",
                fontSize: "14px",
                padding: "8px 10px",
                resize: "none",
                border: "none",
                outline: "none",
                backgroundColor: state === "paused" ? "#fffaed" : "white",
                color: "#111",
              }}
            />
          </div>
        </div>

        {/* RIGHT PANEL — Candidate Profile */}
        <div
          style={{
            width: "220px",
            flexShrink: 0,
            borderLeft: "1px solid #bbb",
            backgroundColor: "#ececec",
            display: "flex",
            flexDirection: "column",
            overflow: "auto",
          }}
        >
          {/* Blue header */}
          <div
            style={{
              backgroundColor: "#4a90d9",
              color: "white",
              fontSize: "11px",
              fontWeight: "bold",
              padding: "5px 8px",
              textAlign: "center",
              letterSpacing: "0.5px",
            }}
          >
            CANDIDATE PROFILE &amp; LOGIN
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "12px 10px",
              gap: "10px",
            }}
          >
            {/* Avatar */}
            <div
              style={{
                width: "90px",
                height: "90px",
                borderRadius: "50%",
                backgroundColor: "#c8d8e8",
                border: "2px solid #9ab",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              <User size={44} color="#6080a0" />
            </div>

            {isLoggedIn && auth?.username ? (
              /* Logged in state */
              <div style={{ width: "100%", fontSize: "12px" }}>
                <div
                  style={{
                    backgroundColor: "#f8f8f8",
                    border: "1px solid #ccc",
                    padding: "4px 8px",
                    marginBottom: "6px",
                    borderRadius: "2px",
                    fontFamily: "monospace",
                    fontSize: "12px",
                    color: "#222",
                  }}
                >
                  <div
                    style={{
                      color: "#222",
                      fontSize: "10px",
                      marginBottom: "2px",
                    }}
                  >
                    User ID:
                  </div>
                  {auth.username}
                </div>
                <button
                  type="button"
                  onClick={startTest}
                  disabled={state !== "idle"}
                  data-ocid="test.primary_button"
                  style={{
                    width: "100%",
                    backgroundColor: state === "idle" ? "#4a90d9" : "#aaa",
                    color: "white",
                    border: "none",
                    padding: "5px",
                    fontSize: "12px",
                    cursor: state === "idle" ? "pointer" : "default",
                    borderRadius: "2px",
                    fontWeight: "600",
                    marginBottom: "6px",
                  }}
                >
                  {state === "idle"
                    ? "▶ Start Test"
                    : state === "running"
                      ? "● Running..."
                      : state === "paused"
                        ? "⏸ Paused"
                        : "✓ Finished"}
                </button>
              </div>
            ) : (
              /* Not logged in — login form */
              <div style={{ width: "100%", fontSize: "12px" }}>
                <div style={{ marginBottom: "6px" }}>
                  <label
                    htmlFor="login-userid"
                    style={{
                      display: "block",
                      fontSize: "11px",
                      color: "#1a1a1a",
                      marginBottom: "2px",
                    }}
                  >
                    User ID:
                  </label>
                  <input
                    id="login-userid"
                    type="text"
                    value={loginUserId}
                    onChange={(e) => setLoginUserId(e.target.value)}
                    data-ocid="test.input"
                    placeholder="Enter User ID"
                    style={{
                      width: "100%",
                      border: "1px solid #bbb",
                      padding: "3px 6px",
                      fontSize: "12px",
                      fontFamily: "monospace",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
                <div style={{ marginBottom: "8px" }}>
                  <label
                    htmlFor="login-password"
                    style={{
                      display: "block",
                      fontSize: "11px",
                      color: "#1a1a1a",
                      marginBottom: "2px",
                    }}
                  >
                    Password:
                  </label>
                  <input
                    id="login-password"
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    data-ocid="test.input"
                    placeholder="••••••••"
                    style={{
                      width: "100%",
                      border: "1px solid #bbb",
                      padding: "3px 6px",
                      fontSize: "12px",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
                <Link to="/login">
                  <button
                    type="button"
                    data-ocid="test.primary_button"
                    style={{
                      width: "100%",
                      backgroundColor: "#4a90d9",
                      color: "white",
                      border: "none",
                      padding: "5px",
                      fontSize: "12px",
                      cursor: "pointer",
                      borderRadius: "3px",
                      fontWeight: "600",
                      marginBottom: "4px",
                    }}
                  >
                    Log in
                  </button>
                </Link>
                <Link
                  to="/forgot-password"
                  style={{
                    display: "block",
                    textAlign: "center",
                    fontSize: "11px",
                    color: "#4a90d9",
                    textDecoration: "none",
                  }}
                  data-ocid="test.link"
                >
                  Forgot password?
                </Link>
              </div>
            )}

            {/* Divider */}
            <div
              style={{
                width: "100%",
                borderTop: "1px solid #ccc",
                paddingTop: "8px",
                fontSize: "11px",
                color: "#1a1a1a",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "3px",
                }}
              >
                <span>Required WPM:</span>
                <span style={{ fontWeight: "bold", color: "#1a3f7a" }}>
                  {exam.requiredWPM > 0 ? exam.requiredWPM : "KDPH"}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "3px",
                }}
              >
                <span>Min Accuracy:</span>
                <span style={{ fontWeight: "bold", color: "#1a3f7a" }}>
                  {exam.accuracy}%
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>Duration:</span>
                <span style={{ fontWeight: "bold", color: "#1a3f7a" }}>
                  {selectedTimeMin} min
                </span>
              </div>
            </div>

            {/* Live stats during test */}
            {(state === "running" || state === "paused") && (
              <div
                data-ocid="test.loading_state"
                style={{
                  width: "100%",
                  borderTop: "1px solid #ccc",
                  paddingTop: "8px",
                  fontSize: "12px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "4px",
                  }}
                >
                  <span style={{ color: "#1a1a1a" }}>WPM:</span>
                  <span
                    style={{
                      fontWeight: "bold",
                      color:
                        stats.wpm >= exam.requiredWPM ? "#1a7f1a" : "#cc2200",
                      fontFamily: "monospace",
                      fontSize: "14px",
                    }}
                  >
                    {stats.wpm}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "4px",
                  }}
                >
                  <span style={{ color: "#1a1a1a" }}>Accuracy:</span>
                  <span
                    style={{
                      fontWeight: "bold",
                      color:
                        stats.accuracy >= exam.accuracy ? "#1a7f1a" : "#cc2200",
                      fontFamily: "monospace",
                      fontSize: "14px",
                    }}
                  >
                    {stats.accuracy}%
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span style={{ color: "#1a1a1a" }}>Errors:</span>
                  <span
                    style={{
                      fontWeight: "bold",
                      color: stats.errors > 0 ? "#cc2200" : "#1a7f1a",
                      fontFamily: "monospace",
                      fontSize: "14px",
                    }}
                  >
                    {stats.errors}
                  </span>
                </div>

                {/* Progress bar */}
                <div
                  style={{
                    marginTop: "8px",
                    backgroundColor: "#ddd",
                    height: "6px",
                    borderRadius: "3px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${Math.min(100, (typed.length / passage.length) * 100)}%`,
                      backgroundColor: "#4a90d9",
                      transition: "width 0.3s",
                    }}
                  />
                </div>
                <div
                  style={{
                    textAlign: "right",
                    fontSize: "10px",
                    color: "#333",
                    marginTop: "2px",
                  }}
                >
                  {typed.length}/{passage.length} chars
                </div>
              </div>
            )}

            {/* Exercise navigation arrows */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "8px",
                marginTop: "4px",
              }}
            >
              <button
                type="button"
                onClick={() => {
                  if (state === "idle") {
                    const newG = activeGroup > 1 ? activeGroup - 1 : 3;
                    setActiveGroup(newG);
                    setTyped("");
                  }
                }}
                data-ocid="test.secondary_button"
                style={{
                  border: "1px solid #aaa",
                  background: "#f0f0f0",
                  padding: "3px 8px",
                  cursor: state === "idle" ? "pointer" : "not-allowed",
                  opacity: state === "idle" ? 1 : 0.4,
                }}
                title="Previous exercise"
              >
                <ChevronLeft size={14} />
              </button>
              <span
                style={{
                  fontSize: "11px",
                  alignSelf: "center",
                  color: "#1a1a1a",
                }}
              >
                {activeGroup}/3
              </span>
              <button
                type="button"
                onClick={() => {
                  if (state === "idle") {
                    const newG = activeGroup < 3 ? activeGroup + 1 : 1;
                    setActiveGroup(newG);
                    setTyped("");
                  }
                }}
                data-ocid="test.secondary_button"
                style={{
                  border: "1px solid #aaa",
                  background: "#f0f0f0",
                  padding: "3px 8px",
                  cursor: state === "idle" ? "pointer" : "not-allowed",
                  opacity: state === "idle" ? 1 : 0.4,
                }}
                title="Next exercise"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ FOOTER ═══ */}
      <div
        style={{
          backgroundColor: "#d0d0d0",
          borderTop: "1px solid #bbb",
          textAlign: "center",
          fontSize: "11px",
          padding: "3px 8px",
          color: "#444",
          flexShrink: 0,
        }}
      >
        SSC Digital Examination Module : Powered by{" "}
        <strong>Karwashra Typing Exam</strong>
      </div>
    </div>
  );
}

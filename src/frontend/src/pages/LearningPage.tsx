import { LESSONS, type Lesson } from "@/data/learnTypingLessons";
import { useAuth } from "@/hooks/useAuth";
import { useCallback, useEffect, useRef, useState } from "react";

interface LessonProgress {
  lessonId: string;
  bestWPM: number;
  bestAccuracy: number;
  attempts: number;
  passed: boolean;
}

const QWERTY_ROWS = [
  ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l", ";"],
  ["z", "x", "c", "v", "b", "n", "m", ",", ".", "/"],
];

function MiniKeyboard({ highlightKeys }: { highlightKeys: string[] }) {
  const lowerKeys = highlightKeys.map((k) => k.toLowerCase());
  return (
    <div
      style={{
        background: "#e0e0e0",
        borderRadius: 6,
        padding: "8px",
        marginBottom: 8,
      }}
    >
      {QWERTY_ROWS.map((row) => (
        <div
          key={row.join("")}
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 3,
            marginBottom: 3,
          }}
        >
          {row.map((key) => (
            <div
              key={key}
              style={{
                width: 26,
                height: 26,
                borderRadius: 4,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 10,
                fontWeight: 700,
                textTransform: "uppercase",
                background: lowerKeys.includes(key.toLowerCase())
                  ? "#1565C0"
                  : "#fff",
                color: lowerKeys.includes(key.toLowerCase()) ? "#fff" : "#555",
                border: "1px solid #ccc",
                boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
              }}
            >
              {key}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export function LearningPage() {
  const { username } = useAuth();
  const storageKey = `learnProgress_${username || "guest"}`;

  const loadProgress = (): Record<string, LessonProgress> => {
    try {
      return JSON.parse(localStorage.getItem(storageKey) || "{}");
    } catch {
      return {};
    }
  };

  const [lang, setLang] = useState<"english" | "hindi">("english");
  const [activeLessonId, setActiveLessonId] = useState<string>("en-1");
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [progress, setProgress] =
    useState<Record<string, LessonProgress>>(loadProgress);
  const [typed, setTyped] = useState("");
  const [started, setStarted] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [finished, setFinished] = useState(false);
  const [resultData, setResultData] = useState<{
    wpm: number;
    accuracy: number;
  } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredLessons = LESSONS.filter((l) => l.language === lang);
  const activeLesson =
    LESSONS.find((l) => l.id === activeLessonId) ?? filteredLessons[0];
  const currentText = activeLesson?.exercises[exerciseIndex] ?? "";

  const resetExercise = () => {
    setTyped("");
    setStarted(false);
    setStartTime(0);
    setFinished(false);
    setResultData(null);
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: resetExercise is stable
  useEffect(() => {
    const first = LESSONS.filter((l) => l.language === lang)[0];
    setActiveLessonId(first?.id ?? "en-1");
    setExerciseIndex(0);
    resetExercise();
  }, [lang]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: intentional reset on lesson/exercise change
  useEffect(() => {
    resetExercise();
  }, [activeLessonId, exerciseIndex]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: focus on lesson change
  useEffect(() => {
    inputRef.current?.focus();
  }, [activeLessonId, exerciseIndex]);

  const wpm = (() => {
    if (!started || !startTime) return 0;
    const elapsedMin = (Date.now() - startTime) / 60000;
    const words = typed.trim().split(/\s+/).filter(Boolean).length;
    return elapsedMin > 0 ? Math.round(words / elapsedMin) : 0;
  })();

  const accuracy = (() => {
    if (!typed.length) return 100;
    let correct = 0;
    for (let i = 0; i < typed.length; i++) {
      if (typed[i] === currentText[i]) correct++;
    }
    return Math.round((correct / typed.length) * 100);
  })();

  const handleComplete = useCallback(
    (finalWpm: number, finalAcc: number) => {
      const lesson = activeLesson;
      if (!lesson) return;
      const passed =
        finalWpm >= lesson.targetWPM && finalAcc >= lesson.targetAccuracy;
      const prev = progress[lesson.id];
      const updated: LessonProgress = {
        lessonId: lesson.id,
        bestWPM: Math.max(finalWpm, prev?.bestWPM ?? 0),
        bestAccuracy: Math.max(finalAcc, prev?.bestAccuracy ?? 0),
        attempts: (prev?.attempts ?? 0) + 1,
        passed: passed || (prev?.passed ?? false),
      };
      const newProgress = { ...progress, [lesson.id]: updated };
      setProgress(newProgress);
      localStorage.setItem(storageKey, JSON.stringify(newProgress));
      setResultData({ wpm: finalWpm, accuracy: finalAcc });
      setFinished(true);
    },
    [activeLesson, progress, storageKey],
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (finished) return;
    const val = e.target.value;
    if (!started) {
      setStarted(true);
      setStartTime(Date.now());
    }
    setTyped(val);
    if (val.length >= currentText.length) {
      const elapsedMin = (Date.now() - startTime) / 60000;
      const words = val.trim().split(/\s+/).filter(Boolean).length;
      const finalWpm = elapsedMin > 0 ? Math.round(words / elapsedMin) : 0;
      let correct = 0;
      for (let i = 0; i < val.length; i++) {
        if (val[i] === currentText[i]) correct++;
      }
      const finalAcc = Math.round((correct / val.length) * 100);
      handleComplete(finalWpm, finalAcc);
    }
  };

  const handleNext = () => {
    if (exerciseIndex < (activeLesson?.exercises.length ?? 1) - 1) {
      setExerciseIndex(exerciseIndex + 1);
    } else {
      const idx = filteredLessons.findIndex((l) => l.id === activeLessonId);
      const next = filteredLessons[idx + 1];
      if (next) {
        setActiveLessonId(next.id);
        setExerciseIndex(0);
      }
    }
    resetExercise();
  };

  const isUnlocked = (_lesson: Lesson, idx: number): boolean => {
    if (idx === 0) return true;
    const prev = filteredLessons[idx - 1];
    return !!progress[prev.id]?.passed;
  };

  const totalLessons = filteredLessons.length;
  const completedLessons = filteredLessons.filter(
    (l) => progress[l.id]?.passed,
  ).length;
  const overallProgress =
    totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

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
            <span style={{ color: "#FFD700", fontSize: 20 }}>🎓</span>
            <div>
              <div
                style={{
                  color: "#fff",
                  fontWeight: 800,
                  fontSize: 15,
                  letterSpacing: 0.5,
                }}
              >
                LEARN TYPING
              </div>
              <div style={{ color: "#90CAF9", fontSize: 10 }}>
                Structured Lessons · Beginners to Advanced · English & Hindi
              </div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                display: "flex",
                gap: 2,
                background: "rgba(255,255,255,0.15)",
                padding: "2px",
                borderRadius: 3,
              }}
            >
              <button
                type="button"
                onClick={() => setLang("english")}
                data-ocid="learning.toggle"
                style={{
                  padding: "3px 10px",
                  fontSize: 10,
                  fontWeight: 700,
                  borderRadius: 2,
                  border: "none",
                  background: lang === "english" ? "#fff" : "transparent",
                  color: lang === "english" ? "#1565C0" : "#fff",
                  cursor: "pointer",
                }}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => setLang("hindi")}
                data-ocid="learning.toggle"
                style={{
                  padding: "3px 10px",
                  fontSize: 10,
                  fontWeight: 700,
                  borderRadius: 2,
                  border: "none",
                  background: lang === "hindi" ? "#fff" : "transparent",
                  color: lang === "hindi" ? "#1565C0" : "#fff",
                  cursor: "pointer",
                }}
              >
                हिंदी
              </button>
            </div>
            <a
              href="/"
              data-ocid="learning.link"
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
        </div>

        {/* Progress Bar */}
        <div
          style={{
            background: "#1565C0",
            padding: "5px 14px",
            display: "flex",
            alignItems: "center",
            gap: 10,
            borderBottom: "2px solid #0D47A1",
          }}
        >
          <span style={{ fontSize: 10, color: "#fff", fontWeight: 600 }}>
            Overall Progress: {completedLessons}/{totalLessons} lessons
          </span>
          <div
            style={{
              flex: 1,
              background: "rgba(255,255,255,0.2)",
              borderRadius: 2,
              height: 6,
            }}
          >
            <div
              style={{
                background: "#f57c00",
                height: "100%",
                borderRadius: 2,
                width: `${overallProgress}%`,
                transition: "width 0.5s",
              }}
            />
          </div>
          <span style={{ fontSize: 10, color: "#fff" }}>
            {overallProgress}%
          </span>
        </div>

        {/* Main Content */}
        <div
          style={{
            display: "flex",
            height:
              "calc(min(100vw - 16px, calc((100vh - 16px) * 16 / 9)) * 9 / 16 - 110px)",
            minHeight: 360,
            overflow: "hidden",
          }}
        >
          {/* LEFT: Lesson List */}
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
              }}
            >
              {lang === "english" ? "ENGLISH LESSONS" : "हिंदी पाठ"}
            </div>
            {filteredLessons.map((lesson, idx) => {
              const lp = progress[lesson.id];
              const unlocked = isUnlocked(lesson, idx);
              const isActive = lesson.id === activeLessonId;
              return (
                <button
                  key={lesson.id}
                  type="button"
                  disabled={!unlocked}
                  onClick={() => {
                    if (unlocked) {
                      setActiveLessonId(lesson.id);
                      setExerciseIndex(0);
                    }
                  }}
                  data-ocid={`learning.item.${idx + 1}`}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    padding: "7px 10px",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    background: isActive ? "#1565C0" : "transparent",
                    border: "none",
                    borderBottom: "1px solid #eee",
                    cursor: unlocked ? "pointer" : "not-allowed",
                    opacity: unlocked ? 1 : 0.5,
                  }}
                >
                  <div
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 10,
                      fontWeight: 800,
                      flexShrink: 0,
                      background: lp?.passed
                        ? "#e8f5e9"
                        : isActive
                          ? "rgba(255,255,255,0.2)"
                          : "#e8f0fe",
                      color: lp?.passed
                        ? "#2e7d32"
                        : isActive
                          ? "#fff"
                          : "#1565C0",
                    }}
                  >
                    {lp?.passed ? "✓" : !unlocked ? "🔒" : lesson.level}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: isActive ? "#fff" : "#333",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {lesson.title}
                    </div>
                    {lp && (
                      <div
                        style={{
                          fontSize: 9,
                          color: isActive ? "rgba(255,255,255,0.7)" : "#888",
                        }}
                      >
                        Best: {lp.bestWPM} WPM · {lp.bestAccuracy}%
                      </div>
                    )}
                  </div>
                  {lp?.passed && !isActive && (
                    <span
                      style={{
                        fontSize: 9,
                        background: "#e8f5e9",
                        color: "#2e7d32",
                        padding: "1px 5px",
                        borderRadius: 2,
                        fontWeight: 700,
                      }}
                    >
                      Done
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* RIGHT: Practice Panel */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              background: "#f5f5f5",
              padding: 12,
            }}
          >
            {activeLesson && (
              <>
                {/* Lesson Header */}
                <div
                  style={{
                    background: "#1565C0",
                    color: "#fff",
                    borderRadius: 4,
                    padding: "8px 12px",
                    marginBottom: 10,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 13 }}>
                      {activeLesson.title}
                    </div>
                    <div style={{ fontSize: 10, opacity: 0.85 }}>
                      {activeLesson.description}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <div
                      style={{
                        background: "rgba(255,255,255,0.15)",
                        borderRadius: 3,
                        padding: "4px 10px",
                        textAlign: "center",
                      }}
                    >
                      <div style={{ fontSize: 14, fontWeight: 800 }}>
                        {activeLesson.targetWPM}
                      </div>
                      <div style={{ fontSize: 9, opacity: 0.8 }}>
                        Target WPM
                      </div>
                    </div>
                    <div
                      style={{
                        background: "rgba(255,255,255,0.15)",
                        borderRadius: 3,
                        padding: "4px 10px",
                        textAlign: "center",
                      }}
                    >
                      <div style={{ fontSize: 14, fontWeight: 800 }}>
                        {activeLesson.targetAccuracy}%
                      </div>
                      <div style={{ fontSize: 9, opacity: 0.8 }}>Min Acc</div>
                    </div>
                  </div>
                </div>

                {/* Keyboard visual */}
                {activeLesson.language === "english" && (
                  <MiniKeyboard highlightKeys={activeLesson.keys ?? []} />
                )}
                {activeLesson.language === "hindi" &&
                  activeLesson.keys?.length > 0 && (
                    <div
                      style={{
                        background: "#fff3e0",
                        border: "1px solid #ffe0b2",
                        borderRadius: 4,
                        padding: "6px 10px",
                        marginBottom: 8,
                        display: "flex",
                        gap: 6,
                        flexWrap: "wrap",
                      }}
                    >
                      {activeLesson.keys.map((k) => (
                        <span
                          key={k}
                          style={{
                            background: "#e65100",
                            color: "#fff",
                            padding: "3px 10px",
                            borderRadius: 4,
                            fontSize: 14,
                            fontWeight: 700,
                          }}
                        >
                          {k}
                        </span>
                      ))}
                    </div>
                  )}

                {/* Exercise selector */}
                <div
                  style={{
                    display: "flex",
                    gap: 4,
                    marginBottom: 8,
                    flexWrap: "wrap",
                    alignItems: "center",
                  }}
                >
                  <span style={{ fontSize: 10, color: "#666" }}>Exercise:</span>
                  {activeLesson.exercises
                    .map((_, _i) => ({ num: _i + 1 }))
                    .map(({ num }) => (
                      <button
                        key={`ex-${num}`}
                        type="button"
                        onClick={() => {
                          setExerciseIndex(num - 1);
                          resetExercise();
                        }}
                        data-ocid="learning.tab"
                        style={{
                          width: 24,
                          height: 24,
                          borderRadius: "50%",
                          fontSize: 10,
                          fontWeight: 700,
                          background:
                            num - 1 === exerciseIndex ? "#1565C0" : "#fff",
                          color: num - 1 === exerciseIndex ? "#fff" : "#555",
                          border: "1px solid #ccc",
                          cursor: "pointer",
                        }}
                      >
                        {num}
                      </button>
                    ))}
                </div>

                {/* Passage */}
                <div
                  style={{
                    background: "#fff",
                    border: "1px solid #ccc",
                    borderRadius: 4,
                    padding: "8px 10px",
                    marginBottom: 6,
                    fontFamily:
                      activeLesson.language === "hindi"
                        ? "Mangal, Arial Unicode MS, sans-serif"
                        : "monospace",
                    fontSize: 15,
                    lineHeight: 1.9,
                  }}
                >
                  {Array.from(currentText)
                    .map((c, _i) => ({ c, pos: _i }))
                    .map(({ c: char, pos }) => {
                      let color = "#aaa";
                      let bg = "transparent";
                      if (pos < typed.length) {
                        color = typed[pos] === char ? "#16a34a" : "#dc2626";
                        if (typed[pos] !== char) bg = "#fee2e2";
                      } else if (pos === typed.length) {
                        color = "#1d4ed8";
                        bg = "#dbeafe";
                      }
                      return (
                        <span key={pos} style={{ color, background: bg }}>
                          {char}
                        </span>
                      );
                    })}
                </div>

                {/* Stats */}
                <div style={{ display: "flex", gap: 8, marginBottom: 6 }}>
                  {[
                    { l: "WPM", v: wpm, color: "#1565C0" },
                    { l: "Accuracy", v: `${accuracy}%`, color: "#2e7d32" },
                    {
                      l: "Progress",
                      v: `${typed.length}/${currentText.length}`,
                      color: "#555",
                    },
                  ].map((s) => (
                    <div
                      key={s.l}
                      style={{
                        background: "#fff",
                        border: "1px solid #ddd",
                        borderRadius: 3,
                        padding: "4px 10px",
                        textAlign: "center",
                      }}
                    >
                      <div
                        style={{
                          fontSize: 14,
                          fontWeight: 800,
                          color: s.color,
                        }}
                      >
                        {s.v}
                      </div>
                      <div style={{ fontSize: 9, color: "#888" }}>{s.l}</div>
                    </div>
                  ))}
                </div>

                {/* Input */}
                <input
                  ref={inputRef}
                  type="text"
                  value={typed}
                  onChange={handleChange}
                  disabled={finished}
                  placeholder={
                    finished ? "Exercise complete!" : "Start typing here..."
                  }
                  style={{
                    width: "100%",
                    fontFamily:
                      activeLesson.language === "hindi"
                        ? "Mangal, Arial Unicode MS, sans-serif"
                        : "monospace",
                    fontSize: 14,
                    border: "1px solid #ccc",
                    borderRadius: 4,
                    padding: "8px 10px",
                    background: finished ? "#f5f5f5" : "#fff",
                    outline: "none",
                    boxSizing: "border-box",
                    marginBottom: 6,
                  }}
                  data-ocid="learning.input"
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck={false}
                />

                {/* Progress bar */}
                <div
                  style={{
                    background: "#e0e0e0",
                    borderRadius: 2,
                    height: 6,
                    marginBottom: 8,
                  }}
                >
                  <div
                    style={{
                      background: "#1565C0",
                      height: "100%",
                      borderRadius: 2,
                      width: `${currentText.length > 0 ? Math.min((typed.length / currentText.length) * 100, 100) : 0}%`,
                      transition: "width 0.3s",
                    }}
                  />
                </div>

                {/* Result */}
                {resultData && (
                  <div
                    data-ocid="learning.dialog"
                    style={{
                      background:
                        resultData.wpm >= (activeLesson?.targetWPM ?? 0) &&
                        resultData.accuracy >=
                          (activeLesson?.targetAccuracy ?? 0)
                          ? "#e8f5e9"
                          : "#fff3e0",
                      border: "1px solid #ccc",
                      borderRadius: 4,
                      padding: "10px 14px",
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                    }}
                  >
                    <div style={{ fontSize: 28 }}>
                      {resultData.wpm >= (activeLesson?.targetWPM ?? 0) &&
                      resultData.accuracy >= (activeLesson?.targetAccuracy ?? 0)
                        ? "🏆"
                        : "⭐"}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          fontWeight: 800,
                          fontSize: 13,
                          color:
                            resultData.wpm >= (activeLesson?.targetWPM ?? 0)
                              ? "#2e7d32"
                              : "#e65100",
                        }}
                      >
                        {resultData.wpm >= (activeLesson?.targetWPM ?? 0) &&
                        resultData.accuracy >=
                          (activeLesson?.targetAccuracy ?? 0)
                          ? "Lesson Passed!"
                          : "Good Try!"}
                      </div>
                      <div style={{ fontSize: 11, color: "#555" }}>
                        {resultData.wpm} WPM · {resultData.accuracy}% Accuracy
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button
                        type="button"
                        onClick={() => resetExercise()}
                        data-ocid="learning.cancel_button"
                        style={{
                          background: "#fff",
                          border: "1px solid #ccc",
                          borderRadius: 3,
                          padding: "5px 12px",
                          fontSize: 11,
                          fontWeight: 700,
                          cursor: "pointer",
                        }}
                      >
                        ↺ Retry
                      </button>
                      <button
                        type="button"
                        onClick={handleNext}
                        data-ocid="learning.confirm_button"
                        style={{
                          background: "#1565C0",
                          color: "#fff",
                          border: "none",
                          borderRadius: 3,
                          padding: "5px 12px",
                          fontSize: 11,
                          fontWeight: 700,
                          cursor: "pointer",
                        }}
                      >
                        Next →
                      </button>
                    </div>
                  </div>
                )}

                {/* Tips */}
                <div
                  style={{
                    background: "#e8f0fe",
                    border: "1px solid #90caf9",
                    borderRadius: 4,
                    padding: "6px 10px",
                    marginTop: 6,
                    fontSize: 11,
                    color: "#1565C0",
                  }}
                >
                  💡{" "}
                  {activeLesson.language === "english"
                    ? "Keep fingers on home row (ASDF JKL;). Don't look at keyboard!"
                    : "अपनी उंगलियाँ सही जगह रखें। जल्दी नहीं, सटीक टाइप करें।"}
                </div>
              </>
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
          <span>📚 {totalLessons} Lessons Available</span>
          <span>✅ {completedLessons} Completed</span>
          <span>📊 {overallProgress}% Done</span>
          <span style={{ marginLeft: "auto" }}>
            Mode: {lang === "english" ? "English" : "Hindi"} · Lesson:{" "}
            {activeLesson?.title}
          </span>
        </div>
      </div>
    </div>
  );
}

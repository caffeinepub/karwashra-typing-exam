import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { LESSONS, type Lesson } from "@/data/learnTypingLessons";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "@tanstack/react-router";
import {
  BookOpen,
  CheckCircle,
  ChevronRight,
  Lock,
  RefreshCw,
  Star,
  Trophy,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

// ── Types ──────────────────────────────────────────────────────────────────
interface LessonProgress {
  lessonId: string;
  bestWPM: number;
  bestAccuracy: number;
  completedAt: string;
  attempts: number;
  passed: boolean;
}

// ── Keyboard layout ────────────────────────────────────────────────────────
const QWERTY_ROWS = [
  ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l", ";"],
  ["z", "x", "c", "v", "b", "n", "m", ",", ".", "/"],
];

function KeyboardDisplay({ highlightKeys }: { highlightKeys: string[] }) {
  const lowerKeys = highlightKeys.map((k) => k.toLowerCase());
  return (
    <div className="bg-gray-100 rounded-xl p-3 w-full max-w-lg mx-auto">
      {QWERTY_ROWS.map((row) => (
        <div key={row.join("")} className="flex justify-center gap-1 mb-1">
          {row.map((key) => {
            const active = lowerKeys.includes(key.toLowerCase());
            return (
              <div
                key={key}
                className={`w-9 h-9 rounded-md text-xs font-bold flex items-center justify-center border-b-2 uppercase transition-colors ${
                  active
                    ? "bg-blue-brand text-white border-blue-900 shadow-md"
                    : "bg-white text-gray-600 border-gray-300"
                }`}
              >
                {key}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

// ── Hindi keyboard hint ─────────────────────────────────────────────────────
function HindiKeyHint({ keys }: { keys: string[] }) {
  if (!keys.length) return null;
  return (
    <div className="bg-saffron/10 border border-saffron/30 rounded-xl p-3 text-center">
      <p className="text-xs text-muted-foreground mb-2">Practice Keys</p>
      <div className="flex flex-wrap justify-center gap-2">
        {keys.map((k) => (
          <span
            key={k}
            className="inline-flex items-center justify-center w-10 h-10 bg-saffron text-white rounded-lg text-lg font-bold shadow"
          >
            {k}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Typing area ─────────────────────────────────────────────────────────────
// Note: This component is always rendered with a unique key from the parent,
// so it fully remounts on lesson/exercise change. No reset effect needed.
function TypingArea({
  lesson,
  exerciseIndex,
  onComplete,
}: {
  lesson: Lesson;
  exerciseIndex: number;
  onComplete: (wpm: number, accuracy: number) => void;
}) {
  const text = lesson.exercises[exerciseIndex];
  const [typed, setTyped] = useState("");
  const [started, setStarted] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [finished, setFinished] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const wpm = (() => {
    if (!started || !startTime) return 0;
    const elapsed = (Date.now() - startTime) / 60000;
    const words = typed.trim().split(/\s+/).filter(Boolean).length;
    return elapsed > 0 ? Math.round(words / elapsed) : 0;
  })();

  const accuracy = (() => {
    if (!typed.length) return 100;
    let correct = 0;
    for (let i = 0; i < typed.length; i++) {
      if (typed[i] === text[i]) correct++;
    }
    return Math.round((correct / typed.length) * 100);
  })();

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (finished) return;
      const val = e.target.value;
      if (!started) {
        setStarted(true);
        setStartTime(Date.now());
      }
      setTyped(val);
      if (val.length >= text.length) {
        setFinished(true);
        const elapsed = (Date.now() - startTime) / 60000;
        const words = val.trim().split(/\s+/).filter(Boolean).length;
        const finalWpm = elapsed > 0 ? Math.round(words / elapsed) : 0;
        let correct = 0;
        for (let i = 0; i < val.length; i++) {
          if (val[i] === text[i]) correct++;
        }
        const finalAcc = Math.round((correct / val.length) * 100);
        onComplete(finalWpm, finalAcc);
      }
    },
    [finished, started, startTime, text, onComplete],
  );

  return (
    <div className="space-y-4">
      {/* Stats bar */}
      <div className="flex gap-4 text-sm">
        <div className="bg-navy/5 rounded-lg px-3 py-1.5 text-center">
          <div className="text-lg font-bold text-navy">{wpm}</div>
          <div className="text-xs text-muted-foreground">WPM</div>
        </div>
        <div className="bg-navy/5 rounded-lg px-3 py-1.5 text-center">
          <div className="text-lg font-bold text-navy">{accuracy}%</div>
          <div className="text-xs text-muted-foreground">Accuracy</div>
        </div>
        <div className="bg-navy/5 rounded-lg px-3 py-1.5 text-center">
          <div className="text-lg font-bold text-navy">
            {typed.length}/{text.length}
          </div>
          <div className="text-xs text-muted-foreground">Chars</div>
        </div>
      </div>

      {/* Passage display */}
      <div
        className="bg-gray-50 border border-border rounded-xl p-4 font-mono text-lg leading-loose select-none"
        style={{
          fontFamily:
            lesson.language === "hindi"
              ? "Mangal, Arial Unicode MS, sans-serif"
              : "monospace",
        }}
      >
        {Array.from(text).map((char, i) => {
          let cls = "text-gray-400";
          if (i < typed.length) {
            cls =
              typed[i] === char
                ? "text-green-600"
                : "text-red-500 bg-red-100 rounded";
          } else if (i === typed.length) {
            cls = "border-l-2 border-blue-brand text-gray-400";
          }
          return (
            // biome-ignore lint/suspicious/noArrayIndexKey: character-level rendering requires index key
            <span key={i} className={cls}>
              {char}
            </span>
          );
        })}
      </div>

      {/* Input */}
      <input
        ref={inputRef}
        type="text"
        value={typed}
        onChange={handleChange}
        disabled={finished}
        placeholder="Start typing here..."
        className="w-full border border-border rounded-xl px-4 py-3 text-base font-mono focus:outline-none focus:ring-2 focus:ring-blue-brand bg-white"
        style={{
          fontFamily:
            lesson.language === "hindi"
              ? "Mangal, Arial Unicode MS, sans-serif"
              : "monospace",
        }}
        data-ocid="learn.input"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
      />
      <Progress
        value={Math.min((typed.length / text.length) * 100, 100)}
        className="h-2"
      />
    </div>
  );
}

// ── Result Overlay ───────────────────────────────────────────────────────────
function ResultOverlay({
  wpm,
  accuracy,
  lesson,
  onNext,
  onRetry,
}: {
  wpm: number;
  accuracy: number;
  lesson: Lesson;
  onNext: () => void;
  onRetry: () => void;
}) {
  const passed = wpm >= lesson.targetWPM && accuracy >= lesson.targetAccuracy;
  return (
    <div
      className="absolute inset-0 bg-white/95 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center z-10 p-6"
      data-ocid="learn.dialog"
    >
      <div
        className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 ${
          passed ? "bg-green-100" : "bg-amber-100"
        }`}
      >
        {passed ? (
          <Trophy className="w-10 h-10 text-green-600" />
        ) : (
          <Star className="w-10 h-10 text-amber-500" />
        )}
      </div>
      <h3
        className={`text-2xl font-bold font-poppins mb-1 ${
          passed ? "text-green-700" : "text-amber-600"
        }`}
      >
        {passed ? "Lesson Passed! 🎉" : "Good Try!"}
      </h3>
      <p className="text-muted-foreground text-sm mb-6">
        {passed
          ? "You've met the target!"
          : `Target: ${lesson.targetWPM} WPM & ${lesson.targetAccuracy}% accuracy`}
      </p>
      <div className="flex gap-6 mb-8">
        <div className="text-center">
          <div className="text-3xl font-bold text-navy">{wpm}</div>
          <div className="text-xs text-muted-foreground">WPM</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-navy">{accuracy}%</div>
          <div className="text-xs text-muted-foreground">Accuracy</div>
        </div>
        <div className="text-center">
          <div
            className={`text-3xl font-bold ${
              passed ? "text-green-600" : "text-red-500"
            }`}
          >
            {passed ? "PASS" : "FAIL"}
          </div>
          <div className="text-xs text-muted-foreground">Result</div>
        </div>
      </div>
      <div className="flex gap-3">
        <Button
          variant="outline"
          onClick={onRetry}
          className="gap-2"
          data-ocid="learn.cancel_button"
        >
          <RefreshCw className="w-4 h-4" /> Retry
        </Button>
        <Button
          onClick={onNext}
          className="bg-blue-brand hover:bg-blue-brand-light text-white gap-2"
          data-ocid="learn.confirm_button"
        >
          Next Exercise <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

// ── Main page ────────────────────────────────────────────────────────────────
export function LearnTyping() {
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
  const [resultData, setResultData] = useState<{
    wpm: number;
    accuracy: number;
  } | null>(null);

  const filteredLessons = LESSONS.filter((l) => l.language === lang);
  const activeLesson =
    LESSONS.find((l) => l.id === activeLessonId) ?? filteredLessons[0];

  useEffect(() => {
    const first = LESSONS.filter((l) => l.language === lang)[0];
    setActiveLessonId(first?.id ?? "en-1");
    setExerciseIndex(0);
    setResultData(null);
  }, [lang]);

  const isUnlocked = (_lesson: Lesson, idx: number): boolean => {
    if (idx === 0) return true;
    const prev = filteredLessons[idx - 1];
    return !!progress[prev.id]?.passed;
  };

  const handleComplete = useCallback(
    (wpm: number, accuracy: number) => {
      const lesson = activeLesson;
      const passed =
        wpm >= lesson.targetWPM && accuracy >= lesson.targetAccuracy;
      const prev = progress[lesson.id];
      const updated: LessonProgress = {
        lessonId: lesson.id,
        bestWPM: Math.max(wpm, prev?.bestWPM ?? 0),
        bestAccuracy: Math.max(accuracy, prev?.bestAccuracy ?? 0),
        completedAt: new Date().toISOString(),
        attempts: (prev?.attempts ?? 0) + 1,
        passed: passed || (prev?.passed ?? false),
      };
      const newProgress = { ...progress, [lesson.id]: updated };
      setProgress(newProgress);
      localStorage.setItem(storageKey, JSON.stringify(newProgress));
      setResultData({ wpm, accuracy });
    },
    [activeLesson, progress, storageKey],
  );

  const handleRetry = () => {
    setResultData(null);
  };

  const handleNext = () => {
    setResultData(null);
    if (exerciseIndex < activeLesson.exercises.length - 1) {
      setExerciseIndex(exerciseIndex + 1);
    } else {
      const currentIdx = filteredLessons.findIndex(
        (l) => l.id === activeLessonId,
      );
      const next = filteredLessons[currentIdx + 1];
      if (next) {
        setActiveLessonId(next.id);
        setExerciseIndex(0);
      }
    }
  };

  const lessonProgress = progress[activeLessonId];

  return (
    <main className="min-h-screen bg-light-gray py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Link
                to="/"
                className="text-xs text-muted-foreground hover:text-navy"
              >
                Home
              </Link>
              <ChevronRight className="w-3 h-3 text-muted-foreground" />
              <span className="text-xs text-navy font-semibold">
                Learn Typing
              </span>
            </div>
            <h1 className="text-2xl font-poppins font-bold text-navy flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-blue-brand" />
              Learn Typing
            </h1>
            <p className="text-muted-foreground text-sm">
              Structured lessons from basics to exam-ready proficiency
            </p>
          </div>
          {/* Language Toggle */}
          <div className="flex bg-white border border-border rounded-full p-1 shadow-sm">
            <button
              type="button"
              onClick={() => setLang("english")}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${
                lang === "english"
                  ? "bg-blue-brand text-white shadow"
                  : "text-muted-foreground hover:text-navy"
              }`}
              data-ocid="learn.toggle"
            >
              English
            </button>
            <button
              type="button"
              onClick={() => setLang("hindi")}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${
                lang === "hindi"
                  ? "bg-saffron text-white shadow"
                  : "text-muted-foreground hover:text-navy"
              }`}
              data-ocid="learn.toggle"
            >
              हिंदी
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
          {/* ── Lesson List ─────────────────────────────────────────── */}
          <aside>
            <Card className="shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-poppins text-navy">
                  {lang === "english" ? "English Lessons" : "हिंदी पाठ"}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ul>
                  {filteredLessons.map((lesson, idx) => {
                    const lp = progress[lesson.id];
                    const unlocked = isUnlocked(lesson, idx);
                    const isActive = lesson.id === activeLessonId;
                    return (
                      <li key={lesson.id} data-ocid={`learn.item.${idx + 1}`}>
                        <button
                          type="button"
                          disabled={!unlocked}
                          onClick={() => {
                            if (unlocked) {
                              setActiveLessonId(lesson.id);
                              setExerciseIndex(0);
                              setResultData(null);
                            }
                          }}
                          className={`w-full text-left px-4 py-3 flex items-center gap-3 border-b border-border last:border-0 transition-colors ${
                            isActive
                              ? "bg-navy text-white"
                              : unlocked
                                ? "hover:bg-muted/50 text-foreground"
                                : "opacity-50 cursor-not-allowed text-muted-foreground"
                          }`}
                        >
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                              lp?.passed
                                ? "bg-green-100 text-green-700"
                                : isActive
                                  ? "bg-white/20 text-white"
                                  : unlocked
                                    ? "bg-blue-brand/10 text-blue-brand"
                                    : "bg-gray-100 text-gray-400"
                            }`}
                          >
                            {lp?.passed ? (
                              <CheckCircle className="w-4 h-4" />
                            ) : !unlocked ? (
                              <Lock className="w-3.5 h-3.5" />
                            ) : (
                              lesson.level
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div
                              className={`text-xs font-semibold truncate ${
                                isActive ? "text-white" : "text-foreground"
                              }`}
                            >
                              {lesson.title}
                            </div>
                            {lp && (
                              <div className="text-[10px] text-muted-foreground mt-0.5">
                                Best: {lp.bestWPM} WPM · {lp.bestAccuracy}%
                              </div>
                            )}
                          </div>
                          {lp?.passed && !isActive && (
                            <Badge className="text-[9px] bg-green-100 text-green-700 border-green-200 shrink-0">
                              Done
                            </Badge>
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </CardContent>
            </Card>
          </aside>

          {/* ── Practice Panel ─────────────────────────────────────── */}
          <div className="space-y-4">
            {/* Lesson header */}
            <Card className="shadow-card">
              <CardContent className="pt-5">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className="bg-navy/10 text-navy text-xs">
                        Level {activeLesson?.level}
                      </Badge>
                      {activeLesson?.language === "hindi" && (
                        <Badge className="bg-saffron/10 text-amber-700 text-xs border-saffron/30">
                          हिंदी
                        </Badge>
                      )}
                    </div>
                    <h2 className="text-xl font-poppins font-bold text-navy">
                      {activeLesson?.title}
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      {activeLesson?.description}
                    </p>
                  </div>
                  <div className="flex gap-4 text-center shrink-0">
                    <div className="bg-blue-brand/5 rounded-lg px-3 py-2">
                      <div className="text-lg font-bold text-blue-brand">
                        {activeLesson?.targetWPM}
                      </div>
                      <div className="text-[10px] text-muted-foreground">
                        Target WPM
                      </div>
                    </div>
                    <div className="bg-green-50 rounded-lg px-3 py-2">
                      <div className="text-lg font-bold text-green-700">
                        {activeLesson?.targetAccuracy}%
                      </div>
                      <div className="text-[10px] text-muted-foreground">
                        Min Accuracy
                      </div>
                    </div>
                    {lessonProgress && (
                      <div className="bg-amber-50 rounded-lg px-3 py-2">
                        <div className="text-lg font-bold text-amber-700">
                          {lessonProgress.attempts}
                        </div>
                        <div className="text-[10px] text-muted-foreground">
                          Attempts
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Keyboard */}
            <Card className="shadow-card">
              <CardContent className="pt-4 pb-4">
                {activeLesson?.language === "english" ? (
                  <KeyboardDisplay highlightKeys={activeLesson?.keys ?? []} />
                ) : (
                  <HindiKeyHint keys={activeLesson?.keys ?? []} />
                )}
              </CardContent>
            </Card>

            {/* Exercise selector */}
            <div className="flex gap-2 flex-wrap">
              {activeLesson?.exercises.map((_, i) => (
                <button
                  key={`exercise-${i + 1}`}
                  type="button"
                  onClick={() => {
                    setExerciseIndex(i);
                    setResultData(null);
                  }}
                  className={`w-8 h-8 rounded-full text-xs font-bold border transition-colors ${
                    i === exerciseIndex
                      ? "bg-blue-brand text-white border-blue-brand"
                      : progress[activeLessonId]?.attempts
                        ? "bg-white text-navy border-navy/30 hover:bg-navy/5"
                        : "bg-white text-muted-foreground border-border hover:bg-muted/50"
                  }`}
                  data-ocid="learn.tab"
                >
                  {i + 1}
                </button>
              ))}
            </div>

            {/* Typing area */}
            <Card className="shadow-card relative">
              <CardContent className="pt-5">
                {activeLesson && (
                  <TypingArea
                    key={`${activeLessonId}-${exerciseIndex}`}
                    lesson={activeLesson}
                    exerciseIndex={exerciseIndex}
                    onComplete={handleComplete}
                  />
                )}
              </CardContent>
              {resultData && activeLesson && (
                <ResultOverlay
                  wpm={resultData.wpm}
                  accuracy={resultData.accuracy}
                  lesson={activeLesson}
                  onNext={handleNext}
                  onRetry={handleRetry}
                />
              )}
            </Card>

            {/* Tips */}
            <div className="bg-blue-brand/5 border border-blue-brand/20 rounded-xl p-4 text-sm text-navy">
              <strong>Tip:</strong>{" "}
              {activeLesson?.language === "english"
                ? "Keep your fingers on the home row (ASDF JKL;). Don't look at the keyboard — trust muscle memory!"
                : "अपनी उंगलियाँ सही जगह रखें। जल्दी करने से बेहतर है सटीक टाइप करना।"}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

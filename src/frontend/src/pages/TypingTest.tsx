import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { EXAMS, generatePassageOfLength } from "@/data/exams";
import { useActor } from "@/hooks/useActor";
import { useAuth } from "@/hooks/useAuth";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Highlighter,
  Play,
  Radio,
  RotateCcw,
  Timer,
  User,
} from "lucide-react";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";

type TestState = "idle" | "running" | "finished";

const TIME_PRESETS = [1, 2, 5, 10, 15, 20];

function generateSessionId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

/** Get available language options for an exam */
function getLanguageOptions(examLanguage: string): string[] {
  const lang = examLanguage.toLowerCase();
  if (lang.includes("hindi") && lang.includes("english"))
    return ["English", "Hindi"];
  if (lang.includes("hindi")) return ["Hindi", "English"];
  return ["English"];
}

// Memoized passage display for performance — avoids re-render on every keystroke
const PassageDisplay = memo(function PassageDisplay({
  passage,
  typed,
  highlightEnabled,
  fontSize,
}: {
  passage: string;
  typed: string;
  highlightEnabled: boolean;
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

  const segments: { text: string; startIndex: number }[] = [];
  let i = 0;
  while (i < passage.length) {
    const spaceStart = i;
    while (i < passage.length && passage[i] === " ") i++;
    if (i > spaceStart)
      segments.push({
        text: passage.slice(spaceStart, i),
        startIndex: spaceStart,
      });
    const wordStart = i;
    while (i < passage.length && passage[i] !== " ") i++;
    if (i > wordStart)
      segments.push({
        text: passage.slice(wordStart, i),
        startIndex: wordStart,
      });
  }
  const cursorPos = typed.length;

  return (
    <div
      ref={containerRef}
      className="overflow-y-auto"
      style={{ maxHeight: "180px" }}
    >
      <div
        className="font-mono leading-loose select-none"
        style={{ fontSize: `${fontSize}px` }}
      >
        {segments.map((seg) => {
          const isCurrentWord =
            highlightEnabled &&
            cursorPos >= seg.startIndex &&
            cursorPos < seg.startIndex + seg.text.length;
          const chars = seg.text.split("").map((char, ci) => {
            const gi = seg.startIndex + ci;
            let cls = "passage-upcoming";
            if (!highlightEnabled) cls = "text-gray-400";
            else if (gi < typed.length)
              cls = typed[gi] === char ? "passage-correct" : "passage-error";
            else if (gi === typed.length) cls = "passage-current";
            const isCurrent = gi === typed.length;
            return (
              <span
                key={`c-${gi}`}
                className={cls}
                ref={isCurrent ? currentCharRef : undefined}
              >
                {char}
              </span>
            );
          });
          return (
            <span
              key={`seg-${seg.startIndex}`}
              className={
                isCurrentWord
                  ? "bg-yellow-100 rounded px-0.5 text-[1.08em] transition-all duration-100"
                  : ""
              }
            >
              {chars}
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

  const [passage, setPassage] = useState("");
  const [typed, setTyped] = useState("");
  const [state, setState] = useState<TestState>("idle");
  const [timeLeft, setTimeLeft] = useState(0);
  const [startTime, setStartTime] = useState<number>(0);
  const [highlightEnabled, setHighlightEnabled] = useState(true);
  const [backspaceAllowed, setBackspaceAllowed] = useState(true);
  const [selectedTimeMin, setSelectedTimeMin] = useState(exam?.timeMin ?? 10);
  const [paragraphWords, setParagraphWords] = useState(400);
  const [fontSize, setFontSize] = useState(16);
  const [selectedLanguage, setSelectedLanguage] = useState<string>(
    languageOptions[0],
  );

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const resetTest = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (exam) {
      setPassage(
        generatePassageOfLength(exam, paragraphWords, selectedLanguage),
      );
      setTimeLeft(selectedTimeMin * 60);
    }
    setTyped("");
    setState("idle");
  }, [exam, paragraphWords, selectedTimeMin, selectedLanguage]);

  useEffect(() => {
    resetTest();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resetTest]);

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

  // Memoize stats to avoid expensive recalc every render
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

  const progress =
    selectedTimeMin > 0
      ? ((selectedTimeMin * 60 - timeLeft) / (selectedTimeMin * 60)) * 100
      : 0;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeStr = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  if (!exam) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Exam not found.</p>
          <Link to="/exams">
            <Button>Back to Exams</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-light-gray">
      <div className="bg-navy">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              to="/exam/$id/rules"
              params={{ id }}
              className="text-white/65 hover:text-white transition-colors"
              data-ocid="test.link"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-2">
              {exam.logoUrl && (
                <img
                  src={exam.logoUrl}
                  alt={`${exam.name} logo`}
                  className="w-7 h-7 rounded object-contain bg-white p-0.5"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              )}
              <div>
                <div className="text-white font-poppins font-bold text-sm">
                  {exam.name} — Typing Test
                </div>
                <div className="text-white/55 text-xs">{exam.authority}</div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {isLoggedIn && auth?.username && (
              <div className="hidden sm:flex items-center gap-1.5 bg-white/10 border border-white/20 rounded px-3 py-1 text-white text-xs font-mono">
                <User className="w-3 h-3" />
                Login ID: <span className="font-bold">{auth.username}</span>
              </div>
            )}
            <Badge
              className={`font-mono text-base px-3 py-1 ${
                timeLeft < 60
                  ? "bg-red-500 text-white"
                  : "bg-blue-brand/30 text-white"
              }`}
            >
              <Timer className="w-3.5 h-3.5 mr-1.5" />
              {timeStr}
            </Badge>
            <Button
              size="sm"
              variant="ghost"
              onClick={resetTest}
              className="text-white hover:bg-white/10 rounded-full"
              data-ocid="test.secondary_button"
            >
              <RotateCcw className="w-4 h-4 mr-1" /> Reset
            </Button>
          </div>
        </div>
        <Progress value={progress} className="h-1 rounded-none bg-white/10" />
      </div>

      <div className="max-w-5xl mx-auto px-4 py-4 space-y-4">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-3">
          {[
            {
              label: "WPM",
              value: state === "running" ? stats.wpm : "—",
              highlight: stats.wpm >= exam.requiredWPM && state === "running",
            },
            {
              label: "Accuracy",
              value: state === "running" ? `${stats.accuracy}%` : "—",
              highlight: stats.accuracy >= exam.accuracy && state === "running",
            },
            {
              label: "Errors",
              value: state === "running" ? stats.errors : "—",
              highlight: false,
            },
            {
              label: "Required WPM",
              value: exam.requiredWPM > 0 ? exam.requiredWPM : "KDPH",
              highlight: false,
            },
          ].map(({ label, value, highlight }) => (
            <div
              key={label}
              className={`rounded-xl p-3 text-center shadow-card border ${
                highlight
                  ? "bg-green-50 border-green-200"
                  : "bg-white border-border"
              }`}
            >
              <div
                className={`font-poppins font-bold text-xl ${highlight ? "text-green-700" : "text-navy"}`}
              >
                {value}
              </div>
              <div className="text-xs text-muted-foreground">{label}</div>
            </div>
          ))}
        </div>

        {/* Passage box — fixed compact height */}
        <div
          className="bg-white rounded-xl border border-border shadow-card p-4"
          data-ocid="test.panel"
        >
          <div className="text-sm text-muted-foreground mb-2 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium">Passage</span>
              <button
                type="button"
                onClick={() => setHighlightEnabled((v) => !v)}
                data-ocid="test.toggle"
                className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded border font-medium transition-colors ${
                  highlightEnabled
                    ? "border-yellow-400 bg-yellow-50 text-yellow-700 hover:bg-yellow-100"
                    : "border-gray-300 bg-gray-50 text-gray-500 hover:bg-gray-100"
                }`}
              >
                <Highlighter className="w-3 h-3" />
                {highlightEnabled ? "ON" : "OFF"}
              </button>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setFontSize((s) => Math.max(12, s - 2))}
                  className="w-6 h-6 rounded border border-border flex items-center justify-center text-xs hover:bg-muted transition-colors"
                >
                  A-
                </button>
                <span className="text-xs text-muted-foreground w-8 text-center">
                  {fontSize}px
                </span>
                <button
                  type="button"
                  onClick={() => setFontSize((s) => Math.min(28, s + 2))}
                  className="w-6 h-6 rounded border border-border flex items-center justify-center text-xs hover:bg-muted transition-colors"
                >
                  A+
                </button>
              </div>
              <span className="font-mono text-xs">
                {typed.length} / {passage.length}
              </span>
            </div>
          </div>
          <PassageDisplay
            passage={passage}
            typed={typed}
            highlightEnabled={highlightEnabled}
            fontSize={fontSize}
          />
        </div>

        {/* Textarea */}
        <div className="bg-white rounded-xl border border-border shadow-card p-4">
          <textarea
            ref={textareaRef}
            value={typed}
            onChange={handleTyping}
            onKeyDown={handleKeyDown}
            disabled={state !== "running"}
            placeholder={
              state === "idle"
                ? "Click 'Start Test' below to begin typing..."
                : state === "finished"
                  ? "Test complete!"
                  : "Start typing here..."
            }
            className="w-full h-28 font-mono text-sm resize-none border border-input rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-ring bg-muted/30 disabled:opacity-60 disabled:cursor-not-allowed"
            data-ocid="test.editor"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
          />
          {!backspaceAllowed && state === "running" && (
            <p className="text-xs text-red-500 mt-1">
              ⚠ Backspace is disabled for this test
            </p>
          )}
        </div>

        {/* Settings (idle only) */}
        {state === "idle" && (
          <div className="bg-white rounded-xl border border-border shadow-card p-5 space-y-4">
            <h3 className="font-poppins font-semibold text-navy text-sm">
              Test Settings
            </h3>

            {/* Language selector — show if exam supports multiple languages */}
            {languageOptions.length > 1 && (
              <div>
                <p className="text-xs text-muted-foreground font-medium mb-2">
                  Language / भाषा
                </p>
                <div className="flex gap-2">
                  {languageOptions.map((lang) => (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => setSelectedLanguage(lang)}
                      data-ocid="test.toggle"
                      className={`px-5 py-1.5 rounded-full text-sm font-semibold border transition-colors ${
                        selectedLanguage === lang
                          ? "bg-navy text-white border-navy"
                          : "bg-white text-navy border-navy/30 hover:bg-navy/5"
                      }`}
                    >
                      {lang === "Hindi" ? "हिंदी (Hindi)" : "English"}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div>
              <p className="text-xs text-muted-foreground font-medium mb-2">
                Time Limit
              </p>
              <div className="flex flex-wrap gap-2">
                {TIME_PRESETS.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setSelectedTimeMin(t)}
                    data-ocid="test.toggle"
                    className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-colors ${
                      selectedTimeMin === t
                        ? "bg-navy text-white border-navy"
                        : "bg-white text-navy border-navy/30 hover:bg-navy/5"
                    }`}
                  >
                    {t} min
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium mb-2">
                Paragraph Length:{" "}
                <span className="text-navy font-bold">
                  {paragraphWords} words
                </span>
              </p>
              <Slider
                min={250}
                max={2000}
                step={50}
                value={[paragraphWords]}
                onValueChange={([val]) => setParagraphWords(val)}
                className="w-full"
                data-ocid="test.toggle"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>250</span>
                <span>2000</span>
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium mb-2">
                Backspace
              </p>
              <button
                type="button"
                onClick={() => setBackspaceAllowed((v) => !v)}
                data-ocid="test.toggle"
                className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-colors ${
                  backspaceAllowed
                    ? "bg-green-50 text-green-700 border-green-300 hover:bg-green-100"
                    : "bg-red-50 text-red-700 border-red-300 hover:bg-red-100"
                }`}
              >
                {backspaceAllowed
                  ? "Backspace: Allowed ✓"
                  : "Backspace: Disabled ✗"}
              </button>
            </div>
            <div className="pt-1 flex flex-wrap items-center justify-center gap-4">
              <Button
                size="lg"
                onClick={startTest}
                className="bg-blue-brand hover:bg-blue-brand-light text-white font-semibold px-10 rounded-full shadow-lg"
                data-ocid="test.primary_button"
              >
                <Play className="w-5 h-5 mr-2" /> Start Test
              </Button>
              <Link to="/live">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-red-300 text-red-600 hover:bg-red-50 font-semibold px-8 rounded-full gap-2"
                  data-ocid="test.secondary_button"
                >
                  <Radio className="w-4 h-4" /> Live Test
                </Button>
              </Link>
            </div>
            <p className="text-xs text-muted-foreground text-center">
              Timer begins when you click Start. You have {selectedTimeMin}{" "}
              {selectedTimeMin === 1 ? "minute" : "minutes"}.
            </p>
          </div>
        )}

        {state === "running" && (
          <div className="bg-white rounded-xl border border-border shadow-card p-3">
            <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
              <span>⏱ {selectedTimeMin} min</span>
              <span>📝 {paragraphWords} words</span>
              <span>🌐 {selectedLanguage}</span>
              <span>
                {backspaceAllowed ? "⌫ Backspace: On" : "⚡ Backspace: Off"}
              </span>
              {isLoggedIn && <span>💾 Auto-saving</span>}
            </div>
          </div>
        )}

        {state === "finished" && (
          <div className="text-center" data-ocid="test.success_state">
            <p className="text-muted-foreground mb-4">
              Calculating your results...
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

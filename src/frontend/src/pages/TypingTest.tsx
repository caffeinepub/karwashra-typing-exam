import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { EXAMS, generatePassageOfLength } from "@/data/exams";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import { ArrowLeft, Highlighter, Play, RotateCcw, Timer } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

type TestState = "idle" | "running" | "finished";

const TIME_PRESETS = [1, 2, 5, 10, 15, 20];

function PassageDisplay({
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
  const segments: { text: string; startIndex: number }[] = [];
  let i = 0;
  while (i < passage.length) {
    const spaceStart = i;
    while (i < passage.length && passage[i] === " ") i++;
    if (i > spaceStart) {
      segments.push({
        text: passage.slice(spaceStart, i),
        startIndex: spaceStart,
      });
    }
    const wordStart = i;
    while (i < passage.length && passage[i] !== " ") i++;
    if (i > wordStart) {
      segments.push({
        text: passage.slice(wordStart, i),
        startIndex: wordStart,
      });
    }
  }

  const cursorPos = typed.length;

  return (
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
          const globalIndex = seg.startIndex + ci;
          let cls = "passage-upcoming";
          if (!highlightEnabled) {
            cls = "text-gray-400";
          } else if (globalIndex < typed.length) {
            cls =
              typed[globalIndex] === char ? "passage-correct" : "passage-error";
          } else if (globalIndex === typed.length) {
            cls = "passage-current";
          }
          return (
            <span key={`c-${globalIndex}`} className={cls}>
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
  );
}

export function TypingTest() {
  const { id } = useParams({ strict: false }) as { id: string };
  const navigate = useNavigate();
  const exam = EXAMS.find((e) => e.id === id);

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

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const resetTest = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (exam) {
      setPassage(generatePassageOfLength(exam, paragraphWords));
      setTimeLeft(selectedTimeMin * 60);
    }
    setTyped("");
    setState("idle");
  }, [exam, paragraphWords, selectedTimeMin]);

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
    (finalTyped: string) => {
      if (timerRef.current) clearInterval(timerRef.current);
      setState("finished");
      const elapsed = (Date.now() - startTime) / 60000;
      const correctChars = finalTyped
        .split("")
        .filter((c, i) => c === passage[i]).length;
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
        if (typedWords[idx] === word) {
          correctWords++;
        } else if (typedWords[idx] !== undefined) {
          wrongWords++;
        }
      });

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
    [startTime, passage, timeLeft, selectedTimeMin, id, navigate],
  );

  const handleTyping = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (state !== "running") return;
    const value = e.target.value;
    if (value.length > passage.length) return;
    setTyped(value);
    if (value.length === passage.length) {
      finishTest(value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (!backspaceAllowed && e.key === "Backspace") {
      e.preventDefault();
    }
  };

  const elapsed =
    state === "running" && startTime > 0 ? (Date.now() - startTime) / 60000 : 0;
  const correctChars = typed
    .split("")
    .filter((c, i) => c === passage[i]).length;
  const wpm = elapsed > 0 ? Math.round(correctChars / 5 / elapsed) : 0;
  const accuracy =
    typed.length > 0 ? Math.round((correctChars / typed.length) * 100) : 100;
  const errors = typed.length - correctChars;
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

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
        {/* Stats Row */}
        <div className="grid grid-cols-4 gap-3">
          {[
            {
              label: "WPM",
              value: state === "running" ? wpm : "—",
              highlight: wpm >= exam.requiredWPM && state === "running",
            },
            {
              label: "Accuracy",
              value: state === "running" ? `${accuracy}%` : "—",
              highlight: accuracy >= exam.accuracy && state === "running",
            },
            {
              label: "Errors",
              value: state === "running" ? errors : "—",
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
                className={`font-poppins font-bold text-xl ${
                  highlight ? "text-green-700" : "text-navy"
                }`}
              >
                {value}
              </div>
              <div className="text-xs text-muted-foreground">{label}</div>
            </div>
          ))}
        </div>

        {/* Passage Display */}
        <div
          className="bg-white rounded-xl border border-border shadow-card p-6"
          data-ocid="test.panel"
        >
          <div className="text-sm text-muted-foreground mb-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span>Passage — type this text below</span>
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
                Highlight: {highlightEnabled ? "ON" : "OFF"}
              </button>
            </div>
            <div className="flex items-center gap-3">
              {/* Font Size Controls */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setFontSize((s) => Math.max(12, s - 2))}
                  className="w-6 h-6 rounded border border-border flex items-center justify-center text-xs hover:bg-muted transition-colors"
                  title="Decrease font size"
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
                  title="Increase font size"
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

        {/* Typing Textarea */}
        <div className="bg-white rounded-xl border border-border shadow-card p-6">
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
            className="w-full h-32 font-mono text-sm resize-none border border-input rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-ring bg-muted/30 disabled:opacity-60 disabled:cursor-not-allowed"
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

        {/* Settings Panel (idle) + Start Button */}
        {state === "idle" && (
          <div className="bg-white rounded-xl border border-border shadow-card p-6 space-y-5">
            <h3 className="font-poppins font-semibold text-navy text-sm">
              Test Settings
            </h3>

            {/* Time Presets */}
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

            {/* Paragraph Length Slider */}
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

            {/* Backspace Toggle */}
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

            <div className="pt-2 text-center">
              <Button
                size="lg"
                onClick={startTest}
                className="bg-blue-brand hover:bg-blue-brand-light text-white font-semibold px-10 rounded-full shadow-lg"
                data-ocid="test.primary_button"
              >
                <Play className="w-5 h-5 mr-2" /> Start Test
              </Button>
              <p className="text-xs text-muted-foreground mt-3">
                Timer begins when you click Start. You have {selectedTimeMin}{" "}
                {selectedTimeMin === 1 ? "minute" : "minutes"}.
              </p>
            </div>
          </div>
        )}

        {state === "running" && (
          <div className="bg-white rounded-xl border border-border shadow-card p-4">
            <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
              <span>⏱ Time: {selectedTimeMin} min</span>
              <span>📝 Words: {paragraphWords}</span>
              <span>
                {backspaceAllowed
                  ? "⌫ Backspace: Allowed"
                  : "⚡ Backspace: Disabled"}
              </span>
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

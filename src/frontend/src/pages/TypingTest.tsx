import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { EXAMS, getRandomPassage } from "@/data/exams";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import { ArrowLeft, Play, RotateCcw, Timer } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

type TestState = "idle" | "running" | "finished";

function PassageDisplay({
  passage,
  typed,
}: { passage: string; typed: string }) {
  const chars = passage.split("");
  return (
    <div className="font-mono text-base leading-loose select-none">
      {chars.map((char, i) => {
        let cls = "passage-upcoming";
        if (i < typed.length) {
          cls = typed[i] === char ? "passage-correct" : "passage-error";
        } else if (i === typed.length) {
          cls = "passage-current";
        }
        const key = `char-${i}-${char}`;
        return (
          <span key={key} className={cls}>
            {char}
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

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const resetTest = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (exam) {
      setPassage(getRandomPassage(exam));
      setTimeLeft(exam.timeMin * 60);
    }
    setTyped("");
    setState("idle");
  }, [exam]);

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
      const timeTaken = exam ? exam.timeMin * 60 - timeLeft : 0;
      navigate({
        to: "/exam/$id/result",
        params: { id },
        search: {
          wpm: String(wpm),
          accuracy: String(accuracy),
          errors: String(errors),
          timeTaken: String(timeTaken),
        },
      });
    },
    [startTime, passage, timeLeft, exam, id, navigate],
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

  const elapsed =
    state === "running" && startTime > 0 ? (Date.now() - startTime) / 60000 : 0;
  const correctChars = typed
    .split("")
    .filter((c, i) => c === passage[i]).length;
  const wpm = elapsed > 0 ? Math.round(correctChars / 5 / elapsed) : 0;
  const accuracy =
    typed.length > 0 ? Math.round((correctChars / typed.length) * 100) : 100;
  const errors = typed.length - correctChars;
  const progress = exam
    ? ((exam.timeMin * 60 - timeLeft) / (exam.timeMin * 60)) * 100
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
            <div>
              <div className="text-white font-poppins font-bold text-sm">
                {exam.name} — Typing Test
              </div>
              <div className="text-white/55 text-xs">{exam.authority}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge
              className={`font-mono text-base px-3 py-1 ${timeLeft < 60 ? "bg-red-500 text-white" : "bg-blue-brand/30 text-white"}`}
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
              className={`rounded-xl p-3 text-center shadow-card border ${highlight ? "bg-green-50 border-green-200" : "bg-white border-border"}`}
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

        <div
          className="bg-white rounded-xl border border-border shadow-card p-6"
          data-ocid="test.panel"
        >
          <div className="text-sm text-muted-foreground mb-3 flex items-center justify-between">
            <span>Passage — type this text below</span>
            <span className="font-mono text-xs">
              {typed.length} / {passage.length}
            </span>
          </div>
          <PassageDisplay passage={passage} typed={typed} />
        </div>

        <div className="bg-white rounded-xl border border-border shadow-card p-6">
          <textarea
            ref={textareaRef}
            value={typed}
            onChange={handleTyping}
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
        </div>

        {state === "idle" && (
          <div className="text-center">
            <Button
              size="lg"
              onClick={startTest}
              className="bg-blue-brand hover:bg-blue-brand-light text-white font-semibold px-10 rounded-full shadow-lg"
              data-ocid="test.primary_button"
            >
              <Play className="w-5 h-5 mr-2" /> Start Test
            </Button>
            <p className="text-xs text-muted-foreground mt-3">
              Timer begins when you click Start. You have {exam.timeMin}{" "}
              minutes.
            </p>
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

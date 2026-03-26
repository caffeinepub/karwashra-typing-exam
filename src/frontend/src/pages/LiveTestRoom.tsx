import type { LiveSessionPublic } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { EXAMS, generatePassageOfLength } from "@/data/exams";
import { useActor } from "@/hooks/useActor";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate, useParams } from "@tanstack/react-router";
import { Highlighter, Radio, RotateCcw, Timer, Trophy } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

type TestState = "waiting" | "running" | "finished";

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
          return (
            <span key={`c-${gi}`} className={cls}>
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

export function LiveTestRoom() {
  const { roomId } = useParams({ strict: false }) as { roomId: string };
  const { auth, isLoggedIn } = useAuth();
  const { actor } = useActor();
  const navigate = useNavigate();

  const [sessionState, setSessionState] = useState<LiveSessionPublic | null>(
    null,
  );
  const [passage, setPassage] = useState("");
  const [typed, setTyped] = useState("");
  const [state, setState] = useState<TestState>("waiting");
  const [timeLeft, setTimeLeft] = useState(0);
  const [timeLimitMin, setTimeLimitMin] = useState(10);
  const [startTime, setStartTime] = useState(0);
  const [highlightEnabled, setHighlightEnabled] = useState(true);
  const [fontSize, setFontSize] = useState(16);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const typedRef = useRef(typed);
  const passageRef = useRef(passage);
  const startTimeRef = useRef(startTime);

  typedRef.current = typed;
  passageRef.current = passage;
  startTimeRef.current = startTime;

  useEffect(() => {
    if (!isLoggedIn) navigate({ to: "/login" });
  }, [isLoggedIn, navigate]);

  // Load session on mount once actor is ready
  useEffect(() => {
    if (!roomId || !actor) return;
    actor
      .getLiveSessionState(roomId)
      .then((s) => {
        setSessionState(s);
        const tl = Number(s.timeLimit);
        setTimeLimitMin(tl);
        setTimeLeft(tl * 60);
        const exam = EXAMS.find((e) => e.id === s.examId) ?? EXAMS[0];
        setPassage(generatePassageOfLength(exam, 500));
      })
      .catch(() => {
        toast.error("Room load karne mein error.");
      });
  }, [roomId, actor]);

  // Poll session state every 2s
  useEffect(() => {
    if (!roomId || !actor) return;
    pollRef.current = setInterval(async () => {
      try {
        const s = await actor.getLiveSessionState(roomId);
        setSessionState(s);
      } catch {
        /* ignore */
      }
    }, 2000);
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [roomId, actor]);

  // Push progress every 3s while running
  useEffect(() => {
    if (state !== "running" || !auth || !roomId || !actor) return;
    progressRef.current = setInterval(async () => {
      const t = typedRef.current;
      const p = passageRef.current;
      const elapsed = (Date.now() - startTimeRef.current) / 60000;
      const correctChars = t.split("").filter((c, i) => c === p[i]).length;
      const wpm = elapsed > 0 ? Math.round(correctChars / 5 / elapsed) : 0;
      const accuracy =
        t.length > 0 ? Math.round((correctChars / t.length) * 100) : 100;
      const wordsTyped = t.split(" ").length;
      try {
        await actor.updateProgress(
          auth.token,
          roomId,
          auth.username,
          BigInt(wpm),
          BigInt(accuracy),
          BigInt(wordsTyped),
        );
      } catch {
        /* ignore */
      }
    }, 3000);
    return () => {
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [state, auth, roomId, actor]);

  const finishTest = useCallback(
    async (finalTyped: string) => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
      setState("finished");
      const elapsed = (Date.now() - startTimeRef.current) / 60000;
      const p = passageRef.current;
      const correctChars = finalTyped
        .split("")
        .filter((c, i) => c === p[i]).length;
      const wpm = elapsed > 0 ? Math.round(correctChars / 5 / elapsed) : 0;
      const accuracy =
        finalTyped.length > 0
          ? Math.round((correctChars / finalTyped.length) * 100)
          : 0;
      const errors = finalTyped.length - correctChars;
      const timeTaken = timeLimitMin * 60 - timeLeft;
      if (auth && roomId && actor) {
        try {
          await actor.finishLiveSession(
            auth.token,
            roomId,
            auth.username,
            BigInt(wpm),
            BigInt(accuracy),
            BigInt(errors),
            BigInt(timeTaken),
          );
        } catch {
          /* ignore */
        }
      }
      toast.success(`Test khatam! WPM: ${wpm}, Accuracy: ${accuracy}%`);
    },
    [auth, roomId, actor, timeLimitMin, timeLeft],
  );

  const startTest = () => {
    if (!passage) return;
    setState("running");
    setStartTime(Date.now());
    startTimeRef.current = Date.now();
    textareaRef.current?.focus();
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          setState("finished");
          finishTest(typedRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleTyping = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (state !== "running") return;
    const value = e.target.value;
    if (value.length > passage.length) return;
    setTyped(value);
    if (value.length === passage.length) finishTest(value);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, []);

  const elapsed =
    state === "running" && startTime > 0 ? (Date.now() - startTime) / 60000 : 0;
  const correctChars = typed
    .split("")
    .filter((c, i) => c === passage[i]).length;
  const wpm = elapsed > 0 ? Math.round(correctChars / 5 / elapsed) : 0;
  const accuracy =
    typed.length > 0 ? Math.round((correctChars / typed.length) * 100) : 100;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeStr = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  const progress =
    timeLimitMin > 0
      ? ((timeLimitMin * 60 - timeLeft) / (timeLimitMin * 60)) * 100
      : 0;

  const sortedParticipants = [...(sessionState?.participants ?? [])].sort(
    (a, b) => Number(b.wpm) - Number(a.wpm),
  );

  if (!isLoggedIn) return null;

  return (
    <main className="min-h-screen bg-light-gray">
      <div className="bg-navy">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <Radio className="w-5 h-5 text-red-400 animate-pulse" />
            <div>
              <div className="text-white font-poppins font-bold text-sm">
                {sessionState?.examName ?? "Live Test"}
              </div>
              <div className="text-white/50 text-xs">
                Room:{" "}
                <span className="font-mono font-bold text-white/80">
                  {roomId}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {auth?.username && (
              <div className="hidden sm:flex items-center gap-1.5 bg-white/10 border border-white/20 rounded px-3 py-1 text-white text-xs font-mono">
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
              onClick={() => navigate({ to: "/live" })}
              className="text-white hover:bg-white/10 rounded-full text-xs"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-1" /> Exit
            </Button>
          </div>
        </div>
        <Progress value={progress} className="h-1 rounded-none bg-white/10" />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 flex gap-5">
        <div className="flex-1 space-y-5">
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "WPM", value: state === "running" ? wpm : "—" },
              {
                label: "Accuracy",
                value: state === "running" ? `${accuracy}%` : "—",
              },
              {
                label: "Rank",
                value:
                  state === "running"
                    ? `#${sortedParticipants.findIndex((p) => p.username === auth?.username) + 1 || "—"}`
                    : "—",
              },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="bg-white rounded-xl p-3 text-center shadow-card border border-border"
              >
                <div className="font-poppins font-bold text-xl text-navy">
                  {value}
                </div>
                <div className="text-xs text-muted-foreground">{label}</div>
              </div>
            ))}
          </div>

          <div
            className="bg-white rounded-xl border border-border shadow-card p-5"
            data-ocid="live.panel"
          >
            <div className="text-sm text-muted-foreground mb-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span>Passage</span>
                <button
                  type="button"
                  onClick={() => setHighlightEnabled((v) => !v)}
                  data-ocid="live.toggle"
                  className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded border font-medium transition-colors ${
                    highlightEnabled
                      ? "border-yellow-400 bg-yellow-50 text-yellow-700"
                      : "border-gray-300 bg-gray-50 text-gray-500"
                  }`}
                >
                  <Highlighter className="w-3 h-3" />
                  {highlightEnabled ? "ON" : "OFF"}
                </button>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setFontSize((s) => Math.max(12, s - 2))}
                  className="w-6 h-6 rounded border text-xs hover:bg-muted"
                >
                  A-
                </button>
                <span className="text-xs w-7 text-center">{fontSize}px</span>
                <button
                  type="button"
                  onClick={() => setFontSize((s) => Math.min(28, s + 2))}
                  className="w-6 h-6 rounded border text-xs hover:bg-muted"
                >
                  A+
                </button>
              </div>
            </div>
            <PassageDisplay
              passage={passage}
              typed={typed}
              highlightEnabled={highlightEnabled}
              fontSize={fontSize}
            />
          </div>

          <div className="bg-white rounded-xl border border-border shadow-card p-5">
            <textarea
              ref={textareaRef}
              value={typed}
              onChange={handleTyping}
              disabled={state !== "running"}
              placeholder={
                state === "waiting"
                  ? "Press 'Start Test' to begin..."
                  : state === "finished"
                    ? "Test complete!"
                    : "Type here..."
              }
              className="w-full h-28 font-mono text-sm resize-none border border-input rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-ring bg-muted/30 disabled:opacity-60"
              data-ocid="live.editor"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
            />
          </div>

          {state === "waiting" && (
            <div className="text-center">
              <Button
                size="lg"
                onClick={startTest}
                className="bg-blue-brand hover:bg-blue-brand-light text-white font-semibold px-10 rounded-full"
                data-ocid="live.primary_button"
              >
                🔴 Start Live Test
              </Button>
            </div>
          )}

          {state === "finished" && (
            <div
              className="bg-white rounded-xl border border-border shadow-card p-6 text-center"
              data-ocid="live.success_state"
            >
              <Trophy className="w-10 h-10 text-yellow-500 mx-auto mb-3" />
              <h3 className="font-poppins font-bold text-navy text-xl">
                Test Khatam!
              </h3>
              <p className="text-muted-foreground mt-1">
                WPM: <strong>{wpm}</strong> | Accuracy:{" "}
                <strong>{accuracy}%</strong>
              </p>
              <Button
                onClick={() => navigate({ to: "/live" })}
                className="mt-4 bg-navy text-white"
                data-ocid="live.button"
              >
                Live Hub par Jaayein
              </Button>
            </div>
          )}
        </div>

        {/* Live Leaderboard Sidebar */}
        <div className="w-64 flex-shrink-0">
          <div className="bg-white rounded-xl border border-border shadow-card sticky top-20">
            <div className="px-4 py-3 border-b border-border flex items-center gap-2">
              <Trophy className="w-4 h-4 text-yellow-500" />
              <h3 className="font-poppins font-bold text-navy text-sm">
                Live Rankings
              </h3>
              <div className="ml-auto w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            </div>
            <div className="p-2 space-y-1" data-ocid="live.list">
              {sortedParticipants.length > 0 ? (
                sortedParticipants.map((p, i) => (
                  <div
                    key={p.username}
                    data-ocid={`live.item.${i + 1}`}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${
                      p.username === auth?.username
                        ? "bg-blue-50 border border-blue-200"
                        : "hover:bg-muted/30"
                    }`}
                  >
                    <span className="font-bold text-xs text-muted-foreground w-5">
                      {i === 0
                        ? "🥇"
                        : i === 1
                          ? "🥈"
                          : i === 2
                            ? "🥉"
                            : `${i + 1}.`}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold truncate text-xs">
                        {p.username}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {Number(p.wpm)} WPM
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {Number(p.accuracy)}%
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-xs text-muted-foreground">
                  Waiting for participants...
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

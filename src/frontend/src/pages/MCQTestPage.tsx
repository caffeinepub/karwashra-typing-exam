import { getExamMCQ } from "@/data/mcqQuestions";
import type { ExamPart, MCQQuestion } from "@/data/mcqQuestions";
import { useSearch } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

const PART_TIME_SECONDS = 20 * 60; // 20 minutes per part

function QuestionView({
  question,
  selected,
  onSelect,
  language,
  index,
  total,
}: {
  question: MCQQuestion;
  selected: string | null;
  onSelect: (opt: string) => void;
  language: ExamPart["language"];
  index: number;
  total: number;
}) {
  const opts: Array<[string, string]> = Object.entries(
    question.options,
  ) as Array<[string, string]>;
  return (
    <div style={{ flex: 1, overflowY: "auto" }}>
      <div
        style={{
          marginBottom: 8,
          color: "#555",
          fontSize: 12,
          fontWeight: 600,
        }}
      >
        Q {index + 1} / {total} &nbsp;|&nbsp; Topic: {question.topic}
      </div>

      {/* Question text */}
      <div
        style={{
          background: "#f0f4ff",
          border: "1px solid #c5d3f0",
          borderRadius: 8,
          padding: "14px 16px",
          marginBottom: 16,
        }}
      >
        {language === "bilingual" && question.hindi && (
          <div
            style={{
              fontSize: 15,
              color: "#1a2a5e",
              fontWeight: 700,
              marginBottom: 6,
              lineHeight: 1.5,
            }}
          >
            {question.hindi}
          </div>
        )}
        {language === "bilingual" && question.english && (
          <div style={{ fontSize: 13, color: "#3a4a6a", fontStyle: "italic" }}>
            ({question.english})
          </div>
        )}
        {language === "english" && (
          <div style={{ fontSize: 15, color: "#1a2a5e", fontWeight: 700 }}>
            {question.english}
          </div>
        )}
        {language === "hindi" && (
          <div
            style={{
              fontSize: 16,
              color: "#1a2a5e",
              fontWeight: 700,
              lineHeight: 1.6,
            }}
          >
            {question.hindi}
          </div>
        )}
      </div>

      {/* Options */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {opts.map(([key, val]) => {
          const isSelected = selected === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => onSelect(key)}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 12,
                padding: "12px 16px",
                border: isSelected ? "2px solid #1a3a8c" : "2px solid #d8e0ef",
                borderRadius: 8,
                background: isSelected ? "#e8eeff" : "#fff",
                cursor: "pointer",
                textAlign: "left",
                transition: "all 0.15s",
                boxShadow: isSelected
                  ? "0 2px 8px rgba(26,58,140,0.15)"
                  : "none",
              }}
            >
              <span
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: isSelected ? "#1a3a8c" : "#e8eeff",
                  color: isSelected ? "#fff" : "#1a3a8c",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 800,
                  fontSize: 13,
                  flexShrink: 0,
                  border: isSelected ? "none" : "1.5px solid #b0c0e0",
                }}
              >
                {key.toUpperCase()}
              </span>
              <span
                style={{
                  fontSize: 14,
                  color: "#1a2a5e",
                  lineHeight: 1.5,
                  paddingTop: 3,
                }}
              >
                {val}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function TimerDisplay({ seconds }: { seconds: number }) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const isWarning = seconds < 120;
  return (
    <span
      style={{
        fontWeight: 800,
        fontSize: 18,
        color: isWarning ? "#d32f2f" : "#fff",
        background: isWarning ? "#fff3cd" : "rgba(255,255,255,0.15)",
        padding: "4px 14px",
        borderRadius: 6,
        border: isWarning ? "2px solid #d32f2f" : "none",
        letterSpacing: 1,
        fontFamily: "monospace",
      }}
    >
      {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
    </span>
  );
}

export function MCQTestPage() {
  const search = useSearch({ strict: false }) as { exam?: string };
  const examId = search.exam || "all";
  const examData = getExamMCQ(examId);

  const [activePart, setActivePart] = useState(0);
  const [answers, setAnswers] = useState<
    Record<string, Record<number, string>>
  >({});
  const [currentQ, setCurrentQ] = useState(0);
  const [marked, setMarked] = useState<Record<string, Set<number>>>({});
  const [submitted, setSubmitted] = useState<Record<string, boolean>>({});
  const [timer, setTimer] = useState(PART_TIME_SECONDS);
  const [started, setStarted] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const part = examData.parts[activePart];
  const partKey = `${activePart}`;
  const partAnswers = answers[partKey] || {};
  const partMarked = marked[partKey] || new Set();
  const isSubmitted = submitted[partKey];

  // biome-ignore lint/correctness/useExhaustiveDependencies: timer auto-submit only needs these deps
  useEffect(() => {
    if (started && !isSubmitted) {
      timerRef.current = setInterval(() => {
        setTimer((t) => {
          if (t <= 1) {
            clearInterval(timerRef.current!);
            setSubmitted((prev) => ({ ...prev, [partKey]: true }));
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [started, activePart, isSubmitted, partKey]);

  function startPart() {
    setStarted(true);
    setTimer(PART_TIME_SECONDS);
    setCurrentQ(0);
  }

  function switchPart(idx: number) {
    if (timerRef.current) clearInterval(timerRef.current);
    setActivePart(idx);
    setCurrentQ(0);
    setTimer(PART_TIME_SECONDS);
    setStarted(false);
  }

  function handleAnswer(opt: string) {
    if (isSubmitted) return;
    setAnswers((prev) => ({
      ...prev,
      [partKey]: { ...prev[partKey], [currentQ]: opt },
    }));
  }

  function toggleMark() {
    setMarked((prev) => {
      const s = new Set(prev[partKey] || []);
      s.has(currentQ) ? s.delete(currentQ) : s.add(currentQ);
      return { ...prev, [partKey]: s };
    });
  }

  function handleSubmitPart(auto = false) {
    if (timerRef.current) clearInterval(timerRef.current);
    const unanswered = part.questions.filter((_, i) => !partAnswers[i]).length;
    if (!auto && unanswered > 0) {
      if (
        !window.confirm(`${unanswered} question(s) unanswered. Submit anyway?`)
      )
        return;
    }
    setSubmitted((prev) => ({ ...prev, [partKey]: true }));
  }

  function getPartScore(pIdx: number): {
    correct: number;
    wrong: number;
    unattempted: number;
    netScore: number;
  } {
    const pk = `${pIdx}`;
    const pAnswers = answers[pk] || {};
    const pPart = examData.parts[pIdx];
    let correct = 0;
    let wrong = 0;
    let unattempted = 0;
    pPart.questions.forEach((q, i) => {
      if (pAnswers[i] === undefined) unattempted++;
      else if (pAnswers[i] === q.answer) correct++;
      else wrong++;
    });
    const nm = examData.negativeMarking || 0;
    const netScore = Math.max(0, correct - wrong * nm);
    return { correct, wrong, unattempted, netScore };
  }

  const allSubmitted = examData.parts.every((_, i) => submitted[`${i}`]);

  // Answer indicator color
  function qColor(qIdx: number): string {
    if (isSubmitted) {
      const q = part.questions[qIdx];
      if (partAnswers[qIdx] === q.answer) return "#2e7d32";
      if (partAnswers[qIdx] !== undefined) return "#c62828";
      return "#9e9e9e";
    }
    if (partMarked.has(qIdx)) return "#f57f17";
    if (partAnswers[qIdx]) return "#1a3a8c";
    return "#e0e6f0";
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#eef2f8",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* HEADER */}
      <header
        style={{
          background: "linear-gradient(135deg, #1a3a8c 0%, #0d2060 100%)",
          padding: "10px 20px",
          display: "flex",
          alignItems: "center",
          gap: 12,
          boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
        }}
      >
        <div style={{ flex: 1 }}>
          <div style={{ color: "#fff", fontWeight: 800, fontSize: 16 }}>
            📝 MCQ Test — {examData.examName}
          </div>
          <div style={{ color: "#a8c4ff", fontSize: 11 }}>
            Karwashra Typing Exam Platform
          </div>
        </div>
        {started && !isSubmitted && <TimerDisplay seconds={timer} />}
        <button
          type="button"
          onClick={() => window.history.back()}
          style={{
            background: "rgba(255,255,255,0.15)",
            border: "1px solid rgba(255,255,255,0.3)",
            color: "#fff",
            padding: "6px 14px",
            borderRadius: 5,
            cursor: "pointer",
            fontSize: 12,
          }}
        >
          ← Back
        </button>
      </header>

      {/* PART TABS */}
      <div
        style={{
          background: "#1a3a8c",
          padding: "0 16px",
          display: "flex",
          gap: 4,
          overflowX: "auto",
          borderBottom: "3px solid #f57f17",
        }}
      >
        {examData.parts.map((p, i) => (
          <button
            key={p.label}
            type="button"
            onClick={() => switchPart(i)}
            style={{
              padding: "10px 18px",
              border: "none",
              background: activePart === i ? "#f57f17" : "transparent",
              color: activePart === i ? "#fff" : "#c8d8ff",
              fontWeight: 700,
              fontSize: 12,
              cursor: "pointer",
              borderRadius: "4px 4px 0 0",
              whiteSpace: "nowrap",
              position: "relative",
            }}
          >
            {p.label} — {p.title.split("(")[0].trim()}
            {submitted[`${i}`] && (
              <span
                style={{
                  marginLeft: 6,
                  background: "#4caf50",
                  color: "#fff",
                  borderRadius: "50%",
                  width: 16,
                  height: 16,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 10,
                }}
              >
                ✓
              </span>
            )}
          </button>
        ))}
      </div>

      {/* PART CONTENT */}
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "16px",
          display: "flex",
          gap: 16,
        }}
      >
        {/* LEFT PANEL - Questions */}
        <div
          style={{
            flex: 1,
            background: "#fff",
            borderRadius: 10,
            border: "1px solid #dde3ef",
            padding: 20,
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            display: "flex",
            flexDirection: "column",
            minHeight: 500,
          }}
        >
          {/* Part header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 16,
              paddingBottom: 12,
              borderBottom: "2px solid #e8eeff",
            }}
          >
            <div>
              <span
                style={{
                  background: "#1a3a8c",
                  color: "#fff",
                  padding: "3px 10px",
                  borderRadius: 4,
                  fontSize: 12,
                  fontWeight: 700,
                  marginRight: 8,
                }}
              >
                {part.label}
              </span>
              <span style={{ color: "#1a2a5e", fontWeight: 700, fontSize: 14 }}>
                {part.title}
              </span>
            </div>
            <span
              style={{
                background:
                  part.language === "hindi"
                    ? "#4a148c"
                    : part.language === "english"
                      ? "#006064"
                      : "#e65100",
                color: "#fff",
                padding: "2px 10px",
                borderRadius: 10,
                fontSize: 10,
                fontWeight: 700,
              }}
            >
              {part.language === "bilingual"
                ? "🇮🇳 Hindi + English"
                : part.language === "hindi"
                  ? "🔤 Only Hindi"
                  : "🔤 Only English"}
            </span>
          </div>

          {/* Not started state */}
          {!started && (
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 16,
              }}
            >
              <div style={{ fontSize: 48 }}>📋</div>
              <div style={{ color: "#1a2a5e", fontWeight: 700, fontSize: 18 }}>
                {part.title}
              </div>
              <div style={{ color: "#555", fontSize: 13 }}>
                {part.questions.length} Questions • 20 Minutes • 1 Mark each
              </div>
              <div
                style={{
                  background:
                    examData.negativeMarking > 0 ? "#fff3e0" : "#f0fff4",
                  border: `1px solid ${examData.negativeMarking > 0 ? "#ffb74d" : "#81c784"}`,
                  borderRadius: 8,
                  padding: "8px 16px",
                  fontSize: 13,
                  fontWeight: 700,
                  color: examData.negativeMarking > 0 ? "#e65100" : "#2e7d32",
                  textAlign: "center",
                  maxWidth: 400,
                }}
              >
                {examData.negativeMarking > 0 ? (
                  <span>
                    ⚠️ Negative Marking: -{examData.negativeMarking} per wrong
                    answer
                    {examData.negativeMarkingNote ? (
                      <>
                        <br />
                        <span
                          style={{
                            fontSize: 11,
                            fontWeight: 400,
                            color: "#795548",
                          }}
                        >
                          ({examData.negativeMarkingNote})
                        </span>
                      </>
                    ) : null}
                  </span>
                ) : (
                  <span>
                    ✅ No Negative Marking
                    {examData.negativeMarkingNote ? (
                      <>
                        <br />
                        <span
                          style={{
                            fontSize: 11,
                            fontWeight: 400,
                            color: "#388e3c",
                          }}
                        >
                          ({examData.negativeMarkingNote})
                        </span>
                      </>
                    ) : null}
                  </span>
                )}
              </div>
              <div
                style={{
                  background: "#f0f4ff",
                  border: "1px solid #c5d3f0",
                  borderRadius: 8,
                  padding: "12px 20px",
                  fontSize: 12,
                  color: "#3a4a6a",
                  textAlign: "center",
                  maxWidth: 400,
                }}
              >
                <div
                  style={{ fontWeight: 700, marginBottom: 6, color: "#1a3a8c" }}
                >
                  Instructions:
                </div>
                <div>• Each question has 4 options (a, b, c, d)</div>
                <div>• Select the correct answer and proceed</div>
                <div>• Mark for review if unsure</div>
                {examData.negativeMarking > 0 && (
                  <div style={{ color: "#c62828", fontWeight: 700 }}>
                    • Wrong answer = -{examData.negativeMarking} marks deducted
                  </div>
                )}
                <div>• Submit before time runs out</div>
              </div>
              <button
                type="button"
                onClick={startPart}
                style={{
                  background: "linear-gradient(135deg, #1a3a8c, #0d2060)",
                  color: "#fff",
                  border: "none",
                  padding: "12px 36px",
                  borderRadius: 8,
                  fontWeight: 800,
                  fontSize: 15,
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(26,58,140,0.3)",
                }}
              >
                ▶ Start {part.label}
              </button>
            </div>
          )}

          {/* Active / Submitted question view */}
          {started &&
            (isSubmitted ? (
              <div>
                {/* Result Summary */}
                <div
                  style={{
                    background: "#f0f7f0",
                    border: "2px solid #4caf50",
                    borderRadius: 10,
                    padding: 16,
                    marginBottom: 16,
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: 24, marginBottom: 4 }}>🎉</div>
                  <div
                    style={{
                      fontWeight: 800,
                      fontSize: 16,
                      color: "#2e7d32",
                      marginBottom: 8,
                    }}
                  >
                    {part.label} Submitted!
                  </div>
                  {(() => {
                    const s = getPartScore(activePart);
                    return (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          gap: 24,
                        }}
                      >
                        <span style={{ color: "#2e7d32", fontWeight: 700 }}>
                          ✓ Correct: {s.correct}
                        </span>
                        <span style={{ color: "#c62828", fontWeight: 700 }}>
                          ✗ Wrong: {s.wrong}
                        </span>
                        <span style={{ color: "#757575", fontWeight: 700 }}>
                          — Skipped: {s.unattempted}
                        </span>
                        <span style={{ color: "#1a3a8c", fontWeight: 800 }}>
                          Score: {s.correct}/{part.questions.length}
                        </span>
                        {examData.negativeMarking > 0 && (
                          <span style={{ color: "#e65100", fontWeight: 800 }}>
                            Net: {s.netScore.toFixed(2)}
                          </span>
                        )}
                      </div>
                    );
                  })()}
                </div>

                {/* Review all questions */}
                <div
                  style={{
                    fontWeight: 700,
                    color: "#1a2a5e",
                    marginBottom: 12,
                  }}
                >
                  Question Review:
                </div>
                {part.questions.map((q, i) => {
                  const userAns = partAnswers[i];
                  const isCorrect = userAns === q.answer;
                  return (
                    <div
                      key={q.id}
                      style={{
                        background: isCorrect
                          ? "#f0f7f0"
                          : userAns
                            ? "#fff3f3"
                            : "#f9f9f9",
                        border: `1px solid ${isCorrect ? "#81c784" : userAns ? "#ef9a9a" : "#e0e0e0"}`,
                        borderRadius: 8,
                        padding: "10px 14px",
                        marginBottom: 10,
                      }}
                    >
                      <div
                        style={{
                          fontSize: 13,
                          fontWeight: 700,
                          color: "#1a2a5e",
                          marginBottom: 4,
                        }}
                      >
                        Q{i + 1}. {q.english || q.hindi}
                      </div>
                      <div style={{ fontSize: 12, display: "flex", gap: 16 }}>
                        <span style={{ color: "#1a3a8c" }}>
                          Your answer:{" "}
                          <strong>
                            {userAns
                              ? `(${userAns}) ${q.options[userAns as keyof typeof q.options]}`
                              : "Not attempted"}
                          </strong>
                        </span>
                        {!isCorrect && (
                          <span style={{ color: "#2e7d32" }}>
                            Correct:{" "}
                            <strong>
                              ({q.answer}) {q.options[q.answer]}
                            </strong>
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <>
                <QuestionView
                  question={part.questions[currentQ]}
                  selected={partAnswers[currentQ] || null}
                  onSelect={handleAnswer}
                  language={part.language}
                  index={currentQ}
                  total={part.questions.length}
                />

                {/* Navigation buttons */}
                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    marginTop: 20,
                    paddingTop: 16,
                    borderTop: "1px solid #e8eeff",
                    flexWrap: "wrap",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setCurrentQ((q) => Math.max(0, q - 1))}
                    disabled={currentQ === 0}
                    style={{
                      padding: "8px 18px",
                      border: "1.5px solid #1a3a8c",
                      borderRadius: 6,
                      background: "#fff",
                      color: "#1a3a8c",
                      fontWeight: 700,
                      cursor: currentQ === 0 ? "not-allowed" : "pointer",
                      opacity: currentQ === 0 ? 0.5 : 1,
                      fontSize: 13,
                    }}
                  >
                    ← Previous
                  </button>

                  <button
                    type="button"
                    onClick={toggleMark}
                    style={{
                      padding: "8px 18px",
                      border: `1.5px solid ${partMarked.has(currentQ) ? "#f57f17" : "#ccc"}`,
                      borderRadius: 6,
                      background: partMarked.has(currentQ) ? "#fff8e1" : "#fff",
                      color: partMarked.has(currentQ) ? "#f57f17" : "#666",
                      fontWeight: 700,
                      cursor: "pointer",
                      fontSize: 13,
                    }}
                  >
                    {partMarked.has(currentQ)
                      ? "🔖 Marked"
                      : "🔖 Mark for Review"}
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setCurrentQ((q) =>
                        Math.min(part.questions.length - 1, q + 1),
                      )
                    }
                    disabled={currentQ === part.questions.length - 1}
                    style={{
                      padding: "8px 18px",
                      border: "1.5px solid #1a3a8c",
                      borderRadius: 6,
                      background: "#1a3a8c",
                      color: "#fff",
                      fontWeight: 700,
                      cursor:
                        currentQ === part.questions.length - 1
                          ? "not-allowed"
                          : "pointer",
                      opacity: currentQ === part.questions.length - 1 ? 0.5 : 1,
                      fontSize: 13,
                    }}
                  >
                    Next →
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSubmitPart()}
                    style={{
                      marginLeft: "auto",
                      padding: "8px 20px",
                      border: "none",
                      borderRadius: 6,
                      background: "linear-gradient(135deg,#2e7d32,#1b5e20)",
                      color: "#fff",
                      fontWeight: 800,
                      cursor: "pointer",
                      fontSize: 13,
                      boxShadow: "0 2px 6px rgba(46,125,50,0.3)",
                    }}
                  >
                    ✓ Submit {part.label}
                  </button>
                </div>
              </>
            ))}
        </div>

        {/* RIGHT PANEL - Question Grid + Summary */}
        <div
          style={{
            width: 220,
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          {started && (
            <div
              style={{
                background: "#fff",
                borderRadius: 10,
                border: "1px solid #dde3ef",
                padding: 14,
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              }}
            >
              <div
                style={{
                  fontWeight: 700,
                  color: "#1a2a5e",
                  fontSize: 13,
                  marginBottom: 10,
                }}
              >
                Question Navigator
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(5, 1fr)",
                  gap: 4,
                  marginBottom: 12,
                }}
              >
                {part.questions.map((q, i) => (
                  <button
                    key={`q${q.id}-${i}`}
                    type="button"
                    onClick={() => !isSubmitted && setCurrentQ(i)}
                    style={{
                      width: "100%",
                      aspectRatio: "1",
                      border:
                        currentQ === i && !isSubmitted
                          ? "2px solid #f57f17"
                          : "1.5px solid #ccc",
                      borderRadius: 4,
                      background: qColor(i),
                      color: qColor(i) === "#e0e6f0" ? "#555" : "#fff",
                      fontSize: 10,
                      fontWeight: 700,
                      cursor: isSubmitted ? "default" : "pointer",
                      padding: 0,
                    }}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                  fontSize: 11,
                }}
              >
                {!isSubmitted ? (
                  <>
                    <div
                      style={{ display: "flex", gap: 6, alignItems: "center" }}
                    >
                      <div
                        style={{
                          width: 12,
                          height: 12,
                          background: "#1a3a8c",
                          borderRadius: 2,
                        }}
                      />
                      Answered: {Object.keys(partAnswers).length}
                    </div>
                    <div
                      style={{ display: "flex", gap: 6, alignItems: "center" }}
                    >
                      <div
                        style={{
                          width: 12,
                          height: 12,
                          background: "#f57f17",
                          borderRadius: 2,
                        }}
                      />
                      Marked: {partMarked.size}
                    </div>
                    <div
                      style={{ display: "flex", gap: 6, alignItems: "center" }}
                    >
                      <div
                        style={{
                          width: 12,
                          height: 12,
                          background: "#e0e6f0",
                          borderRadius: 2,
                          border: "1px solid #ccc",
                        }}
                      />
                      Not visited:{" "}
                      {part.questions.length - Object.keys(partAnswers).length}
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      style={{ display: "flex", gap: 6, alignItems: "center" }}
                    >
                      <div
                        style={{
                          width: 12,
                          height: 12,
                          background: "#2e7d32",
                          borderRadius: 2,
                        }}
                      />
                      Correct: {getPartScore(activePart).correct}
                    </div>
                    <div
                      style={{ display: "flex", gap: 6, alignItems: "center" }}
                    >
                      <div
                        style={{
                          width: 12,
                          height: 12,
                          background: "#c62828",
                          borderRadius: 2,
                        }}
                      />
                      Wrong: {getPartScore(activePart).wrong}
                    </div>
                    <div
                      style={{ display: "flex", gap: 6, alignItems: "center" }}
                    >
                      <div
                        style={{
                          width: 12,
                          height: 12,
                          background: "#9e9e9e",
                          borderRadius: 2,
                        }}
                      />
                      Skipped: {getPartScore(activePart).unattempted}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Parts summary */}
          <div
            style={{
              background: "#fff",
              borderRadius: 10,
              border: "1px solid #dde3ef",
              padding: 14,
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            }}
          >
            <div
              style={{
                fontWeight: 700,
                color: "#1a2a5e",
                fontSize: 13,
                marginBottom: 10,
              }}
            >
              Parts Overview
            </div>
            {examData.parts.map((p, i) => {
              const isComp = !!submitted[`${i}`];
              const s = isComp ? getPartScore(i) : null;
              return (
                <div
                  key={p.label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "6px 0",
                    borderBottom:
                      i < examData.parts.length - 1
                        ? "1px solid #f0f0f0"
                        : "none",
                  }}
                >
                  <span
                    style={{ fontSize: 12, color: "#3a4a6a", fontWeight: 600 }}
                  >
                    {p.label}
                  </span>
                  {isComp ? (
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 800,
                        color: "#2e7d32",
                      }}
                    >
                      {examData.negativeMarking > 0
                        ? s!.netScore.toFixed(1)
                        : s!.correct}
                      /{p.questions.length}
                    </span>
                  ) : (
                    <span style={{ fontSize: 11, color: "#aaa" }}>Pending</span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Final result button */}
          {allSubmitted && !showResult && (
            <button
              type="button"
              onClick={() => setShowResult(true)}
              style={{
                padding: "12px 8px",
                border: "none",
                borderRadius: 8,
                background: "linear-gradient(135deg,#f57f17,#e65100)",
                color: "#fff",
                fontWeight: 800,
                fontSize: 14,
                cursor: "pointer",
                boxShadow: "0 3px 8px rgba(245,127,23,0.35)",
              }}
            >
              🏆 View Final Result
            </button>
          )}
        </div>
      </div>

      {/* FINAL RESULT MODAL */}
      {showResult && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            padding: 20,
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 14,
              padding: 30,
              maxWidth: 500,
              width: "100%",
              maxHeight: "80vh",
              overflowY: "auto",
              boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
            }}
          >
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <div style={{ fontSize: 48 }}>🏆</div>
              <div style={{ fontWeight: 800, fontSize: 20, color: "#1a2a5e" }}>
                Final Result
              </div>
              <div style={{ color: "#555", fontSize: 13 }}>
                {examData.examName}
              </div>
            </div>

            {(() => {
              let totalNet = 0;
              let totalQ = 0;
              return (
                <>
                  {examData.parts.map((p, i) => {
                    const s = getPartScore(i);
                    totalNet +=
                      examData.negativeMarking > 0 ? s.netScore : s.correct;
                    totalQ += p.questions.length;
                    const pct = Math.round(
                      (s.correct / p.questions.length) * 100,
                    );
                    const pass = pct >= 40;
                    return (
                      <div
                        key={p.label}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "12px 16px",
                          background: pass ? "#f0f7f0" : "#fff3f3",
                          border: `1px solid ${pass ? "#81c784" : "#ef9a9a"}`,
                          borderRadius: 8,
                          marginBottom: 8,
                        }}
                      >
                        <div>
                          <div
                            style={{
                              fontWeight: 700,
                              color: "#1a2a5e",
                              fontSize: 14,
                            }}
                          >
                            {p.label} — {p.title.split("(")[0].trim()}
                          </div>
                          <div style={{ fontSize: 12, color: "#555" }}>
                            Correct: {s.correct} | Wrong: {s.wrong} | Skipped:{" "}
                            {s.unattempted}
                            {examData.negativeMarking > 0 && (
                              <>
                                {" "}
                                |{" "}
                                <span
                                  style={{ color: "#e65100", fontWeight: 700 }}
                                >
                                  Net: {s.netScore.toFixed(2)}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <div
                            style={{
                              fontWeight: 800,
                              fontSize: 18,
                              color: pass ? "#2e7d32" : "#c62828",
                            }}
                          >
                            {pct}%
                          </div>
                          <div
                            style={{
                              fontSize: 10,
                              fontWeight: 800,
                              color: "#fff",
                              background: pass ? "#2e7d32" : "#c62828",
                              padding: "2px 8px",
                              borderRadius: 10,
                            }}
                          >
                            {pass ? "PASS" : "FAIL"}
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  <div
                    style={{
                      background: "linear-gradient(135deg,#1a3a8c,#0d2060)",
                      borderRadius: 10,
                      padding: "16px 20px",
                      color: "#fff",
                      textAlign: "center",
                      marginTop: 12,
                    }}
                  >
                    <div style={{ fontSize: 13, marginBottom: 4 }}>
                      Total Score{" "}
                      {examData.negativeMarking > 0 && (
                        <span style={{ fontSize: 11, color: "#ffb74d" }}>
                          (After -{examData.negativeMarking} Negative Marking)
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: 32, fontWeight: 900 }}>
                      {totalNet.toFixed(examData.negativeMarking > 0 ? 2 : 0)} /{" "}
                      {totalQ}
                    </div>
                    <div
                      style={{
                        fontSize: 16,
                        fontWeight: 700,
                        color: "#ffd740",
                      }}
                    >
                      {Math.round((totalNet / totalQ) * 100)}%
                    </div>
                  </div>
                </>
              );
            })()}

            <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
              <button
                type="button"
                onClick={() => setShowResult(false)}
                style={{
                  flex: 1,
                  padding: "10px",
                  border: "1.5px solid #1a3a8c",
                  borderRadius: 6,
                  background: "#fff",
                  color: "#1a3a8c",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Review Answers
              </button>
              <button
                type="button"
                onClick={() => window.history.back()}
                style={{
                  flex: 1,
                  padding: "10px",
                  border: "none",
                  borderRadius: 6,
                  background: "linear-gradient(135deg,#1a3a8c,#0d2060)",
                  color: "#fff",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                ← Back to Home
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

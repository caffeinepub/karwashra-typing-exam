import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { EXAMS } from "@/data/exams";
import { Link, useParams, useSearch } from "@tanstack/react-router";
import {
  AlertTriangle,
  BookOpen,
  CheckCircle,
  Clock,
  RotateCcw,
  Target,
  Trophy,
  XCircle,
} from "lucide-react";
import { motion } from "motion/react";

export function Results() {
  const { id } = useParams({ strict: false }) as { id: string };
  const search = useSearch({ strict: false }) as {
    wpm?: string;
    accuracy?: string;
    errors?: string;
    timeTaken?: string;
    correctWords?: string;
    wrongWords?: string;
  };

  const exam = EXAMS.find((e) => e.id === id);
  const wpm = Number(search.wpm ?? 0);
  const accuracy = Number(search.accuracy ?? 0);
  const errors = Number(search.errors ?? 0);
  const timeTaken = Number(search.timeTaken ?? 0);
  const correctWords = Number(search.correctWords ?? 0);
  const wrongWords = Number(search.wrongWords ?? 0);

  const wpmPassed = exam ? wpm >= exam.requiredWPM : false;
  const accuracyPassed = exam ? accuracy >= exam.accuracy : false;
  const passed = wpmPassed && accuracyPassed;

  const timeTakenStr = `${Math.floor(timeTaken / 60)}m ${timeTaken % 60}s`;

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
      <div className="bg-navy py-12">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-poppins font-bold text-white">
            {exam.name} — Test Result
          </h1>
          <p className="text-white/60 text-sm mt-1">{exam.authority}</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">
        {/* Pass/Fail Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`rounded-2xl p-8 text-center border ${
            passed ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
          }`}
          data-ocid={passed ? "result.success_state" : "result.error_state"}
        >
          {passed ? (
            <>
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-3" />
              <div className="text-3xl font-poppins font-bold text-green-700 mb-1">
                CONGRATULATIONS!
              </div>
              <div className="text-green-600 font-semibold">
                You PASSED the {exam.name} typing test!
              </div>
              <div className="text-green-500 text-sm mt-2">
                You've met all the requirements for this exam.
              </div>
            </>
          ) : (
            <>
              <XCircle className="w-16 h-16 text-red-400 mx-auto mb-3" />
              <div className="text-3xl font-poppins font-bold text-red-700 mb-1">
                KEEP PRACTICING
              </div>
              <div className="text-red-600 font-semibold">
                You did not meet the required standards.
              </div>
              <div className="text-red-500 text-sm mt-2">
                Review the areas below and try again.
              </div>
            </>
          )}
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          {/* WPM */}
          <div
            className={`bg-white rounded-xl border p-5 shadow-card ${
              wpmPassed ? "border-green-200" : "border-red-200"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-navy" />
                <span className="font-semibold text-navy text-sm">WPM</span>
              </div>
              {wpmPassed ? (
                <CheckCircle className="w-4 h-4 text-green-500" />
              ) : (
                <XCircle className="w-4 h-4 text-red-400" />
              )}
            </div>
            <div className="text-3xl font-poppins font-bold text-navy mb-1">
              {wpm}
            </div>
            <div className="text-xs text-muted-foreground mb-3">
              Required:{" "}
              {exam.requiredWPM > 0 ? `${exam.requiredWPM} WPM` : "15000 KDPH"}
            </div>
            <Progress
              value={
                exam.requiredWPM > 0
                  ? Math.min((wpm / exam.requiredWPM) * 100, 100)
                  : 0
              }
              className="h-2"
            />
          </div>

          {/* Accuracy */}
          <div
            className={`bg-white rounded-xl border p-5 shadow-card ${
              accuracyPassed ? "border-green-200" : "border-red-200"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-navy" />
                <span className="font-semibold text-navy text-sm">
                  Accuracy
                </span>
              </div>
              {accuracyPassed ? (
                <CheckCircle className="w-4 h-4 text-green-500" />
              ) : (
                <XCircle className="w-4 h-4 text-red-400" />
              )}
            </div>
            <div className="text-3xl font-poppins font-bold text-navy mb-1">
              {accuracy}%
            </div>
            <div className="text-xs text-muted-foreground mb-3">
              Required: {exam.accuracy}%
            </div>
            <Progress
              value={Math.min((accuracy / exam.accuracy) * 100, 100)}
              className="h-2"
            />
          </div>

          {/* Errors */}
          <div className="bg-white rounded-xl border border-border p-5 shadow-card">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-yellow-500" />
              <span className="font-semibold text-navy text-sm">Errors</span>
            </div>
            <div className="text-3xl font-poppins font-bold text-navy">
              {errors}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Characters mistyped
            </div>
          </div>

          {/* Time */}
          <div className="bg-white rounded-xl border border-border p-5 shadow-card">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-blue-brand" />
              <span className="font-semibold text-navy text-sm">
                Time Taken
              </span>
            </div>
            <div className="text-3xl font-poppins font-bold text-navy">
              {timeTakenStr}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              of {exam.timeMin}m total
            </div>
          </div>

          {/* Correct Words */}
          <div className="bg-white rounded-xl border border-green-200 p-5 shadow-card">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="font-semibold text-navy text-sm">
                Correct Words
              </span>
            </div>
            <div className="text-3xl font-poppins font-bold text-green-600">
              {correctWords}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Words typed correctly
            </div>
          </div>

          {/* Wrong Words */}
          <div className="bg-white rounded-xl border border-red-200 p-5 shadow-card">
            <div className="flex items-center gap-2 mb-2">
              <XCircle className="w-4 h-4 text-red-400" />
              <span className="font-semibold text-navy text-sm">
                Wrong Words
              </span>
            </div>
            <div className="text-3xl font-poppins font-bold text-red-500">
              {wrongWords}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Words with mistakes
            </div>
          </div>
        </div>

        {/* Improvement tips if failed */}
        {!passed && (
          <div className="bg-blue-brand/5 border border-blue-brand/20 rounded-xl p-5">
            <h3 className="font-poppins font-semibold text-navy mb-3">
              Tips to Improve
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {!wpmPassed && (
                <li>
                  • Practice daily to build muscle memory. Target 5+ WPM
                  improvement per week.
                </li>
              )}
              {!accuracyPassed && (
                <li>
                  • Slow down slightly and focus on accuracy — speed will follow
                  naturally.
                </li>
              )}
              <li>• Practice blind typing — avoid looking at the keyboard.</li>
              <li>
                • Do timed drills with official-style passages for best
                preparation.
              </li>
            </ul>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/exam/$id/test" params={{ id }}>
            <Button
              size="lg"
              className="w-full sm:w-auto bg-blue-brand hover:bg-blue-brand-light text-white font-semibold rounded-full px-8"
              data-ocid="result.primary_button"
            >
              <RotateCcw className="w-4 h-4 mr-2" /> Try Again
            </Button>
          </Link>
          <Link to="/exam/$id/rules" params={{ id }}>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-navy text-navy hover:bg-navy hover:text-white font-semibold rounded-full px-8"
              data-ocid="result.secondary_button"
            >
              <BookOpen className="w-4 h-4 mr-2" /> View Rules
            </Button>
          </Link>
          <Link to="/exams">
            <Button
              size="lg"
              variant="ghost"
              className="w-full sm:w-auto text-muted-foreground rounded-full px-8"
              data-ocid="result.link"
            >
              All Exams
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}

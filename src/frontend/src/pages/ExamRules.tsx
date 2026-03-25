import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EXAMS } from "@/data/exams";
import { Link, useParams } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle,
  ExternalLink,
  Play,
} from "lucide-react";
import { motion } from "motion/react";

export function ExamRules() {
  const { id } = useParams({ strict: false }) as { id: string };
  const exam = EXAMS.find((e) => e.id === id);

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
    <main className="min-h-screen bg-background">
      <div className="bg-navy py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/exams"
            className="inline-flex items-center gap-2 text-white/65 hover:text-white text-sm mb-6 transition-colors"
            data-ocid="rules.link"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Exams
          </Link>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <Badge className="bg-blue-brand/30 text-blue-100 mb-3 text-xs">
                {exam.category}
              </Badge>
              <h1 className="text-3xl sm:text-4xl font-poppins font-bold text-white">
                {exam.name}
              </h1>
              <p className="text-white/65 text-sm mt-1">{exam.authority}</p>
            </div>
            <Link to="/exam/$id/test" params={{ id: exam.id }}>
              <Button
                className="bg-blue-brand hover:bg-blue-brand-light text-white font-semibold rounded-full"
                data-ocid="rules.primary_button"
              >
                <Play className="w-4 h-4 mr-2" /> Start Test
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              {
                label: "Required WPM",
                value:
                  exam.requiredWPM > 0
                    ? `${exam.requiredWPM} WPM`
                    : "15000 KDPH",
              },
              { label: "Duration", value: `${exam.timeMin} Minutes` },
              { label: "Language", value: exam.language },
              { label: "Min. Accuracy", value: `${exam.accuracy}%` },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="bg-white border border-border rounded-xl p-4 text-center shadow-card"
              >
                <div className="font-poppins font-bold text-navy text-xl mb-1">
                  {value}
                </div>
                <div className="text-xs text-muted-foreground">{label}</div>
              </div>
            ))}
          </div>

          <div className="bg-white border border-border rounded-xl p-6 shadow-card">
            <h2 className="font-poppins font-bold text-navy text-lg mb-2">
              About This Exam
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              {exam.description}
            </p>
            <div className="flex flex-wrap gap-3">
              <div className="text-sm">
                <span className="font-semibold text-navy">Authority:</span>{" "}
                <span className="text-muted-foreground">{exam.authority}</span>
              </div>
              <div className="text-sm">
                <span className="font-semibold text-navy">Eligibility:</span>{" "}
                <span className="text-muted-foreground">
                  {exam.eligibility}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-navy/5 border border-navy/20 rounded-xl p-5 flex items-center justify-between">
            <div>
              <div className="font-semibold text-navy text-sm">
                Official Website
              </div>
              <div className="text-xs text-muted-foreground mt-0.5">
                {exam.officialSite}
              </div>
            </div>
            <a
              href={exam.officialSite}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="sm"
                variant="outline"
                className="text-navy border-navy/30 hover:bg-navy hover:text-white rounded-full"
                data-ocid="rules.link"
              >
                <ExternalLink className="w-3.5 h-3.5 mr-2" /> Visit Site
              </Button>
            </a>
          </div>

          <div className="bg-white border border-border rounded-xl p-6 shadow-card">
            <h2 className="font-poppins font-bold text-navy text-lg mb-4">
              Exam Rules
            </h2>
            <ul className="space-y-3">
              {exam.rules.map((rule) => (
                <li key={rule.slice(0, 40)} className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-blue-brand mt-0.5 shrink-0" />
                  <span className="text-sm text-foreground/80">{rule}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white border border-border rounded-xl p-6 shadow-card">
            <h2 className="font-poppins font-bold text-navy text-lg mb-3">
              Marking Scheme
            </h2>
            <p className="text-sm text-muted-foreground">
              {exam.markingScheme}
            </p>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-semibold text-yellow-800 text-sm mb-1">
                  Error / Negative Marking Policy
                </h3>
                <p className="text-yellow-700 text-sm">
                  {exam.negativeMarking}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-border rounded-xl p-6 shadow-card">
            <h2 className="font-poppins font-bold text-navy text-lg mb-4">
              Important Notes
            </h2>
            <ul className="space-y-2">
              {exam.importantNotes.map((note, i) => (
                <li key={note.slice(0, 40)} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-brand/10 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-blue-brand text-xs font-bold">
                      {i + 1}
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground">{note}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gradient-blue rounded-xl p-8 text-center">
            <h3 className="font-poppins font-bold text-white text-xl mb-2">
              Ready to Practice?
            </h3>
            <p className="text-white/70 text-sm mb-6">
              Start a timed test with official-style passages for {exam.name}.
            </p>
            <Link to="/exam/$id/test" params={{ id: exam.id }}>
              <Button
                className="bg-white text-navy hover:bg-white/90 font-semibold rounded-full px-8"
                data-ocid="rules.primary_button"
              >
                <Play className="w-4 h-4 mr-2" /> Start Typing Test
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

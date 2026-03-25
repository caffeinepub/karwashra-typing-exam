import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EXAMS } from "@/data/exams";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  CheckCircle,
  ChevronRight,
  Clock,
  Globe,
  Target,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";

const POPULAR_EXAMS = EXAMS.slice(0, 8);

const FEATURES = [
  {
    icon: Zap,
    title: "Real-Time WPM",
    desc: "Instant words-per-minute calculation as you type, just like the actual exam environment.",
  },
  {
    icon: Target,
    title: "Accuracy Tracking",
    desc: "Character-by-character accuracy monitoring with color-coded feedback for every keystroke.",
  },
  {
    icon: Clock,
    title: "Exam Timer",
    desc: "Countdown timer matching official exam durations — 10 to 15 minutes as per exam rules.",
  },
  {
    icon: CheckCircle,
    title: "Exam-Specific Rules",
    desc: "Each test follows official rules — WPM threshold, accuracy %, and passage style per exam.",
  },
  {
    icon: Globe,
    title: "Hindi & English",
    desc: "Practice in both Hindi (Devanagari) and English passages for bilingual exams.",
  },
  {
    icon: Award,
    title: "Pass/Fail Result",
    desc: "Instant result with detailed breakdown — WPM achieved vs required, accuracy, and errors.",
  },
];

const TESTIMONIALS = [
  {
    name: "Rahul Sharma",
    role: "SSC CHSL Qualifier 2024",
    avatar: "RS",
    text: "Karwashra helped me go from 28 WPM to 40 WPM in just 3 weeks. The real exam-style passages made all the difference. I qualified comfortably!",
  },
  {
    name: "Priya Verma",
    role: "RRB NTPC Qualifier 2024",
    avatar: "PV",
    text: "The Hindi typing practice on this platform is excellent. I practiced for the NTPC Hindi test and cleared with 28 WPM — well above the requirement.",
  },
  {
    name: "Amit Kumar",
    role: "Bank Clerk Qualifier 2023",
    avatar: "AK",
    text: "The pass/fail result with detailed stats helped me identify my weak areas. After two weeks of targeted practice, I passed my Bank Clerk typing test easily.",
  },
];

export function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section
        className="relative min-h-[600px] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage:
            "url('/assets/generated/hero-typing-exam.dim_1600x900.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-navy-dark/80" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Badge className="bg-blue-brand/30 text-blue-100 border-blue-brand/50 mb-6 text-xs tracking-wider uppercase">
              Official Exam Practice Platform
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-poppins font-bold text-white leading-tight mb-4">
              Practice Government
              <span className="text-blue-brand-light"> Typing Exams</span>
            </h1>
            <p className="text-lg text-white/75 max-w-2xl mx-auto mb-8">
              SSC • RRB NTPC • Bank • High Court • HSSC • LDC • DEO — all exams
              with official rules, real passages, and instant results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/exams">
                <Button
                  size="lg"
                  className="bg-blue-brand hover:bg-blue-brand-light text-white font-semibold px-8 rounded-full shadow-lg"
                  data-ocid="home.primary_button"
                >
                  Start Free Test <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link to="/exams">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/40 text-white hover:bg-white/10 font-semibold px-8 rounded-full"
                  data-ocid="home.secondary_button"
                >
                  View All Exams
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Popular Exams Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-poppins font-bold text-navy mb-3">
              POPULAR EXAM TYPING TESTS
            </h2>
            <div className="w-16 h-1 bg-blue-brand mx-auto rounded-full" />
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto text-sm">
              Practice with officially structured tests for every major
              government exam typing requirement.
            </p>
          </motion.div>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
            data-ocid="exams.list"
          >
            {POPULAR_EXAMS.map((exam, i) => (
              <motion.div
                key={exam.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                data-ocid={`exams.item.${i + 1}`}
              >
                <div className="bg-white border border-border rounded-xl p-5 shadow-card hover:shadow-card-hover transition-all group h-full flex flex-col">
                  <div className="flex items-start justify-between mb-3">
                    <Badge className="bg-navy/10 text-navy text-xs font-semibold">
                      {exam.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {exam.language}
                    </span>
                  </div>
                  <h3 className="font-poppins font-bold text-navy text-base mb-1">
                    {exam.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-3 flex-1">
                    {exam.authority}
                  </p>
                  <div className="space-y-1 mb-4">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">
                        Required WPM
                      </span>
                      <span className="font-semibold text-blue-brand">
                        {exam.requiredWPM > 0
                          ? `${exam.requiredWPM} WPM`
                          : "15000 KDPH"}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Duration</span>
                      <span className="font-semibold text-foreground">
                        {exam.timeMin} min
                      </span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Accuracy</span>
                      <span className="font-semibold text-foreground">
                        {exam.accuracy}%
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      to="/exam/$id/test"
                      params={{ id: exam.id }}
                      className="flex-1"
                    >
                      <Button
                        size="sm"
                        className="w-full bg-blue-brand hover:bg-blue-brand-light text-white text-xs font-semibold rounded-full"
                        data-ocid={`exams.item.${i + 1}`}
                      >
                        Take Test
                      </Button>
                    </Link>
                    <Link to="/exam/$id/rules" params={{ id: exam.id }}>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs text-navy border-navy/30 hover:bg-navy/5 rounded-full px-3"
                        data-ocid={`exams.item.${i + 1}`}
                      >
                        Rules
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/exams">
              <Button
                variant="outline"
                className="border-navy text-navy hover:bg-navy hover:text-white font-semibold rounded-full px-8"
                data-ocid="home.secondary_button"
              >
                View All Exams <ChevronRight className="ml-1 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Highlight Band */}
      <section className="bg-gradient-blue py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-poppins font-bold text-white mb-3">
              Advanced Typing Test Interface
            </h2>
            <p className="text-white/75 max-w-xl mx-auto mb-10 text-sm">
              Real-time character highlighting, live WPM counter, accuracy
              percentage — exactly as you'll face in the actual exam hall.
            </p>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 max-w-3xl mx-auto shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="text-white/70 text-xs font-mono">
                  SSC CHSL — Typing Test
                </div>
                <div className="text-white font-bold text-sm font-mono">
                  09:32
                </div>
              </div>
              <div className="bg-white/5 rounded-xl p-4 text-left mb-4">
                <p className="text-sm leading-loose font-mono">
                  <span className="text-green-400">
                    The Government of India has always given{" "}
                  </span>
                  <span className="text-blue-300 underline font-bold">p</span>
                  <span className="text-white/60">
                    riority to the welfare of its citizens through various
                    developmental schemes.
                  </span>
                </p>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {[
                  { label: "WPM", value: "38" },
                  { label: "Accuracy", value: "96.2%" },
                  { label: "Errors", value: "2" },
                  { label: "Time", value: "9:32" },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="bg-white/10 rounded-lg p-2 text-center"
                  >
                    <div className="text-white font-bold text-lg">{value}</div>
                    <div className="text-white/60 text-xs">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-poppins font-bold text-navy mb-3">
              OUR TYPING EXAM KEY FEATURES
            </h2>
            <div className="w-16 h-1 bg-blue-brand mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="flex gap-4 p-5 rounded-xl hover:bg-muted/50 transition-colors"
              >
                <div className="w-11 h-11 bg-navy/10 rounded-xl flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-navy" />
                </div>
                <div>
                  <h3 className="font-poppins font-semibold text-navy mb-1">
                    {title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-light-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-poppins font-bold text-navy mb-3">
              WHAT OUR STUDENTS SAY
            </h2>
            <div className="w-16 h-1 bg-blue-brand mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-card"
                data-ocid={`testimonials.item.${i + 1}`}
              >
                <p className="text-muted-foreground text-sm leading-relaxed mb-5 italic">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-navy rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-navy text-sm">
                      {t.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {t.role}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

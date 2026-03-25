import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { BookOpen, Keyboard, Shield, Users } from "lucide-react";
import { motion } from "motion/react";

const STATS = [
  { value: "12+", label: "Exam Categories" },
  { value: "50+", label: "Practice Passages" },
  { value: "10,000+", label: "Students Helped" },
  { value: "Free", label: "Always Free" },
];

export function About() {
  return (
    <main className="min-h-screen">
      <div className="bg-navy py-14">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-poppins font-bold text-white mb-3">
            About Karwashra Typing Exam
          </h1>
          <p className="text-white/65 text-sm max-w-xl mx-auto">
            India's most comprehensive platform for government typing exam
            preparation
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {STATS.map(({ value, label }) => (
            <div
              key={label}
              className="bg-white border border-border rounded-xl p-5 text-center shadow-card"
            >
              <div className="text-3xl font-poppins font-bold text-navy mb-1">
                {value}
              </div>
              <div className="text-xs text-muted-foreground">{label}</div>
            </div>
          ))}
        </div>

        {/* Mission */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white border border-border rounded-xl p-8 shadow-card"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-navy/10 rounded-xl flex items-center justify-center">
              <Keyboard className="w-5 h-5 text-navy" />
            </div>
            <h2 className="text-xl font-poppins font-bold text-navy">
              Our Mission
            </h2>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Karwashra Typing Exam was created to give every government job
            aspirant in India a free, high-quality platform to practice typing
            tests that match the official exam standards. We cover SSC, RRB
            NTPC, Bank, High Court, HSSC, LDC, DEO, and all major state
            government typing examinations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              icon: Shield,
              title: "Official Rules",
              desc: "Every test follows the exact rules, WPM requirements, accuracy standards, and time limits from official exam notifications.",
            },
            {
              icon: BookOpen,
              title: "Real Passages",
              desc: "Practice with government-style passages in both English and Hindi — the same style you'll face on exam day.",
            },
            {
              icon: Users,
              title: "For All Levels",
              desc: "Whether you're a beginner at 20 WPM or an advanced typist near 50 WPM, our platform adapts to your preparation needs.",
            },
          ].map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white border border-border rounded-xl p-6 shadow-card"
            >
              <div className="w-10 h-10 bg-blue-brand/10 rounded-xl flex items-center justify-center mb-4">
                <Icon className="w-5 h-5 text-blue-brand" />
              </div>
              <h3 className="font-poppins font-bold text-navy mb-2">{title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {desc}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="bg-gradient-blue rounded-xl p-8 text-center">
          <h3 className="font-poppins font-bold text-white text-xl mb-2">
            Start Practicing Today
          </h3>
          <p className="text-white/70 text-sm mb-6">
            Free, unlimited practice for every government typing exam in India.
          </p>
          <Link to="/exams">
            <Button
              className="bg-white text-navy hover:bg-white/90 font-semibold rounded-full px-8"
              data-ocid="about.primary_button"
            >
              Browse All Exams
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}

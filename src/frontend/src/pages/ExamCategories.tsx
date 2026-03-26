import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EXAMS } from "@/data/exams";
import { Link } from "@tanstack/react-router";
import { ExternalLink, Search } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const CATEGORIES = ["All", "SSC", "Railway", "Banking", "Court", "State Govt"];
const LANGUAGES = ["All", "English", "Hindi", "Hindi/English", "English/Hindi"];

export function ExamCategories() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [language, setLanguage] = useState("All");

  const filtered = EXAMS.filter((e) => {
    const matchSearch =
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.authority.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "All" || e.category === category;
    const matchLang = language === "All" || e.language.includes(language);
    return matchSearch && matchCat && matchLang;
  });

  return (
    <main className="min-h-screen bg-background">
      {/* Page Header */}
      <div className="bg-navy py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-poppins font-bold text-white mb-3"
          >
            Exam Categories
          </motion.h1>
          <p className="text-white/65 text-sm max-w-xl mx-auto">
            Browse all government typing exam tests — filter by category or
            language
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-border sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search exams or authority..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
                data-ocid="exams.search_input"
              />
            </div>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger
                className="w-full sm:w-44"
                data-ocid="exams.select"
              >
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger
                className="w-full sm:w-44"
                data-ocid="exams.select"
              >
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                {LANGUAGES.map((l) => (
                  <SelectItem key={l} value={l}>
                    {l}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {filtered.length === 0 ? (
          <div className="text-center py-20" data-ocid="exams.empty_state">
            <p className="text-muted-foreground">
              No exams found. Try adjusting your filters.
            </p>
          </div>
        ) : (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            data-ocid="exams.list"
          >
            {filtered.map((exam, i) => (
              <motion.div
                key={exam.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="bg-white border border-border rounded-xl p-5 shadow-card hover:shadow-card-hover transition-all flex flex-col"
                data-ocid={`exams.item.${i + 1}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <Badge className="bg-navy/10 text-navy text-xs">
                    {exam.category}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {exam.language}
                  </span>
                </div>

                {/* Exam Name with Logo */}
                <div className="flex items-center gap-2 mb-1">
                  <img
                    src={exam.logoUrl}
                    alt={`${exam.name} logo`}
                    className="w-7 h-7 rounded object-contain bg-white p-0.5 border border-border flex-shrink-0"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                  <h3 className="font-poppins font-bold text-navy text-lg leading-tight">
                    {exam.name}
                  </h3>
                </div>

                <p className="text-xs text-muted-foreground mb-1">
                  {exam.authority}
                </p>
                <p className="text-sm text-foreground/70 mb-4 flex-1">
                  {exam.description}
                </p>

                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="text-center bg-muted rounded-lg py-2">
                    <div className="font-bold text-navy text-sm">
                      {exam.requiredWPM > 0 ? exam.requiredWPM : "—"}
                    </div>
                    <div className="text-xs text-muted-foreground">WPM</div>
                  </div>
                  <div className="text-center bg-muted rounded-lg py-2">
                    <div className="font-bold text-navy text-sm">
                      {exam.timeMin}m
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Duration
                    </div>
                  </div>
                  <div className="text-center bg-muted rounded-lg py-2">
                    <div className="font-bold text-navy text-sm">
                      {exam.accuracy}%
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Accuracy
                    </div>
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
                      className="text-navy border-navy/30 hover:bg-navy/5 text-xs rounded-full px-3"
                      data-ocid={`exams.item.${i + 1}`}
                    >
                      Rules
                    </Button>
                  </Link>
                  <a
                    href={exam.officialSite}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-xs px-2 rounded-full"
                      data-ocid={`exams.item.${i + 1}`}
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Button>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

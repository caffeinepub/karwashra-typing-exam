import { Link } from "@tanstack/react-router";
import {
  Facebook,
  Heart,
  Instagram,
  Keyboard,
  Twitter,
  Youtube,
} from "lucide-react";

const SOCIAL = [
  { Icon: Facebook, label: "Facebook" },
  { Icon: Twitter, label: "Twitter" },
  { Icon: Youtube, label: "YouTube" },
  { Icon: Instagram, label: "Instagram" },
];

export function Footer() {
  const year = new Date().getFullYear();
  const utmLink = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`;

  return (
    <footer className="bg-navy-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-brand rounded-lg flex items-center justify-center">
                <Keyboard className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-white font-poppins font-bold text-sm tracking-widest uppercase">
                  KARWASHRA
                </div>
                <div className="text-blue-brand-light font-poppins text-xs tracking-wider uppercase">
                  TYPING EXAM
                </div>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              India's trusted platform for government typing exam preparation.
              Practice SSC, RRB, Bank, Court, and State exams with official
              rules.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <div className="text-white font-semibold text-sm tracking-wider uppercase mb-2">
              Quick Links
            </div>
            {[
              { to: "/", label: "Home" },
              { to: "/exams", label: "Exam Categories" },
              { to: "/about", label: "About" },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-white/60 hover:text-white text-sm transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div>
            <div className="text-white font-semibold text-sm tracking-wider uppercase mb-4">
              Follow Us
            </div>
            <div className="flex gap-3">
              {SOCIAL.map(({ Icon, label }) => (
                <button
                  key={label}
                  type="button"
                  aria-label={label}
                  className="w-9 h-9 bg-white/10 hover:bg-blue-brand rounded-lg flex items-center justify-center transition-colors"
                >
                  <Icon className="w-4 h-4 text-white" />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-white/50 text-xs">
            © {year} Karwashra Typing Exam. All rights reserved.
          </p>
          <p className="text-white/40 text-xs flex items-center gap-1">
            Built with <Heart className="w-3 h-3 text-red-400 fill-red-400" />{" "}
            using{" "}
            <a
              href={utmLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-brand-light hover:text-white transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

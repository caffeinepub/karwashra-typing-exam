import { Link } from "@tanstack/react-router";
import { Heart, Keyboard, Mail } from "lucide-react";

const SOCIAL = [
  {
    label: "YouTube",
    href: "https://youtube.com/@supernatic?si=046swXr_71YSf-Dg",
    svg: (
      <svg
        role="img"
        aria-label="YouTube"
        viewBox="0 0 24 24"
        className="w-4 h-4 fill-white"
      >
        <title>YouTube</title>
        <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31.3 31.3 0 0 0 0 12a31.3 31.3 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31.3 31.3 0 0 0 24 12a31.3 31.3 0 0 0-.5-5.8zM9.7 15.5V8.5l6.3 3.5-6.3 3.5z" />
      </svg>
    ),
    color: "hover:bg-red-600",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/manish_karwashra?igsh=MXU5ODVoY2UydmRnYQ==",
    svg: (
      <svg
        role="img"
        aria-label="Instagram"
        viewBox="0 0 24 24"
        className="w-4 h-4 fill-white"
      >
        <title>Instagram</title>
        <path d="M12 2.2c3.2 0 3.6 0 4.9.1 3.3.2 4.8 1.7 5 5 .1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.2 3.3-1.7 4.8-5 5-1.3.1-1.6.1-4.9.1s-3.6 0-4.8-.1c-3.3-.2-4.8-1.7-5-5C2.1 15.6 2 15.3 2 12s0-3.6.1-4.8c.2-3.3 1.7-4.8 5-5C8.4 2.2 8.8 2.2 12 2.2zm0-2.2C8.7 0 8.3 0 7.1.1 2.7.3.3 2.7.1 7.1 0 8.3 0 8.7 0 12s0 3.7.1 4.9C.3 21.3 2.7 23.7 7.1 23.9 8.3 24 8.7 24 12 24s3.7 0 4.9-.1c4.4-.2 6.8-2.6 7-7C24 15.7 24 15.3 24 12s0-3.7-.1-4.9C23.7 2.7 21.3.3 16.9.1 15.7 0 15.3 0 12 0zm0 5.8a6.2 6.2 0 1 0 0 12.4A6.2 6.2 0 0 0 12 5.8zm0 10.2a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.8a1.4 1.4 0 1 0 0 2.9 1.4 1.4 0 0 0 0-2.9z" />
      </svg>
    ),
    color: "hover:bg-pink-600",
  },
  {
    label: "Twitter / X",
    href: "https://x.com/sukhdev_2005",
    svg: (
      <svg
        role="img"
        aria-label="Twitter / X"
        viewBox="0 0 24 24"
        className="w-4 h-4 fill-white"
      >
        <title>Twitter / X</title>
        <path d="M18.3 2h3.1l-6.8 7.8L22.6 22h-6.3l-4.9-6.4L5.6 22H2.5l7.3-8.3L2 2h6.4l4.4 5.8L18.3 2zm-1.1 18h1.7L6.9 3.8H5.1L17.2 20z" />
      </svg>
    ),
    color: "hover:bg-gray-800",
  },
  {
    label: "Threads",
    href: "https://www.threads.com/@manish_karwashra",
    svg: (
      <svg
        role="img"
        aria-label="Threads"
        viewBox="0 0 24 24"
        className="w-4 h-4 fill-white"
      >
        <title>Threads</title>
        <path d="M12.2 2C7.2 2 4 5.5 4 10.5c0 4.3 2.5 7.4 6.5 8.3v1.4c0 .5.4 1 1 1h1.4c.5 0 1-.4 1-1v-1.5c3.8-1 6.1-4.1 6.1-8.2C20 5.5 17.2 2 12.2 2zm-.1 14.5c-3 0-5-2.1-5-5s2-5.1 5-5.1 5 2.1 5 5.1-2 5-5 5zm0-8c-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3-1.3-3-3-3z" />
      </svg>
    ),
    color: "hover:bg-gray-700",
  },
  {
    label: "Email",
    href: "mailto:manishkarwashra07@gmail.com",
    svg: <Mail className="w-4 h-4 text-white" />,
    color: "hover:bg-green-600",
  },
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
            <div className="flex flex-wrap gap-3">
              {SOCIAL.map(({ label, href, svg, color }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className={`w-9 h-9 bg-white/10 ${color} rounded-lg flex items-center justify-center transition-colors`}
                >
                  {svg}
                </a>
              ))}
            </div>
            <div className="mt-4">
              <a
                href="mailto:manishkarwashra07@gmail.com"
                className="text-white/60 hover:text-white text-xs transition-colors break-all"
              >
                manishkarwashra07@gmail.com
              </a>
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

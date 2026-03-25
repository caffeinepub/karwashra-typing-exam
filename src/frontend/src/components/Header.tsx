import { Button } from "@/components/ui/button";
import { Link, useLocation } from "@tanstack/react-router";
import { Keyboard, Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { to: "/", label: "HOME" },
  { to: "/exams", label: "EXAM CATEGORIES" },
  { to: "/about", label: "ABOUT" },
];

export function Header() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-navy shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="flex items-center gap-3 group"
            data-ocid="header.link"
          >
            <div className="w-10 h-10 bg-blue-brand rounded-lg flex items-center justify-center group-hover:bg-blue-brand-light transition-colors">
              <Keyboard className="w-6 h-6 text-white" />
            </div>
            <div className="leading-tight">
              <div className="text-white font-poppins font-bold text-sm tracking-widest uppercase">
                KARWASHRA
              </div>
              <div className="text-blue-brand-light font-poppins font-semibold text-xs tracking-wider uppercase">
                TYPING EXAM
              </div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                data-ocid="header.link"
                className={`text-xs font-semibold tracking-widest uppercase transition-colors ${
                  location.pathname === link.to
                    ? "text-white border-b-2 border-blue-brand-light pb-0.5"
                    : "text-blue-100/80 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link to="/exams" className="hidden sm:block">
              <Button
                size="sm"
                className="bg-blue-brand hover:bg-blue-brand-light text-white font-semibold text-xs tracking-wider uppercase rounded-full px-5"
                data-ocid="header.primary_button"
              >
                START FREE TEST
              </Button>
            </Link>
            <button
              type="button"
              className="md:hidden text-white p-1"
              onClick={() => setMenuOpen(!menuOpen)}
              data-ocid="header.toggle"
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav className="md:hidden border-t border-white/10 py-3 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={`px-2 py-2 text-xs font-semibold tracking-widest uppercase transition-colors ${
                  location.pathname === link.to
                    ? "text-white"
                    : "text-blue-100/80 hover:text-white"
                }`}
                data-ocid="header.link"
              >
                {link.label}
              </Link>
            ))}
            <Link to="/exams" onClick={() => setMenuOpen(false)}>
              <Button
                size="sm"
                className="w-full bg-blue-brand hover:bg-blue-brand-light text-white font-semibold text-xs tracking-wider uppercase rounded-full mt-1"
                data-ocid="header.primary_button"
              >
                START FREE TEST
              </Button>
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}

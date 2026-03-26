import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import {
  BarChart3,
  BookOpen,
  Keyboard,
  LogOut,
  Menu,
  Radio,
  User,
  X,
} from "lucide-react";
import { useState } from "react";

const navLinks = [
  { to: "/learn", label: "LEARN TYPING" },
  { to: "/", label: "HOME" },
  { to: "/exams", label: "EXAM CATEGORIES" },
  { to: "/about", label: "ABOUT" },
];

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, username, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate({ to: "/" });
    setMenuOpen(false);
  };

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
                className={`text-xs font-semibold tracking-widest uppercase transition-colors flex items-center gap-1 ${
                  location.pathname === link.to
                    ? "text-white border-b-2 border-blue-brand-light pb-0.5"
                    : "text-blue-100/80 hover:text-white"
                } ${
                  link.to === "/learn"
                    ? "text-yellow-300 hover:text-yellow-200"
                    : ""
                }`}
              >
                {link.to === "/learn" && <BookOpen className="w-3 h-3" />}
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {isLoggedIn ? (
              <>
                <Link
                  to="/live"
                  className="hidden sm:flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 font-semibold tracking-wider uppercase"
                  data-ocid="header.link"
                >
                  <Radio className="w-3.5 h-3.5" />
                  Live
                </Link>
                <Link to="/dashboard" data-ocid="header.link">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="hidden sm:flex items-center gap-1.5 text-white hover:bg-white/10 text-xs font-semibold tracking-wider"
                  >
                    <User className="w-3.5 h-3.5" />
                    {username}
                  </Button>
                </Link>
                <Link
                  to="/dashboard"
                  className="hidden sm:block"
                  data-ocid="header.link"
                >
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-white/70 hover:text-white hover:bg-white/10 text-xs gap-1.5"
                  >
                    <BarChart3 className="w-3.5 h-3.5" /> Dashboard
                  </Button>
                </Link>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleLogout}
                  className="hidden sm:flex text-white/60 hover:text-white hover:bg-white/10 text-xs gap-1"
                  data-ocid="header.button"
                >
                  <LogOut className="w-3.5 h-3.5" /> Logout
                </Button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hidden sm:block"
                  data-ocid="header.link"
                >
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-white hover:bg-white/10 text-xs font-semibold tracking-wider"
                  >
                    Login
                  </Button>
                </Link>
                <Link
                  to="/signup"
                  className="hidden sm:block"
                  data-ocid="header.link"
                >
                  <Button
                    size="sm"
                    className="bg-blue-brand hover:bg-blue-brand-light text-white font-semibold text-xs tracking-wider uppercase rounded-full px-5"
                  >
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
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
                className={`px-2 py-2 text-xs font-semibold tracking-widest uppercase transition-colors flex items-center gap-1.5 ${
                  location.pathname === link.to
                    ? "text-white"
                    : link.to === "/learn"
                      ? "text-yellow-300 hover:text-yellow-200"
                      : "text-blue-100/80 hover:text-white"
                }`}
                data-ocid="header.link"
              >
                {link.to === "/learn" && <BookOpen className="w-3.5 h-3.5" />}
                {link.label}
              </Link>
            ))}
            {isLoggedIn ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setMenuOpen(false)}
                  data-ocid="header.link"
                >
                  <Button
                    size="sm"
                    variant="ghost"
                    className="w-full text-white hover:bg-white/10 text-xs gap-1.5 justify-start"
                  >
                    <BarChart3 className="w-3.5 h-3.5" /> Dashboard ({username})
                  </Button>
                </Link>
                <Link
                  to="/live"
                  onClick={() => setMenuOpen(false)}
                  data-ocid="header.link"
                >
                  <Button
                    size="sm"
                    variant="ghost"
                    className="w-full text-red-400 hover:bg-white/10 text-xs gap-1.5 justify-start"
                  >
                    <Radio className="w-3.5 h-3.5" /> Live Test
                  </Button>
                </Link>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleLogout}
                  className="text-white/70 hover:text-white hover:bg-white/10 text-xs gap-1 justify-start"
                  data-ocid="header.button"
                >
                  <LogOut className="w-3.5 h-3.5" /> Logout
                </Button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  data-ocid="header.link"
                >
                  <Button
                    size="sm"
                    variant="ghost"
                    className="w-full text-white hover:bg-white/10 text-xs"
                  >
                    Login
                  </Button>
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMenuOpen(false)}
                  data-ocid="header.link"
                >
                  <Button
                    size="sm"
                    className="w-full bg-blue-brand hover:bg-blue-brand-light text-white font-semibold text-xs rounded-full"
                  >
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}

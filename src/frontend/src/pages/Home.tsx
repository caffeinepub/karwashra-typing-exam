import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

const SOCIAL = [
  {
    name: "YouTube",
    url: "https://youtube.com/@supernatic?si=046swXr_71YSf-Dg",
    icon: "▶",
    color: "#ff0000",
    bg: "#ff0000",
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/manish_karwashra?igsh=MXU5ODVoY2UydmRnYQ==",
    icon: "📷",
    color: "#e1306c",
    bg: "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
  },
  {
    name: "Twitter",
    url: "https://x.com/sukhdev_2005",
    icon: "𝕏",
    color: "#1da1f2",
    bg: "#1da1f2",
  },
  {
    name: "Threads",
    url: "https://www.threads.com/@manish_karwashra",
    icon: "@",
    color: "#fff",
    bg: "#000",
  },
];

const ROW1 = [
  {
    label: "All Exam",
    abbr: "ALL",
    path: "/exams",
    color: "#1a3a8c",
    domain: "india.gov.in",
  },
  {
    label: "Delhi Police HCM",
    abbr: "DPH",
    path: "/exam/delhi-police-hcm/test",
    color: "#b71c1c",
    domain: "delhipolice.gov.in",
  },
  {
    label: "DSSSB",
    abbr: "DSSB",
    path: "/exam/dsssb/test",
    color: "#37474f",
    domain: "dsssb.delhi.gov.in",
  },
  {
    label: "SSC CGL",
    abbr: "CGL",
    path: "/exam/ssc-cgl/test",
    color: "#e65100",
    domain: "ssc.nic.in",
  },
  {
    label: "SSC CHSL",
    abbr: "CHSL",
    path: "/exam/ssc-chsl/test",
    color: "#ad1457",
    domain: "ssc.nic.in",
  },
  {
    label: "SSC MTS",
    abbr: "MTS",
    path: "/exam/ssc-mts/test",
    color: "#c62828",
    domain: "ssc.nic.in",
  },
  {
    label: "Railway NTPC",
    abbr: "NTPC",
    path: "/exam/rrb-ntpc/test",
    color: "#1565c0",
    domain: "rrbcdg.gov.in",
  },
];

const ROW2 = [
  {
    label: "Banking",
    abbr: "BANK",
    path: "/exam/bank-po/test",
    color: "#0277bd",
    domain: "ibps.in",
  },
  {
    label: "State Level",
    abbr: "STATE",
    path: "/exam/state-level/test",
    color: "#2e7d32",
    domain: "india.gov.in",
  },
  {
    label: "Harton",
    abbr: "HRT",
    path: "/exam/haryana-harton/test",
    color: "#e65100",
    domain: "hartron.org",
  },
  {
    label: "DEO",
    abbr: "DEO",
    path: "/exam/deo/test",
    color: "#558b2f",
    domain: "ssc.nic.in",
  },
  {
    label: "PCS",
    abbr: "PCS",
    path: "/exam/state-pcs/test",
    color: "#006064",
    domain: "india.gov.in",
  },
  {
    label: "Teaching",
    abbr: "TEACH",
    path: "/exam/teaching/test",
    color: "#4a148c",
    domain: "ctet.nic.in",
  },
  {
    label: "Clerk",
    abbr: "CLERK",
    path: "/exam/clerk/test",
    color: "#1565c0",
    domain: "ssc.nic.in",
  },
];

function ExamTile({
  label,
  abbr,
  color,
  domain,
  onTyping,
  onMCQ,
}: {
  label: string;
  abbr: string;
  color: string;
  domain: string;
  onTyping: () => void;
  onMCQ: () => void;
}) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #dde3ef",
        borderRadius: 8,
        padding: "10px 6px 8px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6,
        minWidth: 0,
        boxShadow: "0 1px 4px rgba(26,58,140,0.07)",
      }}
    >
      {/* Icon */}
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 10,
          background: color,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 2px 6px rgba(0,0,0,0.22)",
          flexShrink: 0,
        }}
      >
        <img
          src={`https://www.google.com/s2/favicons?domain=${domain}&sz=32`}
          alt={label}
          style={{ width: 22, height: 22 }}
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
            const fb = (
              e.target as HTMLImageElement
            ).parentElement!.querySelector(".abbr-fb");
            if (fb) (fb as HTMLElement).style.display = "block";
          }}
        />
        <span
          className="abbr-fb"
          style={{
            display: "none",
            color: "#fff",
            fontSize: 9,
            fontWeight: 800,
          }}
        >
          {abbr}
        </span>
      </div>

      {/* Label */}
      <span
        style={{
          fontSize: 10,
          color: "#1a2a6c",
          fontWeight: 700,
          textAlign: "center",
          lineHeight: 1.2,
          padding: "0 2px",
          minHeight: 24,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {label}
      </span>

      {/* Action Buttons */}
      <div style={{ display: "flex", gap: 4, width: "100%" }}>
        <button
          type="button"
          data-ocid={`home.${abbr.toLowerCase()}.typing.button`}
          onClick={onTyping}
          style={{
            flex: 1,
            background: color,
            color: "#fff",
            border: "none",
            borderRadius: 4,
            padding: "4px 2px",
            fontSize: 8.5,
            fontWeight: 700,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            lineHeight: 1.2,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.filter =
              "brightness(1.15)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.filter = "none";
          }}
        >
          ⌨️ Typing
        </button>
        <button
          type="button"
          data-ocid={`home.${abbr.toLowerCase()}.mcq.button`}
          onClick={onMCQ}
          style={{
            flex: 1,
            background: "#f57f17",
            color: "#fff",
            border: "none",
            borderRadius: 4,
            padding: "4px 2px",
            fontSize: 8.5,
            fontWeight: 700,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            lineHeight: 1.2,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.filter =
              "brightness(1.15)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.filter = "none";
          }}
        >
          📝 MCQ
        </button>
      </div>
    </div>
  );
}

export function Home() {
  const navigate = useNavigate();
  const { isLoggedIn, username, logout } = useAuth();
  const [activeLang, setActiveLang] = useState("all");

  const handleMCQ = (examId: string) => {
    // Remove -mcq suffix if present
    const cleanId = examId.replace(/-mcq$/, "");
    navigate({ to: "/mcq" as "/", search: { exam: cleanId } });
  };

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
          boxShadow: "0 2px 10px rgba(0,0,0,0.35)",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #ff6b00, #ff9500)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
          }}
        >
          <span style={{ fontSize: 20 }}>⌨️</span>
        </div>
        <div style={{ flex: 1 }}>
          <div
            style={{
              color: "#fff",
              fontWeight: 800,
              fontSize: 17,
              letterSpacing: 0.5,
              lineHeight: 1.2,
            }}
          >
            Manish Karwashra Typing
          </div>
          <div style={{ color: "#a8c4ff", fontSize: 10.5 }}>
            Govt Exam Typing Platform
          </div>
        </div>
        <nav style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <button
            type="button"
            data-ocid="nav.practice.link"
            onClick={() => navigate({ to: "/practice" })}
            style={{
              background: "none",
              border: "none",
              color: "#c8d8ff",
              fontSize: 12,
              cursor: "pointer",
              padding: "4px 8px",
            }}
          >
            Practice
          </button>
          <button
            type="button"
            data-ocid="nav.learning.link"
            onClick={() => navigate({ to: "/learning" })}
            style={{
              background: "none",
              border: "none",
              color: "#c8d8ff",
              fontSize: 12,
              cursor: "pointer",
              padding: "4px 8px",
            }}
          >
            Learning
          </button>
          <button
            type="button"
            data-ocid="nav.live.link"
            onClick={() => navigate({ to: "/live-test" })}
            style={{
              background: "none",
              border: "none",
              color: "#c8d8ff",
              fontSize: 12,
              cursor: "pointer",
              padding: "4px 8px",
            }}
          >
            Live
          </button>
          {isLoggedIn ? (
            <>
              <button
                type="button"
                data-ocid="nav.dashboard.link"
                onClick={() => navigate({ to: "/dashboard" })}
                style={{
                  background: "rgba(255,255,255,0.15)",
                  border: "1px solid rgba(255,255,255,0.3)",
                  color: "#fff",
                  fontSize: 12,
                  cursor: "pointer",
                  padding: "5px 12px",
                  borderRadius: 5,
                }}
              >
                {username}
              </button>
              <button
                type="button"
                data-ocid="nav.logout.button"
                onClick={logout}
                style={{
                  background: "#e65100",
                  border: "none",
                  color: "#fff",
                  fontSize: 12,
                  cursor: "pointer",
                  padding: "5px 12px",
                  borderRadius: 5,
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                data-ocid="nav.login.button"
                onClick={() => navigate({ to: "/login" })}
                style={{
                  background: "none",
                  border: "1.5px solid rgba(255,255,255,0.6)",
                  color: "#fff",
                  fontSize: 12,
                  cursor: "pointer",
                  padding: "5px 14px",
                  borderRadius: 5,
                }}
              >
                Login
              </button>
              <button
                type="button"
                data-ocid="nav.register.button"
                onClick={() => navigate({ to: "/signup" })}
                style={{
                  background: "linear-gradient(135deg,#ff6b00,#ff9500)",
                  border: "none",
                  color: "#fff",
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: "pointer",
                  padding: "5px 14px",
                  borderRadius: 5,
                  boxShadow: "0 2px 6px rgba(255,107,0,0.5)",
                }}
              >
                Register
              </button>
            </>
          )}
        </nav>
      </header>

      {/* LANGUAGE BAR */}
      <div
        style={{
          background: "#fff",
          borderBottom: "1px solid #d8e0ef",
          padding: "8px",
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          gap: 4,
          alignItems: "center",
        }}
      >
        <span style={{ fontSize: 16 }}>🇮🇳</span>
        {["hindi", "english", "all"].map((lang) => (
          <button
            key={lang}
            type="button"
            data-ocid={`home.lang.${lang}.toggle`}
            onClick={() => setActiveLang(lang)}
            style={{
              background: activeLang === lang ? "#1a3a8c" : "none",
              color: activeLang === lang ? "#fff" : "#1a3a8c",
              border: "1px solid #1a3a8c",
              borderRadius: 4,
              padding: "3px 12px",
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            {lang === "hindi"
              ? "हिन्दी"
              : lang === "english"
                ? "English"
                : "All Language"}
          </button>
        ))}
      </div>

      {/* HERO SECTION */}
      <section
        style={{
          background: "linear-gradient(180deg, #e8eeff 0%, #f0f4f8 100%)",
          padding: "20px 16px 12px",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h1
            style={{
              textAlign: "center",
              color: "#ff6b00",
              fontStyle: "italic",
              fontWeight: 900,
              fontSize: 26,
              margin: "0 0 4px",
              textShadow: "1px 2px 6px rgba(255,107,0,0.2)",
            }}
          >
            Welcome to Karwashra Typing
          </h1>
          <p
            style={{
              textAlign: "center",
              color: "#3a4a6a",
              fontSize: 13,
              margin: "0 0 16px",
              fontWeight: 500,
            }}
          >
            Speed up your typing &amp; Crack all Govt. &amp; State Exams!
          </p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div
              style={{
                flex: 1,
                maxWidth: 600,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 12,
              }}
            >
              <img
                src="/assets/generated/hero-typing-exam.dim_1600x900.jpg"
                alt="Typing Exam"
                style={{
                  width: "100%",
                  maxWidth: 420,
                  height: 160,
                  objectFit: "cover",
                  borderRadius: 12,
                  boxShadow: "0 4px 16px rgba(26,58,140,0.2)",
                }}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.background =
                    "linear-gradient(135deg,#1a3a8c,#0d2060)";
                  (e.target as HTMLImageElement).src = "";
                }}
              />
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 8,
                  width: "100%",
                }}
              >
                {[
                  {
                    label: "⏱ Live Test",
                    to: "/exam-interface?tab=live-test",
                    bg: "linear-gradient(135deg,#d32f2f,#b71c1c)",
                    shadow: "rgba(211,47,47,0.4)",
                  },
                  {
                    label: "⌨️ Typing Practice",
                    to: "/exam-interface?tab=practice",
                    bg: "linear-gradient(135deg,#1565c0,#0d47a1)",
                    shadow: "rgba(21,101,192,0.4)",
                  },
                  {
                    label: "📋 Mock Test",
                    to: "/exam-interface?tab=mock-test",
                    bg: "linear-gradient(135deg,#e65100,#bf360c)",
                    shadow: "rgba(230,81,0,0.4)",
                  },
                  {
                    label: "🎓 Learning Typing",
                    to: "/exam-interface?tab=typing-exam",
                    bg: "linear-gradient(135deg,#00695c,#004d40)",
                    shadow: "rgba(0,105,92,0.4)",
                  },
                ].map((btn) => (
                  <button
                    key={btn.to}
                    type="button"
                    data-ocid={`home.${btn.to.replace("/", "")}.primary_button`}
                    onClick={() => navigate({ to: btn.to as "/" })}
                    style={{
                      background: btn.bg,
                      color: "#fff",
                      border: "none",
                      borderRadius: 8,
                      padding: "12px 8px",
                      cursor: "pointer",
                      fontWeight: 700,
                      fontSize: 13,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 6,
                      boxShadow: `0 3px 8px ${btn.shadow}`,
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.filter =
                        "brightness(1.1)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.filter =
                        "none";
                    }}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EXAM SECTION */}
      <section
        style={{ background: "#fff", margin: "12px 0", padding: "16px" }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 14,
            }}
          >
            <div
              style={{
                flex: 1,
                height: 2,
                background: "linear-gradient(90deg,transparent,#1a3a8c)",
              }}
            />
            <h2
              style={{
                color: "#1a3a8c",
                fontStyle: "italic",
                fontWeight: 800,
                fontSize: 15,
                margin: 0,
                whiteSpace: "nowrap",
                textAlign: "center",
              }}
            >
              ⌨️ Typing Exam &amp; MCQ Test — Select Your Exam
            </h2>
            <div
              style={{
                flex: 1,
                height: 2,
                background: "linear-gradient(90deg,#1a3a8c,transparent)",
              }}
            />
          </div>

          {/* Legend */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 16,
              marginBottom: 12,
            }}
          >
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                fontSize: 11,
                color: "#444",
                fontWeight: 600,
              }}
            >
              <span
                style={{
                  background: "#1a3a8c",
                  color: "#fff",
                  borderRadius: 4,
                  padding: "2px 8px",
                  fontSize: 10,
                }}
              >
                ⌨️ Typing
              </span>
              — Typing Speed Test
            </span>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                fontSize: 11,
                color: "#444",
                fontWeight: 600,
              }}
            >
              <span
                style={{
                  background: "#f57f17",
                  color: "#fff",
                  borderRadius: 4,
                  padding: "2px 8px",
                  fontSize: 10,
                }}
              >
                📝 MCQ
              </span>
              — MCQ / Objective Test
            </span>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              gap: 8,
              marginBottom: 8,
            }}
          >
            {ROW1.map((tile) => (
              <ExamTile
                key={tile.label}
                {...tile}
                onTyping={() => navigate({ to: tile.path as "/" })}
                onMCQ={() => handleMCQ(`${tile.abbr.toLowerCase()}-mcq`)}
              />
            ))}
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              gap: 8,
            }}
          >
            {ROW2.map((tile) => (
              <ExamTile
                key={tile.label}
                {...tile}
                onTyping={() => navigate({ to: tile.path as "/" })}
                onMCQ={() => handleMCQ(`${tile.abbr.toLowerCase()}-mcq`)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          background: "linear-gradient(135deg,#1a3a8c 0%,#0d2060 100%)",
          padding: "20px 16px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 12,
            marginBottom: 14,
          }}
        >
          {SOCIAL.map((s) => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid={`footer.${s.name.toLowerCase()}.link`}
              title={s.name}
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: s.bg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: s.color,
                fontSize: s.name === "Twitter" ? 15 : 18,
                fontWeight: 900,
                textDecoration: "none",
                boxShadow: "0 2px 8px rgba(0,0,0,0.35)",
                transition: "transform 0.15s",
                border: "2px solid rgba(255,255,255,0.2)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.transform =
                  "scale(1.15)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.transform = "none";
              }}
            >
              {s.icon}
            </a>
          ))}
          <a
            href="mailto:manishkarwashra07@gmail.com"
            data-ocid="footer.email.link"
            title="Email"
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: "#ea4335",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: 18,
              textDecoration: "none",
              boxShadow: "0 2px 8px rgba(0,0,0,0.35)",
              transition: "transform 0.15s",
              border: "2px solid rgba(255,255,255,0.2)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.transform =
                "scale(1.15)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.transform = "none";
            }}
          >
            ✉️
          </a>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 16,
            marginBottom: 10,
            flexWrap: "wrap",
          }}
        >
          {[
            "About Us",
            "Contact Us",
            "Privacy Policy",
            "Terms & Conditions",
          ].map((link) => (
            <button
              key={link}
              type="button"
              style={{
                color: "#a8c4ff",
                fontSize: 11,
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = "#a8c4ff";
              }}
            >
              {link}
            </button>
          ))}
        </div>
        <div style={{ color: "#6080b0", fontSize: 11 }}>
          © 2028 Karwashra Typing. All Rights Reserved. · Built with ❤️ using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#a8c4ff", textDecoration: "none" }}
          >
            caffeine.ai
          </a>
        </div>
      </footer>
    </div>
  );
}

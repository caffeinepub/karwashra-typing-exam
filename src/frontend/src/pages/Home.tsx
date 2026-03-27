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

const GAMING_LEFT = [
  {
    id: "esports-officials",
    label: "eSports Officials",
    sub: "Gaming Federation",
    color: "linear-gradient(135deg,#1565c0,#0d47a1)",
    icon: "🎮",
  },
  {
    id: "competitive-gaming-league",
    label: "Competitive Gaming League",
    sub: "CGL Gaming Board",
    color: "linear-gradient(135deg,#1a3a8c,#283593)",
    icon: "🏆",
  },
];

const GAMING_RIGHT = [
  {
    id: "gaming-ethics-law",
    label: "Gaming Ethics & Law",
    sub: "Regulatory Board",
    color: "linear-gradient(135deg,#37474f,#263238)",
    icon: "⚖️",
  },
  {
    id: "gaming-strategy",
    label: "Gaming Strategy",
    sub: "Strategy Board",
    color: "linear-gradient(135deg,#4a148c,#311b92)",
    icon: "♟️",
  },
];

function ExamTile({
  label,
  abbr,
  color,
  domain,
  onClick,
}: {
  label: string;
  abbr: string;
  color: string;
  domain: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-ocid={`home.${abbr.toLowerCase()}.button`}
      style={{
        background: "#fff",
        border: "1px solid #dde3ef",
        borderRadius: 6,
        padding: "8px 4px",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 5,
        transition: "box-shadow 0.15s, transform 0.1s",
        minWidth: 0,
      }}
      onMouseEnter={(e) => {
        const b = e.currentTarget as HTMLButtonElement;
        b.style.boxShadow = "0 4px 12px rgba(26,58,140,0.18)";
        b.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        const b = e.currentTarget as HTMLButtonElement;
        b.style.boxShadow = "none";
        b.style.transform = "none";
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 8,
          background: color,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
        }}
      >
        <img
          src={`https://www.google.com/s2/favicons?domain=${domain}&sz=32`}
          alt={label}
          style={{ width: 22, height: 22 }}
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
            (e.target as HTMLImageElement)
              .parentElement!.querySelector(".abbr-fallback")!
              .setAttribute("style", "display:block");
          }}
        />
        <span
          className="abbr-fallback"
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
      <span
        style={{
          fontSize: 10,
          color: "#1a2a6c",
          fontWeight: 600,
          textAlign: "center",
          lineHeight: 1.2,
          padding: "0 2px",
        }}
      >
        {label}
      </span>
    </button>
  );
}

function GamingCard({
  item,
  onClick,
}: { item: (typeof GAMING_LEFT)[0]; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-ocid={`home.gaming.${item.id}.button`}
      style={{
        background: item.color,
        border: "none",
        borderRadius: 10,
        padding: "14px 10px",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 6,
        color: "#fff",
        flex: 1,
        transition: "filter 0.15s, transform 0.1s",
        minHeight: 90,
        justifyContent: "center",
      }}
      onMouseEnter={(e) => {
        const b = e.currentTarget as HTMLButtonElement;
        b.style.filter = "brightness(1.15)";
        b.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        const b = e.currentTarget as HTMLButtonElement;
        b.style.filter = "none";
        b.style.transform = "none";
      }}
    >
      <span style={{ fontSize: 24 }}>{item.icon}</span>
      <span
        style={{
          fontSize: 11,
          fontWeight: 700,
          textAlign: "center",
          lineHeight: 1.3,
        }}
      >
        {item.label}
      </span>
      <span style={{ fontSize: 9, opacity: 0.8, textAlign: "center" }}>
        {item.sub}
      </span>
    </button>
  );
}

export function Home() {
  const navigate = useNavigate();
  const { isLoggedIn, username, logout } = useAuth();
  const [activeLang, setActiveLang] = useState("all");

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

          {/* Hero 3-column: gaming left, center, gaming right */}
          <div
            style={{
              display: "flex",
              gap: 12,
              alignItems: "stretch",
              justifyContent: "center",
            }}
          >
            {/* Gaming Left */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
                width: 130,
                flexShrink: 0,
              }}
            >
              {GAMING_LEFT.map((item) => (
                <GamingCard
                  key={item.id}
                  item={item}
                  onClick={() => navigate({ to: `/exam/${item.id}/test` })}
                />
              ))}
            </div>

            {/* Center */}
            <div
              style={{
                flex: 1,
                maxWidth: 560,
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
              {/* 4 Action Buttons */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 8,
                  width: "100%",
                }}
              >
                <button
                  type="button"
                  data-ocid="home.live_test.primary_button"
                  onClick={() => navigate({ to: "/live-test" })}
                  style={{
                    background: "linear-gradient(135deg,#d32f2f,#b71c1c)",
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
                    boxShadow: "0 3px 8px rgba(211,47,47,0.4)",
                    transition: "filter 0.15s",
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
                  <span>⏱</span> Live Test
                </button>
                <button
                  type="button"
                  data-ocid="home.practice.primary_button"
                  onClick={() => navigate({ to: "/practice" })}
                  style={{
                    background: "linear-gradient(135deg,#1565c0,#0d47a1)",
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
                    boxShadow: "0 3px 8px rgba(21,101,192,0.4)",
                    transition: "filter 0.15s",
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
                  <span>⌨️</span> Typing Practice
                </button>
                <button
                  type="button"
                  data-ocid="home.mock_test.primary_button"
                  onClick={() => navigate({ to: "/mock-test" })}
                  style={{
                    background: "linear-gradient(135deg,#e65100,#bf360c)",
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
                    boxShadow: "0 3px 8px rgba(230,81,0,0.4)",
                    transition: "filter 0.15s",
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
                  <span>📋</span> Mock Test
                </button>
                <button
                  type="button"
                  data-ocid="home.learning.primary_button"
                  onClick={() => navigate({ to: "/learning" })}
                  style={{
                    background: "linear-gradient(135deg,#00695c,#004d40)",
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
                    boxShadow: "0 3px 8px rgba(0,105,92,0.4)",
                    transition: "filter 0.15s",
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
                  <span>🎓</span> Learning Typing
                </button>
              </div>
            </div>

            {/* Gaming Right */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
                width: 130,
                flexShrink: 0,
              }}
            >
              {GAMING_RIGHT.map((item) => (
                <GamingCard
                  key={item.id}
                  item={item}
                  onClick={() => navigate({ to: `/exam/${item.id}/test` })}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* EXAM GRID SECTION */}
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
              Prepare for All Competitive and Gaming Exams
            </h2>
            <div
              style={{
                flex: 1,
                height: 2,
                background: "linear-gradient(90deg,#1a3a8c,transparent)",
              }}
            />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(12, 1fr)",
              gap: 6,
              marginBottom: 6,
            }}
          >
            {ROW1.map((tile) => (
              <ExamTile
                key={tile.label}
                {...tile}
                onClick={() => navigate({ to: tile.path as "/" })}
              />
            ))}
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(12, 1fr)",
              gap: 6,
            }}
          >
            {ROW2.map((tile) => (
              <ExamTile
                key={tile.label}
                {...tile}
                onClick={() => navigate({ to: tile.path as "/" })}
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
        {/* Social Icons */}
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
                background:
                  typeof s.bg === "string" && s.bg.startsWith("linear")
                    ? s.bg
                    : s.bg,
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

        {/* Footer Links */}
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
              style={{ color: "#a8c4ff", fontSize: 11, textDecoration: "none" }}
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

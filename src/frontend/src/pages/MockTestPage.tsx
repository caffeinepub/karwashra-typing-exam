import { ALLOWED_EXAMS as EXAMS } from "@/data/exams";
import { useNavigate } from "@tanstack/react-router";
import { ClipboardList } from "lucide-react";

export function MockTestPage() {
  const navigate = useNavigate();

  const categories = Array.from(new Set(EXAMS.map((e) => e.category)));

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f0f4f8",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "linear-gradient(135deg, #1a3a8c 0%, #0d2060 100%)",
          padding: "16px 24px",
          display: "flex",
          alignItems: "center",
          gap: 12,
          boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #ff6b00, #ff9500)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ClipboardList size={22} color="#fff" />
        </div>
        <div>
          <div
            style={{
              color: "#fff",
              fontWeight: 800,
              fontSize: 18,
              letterSpacing: 1,
            }}
          >
            MOCK TEST
          </div>
          <div style={{ color: "#a8c4ff", fontSize: 11 }}>
            Select Exam to Begin
          </div>
        </div>
        <button
          type="button"
          onClick={() => navigate({ to: "/" })}
          data-ocid="mock.close_button"
          style={{
            marginLeft: "auto",
            background: "rgba(255,255,255,0.15)",
            border: "1px solid rgba(255,255,255,0.3)",
            borderRadius: 6,
            color: "#fff",
            padding: "6px 16px",
            cursor: "pointer",
            fontSize: 13,
          }}
        >
          ← Home
        </button>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 16px" }}>
        <div
          style={{
            textAlign: "center",
            marginBottom: 28,
          }}
        >
          <h1
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: "#1a3a8c",
              margin: 0,
            }}
          >
            Mock Test – Select Exam
          </h1>
          <p style={{ color: "#555", marginTop: 6, fontSize: 14 }}>
            Choose any exam below to start a timed mock test with official rules
            and scoring.
          </p>
        </div>

        {categories.map((cat) => (
          <div key={cat} style={{ marginBottom: 28 }}>
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: "#1a3a8c",
                borderBottom: "2px solid #1a3a8c",
                paddingBottom: 6,
                marginBottom: 12,
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              {cat}
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
                gap: 10,
              }}
            >
              {EXAMS.filter((e) => e.category === cat).map((exam, idx) => (
                <button
                  key={exam.id}
                  type="button"
                  data-ocid={`mock.exam.item.${idx + 1}`}
                  onClick={() => navigate({ to: `/exam/${exam.id}/test` })}
                  style={{
                    background: "#fff",
                    border: "1px solid #d0d8e8",
                    borderRadius: 8,
                    padding: "12px 10px",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 8,
                    transition: "box-shadow 0.15s, border-color 0.15s",
                    textAlign: "center",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.boxShadow =
                      "0 4px 12px rgba(26,58,140,0.18)";
                    (e.currentTarget as HTMLButtonElement).style.borderColor =
                      "#1a3a8c";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.boxShadow =
                      "none";
                    (e.currentTarget as HTMLButtonElement).style.borderColor =
                      "#d0d8e8";
                  }}
                >
                  <img
                    src={exam.logoUrl}
                    alt={exam.name}
                    style={{ width: 32, height: 32, objectFit: "contain" }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: "#1a3a8c",
                      lineHeight: 1.3,
                    }}
                  >
                    {exam.name}
                  </div>
                  <div style={{ fontSize: 10, color: "#666" }}>
                    {exam.requiredWPM} WPM · {exam.timeMin} min
                  </div>
                  <div
                    style={{
                      fontSize: 10,
                      background: exam.language.toLowerCase().includes("hindi")
                        ? "#fff0e0"
                        : "#e8f0ff",
                      color: exam.language.toLowerCase().includes("hindi")
                        ? "#c04000"
                        : "#1a3a8c",
                      borderRadius: 4,
                      padding: "2px 6px",
                      fontWeight: 600,
                    }}
                  >
                    {exam.language}
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          textAlign: "center",
          padding: "16px",
          color: "#888",
          fontSize: 12,
          borderTop: "1px solid #ddd",
          background: "#fff",
        }}
      >
        © {new Date().getFullYear()}. Built with love using{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#1a3a8c", textDecoration: "none" }}
        >
          caffeine.ai
        </a>
      </div>
    </div>
  );
}

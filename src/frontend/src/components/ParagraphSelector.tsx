import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckCircle2 } from "lucide-react";

export interface ParagraphItem {
  id: string;
  title: string;
  text: string;
  category?: string;
  language?: "English" | "Hindi";
}

interface ParagraphSelectorProps {
  paragraphs: ParagraphItem[];
  selectedId: string | null;
  onSelect: (id: string, text: string) => void;
  examName?: string;
}

export function ParagraphSelector({
  paragraphs,
  selectedId,
  onSelect,
  examName,
}: ParagraphSelectorProps) {
  return (
    <div
      style={{
        border: "1px solid #c5d8f8",
        borderRadius: 4,
        overflow: "hidden",
        marginBottom: 8,
      }}
    >
      <div
        style={{
          background: "#e8f0fe",
          padding: "5px 10px",
          fontSize: 10,
          fontWeight: 700,
          color: "#1565C0",
          borderBottom: "1px solid #c5d8f8",
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        📄 SELECT PARAGRAPH{examName ? ` — ${examName}` : ""}
        <span style={{ fontWeight: 400, color: "#555", fontSize: 9 }}>
          ({paragraphs.length} available)
        </span>
      </div>
      <ScrollArea style={{ maxHeight: 240 }}>
        <div
          style={{
            padding: 6,
            display: "flex",
            flexDirection: "column",
            gap: 5,
          }}
        >
          {paragraphs.map((p) => {
            const isSelected = p.id === selectedId;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => onSelect(p.id, p.text)}
                data-ocid="practice.item"
                style={{
                  textAlign: "left",
                  background: isSelected ? "#e8f0fe" : "#fff",
                  border: `2px solid ${isSelected ? "#1565C0" : "#e0e0e0"}`,
                  borderRadius: 4,
                  padding: "7px 10px",
                  cursor: "pointer",
                  display: "flex",
                  gap: 8,
                  alignItems: "flex-start",
                  transition: "border-color 0.15s, background 0.15s",
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      marginBottom: 3,
                      flexWrap: "wrap",
                    }}
                  >
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: isSelected ? "#1565C0" : "#222",
                      }}
                    >
                      {p.title}
                    </span>
                    {p.category && (
                      <Badge
                        variant="secondary"
                        style={{
                          fontSize: 8,
                          padding: "1px 5px",
                          background: "#ffe0b2",
                          color: "#e65100",
                          border: "none",
                        }}
                      >
                        {p.category}
                      </Badge>
                    )}
                    {p.language && (
                      <Badge
                        variant="outline"
                        style={{
                          fontSize: 8,
                          padding: "1px 5px",
                          background:
                            p.language === "Hindi" ? "#fce4ec" : "#e8f5e9",
                          color: p.language === "Hindi" ? "#880e4f" : "#1b5e20",
                          border: "none",
                        }}
                      >
                        {p.language}
                      </Badge>
                    )}
                  </div>
                  <div
                    style={{
                      fontSize: 10,
                      color: "#666",
                      lineHeight: 1.4,
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {p.text.slice(0, 120)}
                    {p.text.length > 120 ? "..." : ""}
                  </div>
                </div>
                {isSelected && (
                  <CheckCircle2
                    size={16}
                    color="#1565C0"
                    style={{ flexShrink: 0, marginTop: 2 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}

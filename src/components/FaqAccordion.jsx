// src/components/FaqAccordion.jsx
"use client";

import { useState } from "react";

export default function FaqAccordion({ items, accentColor, theme = "dark" }) {
  const [openIndex, setOpenIndex] = useState(null);

  const isLight = theme === "light";
  const questionColor = isLight ? "#2A2420" : "white";
  const answerColor = isLight ? "#5A5450" : "rgba(255,255,255,0.5)";
  const dividerColor = isLight ? "rgba(42,36,32,0.1)" : "rgba(255,255,255,0.1)";

  return (
    <div style={{ borderTop: `1px solid ${dividerColor}` }}>
      {items.map((item, i) => (
        <div key={i} style={{ borderBottom: `1px solid ${dividerColor}` }}>
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "1.5rem 0",
              background: "none",
              border: "none",
              cursor: "pointer",
              textAlign: "left",
              gap: "1rem",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-lora), serif",
                fontSize: "1.05rem",
                fontWeight: 600,
                color: questionColor,
                lineHeight: 1.4,
              }}
            >
              {item.q}
            </span>
            <span
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: openIndex === i ? accentColor : `${accentColor}18`,
                border: `2px solid ${openIndex === i ? accentColor : `${accentColor}40`}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                fontSize: "1.1rem",
                color: openIndex === i ? "white" : accentColor,
                transition: "all 0.25s ease",
                transform: openIndex === i ? "rotate(45deg)" : "rotate(0deg)",
              }}
            >
              +
            </span>
          </button>

          <div
            style={{
              maxHeight: openIndex === i ? "300px" : "0",
              overflow: "hidden",
              transition: "max-height 0.35s cubic-bezier(0.4,0,0.2,1)",
            }}
          >
            <p
              style={{
                fontSize: "0.975rem",
                lineHeight: 1.8,
                color: answerColor,
                paddingBottom: "1.5rem",
                paddingRight: "2.5rem",
                margin: 0,
              }}
            >
              {item.a}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

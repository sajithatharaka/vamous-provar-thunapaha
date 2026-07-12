// src/components/EmailForm.jsx
// Props:
//   placeholder  : string
//   buttonText   : string
//   successMsg   : string
//   accentColor  : string (hex)
//   size         : "lg" | "sm"
//   theme        : "light" | "dark"  (default "dark")

"use client";

import { useState, useTransition } from "react";
import { captureEmail } from "@/lib/actions";

export default function EmailForm({
  placeholder = "Enter your email",
  buttonText = "Join Waitlist",
  successMsg = "🎉 You're on the list!",
  accentColor = "#6366f1",
  size = "lg",
  theme = "dark",
}) {
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [isPending, startTransition] = useTransition();

  const isLg = size === "lg";
  const isLight = theme === "light";

  const inputStyle = {
    flex: 1,
    minWidth: "220px",
    padding: isLg ? "1rem 1.5rem" : "0.75rem 1.25rem",
    fontSize: isLg ? "1rem" : "0.9rem",
    fontFamily: "var(--font-outfit), sans-serif",
    border: isLight
      ? "2px solid rgba(42,36,32,0.15)"
      : "1px solid rgba(255,255,255,0.1)",
    borderRadius: "14px",
    background: isLight ? "white" : "rgba(255,255,255,0.05)",
    color: isLight ? "#2A2420" : "white",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
    opacity: isPending ? 0.5 : 1,
  };

  const buttonStyle = {
    padding: isLg ? "1rem 2rem" : "0.75rem 1.5rem",
    fontSize: isLg ? "1rem" : "0.9rem",
    fontWeight: 700,
    fontFamily: "var(--font-outfit), sans-serif",
    background: `linear-gradient(135deg, ${accentColor} 0%, ${darkenHex(accentColor, 28)} 100%)`,
    color: "white",
    border: "none",
    borderRadius: "14px",
    cursor: isPending ? "not-allowed" : "pointer",
    whiteSpace: "nowrap",
    boxShadow: `0 4px 16px ${accentColor}35`,
    opacity: isPending ? 0.6 : 1,
    transition: "opacity 0.2s, transform 0.2s",
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const formData = new FormData(e.target);
    startTransition(async () => {
      const result = await captureEmail(formData);
      if (result.success) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMsg(result.error || "Something went wrong.");
      }
    });
  }

  if (status === "success") {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          padding: "1rem 1.5rem",
          borderRadius: "14px",
          border: `2px solid ${accentColor}40`,
          background: `${accentColor}12`,
          color: accentColor,
          fontSize: isLg ? "1rem" : "0.9rem",
          fontWeight: 600,
        }}
      >
        <span>✓</span>
        <span>{successMsg}</span>
      </div>
    );
  }

  return (
    <div style={{ width: "100%" }}>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}
      >
        <input
          type="email"
          name="email"
          required
          placeholder={placeholder}
          disabled={isPending}
          style={inputStyle}
          onFocus={(e) => {
            e.target.style.borderColor = accentColor;
            e.target.style.boxShadow = `0 0 0 3px ${accentColor}18`;
          }}
          onBlur={(e) => {
            e.target.style.borderColor = isLight
              ? "rgba(42,36,32,0.15)"
              : "rgba(255,255,255,0.1)";
            e.target.style.boxShadow = "none";
          }}
        />
        <button
          type="submit"
          disabled={isPending}
          style={buttonStyle}
          onMouseEnter={(e) => {
            if (!isPending)
              e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          {isPending ? "Joining…" : buttonText}
        </button>
      </form>
      {status === "error" && (
        <p
          style={{ marginTop: "0.5rem", fontSize: "0.85rem", color: "#ef4444" }}
        >
          {errorMsg}
        </p>
      )}
    </div>
  );
}

function darkenHex(hex, amount) {
  const r = Math.max(0, parseInt(hex.slice(1, 3), 16) - amount);
  const g = Math.max(0, parseInt(hex.slice(3, 5), 16) - amount);
  const b = Math.max(0, parseInt(hex.slice(5, 7), 16) - amount);
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

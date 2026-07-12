// src/components/CookieConsent.jsx
"use client";

import { useEffect, useState } from "react";

const CONSENT_KEY = "tunapaha_cookie_consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(CONSENT_KEY)) {
      setVisible(true);
    }
  }, []);

  function accept() {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie policy"
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1000,
        background: "#2A2420",
        color: "#FFFBF5",
        padding: "1.25rem 2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "1.5rem",
        flexWrap: "wrap",
        borderTop: "3px solid #D4A574",
        boxShadow: "0 -8px 24px rgba(0,0,0,0.2)",
      }}
    >
      <p style={{ margin: 0, fontSize: "0.9rem", lineHeight: 1.6, maxWidth: 640 }}>
        We use cookies to improve your experience on this site. By continuing to
        browse, you agree to our use of cookies.
      </p>
      <button
        onClick={accept}
        style={{
          padding: "0.75rem 1.75rem",
          fontSize: "0.9rem",
          fontWeight: 700,
          background: "linear-gradient(135deg, #D4A574 0%, #2D5016 100%)",
          color: "white",
          border: "none",
          borderRadius: 12,
          cursor: "pointer",
          whiteSpace: "nowrap",
        }}
      >
        Accept
      </button>
    </div>
  );
}

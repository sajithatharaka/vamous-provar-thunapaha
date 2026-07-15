"use client";

// src/app/page.jsx
// All content comes from /config.js — edit that file to customise for any brand.

import { useState, useEffect, useRef } from "react";
import {
  ChefHat,
  Flame,
  Heart,
  Users,
  ArrowRight,
  Sparkles,
  Star,
} from "lucide-react";
import { siteConfig } from "../../config";
import { captureEmail } from "@/lib/actions";
import Image from "next/image";

const { brand, hero, experience, host, menu, faq, contact, finalCta, footer } =
  siteConfig;

// ── Icon map ────────────────────────────────────────────────
const ICONS = { flame: Flame, heart: Heart, chef: ChefHat, users: Users };

function getCurrentYear() {
  return new Date().getFullYear();
}

// ── Inline FAQ accordion (TunaPaha style) ───────────────────
function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "2px solid rgba(45,80,22,0.12)" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1.75rem 0",
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
            fontSize: "1.15rem",
            fontWeight: 600,
            color: "#2A2420",
            lineHeight: 1.4,
          }}
        >
          {q}
        </span>
        <span
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            flexShrink: 0,
            background: open ? "#2D5016" : "#FFF3DC",
            border: `2px solid ${open ? "#2D5016" : "#E8912A"}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.2rem",
            color: open ? "white" : "#E8912A",
            transition: "all 0.3s ease",
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
          }}
        >
          +
        </span>
      </button>
      <div
        style={{
          maxHeight: open ? "300px" : "0",
          overflow: "hidden",
          transition: "max-height 0.4s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <p
          className="faq-answer"
          style={{
            fontSize: "1.05rem",
            lineHeight: 1.8,
            color: "#5A5450",
            paddingBottom: "1.75rem",
            paddingRight: "3rem",
          }}
        >
          {a}
        </p>
      </div>
    </div>
  );
}

// ── Waitlist form (local state, calls server action) ─────────
function WaitlistForm({
  placeholder,
  buttonText,
  successMessage,
  dark = false,
  size = "lg",
  testId,
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    const fd = new FormData();
    fd.append("email", email);
    try {
      const result = await captureEmail(fd);
      setStatus(result.success ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  const isLg = size === "lg";

  if (status === "success") {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          padding: "1rem 1.5rem",
          borderRadius: "16px",
          background: "rgba(45,80,22,0.12)",
          color: "#2D5016",
          fontSize: isLg ? "1rem" : "0.9rem",
          fontWeight: 600,
          border: "2px solid rgba(45,80,22,0.2)",
        }}
      >
        <Heart size={18} fill="currentColor" />
        {successMessage}
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        maxWidth: 500,
      }}
    >
      <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
        <input
          type="email"
          data-testid={`${testId}-email-input`}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          required
          style={{
            flex: 1,
            minWidth: 220,
            padding: isLg ? "1.25rem 1.75rem" : "1rem 1.25rem",
            fontSize: isLg ? "1.05rem" : "0.95rem",
            border: dark
              ? "2px solid rgba(255,255,255,0.2)"
              : "3px solid #D4A574",
            borderRadius: "16px",
            background: dark ? "rgba(255,255,255,0.08)" : "#FFFBF5",
            color: dark ? "white" : "#2A2420",
            outline: "none",
            transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
            boxShadow: "0 4px 12px rgba(212,165,116,0.15)",
          }}
          onFocus={(e) => {
            e.target.style.borderColor = dark ? "#E8912A" : "#2D5016";
            e.target.style.transform = "translateY(-3px)";
            e.target.style.boxShadow = "0 8px 24px rgba(45,80,22,0.25)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = dark
              ? "rgba(255,255,255,0.2)"
              : "#D4A574";
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "0 4px 12px rgba(212,165,116,0.15)";
          }}
        />
        <button
          type="submit"
          data-testid={`${testId}-submit-button`}
          disabled={status === "loading"}
          style={{
            padding: isLg ? "1.25rem 2.5rem" : "1rem 1.75rem",
            fontSize: isLg ? "1.05rem" : "0.95rem",
            fontWeight: 700,
            background: "linear-gradient(135deg, #D4A574 0%, #2D5016 100%)",
            color: "white",
            border: "none",
            borderRadius: "16px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            whiteSpace: "nowrap",
            boxShadow: "0 6px 20px rgba(212,165,116,0.4)",
            transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
            opacity: status === "loading" ? 0.7 : 1,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-4px) scale(1.02)";
            e.currentTarget.style.boxShadow = "0 12px 32px rgba(45,80,22,0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0) scale(1)";
            e.currentTarget.style.boxShadow =
              "0 6px 20px rgba(212,165,116,0.4)";
          }}
        >
          {status === "loading" ? (
            "Joining…"
          ) : (
            <>
              {buttonText} <ArrowRight size={isLg ? 20 : 16} />
            </>
          )}
        </button>
      </div>
      {status === "error" && (
        <p style={{ fontSize: "0.85rem", color: "#ef4444" }}>
          Something went wrong — please try again.
        </p>
      )}
    </form>
  );
}

// ── Main page ────────────────────────────────────────────────
export default function Page() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [visible, setVisible] = useState({});
  const [heroImageIndex, setHeroImageIndex] = useState(0);

  useEffect(() => {
    if (!hero.images || hero.images.length < 2) return;
    const id = setInterval(() => {
      setHeroImageIndex((i) => (i + 1) % hero.images.length);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    const onMouse = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMouse, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting)
            setVisible((v) => ({ ...v, [e.target.id]: true }));
        }),
      { threshold: 0.1 }
    );
    document
      .querySelectorAll("[data-animate]")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div
      style={{
        fontFamily: "var(--font-outfit), sans-serif",
        background: "#FFF9F0",
        minHeight: "100vh",
        color: "#2A2420",
        position: "relative",
      }}
    >
      {/* ── Ambient mouse glow ── */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          background: `
          radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(212,165,116,0.15) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(45,80,22,0.08) 0%, transparent 50%),
          radial-gradient(circle at 20% 80%, rgba(93,58,58,0.08) 0%, transparent 50%)
        `,
        }}
      />

      {/* ── NAV ── */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          borderBottom: "1px solid rgba(42,36,32,0.08)",
          background: "rgba(255,249,240,0.92)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        <div
          className="nav-inner"
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "1.1rem 2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          <span
            className="nav-brand"
            style={{
              fontFamily: "var(--font-lora), serif",
              fontSize: "1.15rem",
              fontWeight: 700,
              color: "#2A2420",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              minWidth: 0,
            }}
          >
            <span>{brand.logoEmoji}</span>
            <span
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {brand.name}
            </span>
          </span>
          <a
            href="#waitlist"
            className="nav-cta"
            style={{
              padding: "0.65rem 1.5rem",
              fontSize: "0.875rem",
              fontWeight: 700,
              background: "linear-gradient(135deg, #D4A574 0%, #2D5016 100%)",
              color: "white",
              borderRadius: "12px",
              textDecoration: "none",
              boxShadow: "0 4px 14px rgba(212,165,116,0.35)",
              flexShrink: 0,
            }}
          >
            Join Waitlist
          </a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section
        className="hero-grid"
        style={{
          minHeight: "100vh",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          position: "relative",
          overflow: "hidden",
          zIndex: 1,
        }}
      >
        {/* Left */}
        <div
          className="hero-left"
          style={{
            padding: "8rem 6rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            position: "relative",
            background: "#FFF9F0",
          }}
        >
          {/* Floating particles */}
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                width: `${20 + i * 8}px`,
                height: `${20 + i * 8}px`,
                background: `radial-gradient(circle, ${i % 2 === 0 ? "#D4A574" : "#2D5016"} 0%, transparent 70%)`,
                borderRadius: "50%",
                opacity: 0.2,
                top: `${15 + i * 12}%`,
                left: `${10 + i * 15}%`,
                animation: `float ${3 + i}s ease-in-out infinite`,
                animationDelay: `${i * 0.5}s`,
                pointerEvents: "none",
              }}
            />
          ))}

          {/* Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "linear-gradient(135deg, #D4A574 0%, #2D5016 100%)",
              padding: "0.75rem 1.25rem",
              borderRadius: "999px",
              marginBottom: "2rem",
              alignSelf: "flex-start",
              fontSize: "0.875rem",
              fontWeight: 600,
              color: "white",
              boxShadow: "0 4px 20px rgba(212,165,116,0.3)",
              animation: "pulse-glow 2s ease-in-out infinite",
            }}
          >
            <Sparkles size={16} />
            {hero.badge}
          </div>

          {/* H1 */}
          <h1
            style={{
              fontFamily: "var(--font-lora), serif",
              fontSize: "clamp(2.5rem, 5vw, 5rem)",
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.04em",
              color: "#2A2420",
              marginBottom: "1.5rem",
              animation: "slide-in-left 0.8s ease-out",
            }}
          >
            {hero.headlineLine1}
            <br />
            <span
              style={{
                background:
                  "linear-gradient(135deg, #D4A574 0%, #2D5016 50%, #5D3A3A 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                backgroundSize: "200% 200%",
                animation: "gradient-shift 4s ease infinite",
              }}
            >
              {hero.headlineLine2}
            </span>
          </h1>

          {/* Description */}
          <p
            style={{
              fontSize: "1.2rem",
              lineHeight: 1.8,
              color: "#5A5450",
              maxWidth: 500,
              marginBottom: "3rem",
              animation: "fade-in 1s ease-out 0.3s both",
            }}
          >
            {hero.description}{" "}
            <strong style={{ color: "#5D3A3A" }}>
              {hero.descriptionEmphasis}
            </strong>
          </p>

          {/* Waitlist form */}
          <div
            id="waitlist"
            style={{ animation: "fade-in 1s ease-out 0.6s both" }}
          >
            <WaitlistForm
              placeholder={hero.ctaPlaceholder}
              buttonText={hero.ctaButton}
              successMessage={hero.successMessage}
              testId="hero-waitlist"
            />
            <p
              style={{
                marginTop: "1rem",
                fontSize: "0.9rem",
                color: "#5A5450",
                fontWeight: 500,
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <Star size={14} style={{ color: "#D4A574", fill: "#D4A574" }} />
              {hero.ctaSubline}
            </p>
          </div>

          {/* Social proof avatars */}
          <div
            style={{
              marginTop: "4rem",
              display: "flex",
              gap: "2rem",
              alignItems: "center",
              animation: "fade-in 1s ease-out 0.9s both",
            }}
          >
            <div style={{ display: "flex" }}>
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: "50%",
                    background:
                      "linear-gradient(135deg, #D4A574 0%, #2D5016 100%)",
                    border: "4px solid #FFFBF5",
                    marginLeft: i > 1 ? "-16px" : 0,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    animation: `bounce-in 0.6s ease-out ${i * 0.1}s both`,
                  }}
                />
              ))}
            </div>
            <p
              style={{ fontSize: "0.95rem", color: "#5D3A3A", fontWeight: 600 }}
            >
              Join <strong>{hero.socialProofCount}</strong>{" "}
              {hero.socialProofLabel}
            </p>
          </div>
        </div>

        {/* Right: amber visual panel */}
        <div
          style={{
            position: "relative",
            background: "#FFF9F0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `
              radial-gradient(circle at 25% 35%, rgba(255,200,100,0.25) 0%, transparent 55%),
              radial-gradient(circle at 75% 65%, rgba(180,80,20,0.3) 0%, transparent 55%)
            `,
              animation: "mesh-move 8s ease-in-out infinite",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "10%",
              right: "15%",
              width: 120,
              height: 120,
              borderRadius: "50%",
              border: "3px solid rgba(255,210,120,0.35)",
              animation: "float-rotate 6s ease-in-out infinite",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "15%",
              left: "10%",
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: "rgba(255,200,100,0.2)",
              animation: "float-rotate 8s ease-in-out infinite reverse",
            }}
          />

          {/* Glass card */}
          <div
            style={{
              width: "75%",
              aspectRatio: "3/4",
              background:
                hero.images && hero.images.length > 0
                  ? undefined
                  : "rgba(255,255,255,0.15)",
              backdropFilter:
                hero.images && hero.images.length > 0
                  ? undefined
                  : "blur(20px)",
              WebkitBackdropFilter:
                hero.images && hero.images.length > 0
                  ? undefined
                  : "blur(20px)",
              borderRadius: 32,
              border: "3px solid rgba(255,255,255,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: "1.5rem",
              padding: "3rem",
              position: "relative",
              overflow: "hidden",
              transform: `translateY(${scrollY * 0.15}px)`,
              transition: "transform 0.1s ease-out",
              boxShadow: "0 32px 80px rgba(0,0,0,0.3)",
              animation: "fade-in 1.2s ease-out",
            }}
          >
            {hero.images && hero.images.length > 0 ? (
              hero.images.map((src, i) => (
                <Image
                  key={src}
                  src={src}
                  alt={hero.visualCaption.replace(/\n/g, " ")}
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  style={{
                    objectFit: "cover",
                    opacity: i === heroImageIndex ? 1 : 0,
                    transition: "opacity 1.5s ease-in-out",
                  }}
                  data-testid={`hero-visual-image-${i}`}
                  priority={i === 0}
                />
              ))
            ) : (
              <ChefHat
                size={72}
                style={{
                  color: "rgba(255,255,255,0.5)",
                  animation: "float 3s ease-in-out infinite",
                }}
              />
            )}
            <p
              style={{
                color: "rgba(255,255,255,0.9)",
                textAlign: "center",
                fontSize: "0.95rem",
                fontStyle: "italic",
                lineHeight: 1.6,
                position:
                  hero.images && hero.images.length > 0 ? "absolute" : "static",
                bottom:
                  hero.images && hero.images.length > 0 ? "2rem" : undefined,
                left: hero.images && hero.images.length > 0 ? "50%" : undefined,
                transform:
                  hero.images && hero.images.length > 0
                    ? "translateX(-50%)"
                    : undefined,
                textShadow:
                  hero.images && hero.images.length > 0
                    ? "0 2px 12px rgba(0,0,0,0.6)"
                    : undefined,
                zIndex: 1,
              }}
            >
              {hero.visualCaption.split("\n").map((line, i) => (
                <span key={i}>
                  {line}
                  {i < 2 && <br />}
                </span>
              ))}
            </p>
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section
        className="section-pad"
        style={{
          padding: "8rem 6rem",
          background: "#FFF5E6",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div
            id="experience-header"
            data-animate
            style={{
              marginBottom: "5rem",
              textAlign: "center",
              opacity: visible["experience-header"] ? 1 : 0,
              transform: visible["experience-header"]
                ? "translateY(0)"
                : "translateY(30px)",
              transition: "all 0.8s ease",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-lora), serif",
                fontSize: "clamp(2.5rem, 4vw, 4rem)",
                fontWeight: 700,
                lineHeight: 1.2,
                marginBottom: "1rem",
                background: "linear-gradient(135deg, #5D3A3A 0%, #2D5016 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {experience.sectionLabel}
            </h2>
            <p
              style={{
                fontSize: "1.25rem",
                color: "#5A5450",
                maxWidth: 600,
                lineHeight: 1.7,
                margin: "0 auto",
              }}
            >
              {experience.subline}
            </p>
          </div>

          <div
            className="experience-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2,1fr)",
              gap: "2.5rem",
            }}
          >
            {experience.steps.map((step, idx) => {
              const Icon = ICONS[step.icon];
              const animId = `step-${idx + 1}`;
              return (
                <div
                  key={animId}
                  id={animId}
                  data-animate
                  className="experience-card"
                  style={{
                    background: step.gradient,
                    padding: "3rem",
                    borderRadius: 32,
                    position: "relative",
                    overflow: "hidden",
                    border: "4px solid #FFFBF5",
                    boxShadow: `0 20px 60px ${step.glowColor}`,
                    opacity: visible[animId] ? 1 : 0,
                    transform: visible[animId]
                      ? "translateY(0) rotate(0deg)"
                      : `translateY(50px) rotate(${idx === 0 ? -2 : 2}deg)`,
                    transition: `all 0.8s cubic-bezier(0.4,0,0.2,1) ${idx * 0.2}s`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = `translateY(-8px) rotate(${idx === 0 ? 1 : -1}deg)`;
                    e.currentTarget.style.boxShadow = `0 32px 80px ${step.glowColor.replace("0.3", "0.45")}`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform =
                      "translateY(0) rotate(0deg)";
                    e.currentTarget.style.boxShadow = `0 20px 60px ${step.glowColor}`;
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      ...(idx === 0
                        ? { top: -50, right: -50 }
                        : { bottom: -50, left: -50 }),
                      width: 200,
                      height: 200,
                      background:
                        idx === 0
                          ? "rgba(255,255,255,0.15)"
                          : "rgba(212,165,116,0.2)",
                      borderRadius: "50%",
                      animation: `float ${4 + idx}s ease-in-out infinite`,
                    }}
                  />

                  {Icon && (
                    <Icon
                      size={48}
                      style={{
                        color: "white",
                        marginBottom: "1.5rem",
                        filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.2))",
                      }}
                    />
                  )}

                  <h3
                    style={{
                      fontFamily: "var(--font-lora), serif",
                      fontSize: "2.25rem",
                      fontWeight: 700,
                      marginBottom: "1rem",
                      color: "white",
                      textShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "1.05rem",
                      lineHeight: 1.7,
                      color: "rgba(255,255,255,0.95)",
                      marginBottom: "1.5rem",
                    }}
                  >
                    {step.description}
                  </p>

                  {step.items && (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.75rem",
                      }}
                    >
                      {step.items.map((item, j) => (
                        <div
                          key={j}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.75rem",
                            fontSize: "0.95rem",
                            color: "white",
                            fontWeight: 500,
                          }}
                        >
                          <div
                            style={{
                              width: 8,
                              height: 8,
                              borderRadius: "50%",
                              background: "white",
                              boxShadow: "0 0 8px rgba(255,255,255,0.5)",
                              flexShrink: 0,
                            }}
                          />
                          {item}
                        </div>
                      ))}
                    </div>
                  )}

                  {step.quote && (
                    <p
                      style={{
                        fontSize: "1rem",
                        fontStyle: "italic",
                        color: "rgba(255,255,255,0.9)",
                        padding: "1.25rem",
                        background: "rgba(255,255,255,0.15)",
                        borderRadius: 16,
                        backdropFilter: "blur(10px)",
                        borderLeft: "4px solid #D4A574",
                      }}
                    >
                      &ldquo;{step.quote}&rdquo;
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── HOST / HARSHIKA ── */}
      <section
        className="section-pad"
        style={{
          padding: "8rem 6rem",
          background:
            "linear-gradient(135deg, #FFF3DC 0%, #FFE5A0 50%, #FFD878 100%)",
          position: "relative",
          overflow: "hidden",
          zIndex: 1,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "5%",
            width: 300,
            height: 300,
            background: "radial-gradient(circle, #E8912A 0%, transparent 70%)",
            opacity: 0.12,
            borderRadius: "50%",
            animation: "float-rotate 12s ease-in-out infinite",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            right: "10%",
            width: 400,
            height: 400,
            background: "radial-gradient(circle, #F5C842 0%, transparent 70%)",
            opacity: 0.18,
            borderRadius: "50%",
            animation: "float-rotate 15s ease-in-out infinite reverse",
            pointerEvents: "none",
          }}
        />

        <div
          id="harshika"
          data-animate
          className="harshika-grid"
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "2fr 3fr",
            gap: "6rem",
            alignItems: "center",
            opacity: visible["harshika"] ? 1 : 0,
            transform: visible["harshika"] ? "scale(1)" : "scale(0.95)",
            transition: "all 1s cubic-bezier(0.4,0,0.2,1)",
          }}
        >
          {/* Portrait */}
          <div
            style={{
              aspectRatio: "3/4",
              background: host.image
                ? undefined
                : "linear-gradient(160deg, #E8912A 0%, #D4721A 40%, #C4621A 100%)",
              borderRadius: 32,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "5px solid rgba(255,200,120,0.6)",
              boxShadow: "0 32px 100px rgba(180,80,20,0.25)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {host.image ? (
              <Image
                src={host.image}
                alt={host.name}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                style={{ objectFit: "cover" }}
                data-testid="host-portrait-image"
              />
            ) : (
              <>
                <div
                  style={{
                    position: "absolute",
                    top: "-30%",
                    right: "-30%",
                    width: 200,
                    height: 200,
                    background: "rgba(255,230,150,0.35)",
                    borderRadius: "50%",
                    animation: "float 6s ease-in-out infinite",
                  }}
                />
                <ChefHat
                  size={80}
                  style={{
                    color: "rgba(255,255,255,0.5)",
                    filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.1))",
                  }}
                />
                <p
                  style={{
                    position: "absolute",
                    bottom: "2.5rem",
                    left: "50%",
                    transform: "translateX(-50%)",
                    color: "rgba(255,255,255,0.85)",
                    fontSize: "0.9rem",
                    fontStyle: "italic",
                    textAlign: "center",
                    fontWeight: 500,
                    whiteSpace: "nowrap",
                  }}
                >
                  {host.portraitPlaceholder.split("\n").map((l, i) => (
                    <span key={i}>
                      {l}
                      {i === 0 && <br />}
                    </span>
                  ))}
                </p>
              </>
            )}
          </div>

          {/* Bio */}
          <div style={{ color: "#2A2420" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "rgba(180,80,20,0.12)",
                padding: "0.75rem 1.5rem",
                borderRadius: "999px",
                marginBottom: "2rem",
                fontSize: "0.875rem",
                fontWeight: 700,
                border: "2px solid rgba(180,80,20,0.2)",
                color: "#8B4A10",
              }}
            >
              <Users size={16} />
              {host.badge}
            </div>
            <h2
              style={{
                fontFamily: "var(--font-lora), serif",
                fontSize: "clamp(2.5rem, 4vw, 3.5rem)",
                fontWeight: 700,
                lineHeight: 1.15,
                marginBottom: "1.5rem",
                color: "#2A2420",
              }}
            >
              {host.name}
            </h2>
            {host.bio.map((para, i) => (
              <p
                key={i}
                style={{
                  fontSize: "1.15rem",
                  lineHeight: 1.8,
                  color: "#5A5450",
                  marginBottom: "1.5rem",
                }}
              >
                {para}
              </p>
            ))}
            <div
              style={{
                padding: "2rem",
                background: "rgba(180,80,20,0.08)",
                borderRadius: 20,
                borderLeft: "5px solid #E8912A",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-lora), serif",
                  fontSize: "1.1rem",
                  fontStyle: "italic",
                  lineHeight: 1.7,
                  color: "#6B3A10",
                }}
              >
                &ldquo;{host.quote}&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── MENU / WHAT WE MAKE ── */}
      <section
        className="section-pad"
        style={{
          padding: "8rem 6rem",
          background: "#FFFBF5",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div
            id="what-we-make-header"
            data-animate
            style={{
              textAlign: "center",
              marginBottom: "5rem",
              opacity: visible["what-we-make-header"] ? 1 : 0,
              transform: visible["what-we-make-header"]
                ? "translateY(0)"
                : "translateY(30px)",
              transition: "all 0.8s ease",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-lora), serif",
                fontSize: "clamp(2.5rem, 4vw, 4rem)",
                fontWeight: 700,
                lineHeight: 1.2,
                marginBottom: "1rem",
                background: "linear-gradient(135deg, #C4621A 0%, #2D5016 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {menu.sectionLabel}
            </h2>
            <p
              style={{
                fontSize: "1.2rem",
                color: "#5A5450",
                maxWidth: 560,
                margin: "0 auto",
                lineHeight: 1.7,
              }}
            >
              {menu.subline}
            </p>
          </div>

          <div
            className="dish-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2,1fr)",
              gap: "2rem",
            }}
          >
            {menu.dishes.map((dish, idx) => {
              const animId = `dish-${idx + 1}`;
              return (
                <div
                  key={animId}
                  id={animId}
                  data-animate
                  style={{
                    background: dish.bg,
                    borderRadius: 28,
                    overflow: "hidden",
                    border: `3px solid ${dish.accent}22`,
                    boxShadow: `0 12px 40px ${dish.accent}18`,
                    opacity: visible[animId] ? 1 : 0,
                    transform: visible[animId]
                      ? "translateY(0)"
                      : "translateY(40px)",
                    transition: `all 0.7s cubic-bezier(0.4,0,0.2,1) ${idx * 0.1}s`,
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-8px)";
                    e.currentTarget.style.boxShadow = `0 28px 64px ${dish.accent}30`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = `0 12px 40px ${dish.accent}18`;
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: 220,
                      background: dish.image
                        ? undefined
                        : `linear-gradient(135deg, ${dish.accent}40 0%, ${dish.accent}20 100%)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "5rem",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    {dish.image ? (
                      <Image
                        src={dish.image}
                        alt={dish.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        style={{ objectFit: "cover" }}
                        data-testid={`dish-image-${idx}`}
                      />
                    ) : (
                      <>
                        <div
                          style={{
                            position: "absolute",
                            bottom: -20,
                            right: -20,
                            width: 100,
                            height: 100,
                            background: `${dish.accent}18`,
                            borderRadius: "50%",
                          }}
                        />
                        {dish.emoji}
                        <div
                          style={{
                            position: "absolute",
                            top: "1rem",
                            right: "1rem",
                            background: "rgba(255,255,255,0.7)",
                            backdropFilter: "blur(8px)",
                            padding: "0.4rem 0.9rem",
                            borderRadius: "999px",
                            fontSize: "0.75rem",
                            fontWeight: 600,
                            color: dish.accent,
                            border: `1px solid ${dish.accent}30`,
                          }}
                        >
                          Add image ↑
                        </div>
                      </>
                    )}
                  </div>
                  <div style={{ padding: "2rem 2.25rem 2.5rem" }}>
                    <div
                      style={{
                        width: 36,
                        height: 4,
                        background: dish.accent,
                        borderRadius: "999px",
                        marginBottom: "1rem",
                      }}
                    />
                    <h3
                      style={{
                        fontFamily: "var(--font-lora), serif",
                        fontSize: "1.6rem",
                        fontWeight: 700,
                        marginBottom: "0.75rem",
                        color: "#2A2420",
                      }}
                    >
                      {dish.title}
                    </h3>
                    <p
                      style={{
                        fontSize: "1rem",
                        lineHeight: 1.7,
                        color: "#5A5450",
                      }}
                    >
                      {dish.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section
        className="section-pad"
        style={{
          padding: "8rem 6rem",
          background: "#FFF5E6",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div
            id="faq-header"
            data-animate
            style={{
              textAlign: "center",
              marginBottom: "4rem",
              opacity: visible["faq-header"] ? 1 : 0,
              transform: visible["faq-header"]
                ? "translateY(0)"
                : "translateY(30px)",
              transition: "all 0.8s ease",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-lora), serif",
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                fontWeight: 700,
                color: "#2A2420",
                marginBottom: "1rem",
              }}
            >
              {faq.headline}
            </h2>
            <p
              style={{ fontSize: "1.1rem", color: "#5A5450", lineHeight: 1.7 }}
            >
              {faq.subline}
            </p>
          </div>
          {faq.items.map((item, i) => (
            <FaqItem key={i} q={item.q} a={item.a} />
          ))}
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section
        className="section-pad"
        style={{
          padding: "7rem 6rem",
          background: "linear-gradient(135deg, #1A0F0A 0%, #2D5016 100%)",
          position: "relative",
          zIndex: 1,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -80,
            left: "10%",
            width: 350,
            height: 350,
            background: "radial-gradient(circle, #E8912A 0%, transparent 70%)",
            opacity: 0.1,
            borderRadius: "50%",
            animation: "float-rotate 14s ease-in-out infinite",
            pointerEvents: "none",
          }}
        />

        <div
          id="contact"
          data-animate
          className="contact-grid"
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1.2fr 1fr",
            gap: "5rem",
            alignItems: "start",
            opacity: visible["contact"] ? 1 : 0,
            transform: visible["contact"]
              ? "translateY(0)"
              : "translateY(40px)",
            transition: "all 0.9s ease",
          }}
        >
          {/* Left */}
          <div style={{ color: "white" }}>
            <h2
              style={{
                fontFamily: "var(--font-lora), serif",
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                fontWeight: 700,
                lineHeight: 1.2,
                marginBottom: "1.25rem",
              }}
            >
              {contact.headline}
            </h2>
            <p
              style={{
                fontSize: "1.15rem",
                lineHeight: 1.8,
                opacity: 0.85,
                marginBottom: "3rem",
                maxWidth: 480,
              }}
            >
              {contact.subline}
            </p>
            {contact.details.map((item) => (
              <div
                key={item.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1.25rem",
                  marginBottom: "1.75rem",
                }}
              >
                <div
                  style={{
                    width: 52,
                    height: 52,
                    background: "rgba(232,145,42,0.2)",
                    border: "2px solid rgba(232,145,42,0.4)",
                    borderRadius: 16,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.4rem",
                    flexShrink: 0,
                  }}
                >
                  {item.icon}
                </div>
                <div>
                  <p
                    style={{
                      fontSize: "0.8rem",
                      opacity: 0.55,
                      fontWeight: 600,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      marginBottom: "0.2rem",
                    }}
                  >
                    {item.label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      style={{
                        fontSize: "1.05rem",
                        color: "#FFD878",
                        fontWeight: 600,
                        textDecoration: "none",
                      }}
                      onMouseEnter={(e) => (e.target.style.opacity = "0.75")}
                      onMouseLeave={(e) => (e.target.style.opacity = "1")}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p
                      style={{
                        fontSize: "1.05rem",
                        color: "rgba(255,255,255,0.9)",
                        fontWeight: 500,
                      }}
                    >
                      {item.value}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Right: contact form */}
          <div
            style={{
              background: "rgba(255,255,255,0.07)",
              backdropFilter: "blur(16px)",
              border: "2px solid rgba(255,255,255,0.12)",
              borderRadius: 28,
              padding: "2.5rem",
            }}
          >
            <h3
              style={{
                fontFamily: "var(--font-lora), serif",
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "white",
                marginBottom: "2rem",
              }}
            >
              Send a message
            </h3>
            {[
              {
                placeholder: "Your name",
                type: "text",
                testId: "contact-name-input",
              },
              {
                placeholder: "your@email.com",
                type: "email",
                testId: "contact-email-input",
              },
            ].map((field) => (
              <input
                key={field.placeholder}
                type={field.type}
                data-testid={field.testId}
                placeholder={field.placeholder}
                style={{
                  width: "100%",
                  padding: "1rem 1.25rem",
                  fontSize: "1rem",
                  border: "2px solid rgba(255,255,255,0.15)",
                  borderRadius: 14,
                  background: "rgba(255,255,255,0.08)",
                  color: "white",
                  outline: "none",
                  marginBottom: "1rem",
                  display: "block",
                  fontFamily: "var(--font-outfit), sans-serif",
                  transition: "all 0.3s ease",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#E8912A";
                  e.target.style.background = "rgba(255,255,255,0.12)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(255,255,255,0.15)";
                  e.target.style.background = "rgba(255,255,255,0.08)";
                }}
              />
            ))}
            <textarea
              placeholder="What's on your mind?"
              data-testid="contact-message-textarea"
              rows={4}
              style={{
                width: "100%",
                padding: "1rem 1.25rem",
                fontSize: "1rem",
                border: "2px solid rgba(255,255,255,0.15)",
                borderRadius: 14,
                background: "rgba(255,255,255,0.08)",
                color: "white",
                outline: "none",
                marginBottom: "1.5rem",
                resize: "vertical",
                display: "block",
                fontFamily: "var(--font-outfit), sans-serif",
                transition: "all 0.3s ease",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#E8912A";
                e.target.style.background = "rgba(255,255,255,0.12)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "rgba(255,255,255,0.15)";
                e.target.style.background = "rgba(255,255,255,0.08)";
              }}
            />
            <button
              style={{
                width: "100%",
                padding: "1.1rem",
                fontSize: "1.05rem",
                fontWeight: 700,
                background: "linear-gradient(135deg, #E8912A 0%, #C4621A 100%)",
                color: "white",
                border: "none",
                borderRadius: 14,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                boxShadow: "0 8px 24px rgba(232,145,42,0.35)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow =
                  "0 16px 40px rgba(232,145,42,0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 8px 24px rgba(232,145,42,0.35)";
              }}
            >
              Send Message <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section
        className="final-cta-pad"
        style={{
          padding: "10rem 6rem",
          background:
            "radial-gradient(circle at 50% 50%, #D4A574 0%, #8B2E1A 100%)",
          color: "white",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
          zIndex: 1,
        }}
      >
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              borderRadius: "50%",
              width: `${40 + i * 15}px`,
              height: `${40 + i * 15}px`,
              background: "rgba(255,255,255,0.1)",
              top: `${10 + ((i * 11) % 80)}%`,
              left: `${5 + ((i * 13) % 90)}%`,
              animation: `float ${4 + i}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`,
              pointerEvents: "none",
            }}
          />
        ))}

        <div
          id="final-cta"
          data-animate
          style={{
            maxWidth: 800,
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
            opacity: visible["final-cta"] ? 1 : 0,
            transform: visible["final-cta"] ? "scale(1)" : "scale(0.9)",
            transition: "all 1s cubic-bezier(0.4,0,0.2,1)",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-lora), serif",
              fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
              fontWeight: 700,
              lineHeight: 1.15,
              marginBottom: "2rem",
              textShadow: "0 4px 20px rgba(0,0,0,0.2)",
            }}
          >
            {finalCta.headline}
          </h2>
          <p
            style={{
              fontSize: "1.3rem",
              lineHeight: 1.7,
              marginBottom: "3.5rem",
              opacity: 0.95,
            }}
          >
            {finalCta.subline} <strong>{finalCta.sublineEmphasis}</strong>
          </p>
          <WaitlistForm
            placeholder={finalCta.ctaPlaceholder}
            buttonText={finalCta.ctaButton}
            successMessage={finalCta.successMessage}
            dark
            size="lg"
            testId="final-cta-waitlist"
          />
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        className="footer-pad"
        style={{
          borderTop: "1px solid rgba(42,36,32,0.08)",
          padding: "1.75rem 6rem",
          background: "#FFFBF5",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "0.75rem",
            fontSize: "0.8rem",
            color: "#5A5450",
          }}
        >
          <span>
            © {getCurrentYear()} {footer.legal} · Designed and Developed by{" "}
            <a
              href="https://boomatech.io"
              target="_blank"
              rel="noopener"
              style={{ color: "#5A5450" }}
            >
              Booma Tech
            </a>
          </span>
          {footer.links.length > 0 && (
            <div style={{ display: "flex", gap: "1.5rem" }}>
              {footer.links.map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  style={{ color: "#5A5450", textDecoration: "none" }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </footer>
    </div>
  );
}

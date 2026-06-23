import { useState } from "react";

// ─── TOKENS ────────────────────────────────────────────────────────────────
const COLORS = {
  primary: {
    label: "Primary",
    tokens: [
      { name: "Amber Gold",    hex: "#E8912A", token: "amber-gold",    use: "CTAs, buttons, hero accents" },
      { name: "Burnt Orange",  hex: "#D4721A", token: "burnt-orange",  use: "Gradient mid-stop, hover states" },
      { name: "Deep Ember",    hex: "#C4621A", token: "deep-ember",    use: "Gradient end, active states" },
    ],
  },
  secondary: {
    label: "Secondary",
    tokens: [
      { name: "Curry Green",   hex: "#2D5016", token: "curry-green",   use: "Section backgrounds, accents" },
      { name: "Clove Brown",   hex: "#5D3A3A", token: "clove-brown",   use: "Dark headers, footer" },
      { name: "Spice Bark",    hex: "#8B4A10", token: "spice-bark",    use: "Subtext on light amber" },
    ],
  },
  neutral: {
    label: "Neutrals",
    tokens: [
      { name: "Text Dark",     hex: "#2A2420", token: "text-dark",     use: "Primary body text" },
      { name: "Text Mid",      hex: "#5A5450", token: "text-mid",      use: "Secondary / captions" },
      { name: "Warm Cream",    hex: "#FFFBF5", token: "warm-cream",    use: "Card backgrounds" },
      { name: "Parchment",     hex: "#FFF9F0", token: "parchment",     use: "Page background" },
      { name: "Linen",         hex: "#FFF5E6", token: "linen",         use: "Alternate sections" },
    ],
  },
  gradients: {
    label: "Gradients",
    tokens: [
      { name: "Amber Flame",   from: "#E8912A", to: "#C4621A",   token: "gradient-amber",  use: "Hero panel, Harshika card, CTA buttons" },
      { name: "Spice Field",   from: "#D4A574", to: "#2D5016",   token: "gradient-spice",  use: "Hero title text, badge backgrounds" },
      { name: "Sunset Yellow", from: "#FFF3DC", to: "#FFD878",   token: "gradient-yellow", use: "Meet Harshika section background" },
      { name: "Deep Feast",    from: "#1A0F0A", to: "#2D5016",   token: "gradient-dark",   use: "Contact section background" },
    ],
  },
};

const TYPOGRAPHY = [
  { role: "Display",    family: "Lora",   weight: "700", size: "4.5rem",  lh: "1.05", tracking: "-0.04em", usage: "Hero H1" },
  { role: "Heading 1",  family: "Lora",   weight: "700", size: "3.5rem",  lh: "1.15", tracking: "-0.03em", usage: "Section titles" },
  { role: "Heading 2",  family: "Lora",   weight: "700", size: "2.25rem", lh: "1.2",  tracking: "-0.02em", usage: "Card titles" },
  { role: "Heading 3",  family: "Lora",   weight: "600", size: "1.5rem",  lh: "1.3",  tracking: "0",       usage: "Sub-section labels" },
  { role: "Body Large", family: "Outfit", weight: "400", size: "1.2rem",  lh: "1.8",  tracking: "0",       usage: "Intro paragraphs" },
  { role: "Body",       family: "Outfit", weight: "400", size: "1.05rem", lh: "1.75", tracking: "0",       usage: "Standard copy" },
  { role: "Caption",    family: "Outfit", weight: "500", size: "0.875rem",lh: "1.5",  tracking: "0.04em",  usage: "Labels, badges, meta" },
  { role: "Micro",      family: "Outfit", weight: "600", size: "0.75rem", lh: "1.4",  tracking: "0.08em",  usage: "Eyebrow text, uppercase tags" },
];

const SPACING = [2,4,8,12,16,20,24,32,40,48,64,80,96,128];

const COMPONENTS = [
  "Buttons", "Badges", "Cards", "Inputs", "Tiles",
];

// ─── HELPERS ────────────────────────────────────────────────────────────────
function hexToRgb(hex) {
  const r = parseInt(hex.slice(1,3),16);
  const g = parseInt(hex.slice(3,5),16);
  const b = parseInt(hex.slice(5,7),16);
  return `${r}, ${g}, ${b}`;
}

function luminance(hex) {
  const r = parseInt(hex.slice(1,3),16)/255;
  const g = parseInt(hex.slice(3,5),16)/255;
  const b = parseInt(hex.slice(5,7),16)/255;
  return 0.299*r + 0.587*g + 0.114*b;
}

function CopyBadge({ text }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <button onClick={copy} style={{
      fontFamily: "'Outfit', monospace",
      fontSize: "0.75rem",
      padding: "0.25rem 0.6rem",
      borderRadius: "6px",
      border: "1px solid rgba(0,0,0,0.12)",
      background: copied ? "#2D5016" : "rgba(0,0,0,0.06)",
      color: copied ? "white" : "#2A2420",
      cursor: "pointer",
      transition: "all 0.2s",
      whiteSpace: "nowrap",
    }}>
      {copied ? "✓ copied" : text}
    </button>
  );
}

function SectionTitle({ children }) {
  return (
    <div style={{ marginBottom: "2.5rem" }}>
      <div style={{
        display: "inline-block",
        width: "40px", height: "4px",
        background: "linear-gradient(90deg, #E8912A, #2D5016)",
        borderRadius: "999px",
        marginBottom: "0.75rem",
      }} />
      <h2 style={{
        fontFamily: "'Lora', serif",
        fontSize: "2rem", fontWeight: 700,
        color: "#2A2420", margin: 0, lineHeight: 1.2,
      }}>
        {children}
      </h2>
    </div>
  );
}

// ─── SECTIONS ────────────────────────────────────────────────────────────────
function ColorsSection() {
  return (
    <section>
      <SectionTitle>Color Palette</SectionTitle>
      {Object.values(COLORS).map((group) => (
        <div key={group.label} style={{ marginBottom: "3rem" }}>
          <p style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: "0.75rem", fontWeight: 700,
            letterSpacing: "0.1em", textTransform: "uppercase",
            color: "#5A5450", marginBottom: "1rem",
          }}>{group.label}</p>

          {group.label === "Gradients" ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px,1fr))", gap: "1rem" }}>
              {group.tokens.map((t) => (
                <div key={t.name} style={{
                  borderRadius: "16px", overflow: "hidden",
                  border: "1px solid rgba(0,0,0,0.08)",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
                }}>
                  <div style={{
                    height: "100px",
                    background: `linear-gradient(135deg, ${t.from} 0%, ${t.to} 100%)`,
                  }} />
                  <div style={{ padding: "1rem", background: "#FFFBF5" }}>
                    <p style={{ fontFamily:"'Lora',serif", fontWeight:700, fontSize:"0.95rem", color:"#2A2420", margin:"0 0 0.25rem" }}>{t.name}</p>
                    <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:"0.8rem", color:"#5A5450", margin:"0 0 0.75rem", lineHeight:1.5 }}>{t.use}</p>
                    <div style={{ display:"flex", gap:"0.5rem", flexWrap:"wrap" }}>
                      <CopyBadge text={`${t.from} → ${t.to}`} />
                      <CopyBadge text={`--${t.token}`} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px,1fr))", gap: "1rem" }}>
              {group.tokens.map((t) => {
                const dark = luminance(t.hex) > 0.5;
                return (
                  <div key={t.name} style={{
                    borderRadius: "16px", overflow: "hidden",
                    border: "1px solid rgba(0,0,0,0.08)",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
                  }}>
                    <div style={{
                      height: "120px", background: t.hex,
                      display: "flex", alignItems: "flex-end",
                      padding: "0.875rem",
                    }}>
                      <span style={{
                        fontFamily: "'Outfit', monospace",
                        fontWeight: 600, fontSize: "0.875rem",
                        color: dark ? "rgba(42,36,32,0.7)" : "rgba(255,255,255,0.8)",
                      }}>{t.hex}</span>
                    </div>
                    <div style={{ padding: "1rem", background: "#FFFBF5" }}>
                      <p style={{ fontFamily:"'Lora',serif", fontWeight:700, fontSize:"0.95rem", color:"#2A2420", margin:"0 0 0.2rem" }}>{t.name}</p>
                      <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:"0.8rem", color:"#5A5450", margin:"0 0 0.75rem", lineHeight:1.4 }}>{t.use}</p>
                      <div style={{ display:"flex", gap:"0.4rem", flexWrap:"wrap" }}>
                        <CopyBadge text={t.hex} />
                        <CopyBadge text={`--${t.token}`} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </section>
  );
}

function TypographySection() {
  return (
    <section>
      <SectionTitle>Typography</SectionTitle>

      <div style={{
        background: "#FFFBF5", borderRadius: "20px",
        border: "1px solid rgba(0,0,0,0.08)",
        overflow: "hidden", marginBottom: "3rem",
      }}>
        {/* Font families */}
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr",
          borderBottom: "1px solid rgba(0,0,0,0.08)",
        }}>
          {[
            { name: "Lora", role: "Serif / Headlines", sample: "Aa Bb Cc", weights: "400 500 600 700" },
            { name: "Outfit", role: "Sans / Body", sample: "Aa Bb Cc", weights: "300 400 500 600 700 800" },
          ].map((f, i) => (
            <div key={f.name} style={{
              padding: "2.5rem",
              borderRight: i === 0 ? "1px solid rgba(0,0,0,0.08)" : "none",
            }}>
              <p style={{
                fontFamily: "'Outfit',sans-serif", fontSize:"0.75rem",
                fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase",
                color:"#5A5450", marginBottom:"1rem",
              }}>{f.role}</p>
              <p style={{
                fontFamily: `'${f.name}', serif`,
                fontSize: "3.5rem", fontWeight: 700,
                color: "#2A2420", lineHeight: 1.1, marginBottom: "0.5rem",
              }}>{f.sample}</p>
              <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:"0.875rem", color:"#5A5450", marginBottom:"0.75rem" }}>
                Weights: {f.weights}
              </p>
              <CopyBadge text={`font-family: '${f.name}', ${i===0?'serif':'sans-serif'}`} />
            </div>
          ))}
        </div>

        {/* Scale */}
        {TYPOGRAPHY.map((t, i) => (
          <div key={t.role} style={{
            display: "flex", alignItems: "center", gap: "2rem",
            padding: "1.25rem 2rem",
            borderBottom: i < TYPOGRAPHY.length-1 ? "1px solid rgba(0,0,0,0.06)" : "none",
            background: i % 2 === 0 ? "transparent" : "rgba(0,0,0,0.015)",
          }}>
            <div style={{ width: "110px", flexShrink:0 }}>
              <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:"0.75rem", fontWeight:700, color:"#5A5450", marginBottom:"0.2rem" }}>{t.role}</p>
              <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:"0.7rem", color:"#E8912A", fontWeight:500 }}>{t.family}</p>
            </div>
            <div style={{ flex:1, minWidth:0 }}>
              <p style={{
                fontFamily: `'${t.family}', ${t.family==="Lora"?"serif":"sans-serif"}`,
                fontSize: t.size, fontWeight: t.weight,
                letterSpacing: t.tracking, lineHeight: t.lh,
                color: "#2A2420", margin:0,
                whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
              }}>
                {t.role === "Micro" ? "EYEBROW TEXT / UPPERCASE TAG" : "The spice of life"}
              </p>
            </div>
            <div style={{ display:"flex", gap:"0.4rem", flexShrink:0, flexWrap:"wrap", justifyContent:"flex-end" }}>
              <CopyBadge text={t.size} />
              <CopyBadge text={`w-${t.weight}`} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function SpacingSection() {
  return (
    <section>
      <SectionTitle>Spacing Scale</SectionTitle>
      <div style={{
        background: "#FFFBF5", borderRadius: "20px",
        border: "1px solid rgba(0,0,0,0.08)",
        padding: "2rem",
      }}>
        <div style={{ display:"flex", flexDirection:"column", gap:"0.75rem" }}>
          {SPACING.map((s) => (
            <div key={s} style={{ display:"flex", alignItems:"center", gap:"1.5rem" }}>
              <span style={{
                fontFamily:"'Outfit',monospace", fontSize:"0.8rem",
                fontWeight:600, color:"#5A5450", width:"48px", textAlign:"right", flexShrink:0,
              }}>{s}px</span>
              <div style={{
                height:"20px", width:`${Math.min(s*2, 600)}px`,
                background:"linear-gradient(90deg, #E8912A, #D4721A)",
                borderRadius:"4px", flexShrink:0,
              }} />
              <CopyBadge text={`${s}px`} />
            </div>
          ))}
        </div>
        <div style={{
          marginTop:"2rem", padding:"1.5rem",
          background:"rgba(232,145,42,0.08)", borderRadius:"12px",
          borderLeft:"4px solid #E8912A",
        }}>
          <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:"0.875rem", color:"#5A5450", margin:0, lineHeight:1.7 }}>
            <strong style={{color:"#2A2420"}}>Convention:</strong> Section padding <code>8rem 6rem</code> desktop · <code>5rem 2rem</code> mobile. Card padding <code>2–3rem</code>. Gap between grid items <code>2–2.5rem</code>.
          </p>
        </div>
      </div>
    </section>
  );
}

function ComponentsSection() {
  const [inputVal, setInputVal] = useState("");
  return (
    <section>
      <SectionTitle>UI Components</SectionTitle>

      {/* Buttons */}
      <div style={{ marginBottom:"2.5rem" }}>
        <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:"0.75rem", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#5A5450", marginBottom:"1.25rem" }}>Buttons</p>
        <div style={{ display:"flex", flexWrap:"wrap", gap:"1rem", alignItems:"center" }}>
          <button style={{
            padding:"1rem 2rem", fontSize:"1rem", fontWeight:700,
            background:"linear-gradient(135deg, #E8912A 0%, #C4621A 100%)",
            color:"white", border:"none", borderRadius:"14px", cursor:"pointer",
            boxShadow:"0 6px 20px rgba(232,145,42,0.35)",
            fontFamily:"'Outfit',sans-serif",
          }}>Primary CTA</button>

          <button style={{
            padding:"1rem 2rem", fontSize:"1rem", fontWeight:700,
            background:"#2D5016", color:"white",
            border:"none", borderRadius:"14px", cursor:"pointer",
            fontFamily:"'Outfit',sans-serif",
          }}>Secondary</button>

          <button style={{
            padding:"1rem 2rem", fontSize:"1rem", fontWeight:700,
            background:"transparent", color:"#E8912A",
            border:"2px solid #E8912A", borderRadius:"14px", cursor:"pointer",
            fontFamily:"'Outfit',sans-serif",
          }}>Outline</button>

          <button style={{
            padding:"0.65rem 1.25rem", fontSize:"0.875rem", fontWeight:700,
            background:"rgba(232,145,42,0.12)", color:"#E8912A",
            border:"1px solid rgba(232,145,42,0.3)", borderRadius:"10px", cursor:"pointer",
            fontFamily:"'Outfit',sans-serif",
          }}>Ghost Small</button>
        </div>
      </div>

      {/* Badges */}
      <div style={{ marginBottom:"2.5rem" }}>
        <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:"0.75rem", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#5A5450", marginBottom:"1.25rem" }}>Badges & Tags</p>
        <div style={{ display:"flex", flexWrap:"wrap", gap:"0.75rem", alignItems:"center" }}>
          {[
            { label:"Cook • Taste • Remember", bg:"linear-gradient(135deg,#E8912A,#2D5016)", color:"white" },
            { label:"Coming to Lisbon", bg:"rgba(232,145,42,0.12)", color:"#8B4A10", border:"1px solid rgba(232,145,42,0.3)" },
            { label:"Limited Seats", bg:"rgba(45,80,22,0.1)", color:"#2D5016", border:"1px solid rgba(45,80,22,0.25)" },
            { label:"Waitlist Open", bg:"#2D5016", color:"white" },
            { label:"June 2025", bg:"#FFFBF5", color:"#5A5450", border:"1px solid rgba(0,0,0,0.12)" },
          ].map((b) => (
            <span key={b.label} style={{
              display:"inline-flex", alignItems:"center",
              padding:"0.5rem 1.1rem", borderRadius:"999px",
              fontFamily:"'Outfit',sans-serif", fontSize:"0.85rem", fontWeight:600,
              background:b.bg, color:b.color, border:b.border||"none",
            }}>{b.label}</span>
          ))}
        </div>
      </div>

      {/* Cards */}
      <div style={{ marginBottom:"2.5rem" }}>
        <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:"0.75rem", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#5A5450", marginBottom:"1.25rem" }}>Card Variants</p>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))", gap:"1.25rem" }}>

          {/* Light card */}
          <div style={{ borderRadius:"20px", overflow:"hidden", border:"2px solid rgba(232,145,42,0.2)", boxShadow:"0 8px 32px rgba(232,145,42,0.1)", background:"#FFFBF5" }}>
            <div style={{ height:"100px", background:"linear-gradient(135deg,rgba(232,145,42,0.25),rgba(212,165,116,0.15))", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"2.5rem" }}>🥥</div>
            <div style={{ padding:"1.25rem" }}>
              <div style={{ width:"28px", height:"3px", background:"#E8912A", borderRadius:"999px", marginBottom:"0.75rem" }} />
              <p style={{ fontFamily:"'Lora',serif", fontWeight:700, fontSize:"1.1rem", color:"#2A2420", marginBottom:"0.5rem" }}>Light Card</p>
              <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:"0.875rem", color:"#5A5450", lineHeight:1.6 }}>Used for dish tiles, content cards.</p>
            </div>
          </div>

          {/* Dark amber card */}
          <div style={{ borderRadius:"20px", overflow:"hidden", background:"linear-gradient(135deg,#E8912A,#C4621A)", border:"3px solid rgba(255,200,120,0.3)" }}>
            <div style={{ padding:"1.75rem" }}>
              <p style={{ fontFamily:"'Lora',serif", fontWeight:700, fontSize:"1.1rem", color:"white", marginBottom:"0.5rem" }}>Amber Card</p>
              <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:"0.875rem", color:"rgba(255,255,255,0.85)", lineHeight:1.6 }}>Experience steps, feature highlights.</p>
            </div>
          </div>

          {/* Green card */}
          <div style={{ borderRadius:"20px", overflow:"hidden", background:"linear-gradient(135deg,#2D5016,rgba(45,80,22,0.8))", border:"3px solid rgba(255,255,255,0.1)" }}>
            <div style={{ padding:"1.75rem" }}>
              <p style={{ fontFamily:"'Lora',serif", fontWeight:700, fontSize:"1.1rem", color:"white", marginBottom:"0.5rem" }}>Green Card</p>
              <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:"0.875rem", color:"rgba(255,255,255,0.85)", lineHeight:1.6 }}>Eat step, secondary features.</p>
            </div>
          </div>

          {/* Glass card */}
          <div style={{ borderRadius:"20px", background:"rgba(255,255,255,0.15)", backdropFilter:"blur(16px)", border:"2px solid rgba(255,255,255,0.25)", padding:"1.75rem", backgroundImage:"linear-gradient(135deg,#1A0F0A,#2D5016)" }}>
            <div style={{ padding:"0" }}>
              <p style={{ fontFamily:"'Lora',serif", fontWeight:700, fontSize:"1.1rem", color:"white", marginBottom:"0.5rem" }}>Glass Card</p>
              <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:"0.875rem", color:"rgba(255,255,255,0.8)", lineHeight:1.6 }}>Contact form, dark section overlays.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Inputs */}
      <div style={{ marginBottom:"2.5rem" }}>
        <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:"0.75rem", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#5A5450", marginBottom:"1.25rem" }}>Form Inputs</p>
        <div style={{ display:"flex", flexDirection:"column", gap:"1rem", maxWidth:"480px" }}>
          <div>
            <label style={{ fontFamily:"'Outfit',sans-serif", fontSize:"0.875rem", fontWeight:600, color:"#5A5450", display:"block", marginBottom:"0.5rem" }}>Email address</label>
            <input
              type="email"
              placeholder="your@email.com"
              value={inputVal}
              onChange={e=>setInputVal(e.target.value)}
              style={{
                width:"100%", padding:"1rem 1.5rem",
                fontSize:"1rem", fontFamily:"'Outfit',sans-serif",
                border:"3px solid #E8912A", borderRadius:"14px",
                background:"#FFFBF5", color:"#2A2420", outline:"none",
                boxSizing:"border-box",
              }}
            />
          </div>
          <div>
            <label style={{ fontFamily:"'Outfit',sans-serif", fontSize:"0.875rem", fontWeight:600, color:"#5A5450", display:"block", marginBottom:"0.5rem" }}>Message</label>
            <textarea rows={3} placeholder="What's on your mind?" style={{
              width:"100%", padding:"1rem 1.5rem",
              fontSize:"1rem", fontFamily:"'Outfit',sans-serif",
              border:"2px solid rgba(0,0,0,0.15)", borderRadius:"14px",
              background:"#FFFBF5", color:"#2A2420", outline:"none", resize:"vertical",
              boxSizing:"border-box",
            }} />
          </div>
        </div>
      </div>

      {/* Quote block */}
      <div style={{ marginBottom:"2.5rem" }}>
        <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:"0.75rem", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#5A5450", marginBottom:"1.25rem" }}>Quote / Callout</p>
        <div style={{ display:"flex", flexDirection:"column", gap:"1rem", maxWidth:"560px" }}>
          <div style={{ padding:"1.5rem", background:"rgba(232,145,42,0.08)", borderLeft:"5px solid #E8912A", borderRadius:"0 12px 12px 0" }}>
            <p style={{ fontFamily:"'Lora',serif", fontSize:"1.05rem", fontStyle:"italic", color:"#6B3A10", margin:0, lineHeight:1.7 }}>
              "When you eat with your hands, food tastes different. More truthful."
            </p>
          </div>
          <div style={{ padding:"1.5rem", background:"rgba(45,80,22,0.08)", borderLeft:"5px solid #2D5016", borderRadius:"0 12px 12px 0" }}>
            <p style={{ fontFamily:"'Lora',serif", fontSize:"1.05rem", fontStyle:"italic", color:"#2D5016", margin:0, lineHeight:1.7 }}>
              "TunaPaha means three spices—the foundation of all Sri Lankan cooking."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function IconographySection() {
  const motifs = [
    { icon:"🌶️", name:"Chilli",     use:"Heat indicator, spice scale" },
    { icon:"🥥", name:"Coconut",    use:"Pol sambol, ingredient callouts" },
    { icon:"🍛", name:"Curry bowl", use:"Dish tiles, menu items" },
    { icon:"🫙", name:"Spice jar",  use:"TunaPaha blend, take-home item" },
    { icon:"🔥", name:"Flame",      use:"Cooking step, intensity" },
    { icon:"❤️", name:"Heart",      use:"Eating step, warmth" },
    { icon:"⭐", name:"Star",       use:"Ratings, highlights" },
    { icon:"👐", name:"Hands",      use:"Hands-on cooking cue" },
  ];
  return (
    <section>
      <SectionTitle>Motifs & Icons</SectionTitle>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))", gap:"1rem", marginBottom:"2rem" }}>
        {motifs.map((m) => (
          <div key={m.name} style={{
            background:"#FFFBF5", borderRadius:"16px",
            border:"1px solid rgba(0,0,0,0.08)",
            padding:"1.25rem", textAlign:"center",
          }}>
            <div style={{ fontSize:"2.5rem", marginBottom:"0.5rem" }}>{m.icon}</div>
            <p style={{ fontFamily:"'Lora',serif", fontWeight:700, fontSize:"0.9rem", color:"#2A2420", marginBottom:"0.25rem" }}>{m.name}</p>
            <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:"0.75rem", color:"#5A5450", lineHeight:1.4 }}>{m.use}</p>
          </div>
        ))}
      </div>
      <div style={{ background:"rgba(232,145,42,0.08)", borderRadius:"16px", padding:"1.5rem", borderLeft:"4px solid #E8912A" }}>
        <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:"0.9rem", color:"#5A5450", margin:0, lineHeight:1.7 }}>
          <strong style={{color:"#2A2420"}}>Icon style rule:</strong> Prefer emoji for warmth and accessibility in consumer-facing UI. Use <code>lucide-react</code> (Flame, Heart, ChefHat, ArrowRight, Users, Sparkles, Star) for structural UI icons. Keep icon size consistent: 48px feature icons · 24px inline · 16px badge/label.
        </p>
      </div>
    </section>
  );
}

function VoiceSection() {
  const dos = [
    "Short, punchy sentences",
    "Active voice — cook, eat, taste, share",
    "Personal and warm — 'together', 'yours', 'your hands'",
    "Bilingual accents — Portuguese for flavour (Vamos, Obrigado)",
    "Storytelling over selling",
  ];
  const donts = [
    "No 'elevate your experience'",
    "No 'seamless' or 'curated'",
    "No filler adjectives — let the dish speak",
    "No corporate distancing — always 'we' not 'the team'",
    "No jargon — accessibility over sophistication",
  ];
  return (
    <section>
      <SectionTitle>Voice & Tone</SectionTitle>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1.5rem" }}>
        <div style={{ background:"rgba(45,80,22,0.06)", borderRadius:"16px", padding:"1.75rem", border:"1px solid rgba(45,80,22,0.15)" }}>
          <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:"0.75rem", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#2D5016", marginBottom:"1rem" }}>✓ Do</p>
          {dos.map((d) => (
            <div key={d} style={{ display:"flex", gap:"0.75rem", marginBottom:"0.75rem", alignItems:"flex-start" }}>
              <div style={{ width:6, height:6, borderRadius:"50%", background:"#2D5016", marginTop:7, flexShrink:0 }} />
              <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:"0.9rem", color:"#2A2420", margin:0, lineHeight:1.6 }}>{d}</p>
            </div>
          ))}
        </div>
        <div style={{ background:"rgba(196,98,26,0.06)", borderRadius:"16px", padding:"1.75rem", border:"1px solid rgba(196,98,26,0.15)" }}>
          <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:"0.75rem", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:"#C4621A", marginBottom:"1rem" }}>✗ Don't</p>
          {donts.map((d) => (
            <div key={d} style={{ display:"flex", gap:"0.75rem", marginBottom:"0.75rem", alignItems:"flex-start" }}>
              <div style={{ width:6, height:6, borderRadius:"50%", background:"#C4621A", marginTop:7, flexShrink:0 }} />
              <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:"0.9rem", color:"#2A2420", margin:0, lineHeight:1.6 }}>{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── MAIN ────────────────────────────────────────────────────────────────────
const NAV = ["Colors", "Typography", "Spacing", "Components", "Motifs", "Voice"];

export default function StyleGuide() {
  const [active, setActive] = useState("Colors");

  return (
    <div style={{ fontFamily:"'Outfit',sans-serif", background:"#FFF5E6", minHeight:"100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600;700&family=Outfit:wght@300;400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { overflow-x: hidden; }
        code { fontFamily: monospace; background: rgba(0,0,0,0.07); padding: 0.1em 0.4em; borderRadius: 4px; fontSize: 0.85em; }
        input::placeholder, textarea::placeholder { color: rgba(90,84,80,0.45); }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #FFF5E6; }
        ::-webkit-scrollbar-thumb { background: #E8912A; borderRadius: 999px; }
      `}</style>

      {/* Header */}
      <header style={{
        background:"linear-gradient(135deg, #5D3A3A 0%, #2D5016 100%)",
        padding:"3rem 4rem 2.5rem",
        position:"sticky", top:0, zIndex:100,
      }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", flexWrap:"wrap", gap:"1.5rem" }}>
            <div>
              <div style={{ display:"flex", alignItems:"center", gap:"0.75rem", marginBottom:"0.5rem" }}>
                <span style={{ fontSize:"1.75rem" }}>🫙</span>
                <span style={{
                  fontFamily:"'Outfit',sans-serif", fontSize:"0.75rem", fontWeight:700,
                  letterSpacing:"0.12em", textTransform:"uppercase", color:"rgba(255,255,255,0.55)",
                }}>Brand Style Guide</span>
              </div>
              <h1 style={{
                fontFamily:"'Lora',serif", fontSize:"clamp(2rem,4vw,3rem)",
                fontWeight:700, color:"white", lineHeight:1.1,
              }}>
                TunaPaha
              </h1>
              <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:"1rem", color:"rgba(255,255,255,0.65)", marginTop:"0.5rem" }}>
                Sri Lankan culinary experience · Lisbon, Portugal
              </p>
            </div>

            {/* Palette preview */}
            <div style={{ display:"flex", gap:"0.5rem", alignItems:"center" }}>
              {["#E8912A","#D4721A","#C4621A","#2D5016","#5D3A3A","#FFFBF5"].map(c => (
                <div key={c} title={c} style={{
                  width:32, height:32, borderRadius:"50%",
                  background:c, border:"3px solid rgba(255,255,255,0.2)",
                  boxShadow:"0 2px 8px rgba(0,0,0,0.25)",
                }} />
              ))}
            </div>
          </div>

          {/* Nav */}
          <nav style={{ display:"flex", gap:"0.5rem", marginTop:"2rem", flexWrap:"wrap" }}>
            {NAV.map((n) => (
              <button key={n} onClick={()=>setActive(n)} style={{
                padding:"0.5rem 1.25rem",
                fontFamily:"'Outfit',sans-serif", fontSize:"0.875rem", fontWeight:600,
                borderRadius:"999px", border:"2px solid",
                borderColor: active===n ? "#E8912A" : "rgba(255,255,255,0.2)",
                background: active===n ? "#E8912A" : "transparent",
                color: active===n ? "white" : "rgba(255,255,255,0.7)",
                cursor:"pointer", transition:"all 0.2s",
              }}>{n}</button>
            ))}
          </nav>
        </div>
      </header>

      {/* Content */}
      <main style={{ maxWidth:1100, margin:"0 auto", padding:"4rem 4rem 6rem" }}>
        {active === "Colors"     && <ColorsSection />}
        {active === "Typography" && <TypographySection />}
        {active === "Spacing"    && <SpacingSection />}
        {active === "Components" && <ComponentsSection />}
        {active === "Motifs"     && <IconographySection />}
        {active === "Voice"      && <VoiceSection />}
      </main>

      {/* Footer */}
      <footer style={{
        borderTop:"1px solid rgba(0,0,0,0.08)",
        padding:"2rem 4rem", textAlign:"center",
        background:"#FFFBF5",
      }}>
        <p style={{ fontFamily:"'Outfit',sans-serif", fontSize:"0.85rem", color:"#5A5450" }}>
          TunaPaha Brand Style Guide · v1.0 · 2025 · Lisbon, Portugal
        </p>
      </footer>
    </div>
  );
}

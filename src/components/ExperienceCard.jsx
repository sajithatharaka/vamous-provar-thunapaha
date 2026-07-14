// src/components/ExperienceCard.jsx
// The signature card of the TunaPaha design system — used for both the
// "Experience" steps and the "What We Make" dish tiles. Accent color is
// applied to small decorative areas only (icon, bar, bullets, quote
// border), never as a large fill, per the brand guide's "highlight only"
// rule for tones like Turmeric.

const ACCENT_CLASSES = {
  clay: {
    icon: "bg-clay text-coconut",
    bar: "bg-clay",
    bullet: "bg-clay",
    quoteBorder: "border-clay",
  },
  azulejo: {
    icon: "bg-azulejo text-coconut",
    bar: "bg-azulejo",
    bullet: "bg-azulejo",
    quoteBorder: "border-azulejo",
  },
  turmeric: {
    icon: "bg-turmeric text-charcoal",
    bar: "bg-turmeric",
    bullet: "bg-turmeric",
    quoteBorder: "border-turmeric",
  },
  curry: {
    icon: "bg-curry text-coconut",
    bar: "bg-curry",
    bullet: "bg-curry",
    quoteBorder: "border-curry",
  },
};

export default function ExperienceCard({
  eyebrow,
  title,
  description,
  icon: Icon,
  accent = "clay",
  items,
  quote,
  emoji,
  className = "",
}) {
  const tone = ACCENT_CLASSES[accent];

  return (
    <div
      className={`hover-lift rounded-lg border border-hairline bg-coconut p-8 shadow-1 hover:shadow-2 ${className}`}
    >
      {(Icon || emoji) && (
        <div
          className={`mb-6 flex h-14 w-14 items-center justify-center rounded-md text-2xl ${tone.icon}`}
        >
          {Icon ? <Icon size={26} /> : emoji}
        </div>
      )}

      {eyebrow && (
        <p className="mb-2 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-charcoal-60">
          {eyebrow}
        </p>
      )}

      <div className={`mb-4 h-1 w-9 rounded-full ${tone.bar}`} />

      <h3 className="mb-3 font-display text-2xl font-semibold text-charcoal">
        {title}
      </h3>
      <p className="text-base leading-[1.65] text-charcoal-60">{description}</p>

      {items && (
        <div className="mt-5 flex flex-col gap-3">
          {items.map((item) => (
            <div
              key={item}
              className="flex items-center gap-3 text-sm font-medium text-charcoal"
            >
              <span
                className={`h-2 w-2 flex-shrink-0 rounded-full ${tone.bullet}`}
              />
              {item}
            </div>
          ))}
        </div>
      )}

      {quote && (
        <p
          className={`mt-5 border-l-4 bg-coconut-shade p-5 font-display text-base italic leading-[1.7] text-charcoal ${tone.quoteBorder}`}
        >
          &ldquo;{quote}&rdquo;
        </p>
      )}
    </div>
  );
}

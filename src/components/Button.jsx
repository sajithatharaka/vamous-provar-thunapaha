// src/components/Button.jsx
const BASE =
  "inline-flex items-center justify-center gap-2 font-body font-semibold whitespace-nowrap transition-colors";

const VARIANT_CLASSES = {
  primary:
    "rounded-full px-8 py-4 bg-clay text-coconut shadow-press hover:bg-clay-deep",
  secondary:
    "rounded-full px-8 py-4 bg-transparent text-charcoal border-[1.5px] border-charcoal hover:bg-charcoal hover:text-coconut",
  text: "text-clay underline-offset-4 hover:underline",
};

const SIZE_CLASSES = {
  md: "text-base",
  sm: "px-5 py-2.5 text-sm",
};

export default function Button({
  variant = "primary",
  size = "md",
  href,
  type = "button",
  disabled = false,
  className = "",
  children,
  ...rest
}) {
  const classes = [
    BASE,
    VARIANT_CLASSES[variant],
    variant !== "text" ? SIZE_CLASSES[size] : "",
    disabled ? "opacity-60 cursor-not-allowed" : "hover-lift cursor-pointer",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} disabled={disabled} className={classes} {...rest}>
      {children}
    </button>
  );
}

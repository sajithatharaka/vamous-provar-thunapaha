import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { siteConfig } from "../../config";

const pagePath = resolve(process.cwd(), "src/app/page.jsx");
const source = readFileSync(pagePath, "utf8");

describe("hero visual image slideshow", () => {
  it("gives the hero a non-empty images array whose paths exist under public/images", () => {
    expect(Array.isArray(siteConfig.hero.images)).toBe(true);
    expect(siteConfig.hero.images.length).toBeGreaterThan(0);
    for (const image of siteConfig.hero.images) {
      expect(image).toMatch(/^\/images\/.+/);
      const filePath = resolve(process.cwd(), "public", image.slice(1));
      expect(existsSync(filePath)).toBe(true);
    }
  });

  it("renders every hero.images entry as a stacked, crossfading next/image", () => {
    const heroSection = source.slice(
      source.indexOf("{/* Right: amber visual panel */}"),
      source.indexOf("{/* ── EXPERIENCE ── */}")
    );
    expect(heroSection).toContain("hero.images.map");
    expect(heroSection).toMatch(/data-testid=\{`hero-visual-image-\$\{i\}`\}/);
    expect(heroSection).toMatch(/opacity:\s*i === heroImageIndex \? 1 : 0/);
    expect(heroSection).toContain('transition: "opacity');
  });

  it("cycles heroImageIndex on an interval only when there are 2+ images", () => {
    expect(source).toContain("const [heroImageIndex, setHeroImageIndex]");
    expect(source).toContain("hero.images.length < 2) return");
    expect(source).toContain("setInterval");
  });

  it("drops the glass card's translucent background/blur once photos are showing", () => {
    const glassCard = source.slice(
      source.indexOf("{/* Glass card */}"),
      source.indexOf("{hero.images && hero.images.length > 0 ? (")
    );
    expect(glassCard).toMatch(
      /background:\s*\n\s*hero\.images && hero\.images\.length > 0\s*\n\s*\? undefined/
    );
    expect(glassCard).toMatch(
      /backdropFilter:\s*\n\s*hero\.images && hero\.images\.length > 0\s*\n\s*\? undefined/
    );
  });

  it("blends the hero background across the section instead of two separate column colors", () => {
    const heroOpen = source.slice(
      source.indexOf('className="hero-grid"'),
      source.indexOf("{/* Left */}")
    );
    expect(heroOpen).toMatch(/background:\s*\n\s*"linear-gradient\(/);

    const leftColumn = source.slice(
      source.indexOf("{/* Left */}"),
      source.indexOf("{/* Right: amber visual panel */}")
    );
    expect(leftColumn).not.toContain('background: "#FFF9F0"');

    const rightPanel = source.slice(
      source.indexOf("{/* Right: amber visual panel */}"),
      source.indexOf("{/* Glass card */}")
    );
    expect(rightPanel).not.toContain('background: "#FFF9F0"');
    expect(rightPanel).not.toContain("brand.accentColor");
  });

  it("gives the glass card and its images className hooks for mobile-only CSS overrides", () => {
    const heroSection = source.slice(
      source.indexOf("{/* Right: amber visual panel */}"),
      source.indexOf("{/* ── EXPERIENCE ── */}")
    );
    expect(heroSection).toMatch(/className="hero-visual-card"/);
    expect(heroSection).toMatch(/className="hero-visual-image"/);
  });
});

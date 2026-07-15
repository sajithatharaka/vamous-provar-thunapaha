import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const pagePath = resolve(process.cwd(), "src/app/page.jsx");
const source = readFileSync(pagePath, "utf8");

describe("page.jsx responsive className hooks", () => {
  it("marks the nav for mobile padding/overflow handling", () => {
    expect(source).toContain('className="nav-inner"');
    expect(source).toContain('className="nav-brand"');
    expect(source).toContain('className="nav-cta"');
  });

  it("truncates the brand name instead of letting it push the CTA off-screen", () => {
    const navBrandBlock = source.slice(
      source.indexOf('className="nav-brand"'),
      source.indexOf('className="nav-cta"')
    );
    expect(navBrandBlock).toContain('overflow: "hidden"');
    expect(navBrandBlock).toContain('textOverflow: "ellipsis"');
    expect(navBrandBlock).toContain("minWidth: 0");
  });

  it("marks every heavily-padded section for the section-pad mobile override", () => {
    const matches = source.match(/className="section-pad"/g) ?? [];
    // experience, host/harshika, menu, faq, contact sections
    expect(matches.length).toBe(4);
  });

  it("marks the hero left column, final CTA, and footer for their own mobile overrides", () => {
    expect(source).toContain('className="hero-left"');
    expect(source).toContain('className="final-cta-pad"');
    expect(source).toContain('className="footer-pad"');
  });

  it("marks experience cards and FAQ answers for mobile padding overrides", () => {
    expect(source).toContain('className="experience-card"');
    expect(source).toContain('className="faq-answer"');
  });

  it("does not let the Harshika portrait drift over the heading/bio via scroll parallax", () => {
    const portraitBlock = source.slice(
      source.indexOf("{/* Portrait placeholder */}"),
      source.indexOf("{/* Bio */}")
    );
    expect(portraitBlock).not.toMatch(/transform:\s*`translateY\(\$\{scrollY/);
  });
});

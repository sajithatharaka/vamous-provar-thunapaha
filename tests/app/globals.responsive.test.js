import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const cssPath = resolve(process.cwd(), "src/app/globals.css");
const css = readFileSync(cssPath, "utf8");

function mediaBlock(css, maxWidth) {
  const start = css.indexOf(`@media (max-width: ${maxWidth}px)`);
  expect(
    start,
    `expected an @media (max-width: ${maxWidth}px) block`
  ).toBeGreaterThan(-1);
  const openBrace = css.indexOf("{", start);
  let depth = 1;
  let i = openBrace + 1;
  while (depth > 0 && i < css.length) {
    if (css[i] === "{") depth += 1;
    if (css[i] === "}") depth -= 1;
    i += 1;
  }
  return css.slice(start, i);
}

describe("globals.css responsive breakpoints", () => {
  it("stacks the two-column grids at tablet width (768px)", () => {
    const block = mediaBlock(css, 768);
    for (const selector of [
      ".hero-grid",
      ".experience-grid",
      ".dish-grid",
      ".contact-grid",
      ".harshika-grid",
    ]) {
      expect(block).toContain(selector);
    }
    expect(block).toMatch(/grid-template-columns:\s*1fr\s*!important/);
  });

  it("shrinks section padding and nav padding at tablet width (768px)", () => {
    const block = mediaBlock(css, 768);
    for (const selector of [
      ".nav-inner",
      ".hero-left",
      ".section-pad",
      ".final-cta-pad",
      ".footer-pad",
      ".experience-card",
    ]) {
      expect(block).toContain(selector);
    }
  });

  it("removes the FAQ answer's desktop right padding on mobile", () => {
    const block = mediaBlock(css, 768);
    expect(block).toMatch(
      /\.faq-answer\s*{[^}]*padding-right:\s*0\s*!important/
    );
  });

  it("further tightens nav and section padding for small phones (480px)", () => {
    const block = mediaBlock(css, 480);
    for (const selector of [
      ".nav-inner",
      ".nav-brand",
      ".nav-cta",
      ".hero-left",
      ".section-pad",
    ]) {
      expect(block).toContain(selector);
    }
  });

  it("uses !important to win over the inline padding/gap styles in page.jsx", () => {
    const block = mediaBlock(css, 768);
    expect(block).toMatch(/padding:[^;]*!important/);
    expect(block).toMatch(/gap:[^;]*!important/);
  });
});

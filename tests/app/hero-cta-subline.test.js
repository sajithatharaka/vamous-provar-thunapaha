import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { siteConfig } from "../../config";

const pagePath = resolve(process.cwd(), "src/app/page.jsx");
const source = readFileSync(pagePath, "utf8");

describe("hero CTA subline date", () => {
  it("does not hard-code a month/year in config.js", () => {
    expect(siteConfig.hero.ctaSubline).not.toMatch(
      /January|February|March|April|May|June|July|August|September|October|November|December/
    );
    expect(siteConfig.hero.ctaSubline).not.toMatch(/\b\d{4}\b/);
  });

  it("computes the month/year at runtime via a getCurrentMonthYear() helper", () => {
    expect(source).toMatch(
      /function getCurrentMonthYear\(\)\s*{\s*return new Date\(\)/
    );
    expect(source).toContain("{hero.ctaSubline} • {getCurrentMonthYear()}");
  });
});

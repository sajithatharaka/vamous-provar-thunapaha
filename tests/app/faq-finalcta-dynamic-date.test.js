import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { siteConfig } from "../../config";

const pagePath = resolve(process.cwd(), "src/app/page.jsx");
const source = readFileSync(pagePath, "utf8");

const MONTH_NAMES =
  /January|February|March|April|May|June|July|August|September|October|November|December/;

describe("FAQ + final CTA dynamic date tokens", () => {
  it("does not hard-code a month/year in config.js copy", () => {
    const nextExperienceFaq = siteConfig.faq.items.find(
      (item) => item.q === "When is the next experience?"
    );
    expect(nextExperienceFaq.a).not.toMatch(MONTH_NAMES);
    expect(nextExperienceFaq.a).not.toMatch(/\b\d{4}\b/);
    expect(nextExperienceFaq.a).toContain("{{monthYear}}");

    expect(siteConfig.finalCta.subline).not.toMatch(MONTH_NAMES);
    expect(siteConfig.finalCta.subline).toContain("{{month}}");
  });

  it("fills the tokens at runtime via a withCurrentDate() helper", () => {
    expect(source).toMatch(
      /function getCurrentMonth\(\)\s*{\s*return new Date\(\)/
    );
    expect(source).toMatch(/function withCurrentDate\(text\)/);
    expect(source).toContain(
      '.replace("{{monthYear}}", getCurrentMonthYear())'
    );
    expect(source).toContain('.replace("{{month}}", getCurrentMonth())');

    expect(source).toContain(
      "<FaqItem key={i} q={item.q} a={withCurrentDate(item.a)} />"
    );
    expect(source).toContain("{withCurrentDate(finalCta.subline)}");
  });
});

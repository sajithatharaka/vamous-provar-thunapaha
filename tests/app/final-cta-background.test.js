import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const pagePath = resolve(process.cwd(), "src/app/page.jsx");
const source = readFileSync(pagePath, "utf8");

function finalCtaSectionBackground() {
  const start = source.indexOf('className="final-cta-pad"');
  const end = source.indexOf("{[...Array(8)]");
  return source.slice(start, end);
}

describe("final CTA section background", () => {
  it("uses a reddish gradient instead of the deep curry-leaf green", () => {
    const section = finalCtaSectionBackground();
    expect(section).toMatch(/background:\s*\n?\s*"radial-gradient/);
    expect(section).not.toContain("#2D5016");
    expect(section).toContain("#8B2E1A");
  });
});

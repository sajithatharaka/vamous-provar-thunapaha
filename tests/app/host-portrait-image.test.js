import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { siteConfig } from "../../config";

const pagePath = resolve(process.cwd(), "src/app/page.jsx");
const source = readFileSync(pagePath, "utf8");

describe("host portrait image", () => {
  it("gives the host an image path that exists under public/images", () => {
    expect(siteConfig.host.image).toMatch(/^\/images\/.+/);
    const filePath = resolve(
      process.cwd(),
      "public",
      siteConfig.host.image.slice(1)
    );
    expect(existsSync(filePath)).toBe(true);
  });

  it("renders host.image in the Cook section's portrait instead of the ChefHat placeholder", () => {
    const cookSection = source.slice(
      source.indexOf("{/* Portrait */}"),
      source.indexOf("{/* Bio */}")
    );
    expect(cookSection).toContain("host.image");
    expect(cookSection).toContain('data-testid="host-portrait-image"');
  });

  it("does not use host.image for the hero visual panel", () => {
    const heroSection = source.slice(
      source.indexOf("{/* Right: amber visual panel */}"),
      source.indexOf("{/* ── EXPERIENCE ── */}")
    );
    expect(heroSection).not.toContain("host.image");
    expect(heroSection).toContain("hero.visualCaption");
  });
});

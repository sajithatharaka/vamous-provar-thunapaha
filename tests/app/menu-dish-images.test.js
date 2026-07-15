import { describe, expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { siteConfig } from "../../config";

const pagePath = resolve(process.cwd(), "src/app/page.jsx");
const source = readFileSync(pagePath, "utf8");

describe("menu dish images", () => {
  it("gives every dish an image path that exists under public/images", () => {
    for (const dish of siteConfig.menu.dishes) {
      expect(dish.image).toMatch(/^\/images\/.+/);
      const filePath = resolve(process.cwd(), "public", dish.image.slice(1));
      expect(existsSync(filePath)).toBe(true);
    }
  });

  it("renders each dish's photo via next/image instead of the emoji placeholder", () => {
    expect(source).toContain('import Image from "next/image"');
    expect(source).toContain("dish.image");
    expect(source).toMatch(/data-testid=\{`dish-image-\$\{idx\}`\}/);
  });
});

import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const migrationPath = resolve(
  process.cwd(),
  "supabase/migrations/20260713000000_grant_leads_insert.sql"
);

describe("leads table grants", () => {
  it("grants service_role insert/select on public.leads", () => {
    const sql = readFileSync(migrationPath, "utf8").toLowerCase();

    expect(sql).toMatch(
      /grant\s+insert\s+on\s+public\.leads\s+to\s+service_role/
    );
    expect(sql).toMatch(
      /grant\s+select\s+on\s+public\.leads\s+to\s+service_role/
    );
  });
});

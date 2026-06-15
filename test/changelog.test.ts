import { describe, expect, it } from "vitest";
import { formatChangelog, groupByType, parseLogLine } from "../src/lib/changelog.js";

describe("parseLogLine", () => {
  it("parses conventional commits", () => {
    const result = parseLogLine("abc1234 feat(cli): add changelog command");
    expect(result).toEqual({
      hash: "abc1234",
      type: "feat",
      scope: "cli",
      message: "add changelog command",
    });
  });

  it("groups non-conventional as other", () => {
    const result = parseLogLine("deadbeef Merge pull request #1");
    expect(result?.type).toBe("other");
  });
});

describe("formatChangelog", () => {
  it("groups by type with labels", () => {
    const commits = [
      parseLogLine("a1 feat: first")!,
      parseLogLine("b2 fix: bug")!,
    ];
    const md = formatChangelog(groupByType(commits));
    expect(md).toContain("### Features");
    expect(md).toContain("### Bug Fixes");
    expect(md).toContain("first");
  });
});

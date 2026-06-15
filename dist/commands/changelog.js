import { writeFileSync } from "fs";
import { runGit } from "../lib/spawn.js";
import { formatChangelog, groupByType, parseLogLine } from "../lib/changelog.js";
import { logError, logSuccess } from "../lib/log.js";
export async function runChangelog(options) {
    const args = ["log", `--pretty=format:%h %s`, `-n`, String(options.count ?? 50)];
    if (options.from)
        args.push(`${options.from}..HEAD`);
    const { stdout, stderr, code } = await runGit(args);
    if (code !== 0) {
        logError(stderr || "git log failed");
        process.exit(1);
    }
    const commits = stdout
        .split("\n")
        .map(parseLogLine)
        .filter((c) => c !== null);
    const markdown = formatChangelog(groupByType(commits), {
        title: "## Changelog",
        from: options.from,
    });
    if (options.out) {
        writeFileSync(options.out, markdown, "utf-8");
        logSuccess(`Wrote ${options.out}`);
    }
    return markdown;
}
//# sourceMappingURL=changelog.js.map
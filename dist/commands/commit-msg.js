import { logInfo, logSuccess } from "../lib/log.js";
const TYPES = ["feat", "fix", "docs", "style", "refactor", "perf", "test", "build", "ci", "chore"];
export function printCommitGuide(scope) {
    logInfo("Conventional commit format: <type>(<scope>): <description>\n");
    logInfo(`Types: ${TYPES.join(", ")}\n`);
    if (scope) {
        logSuccess(`Example: feat(${scope}): add dark mode toggle`);
    }
    else {
        logSuccess("Example: feat(cli): add changelog command");
    }
    logInfo("\nRun: git commit -m \"feat(scope): your message\"");
}
//# sourceMappingURL=commit-msg.js.map
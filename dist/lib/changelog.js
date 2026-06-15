const CONVENTIONAL = /^(\w+)(?:\(([^)]+)\))?!?:\s*(.+)$/;
export function parseLogLine(line) {
    const trimmed = line.trim();
    if (!trimmed)
        return null;
    const match = trimmed.match(/^([a-f0-9]+)\s+(.+)$/i);
    if (!match)
        return null;
    const [, hash, subject] = match;
    const conv = subject.match(CONVENTIONAL);
    if (conv) {
        return { hash, type: conv[1].toLowerCase(), scope: conv[2], message: conv[3] };
    }
    return { hash, type: "other", message: subject };
}
export function groupByType(commits) {
    const groups = new Map();
    for (const commit of commits) {
        const list = groups.get(commit.type) ?? [];
        list.push(commit);
        groups.set(commit.type, list);
    }
    return groups;
}
const TYPE_LABELS = {
    feat: "Features",
    fix: "Bug Fixes",
    docs: "Documentation",
    style: "Styles",
    refactor: "Refactors",
    perf: "Performance",
    test: "Tests",
    build: "Build",
    ci: "CI",
    chore: "Chores",
    other: "Other",
};
const TYPE_ORDER = ["feat", "fix", "perf", "refactor", "docs", "test", "build", "ci", "chore", "style", "other"];
export function formatChangelog(groups, options = {}) {
    const lines = [];
    const title = options.title ?? "## Changelog";
    lines.push(title);
    if (options.from)
        lines.push(`\nSince \`${options.from}\`:\n`);
    for (const type of TYPE_ORDER) {
        const commits = groups.get(type);
        if (!commits?.length)
            continue;
        lines.push(`### ${TYPE_LABELS[type] ?? type}`);
        for (const c of commits) {
            const scope = c.scope ? `**${c.scope}:** ` : "";
            lines.push(`- ${scope}${c.message} (\`${c.hash}\`)`);
        }
        lines.push("");
    }
    return lines.join("\n").trim() + "\n";
}
//# sourceMappingURL=changelog.js.map
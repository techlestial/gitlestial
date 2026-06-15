import { logInfo, logSuccess } from "../lib/log.js";

const HOOK = `#!/bin/sh
# Gitlestial commit-msg hook — conventional commit guard
commit_msg_file="$1"
msg=$(cat "$commit_msg_file")

# Allow merge commits
echo "$msg" | grep -qE '^Merge ' && exit 0

# Conventional: type(scope)?: description
echo "$msg" | grep -qE '^(feat|fix|docs|style|refactor|perf|test|build|ci|chore)(\\([a-z0-9._-]+\\))?!?: .+' && exit 0

echo "gitlestial: use conventional commits — run: gitlestial commit-msg"
echo "  feat(scope): description"
exit 1
`;

export function printHookTemplate(): void {
  logInfo("Save as .git/hooks/commit-msg and chmod +x:\n");
  logSuccess(HOOK);
  logInfo("\nOr: gitlestial hook-template > .git/hooks/commit-msg && chmod +x .git/hooks/commit-msg");
}

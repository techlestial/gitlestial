#!/usr/bin/env node
import { Command } from "commander";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { runChangelog } from "./commands/changelog.js";
import { printCommitGuide } from "./commands/commit-msg.js";
import { printHookTemplate } from "./commands/hook-template.js";
import { passthroughGit } from "./lib/spawn.js";
import { logError, logInfo } from "./lib/log.js";
const __dirname = dirname(fileURLToPath(import.meta.url));
const pkg = JSON.parse(readFileSync(join(__dirname, "../package.json"), "utf-8"));
const program = new Command();
program
    .name("gitlestial")
    .description("Git productivity CLI — passthrough, changelog, conventional commits")
    .version(pkg.version);
program
    .command("changelog")
    .description("Generate a markdown changelog from conventional commits")
    .option("-f, --from <ref>", "only commits since ref (tag or SHA)")
    .option("-o, --out <file>", "write to file instead of stdout")
    .option("-n, --count <n>", "max commits", "50")
    .action(async (opts) => {
    const md = await runChangelog({
        from: opts.from,
        out: opts.out,
        count: parseInt(opts.count, 10),
    });
    if (!opts.out)
        process.stdout.write(md);
});
program
    .command("commit-msg")
    .description("Print conventional commit format guide")
    .option("-s, --scope <scope>", "suggested scope")
    .action((opts) => printCommitGuide(opts.scope));
program
    .command("hook-template")
    .description("Print a commit-msg git hook for conventional commits")
    .action(() => printHookTemplate());
program
    .description("(deprecated) Use conventional commits instead")
    .action(() => {
    logError("commit-gen is removed in v2 — it manipulated git history.");
    logInfo("Use: gitlestial commit-msg  then  git commit -m \"feat: ...\"");
    process.exit(1);
});
program
    .argument("[git-args...]", "passthrough to git")
    .allowUnknownOption()
    .action((args) => {
    if (args.length === 0) {
        logInfo(`Gitlestial v${pkg.version} — git productivity CLI`);
        logInfo("Try: gitlestial changelog | gitlestial commit-msg | gitlestial status");
        return;
    }
    passthroughGit(args);
});
program.parse(process.argv);
//# sourceMappingURL=cli.js.map
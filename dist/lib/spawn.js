import { spawn } from "child_process";
export function runGit(args) {
    return new Promise((resolve) => {
        const options = process.platform === "win32" ? { shell: true } : {};
        const child = spawn("git", args, { ...options, stdio: ["ignore", "pipe", "pipe"] });
        let stdout = "";
        let stderr = "";
        child.stdout.on("data", (chunk) => {
            stdout += chunk.toString();
        });
        child.stderr.on("data", (chunk) => {
            stderr += chunk.toString();
        });
        child.on("close", (code) => resolve({ stdout, stderr, code: code ?? 1 }));
    });
}
export function passthroughGit(args) {
    const isWin = process.platform === "win32";
    spawn("git", args, {
        stdio: "inherit",
        ...(isWin ? { shell: true } : {}),
    });
}
//# sourceMappingURL=spawn.js.map
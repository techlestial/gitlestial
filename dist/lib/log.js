const green = (s) => `\x1b[32m${s}\x1b[0m`;
const yellow = (s) => `\x1b[33m${s}\x1b[0m`;
const red = (s) => `\x1b[31m${s}\x1b[0m`;
export const logInfo = (msg) => console.log(yellow(msg));
export const logSuccess = (msg) => console.log(green(msg));
export const logError = (msg) => console.error(red(msg instanceof Error ? msg.message : msg));
//# sourceMappingURL=log.js.map
const green = (s: string) => `\x1b[32m${s}\x1b[0m`;
const yellow = (s: string) => `\x1b[33m${s}\x1b[0m`;
const red = (s: string) => `\x1b[31m${s}\x1b[0m`;

export const logInfo = (msg: string) => console.log(yellow(msg));
export const logSuccess = (msg: string) => console.log(green(msg));
export const logError = (msg: string | Error) =>
  console.error(red(msg instanceof Error ? msg.message : msg));

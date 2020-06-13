import { logInfo } from "./LogService";

export const displayHelp = () => {
  logInfo(`
  🤗 --Welcome to Gitlestial-- 🤗\r\n
  Gitlestial is an extension to Git CLI.\r\n
  You can use all git commands in gitlestial including the secret commands as below 💣.\r\n
  ====================================================================================\r\n
  gitlestial commit-gen : Commit generator functions\r\n`);
};

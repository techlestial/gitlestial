import { spawnProcess } from "./SpawnService";
import { logError } from "./LogService";

export const CheckIfArgIncludes = (arg: string) => {
  if (process.argv.includes(arg)) {
    return process.argv.indexOf(arg);
  }
  return false;
};

export const CheckIfCommandExists = async () => {
  try {
    const gitTest = await spawnProcess("git");
    if (!gitTest) {
      throw new Error();
    }
    const bfgTest = await spawnProcess("bfg");
    if (!bfgTest) {
      throw new Error();
    }
  } catch (ex) {
    logError(
      new Error(
        `Git and BFG needs to be installed in your system to get Gitlestial work.\r\n
        Git cli can be installed from https://git-scm.com/downloads/\r\n
        BFG cli can be installed from https://rtyley.github.io/bfg-repo-cleaner/`
      )
    );
  }
};

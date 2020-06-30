import { spawnProcess } from "./SpawnService";
import { logError } from "./LogService";

export const CheckIfArgIncludes = (arg: string) => {
  if (process.argv.includes(arg)) {
    return process.argv[process.argv.indexOf(arg) + 1];
  }
  return false;
};

export const CheckIfCommandExists = async () => {
  try {
    const gitTest = await spawnProcess("git");
    if (!gitTest) {
      throw new Error();
    }
  } catch (ex) {
    logError(
      new Error(
        `Git CLI needs to be installed in your system to get Gitlestial work.\r\n
        Git CLI can be installed from https://git-scm.com/downloads/\r\n`
      )
    );
  }
};

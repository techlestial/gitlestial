import { spawnProcess } from "../OtherServices/SpawnService";
import { logInfo, logError, logSuccess } from "../OtherServices/LogService";
import { CheckIfArgIncludes } from "../OtherServices/CommandService";
import { writeFileSync, existsSync } from "fs";
import { LoadService } from "../OtherServices/LoadService";

const CREATE_FILE_CMD = process.platform === "win32" ? "type nul > " : "touch";
const folderName = ".gitlestial";
const fileName = ".commit";
const filePath = process.cwd() + `/${folderName}/` + fileName;
const loader = new LoadService();

export const generateCommit = async () => {
  let amount: number = 1,
    contributors: string[] = [];
  try {
    if (!existsSync(folderName)) {
      await spawnProcess("mkdir", [folderName]);
    }

    if (!existsSync(filePath)) {
      await spawnProcess(CREATE_FILE_CMD, [filePath]);
    }

    await spawnProcess("git", ["add", filePath]);
    amount = getAmount();
    logInfo("Committing for " + amount + " times");
    logInfo("Do not terminate this process!");

    const hasContributors = CheckIfArgIncludes("--contributors");
    const commitMessage = CheckIfArgIncludes("-m");
    if (hasContributors) {
      contributors = getContributors(hasContributors);
    }

    for (var i = 0; i < amount - 1; i++) {
      amountPercentageLoader(i, amount - 1);
      if (hasContributors && contributors.length) {
        await setConfigUserEmail(contributors);
      }

      writeFileSync(filePath, i.toString());
      await spawnProcess("git", [
        "commit",
        "--no-verify",
        "-am",
        commitMessage ? commitMessage.toString() : `"Gitlestial Commit-gen"`,
      ]);
    }
  } catch (ex) {
    logError(ex);
  } finally {
    cleanUpGitCommitFile(amount);
  }
};

const amountPercentageLoader = (current: number, limit: number) => {
  if (current <= limit * 0.05) {
    loader.load(1);
  } else if (current <= limit * 0.1) {
    loader.load(2);
  } else if (current <= limit * 0.15) {
    loader.load(3);
  } else if (current <= limit * 0.2) {
    loader.load(4);
  } else if (current <= limit * 0.25) {
    loader.load(5);
  } else if (current <= limit * 0.3) {
    loader.load(6);
  } else if (current <= limit * 0.35) {
    loader.load(7);
  } else if (current <= limit * 0.4) {
    loader.load(8);
  } else if (current <= limit * 0.45) {
    loader.load(9);
  } else if (current <= limit * 0.5) {
    loader.load(10);
  } else if (current <= limit * 0.55) {
    loader.load(11);
  } else if (current <= limit * 0.6) {
    loader.load(12);
  } else if (current <= limit * 0.65) {
    loader.load(13);
  } else if (current <= limit * 0.7) {
    loader.load(14);
  } else if (current <= limit * 0.75) {
    loader.load(15);
  } else if (current <= limit * 0.8) {
    loader.load(16);
  } else if (current <= limit * 0.85) {
    loader.load(17);
  } else if (current <= limit * 0.9) {
    loader.load(18);
  } else if (current <= limit * 0.95) {
    loader.load(19);
  } else if (current <= limit) {
    loader.load(20);
  }
};

const getRandomNumber = (maxNum: number) => {
  return Math.floor(Math.random() * maxNum);
};

const cleanUpGitCommitFile = async (amount: number) => {
  try {
    await spawnProcess("git", ["rm", "-f", filePath]);
    await spawnProcess("git", ["commit", "-am", "complete: gitlestial"]);
  } catch (ex) {
    logError(ex);
  } finally {
    logSuccess("Complete committing for " + amount + " times");
    logSuccess("Now do git push to your repository and voila!");
  }
};

const setConfigUserEmail = (contributors: string[]) => {
  return new Promise((resolve, reject) => {
    if (!contributors.length) {
      return reject();
    }
    spawnProcess("git", [
      "config",
      "user.email",
      contributors[getRandomNumber(contributors.length)],
    ])
      .then(() => resolve(""))
      .catch(() => reject());
  });
};

const getContributors = (contributorsWithComma: string): string[] => {
  const contributors = contributorsWithComma.split(",");
  return contributors;
};

const getAmount = (): number => {
  const amountIndex = process.argv.indexOf("--amount");
  if (!amountIndex) {
    return 1;
  }
  const amount = process.argv[amountIndex + 1];
  if (!parseInt(amount)) {
    return 1;
  }
  return parseInt(amount);
};

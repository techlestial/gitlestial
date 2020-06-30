import { spawnProcess } from "../OtherServices/SpawnService";
import { logInfo, logError } from "../OtherServices/LogService";
import { CheckIfArgIncludes } from "../OtherServices/CommandService";
import { writeFileSync, existsSync } from "fs";
import { LoadService } from "../OtherServices/LoadService";

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
      await spawnProcess("touch", [filePath]);
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

    for (var i = 0; i < amount; i++) {
      amountPercentageLoader(i, amount);
      if (hasContributors && contributors.length) {
        await setConfigUserEmail(contributors);
      }

      writeFileSync(filePath, i.toString());
      await spawnProcess("git", [
        "commit",
        "--no-verify",
        "-am",
        commitMessage ? commitMessage.toString() : "Gitlestial Commit-gen",
      ]);
    }
  } catch (ex) {
    logError(ex);
  } finally {
    cleanUpGitCommitFile(amount);
  }
};

const amountPercentageLoader = (current: number, limit: number) => {
  if (current === limit * 0.05) {
    loader.load(1);
  }
  if (current === limit * 0.1) {
    loader.load(2);
  }
  if (current === limit * 0.15) {
    loader.load(3);
  }
  if (current === limit * 0.2) {
    loader.load(4);
  }
  if (current === limit * 0.25) {
    loader.load(5);
  }
  if (current === limit * 0.3) {
    loader.load(6);
  }
  if (current === limit * 0.35) {
    loader.load(7);
  }
  if (current === limit * 0.4) {
    loader.load(8);
  }
  if (current === limit * 0.45) {
    loader.load(9);
  }
  if (current === limit * 0.5) {
    loader.load(10);
  }
  if (current === limit * 0.55) {
    loader.load(11);
  }
  if (current === limit * 0.6) {
    loader.load(12);
  }
  if (current === limit * 0.65) {
    loader.load(13);
  }
  if (current === limit * 0.7) {
    loader.load(14);
  }
  if (current === limit * 0.75) {
    loader.load(15);
  }
  if (current === limit * 0.8) {
    loader.load(16);
  }
  if (current === limit * 0.85) {
    loader.load(17);
  }
  if (current === limit * 0.9) {
    loader.load(18);
  }
  if (current === limit * 0.95) {
    loader.load(19);
  }
  if (current === limit) {
    loader.load(20);
  }
};

const getRandomNumber = (maxNum: number) => {
  return Math.floor(Math.random() * maxNum);
};

const cleanUpGitCommitFile = async (amount: number) => {
  try {
    logInfo("Complete committing for " + amount + " times");
    await spawnProcess("bfg", [
      "--delete-files",
      fileName,
      "--no-blob-protection",
    ]);
    await spawnProcess("git", ["rm", "-f", filePath]);
  } catch (ex) {
    logError(ex);
  } finally {
    logInfo("Now do git push to your repository and voila!");
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
      .then(() => resolve())
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

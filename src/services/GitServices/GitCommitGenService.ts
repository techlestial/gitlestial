import { spawnProcess } from "../OtherServices/SpawnService";
import { logInfo, logError, logSuccess } from "../OtherServices/LogService";
import { writeFileSync, existsSync } from "fs";
import { LoadService } from "../OtherServices/LoadService";
import { commitGen } from "../../config/gitlestial.config";

const folderName = ".gitlestial";
const fileName = ".commit";
const filePath = process.cwd() + `/${folderName}/` + fileName;
const loader = new LoadService();
declare var amount: number;
declare var contributors: string[] = [];

export const generateCommit = async () => {
  // let amount: number = 1,
  //   contributors: string[] = [];
  try {
    if (!existsSync(folderName)) {
      await spawnProcess("mkdir", [folderName]);
    }

    if (!existsSync(filePath)) {
      await spawnProcess("touch", [filePath]);
    }

    await spawnProcess("git", ["add", filePath]);
    amount = commitGen.amount;
    logInfo("Committing for " + amount + " times");
    logInfo("Do not terminate this process!");

    const commitMessage = commitGen.message;
    contributors = commitGen.contributors;

    for (var i = 0; i < amount - 1; i++) {
      amountPercentageLoader(i, amount - 1);
      if (contributors.length) {
        await setConfigUserEmail(contributors);
      }

      writeFileSync(filePath, i.toString());
      await spawnProcess("git", [
        "commit",
        "--no-verify",
        "-am",
        commitMessage,
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
      .then(() => resolve())
      .catch(() => reject());
  });
};

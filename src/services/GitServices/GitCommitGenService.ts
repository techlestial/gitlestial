import { spawnProcess } from "../OtherServices/SpawnService";
import { logInfo, logError } from "../OtherServices/LogService";
import { writeFileSync } from "fs";
import { commitGen } from "config/gitlestial.config";

const folderName = ".gitlestial";
const fileName = ".commit";
const filePath = process.cwd() + `/${folderName}/` + fileName;

export const generateCommit = async () => {
  let amount: number = 1,
    contributors: string[] = [];
  try {
    await spawnProcess("mkdir", [folderName]);
    await spawnProcess("touch", [filePath]);
    await spawnProcess("git", ["add", filePath]);
    amount = commitGen.amount;
    logInfo("Committing for " + amount + " times");
    logInfo("Do not terminate this process!");
    contributors = commitGen.contributors;
    const commitMessage = commitGen.message;
    for (var i = 0; i < amount; i++) {
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

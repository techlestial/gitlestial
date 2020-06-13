import { spawnProcess } from "../OtherServices/SpawnService";
import { logInfo, logError } from "../OtherServices/LogService";
import { CheckIfArgIncludes } from "../OtherServices/CommandService";
import { writeFileSync } from "fs";
import { removeDirectory } from "../OtherServices/DirectoryService";

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
    amount = getAmount();
    logInfo("Committing for " + amount + " times");
    logInfo("Do not terminate this process!");
    const hasContributors = CheckIfArgIncludes("--contributors");
    const commitMessage = CheckIfArgIncludes("-m");
    if (hasContributors) {
      contributors = getContributors(hasContributors);
    }
    for (var i = 0; i < amount; i++) {
      if (hasContributors && contributors.length) {
        await setConfigUserEmail(contributors);
      }
      writeFileSync(filePath, i.toString());
      await spawnProcess("git", [
        "commit",
        "-am",
        commitMessage ? commitMessage.toString() : "Gitlestial Commit-gen",
      ]);
    }
  } catch (ex) {
    logError(ex);
  } finally {
    cleanUp(amount);
  }
};

const getRandomNumber = (maxNum: number) => {
  return Math.floor(Math.random() * maxNum);
};

const cleanUp = async (amount: number) => {
  logInfo("Complete committing for " + amount + " times");
  await spawnProcess("bfg", [
    "--delete-files",
    fileName,
    "--no-blob-protection",
  ]);
  await spawnProcess("git", ["rm", "-f", filePath]);
  // Clean up bfg folder
  const parentPath = process.cwd().slice(0, process.cwd().lastIndexOf("/"));
  const bfgFolder =
    process.cwd().slice(process.cwd().lastIndexOf("/"), process.cwd().length) +
    ".bfg-report";
  const bfgPath = parentPath + bfgFolder;
  await removeDirectory(bfgPath);
  logInfo("Now do git push -f to your repository and voila!");
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

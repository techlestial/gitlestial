const { spawn } = require("child_process");
const { addGit } = require("../add");
const { commit } = require("../commit");
const { removeGit } = require("../rm");
const { logError } = require("../../helpers/error-helper");
const {
  writeFile,
  touchFile,
  removeFile,
} = require("../../helpers/file-helper");
const { mkDir } = require("../../helpers/dir-helper");
const { checkArg } = require("../../helpers/command-helper");

async function generateCommit() {
  let filePath, amount, contributors;
  try {
    await mkDir();
    filePath = await touchFile();
    await addGit(filePath);
    amount = getAmount() || 1;
    console.log("Committing for " + amount + " times");
    console.log("Do not terminate this process!");
    const contributorOption = checkArg("--contributors");
    if (contributorOption) {
      contributors = getContributors(contributorOption + 1);
    }
    for (var i = 0; i < amount; i++) {
      await writeFile(filePath, i);
      if (contributorOption && contributors.length) {
        console.log(contributors);
        await configUserEmail(contributors);
      }
      await commit("Gitlestial Commit-Gen");
    }
  } catch (ex) {
    logError(ex);
  } finally {
    console.log("Complete committing for " + amount + " times");
    await removeFile(".commit")
      .then(async () => {
        await removeGit(filePath);
        console.log("Now do git push -f to your repository and voila!");
      })
      .catch(async (err) => {
        await removeGit(filePath);
        console.log("Now do git push -f to your repository and voila!");
      });
  }
}

function getRandomNumber(maxNum) {
  return Math.floor(Math.random() * maxNum);
}

function configUserEmail(contributors) {
  return new Promise((resolve, reject) => {
    if(!contributors.length) {
      return reject();
    }
    const child = spawn("git", [
      "--config",
      "user.email",
      contributors[getRandomNumber(contributors.length)],
    ]);
    child.on("close", () => {
      resolve();
    });
  });
}

function getContributors(contribIndex) {
  if (!process.env[contribIndex] ) {
    return [];
  }
  const contributors = process.env[contribIndex].split(",");
  return contributors;
}

function getAmount() {
  const amountIndex = process.argv.indexOf("--amount");
  if (!amountIndex) {
    return;
  }
  const amount = process.argv[amountIndex + 1];
  if (!parseInt(amount)) {
    return;
  }
  return amount;
}

module.exports = {
  generateCommit,
};

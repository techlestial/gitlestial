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

async function generateCommit() {
  let filePath, amount;
  try {
    await mkDir();
    filePath = await touchFile();
    await addGit(filePath);
    amount = getAmount() || 1;
    console.log("Committing for " + amount + " times");
    console.log("Do not terminate this process!");
    for (var i = 0; i < amount; i++) {
      await writeFile(filePath, i);
      await commit("Gitlestial Commit-Gen");
    }
  } catch (ex) {
    logError(ex);
  } finally {
    console.log("Complete committing for " + amount + " times");
    await removeFile(".commit").catch((err) => {
      logError(err);
    });
    await removeGit(filePath);
  }
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

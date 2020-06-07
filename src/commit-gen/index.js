const { spawn } = require("child_process");
const { addGit } = require("../add");
const { commit } = require("../commit");
const { logError } = require("../../helpers/error-helper");
const { writeFile, touchFile } = require("../../helpers/file-helper");
const { mkDir } = require("../../helpers/dir-helper");

async function generateCommit() {
  try {
    await mkDir();
    const filePath = await touchFile();
    await addGit(filePath);
    const amount = getAmount() || 1;
    for (var i = 0; i < amount; i++) {
      await writeFile(filePath, i);
      await commit("Gitlestial Commit-Gen " + i);
    }
  } catch (ex) {
    logError(ex);
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

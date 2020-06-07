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
    for (var i = 0; i < 100; i++) {
      await writeFile(filePath,i);
      await commit("Gitlestial Commit-Gen "+i)
    }
  } catch (ex) {
    logError(ex);
  }
}

module.exports = {
  generateCommit,
};

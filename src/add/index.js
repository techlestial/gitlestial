const { spawn } = require("child_process");
const { logError } = require("../../helpers/error-helper");

function addGit(fileName) {
  return new Promise((resolve, reject) => {
    const child = spawn("git", ["add", fileName]);
    child.stdout.on("data", (chunk) => {
      console.log(chunk.toString("utf8"));
    });
    child.stderr.on("data", (error) => {
      logError(error.toString("utf8"));
      reject();
    });
    child.on("error", (error) => {
      logError(error);
      reject();
    });
    child.on("close", () => {
      resolve();
    });
  });
}

module.exports = {
  addGit,
};

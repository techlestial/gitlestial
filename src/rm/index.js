const { spawn } = require("child_process");
const { logError } = require("../../helpers/error-helper");

function removeGit(filePath) {
  return new Promise((resolve, reject) => {
    const child = spawn("git", ["rm", filePath]);
    child.stdout.on("data", (chunk) => {
      console.log(chunk.toString("utf8"));
    });
    child.on("error", (error) => {
      logError(error);
      reject(error);
    });
    child.on("close", () => {
      resolve();
    });
  });
}

module.exports = {
  removeGit,
};

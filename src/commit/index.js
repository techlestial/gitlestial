const { spawn } = require("child_process");
const { logError } = require("../../helpers/error-helper");

async function commitGit() {
  const subcommand = process.argv[3];
  await commit(subcommand);
}

function commit(message) {
  return new Promise((resolve, reject) => {
    const child = spawn("git", ["commit", "-am", message]);
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
  commit,
  commitGit
};

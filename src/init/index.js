const { spawn } = require("child_process");
const { logError} = require("../../helpers/error-helper");

function initGit(fileName) {
  const child = spawn("git",["init"]);
  child.stdout.on("data", (chunk) => {
    console.log(chunk.toString("utf8"));
  });
  child.on("error", (error) => {
    logError(error)
  });
}

module.exports = {
  initGit,
};

const { logError } = require("./helpers/error-helper");
const { spawn } = require("child_process");

function displayHelp(arguments) {
  const help = arguments.split("--")[1];
  if (help === "help") {
    showHelp();
  } else {
    const child = spawn("git", process.argv.slice(2, process.argv.length));
    child.stdout.on("data", (chunk) => {
      console.log(chunk.toString("utf-8"))
    });
    child.stderr.on("data", (error) => {
      logError(error.toString("utf-8"))
    });
    child.on("error", (error) => {
      logError(error);
    });
  }
}

function showHelp() {
  console.log(`
  🤗 --Welcome to Gitlestial-- 🤗\r\n
  Below are the available commands...\r\n
  gitlestial            : Display version of gitlestial\r\n
  gitlestial --help     : Display available commands\r\n
  gitlestial init       : Initiate Git repository\r\n
  gitlestial add        : Add all files inside directory\r\n
  gitlestial commit     : Make a git commit\r\n
  gitlestial commit-gen : Commit generator functions\r\n`);
}

module.exports = {
  displayHelp,
};

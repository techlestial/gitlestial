const package = require("./package.json");
const { displayHelp } = require("./help");
const { generateCommit } = require("./src/commit-gen");
const { initGit } = require("./src/init");
const { addGit } = require("./src/add");

function main() {
  const subcommand = process.argv[2];
  if (!subcommand) {
    console.log("Gitlestial - Version: " + package.version);
    console.log(
      "Use gitlestial --help for viewing all the available commands."
    );
    return;
  }

  switch (subcommand) {
    case "init":
      initGit();
      break;
    case "add":
      addGit();
      break;
    case "commit-gen":
      generateCommit();
      break;
    default:
      displayHelp(subcommand);
      break;
  }
}

module.exports = main;

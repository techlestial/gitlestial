const package = require("./package.json");
const { displayHelp } = require("./help");
const { generateCommit } = require("./src/commit-gen");
const { initGit } = require("./src/init");
const { addGit } = require("./src/add");
const { commitGit } = require("./src/commit");
const { testCommand } = require("./helpers/command-helper");

async function main() {
  try {
    const subcommand = process.argv[2];
    if (!subcommand) {
      console.log("Gitlestial - Version: " + package.version);
      console.log(
        "Use gitlestial --help for viewing all the available commands."
      );
      return;
    }

    await testCommand("git");
    await testCommand("bfg");

    switch (subcommand) {
      case "init":
        initGit();
        break;
      case "add":
        addGit();
        break;
      case "commit":
        commitGit();
        break;
      case "commit-gen":
        generateCommit();
        break;
      default:
        displayHelp(subcommand);
        break;
    }
  } catch (ex) {
    console.log(ex.message);
  }
}

module.exports = main;

const packageInfo = require("../package.json");
import { CheckIfCommandExists } from "./services/OtherServices/CommandService";
import { displayHelp } from "./options/HelpOption";
import { spawnProcess } from "./services/OtherServices/SpawnService";
import { generateCommit } from "./services/GitServices/GitCommitGenService";
import { logInfo } from "./services/OtherServices/LogService";

export const Main = async () => {
  try {
    const subcommand = process.argv[2];
    if (!subcommand) {
      console.log("Gitlestial - Version: " + packageInfo.version);
      console.log(
        "Use gitlestial --help for viewing all the available commands."
      );
      return;
    }

    CheckIfCommandExists();

    switch (subcommand) {
      case "commit-gen":
        generateCommit();
        break;
      default:
        defaultCommand(subcommand);
        break;
    }
  } catch (ex) {
    logInfo(ex.message);
  }
};

const defaultCommand = (subcommand: string) => {
  const help = subcommand.split("--")[1];
  if (help === "help") {
    displayHelp();
  } else {
    spawnProcess("git", process.argv.slice(2, process.argv.length));
    //Passing commands to primitive Git CLI
  }
};

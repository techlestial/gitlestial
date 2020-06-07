function displayHelp(arguments) {
  const help = arguments.split("--")[1];
  if (help === "help") {
    showHelp();
  } else {
    console.log("Unknown argument.");
    console.log("Please use gitlestial --help to view available commands.");
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

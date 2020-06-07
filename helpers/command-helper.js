const { spawn } = require("child_process");

function testCommand(command) {
  return new Promise((resolve, reject) => {
    const child = spawn(command);
    child.stdout.on("data", (chunk) => {
      resolve(chunk);
    });
    child.stderr.on("data", (error) => {
      reject(error);
    });
    child.on("error", (error) => {
      reject(error);
    });
  });
}

function checkArg(arg) {
  if (process.argv.includes(arg)) {
    return process.argv.indexOf(arg);
  } else {
    return false;
  }
}

module.exports = {
  testCommand,
  checkArg,
};

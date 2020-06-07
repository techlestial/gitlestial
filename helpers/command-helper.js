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

module.exports = {
  testCommand,
};

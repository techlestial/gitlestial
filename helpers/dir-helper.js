const { spawn } = require("child_process");

function mkDir() {
  return new Promise((resolve, reject) => {
    const mkDirchild = spawn("mkdir", [".gitlestial"]);
    mkDirchild.on("close", () => {
      resolve(true);
    });
    mkDirchild.on("error", (error) => {
      reject(error);
    });
  });
}

module.exports = {
  mkDir,
};

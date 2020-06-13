const { spawn } = require("child_process");
const fs = require("fs");

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

function rmDir(path) {
    return new Promise((resolve, reject) => {
        if (fs.existsSync(path)) {
            const files = fs.readdirSync(path);
            if (files.length > 0) {
                files.forEach(function(filename) {
                    if (fs.statSync(path + "/" + filename).isDirectory()) {
                        rmDir(path + "/" + filename);
                    } else {
                        fs.unlinkSync(path + "/" + filename);
                    }
                })
                fs.rmdirSync(path);
            } else {
                fs.rmdirSync(path);
            }
        } else {
            console.log("Directory path not found.");
        }
    })
}

module.exports = {
  mkDir,
  rmDir,
};

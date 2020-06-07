const fs = require("fs");
const { spawn } = require("child_process");

function writeFile(filePath, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, data, (err) => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
}

function removeFile() {
  return new Promise((resolve, reject) => {
    const child = spawn("bfg", [".commit", "--no-blob-protection"]);
    child.stdout.on("data", (chunk) => {
      console.log(chunk.toString("utf8"));
    });
    child.stderr.on("data", (error) => {
      logError(error.toString("utf8"));
      reject();
    });
    child.on("error", (error) => {
      logError(error);
      reject();
    });
    child.on("close", () => {
      resolve();
    });
  });
}

function touchFile() {
  return new Promise((resolve, reject) => {
    const path = process.cwd() + "/.gitlestial/.commit";
    const mkDirchild = spawn("touch", [path]);
    mkDirchild.on("close", () => {
      resolve(path);
    });
    mkDirchild.on("error", (error) => {
      reject(error);
    });
  });
}

module.exports = {
  touchFile,
  writeFile,
  removeFile
};

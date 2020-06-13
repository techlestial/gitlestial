import { existsSync, statSync, unlinkSync, rmdirSync, readdirSync } from "fs";
import { logInfo } from "./LogService";

export const removeDirectory = (path: string) => {
  if (existsSync(path)) {
    const files = readdirSync(path);
    if (files.length > 0) {
      files.forEach(function (filename) {
        if (statSync(path + "/" + filename).isDirectory()) {
          removeDirectory(path + "/" + filename);
        } else {
          unlinkSync(path + "/" + filename);
        }
      });
      rmdirSync(path);
    } else {
      rmdirSync(path);
    }
  }
};

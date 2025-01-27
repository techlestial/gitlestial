import rimraf from "rimraf";
import { existsSync } from "fs";

export const removeDirectory = (path: string) => {
  return new Promise((resolve, reject) => {
    if (existsSync(path)) {
      rimraf(path, (hasError) => {
        if (hasError) {
          return reject(hasError);
        }
        return resolve(true);
      });
    }
    return reject(path + " does not exist");
  });
};

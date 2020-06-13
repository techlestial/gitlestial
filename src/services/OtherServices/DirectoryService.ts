import { logInfo } from "./LogService";
import rimraf from "rimraf";
import { exists } from "fs";

export const removeDirectory = (path: string) => {
  return new Promise((resolve, reject) => {
    exists(path, (isExists) => {
      if (isExists) {
        rimraf(path, (hasError) => {
          if (hasError) {
            return reject(hasError);
          }
          return resolve(true);
        });
      }
      return reject(path+" does not exist");
    });
  });
};

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeDirectory = void 0;
var rimraf_1 = __importDefault(require("rimraf"));
var fs_1 = require("fs");
exports.removeDirectory = function (path) {
    return new Promise(function (resolve, reject) {
        if (fs_1.existsSync(path)) {
            rimraf_1.default(path, function (hasError) {
                if (hasError) {
                    return reject(hasError);
                }
                return resolve(true);
            });
        }
        return reject(path + " does not exist");
    });
};
//# sourceMappingURL=DirectoryService.js.map
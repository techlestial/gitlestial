"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeDirectory = void 0;
var fs_1 = require("fs");
exports.removeDirectory = function (path) {
    if (fs_1.existsSync(path)) {
        var files = fs_1.readdirSync(path);
        if (files.length > 0) {
            files.forEach(function (filename) {
                if (fs_1.statSync(path + "/" + filename).isDirectory()) {
                    exports.removeDirectory(path + "/" + filename);
                }
                else {
                    fs_1.unlinkSync(path + "/" + filename);
                }
            });
            fs_1.rmdirSync(path);
        }
        else {
            fs_1.rmdirSync(path);
        }
    }
};
//# sourceMappingURL=DirectoryService.js.map
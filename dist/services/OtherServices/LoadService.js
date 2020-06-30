"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadService = void 0;
var readline_1 = __importDefault(require("readline"));
var std = process.stdout;
var block = "=";
var arrow = ">";
var LoadService = /** @class */ (function () {
    function LoadService() {
        this.load = function (blockAmount) {
            var blockLine = [];
            for (var i = 0; i < blockAmount * 2; i++) {
                blockLine.push(block);
            }
            blockLine.push(arrow);
            std.write("\x1b[32m" + blockLine.join("") + ("    " + blockAmount * 5 + "% Completed"));
            readline_1.default.cursorTo(std, 0);
        };
    }
    return LoadService;
}());
exports.LoadService = LoadService;
//# sourceMappingURL=LoadService.js.map
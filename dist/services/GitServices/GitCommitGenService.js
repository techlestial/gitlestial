"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCommit = void 0;
var SpawnService_1 = require("../OtherServices/SpawnService");
var LogService_1 = require("../OtherServices/LogService");
var fs_1 = require("fs");
var LoadService_1 = require("../OtherServices/LoadService");
var gitlestial_config_1 = require("../../config/gitlestial.config");
var folderName = ".gitlestial";
var fileName = ".commit";
var filePath = process.cwd() + ("/" + folderName + "/") + fileName;
var loader = new LoadService_1.LoadService();
exports.generateCommit = function () { return __awaiter(void 0, void 0, void 0, function () {
    var amount, contributors, commitMessage, i, ex_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                amount = 1, contributors = [];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 13, 14, 15]);
                if (!!fs_1.existsSync(folderName)) return [3 /*break*/, 3];
                return [4 /*yield*/, SpawnService_1.spawnProcess("mkdir", [folderName])];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3:
                if (!!fs_1.existsSync(filePath)) return [3 /*break*/, 5];
                return [4 /*yield*/, SpawnService_1.spawnProcess("touch", [filePath])];
            case 4:
                _a.sent();
                _a.label = 5;
            case 5: return [4 /*yield*/, SpawnService_1.spawnProcess("git", ["add", filePath])];
            case 6:
                _a.sent();
                amount = gitlestial_config_1.commitGen.amount;
                LogService_1.logInfo("Committing for " + amount + " times");
                LogService_1.logInfo("Do not terminate this process!");
                commitMessage = gitlestial_config_1.commitGen.message;
                contributors = gitlestial_config_1.commitGen.contributors;
                i = 0;
                _a.label = 7;
            case 7:
                if (!(i < amount - 1)) return [3 /*break*/, 12];
                amountPercentageLoader(i, amount - 1);
                if (!contributors.length) return [3 /*break*/, 9];
                return [4 /*yield*/, setConfigUserEmail(contributors)];
            case 8:
                _a.sent();
                _a.label = 9;
            case 9:
                fs_1.writeFileSync(filePath, i.toString());
                return [4 /*yield*/, SpawnService_1.spawnProcess("git", [
                        "commit",
                        "--no-verify",
                        "-am",
                        commitMessage,
                    ])];
            case 10:
                _a.sent();
                _a.label = 11;
            case 11:
                i++;
                return [3 /*break*/, 7];
            case 12: return [3 /*break*/, 15];
            case 13:
                ex_1 = _a.sent();
                LogService_1.logError(ex_1);
                return [3 /*break*/, 15];
            case 14:
                cleanUpGitCommitFile(amount);
                return [7 /*endfinally*/];
            case 15: return [2 /*return*/];
        }
    });
}); };
var amountPercentageLoader = function (current, limit) {
    if (current <= limit * 0.05) {
        loader.load(1);
    }
    else if (current <= limit * 0.1) {
        loader.load(2);
    }
    else if (current <= limit * 0.15) {
        loader.load(3);
    }
    else if (current <= limit * 0.2) {
        loader.load(4);
    }
    else if (current <= limit * 0.25) {
        loader.load(5);
    }
    else if (current <= limit * 0.3) {
        loader.load(6);
    }
    else if (current <= limit * 0.35) {
        loader.load(7);
    }
    else if (current <= limit * 0.4) {
        loader.load(8);
    }
    else if (current <= limit * 0.45) {
        loader.load(9);
    }
    else if (current <= limit * 0.5) {
        loader.load(10);
    }
    else if (current <= limit * 0.55) {
        loader.load(11);
    }
    else if (current <= limit * 0.6) {
        loader.load(12);
    }
    else if (current <= limit * 0.65) {
        loader.load(13);
    }
    else if (current <= limit * 0.7) {
        loader.load(14);
    }
    else if (current <= limit * 0.75) {
        loader.load(15);
    }
    else if (current <= limit * 0.8) {
        loader.load(16);
    }
    else if (current <= limit * 0.85) {
        loader.load(17);
    }
    else if (current <= limit * 0.9) {
        loader.load(18);
    }
    else if (current <= limit * 0.95) {
        loader.load(19);
    }
    else if (current <= limit) {
        loader.load(20);
    }
};
var getRandomNumber = function (maxNum) {
    return Math.floor(Math.random() * maxNum);
};
var cleanUpGitCommitFile = function (amount) { return __awaiter(void 0, void 0, void 0, function () {
    var ex_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, 4, 5]);
                return [4 /*yield*/, SpawnService_1.spawnProcess("git", ["rm", "-f", filePath])];
            case 1:
                _a.sent();
                return [4 /*yield*/, SpawnService_1.spawnProcess("git", ["commit", "-am", "complete: gitlestial"])];
            case 2:
                _a.sent();
                return [3 /*break*/, 5];
            case 3:
                ex_2 = _a.sent();
                LogService_1.logError(ex_2);
                return [3 /*break*/, 5];
            case 4:
                LogService_1.logSuccess("Complete committing for " + amount + " times");
                LogService_1.logSuccess("Now do git push to your repository and voila!");
                return [7 /*endfinally*/];
            case 5: return [2 /*return*/];
        }
    });
}); };
var setConfigUserEmail = function (contributors) {
    return new Promise(function (resolve, reject) {
        if (!contributors.length) {
            return reject();
        }
        SpawnService_1.spawnProcess("git", [
            "config",
            "user.email",
            contributors[getRandomNumber(contributors.length)],
        ])
            .then(function () { return resolve(); })
            .catch(function () { return reject(); });
    });
};
//# sourceMappingURL=GitCommitGenService.js.map
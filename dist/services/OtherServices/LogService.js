"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logDebug = exports.logInfo = exports.logError = void 0;
exports.logError = function (error) {
    console.log("[ERROR] Gitlestial has encountered error.");
    console.error(error);
};
exports.logInfo = function (info) {
    console.log("[INFO] " + info);
};
exports.logDebug = function (debug) {
    console.debug("[DEBUG] " + debug);
};
//# sourceMappingURL=LogService.js.map
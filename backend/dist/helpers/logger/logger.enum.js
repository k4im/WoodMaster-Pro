"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogLevel = void 0;
var LogLevel;
(function (LogLevel) {
    LogLevel["INFO"] = "\u001B[36m";
    LogLevel["WARNING"] = "\u001B[33m";
    LogLevel["ERROR"] = "\u001B[31m";
    LogLevel["LIGHT_GRAY"] = "\u001B[37m";
    LogLevel["DEBUG"] = "\u001B[93m";
    LogLevel["RESET"] = "\u001B[0m";
})(LogLevel || (exports.LogLevel = LogLevel = {}));
//# sourceMappingURL=logger.enum.js.map
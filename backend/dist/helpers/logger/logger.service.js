"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomLogger = void 0;
const common_1 = require("@nestjs/common");
const logger_enum_1 = require("./logger.enum");
let CustomLogger = class CustomLogger {
    log(message, ...optionalParams) {
        console.log(`${logger_enum_1.LogLevel.LIGHT_GRAY}${new Date()} ${logger_enum_1.LogLevel.INFO}INFO: ${logger_enum_1.LogLevel.RESET}${message}`);
    }
    error(message, ...optionalParams) {
        console.log(`${logger_enum_1.LogLevel.RESET}${new Date()} ${logger_enum_1.LogLevel.ERROR}ERROR: ${logger_enum_1.LogLevel.RESET}${message}`);
    }
    warn(message, ...optionalParams) {
        console.log(`${logger_enum_1.LogLevel.LIGHT_GRAY}${new Date()} ${logger_enum_1.LogLevel.WARNING}WARN: ${logger_enum_1.LogLevel.RESET}${message}`);
    }
    debug(message, ...optionalParams) {
        console.log(`${logger_enum_1.LogLevel.LIGHT_GRAY}${new Date()} ${logger_enum_1.LogLevel.DEBUG}DEBUG: ${logger_enum_1.LogLevel.RESET}${message}`);
    }
    verbose(message, ...optionalParams) {
        throw new Error('Method not implemented.');
    }
    fatal(message, ...optionalParams) {
        throw new Error('Method not implemented.');
    }
};
exports.CustomLogger = CustomLogger;
exports.CustomLogger = CustomLogger = __decorate([
    (0, common_1.Injectable)()
], CustomLogger);
//# sourceMappingURL=logger.service.js.map
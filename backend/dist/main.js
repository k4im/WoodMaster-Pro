"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const logger_service_1 = require("./helpers/logger/logger.service");
async function bootstrap() {
    let logger = new logger_service_1.CustomLogger();
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    await app.listen(3000);
    logger.log("Listening on port: 3000");
}
bootstrap();
//# sourceMappingURL=main.js.map
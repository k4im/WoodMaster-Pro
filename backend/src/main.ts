import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { CustomLogger } from './infrastructure/logger/logger.service';
import { env } from 'process';
import * as dotenv from 'dotenv';
import EnvLogger from './infrastructure/utils/env.logger';
import { envChecker } from './infrastructure/utils/env.checker';
async function bootstrap() {
  dotenv.config();
  envChecker.checkEnv();

  let logger = new CustomLogger();
  const app = await NestFactory.create(AppModule);
  const envLogger = new EnvLogger(logger);

    
  const config = new DocumentBuilder()
  .setTitle("WoodMaster-Pro API")
  .setDescription("Api para processos de CRUD do sistema.")
  .setVersion("1.0")
  .addBearerAuth()
  .build();
  
  const documento = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, documento)
  await app.listen(env.PORT_APP);
  envLogger.Log();
  logger.log(`Listening on port: ${env.PORT_APP}`)
}
bootstrap();

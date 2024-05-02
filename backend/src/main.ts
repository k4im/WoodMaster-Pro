import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { CustomLogger } from './adapters/out-adapters/logger/logger.service';

async function bootstrap() {
  dotenv.config();
  
  let logger = new CustomLogger();
  const app = await NestFactory.create(AppModule);
  
  const config = new DocumentBuilder()
  .setTitle("WoodMaster-Pro API")
  .setDescription("Api para processos de CRUD do sistema.")
  .setVersion("1.0")
  .addBearerAuth()
  .build();
  
  const documento = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, documento)
  await app.listen(3000);
  logger.log("Listening on port: 3000")
}
bootstrap();

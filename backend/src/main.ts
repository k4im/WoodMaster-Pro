import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomLogger } from './helpers/logger/logger.service';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { DatabaseService } from './outbound/database/database.service';
import { UsuarioRepositoryService } from './outbound/repository/usuario-repository/usuario-repository.service';

async function bootstrap() {
  let logger = new CustomLogger();
  const app = await NestFactory.create(AppModule);
  
  const config = new DocumentBuilder()
  .setTitle("WoodMaster-Pro API")
  .setDescription("Api para processos de CRUD do sistema.")
  .setVersion("1.0")
  .build();
  
  const documento = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, documento)
  await app.listen(3000);
  logger.log("Listening on port: 3000")
}
bootstrap();

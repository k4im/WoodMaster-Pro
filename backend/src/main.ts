import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { CustomLogger } from './infrastructure/logger/logger.service';
import { env } from 'process';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  
  if(!process.env.HOST) 
      throw Error("É necessário espeficicar a URL do banco de dados.")
  if(!process.env.PORT_DB)
    throw Error("É necessário espeficicar a porta de acesso ao banco de dados.")
  if(!process.env.USER_DB)
    throw Error("É necessário espeficicar o usuario do banco de dados.")
  if(!process.env.PWD_DB)
    throw Error("É necessário espeficicar a senha de acesso ao banco de dados.")
  if(!process.env.DB_NAME)
    throw Error('É necessário especificar o nome do banco')
  if(!process.env.PORT_APP) 
    throw Error("A porta do app precisa ser definida")
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
  await app.listen(env.PORT_APP);
  logger.log(`Listening on port: ${env.PORT_APP}`)
}
bootstrap();

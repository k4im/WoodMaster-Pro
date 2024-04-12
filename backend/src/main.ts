import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomLogger } from './helpers/logger/logger.service';

async function bootstrap() {
  let logger = new CustomLogger();
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  logger.log("Listening on port: 3000")
}
bootstrap();

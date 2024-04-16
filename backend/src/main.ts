import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomLogger } from './helpers/logger/logger.service';
import { DatabaseService } from './outbound/database/database.service';
import { PessoaRepositoryService } from './outbound/repository/pessoa-repository/pessoa-repository.service';

async function bootstrap() {
  let logger = new CustomLogger();
  let db = new DatabaseService();
  let repo = new PessoaRepositoryService(db, logger);
  console.log(JSON.stringify(await repo.paginarResultados(1, 10)));
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  logger.log("Listening on port: 3000")
}
bootstrap();

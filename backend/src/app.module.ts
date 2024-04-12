import { Module } from '@nestjs/common';
import { CustomLogger } from './helpers/logger/logger.service';
import { DatabaseService } from './outbound/database/database.service';
import { PessoaRepositoryService } from './outbound/repository/pessoa-repository/pessoa-repository.service';


@Module({
  imports: [],
  controllers: [],
  providers: [ CustomLogger, DatabaseService, PessoaRepositoryService],
})
export class AppModule {}

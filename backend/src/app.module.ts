import { Module } from '@nestjs/common';
import { CustomLogger } from './helpers/logger/logger.service';
import { DatabaseService } from './outbound/database/database.service';
import { PessoaRepositoryService } from './outbound/repository/pessoa-repository/pessoa-repository.service';
import { PessoasModule } from './inbound/http-controllers/pessoas/pessoas.module';


@Module({
  imports: [PessoasModule],
  controllers: [],
  providers: [ CustomLogger, DatabaseService],
})
export class AppModule {}

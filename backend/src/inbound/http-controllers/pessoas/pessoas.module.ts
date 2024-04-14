import { Module } from '@nestjs/common';
import { PessoasController } from './pessoas.controller';
import { PessoasService } from './pessoas.service';
import { Repository } from 'src/outbound/repository/Repository';
import { PessoaRepositoryService } from 'src/outbound/repository/pessoa-repository/pessoa-repository.service';
import { CustomLogger } from 'src/helpers/logger/logger.service';
import { DatabaseService } from 'src/outbound/database/database.service';

@Module({
  controllers: [PessoasController],
  providers: [PessoasService, {provide: Repository, useClass: PessoaRepositoryService}, CustomLogger, DatabaseService],
})
export class PessoasModule {}

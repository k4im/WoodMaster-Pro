import { Module } from '@nestjs/common';
import { PessoasController } from './pessoas.controller';
import { PessoasService } from './pessoas.service';
import { CustomLogger } from 'src/outbound/adapters/logger/logger.service';
import { PessoaRepositoryService } from 'src/outbound/adapters/repository/pessoa-repository/pessoa-repository.service';
import { DatabaseService } from 'src/outbound/adapters/database/database.service';
import { Repository } from 'src/outbound/ports/Repository.gateway';

@Module({
  controllers: [PessoasController],
  providers: [PessoasService, {provide: Repository, useClass: PessoaRepositoryService}, {provide: "LoggerGateway", useClass: CustomLogger}, DatabaseService],
})
export class PessoasModule {}
import { Module } from '@nestjs/common';
import { PessoasController } from './pessoas.controller';
import { PessoasService } from './pessoas.service';
import { PessoaRepositoryService } from 'src/infraestrutura/repository/pessoa-repository/pessoa-repository.service';
import { DatabaseService } from 'src/infraestrutura/database/database.service';
import { CustomLogger } from 'src/application/out-adapters/logger/logger.service';
import { Repository } from 'src/application/out-ports/Repository.gateway';

@Module({
  controllers: [PessoasController],
  providers: [PessoasService, {provide: Repository, useClass: PessoaRepositoryService}, {provide: "LoggerGateway", useClass: CustomLogger}, DatabaseService],
})
export class PessoasModule {}
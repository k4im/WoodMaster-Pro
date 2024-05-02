import { Module } from '@nestjs/common';
import { UsuarioRepositoryService } from './repository/usuario-repository/usuario-repository.service';
import { TenantRepositoryService } from './repository/tenant-repository/tenant-repository.service';
import { PessoaRepositoryService } from './repository/pessoa-repository/pessoa-repository.service';
import { CustomLogger } from '../out-adapters/logger/logger.service';

@Module({
    providers: [{provide: 'LoggerGateway', useClass: CustomLogger}, UsuarioRepositoryService, TenantRepositoryService, PessoaRepositoryService]
})
export class PersistenceModule {}

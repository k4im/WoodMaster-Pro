import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { CustomLogger } from 'src/application/out-adapters/logger/logger.service';
import { DatabaseService } from 'src/infraestrutura/database/database.service';
import { UsuarioRepositoryService } from 'src/infraestrutura/repository/usuario-repository/usuario-repository.service';
import { Repository } from 'src/application/out-ports/Repository.gateway';
@Module({
  controllers: [UsuariosController],
  providers: [UsuariosService, {provide: "LoggerGateway", useClass: CustomLogger}, DatabaseService,
  { provide: Repository, useClass: UsuarioRepositoryService}],
})
export class UsuariosModule {}

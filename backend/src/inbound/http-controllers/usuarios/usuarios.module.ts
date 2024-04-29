import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { CustomLogger } from 'src/outbound/adapters/logger/logger.service';
import { DatabaseService } from 'src/outbound/adapters/database/database.service';
import { UsuarioRepositoryService } from 'src/outbound/adapters/repository/usuario-repository/usuario-repository.service';
import { Repository } from 'src/outbound/ports/Repository.gateway';

@Module({
  controllers: [UsuariosController],
  providers: [UsuariosService, {provide: "LoggerGateway", useClass: CustomLogger}, DatabaseService,
  { provide: Repository, useClass: UsuarioRepositoryService}],
})
export class UsuariosModule {}

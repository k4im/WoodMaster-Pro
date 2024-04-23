import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { Repository } from 'src/outbound/repository/Repository';
import { UsuarioRepositoryService } from 'src/outbound/repository/usuario-repository/usuario-repository.service';
import { DatabaseService } from 'src/outbound/database/database.service';
import { CustomLogger } from 'src/outbound/logger/logger.service';

@Module({
  controllers: [UsuariosController],
  providers: [UsuariosService, {provide: "LoggerGateway", useClass: CustomLogger}, DatabaseService,
  { provide: Repository, useClass: UsuarioRepositoryService}],
})
export class UsuariosModule {}

import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { Repository } from 'src/outbound/repository/Repository';
import { UsuarioRepositoryService } from 'src/outbound/repository/usuario-repository/usuario-repository.service';
import { CustomLogger } from 'src/helpers/logger/logger.service';
import { DatabaseService } from 'src/outbound/database/database.service';

@Module({
  controllers: [UsuariosController],
  providers: [UsuariosService, CustomLogger, DatabaseService,
  { provide: Repository, useClass: UsuarioRepositoryService}],
})
export class UsuariosModule {}

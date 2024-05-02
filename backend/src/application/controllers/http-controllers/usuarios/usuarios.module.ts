import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { CustomLogger } from 'src/adapters/out-adapters/logger/logger.service';
import { DatabaseService } from 'src/adapters/framework/database/database.service';
import { UsuarioRepositoryService } from 'src/adapters/persistence/repository/usuario-repository/usuario-repository.service';
@Module({
  controllers: [UsuariosController],
  providers: [UsuariosService, {provide: "LoggerGateway", useClass: CustomLogger}, DatabaseService,
  { provide: "RepositoryGateway", useClass: UsuarioRepositoryService}],
})
export class UsuariosModule {}

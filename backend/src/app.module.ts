import { Module } from '@nestjs/common';
import { CustomLogger } from './helpers/logger/logger.service';
import { DatabaseService } from './outbound/database/database.service';
import { PessoaRepositoryService } from './outbound/repository/pessoa-repository/pessoa-repository.service';
import { PessoasModule } from './inbound/http-controllers/pessoas/pessoas.module';
import { UsuarioRepositoryService } from './outbound/repository/usuario-repository/usuario-repository.service';
import { UsuariosModule } from './inbound/http-controllers/usuarios/usuarios.module';
import { AuthRepositoryService } from './outbound/repository/auth-repository/auth-repository.service';


@Module({
  imports: [PessoasModule, UsuariosModule],
  controllers: [],
  providers: [ CustomLogger, DatabaseService, UsuarioRepositoryService, AuthRepositoryService],
})
export class AppModule {}

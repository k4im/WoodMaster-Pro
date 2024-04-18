import { Module } from '@nestjs/common';
import { CustomLogger } from './helpers/logger/logger.service';
import { DatabaseService } from './outbound/database/database.service';
import { PessoaRepositoryService } from './outbound/repository/pessoa-repository/pessoa-repository.service';
import { PessoasModule } from './inbound/http-controllers/pessoas/pessoas.module';
import { UsuarioRepositoryService } from './outbound/repository/usuario-repository/usuario-repository.service';
import { UsuariosModule } from './inbound/http-controllers/usuarios/usuarios.module';
import { AuthRepositoryService } from './outbound/repository/auth-repository/auth-repository.service';
import { JwtModule } from '@nestjs/jwt';
import { env } from 'process';
import { AuthModule } from './inbound/http-controllers/auth/auth.module';
import { EmpresaModule } from './inbound/http-controllers/empresa/empresa.module';
import { RolesModule } from './inbound/http-controllers/roles/roles.module';
import { PermissionsModule } from './inbound/http-controllers/permissions/permissions.module';


@Module({
  imports: [PessoasModule, UsuariosModule,
    JwtModule.register({
      global: true,
      secret: env.SECRET_KEY,
      signOptions: {expiresIn: '60s'}
    }),
    AuthModule,
    EmpresaModule,
    RolesModule,
    PermissionsModule
  ],
  controllers: [],
  providers: [ CustomLogger, DatabaseService, UsuarioRepositoryService, AuthRepositoryService],
})
export class AppModule {}

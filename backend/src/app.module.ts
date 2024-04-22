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
import { TenantModule } from './inbound/http-controllers/tenant/tenant.module';
import { AdminModule } from './inbound/http-controllers/admin/admin.module';
import { EstoqueModule } from './inbound/http-controllers/estoque/estoque.module';
import { ProdutosModule } from './inbound/http-controllers/produtos/produtos.module';
import { ServicosModule } from './inbound/http-controllers/servicos/servicos.module';
import { TenantRepositoryService } from './outbound/repository/tenant-repository/tenant-repository.service';

@Module({
  imports: [PessoasModule, UsuariosModule,
    JwtModule.register({
      global: true,
      secret: env.SECRET_KEY,
      signOptions: {expiresIn: '1h'}
    }),
    AuthModule,
    TenantModule,
    AdminModule,
    EstoqueModule,
    ProdutosModule,
    ServicosModule],
  providers: [ CustomLogger, DatabaseService, UsuarioRepositoryService, AuthRepositoryService, TenantRepositoryService],
})
export class AppModule {}

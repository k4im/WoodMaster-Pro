import { Module } from '@nestjs/common';
import { DatabaseService } from './adapters/framework/database/database.service';
import { JwtModule } from '@nestjs/jwt';
import { env } from 'process';
import { UsuarioRepositoryService } from './adapters/persistence/repository/usuario-repository/usuario-repository.service';
import { AuthRepositoryService } from './adapters/persistence/repository/auth-repository/auth-repository.service';
import { TenantRepositoryService } from './adapters/persistence/repository/tenant-repository/tenant-repository.service';
import { CustomLogger } from './adapters/out-adapters/logger/logger.service';
import { PessoaRepositoryService } from './adapters/persistence/repository/pessoa-repository/pessoa-repository.service';
import { AuthModule } from './application/controllers/http-controllers/auth/auth.module';
import { TenantModule } from './application/controllers/http-controllers/tenant/tenant.module';
import { AdminModule } from './application/controllers/http-controllers/admin/admin.module';
import { EstoqueModule } from './application/controllers/http-controllers/estoque/estoque.module';
import { ProdutosModule } from './application/controllers/http-controllers/produtos/produtos.module';
import { ServicosModule } from './application/controllers/http-controllers/servicos/servicos.module';
import { PessoasModule } from './application/controllers/http-controllers/pessoas/pessoas.module';
import { UsuariosModule } from './application/controllers/http-controllers/usuarios/usuarios.module';
import { UsecasesModule } from './application/usecases/usecases.module';

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
    ServicosModule,
    UsecasesModule],
  providers: [ {provide: 'LoggerGateway', useClass: CustomLogger}, DatabaseService,  PessoaRepositoryService, UsuarioRepositoryService, AuthRepositoryService, TenantRepositoryService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { CustomLogger } from './outbound/adapters/logger/logger.service';
import { DatabaseService } from './outbound/adapters/database/database.service';
import { PessoasModule } from './inbound/http-controllers/pessoas/pessoas.module';
import { UsuariosModule } from './inbound/http-controllers/usuarios/usuarios.module';
import { JwtModule } from '@nestjs/jwt';
import { env } from 'process';
import { AuthModule } from './inbound/http-controllers/auth/auth.module';
import { TenantModule } from './inbound/http-controllers/tenant/tenant.module';
import { AdminModule } from './inbound/http-controllers/admin/admin.module';
import { EstoqueModule } from './inbound/http-controllers/estoque/estoque.module';
import { ProdutosModule } from './inbound/http-controllers/produtos/produtos.module';
import { ServicosModule } from './inbound/http-controllers/servicos/servicos.module';
import { AuthService } from './usecases/auth/auth.service';
import { CriarNovoClienteService } from './usecases/clientes/criar-novo-cliente/criar-novo-cliente.service';
import { DeletarClienteService } from './usecases/clientes/deletar-cliente/deletar-cliente.service';
import { AtualizarClienteService } from './usecases/clientes/atualizar-cliente/atualizar-cliente.service';
import { ListarClientesService } from './usecases/clientes/listar-clientes/listar-clientes.service';
import { ListarFornecedoresService } from './usecases/fornecedores/listar-fornecedores/listar-fornecedores.service';
import { CriarFornecedorService } from './usecases/fornecedores/criar-fornecedor/criar-fornecedor.service';
import { UsuarioRepositoryService } from './outbound/adapters/repository/usuario-repository/usuario-repository.service';
import { AuthRepositoryService } from './outbound/adapters/repository/auth-repository/auth-repository.service';
import { TenantRepositoryService } from './outbound/adapters/repository/tenant-repository/tenant-repository.service';
import { AtualizarFornecedorService } from './usecases/fornecedores/atualizar-fornecedor/atualizar-fornecedor.service';

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
  providers: [ {provide: 'LoggerGateway', useClass: CustomLogger}, DatabaseService, UsuarioRepositoryService, AuthRepositoryService, TenantRepositoryService, AuthService, CriarNovoClienteService, DeletarClienteService, AtualizarClienteService, ListarClientesService, ListarFornecedoresService, CriarFornecedorService, AtualizarFornecedorService],
})
export class AppModule {}

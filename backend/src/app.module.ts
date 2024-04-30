import { Module } from '@nestjs/common';
import { DatabaseService } from './infraestrutura/database/database.service';
import { JwtModule } from '@nestjs/jwt';
import { env } from 'process';
import { AuthService } from './application/usecases/auth/commands/login/auth.service';
import { CriarNovoClienteService } from './application/usecases/clientes/commands/criar-novo-cliente/criar-novo-cliente.service';
import { DeletarClienteService } from './application/usecases/clientes/commands/deletar-cliente/deletar-cliente.service';
import { AtualizarClienteService } from './application/usecases/clientes/commands/atualizar-cliente/atualizar-cliente.service';
import { ListarClientesService } from './application/usecases/clientes/commands/listar-clientes/listar-clientes.service';
import { ListarFornecedoresService } from './application/usecases/fornecedores/listar-fornecedores/listar-fornecedores.service';
import { CriarFornecedorService } from './application/usecases/fornecedores/criar-fornecedor/criar-fornecedor.service';
import { UsuarioRepositoryService } from './infraestrutura/repository/usuario-repository/usuario-repository.service';
import { AuthRepositoryService } from './infraestrutura/repository/auth-repository/auth-repository.service';
import { TenantRepositoryService } from './infraestrutura/repository/tenant-repository/tenant-repository.service';
import { AtualizarFornecedorService } from './application/usecases/fornecedores/atualizar-fornecedor/atualizar-fornecedor.service';
import { CriarProdutoService } from './application/usecases/produtos/criar-produto/criar-produto.service';
import { CriarFuncionarioService } from './application/usecases/funcionarios/criar-funcionario/criar-funcionario.service';
import { RemoverFuncionarioService } from './application/usecases/funcionarios/remover-funcionario/remover-funcionario.service';
import { AtualizarFuncionarioService } from './application/usecases/funcionarios/atualizar-funcionario/atualizar-funcionario.service';
import { ListarFuncionariosService } from './application/usecases/funcionarios/listar-funcionarios/listar-funcionarios.service';
import { CustomLogger } from './application/out-adapters/logger/logger.service';
import { PessoaRepositoryService } from './infraestrutura/repository/pessoa-repository/pessoa-repository.service';
import { AuthModule } from './application/in-adapters/http-controllers/auth/auth.module';
import { TenantModule } from './application/in-adapters/http-controllers/tenant/tenant.module';
import { AdminModule } from './application/in-adapters/http-controllers/admin/admin.module';
import { EstoqueModule } from './application/in-adapters/http-controllers/estoque/estoque.module';
import { ProdutosModule } from './application/in-adapters/http-controllers/produtos/produtos.module';
import { ServicosModule } from './application/in-adapters/http-controllers/servicos/servicos.module';
import { PessoasModule } from './application/in-adapters/http-controllers/pessoas/pessoas.module';
import { UsuariosModule } from './application/in-adapters/http-controllers/usuarios/usuarios.module';

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
  providers: [ {provide: 'LoggerGateway', useClass: CustomLogger}, DatabaseService,  PessoaRepositoryService, UsuarioRepositoryService, AuthRepositoryService, TenantRepositoryService, AuthService, CriarNovoClienteService, DeletarClienteService, AtualizarClienteService, ListarClientesService, ListarFornecedoresService, CriarFornecedorService, AtualizarFornecedorService, CriarProdutoService, CriarFuncionarioService, RemoverFuncionarioService, AtualizarFuncionarioService, ListarFuncionariosService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { ListarEstabelecimentosUseCase } from './administradores/commands/listar-estabelecimentos-use-case/listar-estabelecimentos-use-case.service';
import { LoginUserUseCase } from './auth/commands/login/auth.service';
import { AtualizarClienteUseCase } from './clientes/commands/atualizar-cliente/atualizar-cliente.service';
import { CriarClienteUseCase } from './clientes/commands/criar-novo-cliente/criar-novo-cliente.service';
import { DeletarClienteUseCase } from './clientes/commands/deletar-cliente/deletar-cliente.service';
import { BuscarClientesUseCase } from './clientes/commands/listar-clientes/listar-clientes.service';
import { AtualizarFornecedorUseCase } from './fornecedores/commands/atualizar-fornecedor/atualizar-fornecedor.service';
import { CriarFornecedorUseCase } from './fornecedores/commands/criar-fornecedor/criar-fornecedor.service';
import { BuscarFornecedoresUseCase } from './fornecedores/commands/listar-fornecedores/listar-fornecedores.service';
import { RemoverFornecedorUseCase } from './fornecedores/commands/remover-fornecedor/remover-fornecedor.service';
import { AtualizarFuncionarioUseCase } from './funcionarios/commands/atualizar-funcionario/atualizar-funcionario.service';
import { CriarFuncionarioUseCase } from './funcionarios/commands/criar-funcionario/criar-funcionario.service';
import { BuscarFuncionariosUseCase } from './funcionarios/commands/listar-funcionarios/listar-funcionarios.service';
import { RemoverFuncionariosUseCase } from './funcionarios/commands/remover-funcionario/remover-funcionario.service';
import { CriarProdutoUseCase } from './produtos/criar-produto/criar-produto.service';

@Module({
    providers: [ListarEstabelecimentosUseCase, LoginUserUseCase, AtualizarClienteUseCase, CriarClienteUseCase, DeletarClienteUseCase,
    BuscarClientesUseCase, AtualizarFornecedorUseCase, CriarFornecedorUseCase, BuscarFornecedoresUseCase, RemoverFornecedorUseCase,
    AtualizarFuncionarioUseCase, CriarFuncionarioUseCase, BuscarFuncionariosUseCase, RemoverFuncionariosUseCase,
    CriarProdutoUseCase]
})
export class UsecasesModule {}

import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

export interface DatabaseGateway {
    acessarPessoas(): Promise<Prisma.PessoaDelegate<DefaultArgs>>
    acessarUsuarios(): Promise<Prisma.UsuarioDelegate<DefaultArgs>>
    acessarTenants(): Promise<Prisma.TenantDelegate<DefaultArgs>>
    acessarEstoque(): Promise<Prisma.EstoqueDelegate<DefaultArgs>>
    acessarProdutos(): Promise<Prisma.ProdutosDelegate<DefaultArgs>>
    acessarServicos(): Promise<Prisma.ServicosDelegate<DefaultArgs>>
}
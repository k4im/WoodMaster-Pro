import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { ITenantDto } from "src/domain/dto/ITenant.dto";
import { IPessoaDto } from "src/domain/dto/Pessoas.dto";
import { filtro } from "src/domain/enum/filtroPaginacao.enum";

export interface DatabaseGateway {
    // Metodos para tabela de pessoas.
    buscarResultados(pagina: number, limit: number, whereClausula: any): Promise<IPessoaDto[]>;
    buscarPessoa(uuid: string);
    criarNovaPessoa(data: any);
    atualizarPessoa(data: any, uuid:string);
    desativarPessoa(uuid: any);

    // Metodo para tabelas de tenants
    buscarEstabelecimentos(pagina: number, limit: number,): Promise<ITenantDto[]>;
    buscarEstabelecimento(uuid: string);
    criarNovoEstabelecimento(data: any);
    atualizarEstabelecimento(data: any, uuid:string);
    desativarEstabelecimento(uuid: any);



}
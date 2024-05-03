import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { ITenantDto } from "src/domain/dto/ITenant.dto";
import { IPessoaDto } from "src/domain/dto/Pessoas.dto";
import { filtro } from "src/domain/enum/filtroPaginacao.enum";

export interface DatabaseGateway {
}
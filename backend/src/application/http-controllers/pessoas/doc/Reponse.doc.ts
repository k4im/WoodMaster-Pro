import { ApiProperty } from "@nestjs/swagger";
import { PessoaEntity } from "src/domain/entities/pessoa.entity";
import { IPessoa } from "src/domain/interfaces/IPessoa.interface";
import { IResponse } from "src/domain/interfaces/IResponse.interface";
export class ResponseDoc implements IResponse {
    @ApiProperty()
    total_itens: number;
    @ApiProperty()
    total_paginas: number;
    @ApiProperty()
    pagina_atual: number;
    @ApiProperty({isArray: true})
    resultados: IPessoa[] = [new PessoaEntity().default()];

}
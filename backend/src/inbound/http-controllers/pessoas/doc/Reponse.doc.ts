import { ApiProperty } from "@nestjs/swagger";
import { IResponse } from "src/interfaces/IResponse.interface";
import { PessoaEntity } from "../entities/pessoa.entity";
import { IPessoa } from "src/interfaces/IPessoa.interface";
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
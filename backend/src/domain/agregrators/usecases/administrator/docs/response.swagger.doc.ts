/**
 * Classe de documentação.
 * 
 * Classe sera utilizada para documentação dos retornos
 * de resposta em uma chamada paginada ao banco de dados.
 * 
 * @author João Victor
 */

import { ApiProperty } from "@nestjs/swagger";
import { IResponse } from "src/application/dto/interfaces/IResponse.interface";
import { Tenant } from "src/infrastructure/database/models/Tenant.entity";

export class ResponseSwaggerDoc implements IResponse<Tenant> {
    @ApiProperty()
    total_itens: number;
    @ApiProperty()
    total_paginas: number;
    @ApiProperty()
    pagina_atual: number;
    @ApiProperty({
        type: Tenant,
        isArray: true
    })
    resultados: Tenant[]; 

}
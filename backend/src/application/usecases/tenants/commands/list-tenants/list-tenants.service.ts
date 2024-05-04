import { Inject, Injectable } from '@nestjs/common';
import { Tenant } from 'src/adapters/framework/database/entities/Tenant.entity';
import { DatabaseGateway } from 'src/application/ports/out-ports/database.gateway';
import { IResponse } from 'src/domain/interfaces/IResponse.interface';

@Injectable()
export class ListTenantsUseCase {

    constructor(@Inject("DatabaseGateway") private readonly databaseAdapter: DatabaseGateway) {}

    async execute(page: number, limit: number) {
        try {
            const pages = (page - 1) * limit;
            const repo = (await (await this.databaseAdapter.connect()).initialize()).getRepository(Tenant);
            
            const result = await repo.findAndCount({
                select: {Name: true, Uuid: true, IsActive: true},
                skip: pages,
                take: limit
            });
            const response: IResponse = {
                pagina_atual: page,
                total_itens: result[1],
                total_paginas: Math.ceil(result[1] / limit),
                resultados: result[0],
            }
            return response;
        } catch (error) {
            console.log("Error: " + error)
        }
    }

    
}

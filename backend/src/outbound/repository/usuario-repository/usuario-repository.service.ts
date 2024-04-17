import { Injectable } from '@nestjs/common';
import { Repository } from '../Repository';
import { IResponse } from 'src/interfaces/IResponse.interface';
import { DatabaseService } from 'src/outbound/database/database.service';
import { CustomLogger } from 'src/helpers/logger/logger.service';

@Injectable()
export class UsuarioRepositoryService implements Repository {
    


    constructor(private readonly databaseService: DatabaseService,
        private readonly logger: CustomLogger) {}
        
    /**
     * Realiza a operação de paginação no banco de dados na tabela de pessoa.
     * @param pagina recebe a pagina que sera acessada
     * @param limit recebe o limite de resultados por pagina.
     * @returns IResponse
     */
    async paginarResultados(pagina: number, limit: number) { 
        try {
            let calculoPagina = (pagina - 1) * limit; 
            
            let resultado = await this.databaseService.usuario.findMany({
                include: {
                    Pessoa: true
                },
                skip: calculoPagina,
                take: limit
            });

            let totalDeRegistos: number = await this.databaseService.pessoa.count();
            let totalDePaginas: number = Math.ceil(totalDeRegistos / limit);
            
            let resposta: IResponse = {
                pagina_atual: pagina,
                total_itens: totalDeRegistos,
                total_paginas: totalDePaginas,
                resultados: resultado
            };
            this.logger.log(`Efetuado operação de paginação de pessoas: pagina=${pagina}, limit=${limit}`);
            await this.databaseService.$disconnect();
            return resposta;
        } catch (error) {
            await this.databaseService.$disconnect();
            this.logger.error(`Não foi possivel realizar a paginação: [${error}]`);
        }
    }
    criarNovoRegistro(registro: any): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    buscarPorUUID(uuid: string): Promise<any> {
        throw new Error('Method not implemented.');
    }
    atualizarRegistro(registro: any, uuid: string): Promise<any> {
        throw new Error('Method not implemented.');
    }
    deletarRegistro(uuid: string): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    
}

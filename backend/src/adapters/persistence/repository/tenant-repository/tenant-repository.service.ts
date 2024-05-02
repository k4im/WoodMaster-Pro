import { Inject, Injectable } from '@nestjs/common';
import { IResponse } from 'src/domain/interfaces/IResponse.interface';
import { DatabaseService } from '../../../framework/database/database.service';
import { LoggerGateway } from 'src/ports/out-ports/logger.gateway';
import { Tenant } from '@prisma/client';
import { RepositoryGateway } from 'src/ports/out-ports/Repository.gateway';

@Injectable()
export class TenantRepositoryService implements RepositoryGateway {
    
    constructor(
        private readonly database: DatabaseService,
        @Inject("LoggerGateway") 
        private readonly logger: LoggerGateway) {}

    async paginarResultados(pagina: number, limit: number): Promise<IResponse> {
        try {
            let calculoPagina = (pagina - 1) * limit; 
            
            let resultado = await this.database.tenant.findMany({
                skip: calculoPagina,
                take: limit
            });

            let totalDeRegistos: number = await this.database.tenant.count();
            let totalDePaginas: number = Math.ceil(totalDeRegistos / limit);
            
            let resposta: IResponse = {
                pagina_atual: pagina,
                total_itens: totalDeRegistos,
                total_paginas: totalDePaginas,
                resultados: resultado
            };
            this.logger.log(`Efetuado operação de paginação de usuarios [Pessoa Repository] - [Metodo] - [paginar.]: pagina=${pagina}, limit=${limit}`);
            await this.database.$disconnect();
            return resposta;
        } catch (error) {
            await this.database.$disconnect();
            this.logger.error(`Não foi possivel realizar a paginação [Pessoa Repository] - [Metodo] - [paginar]: [${error}]`);
        }    }
    
    /**
     * O metodo será utilizado para a criação de um novo tenant dentro do banco de dados.
     * @param registro Recebe um novo tenant que será utilizado para a criação
     * @returns true | false
     */
    async criarNovoRegistro(registro: Tenant): Promise<boolean> {
        try {
            let result = await this.database.tenant.create({
                data: {
                    Nome: registro.Nome
                }
            })
            this.logger.log(`Efetuado a criação do tenant: [Tenant Repository] - [Metodo] - [Novo Registro].`)
            await this.database.$disconnect();
            return true;
        } catch (error) {
            this.logger.error(`Não foi possivel estar realizando a criação do tenant: [Tenant Repository] - [Metodo] - [Novo Registro] ${error}`)
            await this.database.$disconnect();
        }
    }

    /**
     * O metodo será utilizado para efetuar a busca de um tenant por UUID.
     * @param uuid Recebe o UUID do tenant para que então seja possivel efetuar a busca do mesmo.
     * @returns Tenant
     */
    async buscarPorUUID(uuid: string): Promise<any> {
        try {
            let result = await this.database.tenant.findUnique({
                select: {
                    Uuid: true, 
                    Id: false, 
                    Nome: true,
                    Inativo: true,
                    dataCriacao: true,
                    dataUpdate: true
                },
                where: {
                    Uuid: uuid
                }
            });
            this.logger.log(`Efetuado busca do tenant a partir do UUID: [Tenant Repository] - [Metodo] - [Buscar por UUID].`)
            await this.database.$disconnect();
            return result;
        } catch (error) {
            await this.database.$disconnect();
            this.logger.error(`Não foi possivel estar realizando a busca do tenant: [Tenant Repository] - [Metodo] - [Buscar por UUID] ${error}`)
            
        }
    }
    
    /**
     * O metodo sera utilizado para atualização de um tenant a partir do UUID
     * @param registro Recebe o registro que será utilizado para atualização dos dados.
     * @param uuid Recebe o UUID pertencente ao tenant.
     */
    async atualizarRegistro(registro: any, uuid: string): Promise<any> {
        try {
            let result = await this.database.tenant.update({
                where: {
                    Uuid: uuid
                },
                data: {...registro}
            });
            this.logger.log(`Efetuado update do registro: [Tenant Repository] - [Metodo] - [Atualizar por UUID].`)
            await this.database.$disconnect();
            return true
        } catch (error) {
            this.logger.error(`Não foi possivel efetuar atualização: [Tenant Repository] - [Metodo] - [Atualizar por UUID]. ${error}`)
            await this.database.$disconnect();
            return false
        }
    }
    
    async deletarRegistro(uuid: string): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
}

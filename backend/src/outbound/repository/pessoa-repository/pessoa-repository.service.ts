import { Inject, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/outbound/database/database.service';
import { Repository } from '../Repository';
import { LoggerGateway } from 'src/outbound/logger/logger.gateway';
import { IResponse } from 'src/core/interfaces/IResponse.interface';
import { PessoaEntity } from 'src/core/models/entities/pessoa.entity';
import { filtro } from 'src/core/enum/filtroPaginacao.enum';

@Injectable()
export class PessoaRepositoryService implements Repository{

    constructor(private readonly databaseService: DatabaseService,
        @Inject("LoggerGateway")
        private readonly logger: LoggerGateway) {}
    
    /**
     * Realiza a operação de paginação no banco de dados na tabela de pessoa.
     * @param pagina recebe a pagina que sera acessada
     * @param limit recebe o limite de resultados por pagina.
     * @returns Pessoa[]
     */
    async paginarResultados(pagina: number, limit: number, tenantId: string, filterType: filtro) { 
        try {
            let calculoPagina = (pagina - 1) * limit; 
            let whereClausula : any;
            
            switch (filterType) {
                case filtro.cliente:
                    whereClausula = {
                        TenantId: tenantId,
                        AND: [{Cliente: true}]
                    }
                    break;
                case filtro.fornecedor: 
                    whereClausula ={
                        TenantId: tenantId,
                        AND: [{Fornecedor: true}]
                    }
                    break
                case filtro.colaborador: 
                    whereClausula = {
                        TenantId: tenantId,
                        AND: [{Colaborador: true}]
                    }
                    break;
                case filtro.juridico: 
                    whereClausula = {
                        TenantId: tenantId,
                        AND: [{Tipopj: true}]
                    }
                    break;
                default:
                    whereClausula = {TenantId: tenantId}
                    break;
            };
            
            let resultado = await this.databaseService.pessoa.findMany({
                select: {
                    Uuid: true,
                    Nome: true,
                    Matricula: true,
                    Codigo: true,
                    Email: true,
                    dataCriacao: true
                },
                where: whereClausula,
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
            this.logger.log(`Efetuado operação de paginação de pessoas [Pessoa Repository] - [Metodo] - [Paginar]: pagina=${pagina}, limit=${limit}`);
            await this.databaseService.$disconnect();
            return resposta;
        } catch (error) {
            await this.databaseService.$disconnect();
            this.logger.error(`Não foi possivel realizar a paginação [Pessoa Repository] - [Metodo] - [Paginar]: [${error}]`);
        }
    }
    /**
     * Receberá um mapeamento de uma pessoa para que então seja criada uma nova pessoa no banco de dados
     * @param pessoa recebe uma pessoa que é uma mapeamento do schema presente no banco de dados.
     */
    async criarNovoRegistro(pessoa: PessoaEntity) {
        try {
            // Efetua a criação de uma nova pessoa utilizando os dados recebidos
            // do parametro informado na função.
            await this.databaseService.pessoa.create({
                data: {
                    ...pessoa,
                    Email: pessoa.Email.email,
                    PessoaEndereco: {create: [...pessoa.PessoaEndereco]},
                    PessoaTelefones: {create: [...pessoa.PessoaTelefones]},
                    TenantId: pessoa.TenantId,        
                }
            });
            this.logger.log("Pessoa criada com sucesso! [Pessoa Repository] - [Metodo] - [Criar novo registro]")
            await this.databaseService.$disconnect();
            return true;
        } catch (error) {
            await this.databaseService.$disconnect();
            this.logger.error(`Não foi possivel efetuar o processo de criação [Pessoa Repository] - [Metodo] - [Criar novo registro]: [${error}]`);
            return false;
        }
    }

    /**
     * Metodo será utilizado para efetuar a busca de uma pessoa que encontra-se no banco de dados
     * com base no seu uuid.
     * @param uuid recebe o UUID para que seja possivel estar buscando a pessoa com base no mesmo. 
     * @returns pessoa | error
     */
    async buscarPorUUID(uuid: string) {
        try {
            
            let result = await this.databaseService.pessoa.findFirst({
                where: {
                    Uuid : uuid
                },
                include: {
                    PessoaTelefones: true,
                    PessoaEndereco: true,
                    Usuario: true
                }
            }) 
            if(result === null){
                await this.databaseService.$disconnect();
                return null;
            }
            this.logger.log(`Efetuado busca de pessoa com UUID [Pessoa Repository] - [Metodo] - [Buscar por UUID]: [${uuid}]`)
            await this.databaseService.$disconnect();
            return result
        } catch (error) {
            await this.databaseService.$disconnect();
            this.logger.error(`Não foi possivel encontrar a pessoa por UUID [Pessoa Repository] - [Metodo] - [Buscar por UUID]: [${error}]`);
        }
    }   
    /**
     * 
     * @param pessoa Recebe uma pessoa que será um mapeamento identico da tabela no banco de dados.
     * @returns 
     */
    async atualizarRegistro(pessoa: any, uuid: string) { 
        try {
            let result = await this.databaseService.pessoa.update({
                where: {Uuid: uuid},
                data: {
                    ...pessoa,
                    Email: pessoa.Email.email,
                    PessoaEndereco: {create: [...pessoa.PessoaEndereco]},
                    PessoaTelefones: {create: [...pessoa.PessoaTelefones]}
                }
            })
            this.logger.log("Pessoa atualizada com sucesso! [Pessoa Repository] - [Metodo] - [Atualizar Registro]")
            await this.databaseService.$disconnect();
            return result;
        } catch (error) {
            await this.databaseService.$disconnect();
            this.logger.error(`Não foi possivel atualizar pessoa [Pessoa Repository] - [Metodo] - [Atualizar Registro]: [${error}]`);
        }
    }

    /**
     * O metodo sera utilizado para realizar a operação de CRUD de pessoa
     * fazendo com que seja removido uma pessoa com base em seu uuid
     * @param uuid recebe o uuid do cliente que será uma string.
     * @returns true | error 
     */
    async deletarRegistro(uuid: string) {
        try {
            await this.databaseService.pessoa.delete({
                where: {Uuid: uuid}
            });
            this.databaseService.$disconnect();
            this.logger.log(`Pessoa removida com sucesso! [Pessoa Repository] - [Metodo] - [Deletar Registro] UUID: [${uuid}]`)
            return true;
        } catch (error) {
            await this.databaseService.$disconnect();
            this.logger.error(`Não foi possivel deletar pessoa com base no UUID [Pessoa Repository] - [Metodo] - [Deletar registro]: [${error}]`);
        }  
    }
}

import { Injectable } from '@nestjs/common';
import { Pessoa } from '@prisma/client';
import { CustomLogger } from 'src/helpers/logger/logger.service';
import { DatabaseService } from 'src/outbound/database/database.service';
import { Repository } from '../Repository';
import { IResponse } from 'src/interfaces/IResponse.interface';
import { randomUUID } from 'crypto';
import { PessoaEntity } from 'src/inbound/http-controllers/pessoas/entities/pessoa.entity';
import { CriarPessoaDto } from 'src/inbound/http-controllers/pessoas/dto/criar-pessoa.dto';

@Injectable()
export class PessoaRepositoryService implements Repository{

    constructor(private readonly databaseService: DatabaseService,
        private readonly logger: CustomLogger) {}
    
    /**
     * Realiza a operação de paginação no banco de dados na tabela de pessoa.
     * @param pagina recebe a pagina que sera acessada
     * @param limit recebe o limite de resultados por pagina.
     * @returns Pessoa[]
     */
    async paginarResultados(pagina: number, limit: number) { 
        try {
            let calculoPagina = (pagina - 1) * limit; 
            
            let resultado = await this.databaseService.pessoa.findMany({
                include: {
                    PessoaEndereco: true,
                    PessoaTelefones: true
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
                    Uuid: randomUUID(),
                    ...pessoa,
                    Email: pessoa.Email.email,
                    PessoaEndereco: {create: [...pessoa.PessoaEndereco]},
                    PessoaTelefones: {create: [...pessoa.PessoaTelefones]}                
                }
            });
            this.logger.log("Pessoa criada com sucesso! [Repository] - [Metodo] - [Criar novo registro]")
            await this.databaseService.$disconnect();
            return true;
        } catch (error) {
            await this.databaseService.$disconnect();
            this.logger.error(`Não foi possivel efetuar o processo de criação [Repository] - [Metodo] - [Criar novo registro]: [${error}]`);
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
            if(result === null) return null;
            this.logger.log(`Efetuado busca de pessoa com UUID [Repository] - [Metodo] - [Buscar por UUID]: [${uuid}]`)
            await this.databaseService.$disconnect();
            return result
        } catch (error) {
            await this.databaseService.$disconnect();
            this.logger.error(`Não foi possivel encontrar a pessoa por UUID [Repository] - [Metodo] - [Buscar por UUID]: [${error}]`);
        }
    }   
    /**
     * 
     * @param pessoa Recebe uma pessoa que será um mapeamento identico da tabela no banco de dados.
     * @returns 
     */
    async atualizarRegistro(pessoa: PessoaEntity, uuid: string) { 
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
            this.logger.log("Pessoa atualizada com sucesso! [Repository] - [Metodo] - [Atualizar Registro]")
            await this.databaseService.$disconnect();
            return result;
        } catch (error) {
            await this.databaseService.$disconnect();
            this.logger.error(`Não foi possivel atualizar pessoa [Repository] - [Metodo] - [Atualizar Registro]: [${error}]`);
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
            this.logger.log(`Pessoa removida com sucesso! [Repository] - [Metodo] - [Deletar Registro] UUID: [${uuid}]`)
            return true;
        } catch (error) {
            await this.databaseService.$disconnect();
            this.logger.error(`Não foi possivel deletar pessoa com base no UUID [Repository] - [Metodo] - [Deletar registro]: [${error}]`);
        }  
    }
}

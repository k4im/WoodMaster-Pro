import { Injectable } from '@nestjs/common';
import { Pessoa } from '@prisma/client';
import { CustomLogger } from 'src/helpers/logger/logger.service';
import { IReponse } from 'src/interfaces/IReponse';
import { DatabaseService } from 'src/outbound/database/database.service';

@Injectable()
export class PessoaRepositoryService {

    constructor(private readonly databaseService: DatabaseService,
        private readonly logger: CustomLogger) {}
    
    /**
     * Realiza a operação de paginação no banco de dados na tabela de pessoa.
     * @param pagina recebe a pagina que sera acessada
     * @param limit recebe o limite de resultados por pagina.
     * @returns Pessoa[]
     */
    async paginarPessoas(pagina: number, limit: number) { 
        try {
            let calculoPagina = (pagina - 1) * limit; 
            
            let resultado: Pessoa[] =await this.databaseService.pessoa.findMany({
                skip: limit,
                take: calculoPagina
            })

            let totalDeRegistos: number = await this.databaseService.pessoa.count();
            let totalDePaginas: number = totalDeRegistos / limit;
            
            let resposta: IReponse = {
                pagina_atual: calculoPagina,
                total_itens: totalDeRegistos,
                total_paginas: Math.max(totalDePaginas),
                resultados: resultado
            }
            return resposta;
        } catch (error) {
            this.logger.error(`Não foi possivel realizar a paginação: [${error}]`);
        }
    }
    /**
     * Receberá um mapeamento de uma pessoa para que então seja criada uma nova pessoa no banco de dados
     * @param pessoa recebe uma pessoa que é uma mapeamento do schema presente no banco de dados.
     */
    async criarNovaPessoa(pessoa: Pessoa) {
        try {
            if (await this.databaseService.pessoa.create({data: pessoa})) {
                this.logger.log("Criado usuario com sucesso!")
                return true;
            }
        } catch (error) {
            this.logger.error(`Não foi possivel efetuar o processo de criação: [${error}]`);
        }
    }

    /**
     * Metodo será utilizado para efetuar a busca de uma pessoa que encontra-se no banco de dados
     * com base no seu uuid.
     * @param uuid recebe o UUID para que seja possivel estar buscando a pessoa com base no mesmo. 
     * @returns pessoa | error
     */
    async buscarPessoaPorId(uuid: string) {
        try {
            let pessoa: Pessoa = await this.databaseService.pessoa.findFirst({
                where: {
                    Uuid : uuid
                }
            })
            return pessoa;
        } catch (error) {
            this.logger.error(`Não foi possivel encontrar a pessoa por UUID: [${error}]`);
        }
    }   
    /**
     * 
     * @param pessoa Recebe uma pessoa que será um mapeamento identico da tabela no banco de dados.
     * @returns 
     */
    async atualizarPessoa(pessoa: Pessoa, uuid: string) { 
        try {
            let result = await this.databaseService.pessoa.update({
                where: {Uuid: uuid},
                data: pessoa
            })
            return result;
        } catch (error) {
            this.logger.error(`Não foi possivel atualizar pessoa: [${error}]`);
        }
    }

    /**
     * O metodo sera utilizado para realizar a operação de CRUD de pessoa
     * fazendo com que seja removido uma pessoa com base em seu uuid
     * @param uuid recebe o uuid do cliente que será uma string.
     * @returns true | error 
     */
    async deletarPessoa(uuid: string) {
        try {
            let result = await this.databaseService.pessoa.delete({
                where: {Uuid: uuid}
            })
            return true;
        } catch (error) {
            this.logger.error(`Não foi possivel deletar pessoa com base no UUID: [${error}]`);
        }  
    }
}

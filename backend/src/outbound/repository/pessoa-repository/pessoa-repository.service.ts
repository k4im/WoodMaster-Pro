import { Injectable } from '@nestjs/common';
import { Pessoa } from '@prisma/client';
import { CustomLogger } from 'src/helpers/logger/logger.service';
import { DatabaseService } from 'src/outbound/database/database.service';

@Injectable()
export class PessoaRepositoryService {

    constructor(private readonly databaseService: DatabaseService,
        private readonly logger: CustomLogger) {}

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
            this.logger.error(`Não foi possivel efetuar o processo de criação: [${error}]`);
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
            this.logger.error(`Não foi possivel efetuar o processo de criação: [${error}]`);
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
            this.logger.error(`Não foi possivel efetuar o processo de criação: [${error}]`);
        }  
    }
}

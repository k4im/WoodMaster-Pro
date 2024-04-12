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

    async buscarPessoaPorId(id: string) {
        try {
            let pessoa: Pessoa = await this.databaseService.pessoa.findFirst({
                where: {
                    Uuid : id
                }
            })
            return pessoa;
        } catch (error) {
            this.logger.error(`Não foi possivel efetuar o processo de criação: [${error}]`);
        }
    }

}

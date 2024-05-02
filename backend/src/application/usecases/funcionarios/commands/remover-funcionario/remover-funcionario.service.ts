import { Inject, Injectable } from '@nestjs/common';
import { RepositoryGateway } from 'src/ports/out-ports/Repository.gateway';
import { LoggerGateway } from 'src/ports/out-ports/logger.gateway';

@Injectable()
export class RemoverFuncionariosUseCase {

    constructor(
        @Inject("PessoaGateway")
        private readonly pessoaRepo: RepositoryGateway,
        @Inject("LoggerGateway") private readonly logger: LoggerGateway) {}
    
    /**
     * O metodo estará executando a operação no banco de dados.
     * @param uuid recebe o uuid do cliente que será removido.
     * @returns 
     */
    async execute(uuid: string) {
        try {
            this.logger.log(`Executando caso de uso [Use Case] - [DeletarFuncionario] - [Execute]`);
            return await this.pessoaRepo.deletarRegistro(uuid);
        } catch (error) {
            this.logger.error(`Não foi possivel efetuar a execução do caso de uso [Use Case] - [DeletarFuncionario] - [Execute]: ${error}`);
        }
    }

}

import { Inject, Injectable } from '@nestjs/common';
import { PessoaRepositoryService } from 'src/infraestrutura/repository/pessoa-repository/pessoa-repository.service';
import { LoggerGateway } from 'src/application/out-ports/logger.gateway';

@Injectable()
export class DeletarClienteService {

    constructor(private readonly pessoaRepo: PessoaRepositoryService,
        @Inject("LoggerGateway") private readonly logger: LoggerGateway) {}
    
    /**
     * O metodo estará executando a operação no banco de dados.
     * @param uuid recebe o uuid do cliente que será removido.
     * @returns 
     */
    async execute(uuid: string) {
        try {
            this.logger.log(`Executando caso de uso [Use Case] - [DeletarCliente] - [Execute]`);
            return await this.pessoaRepo.deletarRegistro(uuid);
        } catch (error) {
            this.logger.error(`Não foi possivel efetuar a execução do use case de remoção de cliente [Use Case] - [DeletarCliente] - [Execute]: ${error}`);
        }
    }
}

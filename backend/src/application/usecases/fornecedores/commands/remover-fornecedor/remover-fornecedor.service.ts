import { Inject, Injectable } from '@nestjs/common';
import { RepositoryGateway } from 'src/ports/out-ports/Repository.gateway';
import { LoggerGateway } from 'src/ports/out-ports/logger.gateway';

@Injectable()
export class RemoverFornecedorUseCase {

    constructor(
        @Inject("PessoaGateway")
        private readonly pessoaRepo: RepositoryGateway,
        @Inject("LoggerGateway") private readonly logger: LoggerGateway) {}
    
    /**
     * Caso de uso podera ser utilizado para remover um fonecedor de um determinado tenant.
     * @param uuid recebe o uuid do fornecedor
     * @param tenantId recebe o uuid do tenant logado atualmente.
     * @returns true | false
     */
    async execute(uuid: string, tenantId: string) {
        try {
            this.logger.log(`Executando caso de uso [Use Case] - [RemoverFornecedor] - [Execute]`);
            return await this.pessoaRepo.deletarRegistro(uuid);
        } catch (error) {
            this.logger.error(`Não foi possivel efetuar a execução do use case [Use Case] - [RemoverFornecedor] - [Execute]: ${error}`);
        }
    }

}

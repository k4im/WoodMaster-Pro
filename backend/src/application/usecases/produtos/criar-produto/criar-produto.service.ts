import { Inject, Injectable } from '@nestjs/common';
import { LoggerGateway } from 'src/application/out-ports/logger.gateway';

@Injectable()
export class CriarProdutoService {

    constructor(
        @Inject("LoggerGateway") private readonly logger: LoggerGateway) {}
    
    /**
     * Caso de uso poderá ser utilizado para criação de um novo fornecedor.
     * @param pessoaDto recebe um dto para efetuar a criação de um novo cliente.
     * @returns true | false
     */
    async execute(produtoDto: string) {
        try {
            this.logger.log(`Executando caso de uso [Use Case] - [CriarProduto] - [Execute]`);
            // return await this.pessoaRepo.criarNovoRegistro(pessoa);
        } catch (error) {
            this.logger.error(`Não foi possivel efetuar a execução do use case de criar cliente [Use Case] - [CriarProduto] - [Execute]: ${error}`);
        }
    }
}

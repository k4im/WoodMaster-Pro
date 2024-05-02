import { Inject, Injectable } from '@nestjs/common';
import { PessoaEntity } from 'src/domain/entities/pessoa.entity';
import { LoggerGateway } from 'src/ports/out-ports/logger.gateway';
import { CriarPessoaDto } from 'src/application/controllers/http-controllers/pessoas/dto/criar-pessoa.dto';
import { RepositoryGateway } from 'src/ports/out-ports/Repository.gateway';

@Injectable()
export class CriarFornecedorUseCase {

    constructor(
        @Inject("PessoaGateway")
        private readonly pessoaRepo: RepositoryGateway,
        @Inject("LoggerGateway") private readonly logger: LoggerGateway) {}
    
    /**
     * Caso de uso poderá ser utilizado para criação de um novo fornecedor.
     * @param pessoaDto recebe um dto para efetuar a criação de um novo cliente.
     * @returns true | false
     */
    async execute(pessoaDto: CriarPessoaDto) {
        try {
            this.logger.log(`Executando caso de uso [Use Case] - [CriarFornecedor] - [Execute]`);
            let pessoa = new PessoaEntity().criarPessoaPorDto(pessoaDto)
            pessoa.Fornecedor = true;
            return await this.pessoaRepo.criarNovoRegistro(pessoa);
        } catch (error) {
            this.logger.error(`Não foi possivel efetuar a execução do use case de criar cliente [Use Case] - [CriarFornecedor] - [Execute]: ${error}`);
        }
    }

}
